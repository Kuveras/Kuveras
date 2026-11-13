import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { SafeImage } from '../components/common/SafeImage';
import { ProductLightboxModal } from '../components/modals/ProductLightboxModal';
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
  ZoomIn,
  Images,
  ShieldCheck,
  Sparkles,
  Repeat,
  Package,
  Calendar,
  Lock,
  Award,
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
  const [pdpHoverZoom, setPdpHoverZoom] = useState({ isHovered: false, x: 50, y: 50 });
  const [shoppingMode, setShoppingMode] = useState<'buy' | 'rent'>('buy');

  const handlePdpMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setPdpHoverZoom({ isHovered: true, x, y });
  };

  const handlePdpMouseLeave = () => {
    setPdpHoverZoom({ isHovered: false, x: 50, y: 50 });
  };

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

  // Structured inquiry whatsapp URL
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

  // Extract included items
  const setIncludes = product.specifications['Set Includes'] || 'Necklace & Matching Earrings';

  const accordionItems = [
    {
      id: 'specifications',
      title: 'Product Information & Jewellery Craftsmanship',
      content: (
        <div className="space-y-4 font-sans text-xs sm:text-sm text-[#6F675E] leading-relaxed">
          <p className="text-[#7A1010] font-serif text-base font-semibold tracking-wide">
            "KUVERAS — Jewellery that Carries a Legacy"
          </p>
          <p>{product.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF7F0] p-4 border border-[#E8E1D8]">
            <div className="space-y-1">
              <strong className="text-[#171512] block">Set Includes:</strong>
              <span>{setIncludes}</span>
            </div>
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <strong className="text-[#171512] block">{key}:</strong>
                <span>{val}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-[#FAF0F0] border border-[#7A1010]/20 text-xs text-[#7A1010] space-y-1">
            <p className="font-semibold">Authenticity Guarantee:</p>
            <p className="text-[#171512]">
              Handcrafted in India with premium alloys, finished in authentic 22K Gold Tone Polish, AAA Cubic Zirconia crystals, and uncut Kundan/Polki work.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'rental',
      title: 'WhatsApp Rental Terms & Security Deposit Breakdown',
      content: (
        <div className="space-y-3 text-xs sm:text-sm text-[#6F675E] leading-relaxed font-sans">
          <p>
            <strong>Standard Rental Window (3 Days):</strong> Day 1 — Sanitized Doorstep Delivery across Delhi NCR; Day 2 — Your Occasion / Event; Day 3 — Scheduled Pickup from your address.
          </p>
          <p>
            <strong>Rental Fee Calculation:</strong> Exactly 30% of the bold discounted selling price ({formatINR(product.rentalPrice)}).
          </p>
          <p>
            <strong>100% Refundable Security Deposit:</strong> A standard refundable deposit is collected prior to dispatch and released back to your bank account/UPI within 24–48 hours of return inspection.
          </p>
          <p>
            <strong>Hygiene & Protection:</strong> Every set undergoes 100% medical-grade UV-C light sterilization and ultrasonic cleaning prior to sealing in tamper-evident velvet boxes.
          </p>
        </div>
      ),
    },
    {
      id: 'shipping',
      title: 'Doorstep Delivery & Insured Pan-India Dispatch',
      content: (
        <div className="space-y-2 text-xs sm:text-sm text-[#6F675E] leading-relaxed font-sans">
          <p>
            <strong>Delhi NCR (Delhi, Dwarka, Gurgaon, Faridabad, Noida):</strong> Free doorstep delivery and scheduled pickup by our dedicated courier.
          </p>
          <p>
            <strong>Pan-India:</strong> All purchase orders above ₹3,000 receive <strong>FREE Insured Express Shipping</strong> via Bluedart/Delhivery. Rental courier dispatch available with 5–7 days advance booking.
          </p>
        </div>
      ),
    },
    {
      id: 'care',
      title: 'Jewellery Care Guidelines',
      content: (
        <p className="text-xs sm:text-sm text-[#6F675E] leading-relaxed font-sans">
          To maintain the brilliant gold luster and uncut Kundan stone setting, store in the provided soft microfiber pouch away from direct humidity, perfumes, hairsprays, and harsh chemicals. Clean gently with a soft dry cotton cloth after wearing.
        </p>
      ),
    },
  ];

  return (
    <div className="py-8 bg-[#FFFDF8] min-h-screen animate-fade-in text-[#171512]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-[#6F675E] mb-6 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#7A1010]">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/shop" className="hover:text-[#7A1010]">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#7A1010]"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#171512] font-semibold truncate">{product.name}</span>
        </div>

        {/* Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-[#FFFFFF] border border-[#E8E1D8] p-6 sm:p-10 shadow-xs mb-16">

          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* ─── Main Image Frame ─── */}
            <div
              className="aspect-4/5 w-full bg-[#FAF7F0] border border-[#E8E1D8] overflow-hidden relative group cursor-zoom-in select-none"
              onClick={() => setLightboxOpen(true)}
              onMouseMove={handlePdpMouseMove}
              onMouseLeave={handlePdpMouseLeave}
            >
              <div
                className="w-full h-full will-change-transform"
                style={{
                  transformOrigin: `${pdpHoverZoom.x}% ${pdpHoverZoom.y}%`,
                  transform: pdpHoverZoom.isHovered ? 'scale(1.75)' : 'scale(1)',
                  transition: pdpHoverZoom.isHovered
                    ? 'transform 0.12s ease-out, transform-origin 0.04s linear'
                    : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <SafeImage
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Discount / Bestseller Badge */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 z-10 pointer-events-none">
                {product.discount > 0 && (
                  <span className="bg-[#7A1010] text-white text-xs font-bold uppercase px-3 py-1 tracking-wider shadow-xs">
                    {product.discount}% OFF
                  </span>
                )}
                <span className="bg-[#FAF7F0] text-[#7A1010] border border-[#7A1010]/30 text-[10px] font-bold uppercase px-2.5 py-0.5 tracking-wider">
                  Rent &amp; Buy Available
                </span>
              </div>

              {/* Image counter badge */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-2.5 py-1.5 flex items-center gap-1.5 z-10 pointer-events-none">
                <Images className="w-3.5 h-3.5 text-[#E7C982]" />
                <span className="font-semibold">{selectedImageIndex + 1}</span>
                <span className="text-white/50">/</span>
                <span className="text-white/70">{totalImages}</span>
              </div>

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1.5 flex items-center gap-1.5 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="w-3.5 h-3.5 text-[#E7C982]" />
                <span>Hover to zoom · Click to expand</span>
              </div>

              {/* Prev / Next Chevrons */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrev();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#7A1010] hover:text-white border border-[#E8E1D8] flex items-center justify-center shadow-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      goNext();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 hover:bg-[#7A1010] hover:text-white border border-[#E8E1D8] flex items-center justify-center shadow-md z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* ─── Thumbnail Strip ─── */}
            {totalImages > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-[70px] h-[86px] border-2 overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#7A1010] ring-1 ring-[#7A1010]'
                        : 'border-[#E8E1D8] opacity-60 hover:opacity-100 hover:border-[#C89B3C]'
                    }`}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <SafeImage src={img} alt="" className="w-full h-full object-cover" />
                    {selectedImageIndex === idx && (
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-[#7A1010]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Distinction (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C89B3C]">
                  {product.category} • {product.occasion}
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs text-[#6F675E] hover:text-[#7A1010] flex items-center gap-1 cursor-pointer"
                  title="Share product"
                >
                  <Share2 className="w-3.5 h-3.5" /> Share
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-4xl text-[#171512] font-normal mb-2 leading-snug">
                {product.name}
              </h1>

              {/* Slogan Identity */}
              <p className="text-xs font-serif italic text-[#7A1010] mb-3">
                "Crafted for Eternal Elegance • Jewellery that Carries a Legacy"
              </p>

              {/* Rating & Stock */}
              <div className="flex items-center gap-3 mb-4 border-b border-[#F3EEE6] pb-3">
                <StarRating rating={product.rating} count={product.reviewCount} size="md" />
                <span className="text-xs text-[#0B5D3B] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock} sets left)
                </span>
              </div>

              {/* What's In The Box Pills */}
              <div className="bg-[#FAF7F0] border border-[#E8E1D8] p-3 mb-5 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171512]">
                  <Package className="w-4 h-4 text-[#C89B3C]" />
                  <span>Set Includes:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  <span className="bg-white border border-[#E8E1D8] text-[11px] font-medium text-[#171512] px-2.5 py-1">
                    ✓ {setIncludes}
                  </span>
                  <span className="bg-white border border-[#E8E1D8] text-[11px] font-medium text-[#171512] px-2.5 py-1">
                    ✓ Adjustable Gold Dori
                  </span>
                  <span className="bg-white border border-[#E8E1D8] text-[11px] font-medium text-[#171512] px-2.5 py-1">
                    ✓ Tamper-proof Velvet Box
                  </span>
                </div>
              </div>

              {/* ─── DUAL RENT VS BUY INTERACTIVE SELECTOR ─── */}
              <div className="space-y-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#6F675E] block">
                  Choose Your Option:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {/* Buy Option Tab */}
                  <button
                    type="button"
                    onClick={() => setShoppingMode('buy')}
                    className={`p-3.5 text-left border-2 transition-all cursor-pointer ${
                      shoppingMode === 'buy'
                        ? 'border-[#7A1010] bg-[#FAF0F0]/60 shadow-xs'
                        : 'border-[#E8E1D8] bg-[#FFFFFF] hover:border-[#C89B3C]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1010]">
                        Option 1: Buy to Own
                      </span>
                      {shoppingMode === 'buy' && (
                        <span className="w-2 h-2 rounded-full bg-[#7A1010]" />
                      )}
                    </div>
                    <div className="font-sans text-xl font-bold text-[#171512]">
                      {formatINR(product.salePrice)}
                    </div>
                    {product.price > product.salePrice && (
                      <div className="text-[10px] text-[#6F675E] line-through font-sans">
                        MRP {formatINR(product.price)}
                      </div>
                    )}
                    <span className="text-[10px] text-[#0B5D3B] font-semibold block mt-1">
                      Heirloom to keep forever
                    </span>
                  </button>

                  {/* Rent Option Tab */}
                  <button
                    type="button"
                    onClick={() => setShoppingMode('rent')}
                    className={`p-3.5 text-left border-2 transition-all cursor-pointer ${
                      shoppingMode === 'rent'
                        ? 'border-[#0B5D3B] bg-[#FAF7F0] shadow-xs'
                        : 'border-[#E8E1D8] bg-[#FFFFFF] hover:border-[#C89B3C]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B5D3B]">
                        Option 2: Rent (30%)
                      </span>
                      {shoppingMode === 'rent' && (
                        <span className="w-2 h-2 rounded-full bg-[#0B5D3B]" />
                      )}
                    </div>
                    <div className="font-sans text-xl font-bold text-[#0B5D3B]">
                      {formatINR(product.rentalPrice)}
                    </div>
                    <div className="text-[10px] text-[#6F675E]">
                      Standard 3-Day Window
                    </div>
                    <span className="text-[10px] text-[#C89B3C] font-semibold block mt-1">
                      Doorstep Delivery Delhi NCR
                    </span>
                  </button>
                </div>
              </div>

              {/* Specific Details based on Selected Mode */}
              {shoppingMode === 'buy' ? (
                <div className="space-y-4">
                  {/* Quantity */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#171512]">
                      Quantity:
                    </span>
                    <div className="flex items-center border border-[#E8E1D8] bg-white">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-[#171512] hover:bg-[#FAF7F0] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm font-bold text-[#171512]">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-2 text-[#171512] hover:bg-[#FAF7F0] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Buy Buttons */}
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 py-3.5 bg-[#7A1010] hover:bg-[#540808] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#E7C982]" />
                        <span>Add To Bag</span>
                      </button>
                      <button
                        onClick={handleWishlistToggle}
                        className={`p-3.5 border transition-colors cursor-pointer ${
                          isWishlisted
                            ? 'border-[#7A1010] bg-[#FAF0F0] text-[#7A1010]'
                            : 'border-[#E8E1D8] hover:border-[#7A1010] text-[#171512]'
                        }`}
                        title="Save to Wishlist"
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#7A1010]' : ''}`} />
                      </button>
                    </div>

                    <button
                      onClick={handleBuyNow}
                      className="w-full py-3.5 bg-[#C89B3C] hover:bg-[#b08732] text-[#171512] text-xs font-bold uppercase tracking-widest transition-colors shadow-sm cursor-pointer"
                    >
                      Buy Now (Instant Checkout)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 bg-[#FAF7F0] p-4 border border-[#0B5D3B]/30">
                  <div className="space-y-1.5 text-xs text-[#6F675E]">
                    <div className="flex items-center gap-2 text-[#0B5D3B] font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span>3-Day Rental: Day 1 Delivery · Day 2 Occasion · Day 3 Pickup</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#171512]">
                      <Lock className="w-4 h-4 text-[#C89B3C]" />
                      <span>100% Refundable Security Deposit Released Within 48 Hrs</span>
                    </div>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Rent Via WhatsApp Concierge</span>
                  </a>

                  <p className="text-[11px] text-center text-[#6F675E]">
                    Our Delhi concierge will instantly check date availability and send deposit details.
                  </p>
                </div>
              )}

              {/* Trust Strip */}
              <div className="mt-5 pt-4 border-t border-[#E8E1D8] space-y-2 text-xs text-[#6F675E]">
                <div className="flex items-center gap-2 text-[#171512] font-semibold">
                  <Truck className="w-4 h-4 text-[#C89B3C]" />
                  <span>Doorstep Delivery Across Delhi NCR &amp; Insured Pan-India</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0B5D3B]" />
                  <span>100% UV-C Sterilization &amp; Authenticity Guaranteed</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="#product-information"
                  onClick={handleScrollToProductInfo}
                  className="text-xs font-semibold text-[#7A1010] hover:text-[#C89B3C] underline tracking-wider cursor-pointer"
                >
                  View Complete Specifications &amp; Rental Terms ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Rental Terms Accordion */}
        <div
          id="product-information"
          className="bg-[#FFFFFF] border border-[#E8E1D8] p-6 sm:p-10 shadow-xs mb-16 scroll-mt-24"
        >
          <div className="flex items-center justify-between border-b border-[#E8E1D8] pb-4 mb-6">
            <h2 className="font-serif text-2xl font-normal text-[#171512]">
              Product Details &amp; Rental Policies
            </h2>
            <span className="text-xs font-sans text-[#7A1010] font-semibold uppercase tracking-wider">
              Jewellery that Carries a Legacy
            </span>
          </div>
          <Accordion items={accordionItems} defaultOpenId="specifications" allowMultiple={true} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C89B3C] block mb-1">
                  COMPLETE YOUR ENSEMBLE
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#171512] font-normal">
                  Matching &amp; Related Sets
                </h3>
              </div>
              <Link
                to={`/shop?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold uppercase tracking-wider text-[#7A1010] hover:underline"
              >
                View More {product.category}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Full Screen Lightbox Modal */}
      <ProductLightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={product.images}
        currentIndex={selectedImageIndex}
        onIndexChange={setSelectedImageIndex}
        productName={product.name}
        category={product.category}
      />
    </div>
  );
};
