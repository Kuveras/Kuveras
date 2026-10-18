import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Eye } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/pricing';
import { SafeImage } from '../common/SafeImage';

export const WishlistDrawer: React.FC = () => {
  const { isWishlistOpen, closeWishlist, setQuickViewProduct, showToast } = useUI();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  const handleAddToCart = (product: any) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
    showToast(`Moved '${product.name}' to your Shopping Bag`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay Backdrop */}
      <div
        onClick={closeWishlist}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8E2D9] flex items-center justify-between bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#8B0000] fill-[#8B0000]" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#111111]">
              Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={closeWishlist}
            className="p-2 text-[#1A1A1A] hover:text-[#C5A059] transition-colors"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#E8E2D9]">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FFFDF9] border border-[#E8E2D9] flex items-center justify-center text-[#8B0000]">
                <Heart className="w-8 h-8 text-[#8B0000]" />
              </div>
              <p className="font-serif text-xl text-[#111111] font-semibold">Your Wishlist is Empty</p>
              <p className="text-xs text-[#7A736E] max-w-xs">
                Save your favorite Kundan chokers, temple hair accessories, and CZ sets to revisit anytime.
              </p>
              <button
                onClick={closeWishlist}
                className="mt-2 px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-colors"
              >
                Browse Jewellery
              </button>
            </div>
          ) : (
            wishlist.map((product) => (
              <div key={product.id} className="py-4 flex gap-4">
                <SafeImage
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-24 object-cover object-center bg-[#FFFDF9] border border-[#E8E2D9] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base font-medium text-[#111111]">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="text-[#7A736E] hover:text-[#8B0000] p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[11px] text-[#7A736E] block mt-0.5">
                      {product.category}
                    </span>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#111111]">
                        {formatINR(product.salePrice)}
                      </span>
                      {product.price > product.salePrice && (
                        <span className="text-[11px] text-[#7A736E] line-through">
                          {formatINR(product.price)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 py-1.5 bg-[#111111] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Bag
                    </button>
                    <button
                      onClick={() => {
                        setQuickViewProduct(product);
                      }}
                      className="p-1.5 border border-[#E8E2D9] text-[#1A1A1A] hover:bg-[#FAF8F5]"
                      title="Quick View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-[#FFFDF9] border-t border-[#E8E2D9]">
            <button
              onClick={clearWishlist}
              className="w-full py-2.5 border border-[#8B0000] text-[#8B0000] text-xs font-semibold uppercase tracking-wider hover:bg-[#8B0000] hover:text-white transition-colors"
            >
              Clear Entire Wishlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
