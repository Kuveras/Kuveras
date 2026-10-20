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
    <div className={`flex flex-col items-center justify-center select-none shrink-0 ${className}`}>
      <img
        src="/5.png"
        alt="KUVERAS Fine Jewellery"
        className="w-[38px] md:w-[44px] xl:w-[50px] h-auto block object-contain"
      />
      <span
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          color: '#C89B3C',
          fontSize: '1.15rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          lineHeight: 1,
          marginTop: '2px',
        }}
      >
        KUVERAS
      </span>
    </div>
  );
};
