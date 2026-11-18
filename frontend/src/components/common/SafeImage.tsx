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
  const [attemptStage, setAttemptStage] = useState<number>(0);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(src);
    setAttemptStage(0);
    setIsFailed(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // If it's a Google Drive URL, attempt alternate delivery formats before generic fallback
    if (currentSrc && (currentSrc.includes('drive.google.com') || currentSrc.includes('googleusercontent.com'))) {
      const idMatch = currentSrc.match(/[?&]id=([a-zA-Z0-9_-]+)/) || currentSrc.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (idMatch && attemptStage === 0) {
        // Try direct lh3 cdn
        setAttemptStage(1);
        setCurrentSrc(`https://lh3.googleusercontent.com/d/${idMatch[1]}`);
        return;
      } else if (idMatch && attemptStage === 1) {
        // Try drive uc export view
        setAttemptStage(2);
        setCurrentSrc(`https://drive.google.com/uc?export=view&id=${idMatch[1]}`);
        return;
      }
    }

    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setAttemptStage(3);
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
      referrerPolicy="no-referrer"
      onError={handleError}
      className={className}
      {...props}
    />
  );
};
