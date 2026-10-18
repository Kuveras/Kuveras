import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageDesktop: string;
  imageMobile: string;
  position: 'left' | 'right';
  objectPositionDesktop?: string;
  objectPositionMobile?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'rajwadi',
    eyebrow: 'ROYAL RAJWADI',
    headline: 'Royalty,\nReimagined',
    description: 'Discover timeless Indian craftsmanship through the KUVERAS lens.',
    ctaText: 'EXPLORE COLLECTION',
    ctaLink: '/shop?category=Rajwadi',
    imageDesktop: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=90',
    position: 'left',
    objectPositionDesktop: 'center 20%',
    objectPositionMobile: 'center top',
  },
  {
    id: 'polki',
    eyebrow: 'MUGHAL POLKI',
    headline: 'The Art of\nPolki',
    description: 'Heritage-inspired jewellery crafted for unforgettable occasions.',
    ctaText: 'DISCOVER POLKI',
    ctaLink: '/shop?category=Kundan',
    imageDesktop: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=90',
    position: 'right',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
  {
    id: 'temple',
    eyebrow: 'TEMPLE COLLECTION',
    headline: 'Inspired by\nHeritage',
    description: "A celebration of India's timeless artistry.",
    ctaText: 'EXPLORE TEMPLE',
    ctaLink: '/shop?category=Temple',
    imageDesktop: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=90',
    position: 'left',
    objectPositionDesktop: 'center 30%',
    objectPositionMobile: 'center top',
  },
  {
    id: 'bridal',
    eyebrow: 'BRIDAL',
    headline: 'Made for Your\nForever',
    description: 'Statement jewellery for moments that become memories.',
    ctaText: 'EXPLORE BRIDAL',
    ctaLink: '/shop?category=Bridal',
    imageDesktop: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=90',
    position: 'right',
    objectPositionDesktop: 'center 25%',
    objectPositionMobile: 'center top',
  },
  {
    id: 'modern',
    eyebrow: 'KUVERAS COLLECTION',
    headline: 'Tradition Meets\nTomorrow',
    description: 'Contemporary jewellery rooted in Indian heritage.',
    ctaText: 'EXPLORE COLLECTION',
    ctaLink: '/shop?category=Cubic+Zirconia',
    imageDesktop: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=2000&q=90',
    imageMobile: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=90',
    position: 'left',
    objectPositionDesktop: 'center center',
    objectPositionMobile: 'center center',
  },
];

export const HeroSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Autoplay (5.5 seconds)
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // Touch & Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      ref={containerRef}
      aria-label="Editorial Jewellery Hero Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-none m-0 p-0 bg-[#FFFDF8] overflow-hidden select-none outline-none"
    >
      {/* Full Width Hero Frame - Height: Desktop 560-680px, Mobile 4:5 aspect */}
      <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] xl:h-[680px] overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-800 ease-out ${
                isActive
                  ? 'opacity-100 translate-x-0 z-10 pointer-events-auto'
                  : 'opacity-0 translate-x-4 pointer-events-none z-0'
              }`}
            >
              {/* Background Campaign Photography */}
              <picture className="w-full h-full block">
                <source media="(max-width: 767px)" srcSet={slide.imageMobile} />
                <img
                  src={slide.imageDesktop}
                  alt={slide.headline.replace('\n', ' ')}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  style={{
                    objectPosition: isMobile
                      ? slide.objectPositionMobile || 'center top'
                      : slide.objectPositionDesktop || 'center center',
                  }}
                  className="w-full h-full object-cover transform scale-[1.01] transition-transform duration-1000 ease-out"
                />
              </picture>

              {/* Localized Warm Ivory Editorial Gradient Overlay (No dark masks!) */}
              <div
                className={`absolute inset-0 hidden lg:block ${
                  slide.position === 'left'
                    ? 'bg-gradient-to-r from-[#FFFDF8]/95 via-[#FFFDF8]/70 to-transparent w-[60%]'
                    : 'bg-gradient-to-l from-[#FFFDF8]/95 via-[#FFFDF8]/70 to-transparent left-auto right-0 w-[60%]'
                }`}
              />

              {/* Mobile Warm Ivory Bottom Gradient */}
              <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-[#FFFDF8] via-[#FFFDF8]/85 to-transparent" />

              {/* Editorial HTML Content Overlay */}
              <div className="relative max-w-[1380px] mx-auto h-full px-6 sm:px-10 lg:px-16 flex items-end lg:items-center pb-12 lg:pb-0">
                <div
                  className={`w-full max-w-xl text-[#2B2723] space-y-3 sm:space-y-4 ${
                    slide.position === 'right'
                      ? 'ml-auto text-left lg:text-left'
                      : 'mr-auto text-left'
                  }`}
                >
                  {/* Eyebrow Label */}
                  <span className="text-[11px] sm:text-[13px] font-sans font-semibold tracking-[0.25em] uppercase text-[#C89B3C] block">
                    {slide.eyebrow}
                  </span>

                  {/* Serif Headline */}
                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2B2723] font-normal leading-[1.12] tracking-tight whitespace-pre-line">
                    {slide.headline}
                  </h1>

                  {/* Supporting Description */}
                  <p className="font-sans text-xs sm:text-sm md:text-base text-[#524A42] font-normal leading-relaxed max-w-md">
                    {slide.description}
                  </p>

                  {/* Minimal Luxury CTA Button */}
                  <div className="pt-2 sm:pt-4">
                    <Link
                      to={slide.ctaLink}
                      className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border border-[#C89B3C] bg-transparent text-[#2B2723] hover:bg-[#C89B3C] hover:text-white text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-[0px] shadow-2xs group"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Navigation Arrows (Minimal Thin Chevrons - Gold Hover) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-3 sm:left-6 lg:left-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C89B3C]/30 bg-[#FFFDF8]/80 text-[#2B2723] hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] transition-all duration-300 flex items-center justify-center backdrop-blur-md shadow-sm"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-3 sm:right-6 lg:right-8 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C89B3C]/30 bg-[#FFFDF8]/80 text-[#2B2723] hover:bg-[#C89B3C] hover:text-white hover:border-[#C89B3C] transition-all duration-300 flex items-center justify-center backdrop-blur-md shadow-sm"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.5]" />
      </button>

      {/* Editorial Progress Indicator (Bottom Left/Right) */}
      <div className="absolute bottom-5 right-5 sm:right-12 lg:right-16 z-20 flex items-center gap-3 text-[#2B2723] text-xs font-sans select-none bg-[#FFFDF8]/90 backdrop-blur-md px-3.5 py-1.5 rounded-[0px] border border-[#E8DFD1] shadow-2xs">
        <span className="font-semibold tracking-wider text-[#C89B3C]">
          0{currentIndex + 1}
        </span>
        <span className="text-[#8C827A]">/</span>
        <span className="text-[#6E665E] font-medium tracking-wider">
          0{HERO_SLIDES.length}
        </span>
        <div className="w-12 sm:w-20 h-[2px] bg-[#E8DFD1] rounded-full overflow-hidden ml-1">
          <div
            className="h-full bg-[#C89B3C] transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / HERO_SLIDES.length) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

