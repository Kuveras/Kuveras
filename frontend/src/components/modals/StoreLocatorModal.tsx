import React, { useEffect, useRef } from 'react';
import { X, MapPin, Phone, Clock, MessageSquare } from 'lucide-react';

interface Store {
  id: string;
  city: string;
  title: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
}

const STORES_CONFIG: Store[] = [
  {
    id: 's2',
    city: 'NEW DELHI',
    title: 'South Extension Luxury Suite & Delivery Hub',
    address: 'E-18 South Extension Part II, New Delhi (Doorstep Delivery Across Delhi)',
    phone: '+91 88104 61628',
    whatsapp: '919910204680',
    hours: '11:00 AM – 8:00 PM (Tue–Sun)',
  },
  {
    id: 's3',
    city: 'MUMBAI',
    title: 'Kala Ghoda Art Salon',
    address: '42 Forbes Building, Kala Ghoda, Fort, Mumbai',
    phone: '+91 88104 61628',
    whatsapp: '919910204680',
    hours: '11:00 AM – 8:30 PM (Mon–Sat)',
  },
  {
    id: 's4',
    city: 'BENGALURU',
    title: 'Indiranagar Experience Center',
    address: '777 100 Feet Road, Indiranagar, Bengaluru',
    phone: '+91 88104 61628',
    whatsapp: '919910204680',
    hours: '10:30 AM – 8:00 PM (Daily)',
  },
];

interface StoreLocatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreLocatorModal: React.FC<StoreLocatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-locator-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div
        ref={modalRef}
        className="relative w-full max-w-3xl bg-[#FFFFFF] border border-[#E5E1DC] rounded-[4px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-fade-in"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EEEAE4] flex items-center justify-between bg-[#FFFDF8]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#C89B3C] block">
              Boutique Finder & Delivery Concierge
            </span>
            <h3 id="store-locator-title" className="font-serif text-2xl font-normal text-[#2B2723]">
              Stores & Delivery Across Delhi
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-[#7A736E] hover:text-[#2B2723] rounded transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Store Grid */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STORES_CONFIG.map((store) => (
              <div
                key={store.id}
                className="p-5 bg-[#FFFDF8] border border-[#EEEAE4] hover:border-[#C89B3C] rounded transition-all space-y-3"
              >
                <div className="flex items-center justify-between border-b border-[#EEEAE4] pb-2">
                  <span className="text-[10px] font-semibold tracking-widest text-[#C89B3C] uppercase">
                    {store.city}
                  </span>
                </div>

                <h4 className="font-serif text-base font-normal text-[#2B2723]">
                  {store.title}
                </h4>

                <div className="space-y-1.5 text-xs text-[#7A736E] font-sans">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5 stroke-[1.5]" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#C89B3C] shrink-0 stroke-[1.5]" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C89B3C] shrink-0 stroke-[1.5]" />
                    <span>{store.hours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${store.whatsapp}?text=Hi%20Kuveras!%20I%20would%20like%20to%20book%20a%20private%20styling%20appointment%20at%20your%20${encodeURIComponent(
                      store.city
                    )}%20boutique.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0B5D3B] hover:bg-[#06452F] text-white text-xs font-medium uppercase tracking-wider transition-colors rounded-[2px]"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
