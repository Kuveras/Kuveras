import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Search, ArrowRight, Tag } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { PRODUCTS } from '../../data/products';
import { formatINR } from '../../utils/pricing';
import { SafeImage } from '../common/SafeImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen } = useUI();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.occasion.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularTags = ['Kundan', 'Bridal', 'Temple', 'Rajwadi', 'Cubic Zirconia', 'Choker'];

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  const handleTagClick = (tag: string) => {
    setIsSearchOpen(false);
    navigate(`/shop?category=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Overlay Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E8E2D9] shadow-2xl overflow-hidden animate-fade-in z-10">
        {/* Search Header Input */}
        <div className="p-4 sm:p-6 bg-[#FFFDF9] border-b border-[#E8E2D9] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kundan, Rajwadi, Temple, Choker, Rani Haar..."
            autoFocus
            className="w-full bg-transparent text-base sm:text-lg text-[#111111] placeholder-gray-400 focus:outline-none font-serif"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-[#7A736E] hover:text-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3 bg-[#FAF8F5] border-b border-[#E8E2D9] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#7A736E] font-medium shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3 text-[#D4AF37]" /> Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-2.5 py-1 bg-[#FFFDF9] border border-[#E8E2D9] hover:border-[#D4AF37] text-[#1A1A1A] hover:text-[#C5A059] rounded-none shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#E8E2D9]">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#7A736E]">
              Type product title, gemstone type, or occasion to discover matching pieces.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#7A736E]">
              No jewellery items found matching "<strong className="text-[#111111]">{query}</strong>".
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product.slug)}
                className="py-3 flex items-center justify-between group cursor-pointer hover:bg-[#FFFDF9] px-2 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-14 object-cover border border-[#E8E2D9]"
                  />
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A736E]">
                      {product.category}
                    </span>
                    <h4 className="font-serif text-base font-medium text-[#111111] group-hover:text-[#C5A059] transition-colors">
                      {product.name}
                    </h4>
                    <span className="text-xs font-bold text-[#111111]">
                      {formatINR(product.salePrice)}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#7A736E] group-hover:text-[#C5A059] group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
