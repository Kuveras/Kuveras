import React, { useState, useMemo } from 'react';
import { ChevronDown, MessageCircle, HelpCircle, Search, ShieldCheck, Sparkles, Phone } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'rental' | 'purchase' | 'delivery' | 'care';
  question: string;
  answer: string;
}

const ALL_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'care',
    question: 'What materials are used in KUVERAS jewellery?',
    answer: 'KUVERAS specializes in high-end artificial & fashion jewellery handcrafted using premium brass and copper alloys finished with 22K Gold Tone Polish — "Jewellery that Carries a Legacy". We select high-grade uncut Kundan/Polki stones, AAA cubic zirconia crystals, freshwater pearls, and traditional royal meenakari enameling.',
  },
  {
    id: 'faq-2',
    category: 'care',
    question: 'How do I care for my jewellery?',
    answer: 'To preserve the brilliant gold polish and stone settings, keep your jewellery stored in sealed velvet pouches away from moisture. Avoid direct contact with perfumes, sanitizers, lotions, or hairsprays. Wipe gently with a dry cotton cloth after wearing.',
  },
  {
    id: 'faq-3',
    category: 'rental',
    question: 'Do you offer jewellery rental?',
    answer: 'Yes! KUVERAS offers an exclusive 3-day luxury rental concierge for grand bridal suites, Kundan chokers, and royal Rani Haar sets with doorstep delivery across Delhi NCR & Pan-India at a fraction (30%) of retail purchase prices.',
  },
  {
    id: 'faq-4',
    category: 'rental',
    question: 'How does jewellery rental work?',
    answer: 'Browse our collection and tap "Rent Via WhatsApp". Our concierge verifies your event date, collects a standard refundable deposit, and arranges insured doorstep delivery across Delhi NCR (and nationwide) 1 day prior to your event, and scheduled pickup the day after.',
  },
  {
    id: 'faq-5',
    category: 'rental',
    question: 'What is the security deposit and when is it refunded?',
    answer: 'A refundable security deposit (typically 30–50% of retail price) is held as collateral during your rental period. It is 100% refunded to your original payment method (UPI, bank, or card) within 24–48 hours after the jewellery safely passes return inspection.',
  },
  {
    id: 'faq-6',
    category: 'rental',
    question: 'How is jewellery sanitized between rentals?',
    answer: 'Every piece undergoes a multi-tier medical-grade UV-C sterilization and ultrasonic cleaning process before being packed into a tamper-evident luxury velvet box, ensuring pristine hygiene and sparkling luster.',
  },
  {
    id: 'faq-7',
    category: 'delivery',
    question: 'How long does delivery take?',
    answer: 'We provide Express Doorstep Delivery across Delhi NCR. For nationwide courier orders, all orders above ₹3,000 qualify for FREE Insured Express Shipping across India via Bluedart/Delhivery. Standard dispatch occurs within 24-48 hours with live tracking.',
  },
  {
    id: 'faq-8',
    category: 'purchase',
    question: 'Can I both Rent and Buy products on KUVERAS?',
    answer: 'Yes! KUVERAS provides the flexibility to Buy and own forever or Rent for your special occasion. Both options are clearly displayed with transparent pricing on all product pages.',
  },
  {
    id: 'faq-9',
    category: 'purchase',
    question: 'Do you offer returns or exchanges for purchased jewellery?',
    answer: 'Yes. If a purchased item arrives damaged or differs from your expectations, contact our concierge within 48 hours of delivery for a hassle-free replacement or store credit code.',
  },
  {
    id: 'faq-10',
    category: 'delivery',
    question: 'How can I track my order?',
    answer: 'Once your order or rental dispatches, you will receive an SMS and WhatsApp tracking notification with real-time updates from our delivery team or courier partners.',
  },
  {
    id: 'faq-11',
    category: 'care',
    question: 'How do I choose the right size for chokers and rings?',
    answer: 'All KUVERAS rings feature concealed adjustable bands to fit standard ring sizes. All chokers, necklaces, and rani haars include handwoven adjustable gold dori (drawstrings) for customizable collar lengths.',
  },
  {
    id: 'faq-12',
    category: 'purchase',
    question: 'How can I contact the KUVERAS concierge?',
    answer: 'Our luxury customer concierge is available 7 days a week (9 AM – 9 PM IST) via WhatsApp at +91 99102 04680, Call at +91 88104 61628, or via email at kuverasoverseas@gmail.com.',
  },
];

export const FaqPage: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-3');
  const [activeCategory, setActiveCategory] = useState<'all' | 'rental' | 'purchase' | 'delivery' | 'care'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return ALL_FAQS.filter((faq) => {
      const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
      const matchesQuery =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-14 sm:py-20 bg-[#FFFDF8] min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0F0] border border-[#7A1010]/20 text-[#7A1010] text-[11px] font-sans font-semibold uppercase tracking-[0.25em] rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Customer Concierge &amp; FAQ</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171512] font-normal">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#6F675E] max-w-xl mx-auto leading-relaxed">
            Everything you need to know about buying, renting, doorstep delivery, and jewellery care at KUVERAS.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-8 max-w-xl mx-auto">
          <Search className="w-4 h-4 text-[#C89B3C] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions on rental, deposit, delivery, care..."
            className="w-full pl-11 pr-4 py-3 bg-[#FFFFFF] border border-[#E8E1D8] focus:border-[#C89B3C] text-sm text-[#171512] outline-none transition-colors shadow-2xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'rental', label: 'Rental & Deposits' },
            { id: 'purchase', label: 'Buying & Orders' },
            { id: 'delivery', label: 'Doorstep Delivery' },
            { id: 'care', label: 'Materials & Care' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#7A1010] text-white shadow-xs'
                  : 'bg-[#FFFFFF] border border-[#E8E1D8] text-[#6F675E] hover:border-[#C89B3C] hover:text-[#171512]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white border border-[#E8E1D8]">
              <p className="text-sm text-[#6F675E]">No questions found matching "{searchQuery}".</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                className="mt-3 text-xs font-bold uppercase text-[#7A1010] hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#FFFFFF] border transition-all duration-200 ${
                    isOpen ? 'border-[#C89B3C] shadow-xs' : 'border-[#E8E1D8] hover:border-[#C89B3C]'
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
                        isOpen ? 'text-[#7A1010] font-medium' : 'text-[#171512] group-hover:text-[#7A1010]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 ml-4 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-[#7A1010]' : 'text-[#6F675E] group-hover:text-[#7A1010]'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 font-sans text-sm text-[#6F675E] leading-relaxed border-t border-[#FAF0F0] animate-fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* WhatsApp Assistance Banner */}
        <div className="mt-14 bg-gradient-to-r from-[#FAF0F0] via-[#FAF7F0] to-[#FAF0F0] border-2 border-[#C89B3C]/50 p-8 text-center space-y-4 shadow-sm">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#7A1010] block">
            STILL HAVE QUESTIONS?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171512] font-normal">
            Talk Directly to Our Jewellery Stylists
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#6F675E] max-w-md mx-auto leading-relaxed">
            Our bridal and rental stylists are available on WhatsApp 7 days a week to answer all questions regarding sizing, custom bridal suites, and event dates.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20have%20a%20question%20regarding%20jewellery."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-sans font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
            <a
              href="tel:+918810461628"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#171512] hover:bg-[#7A1010] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>CALL CONCIERGE</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
