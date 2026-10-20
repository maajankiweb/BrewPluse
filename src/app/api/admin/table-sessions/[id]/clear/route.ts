import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession, saveRuntimeSession } from '@/lib/models/TableSession';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';
import { syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

/**
 * POST /api/admin/table-sessions/:id/clear
 * Roles: owner, manager, cashier
 * Closes the dining session and resets the table to vacant for new guests.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier']);
    if (!auth.authorized) {
      return auth.response;
    }

    const sessionId = params.id;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required' } },
        { status: 400 }
      );
    }

    const storeId = auth.storeSlug;
    const conn = await connectMongoDB();

    let session: any = null;
    if (conn) {
      try {
        session = await TableSession.findOne({ _id: sessionId, storeId });
      } catch (err) {}
    }

    if (!session) {
      const allSessions = global.runtimeTableSessions?.[storeId] || [];
      session = allSessions.find((s) => s.id === sessionId);
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found for this store' } },
        { status: 404 }
      );
    }

    const now = new Date();
    session.status = 'closed';
    session.closedAt = now;

    if (conn && typeof session.save === 'function') {
      try {
        await session.save();
      } catch (err) {}
    }

    saveRuntimeSession({
      ...((session.toObject && session.toObject()) || session),
      id: String(session._id || session.id),
      status: 'closed',
      closedAt: now,
      updatedAt: now,
    });

    // Resolve table
    let tableNumber = 'Table';
    if (conn) {
      try {
        const tbl = await Table.findById(session.tableId);
        if (tbl) tableNumber = tbl.number;
      } catch (e) {}
    }
    if (tableNumber === 'Table') {
      const rtTbl = findRuntimeTableById(session.tableId);
      if (rtTbl) tableNumber = rtTbl.number;
    }

    // Sync to Firestore liveTables: vacant table
    syncLiveTableToFirestore(session.tableId, {
      tableNumber,
      status: 'closed',
      dueAmount: 0,
      billRequested: false,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      session: {
        id: String(session._id || session.id),
        status: 'closed',
        closedAt: now,
      },
      message: `${tableNumber} is now cleared and marked vacant for next guests.`,
    });
  } catch (error: any) {
    console.error('[Clear Table Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to clear table' } },
      { status: 500 }
    );
  }
}
