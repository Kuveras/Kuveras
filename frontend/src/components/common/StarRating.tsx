import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  count?: number;
  showCount?: boolean;
  size?: 'sm' | 'md';
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 4.8,
  count,
  showCount = true,
  size = 'sm',
}) => {
  const safeRating = typeof rating === 'number' && !isNaN(rating) ? rating : 4.8;
  const safeCount = typeof count === 'number' && !isNaN(count) ? count : undefined;
  const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#D4AF37]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.floor(safeRating)
                ? 'fill-[#D4AF37] text-[#D4AF37]'
                : star - safeRating < 1
                ? 'fill-[#D4AF37]/50 text-[#D4AF37]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-[#7A736E] font-sans">
          {safeRating.toFixed(1)} {safeCount !== undefined && `(${safeCount})`}
        </span>
      )}
    </div>
  );
};
