import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ShopByCategory: React.FC = () => {
  const categories = [
    {
      title: 'Shop Cubic Zirconia',
      subtitle: 'Modern Solitaire & Diamond Brilliance',
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      link: '/shop?category=Cubic+Zirconia',
    },
    {
      title: 'Shop Ethnic',
      subtitle: 'Royal Kundan, Rajwadi & Temple Craft',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      link: '/shop?category=Kundan',
    },
  ];

  return (
    <section className="py-16 bg-[#FFFDF9] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
            Visual Directory
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
            Shop By Style Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative h-96 overflow-hidden border border-[#E8E2D9] shadow-luxury block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs font-medium tracking-widest text-[#E8C5B0] uppercase block mb-1">
                  {cat.subtitle}
                </span>
                <h3 className="font-serif text-3xl font-bold mb-3">{cat.title}</h3>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
