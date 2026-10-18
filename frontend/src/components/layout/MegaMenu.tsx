import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export type MegaMenuType = 'jewellery' | 'bridal' | 'temple' | 'bracelets' | 'rent' | null;

interface MegaMenuProps {
  menuType: MegaMenuType;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface CategoryItem {
  name: string;
  path: string;
  image: string;
}

const CATEGORY_ITEMS: CategoryItem[] = [
  {
    name: 'Kundan',
    path: '/shop?category=Kundan',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rajwadi',
    path: '/shop?category=Rajwadi',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Temple Jewellery',
    path: '/shop?category=Temple',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Cubic Zirconia',
    path: '/shop?category=Cubic+Zirconia',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Bridal / Wedding Jewellery',
    path: '/shop?category=Bridal',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Matha Patti',
    path: '/shop?category=Matha+Patti',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Bracelets',
    path: '/shop?category=Bracelets',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Rings',
    path: '/shop?category=Cubic+Zirconia',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Earrings',
    path: '/shop?category=Kundan',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Choker Sets',
    path: '/shop?category=Kundan',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Necklaces',
    path: '/shop?category=Temple',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Bangles',
    path: '/shop?category=Bracelets',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Pendants',
    path: '/shop?category=Cubic+Zirconia',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jewellery Sets',
    path: '/shop?category=Bridal',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80',
  },
];

const PRICE_ITEMS = [
  { label: 'Under ₹5,000', path: '/shop?budget=under-4500', desc: 'Everyday elegance & gifting' },
  { label: '₹5,000 – ₹10,000', path: '/shop?budget=under-7000', desc: 'Festive & statement pieces' },
  { label: '₹10,000 – ₹20,000', path: '/shop?budget=under-10000', desc: 'Grand bridal & heritage suites' },
  { label: '₹20,000 & above', path: '/shop?filter=featured', desc: 'Royalty & heirloom collections' },
];

const OCCASION_ITEMS = [
  { label: 'Daily Wear', path: '/shop?occasion=Daily+Wear' },
  { label: 'Festive', path: '/shop?occasion=Festive' },
  { label: 'Bridal', path: '/shop?occasion=Bridal' },
  { label: 'Party Wear', path: '/shop?occasion=Party+Wear' },
  { label: 'Office Wear', path: '/shop?occasion=Office+Wear' },
  { label: 'Date Night', path: '/shop?occasion=Date+Night' },
  { label: 'Wedding', path: '/shop?occasion=Bridal' },
  { label: 'Day Out', path: '/shop?occasion=Day+Out' },
];

export const MegaMenu: React.FC<MegaMenuProps> = ({
  menuType,
  onClose,
  onMouseEnter,
  onMouseLeave,
}) => {
  const [allJewelleryTab, setAllJewelleryTab] = useState<'category' | 'price' | 'occasion'>('category');
  const navigate = useNavigate();

  if (!menuType) return null;

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-label="Kuveras Luxury Mega Menu"
      className="absolute top-full left-0 right-0 w-full bg-[#FFFFFF] border-t border-t-[#C89B3C] border-b border-[#E8E1D8] shadow-xl z-[1000] transition-all duration-200 ease-out"
      style={{
        animation: 'fadeInSlide 180ms ease-out forwards',
      }}
    >
      <div className="max-w-[1340px] mx-auto px-6 py-6 lg:py-8">
        
        {/* ================================================== */}
        {/* 1. ALL JEWELLERY MEGA MENU                          */}
        {/* ================================================== */}
        {menuType === 'jewellery' && (
          <div className="flex gap-8 items-stretch">
            
            {/* LEFT SIDEBAR TABS */}
            <div className="w-48 shrink-0 space-y-1.5 border-r border-[#E8E1D8] pr-5">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C89B3C] block px-3 mb-2">
                BROWSE BY
              </span>
              
              <button
                type="button"
                onMouseEnter={() => setAllJewelleryTab('category')}
                onClick={() => setAllJewelleryTab('category')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  allJewelleryTab === 'category'
                    ? 'bg-[#FFFDF8] text-[#0B5D3B] shadow-2xs border-l-3 border-l-[#C89B3C]'
                    : 'text-[#2B2723] hover:text-[#C89B3C] hover:bg-[#FFFDF8]'
                }`}
              >
                <span>Category</span>
                {allJewelleryTab === 'category' && <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />}
              </button>

              <button
                type="button"
                onMouseEnter={() => setAllJewelleryTab('price')}
                onClick={() => setAllJewelleryTab('price')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  allJewelleryTab === 'price'
                    ? 'bg-[#FFFDF8] text-[#0B5D3B] shadow-2xs border-l-3 border-l-[#C89B3C]'
                    : 'text-[#2B2723] hover:text-[#C89B3C] hover:bg-[#FFFDF8]'
                }`}
              >
                <span>Price</span>
                {allJewelleryTab === 'price' && <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />}
              </button>

              <button
                type="button"
                onMouseEnter={() => setAllJewelleryTab('occasion')}
                onClick={() => setAllJewelleryTab('occasion')}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer flex items-center justify-between ${
                  allJewelleryTab === 'occasion'
                    ? 'bg-[#FFFDF8] text-[#0B5D3B] shadow-2xs border-l-3 border-l-[#C89B3C]'
                    : 'text-[#2B2723] hover:text-[#C89B3C] hover:bg-[#FFFDF8]'
                }`}
              >
                <span>Occasion</span>
                {allJewelleryTab === 'occasion' && <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />}
              </button>
            </div>

            {/* MIDDLE MAIN CONTENT AREA */}
            <div className="flex-1 min-w-0 pr-4">
              
              {/* CATEGORY TAB CONTENT (3-column Grid with Small Circular Thumbnails) */}
              {allJewelleryTab === 'category' && (
                <div>
                  <h4 className="font-serif text-base text-[#2B2723] font-normal mb-4 pb-2 border-b border-[#F3EEE6] flex items-center justify-between">
                    <span>Explore Jewellery Categories</span>
                    <button
                      onClick={() => handleNavigate('/shop')}
                      className="text-[11px] font-sans font-semibold text-[#0B5D3B] hover:text-[#C89B3C] uppercase tracking-widest cursor-pointer"
                    >
                      View All Products →
                    </button>
                  </h4>

                  <div className="grid grid-cols-3 gap-x-6 gap-y-3 max-h-[360px] overflow-y-auto pr-2 no-scrollbar">
                    {CATEGORY_ITEMS.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleNavigate(item.path)}
                        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[#FFFDF8] transition-all cursor-pointer text-left w-full"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#E8E1D8] group-hover:scale-104 transition-transform duration-300"
                        />
                        <span className="font-serif text-sm text-[#2B2723] group-hover:text-[#C89B3C] font-normal flex-1 truncate transition-colors">
                          {item.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PRICE TAB CONTENT */}
              {allJewelleryTab === 'price' && (
                <div>
                  <h4 className="font-serif text-base text-[#2B2723] font-normal mb-4 pb-2 border-b border-[#F3EEE6]">
                    Shop Jewellery By Budget Range
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {PRICE_ITEMS.map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => handleNavigate(p.path)}
                        className="group p-4 bg-[#FFFDF8] border border-[#E8E1D8] hover:border-[#C89B3C] rounded-xl text-left transition-all hover:shadow-xs cursor-pointer"
                      >
                        <span className="font-serif text-base text-[#2B2723] group-hover:text-[#C89B3C] font-normal block mb-1">
                          {p.label}
                        </span>
                        <span className="font-sans text-xs text-[#6F6860] block">
                          {p.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* OCCASION TAB CONTENT */}
              {allJewelleryTab === 'occasion' && (
                <div>
                  <h4 className="font-serif text-base text-[#2B2723] font-normal mb-4 pb-2 border-b border-[#F3EEE6]">
                    Curated Jewellery For Every Celebration
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {OCCASION_ITEMS.map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => handleNavigate(o.path)}
                        className="group p-3 bg-[#FFFDF8] border border-[#E8E1D8] hover:border-[#C89B3C] hover:bg-[#FFFDF8] rounded-lg text-center transition-all cursor-pointer"
                      >
                        <span className="font-serif text-sm text-[#2B2723] group-hover:text-[#C89B3C] font-normal block">
                          {o.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR PROMOTIONAL CARD */}
            <div className="w-[300px] shrink-0 border-l border-[#E8E1D8] pl-6">
              <div
                onClick={() => handleNavigate('/shop')}
                className="group relative rounded-[14px] overflow-hidden border border-[#E8E1D8] shadow-sm cursor-pointer h-full min-h-[300px] flex flex-col justify-end p-5 text-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85"
                  alt="Timeless Indian Elegance"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                <div className="relative z-10 space-y-1.5">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#E7C982] block">
                    KUVERAS EDITORIAL
                  </span>
                  <h5 className="font-serif text-xl font-normal leading-snug text-white">
                    Timeless Indian Elegance
                  </h5>
                  <p className="font-sans text-xs text-white/80 leading-relaxed">
                    Discover handcrafted jewellery for every celebration.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ================================================== */}
        {/* 2. BRIDAL MEGA MENU                                */}
        {/* ================================================== */}
        {menuType === 'bridal' && (
          <div className="grid grid-cols-4 gap-8 font-sans">
            <div>
              <h4 className="font-serif text-sm text-[#0B5D3B] uppercase tracking-[0.16em] pb-2 border-b border-[#E8E1D8] mb-3 font-semibold">
                Bridal Categories
              </h4>
              <ul className="space-y-2 text-xs text-[#2B2723]">
                {['Bridal Sets', 'Choker Sets', 'Rani Haar', 'Matha Patti'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/shop?category=Bridal')}
                      className="hover:text-[#C89B3C] hover:bg-[#FFFDF8] px-2 py-1 rounded transition-colors text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm text-[#0B5D3B] uppercase tracking-[0.16em] pb-2 border-b border-[#E8E1D8] mb-3 font-semibold">
                Bridal Style &amp; Heritage
              </h4>
              <ul className="space-y-2 text-xs text-[#2B2723]">
                {['Gujarati Bride', 'Rajasthani Bride', 'Marwari Bride', 'South Indian Bride'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleNavigate('/shop?category=Bridal')}
                      className="hover:text-[#C89B3C] hover:bg-[#FFFDF8] px-2 py-1 rounded transition-colors text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-sm text-[#0B5D3B] uppercase tracking-[0.16em] pb-2 border-b border-[#E8E1D8] mb-3 font-semibold">
                Craftsmanship &amp; Styles
              </h4>
              <ul className="space-y-2 text-xs text-[#2B2723]">
                {['Kundan', 'Temple Gold-tone', 'Cubic Zirconia'].map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => handleNavigate(`/shop?category=${encodeURIComponent(item)}`)}
                      className="hover:text-[#C89B3C] hover:bg-[#FFFDF8] px-2 py-1 rounded transition-colors text-left w-full cursor-pointer"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Promotional Card */}
            <div
              onClick={() => handleNavigate('/shop?category=Bridal')}
              className="group relative rounded-[14px] overflow-hidden border border-[#E8E1D8] shadow-sm cursor-pointer h-[240px] flex flex-col justify-end p-5 text-white"
            >
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85"
                alt="Royal Bridal Edit"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#E7C982] block">
                  BRIDAL COLLECTION
                </span>
                <h5 className="font-serif text-lg text-white font-normal">Royal Bridal Ensemble</h5>
                <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                  <span>Explore Bridal Edit →</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* 3. TEMPLE MEGA MENU                                */}
        {/* ================================================== */}
        {menuType === 'temple' && (
          <div className="grid grid-cols-4 gap-8 font-sans">
            <div className="col-span-2">
              <h4 className="font-serif text-sm text-[#0B5D3B] uppercase tracking-[0.16em] pb-2 border-b border-[#E8E1D8] mb-3 font-semibold">
                Temple Collections
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#2B2723]">
                {[
                  'Temple Jewellery',
                  'Temple Necklaces',
                  'Temple Earrings',
                  'Temple Bangles',
                  'Temple Sets',
                  'Goddess Lakshmi Motifs',
                  'Mango Mala',
                  'Kasulaperu Coins',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavigate('/shop?category=Temple')}
                    className="hover:text-[#C89B3C] hover:bg-[#FFFDF8] px-2.5 py-1.5 rounded transition-colors text-left w-full cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <div
                onClick={() => handleNavigate('/shop?category=Temple')}
                className="group relative rounded-[14px] overflow-hidden border border-[#E8E1D8] shadow-sm cursor-pointer h-[220px] flex flex-col justify-end p-5 text-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=85"
                  alt="Divine Temple Artistry"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#E7C982] block">
                    HERITAGE CRAFT
                  </span>
                  <h5 className="font-serif text-lg text-white font-normal">Divine Temple Artistry</h5>
                  <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>Explore Temple Edit →</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* 4. BRACELETS MEGA MENU                             */}
        {/* ================================================== */}
        {menuType === 'bracelets' && (
          <div className="grid grid-cols-4 gap-8 font-sans">
            <div className="col-span-2">
              <h4 className="font-serif text-sm text-[#0B5D3B] uppercase tracking-[0.16em] pb-2 border-b border-[#E8E1D8] mb-3 font-semibold">
                Bracelet &amp; Bangle Categories
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-[#2B2723]">
                {[
                  'Bracelets',
                  'Bangles',
                  'Gold-tone Bracelets',
                  'Statement Bracelets',
                  'Daily Wear Bracelets',
                  'Tennis Bracelets',
                  'Kada Bangles',
                  'Kundan Bracelets',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleNavigate('/shop?category=Bracelets')}
                    className="hover:text-[#C89B3C] hover:bg-[#FFFDF8] px-2.5 py-1.5 rounded transition-colors text-left w-full cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <div
                onClick={() => handleNavigate('/shop?category=Bracelets')}
                className="group relative rounded-[14px] overflow-hidden border border-[#E8E1D8] shadow-sm cursor-pointer h-[220px] flex flex-col justify-end p-5 text-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=85"
                  alt="Graceful Wristwear"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="relative z-10 space-y-1">
                  <span className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-[#E7C982] block">
                    WRISTWEAR
                  </span>
                  <h5 className="font-serif text-lg text-white font-normal">Graceful Wristwear &amp; Bangles</h5>
                  <span className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>Explore Bracelets →</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================== */}
        {/* 5. RENT INFO HOVER PANEL                           */}
        {/* ================================================== */}
        {menuType === 'rent' && (
          <div className="max-w-2xl mx-auto font-sans bg-[#FFFDF8] border border-[#E8E1D8] rounded-xl p-6 flex items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-[#0B5D3B]">
                <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                <span className="text-xs font-semibold uppercase tracking-wider">3-Day Luxury Jewellery Rental</span>
              </div>
              <h4 className="font-serif text-xl text-[#2B2723] font-normal">Rent Designer Jewellery</h4>
              <p className="text-xs text-[#6F6860] leading-relaxed">
                Choose your favourite statement bridal or heritage jewellery for your special occasion with doorstep delivery and WhatsApp concierge.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleNavigate('/rent-info')}
              className="px-5 py-3 bg-[#0B5D3B] hover:bg-[#075235] text-white text-xs font-sans font-semibold uppercase tracking-widest rounded-lg transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>View Rental Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
