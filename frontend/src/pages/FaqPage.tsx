import React, { useState } from 'react';
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const ALL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What materials are used in KUVERAS jewellery?',
    answer: 'KUVERAS specializes in high-end artificial & fashion jewellery handcrafted using premium brass and copper bases finished with 22K Gold Tone Polish — Jewellery that Carries a Legacy. We select high-grade uncut Kundan/Polki stones, AAA cubic zirconia crystals, freshwater pearls, and traditional royal meenakari enameling.',
  },
  {
    id: 'faq-2',
    question: 'How do I care for my jewellery?',
    answer: 'To preserve the gold polish and stone brilliance, keep your jewellery stored in sealed velvet pouches away from moisture. Avoid direct contact with perfumes, sanitizers, lotions, or hairsprays. Wipe with a dry cotton cloth after wearing.',
  },
  {
    id: 'faq-3',
    question: 'Do you offer jewellery rental?',
    answer: 'Yes! KUVERAS offers an exclusive 3-day luxury rental concierge for grand bridal suites, Kundan chokers, and royal Rani Haar sets with doorstep delivery across Delhi NCR & Pan-India at a fraction of retail prices.',
  },
  {
    id: 'faq-4',
    question: 'How does jewellery rental work?',
    answer: 'Browse our collection and tap "Rent Via WhatsApp". Our concierge verifies your event date, collects a standard refundable deposit, and arranges insured doorstep delivery across Delhi NCR and nationwide 1 day prior to your event and pickup the day after.',
  },
  {
    id: 'faq-5',
    question: 'How long does delivery take?',
    answer: 'We provide Express Delivery across Delhi. All orders above ₹3,000 qualify for FREE Insured Express Shipping across India via Bluedart/Delhivery. Standard dispatch within 24-48 hours with live tracking code.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer returns or exchanges?',
    answer: 'Yes. If an item arrives damaged or differs from your expectations, contact us within 48 hours of delivery for a hassle-free replacement or store credit code.',
  },
  {
    id: 'faq-7',
    question: 'How can I track my order?',
    answer: 'Once your order dispatches, you will receive an SMS and WhatsApp tracking link with real-time updates from our courier partners (Bluedart, Delhivery, or DHL).',
  },
  {
    id: 'faq-8',
    question: 'How do I choose the right size?',
    answer: 'All KUVERAS rings feature concealed adjustable bands to fit ring sizes 6 to 12. All chokers and necklaces include soft gold dori (drawstrings) for customizable length.',
  },
  {
    id: 'faq-9',
    question: 'How should I store my jewellery?',
    answer: 'Store each piece separately in ziplock pouches or original velvet boxes to prevent friction and tangling of delicate dori strings.',
  },
  {
    id: 'faq-10',
    question: 'How can I contact KUVERAS?',
    answer: 'Our luxury customer concierge is available 7 days a week (9 AM – 9 PM IST) via WhatsApp / Call at +91 99102 04680 or via email at kuverasoverseas@gmail.com.',
  },
];

export const FaqPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-16 sm:py-20 bg-[#FFFDF8] min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="w-12 h-12 rounded-full bg-[#FAF7F0] border border-[#E8E1D8] flex items-center justify-center mx-auto text-[#C89B3C]">
            <HelpCircle className="w-6 h-6 stroke-[1.5]" />
          </div>
          <span className="text-xs font-sans font-semibold tracking-[0.22em] text-[#C89B3C] uppercase block">
            CUSTOMER HELP
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2723] font-normal">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#6F6860] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about your KUVERAS jewellery experience.
          </p>
        </div>

        {/* Accordion Questions */}
        <div className="space-y-3">
          {ALL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-[#FFFFFF] border transition-all duration-200 ${
                  isOpen ? 'border-[#D8B56A] shadow-xs' : 'border-[#E8E1D8] hover:border-[#C89B3C]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
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
                  <div className="px-5 sm:px-6 pb-6 pt-1 font-sans text-sm text-[#6F6860] leading-relaxed border-t border-[#F3EEE6] animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="mt-14 bg-[#FFFDF8] border border-[#0B5D3B] p-8 text-center space-y-4 shadow-2xs">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#0B5D3B] block">
            NEED PERSONAL STYLING OR HELP?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2723] font-normal">
            Talk to Our Jewellery Concierge
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6F6860] max-w-md mx-auto leading-relaxed">
            Our stylists are available on WhatsApp 7 days a week to help with custom bridal curation, sizing, and rental dates.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20have%20a%20question."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#0B5D3B] hover:bg-[#075235] text-white text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
