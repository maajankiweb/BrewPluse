import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import AppShell from '@/components/AppShell';

export const viewport: Viewport = {
  themeColor: '#062F23',
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://brewpluse.com'),
  title: {
    default: 'BrewPluse – Free AI Cafe POS & Restaurant POS',
    template: '%s | BrewPluse',
  },
  description:
    'Free AI-powered Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, thermal billing & recipe inventory. ₹0/month fees for modern cafes.',
  keywords: [
    'cafe POS',
    'CafePOS',
    'restaurant POS',
    'Resturant POS',
    'cafe',
    'cafe management software',
    'free cafe software',
    'coffee shop POS',
    'restaurant POS software',
    'free restaurant POS',
    'QR table ordering system',
    'kitchen display system KDS',
    'cafe billing software free',
    'restaurant billing software',
    'cafe inventory management',
    'cloud cafe point of sale',
    'BrewPluse',
    'BrewPluse POS',
    'pos for cafes',
    'best cafe pos',
    'best restaurant pos',
  ],
  authors: [{ name: 'Ashish Kumar', url: 'https://brewpluse.com' }],
  creator: 'BrewPluse Technologies',
  publisher: 'BrewPluse',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://brewpluse.com/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    title: 'BrewPluse – Free AI Cafe POS & Restaurant POS',
    description:
      'Free AI Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, and recipe inventory. Zero monthly software fees for modern coffee shops.',
    url: 'https://brewpluse.com/',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/storefront.png',
        width: 1200,
        height: 630,
        alt: 'BrewPluse – Cloud Point of Sale and Cafe Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrewPluse – Cloud POS & Cafe Management Software',
    description:
      'Manage cafe billing, table QR ordering, live KDS screens, and inventory with BrewPluse. Zero monthly fees for modern cafes, coffee shops & restaurants.',
    images: ['/storefront.png'],
    creator: '@brewpluse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'NSZIbu38965wNjaAYP44xNc6rW1MmbZNNDAl4snYHrQ',
    other: {
      'msvalidate.01': '69B3649ED10EF133B495627267F3A40C',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Rich Structured Data Schemas (SEO, AEO, GEO)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BrewPluse',
    legalName: 'Ashish Kumar',
    url: 'https://brewpluse.com',
    logo: 'https://brewpluse.com/icon.png',
    email: 'support@brewpluse.com',
    telephone: '+91-9006543913',
    founder: {
      '@type': 'Person',
      name: 'Ashish Kumar',
    },
    description:
      'Cloud-native Point of Sale (POS) and cafe operating system powering independent coffee shops, tea bars, and specialty restaurants with zero monthly subscriptions.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9006543913',
      contactType: 'customer support',
      email: 'support@brewpluse.com',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://github.com/BrewPluse',
      'https://linkedin.com/company/brewpluse',
      'https://x.com/brewpluse',
      'https://instagram.com/brewpluse',
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BrewPluse Cafe POS & Operating System',
    operatingSystem: 'Web, Android, iOS, Windows, macOS, Linux',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'PointOfSale',
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
      description: 'Zero monthly subscription plan with full POS, KDS, and QR table ordering access.',
    },
    featureList: [
      'Cloud Point of Sale (POS)',
      'Contactless QR Table Ordering',
      'Live Kitchen Display System (KDS)',
      'Ingredient-level Inventory & Recipe Management',
      'Thermal Printer Auto-routing (USB/Network/Bluetooth)',
      'Unified UPI, Cash & Card Register with GST Compliant Invoices',
      'Customer Loyalty Points & Scratch Cards',
      'AI Assistant BREWIE for Real-time Cafe Intelligence',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BrewPluse',
    url: 'https://brewpluse.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://brewpluse.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Geographic Local Business Schema (GEO Engine Foundation)
  const geoLocalSchema = {
    '@context': 'https://schema.org',
    '@type': ['CafeOrCoffeeShop', 'LocalBusiness'],
    name: 'BrewPluse Flagship Cafe Experience',
    image: 'https://brewpluse.com/storefront.png',
    url: 'https://brewpluse.com',
    telephone: '+91-9006543913',
    priceRange: '₹₹',
    menu: 'https://brewpluse.com/demo/menu',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'BrewPluse Tech Park, Sector 4',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '23:00',
      },
    ],
    servesCuisine: ['Specialty Coffee', 'Breakfast', 'Artisanal Bakes', 'Tea', 'Snacks'],
  };

  // Answer Engine Optimization (AEO FAQ Schema for ChatGPT, Perplexity, Gemini, Copilot)
  const aeoFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is BrewPluse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BrewPluse is a modern cloud-based Point of Sale (POS) and complete operating system for cafes, coffee shops, bakeries, and quick-service restaurants. It unifies QR table ordering, kitchen display systems (KDS), inventory management, staff tracking, thermal receipt printing, and customer loyalty into one interface with zero monthly software fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is BrewPluse free to use for cafes and restaurants?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. BrewPluse charges ₹0 per month for software subscriptions. Cafe owners get full access to the POS, digital QR menus, Kitchen Display System, and analytics without recurring monthly SaaS fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does BrewPluse QR table ordering work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Customers simply scan a dynamic QR stand on their table using any mobile smartphone camera. The live digital menu opens instantly without requiring any app download. Customers select dishes, add custom modifiers, and pay via UPI or request cash settlement. Orders route instantly to the Kitchen Display System (KDS).',
        },
      },
      {
        '@type': 'Question',
        name: 'Does BrewPluse support thermal receipt printers and hardware?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. BrewPluse supports standard 58mm and 80mm ESC/POS thermal printers via USB, Bluetooth, LAN Ethernet, and Wi-Fi, alongside official NFC tap-to-review hardware cards and acrylic QR stands.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is BREWIE AI Assistant in BrewPluse?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'BREWIE is an integrated artificial intelligence assistant trained on cafe operations and restaurant workflows. It provides real-time sales velocity audits, low-stock threshold forecasting, happy-hour discount suggestions, and automated floor layout configurations directly inside the merchant dashboard.',
        },
      },
    ],
  };

  // Site Navigation Structured Data (Internal Links Hierarchy)
  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      { '@type': 'SiteNavigationElement', position: 1, name: 'Cafe POS (CafePOS)', url: 'https://brewpluse.com/cafe-pos' },
      { '@type': 'SiteNavigationElement', position: 2, name: 'Restaurant POS System', url: 'https://brewpluse.com/restaurant-pos' },
      { '@type': 'SiteNavigationElement', position: 3, name: 'Cafe Management Software', url: 'https://brewpluse.com/cafe-management-software' },
      { '@type': 'SiteNavigationElement', position: 4, name: 'Restaurant Management Software', url: 'https://brewpluse.com/restaurant-management-software' },
      { '@type': 'SiteNavigationElement', position: 5, name: 'Free Cafe POS Software', url: 'https://brewpluse.com/free-cafe-management-software' },
      { '@type': 'SiteNavigationElement', position: 6, name: 'Free Restaurant POS', url: 'https://brewpluse.com/free-restaurant-pos' },
      { '@type': 'SiteNavigationElement', position: 7, name: 'Kitchen Display System (KDS)', url: 'https://brewpluse.com/kitchen-display-system' },
      { '@type': 'SiteNavigationElement', position: 8, name: 'QR Ordering System', url: 'https://brewpluse.com/qr-ordering-system' },
      { '@type': 'SiteNavigationElement', position: 9, name: 'Digital QR Menu', url: 'https://brewpluse.com/digital-menu' },
      { '@type': 'SiteNavigationElement', position: 10, name: 'Staff Waiter Ordering System', url: 'https://brewpluse.com/staff-ordering-system' },
      { '@type': 'SiteNavigationElement', position: 11, name: 'Features', url: 'https://brewpluse.com/features' },
      { '@type': 'SiteNavigationElement', position: 12, name: 'Pricing', url: 'https://brewpluse.com/pricing' },
      { '@type': 'SiteNavigationElement', position: 13, name: 'Knowledge Base & Blog', url: 'https://brewpluse.com/blog' },
    ],
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="msvalidate.01" content="69B3649ED10EF133B495627267F3A40C" />
        <meta name="google-site-verification" content="NSZIbu38965wNjaAYP44xNc6rW1MmbZNNDAl4snYHrQ" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />

        {/* Structured Data: Organization (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Structured Data: SoftwareApplication (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        {/* Structured Data: WebSite (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Structured Data: LocalBusiness & GeoCoordinates (GEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(geoLocalSchema) }}
        />
        {/* Structured Data: FAQPage (AEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aeoFaqSchema) }}
        />
        {/* Structured Data: Site Navigation (Internal Linking SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
        {/* Automated Cache Invalidation & Stale Service Worker Cleanup */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var r of registrations) {
                      r.unregister();
                      console.info('[BrewPluse] Unregistered stale service worker');
                    }
                  });
                }
              } catch (e) {}
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.indexOf('Loading chunk') !== -1 || e.message.indexOf('ChunkLoadError') !== -1)) {
                  console.warn('[BrewPluse] New version detected on CDN, auto-refreshing...');
                  window.location.reload();
                }
              });
            `,
          }}
        />

        {/* Microsoft Clarity Analytics */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "z246e3cckd");
            `,
          }}
        />

        {/* Google Analytics 4 tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3C318HRRDN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3C318HRRDN');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased text-[#1a1715] bg-[#FBFBFA] min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-950">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
