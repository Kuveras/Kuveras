import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gem, Store, Heart, UserRound, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { OfferBar } from '../common/OfferBar';
import { SearchBar } from '../common/SearchBar';
import { KuverasLogo } from '../common/KuverasLogo';
import { Navigation } from './Navigation';
import { StoreLocatorModal } from '../modals/StoreLocatorModal';
import { VisualSearchModal } from '../modals/VisualSearchModal';
import { ExploreCollectionsModal } from '../modals/ExploreCollectionsModal';

export const Header: React.FC = () => {
  const { totalItemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const {
    setIsAuthOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsMobileMenuOpen,
  } = useUI();
  const { user } = useAuth();

  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);
  const [isExploreCollectionsOpen, setIsExploreCollectionsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-t-2 border-t-[#0B5D3B] shadow-luxury-sm">
        {/* TIER 1: Top Promotional Offer Bar */}
        <OfferBar />

        {/* TIER 2: Main Desktop & Mobile Header Row */}
        <div className="w-full bg-[#FFFFFF] border-b border-[#EEEAE4] transition-all">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-12 h-[84px] lg:h-[98px] flex items-center justify-between gap-4">
            
            {/* Left: Mobile Menu Trigger & KUVERAS Logo */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#2B2723] hover:text-[#C89B3C] transition-colors focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link
                to="/"
                className="flex items-center hover:opacity-95 transition-opacity py-1 pl-0 lg:pl-2 shrink-0"
                aria-label="Kuveras Home"
              >
                <KuverasLogo className="w-[105px] md:w-[120px] xl:w-[138px] xl:max-w-[138px]" />
              </Link>
            </div>

            {/* Center: Large Animated Search Bar Centerpiece (Desktop) */}
            <div className="hidden lg:flex flex-1 justify-center max-w-[780px] px-4">
              <SearchBar
                onOpenVisualSearch={() => setIsVisualSearchOpen(true)}
              />
            </div>

            {/* Right: Utility Icons (Gem, Store, Wishlist, Account, Cart) */}
            <div className="flex items-center gap-3 sm:gap-5 lg:gap-[28px] shrink-0">
              
              {/* 1. Gem (Explore Collections) */}
              <button
                type="button"
                onClick={() => setIsExploreCollectionsOpen(true)}
                aria-label="Explore Collections"
                title="Explore Collections"
                className="p-1.5 text-[#6F6860] hover:text-[#C89B3C] active:text-[#0B5D3B] transition-colors focus:outline-none cursor-pointer"
              >
                <Gem className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
              </button>

              {/* 2. Store Locator */}
              <button
                type="button"
                onClick={() => setIsStoreLocatorOpen(true)}
                aria-label="Find a Store"
                title="Find a Store"
                className="p-1.5 text-[#6F6860] hover:text-[#C89B3C] active:text-[#0B5D3B] transition-colors focus:outline-none cursor-pointer"
              >
                <Store className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
              </button>

              {/* 3. Wishlist */}
              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                aria-label={`Wishlist (${wishlistCount} items)`}
                title="Wishlist"
                className="relative p-1.5 text-[#6F6860] hover:text-[#C89B3C] active:text-[#0B5D3B] transition-colors focus:outline-none cursor-pointer"
              >
                <Heart className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#C89B3C] text-[#FFFFFF] text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* 4. Account */}
              <button
                type="button"
                onClick={() => setIsAuthOpen(true)}
                aria-label="My Account"
                title={user ? `My Account (${user.name})` : "My Account"}
                className="p-1.5 text-[#6F6860] hover:text-[#C89B3C] active:text-[#0B5D3B] transition-colors focus:outline-none flex items-center gap-1.5 cursor-pointer"
              >
                <UserRound className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
              </button>

              {/* 5. Cart / Shopping Bag */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Shopping Bag (${totalItemCount} items)`}
                title="Shopping Bag"
                className="relative p-1.5 text-[#6F6860] hover:text-[#C89B3C] active:text-[#0B5D3B] transition-colors focus:outline-none cursor-pointer"
              >
                <ShoppingBag className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px]" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#C89B3C] text-[#FFFFFF] text-[10px] font-bold rounded-full flex items-center justify-center border border-white font-sans">
                    {totalItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Row (Below Top Mobile Row) */}
          <div className="lg:hidden px-4 pb-3 pt-1 border-t border-[#EEEAE4]/60 bg-[#FFFDF8]">
            <SearchBar
              onOpenVisualSearch={() => setIsVisualSearchOpen(true)}
            />
          </div>
        </div>

        {/* TIER 3: Second Desktop Navigation Bar with Mega Menus */}
        <Navigation />
      </header>

      {/* Interactive Utility Modals */}
      <StoreLocatorModal
        isOpen={isStoreLocatorOpen}
        onClose={() => setIsStoreLocatorOpen(false)}
      />

      <VisualSearchModal
        isOpen={isVisualSearchOpen}
        onClose={() => setIsVisualSearchOpen(false)}
      />

      <ExploreCollectionsModal
        isOpen={isExploreCollectionsOpen}
        onClose={() => setIsExploreCollectionsOpen(false)}
      />
    </>
  );
};
