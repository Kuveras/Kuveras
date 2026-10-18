import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

interface Occasion {
  id: string;
  name: string;
  subtitle: string;
  href: string;
  image: string;
  alt: string;
}

const OCCASIONS: Occasion[] = [
  {
    id: 'office-wear',
    name: 'Office Wear',
    subtitle: 'Minimal Solitaires & Fine Chains',
    href: '/shop?occasion=Daily+Wear',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Office Wear Jewellery Collection',
  },
  {
    id: 'daily-wear',
    name: 'Daily Wear',
    subtitle: 'Lightweight Kundan & Everyday Pearl Accents',
    href: '/shop?occasion=Daily+Wear',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Daily Wear Jewellery Collection',
  },
  {
    id: 'party-wear',
    name: 'Party Wear',
    subtitle: 'Shimmering CZ Diamonds & Statement Chokers',
    href: '/shop?occasion=Party+Wear',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Party Wear Jewellery Collection',
  },
  {
    id: 'date-night',
    name: 'Date Night',
    subtitle: 'Romantic Ruby Lotus & Pastel Crystals',
    href: '/shop?occasion=Date+Night',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Date Night Jewellery Collection',
  },
  {
    id: 'wedding',
    name: 'Wedding',
    subtitle: 'Royal Rajasthani Kundan & Heritage Polki Sets',
    href: '/shop?category=Bridal',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Bridal & Wedding Jewellery Collection',
  },
  {
    id: 'day-out',
    name: 'Day Out',
    subtitle: 'Fresh Mint & Champagne Pearl Drops',
    href: '/shop?occasion=Day+Out',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    alt: 'Kuveras Day Out Jewellery Collection',
  },
];

