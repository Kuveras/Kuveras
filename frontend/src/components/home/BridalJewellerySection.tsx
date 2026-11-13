import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Crown, ShieldCheck } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';

export const BridalJewellerySection: React.FC = () => {
  // Filter products for bridal or occasions
  const bridalProducts = PRODUCTS.filter(
    (p) => p.category === 'Bridal' || p.category === 'Kundan' || p.tags.some(t => t.toLowerCase().includes('bridal'))
  ).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FFFDF8] via-[#FAF0F0]/50 to-[#FFFDF8] border-b border-[#E8E1D8] relative overflow-hidden">
      {/* Decorative filigree glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-40 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,60,0.12)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0F0] border border-[#7A1010]/30 text-[#7A1010] text-[11px] font-sans font-bold uppercase tracking-[0.25em] rounded-full">
            <Crown className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>The Royal Bridal Suite</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#171512] font-normal leading-tight">
            Crafted for Your Most <br />
            <span className="italic text-[#7A1010]">Sacred Moments</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#6F675E] leading-relaxed max-w-2xl mx-auto">
            From majestic Kundan chokers to cascading Rani Haars and ornate Matha Pattis, adorn bridal masterpieces designed to carry generational heritage — available to <strong>Rent at 30%</strong> or <strong>Buy to Own</strong>.
          </p>
        </div>

        {/* Bridal Editorial Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-center">
          {/* Left Column: Bridal Banner Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#540808] to-[#7A1010] text-white p-8 sm:p-10 border-2 border-[#C89B3C]/50 shadow-xl flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#C89B3C]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E7C982] block">
                BRIDAL CONCIERGE SERVICE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-snug">
                Custom Bridal Matching &amp; Trousseau Consultation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#F5EFE5] leading-relaxed">
                Connect with our senior bridal stylists on WhatsApp. Share your lehenga or saree photos for customized jewellery pairing, doorstep delivery scheduling across Delhi NCR, and insured pan-India rentals.
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#F5EFE5]/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E7C982]" />
                  <span>100% Medical-grade UV-C Sanitized Sets</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E7C982]" />
                  <span>3-Day Rental Window (Delivery, Event &amp; Pickup)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E7C982]" />
                  <span>100% Refundable Security Deposit</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20would%20like%20to%20book%20a%20Bridal%20Jewellery%20Styling%20Consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Bridal Concierge</span>
              </a>
              <Link
                to="/shop?category=Bridal"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-[#E7C982] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>View Bridal</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Grid of Bridal Products */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {bridalProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* View All Bridal Link */}
        <div className="text-center">
          <Link
            to="/shop?category=Bridal"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#7A1010] hover:bg-[#540808] text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors shadow-md"
          >
            <span>Explore Complete Bridal Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
