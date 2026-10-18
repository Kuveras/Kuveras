import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';

interface ExploreCollectionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FEATURED_COLLECTIONS = [
  {
    title: 'Royal Rajwadi Heritage',
    category: 'Rajwadi',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    desc: 'Ancestral Kundan and gold-polished Marwari bridal suites crafted for grand celebrations.',
  },
  {
    title: 'Mughal Polki & Jadau',
    category: 'Kundan',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
    desc: 'Uncut gemstone polki sets lined with royal pink meenakari enameling and freshwater pearls.',
  },
  {
    title: 'Temple Gold Nakshi',
    category: 'Temple',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
    desc: 'Sacred Lakshmi and Mango motifs rendered in 22K matte antique gold polish.',
  },
  {
    title: 'Modern CZ Solitaires',
    category: 'Cubic Zirconia',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80',
    desc: 'Diamond-look marquise chokers and solitaire drop earrings for modern galas.',
  },
];

export const ExploreCollectionsModal: React.FC<ExploreCollectionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleExplore = (category: string) => {
    onClose();
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" />

      <div className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#E5E1DC] rounded-[4px] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EEEAE4] flex items-center justify-between bg-[#FFFDF8]">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#C89B3C] block">
              Editorial Highlights
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#2B2723]">
              Explore Collections
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

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_COLLECTIONS.map((col) => (
              <div
                key={col.title}
                onClick={() => handleExplore(col.category)}
                className="group relative bg-[#FFFDF8] border border-[#EEEAE4] hover:border-[#C89B3C] rounded overflow-hidden cursor-pointer transition-all duration-300 flex flex-col justify-between"
              >
                <div className="aspect-[16/9] w-full bg-[#FAF8F5] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-normal text-[#2B2723] group-hover:text-[#C89B3C] transition-colors mb-1.5">
                      {col.title}
                    </h4>
                    <p className="text-xs text-[#7A736E] leading-relaxed mb-4">
                      {col.desc}
                    </p>
                  </div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#2B2723] group-hover:text-[#C89B3C] flex items-center gap-1.5 transition-colors pt-3 border-t border-[#EEEAE4]">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
