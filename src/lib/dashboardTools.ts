import {
  Compass,
  Receipt,
  Activity,
  UtensilsCrossed,
  Tv,
  QrCode,
  ChefHat,
  Users,
  HeartHandshake,
  Shield,
  Key,
  Radio,
  Ticket,
  Star,
  HelpCircle,
  PlayCircle,
  Info,
  LucideIcon
} from 'lucide-react';

export interface DashboardTool {
  id: string;
  title: string;
  shortLabel: string;
  desc: string;
  category: 'operations' | 'management' | 'growth' | 'support';
  icon: LucideIcon;
  path: string; // Relative to /dashboard/[storeSlug] or external
  isExternal?: boolean;
  badge?: 'NEW' | 'External';
  iconClasses: string;
}

export const ALL_DASHBOARD_TOOLS: DashboardTool[] = [
  // OPERATIONS (7)
  {
    id: 'live-cafe',
    title: 'Live Cafe',
    shortLabel: 'Live Cafe',
    desc: 'AI floor plan & 2.5D isometric cafe world',
    category: 'operations',
    icon: Compass,
    path: '/live-cafe',
    badge: 'NEW',
    iconClasses: 'bg-[#DDF5EA] text-[#075C45] border-[#0B8F69]/20 group-hover:bg-[#C8EEDD] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  },
  {
    id: 'billing',
    title: 'Bill History',
    shortLabel: 'Bill History',
    desc: 'Past invoices & transaction receipts',
    category: 'operations',
    icon: Receipt,
    path: '/billing',
    iconClasses: 'bg-[#EBF3FA] text-[#3975C6] border-[#3975C6]/20 group-hover:bg-[#DCEDFC] dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  {
    id: 'usage',
    title: 'BrewPluse Usage',
    shortLabel: 'BrewPluse Usage',
    desc: 'View fee usage & settlement',
    category: 'operations',
    icon: Activity,
    path: '/usage',
    iconClasses: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 group-hover:bg-[#FDE68A] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },
  {
    id: 'menu',
    title: 'Menu Setup',
    shortLabel: 'Menu Setup',
    desc: 'Manage categories & items',
    category: 'operations',
    icon: UtensilsCrossed,
    path: '/menu',
    iconClasses: 'bg-[#DDF5EA] text-[#075C45] border-[#0B8F69]/20 group-hover:bg-[#C8EEDD] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  },
  {
    id: 'tv-menu',
    title: 'Menu Showcase',
    shortLabel: 'Menu Showcase',
    desc: 'Digital TV & Print Menu',
    category: 'operations',
    icon: Tv,
    path: '/tv-menu',
    iconClasses: 'bg-[#EDE9FE] text-[#7958C9] border-[#7958C9]/20 group-hover:bg-[#DDD6FE] dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40',
  },
  {
    id: 'tables',
    title: 'QR Ordering',
    shortLabel: 'QR Ordering',
    desc: 'Customer dine-in QR & tables',
    category: 'operations',
    icon: QrCode,
    path: '/tables',
    iconClasses: 'bg-[#EBF3FA] text-[#3975C6] border-[#3975C6]/20 group-hover:bg-[#DCEDFC] dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  {
    id: 'kds',
    title: 'Kitchen Display (KDS)',
    shortLabel: 'Kitchen Display (KDS)',
    desc: 'Live kitchen tickets & timers',
    category: 'operations',
    icon: ChefHat,
    path: '/kds',
    iconClasses: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 group-hover:bg-[#FDE68A] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },

  // MANAGEMENT (4)
  {
    id: 'staff',
    title: 'Staff & Team',
    shortLabel: 'Staff & Team',
    desc: 'Roles & permissions',
    category: 'management',
    icon: Users,
    path: '/staff',
    iconClasses: 'bg-[#EBF3FA] text-[#3975C6] border-[#3975C6]/20 group-hover:bg-[#DCEDFC] dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  {
    id: 'customers',
    title: 'Customers & CRM',
    shortLabel: 'Customers & CRM',
    desc: 'Customer history & rewards',
    category: 'management',
    icon: HeartHandshake,
    path: '/customers',
    iconClasses: 'bg-[#DDF5EA] text-[#075C45] border-[#0B8F69]/20 group-hover:bg-[#C8EEDD] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  },
  {
    id: 'security',
    title: 'Customer Security',
    shortLabel: 'Customer Security',
    desc: 'Ordering restrictions & proximity',
    category: 'management',
    icon: Shield,
    path: '/settings/security',
    iconClasses: 'bg-[#EDE9FE] text-[#7958C9] border-[#7958C9]/20 group-hover:bg-[#DDD6FE] dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40',
  },
  {
    id: 'password',
    title: 'Change Password',
    shortLabel: 'Change Password',
    desc: 'Update account login password',
    category: 'management',
    icon: Key,
    path: '/settings/password',
    iconClasses: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 group-hover:bg-[#FDE68A] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },

  // GROWTH (3)
  {
    id: 'social-nfc',
    title: 'Social NFC',
    shortLabel: 'Social NFC',
    desc: 'Digital tap & bio profile, reviews & socials',
    category: 'growth',
    icon: Radio,
    path: '/social-nfc',
    iconClasses: 'bg-[#EDE9FE] text-[#7958C9] border-[#7958C9]/20 group-hover:bg-[#DDD6FE] dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40',
  },
  {
    id: 'coupons',
    title: 'Coupons & Offers',
    shortLabel: 'Coupons & Offers',
    desc: 'Create discounts and promotions',
    category: 'growth',
    icon: Ticket,
    path: '/coupons',
    iconClasses: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 group-hover:bg-[#FDE68A] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },
  {
    id: 'google-reviews',
    title: 'Google Reviews',
    shortLabel: 'Google Reviews',
    desc: 'Manage customer review experience',
    category: 'growth',
    icon: Star,
    path: '/settings/google-reviews',
    iconClasses: 'bg-[#FEF3C7] text-[#D97706] border-[#D97706]/20 group-hover:bg-[#FDE68A] dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40',
  },

  // SUPPORT (4)
  {
    id: 'support',
    title: 'Help & WhatsApp Support',
    shortLabel: 'WhatsApp Support',
    desc: 'Direct assistance & live support chat',
    category: 'support',
    icon: HelpCircle,
    path: '/support',
    iconClasses: 'bg-[#DDF5EA] text-[#075C45] border-[#0B8F69]/20 group-hover:bg-[#C8EEDD] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  },
  /* Video Guide temporarily hidden until custom BrewPluse video is ready
  {
    id: 'video-guide',
    title: 'Video Setup Guide',
    shortLabel: 'Video Setup Guide',
    desc: 'Step-by-step setup walkthrough video',
    category: 'support',
    icon: PlayCircle,
    path: 'https://youtu.be/pt-x6OqOvIA',
    badge: 'External',
    isExternal: true,
    iconClasses: 'bg-[#EBF3FA] text-[#3975C6] border-[#3975C6]/20 group-hover:bg-[#DCEDFC] dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/40',
  },
  */
  {
    id: 'status',
    title: 'System Status',
    shortLabel: 'System Status',
    desc: 'Live uptime & services health',
    category: 'support',
    icon: Activity,
    path: '/status',
    iconClasses: 'bg-[#DDF5EA] text-[#075C45] border-[#0B8F69]/20 group-hover:bg-[#C8EEDD] dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40',
  },
  {
    id: 'about',
    title: 'About & License',
    shortLabel: 'About & License',
    desc: 'BrewPluse version & legal info',
    category: 'support',
    icon: Info,
    path: '/about',
    iconClasses: 'bg-[#F1F5F3] text-[#64756E] border-[#E1E9E4] group-hover:bg-[#E5EBE8] dark:bg-stone-800 dark:text-stone-300 dark:border-stone-700',
  },
];

// Kitchen Display (KDS) and QR Ordering can be pinned
export const DEFAULT_PINNED_IDS = ['kds'];

export function getStoredPinnedIds(): string[] {
  if (typeof window === 'undefined') return DEFAULT_PINNED_IDS;
  try {
    const raw = localStorage.getItem('brewpluse::pinned_tools');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return DEFAULT_PINNED_IDS;
}

export function savePinnedIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('brewpluse::pinned_tools', JSON.stringify(ids));
    window.dispatchEvent(new CustomEvent('brewpluse::pinned_change', { detail: ids }));
  } catch (e) {
    // ignore
  }
}
