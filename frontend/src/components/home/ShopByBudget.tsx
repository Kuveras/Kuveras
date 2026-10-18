import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';

export const ShopByBudget: React.FC = () => {
  const navigate = useNavigate();

  const budgetCards = [
    {
      priceLabel: 'UNDER ₹3,000',
      offer: 'Extra ₹200 off on order above ₹3,000',
      tag: 'under-3000',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    },
    {
      priceLabel: 'UNDER ₹4,500',
      offer: 'Extra ₹300 off on order above ₹4,500',
      tag: 'under-4500',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    },
    {
      priceLabel: 'UNDER ₹7,000',
      offer: 'Extra ₹400 off on order above ₹7,000',
      tag: 'under-7000',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    },
    {
      priceLabel: 'UNDER ₹10,000',
      offer: 'Extra ₹500 off on order above ₹10,000',
      tag: 'under-10000',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
            Smart Savings
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
            Shop By Budget
          </h2>
          <p className="text-xs text-[#7A736E] max-w-md mx-auto mt-2 font-sans">
            Handcrafted luxury for every celebratory milestone. Unlock instant voucher discounts at checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgetCards.map((card) => (
            <div
              key={card.tag}
              onClick={() => navigate(`/shop?budget=${card.tag}`)}
              className="group relative bg-[#FFFDF9] border border-[#E8E2D9] p-5 shadow-sm hover:shadow-luxury hover:border-[#D4AF37] transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square w-full bg-[#FAF8F5] overflow-hidden mb-4 relative border border-[#E8E2D9]">
                  <img
                    src={card.image}
                    alt={card.priceLabel}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-[#111111] text-white text-[10px] font-bold uppercase px-2 py-0.5 tracking-wider flex items-center gap-1">
                    <Tag className="w-3 h-3 text-[#D4AF37]" />
                    <span>Special Voucher</span>
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#111111] tracking-wide mb-1">
                  {card.priceLabel}
                </h3>
                <p className="text-xs text-[#8B0000] font-semibold mb-4 leading-snug">
                  {card.offer}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F5F0EB] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#111111] group-hover:text-[#C5A059] transition-colors">
                  CLICK HERE
                </span>
                <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
