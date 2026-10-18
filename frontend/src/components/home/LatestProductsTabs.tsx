import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { Sparkles } from 'lucide-react';

type TabType = 'latest' | 'new' | 'popular' | 'bestseller';

export const LatestProductsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('latest');

  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'new':
        return PRODUCTS.filter((p) => p.newArrival).slice(0, 8);
      case 'popular':
        return PRODUCTS.filter((p) => p.popular).slice(0, 8);
      case 'bestseller':
        return PRODUCTS.filter((p) => p.bestseller).slice(0, 8);
      case 'latest':
      default:
        return PRODUCTS.slice(0, 8);
    }
  };

  const currentProducts = getFilteredProducts();

  return (
    <section className="py-16 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="flex items-center gap-2 text-[#C5A059] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">
            Discover Our Latest Creations
          </h2>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-2">
            {[
              { id: 'latest', label: 'Latest Products' },
              { id: 'new', label: 'New Arrivals' },
              { id: 'popular', label: 'Most Popular' },
              { id: 'bestseller', label: 'Best Seller' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 border ${
                  activeTab === tab.id
                    ? 'bg-[#111111] text-white border-[#111111] shadow-sm'
                    : 'bg-[#FFFDF9] text-[#7A736E] border-[#E8E2D9] hover:border-[#D4AF37] hover:text-[#111111]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
