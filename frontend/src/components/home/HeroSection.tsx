import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, ShieldCheck, Repeat, ShoppingBag } from 'lucide-react';

interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  description: string;
  rentCtaText: string;
  rentCtaLink: string;
  buyCtaText: string;
  buyCtaLink: string;
  imageDesktop: string;
  imageMobile: string;
  position: 'left' | 'right';
  badge?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'bridal-heritage',
    eyebrow: 'ROYAL BRIDAL SUITE',
    headline: 'Crafted for\nEternal Elegance',
    tagline: 'Jewellery that Carries a Legacy',
    description: 'Adorn breathtaking Kundan & Polki bridal suites for your wedding day — available to Rent at 30% or Buy to cherish forever.',
    rentCtaText: 'RENT FOR BRIDAL',
    rentCtaLink: '/shop?category=Bridal',
    buyCtaText: 'BUY & OWN HEIRLOOM',
    buyCtaLink: '/shop?category=Bridal',
    imageDesktop: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=90',
    position: 'left',
    badge: '3-Day Rental Available',
  },
  {
    id: 'polki-legacy',
    eyebrow: 'MUGHAL KUNDAN & POLKI',
    headline: 'Jewellery that\nCarries a Legacy',
    tagline: 'Where Heritage Meets Royalty',
    description: 'Intricately set uncut gemstones and royal meenakari work crafted for memories that transcend generations.',
    rentCtaText: 'EXPLORE RENTAL',
    rentCtaLink: '/shop?category=Kundan',
    buyCtaText: 'SHOP THE COLLECTION',
    buyCtaLink: '/shop?category=Kundan',
    imageDesktop: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=90',
    position: 'right',
    badge: 'Authentic 22K Polish',
  },
  {
    id: 'rajwadi-grandeur',
    eyebrow: 'HERITAGE RAJWADI',
    headline: 'Majesty,\nReimagined',
    tagline: 'Crafted for Eternal Elegance',
    description: 'Celebrate the royal spirit with antique-gold finishes and commanding silhouettes suited for modern gala evenings.',
    rentCtaText: 'RENT THIS LOOK',
    rentCtaLink: '/shop?category=Rajwadi',
    buyCtaText: 'BUY RAJWADI',
    buyCtaLink: '/shop?category=Rajwadi',
    imageDesktop: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=90',
    position: 'left',
    badge: 'Doorstep Delivery Delhi NCR',
  },
  {
    id: 'temple-divinity',
    eyebrow: 'SACRED TEMPLE ART',
    headline: 'Divine Artistry,\nSacred Blessings',
    tagline: 'Lord Kubera Inspired Prosperity',
    description: 'Imbued with sacred motifs of wealth and protection, our Temple collection crowns every auspicious moment.',
    rentCtaText: 'RENT TEMPLE SETS',
    rentCtaLink: '/shop?category=Temple',
    buyCtaText: 'BUY COLLECTION',
    buyCtaLink: '/shop?category=Temple',
    imageDesktop: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=90',
    position: 'right',
    badge: 'Sacred Vedic Motifs',
  },
];

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      ref={containerRef}
      aria-label="Kuveras Luxury Jewellery Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full bg-[#FFFDF8] overflow-hidden select-none outline-none border-b border-[#E8E1D8]"
    >
      {/* ─── Hero Frame ─── */}
      <div className="relative w-full h-[560px] sm:h-[620px] lg:h-[680px] overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out ${
                isActive ? 'opacity-100 translate-x-0 z-10 pointer-events-auto' : 'opacity-0 translate-x-6 pointer-events-none z-0'
              }`}
            >
              {/* Background Photography */}
              <picture className="w-full h-full block">
                <source media="(max-width: 767px)" srcSet={slide.imageMobile} />
                <img
                  src={slide.imageDesktop}
                  alt={slide.headline.replace('\n', ' ')}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-1000 ease-out"
                />
              </picture>

              {/* Editorial Warm Ivory & Blush Gradient Overlay */}
              <div
                className={`absolute inset-0 hidden lg:block ${
                  slide.position === 'left'
                    ? 'bg-gradient-to-r from-[#FFFDF8] via-[#FFFDF8]/85 to-transparent w-[62%]'
                    : 'bg-gradient-to-l from-[#FFFDF8] via-[#FFFDF8]/85 to-transparent left-auto right-0 w-[62%]'
                }`}
              />

              {/* Mobile Gradient Overlay */}
              <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[#FFFDF8] via-[#FFFDF8]/90 to-black/20" />

              {/* Content Box */}
              <div className="relative max-w-[1360px] mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-end lg:items-center pb-12 lg:pb-0">
                <div
                  className={`w-full max-w-xl text-[#171512] space-y-4 ${
                    slide.position === 'right' ? 'ml-auto text-left' : 'mr-auto text-left'
                  }`}
                >
                  {/* Brand Identity Eyebrow */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF0F0] border border-[#7A1010]/30 text-[#7A1010] text-[11px] font-sans font-bold tracking-[0.2em] uppercase rounded-full">
                      <Sparkles className="w-3 h-3 text-[#C89B3C]" />
                      {slide.eyebrow}
                    </span>
                    {slide.badge && (
                      <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F0] border border-[#C89B3C]/40 text-[#9A7019] text-[10px] font-semibold uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-[#0B5D3B]" />
                        {slide.badge}
                      </span>
                    )}
                  </div>

                  {/* Headline */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#171512] font-normal leading-[1.1] tracking-tight whitespace-pre-line">
                    {slide.headline}
                  </h1>

                  {/* Slogan Subtitle */}
                  <div className="text-xs sm:text-sm font-serif italic text-[#7A1010] tracking-wide font-medium flex items-center gap-2">
                    <span className="w-8 h-px bg-[#C89B3C]" />
                    <span>"{slide.tagline}"</span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-[#6F675E] leading-relaxed max-w-lg">
                    {slide.description}
                  </p>

                  {/* Dual Rent and Buy Showcase Actions */}
                  <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3">
                    {/* Rent Action */}
                    <Link
                      to={slide.rentCtaLink}
                      className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#7A1010] hover:bg-[#540808] text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-md group"
                    >
                      <Repeat className="w-3.5 h-3.5 text-[#E7C982]" />
                      <span>{slide.rentCtaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Buy Action */}
                    <Link
                      to={slide.buyCtaLink}
                      className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-[#FFFDF8] hover:bg-[#FAF7F0] border border-[#C89B3C] text-[#171512] hover:text-[#7A1010] text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.18em] transition-all duration-300 shadow-xs group"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#C89B3C]" />
                      <span>{slide.buyCtaText}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Navigation Chevrons */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C89B3C]/40 bg-[#FFFDF8]/90 text-[#171512] hover:bg-[#7A1010] hover:text-white hover:border-[#7A1010] transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C89B3C]/40 bg-[#FFFDF8]/90 text-[#171512] hover:bg-[#7A1010] hover:text-white hover:border-[#7A1010] transition-all duration-300 flex items-center justify-center shadow-sm cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.5]" />
      </button>

      {/* Bottom Rent & Buy Quick Highlights Strip */}
      <div className="relative z-20 bg-gradient-to-r from-[#FAF0F0] via-[#FFFDF8] to-[#FAF0F0] border-t border-[#E8E1D8] px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6 divide-x divide-[#E8E1D8]">
            <div className="flex items-center gap-2 text-[#7A1010] font-semibold uppercase tracking-wider">
              <Repeat className="w-4 h-4 text-[#C89B3C]" />
              <span>Rent for Events: 30% Price · 3-Day Window</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 pl-6 text-[#0B5D3B] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#0B5D3B]" />
              <span>100% Medical UV-C Sanitization &amp; Doorstep Delivery</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 pl-6 text-[#171512] font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C89B3C]" />
              <span>Buy &amp; Cherish Forever: Handcrafted Heirloom</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#6F675E]">Slide</span>
            <span className="font-bold text-[#7A1010]">0{currentIndex + 1}</span>
            <span className="text-[#6F675E]">/ 0{HERO_SLIDES.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
