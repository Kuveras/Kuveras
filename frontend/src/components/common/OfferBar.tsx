import React, { useState, useEffect, useRef } from 'react';

const OFFERS = [
  "Crafted for Eternal Elegance • Jewellery that Carries a Legacy",
  "Rent Royal Bridal Suites from 30% of Price with Doorstep Delivery across Delhi NCR",
  "Extra ₹400 Off On Purchase Above ₹7,000 • Free Insured Delivery across India",
];

export const OfferBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
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
    }, 3200);

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
      aria-label="Promotional Offers & Brand Highlights"
      className="w-full bg-[#7A1010] text-[#FFFDF8] h-[34px] sm:h-[38px] flex items-center justify-center overflow-hidden relative z-40 px-4 border-b border-[#540808]"
    >
      <div className="max-w-7xl mx-auto w-full text-center flex items-center justify-center overflow-hidden h-full">
        {prefersReducedMotion ? (
          <span className="text-[11px] sm:text-[13px] md:text-sm font-medium tracking-wide whitespace-nowrap text-white">
            {OFFERS[0]}
          </span>
        ) : (
          <div
            className={`text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-wider whitespace-nowrap transition-all duration-500 ease-in-out font-sans ${
              isAnimating
                ? 'opacity-0 translate-x-[30px]'
                : 'opacity-100 translate-x-0'
            }`}
          >
            {OFFERS[currentIndex]}
          </div>
        )}
      </div>
    </div>
  );
};
