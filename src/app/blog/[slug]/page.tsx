import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  publishDate: string;
  readTime: string;
  category: string;
  author: string;
  excerpt: string;
  content: {
    heading: string;
    body: string;
    keyPoints?: string[];
    internalLink?: {
      text: string;
      href: string;
      anchor: string;
    };
  }[];
}

const blogPosts: Record<string, BlogPost> = {
  "best-cafe-management-software": {
    slug: "best-cafe-management-software",
    title: "Best Cafe Management Software in 2026: A Comprehensive Evaluation",
    metaTitle: "Best Cafe Management Software & POS (2026)",
    metaDescription: "Detailed evaluation of the best cafe management software and CafePOS systems in 2026: features, pricing, QR ordering, KDS, inventory, and zero-fee solutions.",
    keywords: ["best cafe management software", "Cafe POS", "CafePOS", "cafe billing software", "free cafe pos", "coffee shop management system"],
    publishDate: "2026-01-15",
    readTime: "8 min read",
    category: "Comparison Guide",
    author: "BrewPluse Editorial Team",
    excerpt: "Discover why BrewPluse ranks as the leading Cafe POS and cafe management software in 2026 with ₹0 monthly subscription fees, native QR ordering, KDS, and recipe inventory.",
    content: [
      {
        heading: "What Makes a Great Cafe POS System in 2026?",
        body: "Running a high-volume coffee shop or modern cafe demands speed, accuracy, and seamless integration between the counter and the kitchen. Legacy point-of-sale terminals with rigid monthly retainers and clunky hardware are giving way to agile, cloud-native Cafe POS (CafePOS) solutions.",
        keyPoints: [
          "Sub-second order ringing with touch & keyboard shortcuts",
          "Contactless QR table ordering with integrated digital payment",
          "Real-time Kitchen Display System (KDS) replacing paper tickets",
          "Automated recipe-level raw ingredient inventory tracking"
        ],
        internalLink: {
          text: "Explore how BrewPluse transforms your front desk:",
          href: "/cafe-pos",
          anchor: "BrewPluse Cafe POS (CafePOS) Features"
        }
      },
      {
        heading: "Zero-Subscription vs Traditional Legacy Systems",
        body: "Traditional cafe software platforms charge steep monthly fees (₹2,500 to ₹10,000/month) simply to keep the terminal turned on. BrewPluse operates on a transparent ₹0/month subscription model, unlocking enterprise-grade features for every independent coffee shop and multi-outlet brand.",
        internalLink: {
          text: "Check out our completely free tier:",
          href: "/free-cafe-management-software",
          anchor: "Free Cafe Management Software"
        }
      },
      {
        heading: "Omnichannel Order Syncing & Floor Efficiency",
        body: "When lunch rush hits, cashier counters get overwhelmed. By pairing high-velocity counter billing with tableside waiter ordering and contactless QR menus, cafes eliminate queues and increase table turnover by up to 35%.",
        internalLink: {
          text: "Enable self-ordering at tables:",
          href: "/qr-ordering-system",
          anchor: "Contactless QR Table Ordering System"
        }
      }
    ]
  },
  "free-cafe-software": {
    slug: "free-cafe-software",
    title: "Free Cafe Software: The Complete Guide to Free POS & Operations",
    metaTitle: "Free Cafe Software & POS Guide (2026)",
    metaDescription: "Complete guide to free cafe software and Free CafePOS. Learn how coffee shops save thousands with zero subscription POS, QR ordering, and recipe inventory.",
    keywords: ["free cafe software", "Free Cafe POS", "CafePOS free", "zero cost cafe pos", "free restaurant pos", "coffee shop software free"],
    publishDate: "2026-01-20",
    readTime: "7 min read",
    category: "Industry Economics",
    author: "BrewPluse Product Team",
    excerpt: "Run BrewPluse's free cafe management software online. Point of sale billing, recipe inventory tracking, thermal printing, and QR tables for ₹0/month subscription.",
    content: [
      {
        heading: "Why Pay Monthly Retainers for Basic POS Software?",
        body: "In the cafe business, every basis point of gross margin matters. Paying heavy software subscriptions before selling a single cup of coffee puts unnecessary strain on cash flow. BrewPluse offers free cafe management software that requires no upfront licenses or monthly maintenance fees.",
        keyPoints: [
          "Unlimited menu items and variant modifier configurations",
          "Unlimited staff accounts with role-based security",
          "Standard ESC/POS thermal printing compatibility",
          "Direct browser-based cloud access on any tablet or PC"
        ],
        internalLink: {
          text: "Start using our zero-cost platform:",
          href: "/free-cafe-management-software",
          anchor: "Get Free Cafe Management Software"
        }
      },
      {
        heading: "Key Capabilities Included in the Free Suite",
        body: "Free does not mean stripped-down. BrewPluse provides a full Cafe POS checkout terminal, visual digital menu showcase, paperless kitchen display screens, and sales analytics straight out of the box.",
        internalLink: {
          text: "See complete pricing and comparisons:",
          href: "/pricing",
          anchor: "Transparent POS Pricing"
        }
      }
    ]
  },
  "free-pos-systems-for-coffee-shops": {
    slug: "free-pos-systems-for-coffee-shops",
    title: "The Best Free POS Systems for Coffee Shops & Quick-Serve Cafes",
    metaTitle: "Best Free POS Systems for Coffee Shops",
    metaDescription: "Comparing the best free POS systems for coffee shops and cafes in 2026. Discover how CafePOS speeds up barista rush hours with zero subscription overhead.",
    keywords: ["free pos systems for coffee shops", "Cafe POS", "CafePOS", "coffee shop pos", "quick serve pos", "free cafe billing software"],
    publishDate: "2026-01-25",
    readTime: "6 min read",
    category: "Coffee Shop Operations",
    author: "BrewPluse Coffee Desk",
    excerpt: "A complete 2026 guide comparing the best free POS systems for coffee shops: fast barista rush-hour CafePOS billing, table QR ordering, and zero subscription costs.",
    content: [
      {
        heading: "Barista Speed: The Ultimate Coffee Shop Metric",
        body: "During peak morning hours, an extra 10 seconds per transaction translates to lost revenue and agitated customers. Coffee shop POS systems must handle complex customization—oat milk, extra shot, half sweet, cold foam—with instantaneous touch response.",
        internalLink: {
          text: "Test drive our rapid cashier checkout:",
          href: "/cafe-pos",
          anchor: "Lightning-Fast Cafe POS"
        }
      },
      {
        heading: "Connecting Barista Displays to POS Terminals",
        body: "Printing paper receipts behind the espresso machine creates noise and lost drink tickets. With BrewPluse Kitchen Display System (KDS), orders fire instantly to kitchen and barista screens with live prep timers.",
        internalLink: {
          text: "Learn more about kitchen workflows:",
          href: "/kitchen-display-system",
          anchor: "Digital Kitchen Display System (KDS)"
        }
      }
    ]
  },
  "how-to-manage-cafe-inventory-efficiently": {
    slug: "how-to-manage-cafe-inventory-efficiently",
    title: "Mastering Cafe Inventory: Stop Waste, Track Milk & Coffee Margins",
    metaTitle: "How to Manage Cafe Inventory Efficiently",
    metaDescription: "Master cafe inventory control: stop milk wastage, track espresso bean extraction yield, automate recipe-level deductions, and maximize cafe profit margins.",
    keywords: ["cafe inventory management", "Cafe POS inventory", "CafePOS recipe tracking", "coffee shop raw material stock", "restaurant pos inventory"],
    publishDate: "2026-02-01",
    readTime: "8 min read",
    category: "Inventory Mastery",
    author: "Operations Lead, BrewPluse",
    excerpt: "Learn how to manage cafe raw material stock, automated recipe deductions in your Cafe POS, milk wastage, and coffee bean yield to stop shrinkage and boost cafe profitability.",
    content: [
      {
        heading: "The Hidden Cost of Unmeasured Pouring",
        body: "Milk and coffee beans represent up to 40% of prime beverage costs in specialty cafes. Uncalibrated grinders and steam wand overflow can eat away thousands in monthly profit if not tracked through an intelligent Cafe POS system.",
        internalLink: {
          text: "Supercharge your cafe operations:",
          href: "/cafe-management-software",
          anchor: "Cafe Management Software Suite"
        }
      },
      {
        heading: "Automating Recipe Deductions per Drink Order",
        body: "Every time a customer orders an iced caramel latte via your CafePOS or QR ordering table, BrewPluse automatically deducts 18g espresso beans, 220ml whole milk, and 20ml syrup from stock in real time.",
        internalLink: {
          text: "Upgrade your full restaurant inventory:",
          href: "/restaurant-management-software",
          anchor: "Restaurant Management Software"
        }
      }
    ]
  },
  "why-free-cafe-management-software-is-ultimate-solution": {
    slug: "why-free-cafe-management-software-is-ultimate-solution",
    title: "Why Free Cafe Management Software is the Ultimate Solution in 2026",
    metaTitle: "Why Free Cafe Management Software Wins",
    metaDescription: "Why independent cafe owners are dumping expensive POS contracts for free cafe management software with built-in QR tables, KDS, and zero monthly fees.",
    keywords: ["free cafe management software", "CafePOS", "Restaurant POS", "zero subscription pos", "free restaurant pos software"],
    publishDate: "2026-02-05",
    readTime: "5 min read",
    category: "Strategic Operations",
    author: "BrewPluse Editorial",
    excerpt: "Discover why modern cafes and coffee shops are replacing expensive legacy POS retainers with flexible, transparent ₹0/month cloud Cafe POS architecture.",
    content: [
      {
        heading: "The Paradigm Shift in Restaurant & Cafe Tech",
        body: "Historically, hospitality technology required dedicated proprietary hardware and thousands of dollars in software contracts. Modern cloud web standards have eliminated that gatekeeping, allowing cafe owners to run world-class CafePOS billing from any standard browser.",
        internalLink: {
          text: "Start with our free software today:",
          href: "/free-cafe-management-software",
          anchor: "Free Cafe POS & Management Software"
        }
      },
      {
        heading: "Scaling Without Incremental Software Tax",
        body: "Adding a second cash register, tableside tablets, or an extra outlet shouldn't multiply your software fees. BrewPluse empowers growing venues with unlimited devices on a single cafe account.",
        internalLink: {
          text: "See our restaurant solution:",
          href: "/free-restaurant-pos",
          anchor: "Free Restaurant POS System"
        }
      }
    ]
  },
  "what-is-a-qr-ordering-system": {
    slug: "what-is-a-qr-ordering-system",
    title: "What is a QR Ordering System: Complete 2026 Guide for Restaurants & Cafes",
    metaTitle: "What is a QR Ordering System? (2026)",
    metaDescription: "Comprehensive guide to QR ordering systems for restaurants and cafes: how table scanning works, UPI checkout, kitchen routing, and anti-fraud geofencing.",
    keywords: ["what is a qr ordering system", "table qr ordering", "Cafe POS QR code", "Restaurant POS QR", "contactless dining system"],
    publishDate: "2026-02-10",
    readTime: "7 min read",
    category: "Hospitality Tech Guide",
    author: "Product Strategy, BrewPluse",
    excerpt: "Learn how QR ordering systems work with your Restaurant POS and Cafe POS: from guest camera scanning to live kitchen KDS dispatch, UPI payments, and table turnover speed.",
    content: [
      {
        heading: "How Contactless Table QR Ordering Works",
        body: "Guests sit down, open their phone camera, and scan a unique dynamic QR code placed on the table. The digital menu opens instantly without downloading any app, allowing guests to order and pay right from their seats.",
        internalLink: {
          text: "Learn about dynamic table codes:",
          href: "/qr-ordering-system",
          anchor: "QR Ordering System Guide"
        }
      },
      {
        heading: "Preventing Fake Orders with GPS Geofencing",
        body: "A frequent concern with QR menus is remote prank ordering. BrewPluse solves this with patented GPS radius verification, ensuring orders can only be placed by guests physically seated inside your venue.",
        internalLink: {
          text: "Explore our digital storefront:",
          href: "/digital-menu",
          anchor: "Interactive Digital Menu Showcase"
        }
      }
    ]
  },
  "kitchen-display-system-vs-paper-kot": {
    slug: "kitchen-display-system-vs-paper-kot",
    title: "Kitchen Display System (KDS) vs Paper KOT: Which is Better for Your Kitchen?",
    metaTitle: "KDS vs Paper KOT: Which is Better?",
    metaDescription: "Comprehensive comparison between digital Kitchen Display Systems (KDS) and traditional paper kitchen order tickets (KOT) on speed, cost, and order accuracy.",
    keywords: ["kitchen display system vs paper kot", "KDS vs KOT", "kitchen display system", "Cafe POS KDS", "Restaurant POS kitchen display"],
    publishDate: "2026-02-15",
    readTime: "6 min read",
    category: "Kitchen Operations",
    author: "Culinary Tech Team, BrewPluse",
    excerpt: "A comprehensive comparison between digital Kitchen Display Systems (KDS) synced to your Cafe POS and traditional paper kitchen order tickets (KOT) on speed, cost, and order accuracy.",
    content: [
      {
        heading: "The Flaws of Paper Kitchen Tickets",
        body: "Thermal printer ribbons jam, paper tickets get lost or soaked in kitchen grease, and cashiers have no idea whether an order is 2 minutes or 20 minutes away from completion. Digital KDS screens resolve all of these headaches.",
        internalLink: {
          text: "Discover paperless kitchen displays:",
          href: "/kitchen-display-system",
          anchor: "Paperless Kitchen Display System"
        }
      },
      {
        heading: "Station Routing: Barista Screen vs Kitchen Screen",
        body: "With BrewPluse, hot drinks route automatically to the barista station screen while food items route to the prep line screen, keeping kitchen stations synchronized and quiet.",
        internalLink: {
          text: "Connect to your front-counter POS:",
          href: "/cafe-pos",
          anchor: "Cafe POS System"
        }
      }
    ]
  },
  "how-to-setup-qr-menu-for-cafe": {
    slug: "how-to-setup-qr-menu-for-cafe",
    title: "Step-by-Step: How to Set Up a Digital QR Menu for Your Cafe in 5 Minutes",
    metaTitle: "Set Up a Cafe Digital QR Menu in 5 Mins",
    metaDescription: "Practical step-by-step tutorial for cafe owners to build an interactive digital menu, configure modifiers, and print custom table QR codes with BrewPluse.",
    keywords: ["how to setup qr menu for cafe", "digital qr menu setup", "CafePOS menu builder", "table qr codes cafe", "restaurant qr menu free"],
    publishDate: "2026-02-20",
    readTime: "5 min read",
    category: "Tutorial",
    author: "Customer Success Team",
    excerpt: "A quick, practical tutorial for cafe owners to build an interactive digital menu, configure food modifiers, and print custom table QR codes with BrewPluse Cafe POS.",
    content: [
      {
        heading: "Step 1: Build Your Food & Drink Categories",
        body: "Log into your BrewPluse dashboard, create categories like Espresso Bar, Cold Drinks, Pastries, and Toasties. Attach high-resolution food photography and dietary tags like Vegan or Gluten-Free.",
        internalLink: {
          text: "Check our full setup playbook:",
          href: "/how-to-use",
          anchor: "5-Minute Cafe POS Playbook"
        }
      },
      {
        heading: "Step 2: Print Dynamic Table QR Stickers",
        body: "Download formatted PDF sheets with table-specific QR codes. Print them on waterproof acrylic stands or vinyl stickers for your dining tables.",
        internalLink: {
          text: "Explore visual menu capabilities:",
          href: "/digital-menu",
          anchor: "Digital Menu System"
        }
      }
    ]
  },
  "restaurant-staff-ordering-system-guide": {
    slug: "restaurant-staff-ordering-system-guide",
    title: "How Mobile Waiter Ordering Systems Accelerate Table Turns & Boost Tips",
    metaTitle: "Mobile Waiter Ordering System Guide",
    metaDescription: "Explore how tableside handheld ordering on tablets and smartphones connected to your Restaurant POS eliminates double-entry errors and boosts staff efficiency.",
    keywords: ["restaurant staff ordering system", "waiter mobile ordering", "handheld restaurant pos", "Resturant POS staff ordering", "tableside ordering tablet"],
    publishDate: "2026-02-25",
    readTime: "6 min read",
    category: "Service Excellence",
    author: "Hospitality Consultant, BrewPluse",
    excerpt: "Explore how tableside handheld ordering on tablets and smartphones connected to your Restaurant POS eliminates double-entry errors, speeds up food preparation, and boosts staff efficiency.",
    content: [
      {
        heading: "Eliminate Waiter Running Back and Forth",
        body: "Traditional restaurant service forces waitstaff to jot orders on paper pads and walk over to a central terminal to re-type them. With BrewPluse staff mobile POS, orders fire straight to the kitchen right from the table.",
        internalLink: {
          text: "Equip your waitstaff with mobile POS:",
          href: "/staff-ordering-system",
          anchor: "Staff & Waiter Mobile Ordering System"
        }
      },
      {
        heading: "Unified With Your Main Restaurant POS",
        body: "All orders placed by waitstaff sync in real time with the central counter billing desk, updating table tab balances and item preparation states instantaneously.",
        internalLink: {
          text: "Learn more about our restaurant suite:",
          href: "/restaurant-pos",
          anchor: "Full Restaurant POS System"
        }
      }
    ]
  },
  "cafe-pos-software-india-guide": {
    slug: "cafe-pos-software-india-guide",
    title: "The Complete Guide to Cafe POS Software in India: Billing, UPI & Zero-Fee Cloud",
    metaTitle: "Guide to Cafe POS Software in India",
    metaDescription: "Everything Indian cafe and coffee shop operators need to know about choosing Cafe POS and Resturant POS software: UPI QR codes, GST compliance, and zero monthly fees.",
    keywords: ["cafe pos software india", "Cafe POS India", "CafePOS India", "restaurant pos software india", "Resturant POS India", "free pos india", "gst cafe billing software"],
    publishDate: "2026-03-01",
    readTime: "8 min read",
    category: "India Hospitality Guide",
    author: "BrewPluse India Desk",
    excerpt: "Everything Indian cafe and coffee shop operators need to know about choosing Cafe POS and Resturant POS software: UPI QR codes, GST compliance, thermal printing, and zero monthly retainers.",
    content: [
      {
        heading: "The Unique Needs of Indian Cafes and Resturants",
        body: "In India, cafe operators require lightning-fast UPI QR code generation, seamless GST compliant invoices (CGST and SGST breakdowns), thermal receipt printing in standard 58mm and 80mm sizes, and zero expensive international monthly subscriptions.",
        keyPoints: [
          "Instant dynamic UPI QR code on bill prints and table screens",
          "GST compliant tax calculation with 1-click ledger exports",
          "Zero hardware lock-in: works on Windows laptops, Android tablets, iPads, and smartphones",
          "Zero monthly software subscription fees"
        ],
        internalLink: {
          text: "Start your free cafe in India:",
          href: "/cafe-pos",
          anchor: "BrewPluse Cafe POS (CafePOS) for Indian Cafes"
        }
      },
      {
        heading: "Restaurant POS and Dine-In Table Management in India",
        body: "Whether operating a quick-serve chai bar in Bangalore or a fine-dining cafe in Mumbai, BrewPluse offers complete floor table management, waiter ordering, and KDS synchronization tailored for Indian hospitality.",
        internalLink: {
          text: "See our restaurant management platform:",
          href: "/restaurant-pos",
          anchor: "Restaurant POS (Resturant POS) System"
        }
      }
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) return { title: "Article Not Found | BrewPluse" };

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `https://brewpluse.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://brewpluse.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": "https://brewpluse.com/storefront.png",
    "description": post.metaDescription,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": "https://brewpluse.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BrewPluse",
      "url": "https://brewpluse.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brewpluse.com/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://brewpluse.com/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brewpluse.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://brewpluse.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://brewpluse.com/blog/${post.slug}`
      }
    ]
  };

  const otherPosts = Object.values(blogPosts)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="w-full bg-[#FBFBFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Article Header */}
      <header className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3]">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs font-mono text-[#7a756f]">
            <Link href="/" className="hover:text-[#005c36]">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-[#005c36]">Blog</Link>
            <span>/</span>
            <span className="text-[#141210] font-medium truncate">{post.category}</span>
          </nav>

          <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold uppercase tracking-wider mb-4">
            {post.category} • {post.readTime}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5a554f] leading-relaxed mb-6">
            {post.excerpt}
          </p>

          <div className="pt-4 border-t border-[#EBE8E3] flex flex-wrap items-center justify-between text-xs font-mono text-[#8a857f] gap-4">
            <span>By {post.author}</span>
            <span>Published {post.publishDate}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <article className="space-y-10">
          {post.content.map((section, idx) => (
            <section key={idx} className="space-y-4 p-7 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs">
              <h2 className="text-xl sm:text-2xl font-bold text-[#141210]">
                {section.heading}
              </h2>
              <p className="text-sm sm:text-base text-[#4a4642] leading-relaxed">
                {section.body}
              </p>

              {section.keyPoints && (
                <ul className="space-y-2 pt-2">
                  {section.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2b2724]">
                      <span className="text-emerald-700 font-bold shrink-0 mt-0.5">✔</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.internalLink && (
                <div className="pt-3 border-t border-[#F3F2EE] mt-4">
                  <span className="text-xs text-gray-500 mr-2">{section.internalLink.text}</span>
                  <Link
                    href={section.internalLink.href}
                    className="text-xs sm:text-sm font-bold text-[#005c36] hover:underline inline-flex items-center gap-1"
                  >
                    <span>{section.internalLink.anchor}</span>
                    <span>→</span>
                  </Link>
                </div>
              )}
            </section>
          ))}
        </article>

        {/* CTA banner inside post */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-[#0b2b1a] text-white text-center shadow-lg">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-2">
            FREE CAFE POS &amp; RESTAURANT PLATFORM
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Ready to upgrade your cafe billing &amp; table ordering?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-6">
            Get started with BrewPluse CafePOS in under 5 minutes. Zero upfront fee, zero software subscription.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/signup"
              className="px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all"
            >
              Start Free Cafe POS
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-sm border border-white/20 transition-all"
            >
              View Pricing
            </Link>
          </div>
        </div>

        {/* Sibling Articles Cluster */}
        <div className="mt-16 pt-12 border-t border-[#E7E5E0]">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-6 text-center">
            RELATED CAFE &amp; RESTAURANT GUIDES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="p-5 rounded-2xl bg-white border border-[#E7E5E0] hover:border-emerald-600 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                    {related.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#141210] group-hover:text-[#005c36] transition-colors leading-snug">
                    {related.title}
                  </h4>
                </div>
                <span className="text-[11px] font-bold text-[#005c36] mt-4 flex items-center gap-1">
                  <span>Read Guide</span>
                  <span>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Global Modules Internal Linking Footer */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#E7E5E0] text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-3 block">
            EXPLORE BREWPLUSE POS MODULES
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link href="/cafe-pos" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Cafe POS (CafePOS)
            </Link>
            <Link href="/restaurant-pos" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Restaurant POS System
            </Link>
            <Link href="/free-cafe-management-software" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Free Cafe Software
            </Link>
            <Link href="/free-restaurant-pos" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Free Restaurant POS
            </Link>
            <Link href="/qr-ordering-system" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              QR Table Ordering
            </Link>
            <Link href="/kitchen-display-system" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Kitchen Display (KDS)
            </Link>
            <Link href="/digital-menu" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Digital QR Menu
            </Link>
            <Link href="/staff-ordering-system" className="px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-600 font-medium text-gray-700">
              Staff Waiter Ordering
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
