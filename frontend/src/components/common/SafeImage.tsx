import React, { useState, useEffect } from 'react';

const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt = 'KUVERAS Jewellery',
  className = '',
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  onError,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string | undefined>(src);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setIsFailed(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setIsFailed(true);
    }
    if (onError) {
      onError(e);
    }
  };

  if (isFailed || !currentSrc) {
    return (
      <div className={`w-full h-full bg-[#FAF7F0] border border-[#E8E1D8] flex flex-col items-center justify-center p-4 text-center select-none ${className}`}>
        <svg className="w-10 h-10 text-[#C89B3C] mb-2 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span className="text-[11px] font-serif text-[#2B2723] font-medium tracking-wide line-clamp-1">{alt}</span>
        <span className="text-[9px] uppercase tracking-widest text-[#C89B3C] mt-0.5">Kuveras Collection</span>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
