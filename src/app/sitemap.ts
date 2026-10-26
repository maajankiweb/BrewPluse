import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brewpluse.com';
  const currentDate = new Date().toISOString();

  const blogSlugs = [
    'best-cafe-management-software',
    'free-cafe-software',
    'free-pos-systems-for-coffee-shops',
    'how-to-manage-cafe-inventory-efficiently',
    'why-free-cafe-management-software-is-ultimate-solution',
    'what-is-a-qr-ordering-system',
    'kitchen-display-system-vs-paper-kot',
    'how-to-setup-qr-menu-for-cafe',
    'restaurant-staff-ordering-system-guide',
    'cafe-pos-software-india-guide',
  ];

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/cafe-pos', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/restaurant-pos', priority: 0.95, changeFrequency: 'weekly' as const },
    { url: '/free-cafe-management-software', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/free-restaurant-pos', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/cafe-management-software', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/restaurant-management-software', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/qr-ordering-system', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/kitchen-display-system', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/digital-menu', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/staff-ordering-system', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/features', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/pricing', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/how-to-use', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/demo', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/download', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/blog', priority: 0.8, changeFrequency: 'daily' as const },
    ...blogSlugs.map((slug) => ({
      url: `/blog/${slug}`,
      priority: 0.75,
      changeFrequency: 'weekly' as const,
    })),
    { url: '/status', priority: 0.5, changeFrequency: 'hourly' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy/data-rights', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/privacy/preferences', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/refund', priority: 0.3, changeFrequency: 'yearly' as const },
    { url: '/shipping', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified: currentDate,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
