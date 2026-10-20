import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

process.env.NODE_ENV = 'test';

import {
  DEFAULT_10_TABLES,
  ensureDefaultTables,
  getRuntimeTables,
  saveRuntimeTable,
  deleteRuntimeTable,
} from '../src/lib/models/Table';

describe('10 Permanent Default Tables & Manual Addition', () => {
  const storeId = 'test-cafe-10-tables';

  it('1. DEFAULT_10_TABLES contains Table 1 through Table 10 with designated labels', () => {
    assert.equal(DEFAULT_10_TABLES.length, 10, 'Must have exactly 10 default tables');
    for (let i = 1; i <= 10; i++) {
      const expectedNumber = `Table ${i}`;
      const found = DEFAULT_10_TABLES.find((t) => t.number === expectedNumber);
      assert.ok(found, `Table ${i} must exist in DEFAULT_10_TABLES`);
      assert.ok(found.label, `Table ${i} must have a designated label`);
    }
  });

  it('2. ensureDefaultTables seeds 10 tables permanently for a new store', async () => {
    const tables = await ensureDefaultTables(storeId);
    assert.ok(tables.length >= 10, 'Should return at least 10 tables');
    assert.equal(tables[0].number, 'Table 1');
    assert.equal(tables[9].number, 'Table 10');
    assert.ok(tables[0].token, 'Table 1 must have a token generated');
    assert.ok(tables[9].token, 'Table 10 must have a token generated');
  });

  it('3. ensureDefaultTables is idempotent and does not create duplicate tables', async () => {
    const tablesAgain = await ensureDefaultTables(storeId);
    assert.equal(tablesAgain.length, 10, 'Should still have exactly 10 tables');
  });

  it('4. Cafe owner can manually add extra tables (e.g., Table 11, Table 12, Rooftop Lounge)', async () => {
    const table11 = {
      id: 'tbl_custom_11',
      storeId,
      number: 'Table 11',
      label: 'Rooftop Lounge 1 (6-Seater)',
      token: 'test-token-tbl-11',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    saveRuntimeTable(table11);

    const allTables = getRuntimeTables(storeId);
    assert.equal(allTables.length, 11, 'Should now have 11 tables');
    assert.ok(allTables.some((t) => t.number === 'Table 11'), 'Table 11 should be present');
  });

  it('5. Individual tables can be deleted or updated without breaking default table guarantee', () => {
    deleteRuntimeTable(storeId, 'tbl_custom_11');
    const tablesAfterDelete = getRuntimeTables(storeId);
    assert.equal(tablesAfterDelete.length, 10, 'Should return to 10 tables after deleting custom table');
    assert.ok(!tablesAfterDelete.some((t) => t.number === 'Table 11'), 'Table 11 should be removed');
  });
});
