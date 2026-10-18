import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../types';
import { EditorialProductCard } from '../common/EditorialProductCard';

interface EditorialProductCarouselProps {
  title?: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
}

export const EditorialProductCarousel: React.FC<EditorialProductCarouselProps> = ({
  title = "Explore Our Collections",
  subtitle = "Handcrafted high-jewellery masterpieces designed to carry a timeless legacy",
  products,
  viewAllLink = "/shop",
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Update progress bar on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(100);
    } else {
      const progress = Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100));
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Mouse Drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FFFDF9] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#F2EDE4]">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#C89B3C] block mb-2">
              Curated Masterpieces
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2723] font-normal tracking-wide">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 font-sans text-xs sm:text-sm text-[#7A736E] font-normal max-w-lg leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Controls & View All */}
          <div className="mt-6 md:mt-0 flex items-center justify-between md:justify-end gap-6">
            <Link
              to={viewAllLink}
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#2B2723] hover:text-[#C89B3C] transition-colors flex items-center gap-1.5 group"
            >
              <span>View All</span>
              <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            {/* Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('left')}
                aria-label="Previous products"
                className="w-10 h-10 rounded-full border border-[#E5E1DC] flex items-center justify-center text-[#2B2723] hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all duration-200 bg-white/80 active:scale-95 shadow-xs"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Next products"
                className="w-10 h-10 rounded-full border border-[#E5E1DC] flex items-center justify-center text-[#2B2723] hover:border-[#C89B3C] hover:text-[#C89B3C] transition-all duration-200 bg-white/80 active:scale-95 shadow-xs"
              >
                <ChevronRight className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-5 sm:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-${
            isMouseDown ? 'grabbing' : 'grab'
          } pb-4 -mx-4 px-4 sm:mx-0 sm:px-0`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[74%] sm:w-[45%] md:w-[31%] lg:w-[23.5%] flex-shrink-0 snap-start"
            >
              <EditorialProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Progress Indicator Bar */}
        <div className="mt-8 flex justify-center">
          <div className="w-48 sm:w-64 h-[2px] bg-[#E5E1DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C89B3C] transition-all duration-300 ease-out"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
