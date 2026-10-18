import React from 'react';
import { ShieldCheck, MessageCircle, Sparkles, RefreshCw, Truck, Lock } from 'lucide-react';
import { Accordion } from '../components/common/Accordion';

export const RentInfoPage: React.FC = () => {
  const rentalSteps = [
    {
      step: '01',
      title: 'Select Jewellery',
      description: 'Explore our catalog of royal Kundan chokers, temple gold-tone sets, and bridal Rani Haars. Click "Rent Via WhatsApp".',
      icon: Sparkles,
    },
    {
      step: '02',
      title: 'WhatsApp Consultation',
      description: 'Our jewellery concierge verifies date availability, rental fee breakdown, security deposit, and matching accessories.',
      icon: MessageCircle,
    },
    {
      step: '03',
      title: 'Confirm Booking & Deposit',
      description: 'Pay rental fee + refundable security deposit securely via UPI, NetBanking, or Credit Card.',
      icon: Lock,
    },
    {
      step: '04',
      title: 'UV-C Sanitization',
      description: 'Every piece undergoes medical-grade UV-C light sterilization and ultrasonic cleaning prior to dispatch.',
      icon: RefreshCw,
    },
    {
      step: '05',
      title: 'Insured Delivery',
      description: 'Receive your luxury set 24–48 hours before your occasion in a tamper-evident velvet box.',
      icon: Truck,
    },
    {
      step: '06',
      title: 'Hassle-Free Return Pickup',
      description: 'Place items back in box. Our courier team picks up from your doorstep on day 4. Deposit refunded upon inspection.',
      icon: ShieldCheck,
    },
  ];

  const rentalFaqs = [
    {
      id: 'r1',
      title: 'What is the standard rental duration?',
      content: 'Our standard rental period is 3 calendar days (Day 1: Delivery, Day 2: Occasion, Day 3: Pickup). Extended rental periods can be arranged via WhatsApp.',
    },
    {
      id: 'r2',
      title: 'How does the refundable security deposit work?',
      content: 'A refundable deposit (usually 30-50% of retail price) is held during the rental window. Once our inspection team verifies the returned set within 48 hours, the full deposit is released back to your bank account.',
    },
    {
      id: 'r3',
      title: 'What if there is minor wear or accidental damage?',
      content: 'Normal light wear on thread cords (dori) or back clasps is fully covered. Severe stone loss or metal bending will be assessed fairly from the deposit.',
    },
    {
      id: 'r4',
      title: 'Is the jewellery sanitized before I wear it?',
      content: 'Yes! Hygiene is paramount. Every returned rental item undergoes a 3-step purification process: ultrasonic bath, medical-grade UV-C sterilization, and velvet box sealing.',
    },
  ];

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8B0000]/10 border border-[#8B0000]/30 text-[#8B0000] text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>Jewellery that Carries a Legacy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#111111] leading-tight">
            Rent Royal Indian Jewellery <br />
            <span className="italic font-normal text-[#C5A059]">Doorstep Delivery Across Delhi & Pan-India</span>
          </h1>

          <p className="text-sm text-[#7A736E] leading-relaxed font-sans">
            Adorn heirloom Kundan, Rajwadi, and Bridal sets at a fraction of retail prices. Seamless WhatsApp booking, doorstep delivery across Delhi NCR, and 100% medical-grade UV-C sanitization.
          </p>
        </div>

        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {rentalSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="bg-[#FFFDF9] border border-[#E8E2D9] p-8 shadow-sm hover:shadow-luxury transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <span className="font-serif text-5xl font-bold text-[#E8E2D9] absolute top-4 right-4 pointer-events-none">
                  {s.step}
                </span>

                <div>
                  <div className="w-12 h-12 bg-[#FAF8F5] border border-[#D4AF37]/50 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#111111] mb-2">{s.title}</h3>
                  <p className="text-xs text-[#7A736E] leading-relaxed font-sans">
                    {s.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* WhatsApp CTA Card */}
        <div className="bg-[#111111] text-white p-8 sm:p-12 border border-[#D4AF37]/50 shadow-2xl mb-20 text-center max-w-4xl mx-auto space-y-6">
          <MessageCircle className="w-12 h-12 text-[#25D366] mx-auto animate-pulse" />
          <h2 className="font-serif text-3xl font-bold">Have Questions About Delivery Across Delhi or Rental Dates?</h2>
          <p className="text-xs sm:text-sm text-[#7A736E] max-w-lg mx-auto leading-relaxed">
            Chat directly with Kuveras Jewellery Concierge on WhatsApp for instant date availability checks, delivery across Delhi NCR, and custom bridal styling support.
          </p>

          <a
            href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20want%20to%20inquire%20about%20jewellery%20rental%20with%20doorstep%20delivery%20across%20Delhi."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>

        {/* Product Information & Rental Terms section */}
        <div id="product-information" className="bg-[#FFFDF9] border border-[#E8E2D9] p-8 max-w-4xl mx-auto shadow-sm scroll-mt-24">
          <div className="border-b border-[#E8E2D9] pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="font-serif text-2xl font-bold text-[#111111]">Product Information & Rental Terms</h2>
            <span className="text-xs text-[#8B0000] font-semibold">Doorstep Delivery Across Delhi & Pan-India</span>
          </div>
          <Accordion items={rentalFaqs} defaultOpenId="r1" allowMultiple={true} />
        </div>
      </div>
    </div>
  );
};
