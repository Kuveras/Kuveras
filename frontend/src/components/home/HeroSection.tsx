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
    id: 'heritage-kundan-collar',
    eyebrow: 'ROYAL BRIDAL SUITE',
    headline: 'Heritage Kundan\nCollar Set',
    tagline: 'Jewellery that Carries a Legacy',
    description: 'Adorn breathtaking Kundan & Polki bridal suites for your wedding day — handcrafted with layered meenakari work and coordinated drop earrings.',
    rentCtaText: 'RENT FOR BRIDAL',
    rentCtaLink: '/product/kuveras-sheet-11',
    buyCtaText: 'BUY & OWN HEIRLOOM',
    buyCtaLink: '/product/kuveras-sheet-11',
    imageDesktop: '/images/sheet/sheet-11-img_1784.jpg',
    imageMobile: '/images/sheet/sheet-11-img_1784.jpg',
    position: 'left',
    badge: '3-Day Rental Available',
  },
  {
    id: 'gulnaar-pink-choker',
    eyebrow: 'SIGNATURE CZ COLLECTION',
    headline: 'Gulnaar Pink\nNecklace Set',
    tagline: 'Grace Meets Modern Grandeur',
    description: 'Adorned with rich dusky rose pink gemstones and delicate silver-tone accents, this exquisite set brings effortless regal charm to every celebration.',
    rentCtaText: 'RENT AT ₹2,215',
    rentCtaLink: '/product/kuveras-2937',
    buyCtaText: 'BUY & CHERISH FOREVER',
    buyCtaLink: '/product/kuveras-2937',
    imageDesktop: '/images/sheet/sheet-01-img_1481.jpg',
    imageMobile: '/images/sheet/sheet-01-img_1481.jpg',
    position: 'right',
    badge: 'Google Sheet Verified',
  },
  {
    id: 'rajwadi-ruby-choker',
    eyebrow: 'HERITAGE RAJWADI',
    headline: 'Rajwadi Ruby\nChoker Set',
    tagline: 'Majesty Reimagined in Deep Ruby',
    description: 'Celebrate the royal spirit with antique-gold finishes, deep pigeon-blood ruby stones, and commanding silhouettes suited for modern grand celebrations.',
    rentCtaText: 'RENT AT ₹2,835',
    rentCtaLink: '/product/kuveras-sheet-10',
    buyCtaText: 'BUY RAJWADI',
    buyCtaLink: '/product/kuveras-sheet-10',
    imageDesktop: '/images/sheet/sheet-10-img_1736.jpg',
    imageMobile: '/images/sheet/sheet-10-img_1736.jpg',
    position: 'left',
    badge: 'Antique Gold Polish',
  },
  {
    id: 'padmashri-rose-suite',
    eyebrow: 'ROMANTIC OCCASION EDIT',
    headline: 'Padmashri Rose\nNecklace Set',
    tagline: 'Delicate Rose-Pink & Floral Motifs',
    description: 'Featuring rich rose-pink stones set in a radiant finish with intricate floral motifs and matching teardrop statement earrings for timeless grace.',
    rentCtaText: 'RENT AT ₹1,973',
    rentCtaLink: '/product/kuveras-sheet-02',
    buyCtaText: 'BUY THIS SET',
    buyCtaLink: '/product/kuveras-sheet-02',
    imageDesktop: '/images/sheet/sheet-02-img_1542.jpg',
    imageMobile: '/images/sheet/sheet-02-img_1542.jpg',
    position: 'right',
    badge: 'Handcrafted in India',
  },
  {
    id: 'midnight-noir-set',
    eyebrow: 'AFTER DARK IN KUVERAS',
    headline: 'Midnight Noir\nNecklace Set',
    tagline: 'Deep Charcoal & Warm Rose-Gold Tone',
    description: 'A slim rose-gold tone necklace of dark faceted stones, gathered into a cluster of haloed ovals and finished with an elegant dancing drop. Sleek and luxurious.',
    rentCtaText: 'RENT AT ₹993',
    rentCtaLink: '/product/kuveras-sheet-03',
    buyCtaText: 'BUY NOIR SET',
    buyCtaLink: '/product/kuveras-sheet-03',
    imageDesktop: '/images/sheet/sheet-03-img_1719---copy.jpg',
    imageMobile: '/images/sheet/sheet-03-img_1719---copy.jpg',
    position: 'left',
    badge: 'Modern Luxury Edit',
  },
  {
    id: 'nilaya-panna-drop',
    eyebrow: 'SACRED PANNA & TEMPLE',
    headline: 'Nilaya Panna\nDrop Set',
    tagline: 'Emerald-Cut & Pear-Shaped Gems',
    description: 'A delicate silver-tone necklace of mint-green stones, ending in a cascading drop of emerald-cut and pear-shaped gems. Light, graceful, and quietly luxurious.',
    rentCtaText: 'RENT AT ₹1,092',
    rentCtaLink: '/product/kuveras-sheet-12',
    buyCtaText: 'BUY PANNA SET',
    buyCtaLink: '/product/kuveras-sheet-12',
    imageDesktop: '/images/sheet/sheet-12-img_2286.jpg',
    imageMobile: '/images/sheet/sheet-12-img_2286.jpg',
    position: 'right',
    badge: 'Panna Green · ₹1,092 Rental',
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
                  className={`w-full h-full object-cover transform scale-[1.02] transition-transform duration-1000 ease-out ${
                    slide.position === 'left'
                      ? 'object-center lg:object-[75%_center]'
                      : 'object-center lg:object-[25%_center]'
                  }`}
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
                        <ShieldCheck className="w-3 h-3 text-[#7A1010]" />
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
            <div className="hidden sm:flex items-center gap-2 pl-6 text-[#7A1010] font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#7A1010]" />
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
