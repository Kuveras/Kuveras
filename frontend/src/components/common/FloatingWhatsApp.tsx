import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = `https://wa.me/919910204680?text=${encodeURIComponent(
    'Hi Kuveras! I am looking for luxury Indian jewellery rental & custom bridal styling with doorstep delivery across Delhi. Could you please assist me?'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      <span className="hidden sm:inline-block mr-3 bg-[#06452F] text-[#FFFDF8] text-xs px-3 py-1.5 shadow-md border border-[#E7C982]/40 tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        Rent & Buy via WhatsApp
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact Kuveras on WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20ba5a] transition-all duration-300 transform hover:scale-105 glow-gold focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
