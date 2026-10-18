import React from 'react';
import { Sparkles, Shield, HeartHandshake } from 'lucide-react';

export const InfoCareSection: React.FC = () => {
  const cards = [
    {
      title: 'RING SIZER',
      description: 'No sizing needed—each ring is thoughtfully crafted to adjust for a perfect fit across all finger sizes.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'JEWELRY CARE',
      description: 'Treat your jewellery with gentle care. Remove before water, sleep, or workouts, keep away from perfumes, and store in a soft pouch or box to preserve its shine.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'PIERCING AFTERCARE',
      description: 'Keep the area clean and dry, avoid touching with unwashed hands, and allow your piercing time to heal naturally. Patience and care go a long way.',
      icon: HeartHandshake,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
            Essential Care Guidelines
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
            Jewellery Craft & Maintenance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.title}
                className="bg-[#FFFDF9] border border-[#E8E2D9] p-6 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video w-full overflow-hidden mb-6 border border-[#E8E2D9]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <IconComponent className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif text-xl font-bold text-[#111111] tracking-wider uppercase">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs text-[#7A736E] leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
