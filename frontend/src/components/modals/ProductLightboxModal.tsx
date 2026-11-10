import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, Sparkles } from 'lucide-react';

export interface ProductLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  productName: string;
  category?: string;
}

export const ProductLightboxModal: React.FC<ProductLightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex = 0,
  onIndexChange,
  productName,
  category,
}) => {
  const [internalIndex, setInternalIndex] = useState(currentIndex);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [zoomScale, setZoomScale] = useState(2.4);

  // Mobile touch & pinch zoom state
  const [mobileScale, setMobileScale] = useState(1);
  const [mobileTranslate, setMobileTranslate] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const touchStartRef = useRef<{
    dist: number;
    x: number;
    y: number;
    scale: number;
    translateX: number;
    translateY: number;
  }>({ dist: 0, x: 0, y: 0, scale: 1, translateX: 0, translateY: 0 });
  const lastTapRef = useRef<number>(0);

  // Sync index from props
  useEffect(() => {
    if (currentIndex !== undefined) {
      setInternalIndex(currentIndex);
    }
  }, [currentIndex]);

  const activeIndex = currentIndex !== undefined && onIndexChange ? currentIndex : internalIndex;
  const totalImages = images && images.length > 0 ? images.length : 1;
  const currentImage = images && images.length > 0 ? images[activeIndex] || images[0] : '';

  const updateIndex = useCallback(
    (newIndex: number) => {
      const normalized = (newIndex + totalImages) % totalImages;
      if (onIndexChange) {
        onIndexChange(normalized);
      } else {
        setInternalIndex(normalized);
      }
      // Reset zoom on slide change
      setIsHovering(false);
      setMobileScale(1);
      setMobileTranslate({ x: 0, y: 0 });
    },
    [totalImages, onIndexChange]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      updateIndex(activeIndex + 1);
    },
    [activeIndex, updateIndex]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      updateIndex(activeIndex - 1);
    },
    [activeIndex, updateIndex]
  );

  // Detect touch capability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        updateIndex(activeIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        updateIndex(activeIndex - 1);
      } else if (e.key === '+' || e.key === '=') {
        setZoomScale((z) => Math.min(3.5, z + 0.3));
      } else if (e.key === '-' || e.key === '_') {
        setZoomScale((z) => Math.max(1.8, z - 0.3));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, updateIndex, onClose]);

  // Reset zoom whenever modal opens or closes
  useEffect(() => {
    if (isOpen) {
      setIsHovering(false);
      setMobileScale(1);
      setMobileTranslate({ x: 0, y: 0 });
      setZoomOrigin({ x: 50, y: 50 });
    }
  }, [isOpen]);

  // Desktop Hover Zoom Handlers
  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovering(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Calculate percentage coordinates (0% - 100%)
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));

    setZoomOrigin({ x, y });
    if (!isHovering) {
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovering(false);
      setZoomOrigin({ x: 50, y: 50 });
    }
  };

  // Mobile Touch Gestures (Double tap & Pinch-to-zoom)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const now = Date.now();
    // Detect double tap
    if (e.touches.length === 1) {
      if (now - lastTapRef.current < 320) {
        // Toggle mobile zoom
        if (mobileScale > 1) {
          setMobileScale(1);
          setMobileTranslate({ x: 0, y: 0 });
        } else {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const touch = e.touches[0];
            const originX = ((touch.clientX - rect.left) / rect.width - 0.5) * -120;
            const originY = ((touch.clientY - rect.top) / rect.height - 0.5) * -120;
            setMobileScale(2.4);
            setMobileTranslate({ x: originX, y: originY });
          } else {
            setMobileScale(2.4);
          }
        }
        lastTapRef.current = 0;
        return;
      }
      lastTapRef.current = now;

      // Start drag panning if already zoomed
      if (mobileScale > 1) {
        touchStartRef.current = {
          dist: 0,
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
          scale: mobileScale,
          translateX: mobileTranslate.x,
          translateY: mobileTranslate.y,
        };
      }
    } else if (e.touches.length === 2) {
      // Start pinch gesture
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = {
        dist,
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
        scale: mobileScale,
        translateX: mobileTranslate.x,
        translateY: mobileTranslate.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartRef.current.dist > 0) {
        const factor = dist / touchStartRef.current.dist;
        const newScale = Math.max(1, Math.min(3.8, touchStartRef.current.scale * factor));
        setMobileScale(newScale);
        if (newScale === 1) {
          setMobileTranslate({ x: 0, y: 0 });
        }
      }
    } else if (e.touches.length === 1 && mobileScale > 1) {
      // Pan image
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;
      setMobileTranslate({
        x: touchStartRef.current.translateX + deltaX,
        y: touchStartRef.current.translateY + deltaY,
      });
    }
  };

  const handleTouchEnd = () => {
    if (mobileScale <= 1.05) {
      setMobileScale(1);
      setMobileTranslate({ x: 0, y: 0 });
    }
  };

  const resetZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHovering(false);
    setMobileScale(1);
    setMobileTranslate({ x: 0, y: 0 });
    setZoomOrigin({ x: 50, y: 50 });
  };

  const toggleZoomFactor = (e: React.MouseEvent) => {
    e.stopPropagation();
    setZoomScale((prev) => (prev >= 3 ? 2.0 : prev >= 2.4 ? 3.0 : 2.4));
  };

  if (!isOpen) return null;

  // Active transform styles
  const isDesktopZoomed = isHovering && !isTouchDevice;
  const isMobileZoomed = mobileScale > 1;

  const imageTransform = isMobileZoomed
    ? `scale(${mobileScale}) translate(${mobileTranslate.x / mobileScale}px, ${mobileTranslate.y / mobileScale}px)`
    : isDesktopZoomed
    ? `scale(${zoomScale})`
    : 'scale(1)';

  const transformOrigin = isDesktopZoomed ? `${zoomOrigin.x}% ${zoomOrigin.y}%` : '50% 50%';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product Image Full-Screen Preview"
      className="fixed inset-0 z-50 flex flex-col justify-between select-none animate-fade-in"
      style={{
        backgroundColor: 'rgba(10, 9, 8, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
      onClick={onClose}
    >
      {/* ─── Top Header Bar ─── */}
      <header
        className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/10 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-xs"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Product branding */}
        <div className="flex flex-col max-w-[50%] sm:max-w-[60%]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
              {category || 'KUVERAS LUXURY JEWELLERY'}
            </span>
          </div>
          <h2 className="font-serif text-sm sm:text-lg text-white font-medium truncate drop-shadow-sm">
            {productName}
          </h2>
        </div>

        {/* Center: Angle Counter */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs text-white/90 tracking-widest font-sans">
          <span className="text-[#D4AF37] font-semibold">{activeIndex + 1}</span>
          <span className="text-white/40">/</span>
          <span>{totalImages}</span>
        </div>

        {/* Right: Zoom controls & Close button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zoom Level Indicator / Toggle (Desktop) */}
          <button
            onClick={toggleZoomFactor}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full text-xs text-white transition-all cursor-pointer"
            title="Click to toggle magnification power"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-medium tracking-wider">{zoomScale.toFixed(1)}x Zoom</span>
          </button>

          {/* Reset Zoom Button (when zoomed) */}
          {(isHovering || mobileScale > 1) && (
            <button
              onClick={resetZoom}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/40 rounded-full text-xs text-[#D4AF37] transition-all cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline text-[11px] font-medium">Reset</span>
            </button>
          )}

          {/* Close (×) Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-[#D4AF37] text-white hover:text-[#111111] border border-white/20 hover:border-[#D4AF37] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg group"
            aria-label="Close full-screen preview (Escape)"
            title="Close (ESC)"
          >
            <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </div>
      </header>

      {/* ─── Main Center Viewing Stage ─── */}
      <main
        className="relative flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        onClick={onClose}
      >
        {/* Previous Navigation Arrow */}
        {totalImages > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#D4AF37] text-white hover:text-[#111111] border border-white/20 hover:border-[#D4AF37] flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            aria-label="View previous image (Left Arrow)"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Central Image Container with Interactive Hover & Touch Zoom */}
        <div
          ref={containerRef}
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative max-w-4xl max-h-[72vh] sm:max-h-[76vh] w-auto h-auto flex items-center justify-center overflow-hidden rounded-sm shadow-2xl transition-shadow duration-300 ${
            isDesktopZoomed ? 'cursor-crosshair shadow-2xl ring-1 ring-[#D4AF37]/50' : 'cursor-zoom-in'
          }`}
          style={{
            touchAction: mobileScale > 1 ? 'none' : 'pan-y',
          }}
        >
          {/* Subtle Ambient Jewelry Glow Behind Image */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 -z-10"
            style={{
              background:
                'radial-gradient(circle at center, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
            }}
          />

          {/* Product Image */}
          <img
            ref={imageRef}
            src={currentImage}
            alt={`${productName} - Angle ${activeIndex + 1}`}
            draggable={false}
            className="max-w-full max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain select-none will-change-transform"
            style={{
              transform: imageTransform,
              transformOrigin: transformOrigin,
              transition: isDesktopZoomed
                ? 'transform 0.12s ease-out, transform-origin 0.04s linear'
                : 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform-origin 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              imageRendering: '-webkit-optimize-contrast',
            }}
          />

          {/* Interactive Zoom Guideline Hint Badge (Fades out when zooming) */}
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-300 z-20 ${
              isDesktopZoomed || isMobileZoomed
                ? 'opacity-0 translate-y-2'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/70 hover:bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 rounded-full text-white text-[11px] font-sans shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span className="hidden sm:inline text-white/90 font-medium">
                Move mouse over image to inspect stones & craftsmanship
              </span>
              <span className="sm:hidden text-white/90 font-medium">
                Double-tap or pinch to inspect stones & details
              </span>
            </div>
          </div>
        </div>

        {/* Next Navigation Arrow */}
        {totalImages > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-[#D4AF37] text-white hover:text-[#111111] border border-white/20 hover:border-[#D4AF37] flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
            aria-label="View next image (Right Arrow)"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </main>

      {/* ─── Bottom Footer & Thumbnails Strip ─── */}
      <footer
        className="relative z-30 px-4 py-3 sm:py-4 border-t border-white/10 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-xs flex flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile angle counter indicator */}
        <div className="sm:hidden flex items-center gap-1.5 text-xs text-white/80 font-sans tracking-wider mb-1">
          <span>Angle</span>
          <span className="text-[#D4AF37] font-semibold">{activeIndex + 1}</span>
          <span className="text-white/40">of</span>
          <span>{totalImages}</span>
        </div>

        {/* Thumbnail Navigation Strip */}
        {totalImages > 1 && (
          <div className="flex items-center gap-2.5 max-w-[92vw] overflow-x-auto py-1 px-2 no-scrollbar">
            {images.map((img, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => updateIndex(idx)}
                  className={`relative w-12 h-14 sm:w-14 sm:h-16 shrink-0 overflow-hidden border-2 transition-all duration-200 cursor-pointer rounded-xs ${
                    isSelected
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50 scale-105 opacity-100 shadow-lg'
                      : 'border-white/20 opacity-50 hover:opacity-90 hover:border-white/60'
                  }`}
                  aria-label={`Switch to angle ${idx + 1}`}
                  title={`View angle ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37]" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Subtle Keyboard & Accessibility Note */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-white/50 tracking-wider font-sans">
          <span>Use &larr; &rarr; arrows to switch angles</span>
          <span>•</span>
          <span>Hover to magnify jewellery details</span>
          <span>•</span>
          <span>Press ESC or click backdrop to exit</span>
        </div>
      </footer>
    </div>
  );
};
