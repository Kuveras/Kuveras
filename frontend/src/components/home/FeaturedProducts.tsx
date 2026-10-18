import React from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.featured || p.bestseller).slice(0, 4);

  return (
    <section className="py-16 bg-[#FFFDF9] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-end justify-between mb-10 pb-4 border-b border-[#E8E2D9]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-1">
              Handpicked Spotlight
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#111111]">
              Featured Jewellery Sets
            </h2>
          </div>

          <Link
            to="/shop"
            className="mt-4 sm:mt-0 text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#C5A059] transition-colors flex items-center gap-1 group"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
