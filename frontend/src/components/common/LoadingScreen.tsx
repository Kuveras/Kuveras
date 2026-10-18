import React from 'react';
import { KuverasLogo } from './KuverasLogo';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#FFFDF8] flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="flex flex-col items-center text-center space-y-6">
        <KuverasLogo className="w-56 sm:w-64" />

        <div className="w-16 h-0.5 bg-[#C89B3C]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#C89B3C] animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#C89B3C] font-semibold font-sans">
          Crafted For Eternal Elegance
        </span>
      </div>
    </div>
  );
};
