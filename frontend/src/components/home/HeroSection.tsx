import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, Repeat, Sparkles } from 'lucide-react';

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  productName: string;
  image: string;
  link: string;
  alt: string;
  themeColor: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'smrutiya-kundan-haar',
    eyebrow: 'THE BRIDAL EDIT',
    headline: 'A legacy, made yours.',
    tagline: 'Discover the beauty of Kuveras Kundan',
    productName: 'Smrutiya Kundan Haar',
    image: '/banners/banner-1-smrutiya-kundan.jpg',
    link: '/product/smrutiya-kundan-haar',
    alt: 'KUVERAS The Bridal Edit - Smrutiya Kundan Haar - A legacy, made yours.',
    themeColor: '#06452F',
  },
  {
    id: 'amritavasini',
    eyebrow: 'THE SIGNATURE SELECTION',
    headline: 'Heritage, in every layer.',
    tagline: 'Meet Amritavasini. Cascading gold tones and rich detail',
    productName: 'Amritavasini',
    image: '/banners/banner-2-amritavasini.jpg',
    link: '/product/amritavasini',
    alt: 'KUVERAS The Signature Selection - Amritavasini Kundan Necklace - Heritage in every layer.',
    themeColor: '#06452F',
  },
  {
    id: 'nilaya-chandrika',
    eyebrow: "AFTER DARK' IN KUVERAS",
    headline: 'Own the evening.',
    tagline: 'An expressive silhouette. Make an entrance in Nilaya Chandrika',
    productName: 'Nilaya Chandrika Set',
    image: '/banners/banner-3-nilaya-chandrika.jpg',
    link: '/product/nilaya-chandrika-set',
    alt: 'KUVERAS After Dark in Kuveras - Nilaya Chandrika Cubic Zirconia Set - Own the evening.',
    themeColor: '#081814',
  },
  {
    id: 'charulata-crimson',
    eyebrow: 'FOR SOMEONE UNFORGETTABLE',
    headline: 'Some gifts say everything.',
    tagline: 'A little colour. A beautiful memory. Give her Charulata Crimson',
    productName: 'Charulata Crimson Necklace',
    image: '/banners/banner-4-charulata-crimson.jpg',
    link: '/product/charulata-crimson-necklace',
    alt: 'KUVERAS The Gifting Edit - Charulata Crimson Necklace - Some gifts say everything.',
    themeColor: '#06452F',
  },
  {
    id: 'keyura-mint',
    eyebrow: 'A KUVERAS BESTSELLER',
    headline: 'Your next signature.',
    tagline: 'Meet Keyura Mint. Refined sparkle, fresh colour and considered detail',
    productName: 'Keyura Mint Necklace',
    image: '/banners/banner-5-keyura-mint.jpg',
    link: '/product/keyura-mint-necklace',
    alt: 'KUVERAS Bestseller - Keyura Mint Cubic Zirconia Necklace - Your next signature.',
    themeColor: '#06452F',
  },
];

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay timer: advances slide every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
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
      aria-label="Kuveras Luxury Jewellery Campaign Showcase"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ backgroundColor: currentSlide.themeColor }}
      className="relative w-full overflow-hidden select-none outline-none border-b border-[#E8E1D8] transition-colors duration-700 ease-in-out"
    >
      {/* ─── Ambient Glow Backdrop for High-Res Displays ─── */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${currentSlide.themeColor} 0%, #000000 100%)`,
        }}
      />

      {/* ─── Carousel Stage (Constrained to max width with exact 1024:506 banner aspect ratio) ─── */}
      <div className="relative max-w-[1520px] mx-auto w-full">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '1024 / 506' }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                  isActive
                    ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                    : 'opacity-0 translate-x-4 pointer-events-none z-0'
                }`}
              >
                <Link
                  to={slide.link}
                  className="block w-full h-full relative cursor-pointer group"
                  aria-label={slide.alt}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    width={1024}
                    height={506}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 0 ? 'high' : 'auto'}
                    decoding="async"
                    className="w-full h-full object-cover sm:object-contain object-center block group-hover:scale-[1.008] transition-transform duration-700 ease-out"
                  />
                  {/* Subtle luxury edge vignette */}
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10" />
                </Link>
              </div>
            );
          })}

          {/* ─── Left Arrow Control ─── */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              prevSlide();
            }}
            aria-label="Previous slide"
            className="absolute top-1/2 left-3 sm:left-6 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#E7C982]/50 bg-[#0A0D0B]/60 text-[#E7C982] hover:bg-[#0B5D3B] hover:text-white hover:border-[#0B5D3B] backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2]" />
          </button>

          {/* ─── Right Arrow Control ─── */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              nextSlide();
            }}
            aria-label="Next slide"
            className="absolute top-1/2 right-3 sm:right-6 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-[#E7C982]/50 bg-[#0A0D0B]/60 text-[#E7C982] hover:bg-[#0B5D3B] hover:text-white hover:border-[#0B5D3B] backdrop-blur-md transition-all duration-300 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 cursor-pointer focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 stroke-[2]" />
          </button>

          {/* ─── Floating Indicator Pill & Slide Counter ─── */}
          <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 sm:gap-3 bg-[#0A0D0B]/75 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#E7C982]/40 shadow-2xl">
            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
              className="text-[#E7C982] hover:text-white transition-colors p-0.5 focus:outline-none"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <div className="h-3 w-px bg-[#E7C982]/30" />

            {/* Slide Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}: ${slide.productName}`}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    idx === currentIndex
                      ? 'w-6 sm:w-8 bg-[#E7C982] shadow-sm'
                      : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <div className="h-3 w-px bg-[#E7C982]/30 hidden sm:block" />

            {/* Counter */}
            <div className="hidden sm:flex items-center text-[11px] font-sans font-semibold tracking-wider text-[#E7C982]">
              <span>0{currentIndex + 1}</span>
              <span className="text-white/40 mx-1">/</span>
              <span className="text-white/60">0{HERO_SLIDES.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Rent & Buy Trust Highlights Strip ─── */}
      <div className="relative z-20 bg-gradient-to-r from-[#F0F8F4] via-[#FFFDF8] to-[#F0F8F4] border-t border-[#E8E1D8] px-4 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-6 divide-x divide-[#E8E1D8]">
            <Link
              to="/rent-info"
              className="flex items-center gap-2 text-[#0B5D3B] hover:text-[#06452F] font-semibold uppercase tracking-wider transition-colors"
            >
              <Repeat className="w-4 h-4 text-[#C89B3C]" />
              <span>Rent for Events: 30% Price · 3-Day Window</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-6 text-[#0B5D3B] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#0B5D3B]" />
              <span>100% Medical UV-C Sanitization &amp; Doorstep Delivery</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 pl-6 text-[#171512] font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C89B3C]" />
              <span>Buy &amp; Cherish Forever: Handcrafted Heirloom</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#6F675E]">{currentSlide.eyebrow}</span>
            <span className="text-[#E8E1D8]">•</span>
            <span className="font-serif italic font-semibold text-[#0B5D3B]">
              {currentSlide.productName}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
