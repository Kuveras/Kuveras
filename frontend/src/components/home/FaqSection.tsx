import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What materials are used in KUVERAS jewellery?',
    answer: 'KUVERAS jewellery features premium artificial & fashion jewellery crafted with brass and copper bases, finished with 22K Gold Tone Polish, hand-cut Kundan/Polki stones, AAA cubic zirconia, and authentic royal meenakari enameling — Jewellery that Carries a Legacy.',
  },
  {
    id: 'faq-2',
    question: 'How do I care for my jewellery?',
    answer: 'Keep your jewellery in moisture-free velvet boxes or soft pouches. Avoid direct contact with perfume, hairspray, and water. Wipe gently with a dry microfiber cloth after use.',
  },
  {
    id: 'faq-3',
    question: 'Do you offer jewellery rental and how does it work?',
    answer: 'Yes! We offer a 3-day luxury rental service for bridal and statement jewellery with doorstep delivery across Delhi NCR. Select "Rent Via WhatsApp" on any product page, choose your event dates, and our concierge will arrange insured delivery and doorstep pickup.',
  },
  {
    id: 'faq-4',
    question: 'How long does delivery take?',
    answer: 'We provide Express Delivery across Delhi. All orders above ₹3,000 qualify for FREE Insured Express Shipping across India via Bluedart/Delhivery. Standard dispatch within 24-48 hours with live tracking code.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer returns or exchanges?',
    answer: 'If an item arrives damaged or does not meet your expectations, notify our support team within 48 hours of delivery for a seamless exchange or store credit voucher.',
  },
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FFFDF8] border-b border-[#E8E1D8]">
      <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] sm:text-[12px] font-sans font-semibold tracking-[0.22em] uppercase text-[#C89B3C] block">
              HELP & CONCIERGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2723] font-normal leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#6F6860] leading-relaxed max-w-md">
              Everything you need to know about your KUVERAS jewellery experience, luxury rentals, craftsmanship, and shipping.
            </p>

            <div className="pt-4">
              <Link
                to="/faqs"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold uppercase tracking-[0.18em] text-[#0B5D3B] hover:text-[#C89B3C] transition-colors cursor-pointer group"
              >
                <span>VIEW ALL FAQS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Accordion Questions */}
          <div className="lg:col-span-7 divide-y divide-[#E8E1D8] border-t border-b border-[#E8E1D8]">
            {HOMEPAGE_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="py-4 transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left py-2 focus:outline-none group cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-serif text-lg sm:text-xl font-normal transition-colors ${
                        isOpen ? 'text-[#C89B3C]' : 'text-[#2B2723] group-hover:text-[#C89B3C]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-[#C89B3C]' : 'text-[#6F6860] group-hover:text-[#C89B3C]'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="pt-2 pb-3 font-sans text-sm text-[#6F6860] leading-relaxed animate-fade-in pr-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
