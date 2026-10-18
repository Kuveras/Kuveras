import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, ArrowRight } from 'lucide-react';

export const PromotionalBanner: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#06452F] text-white border border-[#E7C982]/40 overflow-hidden shadow-2xl">
          {/* Subtle Yantra Decorative Line */}
          <div className="absolute top-0 right-0 w-80 h-80 border border-[#E7C982]/10 rounded-full -mr-16 -mt-16 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E7C982]/20 border border-[#E7C982]/40 text-[#E7C982] text-xs font-bold uppercase tracking-widest">
                <Gift className="w-4 h-4 text-[#E7C982]" />
                <span>Royal Gifting & Bridal Edition</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FFFDF8] font-bold leading-tight">
                TIMELESS JEWELLERY <br />
                <span className="italic font-normal text-[#E7C982]">FOR YOUR SPECIAL MOMENTS</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#FFFDF8]/80 leading-relaxed max-w-lg font-sans">
                From traditional elegance to contemporary grace. Whether selecting an heirloom gift or completing your bridal wedding day trousseau, Kuveras offers certified craftsmanship and express insured shipping.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/shop?category=Bridal"
                  className="px-8 py-3.5 bg-[#C89B3C] hover:bg-[#E7C982] text-[#171512] text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-md"
                >
                  <span>EXPLORE COLLECTION</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/shop?category=Kundan"
                  className="px-6 py-3.5 border border-[#E7C982] text-[#FFFDF8] hover:bg-[#E7C982]/10 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Shop Kundan Gifts
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[360px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
                alt="Kuveras Bridal Jewellery Gift Campaign"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#06452F] via-transparent to-transparent lg:w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
