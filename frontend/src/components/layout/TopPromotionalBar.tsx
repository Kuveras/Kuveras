import React from 'react';
import { useCart } from '../../context/CartContext';
import { useUI } from '../../context/UIContext';
import { Tag, Sparkles } from 'lucide-react';

export const TopPromotionalBar: React.FC = () => {
  const { applyCoupon } = useCart();
  const { showToast, openCart } = useUI();

  const handleApplyPromo = () => {
    const res = applyCoupon('GET20');
    showToast(res.message);
    openCart();
  };

  return (
    <div className="bg-[#0B5D3B] text-[#FFFDF8] text-xs py-2 px-4 border-b border-[#E7C982]/30 relative z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center justify-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#E7C982] animate-pulse" />
          <span className="text-[#FFFDF8]">
            SALE ALERT: UP TO 60% OFF NOW ON — Royal Kundan & Heritage Collections
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#E7C982] hidden md:inline font-semibold">Use Coupon:</span>
          <button
            onClick={handleApplyPromo}
            className="inline-flex items-center gap-1.5 bg-transparent hover:bg-[#E7C982] text-[#E7C982] hover:text-[#06452F] border border-[#E7C982] px-3 py-0.5 font-mono text-[11px] font-bold tracking-widest uppercase transition-all duration-200"
            title="Click to apply promo GET20"
          >
            <Tag className="w-3 h-3" />
            GET 20 OFF
          </button>
        </div>
      </div>
    </div>
  );
};
