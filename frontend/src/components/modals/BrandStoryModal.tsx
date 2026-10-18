import React from 'react';
import { X, Crown, Sparkles } from 'lucide-react';
import { useUI } from '../../context/UIContext';

export const BrandStoryModal: React.FC = () => {
  const { isBrandStoryOpen, setIsBrandStoryOpen } = useUI();

  if (!isBrandStoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay Backdrop */}
      <div
        onClick={() => setIsBrandStoryOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-2xl overflow-hidden animate-fade-in z-10 max-h-[85vh] flex flex-col p-6 sm:p-10">
        <button
          onClick={() => setIsBrandStoryOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#7A736E] hover:text-[#111111]"
          aria-label="Close brand story modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="overflow-y-auto pr-2 space-y-6">
          <div className="text-center space-y-2 border-b border-[#E8E2D9] pb-6">
            <div className="flex justify-center items-center gap-2 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
              <Crown className="w-6 h-6" />
              <Sparkles className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111111] font-bold">
              Where Heritage Becomes Eternal Elegance
            </h2>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-medium block">
              Jewellery that Carries a Legacy — The Soul of Kuveras Fine Jewellery
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#7A736E] leading-relaxed font-sans">
            <p>
              Kuveras might be just another brand name for you, but for us it is where every creation carries the weight of legacy, royal devotion, and the pureness of grace.
            </p>
            <p>
              Rooted in our great Indian heritage and elevated by contemporary fashion aesthetics, our collections are more than mere adornments — they are expressions of your soul, your story, and your royal shine.
            </p>
            <p>
              Our name is a humble tribute to <strong>Lord Kubera</strong>, the divine guardian of wealth, abundance, and prosperity in Vedic tradition. At the very heart of Kuveras is <strong>Kamini</strong> — a name, a mother, and our guiding light whose reverence for traditional Kundan craftsmanship ignited our journey.
            </p>
            <p>
              Every uncut Kundan polki, every hand-strung South Sea pearl, and every faceted Kemp ruby is ethically selected by our master karigars (artisans) who carry four generations of goldsmithing expertise. Whether you wear our creations on your wedding morning or rent a showstopping Rani Haar set for a sangeet night, Kuveras promises heirloom quality that stands test of time.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E8E2D9] flex justify-end">
            <button
              onClick={() => setIsBrandStoryOpen(false)}
              className="px-6 py-2.5 bg-[#111111] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A059] transition-colors"
            >
              Close Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