export const ShopByOccasion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const isSwipingRef = useRef(false);
  const navigate = useNavigate();

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto rotation every 5 seconds (paused on hover/touch or reduced motion)
  useEffect(() => {
    if (isHovered || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % OCCASIONS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + OCCASIONS.length) % OCCASIONS.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % OCCASIONS.length);
  };

  const handleCardClick = (index: number, href: string) => {
    if (isSwipingRef.current) return;

    if (index === activeIndex) {
      navigate(href);
    } else {
      setActiveIndex(index);
    }
  };

  // Touch handlers for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
    isSwipingRef.current = false;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
    if (
      touchStartXRef.current !== null &&
      Math.abs(touchEndXRef.current - touchStartXRef.current) > 15
    ) {
      isSwipingRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;

    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
    setTimeout(() => {
      isSwipingRef.current = false;
    }, 100);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Compute 3D position & transform styles for each card based on circular distance
  const getCardStyle = (index: number) => {
    const total = OCCASIONS.length;
    let diff = index - activeIndex;

    // Wrap around shortest distance for 6 items
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Responsive scaling offsets
    const isMobile = window.innerWidth < 768;

    if (diff === 0) {
      // CENTER CARD (Front facing)
      return {
        transform: 'translateX(0px) translateZ(0px) rotateY(0deg) scale(1)',
        opacity: 1,
        zIndex: 30,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 1) {
      // ONE RIGHT
      const translateX = isMobile ? '120px' : '230px';
      const rotateY = isMobile ? '-14deg' : '-22deg';
      return {
        transform: `translateX(${translateX}) translateZ(-80px) rotateY(${rotateY}) scale(0.91)`,
        opacity: 0.88,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -1) {
      // ONE LEFT
      const translateX = isMobile ? '-120px' : '-230px';
      const rotateY = isMobile ? '14deg' : '22deg';
      return {
        transform: `translateX(${translateX}) translateZ(-80px) rotateY(${rotateY}) scale(0.91)`,
        opacity: 0.88,
        zIndex: 20,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === 2) {
      // TWO RIGHT
      const translateX = isMobile ? '200px' : '410px';
      const rotateY = isMobile ? '-25deg' : '-35deg';
      return {
        transform: `translateX(${translateX}) translateZ(-160px) rotateY(${rotateY}) scale(0.82)`,
        opacity: 0.48,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else if (diff === -2) {
      // TWO LEFT
      const translateX = isMobile ? '-200px' : '-410px';
      const rotateY = isMobile ? '25deg' : '35deg';
      return {
        transform: `translateX(${translateX}) translateZ(-160px) rotateY(${rotateY}) scale(0.82)`,
        opacity: 0.48,
        zIndex: 10,
        pointerEvents: 'auto' as const,
      };
    } else {
      // HIDDEN BEYOND RANGE
      const direction = diff > 0 ? '550px' : '-550px';
      return {
        transform: `translateX(${direction}) translateZ(-250px) rotateY(0deg) scale(0.7)`,
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none' as const,
      };
    }
  };

  return (
    <section
      aria-label="Shop by Occasion"
      className="py-12 sm:py-16 bg-[#FFFDF8] border-b border-[#EEEAE4] overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723] mb-2 tracking-tight">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.2em] text-[#756D65]">
            From daily elegance to your big day
          </p>
        </div>

        {/* 3D Tilted Arc Carousel Container */}
        <div className="relative w-full h-[460px] sm:h-[540px] md:h-[580px] flex items-center justify-center perspective-[1200px] my-4">
          
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous occasion"
            className="absolute left-2 sm:left-6 lg:left-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFFFFF] border border-[#E5E1DC] shadow-md hover:shadow-luxury-sm text-[#2B2723] hover:text-[#C89B3C] hover:border-[#C89B3C] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* 3D Cards Stage */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] md:max-w-[400px] h-full flex items-center justify-center transform-style-3d">
            {OCCASIONS.map((occ, idx) => {
              const cardStyle = getCardStyle(idx);
              const isCenter = idx === activeIndex;

              return (
                <div
                  key={occ.id}
                  onClick={() => handleCardClick(idx, occ.href)}
                  style={{
                    transform: cardStyle.transform,
                    opacity: cardStyle.opacity,
                    zIndex: cardStyle.zIndex,
                    pointerEvents: cardStyle.pointerEvents,
                    transition: 'all 550ms cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  className={`absolute inset-0 w-full h-[420px] sm:h-[500px] md:h-[530px] rounded-2xl overflow-hidden shadow-2xl border transition-all duration-500 cursor-pointer ${
                    isCenter
                      ? 'border-[#C89B3C] ring-2 ring-[#C89B3C]/20 shadow-[0_20px_50px_rgba(40,30,20,0.2)]'
                      : 'border-[#E5E1DC]'
                  }`}
                >
                  {/* High Quality Occasion Image */}
                  <img
                    src={occ.image}
                    alt={occ.alt}
                    loading={idx === 0 || idx === 1 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Dark Gradient Overlay for Typography Clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Right Action Arrow Icon */}
                  <div className="absolute top-4 right-4 z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors ${
                        isCenter
                          ? 'bg-[#C89B3C] text-white shadow-md'
                          : 'bg-black/40 text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-6 left-6 right-6 text-left text-white z-10 space-y-1 pointer-events-none">
                    <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-[0.25em] text-[#E7C982]">
                      KUVERAS SELECTION
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                      {occ.name}
                    </h3>
                    <p className="text-xs text-[#EEEAE4] line-clamp-1 font-sans font-light">
                      {occ.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next occasion"
            className="absolute right-2 sm:right-6 lg:right-12 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#FFFFFF] border border-[#E5E1DC] shadow-md hover:shadow-luxury-sm text-[#2B2723] hover:text-[#C89B3C] hover:border-[#C89B3C] flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Carousel Dot Indicators */}
        <div
          role="tablist"
          aria-label="Occasion Carousel Indicators"
          className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
        >
          {OCCASIONS.map((occ, idx) => {
            const isCenter = idx === activeIndex;
            return (
              <button
                key={occ.id}
                type="button"
                role="tab"
                aria-selected={isCenter}
                aria-label={`Go to ${occ.name}`}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  isCenter
                    ? 'w-8 bg-[#C89B3C]'
                    : 'w-2.5 bg-[#E5E1DC] hover:bg-[#C89B3C]/50'
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
