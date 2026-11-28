import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageCircle, Crown, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { ProductCard } from '../common/ProductCard';

export const BridalJewellerySection: React.FC = () => {
  const { products } = useProducts();
  // Filter products for bridal or occasions
  const bridalProducts = products.filter(
    (p) => p.category === 'Bridal / Wedding' || p.category === 'Kundan' || p.tags.some(t => t.toLowerCase().includes('bridal'))
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
            From majestic Kundan chokers to cascading Rani Haars and ornate Matha Pattis, adorn bridal masterpieces designed to carry generational heritage — available to <strong className="text-[#0B5D3B]">Rent at 30%</strong> or <strong>Buy to Own</strong>.
          </p>
        </div>

        {/* Bridal Editorial Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 items-start">
          {/* Left Column: Bridal Editorial Showcase + Concierge Banner */}
          <div className="lg:col-span-5 w-full lg:sticky lg:top-24 bg-[#4A0606] border border-[#C89B3C]/60 shadow-2xl overflow-hidden flex flex-col">
            {/* Editorial Bridal Showcase Image */}
            <div className="relative h-60 sm:h-72 lg:h-[340px] w-full overflow-hidden border-b border-[#C89B3C]/40 group">
              <img
                src="/images/04/IMG_1897-scaled.jpg"
                alt="Kuveras Royal Bridal Trousseau Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A0606] via-[#4A0606]/25 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#E7C982]">
                  <Crown className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>The Royal Trousseau Edit</span>
                </span>
                <span className="text-[10px] font-serif italic text-[#F5EFE5]/90">
                  Handcrafted Heritage
                </span>
              </div>
            </div>

            {/* Bridal Concierge Content Panel */}
            <div className="bg-gradient-to-br from-[#4A0606] via-[#6D0D0D] to-[#4A0606] text-white p-7 sm:p-8 flex flex-col justify-start relative overflow-hidden">
              {/* Subtle luxury gold ambient sheen & inner hairline frame */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(231,201,130,0.14)_0%,transparent_60%)] pointer-events-none" />
              <div className="absolute inset-2.5 border border-[#E7C982]/20 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rotate-45 bg-[#C89B3C] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#E7C982]">
                    BRIDAL CONCIERGE SERVICE
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-[30px] text-[#FFFDF8] font-normal leading-[1.2] tracking-wide">
                  Custom Bridal Matching &amp; Trousseau Consultation
                </h3>

                <div className="w-12 h-px bg-gradient-to-r from-[#C89B3C] to-transparent" />

                <p className="font-sans text-xs sm:text-[13.5px] text-[#F5EFE5]/90 leading-[1.7]">
                  Connect with our senior bridal stylists on WhatsApp. Share your lehenga or saree photos for customized jewellery pairing, doorstep delivery scheduling across Delhi NCR, and insured pan-India rentals.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-[#E7C982]/20 text-xs sm:text-[13px] text-[#F5EFE5]/95">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span>100% Medical-grade UV-C Sanitized Sets</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span>3-Day Rental Window (Delivery, Event &amp; Pickup)</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#C89B3C] shrink-0" />
                    <span>100% Refundable Security Deposit</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 relative z-10 flex flex-col sm:flex-row items-stretch gap-3">
                <a
                  href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20would%20like%20to%20book%20a%20Bridal%20Jewellery%20Styling%20Consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 bg-[#25D366] hover:bg-[#1FB858] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md whitespace-nowrap sm:flex-[1.4]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Bridal Concierge</span>
                </a>
                <Link
                  to="/shop?category=Bridal+%2F+Wedding"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-3 bg-[#540808]/40 hover:bg-[#C89B3C]/15 border border-[#C89B3C]/80 hover:border-[#E7C982] text-[#FFFDF8] text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap sm:flex-1"
                >
                  <span>View Bridal</span>
                </Link>
              </div>
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
            to="/shop?category=Bridal+%2F+Wedding"
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
