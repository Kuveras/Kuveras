import React, { useState, useEffect, useRef } from 'react';

const OFFERS = [
  "Extra ₹400 Off On Order Above ₹7,000",
  "Extra ₹200 Off On Order Above ₹3,000",
  "Extra ₹500 Off On Order Above ₹10,000",
];

export const OfferBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
        setIsAnimating(false);
      }, 450);
    }, 2800);

    return () => {
      clearInterval(interval);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      role="region"
      aria-label="Promotional Offers"
      className="w-full bg-[#0B5D3B] text-[#FFFFFF] h-[34px] sm:h-[38px] flex items-center justify-center overflow-hidden relative z-40 px-4 border-b border-[#06452F]"
    >
      <div className="max-w-7xl mx-auto w-full text-center flex items-center justify-center overflow-hidden h-full">
        {prefersReducedMotion ? (
          <span className="text-[11px] sm:text-[13px] md:text-sm font-medium tracking-wide whitespace-nowrap text-white">
            {OFFERS[0]}
          </span>
        ) : (
          <div
            className={`text-[11px] sm:text-[13px] md:text-sm font-medium tracking-wide whitespace-nowrap transition-all duration-500 ease-in-out ${
              isAnimating
                ? 'opacity-0 translate-x-[30px]'
                : 'opacity-100 translate-x-0'
            }`}
            style={{
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            }}
          >
            {OFFERS[currentIndex]}
          </div>
        )}
      </div>
    </div>
  );
};
