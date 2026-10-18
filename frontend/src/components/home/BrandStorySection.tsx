import React from 'react';
import { useUI } from '../../context/UIContext';
import { ArrowRight } from 'lucide-react';
import { KuverasLogo } from '../common/KuverasLogo';

export const BrandStorySection: React.FC = () => {
  const { setIsBrandStoryOpen } = useUI();

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F0] border-b border-[#EDE3D4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image Composition */}
          <div className="lg:col-span-6">
            <div className="relative aspect-4/5 w-full bg-[#FFFDF8] border border-[#EDE3D4] p-3 shadow-luxury">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80"
                alt="Kuveras Heritage Craftsmanship"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute -bottom-5 -right-5 bg-[#FFFDF8] p-4 border border-[#C89B3C]/50 shadow-xl hidden sm:flex items-center gap-3">
                <KuverasLogo showSubtext={false} className="w-28" />
              </div>
            </div>
          </div>

          {/* Right Column: Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0B5D3B] block">
              Our Brand Legacy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171512] leading-tight">
              Where Heritage Becomes <br />
              <span className="italic font-normal text-[#C89B3C]">Eternal Elegance</span>
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-[#6F675E] leading-relaxed font-sans">
              <p>
                Kuveras might be just another brand name for you, but for us it is where every creation carries the weight of legacy and the pureness of grace.
              </p>
              <p>
                Rooted in our great Indian heritage and elevated by contemporary design, our collections are more than adornments — they are expressions of soul, spirit, and a beautiful story.
              </p>
              <p>
                Our name is a tribute to Lord Kubera, the divine guardian of wealth and prosperity, and at the very heart of Kuveras is Kamini — a name, a mother, a guiding light.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsBrandStoryOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#171512] hover:text-[#C89B3C] transition-colors group"
              >
                <span>Show More</span>
                <ArrowRight className="w-4 h-4 text-[#C89B3C] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
