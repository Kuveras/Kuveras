import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR } from '../../utils/pricing';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { SafeImage } from './SafeImage';

interface EditorialProductCardProps {
  product: Product;
  aspectRatio?: string;
}

export const EditorialProductCard: React.FC<EditorialProductCardProps> = ({
  product,
  aspectRatio = 'aspect-[4/5]',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setQuickViewProduct, showToast } = useUI();

  const isWishlisted = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];
  const currentImage = isHovered && product.images.length > 1 ? secondaryImage : product.images[0];

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `Removed '${product.name}' from Wishlist`
        : `Added '${product.name}' to Wishlist`
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col h-full bg-[#FFFFFF] transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div className={`relative ${aspectRatio} w-full bg-[#FAF8F5] overflow-hidden cursor-pointer mb-4 border border-[#F2EDE4] group-hover:border-[#E5E1DC] transition-colors`}>
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <SafeImage
            src={currentImage}
            alt={product.seoTitle || product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.discount > 0 && (
            <span className="bg-[#0B5D3B] text-white text-[10px] font-semibold uppercase px-2 py-0.5 tracking-widest shadow-xs">
              {product.discount}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="bg-[#2B2723] text-[#FFFDF8] text-[9px] font-medium uppercase px-2 py-0.5 tracking-widest shadow-xs">
              Bestseller
            </span>
          )}
          {product.newArrival && !product.bestseller && (
            <span className="bg-[#C89B3C] text-white text-[9px] font-medium uppercase px-2 py-0.5 tracking-widest shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#2B2723] hover:text-[#C89B3C] transition-colors duration-200 shadow-xs hover:bg-white"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#C89B3C] text-[#C89B3C]' : 'stroke-[1.5]'
            }`}
          />
        </button>

        {/* Subtle Quick View hover action */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={handleQuickView}
            className="w-full py-2 bg-[#FFFFFF]/95 text-[#2B2723] hover:text-[#C89B3C] text-[11px] font-medium uppercase tracking-[0.15em] border border-[#EEEAE4] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex-1 flex flex-col justify-between text-center px-1 pb-1">
        <div>
          <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-[#C89B3C] block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-base sm:text-lg text-[#2B2723] font-normal hover:text-[#C89B3C] transition-colors line-clamp-1 mb-1.5 block"
          >
            {product.name}
          </Link>

          {/* Pricing */}
          <div className="flex items-center justify-center gap-2">
            <span className="font-sans text-sm sm:text-base font-semibold text-[#2B2723]">
              {formatINR(product.salePrice)}
            </span>
            {product.price > product.salePrice && (
              <span className="font-sans text-xs text-[#8C8175] line-through font-normal">
                {formatINR(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* View Details Link */}
        <Link
          to={`/product/${product.slug}`}
          className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#2B2723] group-hover:text-[#C89B3C] transition-colors flex items-center justify-center gap-1 pt-2 border-t border-[#F2EDE4]"
        >
          <span>View Details</span>
          <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
};
