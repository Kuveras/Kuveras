import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { formatINR } from '../../utils/pricing';
import { SafeImage } from '../common/SafeImage';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, showToast } = useUI();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    total,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    amountNeededForFreeShipping,
  } = useCart();
  const { toggleWishlist } = useWishlist();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyCoupon(couponInput);
    if (res.success) {
      showToast(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleMoveToWishlist = (product: any) => {
    toggleWishlist(product);
    removeFromCart(product.id);
    showToast(`Moved '${product.name}' to Wishlist`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-[#FFFDF8] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE3D4] flex items-center justify-between bg-[#FAF7F0]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0B5D3B]" />
            <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-[#171512]">
              Shopping Bag ({cart.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#171512] hover:text-[#C89B3C] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5EFE5] px-5 py-3 border-b border-[#EDE3D4]">
          {amountNeededForFreeShipping > 0 ? (
            <div className="space-y-1.5">
              <p className="text-xs text-[#171512] font-medium flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#C89B3C]" />
                <span>
                  Add <strong className="text-[#7A1010]">{formatINR(amountNeededForFreeShipping)}</strong> more for <strong>FREE Express Shipping</strong>
                </span>
              </p>
              <div className="w-full bg-[#EDE3D4] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#C89B3C] h-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      ((3000 - amountNeededForFreeShipping) / 3000) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#0B5D3B] font-semibold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#0B5D3B]" />
              <span>You have unlocked Complimentary Insured Express Shipping!</span>
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#EDE3D4]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F0] border border-[#EDE3D4] flex items-center justify-center text-[#6F675E]">
                <ShoppingBag className="w-8 h-8 text-[#C89B3C]" />
              </div>
              <p className="font-serif text-xl text-[#171512] font-semibold">Your Shopping Bag is Empty</p>
              <p className="text-xs text-[#6F675E] max-w-xs font-sans">
                Explore our Royal Kundan, Rajwadi, and Bridal collections to curate your dream ensemble.
              </p>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#171512] text-xs uppercase tracking-widest font-bold transition-colors"
              >
                Explore Jewellery
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.product.id + (item.isRental ? '_rental' : '')} className="py-4 flex gap-4">
                <SafeImage
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover object-center bg-[#F5EFE5] border border-[#EDE3D4] shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-base font-medium text-[#171512]">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#6F675E] hover:text-[#7A1010] p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.isRental ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0B5D3B] bg-[#0B5D3B]/10 px-2 py-0.5 mt-1 border border-[#0B5D3B]/20">
                        <ShieldCheck className="w-3 h-3" /> 3-Day Rental
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#6F675E] block mt-0.5">
                        Category: {item.product.category}
                      </span>
                    )}

                    <div className="text-xs font-semibold text-[#171512] mt-1">
                      {formatINR(item.isRental ? item.product.rentalPrice : item.product.salePrice)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#EDE3D4] bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-[#171512] hover:bg-[#FAF7F0]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#171512]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-[#171512] hover:bg-[#FAF7F0]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleMoveToWishlist(item.product)}
                      className="text-[11px] text-[#C89B3C] hover:underline font-medium"
                    >
                      Save to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-[#FAF7F0] border-t border-[#EDE3D4] space-y-4">
            {/* Promo Code */}
            <div>
              {activeCoupon ? (
                <div className="flex items-center justify-between bg-[#FFFDF8] border border-[#C89B3C]/40 p-2.5 text-xs">
                  <div className="flex items-center gap-2 text-[#171512]">
                    <Tag className="w-4 h-4 text-[#C89B3C]" />
                    <span>Coupon <strong>{activeCoupon.code}</strong> Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[#7A1010] font-bold text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Promo Code (GET20)"
                    className="flex-1 bg-white border border-[#EDE3D4] px-3 py-2 text-xs uppercase placeholder-gray-400 focus:outline-none focus:border-[#C89B3C]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#171512] text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-[#7A1010] mt-1">{couponError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#6F675E] border-t border-[#EDE3D4] pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#171512] font-semibold">{formatINR(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#7A1010] font-semibold">
                  <span>Coupon Savings</span>
                  <span>- {formatINR(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="text-[#171512] font-semibold">
                  {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-serif font-bold text-[#171512] pt-2 border-t border-[#EDE3D4]">
                <span>Total Amount</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                showToast('Proceeding to Secure Checkout...');
              }}
              className="w-full py-3.5 bg-[#C89B3C] hover:bg-[#D4AF37] text-[#171512] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-luxury-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
