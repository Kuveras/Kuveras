import React from 'react';
import { useUI } from '../../context/UIContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useUI();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111111] text-white px-5 py-3.5 rounded-none shadow-2xl border-l-4 border-[#D4AF37] animate-fade-in text-sm font-medium tracking-wide">
      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
      <span>{toastMessage}</span>
    </div>
  );
};
