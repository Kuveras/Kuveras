import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import { formatINR } from '../../utils/pricing';
import { SafeImage } from './SafeImage';

interface SearchAutocompleteProps {
  query: string;
  onClose: () => void;
  onSelectQuery: (term: string) => void;
}

const POPULAR_SEARCHES = [
  "Kundan Jewellery",
  "Bridal Necklace",
  "Temple Jewellery",
  "Rani Haar",
  "Cubic Zirconia",
];

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  query,
  onClose,
  onSelectQuery,
}) => {
  const navigate = useNavigate();
  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed.length >= 2
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(trimmed)) ||
          p.tags.some((t) => t.toLowerCase().includes(trimmed))
        );
      })
    : PRODUCTS.slice(0, 4);

  const displayedProducts = matchingProducts.slice(0, 4);

  const handleProductClick = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSearchClick = (term: string) => {
    onSelectQuery(term);
    onClose();
    navigate(`/shop?search=${encodeURIComponent(term)}`);
  };

  return (
    <div
      role="listbox"
      className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#FFFFFF] border border-[#E5E1DC] rounded-[4px] shadow-lg overflow-hidden z-50 animate-fade-in-fast max-h-[460px] overflow-y-auto"
    >
      <div className="p-4 sm:p-5 space-y-5 divide-y divide-[#EEEAE4]">
        {/* POPULAR SEARCHES */}
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C89B3C] block mb-2 font-sans">
            Popular Searches
          </span>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => handleSearchClick(term)}
                className="px-3 py-1.5 text-xs text-[#2B2723] bg-[#FAFAF8] hover:bg-[#FFFDF8] hover:text-[#C89B3C] border border-[#EEEAE4] hover:border-[#C89B3C] rounded transition-all duration-150 font-sans"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C89B3C] block font-sans">
              Products {trimmed ? `(${matchingProducts.length})` : ''}
            </span>
            {trimmed && matchingProducts.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate(`/shop?search=${encodeURIComponent(query)}`);
                }}
                className="text-xs text-[#2B2723] hover:text-[#C89B3C] transition-colors"
              >
                View all results →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {displayedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.slug)}
                className="flex items-center gap-3 p-2 rounded hover:bg-[#FFFDF8] border border-transparent hover:border-[#EEEAE4] transition-all cursor-pointer group"
              >
                <div className="w-12 h-14 bg-[#FAF8F5] overflow-hidden rounded shrink-0 border border-[#E5E1DC]">
                  <SafeImage
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase font-medium text-[#C89B3C] tracking-wider block truncate">
                    {product.category}
                  </span>
                  <h4 className="text-xs font-serif font-normal text-[#2B2723] group-hover:text-[#C89B3C] truncate transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5 font-sans">
                    <span className="text-xs font-semibold text-[#2B2723]">
                      {formatINR(product.salePrice)}
                    </span>
                    {product.price > product.salePrice && (
                      <span className="text-[10px] text-[#8C8175] line-through">
                        {formatINR(product.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
