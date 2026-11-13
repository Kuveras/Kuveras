import React from 'react';
import { Sparkles, Heart, Crown, MessageCircle } from 'lucide-react';
import { SafeImage } from '../common/SafeImage';

interface CustomerMoment {
  id: string;
  name: string;
  role: string;
  city: string;
  event: string;
  jewelleryWorn: string;
  image: string;
  quote: string;
}

const CUSTOMER_MOMENTS: CustomerMoment[] = [
  {
    id: 'patron-1',
    name: 'Ananya Sharma',
    role: 'Real Bride',
    city: 'New Delhi',
    event: 'Wedding Day',
    jewelleryWorn: 'Meharika Tara Kundan Set',
    image: '/images/05/IMG_2376-scaled-e1746799678318.jpg',
    quote: 'Renting my bridal jewellery with Kuveras was the best decision! The pieces arrived sterilized and sparkled like real heirlooms.',
  },
  {
    id: 'patron-2',
    name: 'Priyanka Sen',
    role: 'Sangeet Patron',
    city: 'Gurgaon',
    event: 'Sangeet Ceremony',
    jewelleryWorn: 'Ishvika Chandrakanta Collar',
    image: '/images/05/IMG_2391-scaled-e1746798958973.jpg',
    quote: 'The craftsmanship and weight of the Rajwadi set was breathtaking. Doorstep pickup made the rental return completely stress-free.',
  },
  {
    id: 'patron-3',
    name: 'Radhika Mehra',
    role: 'Reception Bride',
    city: 'Dwarka',
    event: 'Grand Reception',
    jewelleryWorn: 'Sacred Temple Goddess Choker',
    image: '/images/05/IMG_2416-scaled-e1746708501516.jpg',
    quote: 'Everyone at my reception asked where I got this set. The 22K gold polish is top-tier and so comfortable to wear all night.',
  },
  {
    id: 'patron-4',
    name: 'Simran Walia',
    role: 'Cocktail Gala',
    city: 'Faridabad',
    event: 'Cocktail Evening',
    jewelleryWorn: 'Cubic Zirconia Diamond Collar',
    image: '/images/05/IMG_2443-scaled-e1746706011294.jpg',
    quote: 'I purchased the CZ set for my sister’s wedding events and it has become my most treasured piece. Truly carried for a lifetime.',
  },
];

export const CustomerGallerySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#FFFDF8] border-b border-[#E8E1D8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FAF0F0] border border-[#7A1010]/20 text-[#7A1010] text-[11px] font-sans font-bold uppercase tracking-[0.25em] rounded-full">
            <Heart className="w-3.5 h-3.5 text-[#C89B3C] fill-[#C89B3C]" />
            <span>Real Kuveras Brides &amp; Patrons</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#171512] font-normal leading-tight">
            Moments That Become <br />
            <span className="italic text-[#7A1010]">Cherished Memories</span>
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#6F675E] leading-relaxed max-w-2xl mx-auto">
            Discover real brides and celebrants who adorned Kuveras for their most celebrated days across Delhi NCR &amp; Pan-India.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {CUSTOMER_MOMENTS.map((moment) => (
            <div
              key={moment.id}
              className="bg-[#FFFFFF] border border-[#E8E1D8] group overflow-hidden shadow-xs hover:border-[#C89B3C] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Frame */}
              <div className="aspect-4/5 w-full bg-[#FAF7F0] overflow-hidden relative">
                <SafeImage
                  src={moment.image}
                  alt={moment.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-[#7A1010] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 shadow-sm">
                  {moment.event}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5">
                  {moment.city}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#171512]">{moment.name}</h4>
                  <p className="text-[11px] font-semibold text-[#C89B3C] uppercase tracking-wider">
                    {moment.role} • {moment.jewelleryWorn}
                  </p>
                </div>
                <p className="font-serif italic text-xs text-[#6F675E] leading-relaxed">
                  "{moment.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Share your look banner */}
        <div className="bg-[#FAF0F0] border border-[#7A1010]/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-xl font-bold text-[#171512]">
              Were You a Kuveras Bride or Celebrant?
            </h4>
            <p className="text-xs text-[#6F675E]">
              Tag us @KuverasShop or send your wedding portraits on WhatsApp to be featured in our official gallery.
            </p>
          </div>
          <a
            href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20would%20like%20to%20share%20my%20photos%20wearing%20Kuveras%20jewellery."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#7A1010] hover:bg-[#540808] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-sm shrink-0"
          >
            <MessageCircle className="w-4 h-4 text-[#E7C982]" />
            <span>Submit Photos on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
