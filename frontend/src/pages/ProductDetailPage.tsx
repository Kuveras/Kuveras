import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SafeImage } from '../components/common/SafeImage';
import { Accordion } from '../components/common/Accordion';
import { StarRating } from '../components/common/StarRating';
import { formatINR, generateWhatsAppLink } from '../utils/pricing';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUI } from '../context/UIContext';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  CheckCircle2,
  Share2,
  X,
  ZoomIn,
  Images,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast, openCart } = useUI();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (
      window.location.hash === '#product-information' ||
      window.location.hash === '#rental-terms'
    ) {
      setTimeout(() => {
        const el = document.getElementById('product-information');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
    setSelectedImageIndex(0);
    setQuantity(1);
    setLightboxOpen(false);
  }, [slug]);

  const totalImages = product.images.length;

  const goNext = useCallback(() => {
    setSelectedImageIndex((i) => (i + 1) % totalImages);
  }, [totalImages]);

  const goPrev = useCallback(() => {
    setSelectedImageIndex((i) => (i - 1 + totalImages) % totalImages);
  }, [totalImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const handleScrollToProductInfo = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('product-information');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} x '${product.name}' to Bag`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    openCart();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    showToast(
      isWishlisted
        ? `Removed '${product.name}' from Wishlist`
        : `Added '${product.name}' to Wishlist`
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const whatsappUrl = generateWhatsAppLink(
    product.name,
    product.salePrice,
    product.rentalPrice,
    'rental',
    '919910204680',
    product.rentalPeriod || '1 Day'
  );

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const accordionItems = [
    {
      id: 'specifications',
      title: 'Product Information & Jewellery Craftsmanship',
      content: (
        <div className="space-y-3 font-sans">
          <p className="text-[#8B0000] font-serif text-sm font-semibold tracking-wide">
            "KUVERAS — Jewellery that Carries a Legacy"
          </p>
          <p className="text-xs sm:text-sm text-[#7A736E] leading-relaxed">
            {product.description}
          </p>
          <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#111111] space-y-1.5">
            <p>
              <strong>Handcrafted Heritage Base:</strong> Premium copper & brass alloy finished
              with 22K Gold Tone Polish (Artificial Jewellery Craftsmanship).
            </p>
            <p>
              <strong>Gemstone & Stone Setting:</strong> High-grade uncut Kundan / Polki, AAA
              cubic zirconia crystals, freshwater pearls, and authentic meenakari enameling.
            </p>
            <p>
              <strong>Delivery Coverage:</strong> Express doorstep delivery across Delhi NCR and
              insured nationwide courier dispatch.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#FAF8F5] p-3 border border-[#E8E2D9]">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="text-xs">
                <strong className="text-[#111111]">{key}:</strong>{' '}
                <span className="text-[#7A736E]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'rental',
      title: 'WhatsApp Rental Terms & Booking Procedure',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#7A736E] leading-relaxed font-sans">
          <p>
            <strong>Standard Rental Window:</strong> 3 full calendar days (Day 1: Doorstep
            Delivery across Delhi, Day 2: Occasion, Day 3: Scheduled Pickup).
          </p>
          <p>
            <strong>Security Deposit:</strong> Refundable security deposit is collected prior to
            dispatch and released within 24-48 hours after return inspection.
          </p>
          <p>
            <strong>Hygiene & Protection:</strong> Every set undergoes 100% medical-grade UV-C
            light sterilization and ultrasonic cleaning prior to packaging in tamper-proof velvet
            boxes.
          </p>
          <p>
            <strong>WhatsApp Booking:</strong> Click "Rent Via WhatsApp" to check live date
            availability with our Delhi concierge.
          </p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Insured Shipping & Delivery Timelines (Delhi & Pan-India)',
      content: (
        <p>
          Express delivery across Delhi. All orders above <strong>₹3,000</strong> qualify for{' '}
          <strong>FREE Insured Express Shipping</strong> across India via Bluedart/Delhivery.
          Standard dispatch within 24-48 hours with live tracking code.
        </p>
      ),
    },
    {
      id: 'care',
      title: 'Jewellery Care Guidelines',
      content: (
        <p>
          To maintain the brilliant gold luster and uncut Kundan stone setting, store in the
          provided soft microfiber pouch away from direct humidity, perfumes, hairsprays, and harsh
          chemicals. Clean gently with a soft dry cotton cloth after wearing.
        </p>
      ),
    },
  ];

  return (
    <div className="py-8 bg-[#FAF8F5] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#7A736E] mb-8">
          <Link to="/" className="hover:text-[#111111]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#111111]">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#111111]"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#111111] font-semibold truncate">{product.name}</span>
        </div>

        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#FFFDF9] border border-[#E8E2D9] p-6 sm:p-10 shadow-luxury mb-16">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* ─── Main Image ─── */}
            <div
              className="aspect-[4/5] w-full bg-[#FAF8F5] border border-[#E8E2D9] overflow-hidden relative group cursor-zoom-in select-none"
              onClick={() => setLightboxOpen(true)}
            >
              <SafeImage
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
              />

              {/* Discount badge */}
              {product.discount > 0 && (
                <span className="absolute top-4 left-4 bg-[#8B0000] text-white text-xs font-bold uppercase px-3 py-1 tracking-wider z-10 pointer-events-none">
                  {product.discount}% OFF
                </span>
              )}

              {/* Image counter badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 flex items-center gap-1.5 z-10 pointer-events-none">
                <Images className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold">{selectedImageIndex + 1}</span>
                <span className="text-white/50">/</span>
                <span className="text-white/70">{totalImages}</span>
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/55 backdrop-blur-sm text-white text-[11px] px-2 py-1.5 flex items-center gap-1.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-3 h-3 text-[#D4AF37]" />
                <span>Click to enlarge</span>
              </div>

              {/* Prev / Next arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 hover:bg-white border border-[#E8E2D9] flex items-center justify-center shadow-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 text-[#111111]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 hover:bg-white border border-[#E8E2D9] flex items-center justify-center shadow-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 text-[#111111]" />
                  </button>
                </>
              )}
            </div>

            {/* ─── Thumbnail Strip ─── */}
            {totalImages > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-[68px] h-[84px] border-2 overflow-hidden shrink-0 transition-all duration-200 ${
                      selectedImageIndex === idx
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-[1.06]'
                        : 'border-[#E8E2D9] opacity-55 hover:opacity-90 hover:border-[#C5A059]'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                    title={`Angle ${idx + 1} of ${totalImages}`}
                  >
                    <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                    {selectedImageIndex === idx && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ─── Mobile dot nav ─── */}
            {totalImages > 1 && (
              <div className="flex items-center justify-center gap-1.5 sm:hidden">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`rounded-full transition-all duration-300 ${
                      selectedImageIndex === idx
                        ? 'w-5 h-1.5 bg-[#D4AF37]'
                        : 'w-1.5 h-1.5 bg-[#E8E2D9]'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Buying Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A059]">
                  {product.category} • {product.occasion}
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs text-[#7A736E] hover:text-[#111111] flex items-center gap-1"
                  title="Share product"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4 border-b border-[#F5F0EB] pb-4">
                <StarRating rating={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-[#25D366] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} sets left)
                </span>
              </div>

              {/* Price Block */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-sans text-3xl font-bold text-[#111111]">
                  {formatINR(product.salePrice)}
                </span>
                {product.price > product.salePrice && (
                  <span className="font-sans text-base text-[#7A736E] line-through">
                    {formatINR(product.price)}
                  </span>
                )}
                <span className="text-xs font-semibold text-[#8B0000] uppercase tracking-wider">
                  Save {formatINR(product.price - product.salePrice)}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#7A736E] leading-relaxed mb-6 font-sans">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#E8E2D9] bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-[#1A1A1A] hover:bg-[#FAF8F5]"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-5 text-sm font-bold text-[#111111]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-[#1A1A1A] hover:bg-[#FAF8F5]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D9]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#111111] hover:bg-[#C5A059] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Bag
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3.5 border transition-colors ${
                    isWishlisted
                      ? 'border-[#8B0000] bg-[#8B0000]/10 text-[#8B0000]'
                      : 'border-[#E8E2D9] hover:border-[#111111] text-[#1A1A1A]'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#8B0000]' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#C5A059] text-[#111111] text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
              >
                Buy Now (Instant Checkout)
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Rent Via WhatsApp — {formatINR(product.rentalPrice)} /{' '}
                {product.rentalPeriod || '1 Day'}
              </a>

              <a
                href="#product-information"
                onClick={handleScrollToProductInfo}
                className="w-full text-center text-xs font-semibold text-[#8B0000] hover:text-[#C5A059] underline tracking-wider py-1 block transition-colors cursor-pointer"
              >
                View Rental Terms & Product Information Section ↓
              </a>

              {/* Insured Delivery Banner */}
              <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#E8E2D9] text-xs text-[#7A736E] space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-[#111111] font-semibold">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Doorstep Rental Delivery Across Delhi & Pan-India</span>
                </div>
                <p className="text-[11px] text-[#7A736E]">
                  Delivered in tamper-proof jewelry box with authenticity certificate and 100% UV-C
                  sanitization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Accordion */}
        <div
          id="product-information"
          className="bg-[#FFFDF9] border border-[#E8E2D9] p-6 sm:p-10 shadow-sm mb-16 scroll-mt-24"
        >
          <h2 className="font-serif text-2xl font-bold text-[#111111] mb-6 border-b border-[#E8E2D9] pb-3 flex items-center justify-between">
            <span>Product Information & Rental Terms</span>
            <span className="text-xs font-sans text-[#C5A059] font-normal tracking-wide">
              Jewellery that Carries a Legacy
            </span>
          </h2>
          <Accordion items={accordionItems} defaultOpenId="specifications" allowMultiple={true} />
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111111] font-bold mb-6">
              Related Jewellery Sets
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Lightbox Modal ─── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/96 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors z-20"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans tracking-[0.2em] z-20 select-none">
            {selectedImageIndex + 1} &nbsp;/&nbsp; {totalImages}
          </div>

          {/* Prev arrow */}
          {totalImages > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors z-20"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main lightbox image */}
          <div
            className="max-w-3xl max-h-[80vh] w-full px-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={product.images[selectedImageIndex]}
              alt={product.name}
              className="max-w-full max-h-[80vh] object-contain select-none drop-shadow-2xl"
              draggable={false}
            />
          </div>

          {/* Next arrow */}
          {totalImages > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 hover:bg-white/25 text-white flex items-center justify-center rounded-full transition-colors z-20"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Thumbnail strip */}
          {totalImages > 1 && (
            <div
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[90vw] overflow-x-auto pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-16 shrink-0 overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === idx
                      ? 'border-[#D4AF37] opacity-100 scale-110'
                      : 'border-white/20 opacity-40 hover:opacity-70 hover:border-white/50'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
