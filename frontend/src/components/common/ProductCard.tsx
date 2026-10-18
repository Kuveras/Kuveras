import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag, MessageCircle } from 'lucide-react';
import type { Product } from '../../types';
import { formatINR, generateWhatsAppLink } from '../../utils/pricing';
import { StarRating } from './StarRating';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { setQuickViewProduct, showToast } = useUI();

  const isWishlisted = isInWishlist(product.id);
  const secondaryImage = product.images[1] || product.images[0];
  const currentImage = isHovered && product.images.length > 1 ? secondaryImage : product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`Added '${product.name}' to your Shopping Bag`);
  };

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

  const whatsappUrl = generateWhatsAppLink(
    product.name,
    product.salePrice,
    product.rentalPrice,
    'rental',
    '919910204680',
    product.rentalPeriod || '3 Days'
  );

  return (
    <div
      className="group relative bg-[#FFFFFF] border border-[#E8E1D8] rounded-none overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C89B3C] hover:shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-4/5 w-full bg-[#F7F1E8] overflow-hidden cursor-pointer">
        <Link to={`/product/${product.slug}`}>
          <SafeImage
            src={currentImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
          />
        </Link>

        {/* Discount / Category Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.discount > 0 && (
            <span className="bg-[#7A1010] text-[#FFFDF8] text-[11px] font-bold uppercase px-2.5 py-1 tracking-wider">
              {product.discount}% OFF
            </span>
          )}
          {product.bestseller && (
            <span className="bg-[#0B5D3B] text-[#FFFDF8] text-[10px] font-medium uppercase px-2.5 py-0.5 tracking-wider border border-[#E7C982]/40">
              Bestseller
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-xs rounded-full flex items-center justify-center text-[#2B2723] hover:bg-[#C89B3C] hover:text-white transition-colors duration-200 shadow-xs cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-[#7A1010] text-[#7A1010]' : ''
            }`}
          />
        </button>

        {/* Quick View Button */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
          <button
            onClick={handleQuickView}
            className="w-full py-2 bg-white/95 backdrop-blur-md text-[#2B2723] text-xs font-semibold uppercase tracking-widest hover:bg-[#C89B3C] hover:text-white transition-colors shadow-md border border-[#E8E1D8] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C89B3C] group-hover:text-white" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between text-center bg-[#FFFFFF]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#0B5D3B] block mb-1">
            {product.category}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="font-serif text-lg text-[#2B2723] font-medium hover:text-[#C89B3C] transition-colors line-clamp-1 mb-1.5 block cursor-pointer"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="flex justify-center mb-2">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          {/* Price */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="font-sans text-base font-bold text-[#2B2723]">
              {formatINR(product.salePrice)}
            </span>
            {product.price > product.salePrice && (
              <span className="font-sans text-xs text-[#6F6860] line-through">
                {formatINR(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#F3EEE6]">
          {/* Primary Button: Emerald Green */}
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-[#0B5D3B] hover:bg-[#075235] text-[#FFFFFF] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#FFFFFF]" />
            Add To Cart
          </button>

          {/* Secondary Button: Ivory with Gold Border & Hover */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-2 bg-[#FFFDF8] border border-[#C89B3C] text-[#2B2723] hover:bg-[#C89B3C] hover:text-[#FFFFFF] text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Rent Via WhatsApp ({formatINR(product.rentalPrice)}{product.rentalPeriod ? `/${product.rentalPeriod}` : ''})
          </a>
        </div>
      </div>
    </div>
  );
};
