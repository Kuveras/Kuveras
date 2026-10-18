import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Heart, ShoppingBag, MessageCircle, ExternalLink, Plus, Minus } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR, generateWhatsAppLink } from '../../utils/pricing';
import { StarRating } from '../common/StarRating';
import { SafeImage } from '../common/SafeImage';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, showToast } = useUI();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    showToast(`Added ${quantity} x '${quickViewProduct.name}' to Bag`);
    setQuickViewProduct(null);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(quickViewProduct);
    showToast(
      isWishlisted
        ? `Removed '${quickViewProduct.name}' from Wishlist`
        : `Added '${quickViewProduct.name}' to Wishlist`
    );
  };

  const handleViewFullProduct = () => {
    const slug = quickViewProduct.slug;
    setQuickViewProduct(null);
    navigate(`/product/${slug}#product-information`);
  };

  const whatsappUrl = generateWhatsAppLink(
    quickViewProduct.name,
    quickViewProduct.salePrice,
    quickViewProduct.rentalPrice,
    'rental',
    '919910204680',
    quickViewProduct.rentalPeriod || '3 Days'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-4xl bg-[#FFFDF9] border border-[#E8E2D9] shadow-2xl overflow-hidden animate-fade-in z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-20 p-2 bg-white/80 hover:bg-[#111111] hover:text-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery */}
        <div className="w-full md:w-1/2 p-6 bg-[#FAF8F5] flex flex-col justify-between">
          <div className="aspect-4/5 w-full bg-white border border-[#E8E2D9] overflow-hidden mb-4 relative">
            <SafeImage
              src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover object-center"
            />
            {quickViewProduct.discount > 0 && (
              <span className="absolute top-3 left-3 bg-[#8B0000] text-white text-xs font-bold uppercase px-2.5 py-1 tracking-wider">
                {quickViewProduct.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 border overflow-hidden shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                      : 'border-[#E8E2D9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7A736E] block mb-1">
              {quickViewProduct.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-bold mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="mb-4">
              <StarRating rating={quickViewProduct.rating} count={quickViewProduct.reviewCount} />
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-4 border-b border-[#F5F0EB] pb-4">
              <span className="font-sans text-2xl font-bold text-[#111111]">
                {formatINR(quickViewProduct.salePrice)}
              </span>
              {quickViewProduct.price > quickViewProduct.salePrice && (
                <span className="font-sans text-base text-[#7A736E] line-through">
                  {formatINR(quickViewProduct.price)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs text-[#7A736E] leading-relaxed mb-6 font-sans">
              {quickViewProduct.shortDescription || quickViewProduct.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Quantity:
              </span>
              <div className="flex items-center border border-[#E8E2D9] bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-[#1A1A1A] hover:bg-[#FAF8F5]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-xs font-bold text-[#111111]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-[#1A1A1A] hover:bg-[#FAF8F5]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Add To Bag
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`p-3 border transition-colors ${
                  isWishlisted
                    ? 'border-[#8B0000] bg-[#8B0000]/10 text-[#8B0000]'
                    : 'border-[#E8E2D9] hover:border-[#111111] text-[#1A1A1A]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#8B0000]' : ''}`} />
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Rent via WhatsApp ({formatINR(quickViewProduct.rentalPrice)}/{quickViewProduct.rentalPeriod || '3 Days'})
            </a>

            <button
              onClick={handleViewFullProduct}
              className="w-full text-center text-xs text-[#7A736E] hover:text-[#111111] font-semibold tracking-wider uppercase pt-2 flex items-center justify-center gap-1"
            >
              <span>View Full Product Specifications</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
