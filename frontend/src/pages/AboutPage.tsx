import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, Gem } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';

export const AboutPage: React.FC = () => {
  const categories = [
    {
      id: 'kundan',
      title: 'Royal Kundan',
      subtitle: 'The Light of Regal Legacy',
      categoryQuery: 'Kundan',
      image: '/images/05/IMG_2436-scaled-e1746707707253.jpg',
      description:
        "In the soft gleam of Kundan, history glows quietly. This ancient art form, perfected in the royal courts of Rajasthan and Gujarat, carries centuries of regal finesse. At Kuveras, we honour that legacy with a modern breath — preserving intricate setting techniques while embracing silhouettes that speak to today's women. Each piece tells a tale of light: gold-foiled dreams, glass-like gemstones, and devotion to the details that made Kundan the jewel of empresses.",
    },
    {
      id: 'rajwadi',
      title: 'Heritage Rajwadi',
      subtitle: 'Jewels of Dignity and Grandeur',
      categoryQuery: 'Rajwadi',
      image: '/images/05/IMG_2391-scaled-e1746798958973.jpg',
      description:
        "The Rajwadi collection is an ode to sovereignty — not of kingdoms, but of spirit. Inspired by the opulence of Maratha and Rajput dynasties, this style captures commanding grace and majesty. Kuveras reinterprets that grandeur with refined craftsmanship, letting bold elegance walk proudly into modern soirées, weddings, and milestones. With every bold motif, filigree edge, and antique-gold finish, Rajwadi jewellery celebrates a rich past while crowning today's queen.",
    },
    {
      id: 'temple',
      title: 'Sacred Temple',
      subtitle: 'Where Divinity Meets Design',
      categoryQuery: 'Temple',
      image: '/images/05/IMG_2416-scaled-e1746708501516.jpg',
      description:
        "Temple jewellery is not worn — it is revered. Originally crafted to adorn deities in South Indian temples, this sacred art form carries an aura of devotion, protection, and spiritual wealth. Kuveras imbues each piece with the sanctity of its roots, while reimagining it for the woman who walks the world as her own temple. Rich with carvings of gods, goddesses, and sacred flora, our Temple collection is spiritual elegance made wearable.",
    },
    {
      id: 'cz',
      title: 'Cubic Zirconia & Bridal Sets',
      subtitle: 'Everyday Radiance, Eternal Spark',
      categoryQuery: 'Cubic+Zirconia',
      image: '/images/05/IMG_2443-scaled-e1746706011294.jpg',
      description:
        "Luxury doesn't always need to shout. Sometimes, it sparkles softly. Our Cubic Zirconia and Bridal suite is crafted for the modern muse — the woman who moves between grand celebrations and midnight glam. Brilliantly cut and gracefully set, these jewels offer diamond-like brilliance with a soul rooted in artistry. We design each piece for aspiration, effortless wearability, and lifelong memories.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0F0] border border-[#7A1010]/20 text-[#7A1010] text-[11px] font-sans font-semibold uppercase tracking-[0.25em] rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
            <span>Crafted for Eternal Elegance</span>
            <Sparkles className="w-3.5 h-3.5 text-[#C89B3C]" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#171512] font-normal leading-tight">
            Where Every Jewel <br />
            <span className="italic text-[#7A1010]">Carries a Legacy</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6F675E] leading-relaxed max-w-2xl mx-auto">
            Every Kuveras piece begins the same way — with a story worth wearing. Rooted in Indian heritage and elevated by contemporary finesse, explore the inspiration behind our brand and sacred artistry.
          </p>
        </div>

        {/* Brand Heritage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 bg-[#FFFFFF] border border-[#E8E1D8] p-8 sm:p-12 shadow-sm">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.22em] text-[#C89B3C] block">
              OUR HERITAGE & ORIGINS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171512] font-normal leading-snug">
              Kuveras: Where Heritage Becomes Eternal Elegance
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#6F675E] leading-relaxed">
              <p>
                Kuveras might be just another brand name to some, but to us it carries the sacred weight of heritage and the pureness of grace, given a modern touch. Welcome to a world of eternal grace and elegance, rooted in Indian royalty and elevated by contemporary craftsmanship. Our collections are more than adornments — they are expressions of soul, spirit, and celebratory beginnings.
              </p>
              <p>
                Our name is an homage to <strong>Lord Kubera</strong>, the divine custodian of wealth and prosperity. At the heart of our brand lies the <strong>Kubera Yantra</strong>, a sacred geometric symbol etched in ancient wisdom — representing abundance, divine protection, and auspicious energy. It is a timeless invitation to welcome prosperity into your life, in material blessings, cultural pride, and heartfelt connections.
              </p>
              <p>
                And quietly, at the very soul of Kuveras, is <strong>Kamini</strong> — a name, a mother, a guiding light. The "K" in Kuveras is a silent tribute to her quiet strength and timeless grace. This brand is as much a gift to her legacy as it is to discerning brides and patrons across the globe.
              </p>
            </div>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#7A1010] uppercase tracking-wider">
              <span className="flex items-center gap-1.5 bg-[#FAF0F0] px-3 py-1.5 border border-[#7A1010]/20">
                <ShieldCheck className="w-4 h-4 text-[#C89B3C]" /> Authentic 22K Gold Polish
              </span>
              <span className="flex items-center gap-1.5 bg-[#FAF7F0] px-3 py-1.5 border border-[#C89B3C]/30 text-[#2B2723]">
                <Award className="w-4 h-4 text-[#C89B3C]" /> Handcrafted in India
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/5 w-full bg-[#FAF7F0] border border-[#C89B3C]/40 overflow-hidden relative shadow-md group">
              <SafeImage
                src="/images/05/IMG_2376-scaled-e1746799678318.jpg"
                fallbackSrc="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Kuveras Sacred Geometry & Heritage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#540808]/90 via-[#540808]/50 to-transparent p-6 text-white">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#E7C982] block mb-1">CRAFTED FOR ETERNITY</span>
                <p className="font-serif text-lg">Heirloom Craftsmanship Rooted in Vedic Grace</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Geometry Section: The Kubera Yantra */}
        <div className="mb-20 bg-gradient-to-br from-[#FAF0F0] via-[#FAF7F0] to-[#FFFDF8] border border-[#C89B3C]/40 p-8 sm:p-14 relative overflow-hidden shadow-xs">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border-2 border-[#C89B3C] flex items-center justify-center mx-auto text-[#7A1010] shadow-sm">
              <Gem className="w-6 h-6 stroke-[1.5] text-[#7A1010]" />
            </div>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7A1010] block">
              SACRED VEDIC GEOMETRY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#171512] font-normal">
              The Sacred Geometry of Intention: The Kubera Yantra
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#6F675E] leading-relaxed">
              <p>
                At the soul of Kuveras lies a sacred symbol — the <strong>Kubera Yantra</strong>, one of the most venerable geometric expressions in Vedic philosophy. Composed of interlocking triangles, squares, and numerological symmetry, this Yantra serves as an ancient talisman for prosperity: spiritual, emotional, and material.
              </p>
              <p>
                More than a decorative motif, it is our intention in physical form. Every piece of Kuveras jewellery is infused with this blessing — celebrating abundance with wisdom, and royal aesthetics with soulful authenticity.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-sans font-semibold tracking-[0.22em] text-[#C89B3C] uppercase block">
            CURATED HERITAGE ARTISTRY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#171512] font-normal">
            Explore Our Signature Collections
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6F675E] leading-relaxed">
            Each collection is a living tribute to India's royal jewellery traditions, available for both Rental and Purchase.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 mb-24">
          {categories.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFFFF] border border-[#E8E1D8] flex flex-col justify-between overflow-hidden shadow-xs hover:border-[#C89B3C] transition-all duration-300 group"
            >
              <div>
                <div className="aspect-16/10 w-full bg-[#FAF7F0] overflow-hidden relative">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#7A1010] text-white px-3.5 py-1 text-xs font-serif font-medium tracking-wider shadow-sm">
                    {item.title}
                  </div>
                </div>

                <div className="p-7 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#171512] group-hover:text-[#7A1010] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#C89B3C] mt-1 font-semibold">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#6F675E] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-7 sm:px-8 pb-7 sm:pb-8 pt-2 flex items-center justify-between gap-4 border-t border-[#F3EEE6]">
                <Link
                  to={`/shop?category=${item.categoryQuery}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7A1010] hover:bg-[#540808] text-white text-xs font-sans font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer shadow-xs"
                >
                  <span>Shop {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>

                <Link
                  to="/rent-info"
                  className="text-xs font-medium text-[#0B5D3B] hover:text-[#06452F] tracking-wide underline underline-offset-4"
                >
                  Rental Available
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Our Promise Banner */}
        <div className="bg-gradient-to-r from-[#540808] via-[#7A1010] to-[#540808] text-[#FFFDF8] p-10 sm:p-16 border-2 border-[#C89B3C] text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(200,155,60,0.15)_0%,_transparent_70%)] pointer-events-none" />
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#E7C982] block">
            OUR SOLEMN COMMITMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] font-normal">
            Tradition Carried With Dignity, Grace & Transparency
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 font-sans text-sm sm:text-base text-[#F5EFE5] leading-relaxed">
            <p>
              At Kuveras, we do not preserve tradition behind glass — we bring it alive, dressed in the language of now. Whether you are renting a grand bridal set for your wedding day or acquiring an heirloom to cherish forever, we guarantee 100% authenticity, medical-grade sanitization, and seamless doorstep delivery.
            </p>
            <p className="font-serif text-lg sm:text-xl italic text-[#E7C982] pt-2">
              "Because heritage isn't about the past — it's about what we choose to carry forward."
            </p>
          </div>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#C89B3C] hover:bg-[#b08732] text-[#171512] text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer shadow-md"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-[#171512]" />
            </Link>
            <Link
              to="/rent-info"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-transparent border border-[#E7C982] text-white hover:bg-white/10 text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <span>How Rental Works</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
