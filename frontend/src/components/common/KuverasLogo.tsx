import React from 'react';

interface KuverasLogoProps {
  className?: string;
  variant?: 'light' | 'emerald' | 'gold' | 'dark' | 'image';
  showSubtext?: boolean;
  useImage?: boolean;
}

export const KuverasLogo: React.FC<KuverasLogoProps> = ({
  className = "w-[105px] md:w-[120px] xl:w-[138px] xl:max-w-[138px]",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center select-none shrink-0 bg-black rounded-md px-3 py-2 ${className}`}>
      <img
        src="/5.png"
        alt="KUVERAS Fine Jewellery"
        className="w-[40%] h-auto block object-contain"
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          color: '#D4A520',
          fontSize: '1.1em',
          fontWeight: 500,
          letterSpacing: '0.15em',
          lineHeight: 1.2,
          marginTop: '2px',
        }}
      >
        KUVERAS
      </span>
    </div>
  );
};
