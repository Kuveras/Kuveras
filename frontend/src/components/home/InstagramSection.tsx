import React from 'react';
import { InstagramIcon } from '../common/Icons';

export const InstagramSection: React.FC = () => {
  const images = [
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
  ];

  return (
    <section className="py-16 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111] mb-1">
            Your Next Favourite Look Awaits
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium">
            on Instagram @KuverasShop
          </p>
        </div>

        {/* Horizontal Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {images.map((img, idx) => (
            <a
              key={idx}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden border border-[#E8E2D9] shadow-xs"
            >
              <img
                src={img}
                alt="Kuveras Instagram Style"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <InstagramIcon className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-widest transition-colors inline-flex items-center gap-2"
          >
            <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
};
