# Recon map: CafeFlow (Web SaaS) -> BrewPluse

Scope: Public Marketing & Operating Systems Landing Pages, Architecture, UX Flow, and Modules
For: BrewPluse Cafe POS & Restaurant Operating System
Date: 2026-11-17

## Sources

| # | source | URL | notes |
| --- | --- | --- | --- |
| 1 | Homepage | https://cafeflow.fun/ | 9 Synchronized sections with interactive tablet mockup |
| 2 | Features | https://cafeflow.fun/features | Full breakdown of POS, KDS, QR ordering, variants, loyalty |
| 3 | Pricing | https://cafeflow.fun/pricing | ₹0 cafe owner fee, ₹1 customer convenience fee architecture |
| 4 | Compare | https://cafeflow.fun/compare | Side-by-side comparison against traditional POS & aggregators |
| 5 | Documentation | https://cafeflow.fun/documentation | Step-by-step operator guides and technical specs |
| 6 | Download | https://cafeflow.fun/download | PWA, browser support, hardware specs, thermal printer guides |
| 7 | FAQ | https://cafeflow.fun/faq | Categorized operator Q&A accordion system |
| 8 | How To Use | https://cafeflow.fun/how-to-use | Walkthrough workflows & video operations guide |
| 9 | Contact | https://cafeflow.fun/contact | Operator inquiries, enterprise onboarding, support channels |

## Core loop

Unified cafe operations on standard browsers (iPads, Android, laptops): Contactless QR ordering + Live Barista KDS + Rapid Counter POS with ₹0/month fixed SaaS fee.

## Screens & Routes

| ID | screen | route | purpose | key components |
| --- | --- | --- | --- | --- |
| S01 | Homepage | `/` | Complete platform overview | Hero tablet mockup, 3 Pillars, 4-step walkthrough, Pricing, FAQs |
| S02 | Features | `/features` | Comprehensive module directory | Module cards, feature lists, deep links |
| S03 | Pricing | `/pricing` | Transparent pricing breakdown | Fee cards, live calculation, comparison |
| S04 | Compare | `/compare` | Competitor alternative positioning | Feature matrix, total cost of ownership calculator |
| S05 | Documentation | `/documentation` | Knowledge base & operator guides | Section index, code/setup snippets, quick links |
| S06 | Download | `/download` | Multi-platform access & PWA install | OS badges (iOS, Android, Windows, Mac), hardware setup |
| S07 | FAQ | `/faq` | Operator questions & compliance | Filterable accordion categories, clear answers |
| S08 | How To Use | `/how-to-use` | Step-by-step video & guides | Setup timeline, station walkthroughs |
| S09 | Contact | `/contact` | Lead generation & direct support | Contact form, email, WhatsApp, enterprise inquiry |
| S10 | Product | `/product` | Core vertical slices | Deep architecture overview |
| S11 | QR Ordering | `/qr-ordering-software` | Mobile ordering capabilities | QR flow, diner experience |
| S12 | Traditional vs POS | `/cafe-pos-vs-traditional-pos` | SaaS displacement guide | Legacy vs modern comparison |
| S13 | POS Selection | `/how-to-choose-restaurant-management-software` | Buyer guide | Criteria checklist |
| S14 | Small Cafe Guide | `/how-to-manage-a-small-cafe` | Tactical operations manual | Speed, prep, waste reduction |

## Components

| component | variants | states | used on |
| --- | --- | --- | --- |
| Navbar | desktop, mobile drawer | sticky, blurred, dropdowns | all pages |
| Footer | desktop 4-column, mobile stack | dark `#001F19` with gold accents | all pages |
| TrustBar | ticker | static responsive row | home, product |
| HeroPosMockup | interactive tablet | tab active (All, QR, POS) | home |
| ProductWalkthrough | 4-step tabbed selector | step 1-4 active | home, how-to-use |
| PricingCalculator | dark `#001F19` cards | order slider, practice cards | home, pricing |
| ComparisonTable | table matrix | hover rows, highlight BrewPluse col | home, compare |
| FaqAccordion | expandable accordion | open, closed, animated chevron | home, faq |
| CtaBanner | banner with storefront | direct action, trust checklist | all pages |
