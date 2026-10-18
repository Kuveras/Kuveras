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
    <div className={`flex items-center justify-center select-none shrink-0 ${className}`}>
      <img
        src="/kuveras-logo.png"
        alt="KUVERAS Fine Jewellery"
        className="w-full h-auto block object-contain"
      />
    </div>
  );
};


