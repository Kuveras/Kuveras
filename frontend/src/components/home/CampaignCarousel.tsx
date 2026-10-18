import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Slide {
  id: number;
  image: string;
  alt: string;
  link: string;
}

const CAMPAIGN_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/banner-slide-1.jpg',
    alt: 'KUVERAS Tradition Meets Tomorrow Royal Couple Campaign',
    link: '/shop',
  },
  {
    id: 2,
    image: '/banner-slide-2.jpg',
    alt: 'KUVERAS Authentic Heritage Signature Box Campaign',
    link: '/shop?category=Bridal%20Jewellery',
  },
];

export const CampaignCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? CAMPAIGN_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % CAMPAIGN_SLIDES.length);
  };

  return (
    <section
      className="relative w-full bg-[#0A0D0B] overflow-hidden py-4 sm:py-6"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-lg overflow-hidden border border-[#E7C982]/30 shadow-2xl bg-[#000000]">
          {/* Main Carousel Aspect Ratio Box */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/8.5] max-h-[640px] flex items-center justify-center">
            {CAMPAIGN_SLIDES.map((slide, index) => (
              <Link
                key={slide.id}
                to={slide.link}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-contain sm:object-cover object-center bg-black"
                />
              </Link>
            ))}

            {/* Navigation Arrow Left */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0A0D0B]/60 hover:bg-[#0B5D3B] text-[#E7C982] border border-[#E7C982]/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Arrow Right */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#0A0D0B]/60 hover:bg-[#0B5D3B] text-[#E7C982] border border-[#E7C982]/50 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-xl focus:outline-none"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Slide Dots / Indicators & Play/Pause */}
            <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-[#0A0D0B]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E7C982]/40 shadow-lg">
              <button
                type="button"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                aria-label={isAutoPlaying ? "Pause carousel" : "Play carousel"}
                className="text-[#E7C982] hover:text-white transition-colors p-0.5"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <div className="h-3 w-px bg-[#E7C982]/30 mx-0.5" />

              {CAMPAIGN_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentSlide
                      ? 'w-6 sm:w-8 bg-[#E7C982]'
                      : 'w-2 bg-[#FFFDF8]/40 hover:bg-[#FFFDF8]/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
