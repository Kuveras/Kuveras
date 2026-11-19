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
  MessageCircle,
  Sparkles,
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Drawer with Warm Ivory Background #FFFDF8 */}
      <div className="relative w-4/5 max-w-xs bg-[#FFFDF8] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r border-[#E8E1D8]">
        <div>
          {/* Top Drawer Header */}
          <div className="p-4 border-b border-[#E8E1D8] flex items-center justify-between bg-[#FFFFFF]">
            <KuverasLogo className="w-[100px]" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 text-[#171512] hover:text-[#7A1010] transition-colors rounded-full cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Slogan pill in mobile menu */}
          <div className="px-4 py-2 bg-[#FAF0F0] border-b border-[#7A1010]/20 text-center">
            <span className="text-[10px] font-serif italic text-[#7A1010]">
              "Crafted for Eternal Elegance"
            </span>
          </div>

          {/* Accordion Navigation Items */}
          <nav className="p-4 divide-y divide-[#E8E1D8] text-xs uppercase tracking-[0.12em] font-sans">
            {/* ALL JEWELLERY */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('jewellery')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
              >
                <span>All Jewellery</span>
                {openSection === 'jewellery' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F675E] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'jewellery' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F675E]">
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

            {/* BRIDAL SUITE */}
            <div className="py-2.5">
              <button
                type="button"
                onClick={() => toggleSection('bridal')}
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>Bridal Suite</span>
                </span>
                {openSection === 'bridal' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'bridal' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F675E]">
                  {['Bridal Sets', 'Choker Sets', 'Royal Rani Haar', 'Matha Patti', 'Bridal Rental Packages'].map((item) => (
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
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
              >
                <span>Temple Art</span>
                {openSection === 'temple' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'temple' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F675E]">
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
                className="w-full flex items-center justify-between text-left py-2 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
              >
                <span>Bracelets</span>
                {openSection === 'bracelets' ? (
                  <Minus className="w-4 h-4 text-[#7A1010] stroke-[1.5]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
                )}
              </button>
              {openSection === 'bracelets' && (
                <div className="pl-3 py-2 space-y-2 text-xs normal-case tracking-normal text-[#6F675E]">
                  {['Bracelets', 'Bangles', 'Gold-tone Bracelets', 'Statement Bracelets'].map((item) => (
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
              className="flex items-center gap-2 w-full text-left py-3 text-xs font-semibold text-[#7A1010] hover:text-[#540808] cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#C89B3C] stroke-[1.5]" />
              <span>Rental Guide &amp; Policies</span>
            </button>

            {/* ABOUT US */}
            <button
              type="button"
              onClick={() => handleNav('/about')}
              className="block w-full text-left py-3 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
            >
              About Kuveras
            </button>

            {/* FAQS */}
            <button
              type="button"
              onClick={() => handleNav('/faqs')}
              className="flex items-center gap-2 w-full text-left py-3 text-xs font-semibold text-[#171512] hover:text-[#7A1010] cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#6F6860] stroke-[1.5]" />
              <span>FAQs &amp; Help</span>
            </button>
          </nav>

          {/* Quick WhatsApp Concierge Button */}
          <div className="p-4">
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20have%20an%20inquiry%20regarding%20jewellery."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Stylist</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E8E1D8] bg-[#FFFFFF]">
          <div className="flex items-center justify-around text-xs font-sans">
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAuthOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#171512] cursor-pointer"
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
              className="flex items-center gap-1.5 text-[#171512] cursor-pointer"
            >
              <Heart className="w-4 h-4 stroke-[1.5] text-[#7A1010]" />
              <span>Wishlist ({wishlistCount})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="flex items-center gap-1.5 text-[#171512] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5] text-[#C89B3C]" />
              <span>Cart ({totalItemCount})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
