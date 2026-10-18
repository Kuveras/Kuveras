import React from 'react';
import { TESTIMONIALS } from '../../data/products';
import { StarRating } from '../common/StarRating';
import { Quote } from 'lucide-react';

export const CustomerTestimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#FFFDF9] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
            Real Patron Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
            Happy Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-[#FAF8F5] border border-[#E8E2D9] p-6 shadow-sm flex flex-col justify-between hover:border-[#D4AF37] transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-[#D4AF37]/30 mb-3" />
                <div className="mb-3">
                  <StarRating rating={t.rating} showCount={false} size="md" />
                </div>
                <p className="text-xs text-[#1A1A1A] leading-relaxed italic font-serif mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9]">
                <h4 className="font-serif text-base font-bold text-[#111111]">
                  {t.name}
                </h4>
                {t.location && (
                  <span className="text-[10px] text-[#7A736E] uppercase tracking-wider font-semibold block mt-0.5">
                    {t.location} • Verified Purchaser
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
