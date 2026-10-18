import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { SafeImage } from '../components/common/SafeImage';

export const AboutPage: React.FC = () => {
  const categories = [
    {
      id: 'kundan',
      title: 'Kundan',
      subtitle: 'The Light of Royal Legacy',
      categoryQuery: 'Kundan',
      image: 'https://kuverasshop-com-633906.hostingersite.com/wp-content/uploads/2025/05/IMG_2436-scaled-e1746707707253-700x804.jpg',
      description:
        "In the soft gleam of Kundan, history glows quietly. This ancient art form, perfected in the palaces of Rajasthan and Gujarat, carries centuries of regal finesse. At Kuveras, we honour that legacy with a modern breath — preserving intricate setting techniques while embracing silhouettes that speak to today's women. Each piece tells a tale of light: gold-foiled dreams, glass-like gemstones, and devotion to the details that made Kundan the jewel of empresses. Our Kundan is not a revival; it's a resonance — with your weddings, your celebrations, your moments of becoming.",
    },
    {
      id: 'rajwadi',
      title: 'Rajwadi',
      subtitle: 'Jewels of Dignity and Grandeur',
      categoryQuery: 'Rajwadi',
      image: 'https://kuverasshop-com-633906.hostingersite.com/wp-content/uploads/2025/05/IMG_2391-scaled-e1746798958973-700x804.jpg',
      description:
        "The Rajwadi collection is an ode to sovereignty — not of kingdoms, but of spirit. Inspired by the opulence of Maratha and Rajput dynasties, this style captures the commanding grace of those who led with courage and lived with majesty. Kuveras reinterprets that grandeur with refined craftsmanship, letting its bold elegance walk proudly into modern soirées, weddings, and milestones. With every bold motif, filigree edge, and antique-gold finish, Rajwadi jewellery at Kuveras celebrates a rich past while crowning the confidence of today's queen.",
    },
    {
      id: 'temple',
      title: 'Temple',
      subtitle: 'Where Divinity Meets Design',
      categoryQuery: 'Temple',
      image: 'https://kuverasshop-com-633906.hostingersite.com/wp-content/uploads/2025/05/IMG_2416-scaled-e1746708501516-700x804.jpg',
      description:
        "Temple jewellery is not worn — it is revered. Originally crafted to adorn deities in South Indian temples, this sacred art form carries an aura of devotion, protection, and spiritual wealth. Kuveras imbues each piece with the sanctity of its roots, while reimagining it for the woman who walks the world as her own temple. Rich with carvings of gods, goddesses, and sacred flora, our Temple collection is spiritual elegance made wearable — prosperity in gold, legacy in metal, a quiet prayer worn close to the skin.",
    },
    {
      id: 'cz',
      title: 'Cubic Zirconia',
      subtitle: 'Everyday Radiance, Eternal Spark',
      categoryQuery: 'Cubic+Zirconia',
      image: 'https://kuverasshop-com-633906.hostingersite.com/wp-content/uploads/2025/05/IMG_2443-scaled-e1746706011294-700x804.jpg',
      description:
        "Luxury doesn't always need to shout. Sometimes, it sparkles softly. Our Cubic Zirconia collection is for the modern muse — the woman who moves between boardrooms and celebrations, casual elegance and midnight glam. Brilliantly cut and gracefully set, these jewels offer the radiance of diamonds with a soul rooted in artistry. We design each piece not just for wearability, but for aspiration. It's how tradition learns to shine in minimalism, and how everyday moments are crowned with effortless beauty.",
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FFFDF8] min-h-screen animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FAF7F0] border border-[#E8E1D8] text-[#C89B3C] text-[11px] font-sans font-semibold uppercase tracking-[0.25em] rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Rooted in Legacy, Made for Now</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#2B2723] font-normal leading-tight">
            Where Every Jewel <br />
            <span className="italic text-[#C89B3C]">Tells a Story</span>
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#6F6860] leading-relaxed max-w-2xl mx-auto">
            Every Kuveras piece begins the same way — with a story worth wearing. Below is the legacy behind the name, and the artistry behind each collection we craft.
          </p>
        </div>

        {/* Brand Heritage Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-20 bg-[#FFFFFF] border border-[#E8E1D8] p-8 sm:p-12 shadow-xs">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.22em] text-[#C89B3C] block">
              OUR HERITAGE & ORIGINS
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2723] font-normal leading-snug">
              Kuveras: Where Heritage Becomes Eternal Elegance
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#6F6860] leading-relaxed">
              <p>
                Kuveras might be just another brand name to you, but to us it carries the weight of legacy and the pureness of grace, given a modern touch. Welcome to a world of eternal grace and elegance, rooted in Indian heritage and elevated by contemporary design. Our collections are more than adornments — they are expressions of soul, spirit, and a beautiful beginning.
              </p>
              <p>
                Our name is a tribute to <strong>Lord Kubera</strong>, the divine guardian of wealth and prosperity. At the heart of our brand lies the <strong>Kubera Yantra</strong>, a sacred geometric symbol etched in ancient wisdom — representing abundance, protection, and spiritual energy. It's a timeless invitation to welcome prosperity into your life, not just in material form, but in love, connection, and cultural pride.
              </p>
              <p>
                And quietly, at the very core of Kuveras, is <strong>Kamini</strong> — a name, a mother, a guiding light. The "K" in Kuveras is a silent homage to her strength and grace. This brand is as much a gift to her as it is to the world.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/5 w-full bg-[#FAF7F0] border border-[#E8E1D8] overflow-hidden relative shadow-sm group">
              <SafeImage
                src="https://kuverasshop-com-633906.hostingersite.com/wp-content/uploads/2025/12/generated-image-4.jpg"
                fallbackSrc="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
                alt="Kuveras Sacred Geometry & Heritage"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Sacred Geometry Section: The Kubera Yantra */}
        <div className="mb-20 bg-[#FAF7F0] border border-[#D8B56A]/60 p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-[#FFFFFF] border border-[#D8B56A] flex items-center justify-center mx-auto text-[#C89B3C]">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C89B3C] block">
              SACRED VEDIC GEOMETRY
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-[#2B2723] font-normal">
              The Sacred Geometry of Intention: The Kubera Yantra
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-[#6F6860] leading-relaxed">
              <p>
                At the soul of Kuveras lies a symbol — the <strong>Kubera Yantra</strong>, one of the most powerful sacred geometries in Vedic tradition. Composed of interlocking triangles, squares, and numerological patterns, this Yantra is an ancient map to abundance: spiritual, emotional, and material.
              </p>
              <p>
                More than a visual motif, it is our intention in form. Each piece of Kuveras jewellery carries this energy — a gentle blessing for prosperity, joy, and sacred living. By wearing Kuveras, you are not just adorning your body, but inviting the vibration of wealth with wisdom, and style with soul.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-sans font-semibold tracking-[0.22em] text-[#C89B3C] uppercase block">
            CURATED ARTISTRY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B2723] font-normal">
            Explore Our Categories
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#6F6860] leading-relaxed">
            Each a living tribute to India's artistry, each telling its own story of reverence and revival.
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
                  <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E8E1D8] px-3.5 py-1 text-xs font-serif font-medium text-[#2B2723]">
                    {item.title}
                  </div>
                </div>

                <div className="p-7 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#2B2723] group-hover:text-[#C89B3C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-[#C89B3C] mt-1 font-semibold">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#6F6860] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="px-7 sm:px-8 pb-7 sm:pb-8 pt-2">
                <Link
                  to={`/shop?category=${item.categoryQuery}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2B2723] hover:bg-[#06452F] text-white text-xs font-sans font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  <span>Shop {item.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Our Promise Banner */}
        <div className="bg-[#2B2723] text-[#FAF7F0] p-10 sm:p-16 border border-[#C89B3C] text-center space-y-6 shadow-2xl">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#D8B56A] block">
            OUR SOLEMN COMMITMENT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#FFFFFF] font-normal">
            Our Promise: Tradition Carried With Grace
          </h2>
          <div className="max-w-3xl mx-auto space-y-4 font-sans text-sm sm:text-base text-[#D4CEBF] leading-relaxed">
            <p>
              At Kuveras, we do not seek to preserve tradition in glass — we bring it alive, dressed in the language of now. Our artisans blend generations of skill with the vision of a modern world. Our stories are steeped in culture, but never stuck in time.
            </p>
            <p className="font-serif text-lg sm:text-xl italic text-[#D8B56A] pt-2">
              "Because heritage isn't about the past — it's about what we choose to carry forward."
            </p>
            <p className="pt-2 text-xs sm:text-sm text-[#B0A795] font-light">
              And with every piece, we choose to carry beauty, dignity, and the timeless wealth of spirit.
            </p>
          </div>
          <div className="pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#C89B3C] hover:bg-[#b08732] text-[#2B2723] text-xs font-sans font-semibold uppercase tracking-[0.2em] transition-colors cursor-pointer"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 text-[#2B2723]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
