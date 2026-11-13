import React from 'react';
import { TESTIMONIALS } from '../../data/products';
import { StarRating } from '../common/StarRating';
import { Quote, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#FFFDF8] via-[#FAF7F0] to-[#FFFDF8] border-b border-[#E8E1D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0F0] border border-[#7A1010]/20 text-[#7A1010] text-[11px] font-sans font-bold uppercase tracking-[0.25em] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Real Patron Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171512]">
            Loved by Brides &amp; Celebrants
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#6F675E] max-w-xl mx-auto leading-relaxed">
            Discover what our patrons have to say about their rental and purchase experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FFFFFF] border border-[#E8E1D8] p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#C89B3C] hover:shadow-md transition-all duration-300 relative group"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FAF0F0] rounded-bl-full pointer-events-none -z-0 opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <Quote className="w-8 h-8 text-[#C89B3C]/40 mb-3" />
                <div className="mb-3">
                  <StarRating rating={t.rating} showCount={false} size="md" />
                </div>
                <p className="text-xs sm:text-sm text-[#171512] leading-relaxed italic font-serif mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3EEE6] relative z-10">
                <h4 className="font-serif text-base font-bold text-[#171512]">
                  {t.name}
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#0B5D3B] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.location || 'Delhi NCR'} • Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
