import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 border-b border-[#E8E2D9] pb-4 mb-8">
          <Heart className="w-6 h-6 text-[#8B0000] fill-[#8B0000]" />
          <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">
            Saved Wishlist ({wishlist.length})
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-[#E8E2D9] p-12 text-center space-y-4 max-w-lg mx-auto shadow-sm">
            <Heart className="w-12 h-12 text-[#8B0000] mx-auto" />
            <h2 className="font-serif text-2xl text-[#111111] font-bold">Your Wishlist is Empty</h2>
            <p className="text-xs text-[#7A736E]">
              Save your favourite Royal Kundan and CZ sets to revisit anytime.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-[#111111] text-white text-xs uppercase tracking-widest font-bold hover:bg-[#C5A059] transition-colors"
            >
              Discover Jewellery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
