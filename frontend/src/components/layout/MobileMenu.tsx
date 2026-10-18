import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Plus,
  Minus,
  ShieldCheck,
  Heart,
  ShoppingBag,
  UserRound,
  HelpCircle,
} from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { KuverasLogo } from '../common/KuverasLogo';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setIsAuthOpen,
    setIsWishlistOpen,
    setIsCartOpen,
  } = useUI();
  const { wishlistCount } = useWishlist();
  const { totalItemCount } = useCart();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isMobileMenuOpen) return null;

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const handleNav = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer with Warm Ivory Background #FFFDF8 */}
      <div className="relative w-4/5 max-w-xs bg-[#FFFDF8] h-full shadow-xl flex flex-col justify-between overflow-y-auto z-10 border-r border-[#EEEAE4]">
        <div>
          {/* Top Drawer Header */}
          <div className="p-4 border-b border-[#E8E1D8] flex items-center justify-between bg-[#FFFFFF]">
            <KuverasLogo className="w-[95px]" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-[#2B2723] hover:text-[#C89B3C] transition-colors rounded-full cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Accordion Navigation Items */}
          <nav className="p-4 divide-y divide-[#E8E1D8] text-xs uppercase tracking-[0.12em] font-sans">
            {/* ALL JEWELLERY */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('jewellery')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
              >
                <span>All Jewellery</span>
                {openSection === 'jewellery' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'jewellery' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F6860]">
                  {['Kundan', 'Rajwadi', 'Temple Jewellery', 'Cubic Zirconia', 'Bridal / Wedding Jewellery', 'Matha Patti', 'Bracelets', 'Rings', 'Earrings', 'Choker Sets'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleNav(`/shop?category=${encodeURIComponent(cat)}`)}
                      className="block py-1.5 hover:text-[#7A1010] text-left w-full cursor-pointer"
                    >
                      {cat}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleNav('/shop')}
                    className="block py-1.5 font-semibold text-[#7A1010] text-left w-full uppercase text-[10px] tracking-widest cursor-pointer"
                  >
                    View All Collections →
                  </button>
                </div>
              )}
            </div>

            {/* BRIDAL */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('bridal')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
              >
                <span>Bridal</span>
                {openSection === 'bridal' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'bridal' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F6860]">
                  {['Bridal Sets', 'Choker Sets', 'Royal Rani Haar', 'Matha Patti', 'Gujarati Bride', 'Rajasthani Bride'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleNav('/shop?category=Bridal')}
                      className="block py-1.5 hover:text-[#7A1010] text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* TEMPLE */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('temple')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
              >
                <span>Temple</span>
                {openSection === 'temple' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'temple' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F6860]">
                  {['Temple Jewellery', 'Temple Necklaces', 'Temple Earrings', 'Temple Bangles', 'Temple Sets'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleNav('/shop?category=Temple')}
                      className="block py-1.5 hover:text-[#7A1010] text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BRACELETS */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('bracelets')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
              >
                <span>Bracelets</span>
                {openSection === 'bracelets' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'bracelets' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F6860]">
                  {['Bracelets', 'Bangles', 'Gold-tone Bracelets', 'Statement Bracelets', 'Daily Wear Bracelets'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleNav('/shop?category=Bracelets')}
                      className="block py-1.5 hover:text-[#7A1010] text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RENT INFO */}
            <button
              type="button"
              onClick={() => handleNav('/rent-info')}
              className="flex items-center gap-2 w-full text-left py-3 text-xs font-semibold text-[#0B5D3B] hover:text-[#075235] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#0B5D3B] stroke-[1.5]" />
              <span>Rent Info</span>
            </button>

            {/* ABOUT US */}
            <button
              type="button"
              onClick={() => handleNav('/about')}
              className="block w-full text-left py-3 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
            >
              About Us
            </button>

            {/* FAQS */}
            <button
              type="button"
              onClick={() => handleNav('/faqs')}
              className="flex items-center gap-2 w-full text-left py-3 text-xs font-semibold text-[#2B2723] hover:text-[#7A1010] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
              <span>FAQs</span>
            </button>
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EEEAE4] bg-[#FFFFFF]">
          <div className="flex items-center justify-around text-xs font-sans">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#2B2723]"
            >
              <UserRound className="w-4 h-4 stroke-[1.5]" />
              <span>Account</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#2B2723]"
            >
              <Heart className="w-4 h-4 stroke-[1.5] text-[#C89B3C]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#2B2723]"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5] text-[#0B5D3B]" />
              <span>Cart ({totalItemCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
