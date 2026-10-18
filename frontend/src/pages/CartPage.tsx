import React from 'react';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/pricing';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, Tag } from 'lucide-react';
import { useUI } from '../context/UIContext';
import { useWishlist } from '../context/WishlistContext';
import { SafeImage } from '../components/common/SafeImage';

export const CartPage: React.FC = () => {
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
  const { showToast } = useUI();
  const [couponInput, setCouponInput] = React.useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    showToast(res.message);
    if (res.success) setCouponInput('');
  };

  const handleMoveToWishlist = (product: any) => {
    toggleWishlist(product);
    removeFromCart(product.id);
    showToast(`Moved '${product.name}' to Wishlist`);
  };

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold mb-8 border-b border-[#E8E2D9] pb-4">
          Shopping Bag ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>

        {cart.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <ShoppingBag className="w-12 h-12 text-[#D4AF37] mx-auto" />
            <h2 className="font-serif text-2xl text-[#111111] font-bold">Your Bag is Empty</h2>
            <p className="text-xs text-[#7A736E]">
              Discover our latest Kundan, Rajwadi, and Bridal collections.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Alert */}
              <div className="bg-[#FFFDF9] border border-[#E8E2D9] p-4 text-xs">
                {amountNeededForFreeShipping > 0 ? (
                  <div className="flex items-center gap-2 text-[#111111]">
                    <Truck className="w-4 h-4 text-[#C5A059]" />
                    <span>
                      Add <strong className="text-[#8B0000]">{formatINR(amountNeededForFreeShipping)}</strong> more to unlock <strong>FREE Express Shipping</strong>
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-[#25D366] font-semibold">
                    <Truck className="w-4 h-4 text-[#25D366]" />
                    <span>You have unlocked Complimentary Insured Express Shipping!</span>
                  </div>
                )}
              </div>

              <div className="bg-[#FFFDF9] border border-[#E8E2D9] divide-y divide-[#E8E2D9] shadow-sm">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <SafeImage
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover border border-[#E8E2D9]"
                      />
                      <div>
                        <h3 className="font-serif text-lg font-bold text-[#111111]">{item.product.name}</h3>
                        <span className="text-xs text-[#7A736E] block mb-1">{item.product.category}</span>
                        <span className="text-sm font-bold text-[#111111]">
                          {formatINR(item.isRental ? item.product.rentalPrice : item.product.salePrice)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      <div className="flex items-center border border-[#E8E2D9] bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-[#111111]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-[#111111]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleMoveToWishlist(item.product)}
                        className="text-xs text-[#C5A059] hover:underline"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#7A736E] hover:text-[#8B0000]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4 bg-[#FFFDF9] border border-[#E8E2D9] p-6 shadow-sm space-y-6 h-fit">
              <h2 className="font-serif text-xl font-bold text-[#111111] border-b border-[#E8E2D9] pb-3">
                Order Summary
              </h2>

              {/* Coupon */}
              <div>
                {activeCoupon ? (
                  <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#D4AF37]/40 p-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Code <strong>{activeCoupon.code}</strong> Applied</span>
                    </div>
                    <button onClick={removeCoupon} className="text-[#8B0000] font-bold">
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
                      className="flex-1 bg-white border border-[#E8E2D9] px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#D4AF37]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#111111] text-white text-xs font-bold uppercase hover:bg-[#C5A059]"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Calculations */}
              <div className="space-y-2 text-xs text-[#7A736E] border-t border-[#E8E2D9] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#111111] font-semibold">{formatINR(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8B0000] font-semibold">
                    <span>Discount</span>
                    <span>- {formatINR(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Shipping</span>
                  <span className="text-[#111111] font-semibold">
                    {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-serif font-bold text-[#111111] pt-3 border-t border-[#E8E2D9]">
                  <span>Total</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <button
                onClick={() => showToast('Proceeding to Secure Payment Gateway...')}
                className="w-full py-4 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
