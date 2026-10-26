import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Contact Customer Support & Partner Onboarding | BrewPluse",
  description: "Get in touch with BrewPluse support for 5-minute cafe onboarding, thermal printer hardware compatibility assistance, billing inquiries & partnership help.",
  alternates: {
    canonical: 'https://brewpluse.com/contact',
  },
  openGraph: {
    title: "Contact Customer Support & Partner Onboarding | BrewPluse",
    description: "Get in touch with BrewPluse support for 5-minute cafe onboarding, thermal printer hardware compatibility assistance, billing inquiries & partnership help.",
    url: 'https://brewpluse.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact Customer Support & Partner Onboarding | BrewPluse",
    description: "Get in touch with BrewPluse support for 5-minute cafe onboarding, thermal printer hardware compatibility assistance, billing inquiries & partnership help.",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-[#FBFBFA]"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `{"@context":"https://schema.org","@type":"ContactPage","name":"Contact BrewPluse Support","url":"/contact","mainEntity":{"@type":"Organization","name":"BrewPluse","url":"/","email":"support@brewpluse.com","telephone":"+91-9471273041","contactPoint":{"@type":"ContactPoint","telephone":"+91-9471273041","contactType":"customer support","availableLanguage":["English","Hindi"]}}}` }} /><section className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3] text-center"><div className="max-w-4xl mx-auto"><div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-wider text-[#005c36] mb-4 shadow-xs"><span className="material-symbols-outlined text-rose-700 text-[16px]">support_agent</span><span>GET IN TOUCH</span></div><h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] mb-4">We're here to help your cafe thrive.</h1><p className="text-base sm:text-lg text-[#5a554f] max-w-2xl mx-auto leading-relaxed">Have questions about hardware compatibility, onboarding assistance, or custom features? Reach out directly.</p></div></section><section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"><div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"><div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between"><div><div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5"><span className="material-symbols-outlined text-[24px]">chat</span></div><h3 className="text-base font-bold text-[#141210] mb-1">WhatsApp & Phone</h3><p className="text-xs text-[#7a756f] leading-relaxed mb-4">Fastest support response for active cafe floor inquiries.</p></div><a href="https://wa.me/919471273041" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"><span>Chat on WhatsApp (+91 9471273041)</span><span>→</span></a></div><div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between"><div><div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5"><span className="material-symbols-outlined text-[24px]">mail</span></div><h3 className="text-base font-bold text-[#141210] mb-1">Email Support</h3><p className="text-xs text-[#7a756f] leading-relaxed mb-4">Detailed account queries, partnerships, and technical feedback.</p></div><a href="mailto:support@brewpluse.com" className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#141210] hover:bg-black text-white text-xs font-bold transition-colors shadow-xs"><span>support@brewpluse.com</span></a></div><div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between"><div><div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5"><span className="material-symbols-outlined text-[24px]">speed</span></div><h3 className="text-base font-bold text-[#141210] mb-1">System Health</h3><p className="text-xs text-[#7a756f] leading-relaxed mb-4">Real-time API uptime, database latency & sync cluster metrics.</p></div><a href="https://status.brewpluse.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#F3F2EE] hover:bg-[#E7E5E0] text-[#141210] text-xs font-bold transition-colors border border-[#E7E5E0]"><span>View Status Page</span><span>↗</span></a></div></div><div className="p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs text-xs text-[#5a554f] space-y-2"><div className="text-sm font-bold text-[#141210] mb-2">Registered Entity Details</div><div><strong>Legal Entity:</strong> BrewPluse Technologies (Represented by Ashish Kumar)</div><div><strong>Operating / Trade Name:</strong> BrewPluse</div><div><strong>Principal Place of Operation:</strong> Bihar, India</div><div><strong>Registered Email:</strong> support@brewpluse.com</div><div><strong>Operating Contact:</strong> +91 9471273041</div></div></section></div>
    </div>
  );
}
