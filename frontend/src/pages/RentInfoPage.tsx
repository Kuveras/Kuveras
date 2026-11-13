import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  MessageCircle,
  Sparkles,
  RefreshCw,
  Truck,
  Lock,
  MapPin,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Gem,
  CreditCard,
  CalendarDays,
  PackageCheck,
  BadgePercent,
  ChevronDown,
  Phone,
  ArrowRight,
} from 'lucide-react';
import { KuverasLogo } from '../components/common/KuverasLogo';

/* ─────────────── Helpers ─────────────── */
const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const EXAMPLE_ORIGINAL_PRICE = 11710;
const EXAMPLE_SELLING_PRICE = 8197;
const RENTAL_RATE_PCT = 30;
const EXAMPLE_RENTAL_PRICE = Math.round(EXAMPLE_SELLING_PRICE * 0.30); // 2459

/* ─────────────── Section Card ─────────────── */
interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  number: string;
  children: React.ReactNode;
  accent?: 'maroon' | 'gold' | 'emerald';
}

const accentMap = {
  maroon: {
    border: 'border-[#7A1010]/30',
    iconBg: 'bg-[#7A1010]/10',
    iconText: 'text-[#7A1010]',
    numText: 'text-[#7A1010]/15',
    tag: 'bg-[#7A1010]/10 text-[#7A1010]'
  },
  gold: {
    border: 'border-[#C89B3C]/40',
    iconBg: 'bg-[#C89B3C]/10',
    iconText: 'text-[#C89B3C]',
    numText: 'text-[#C89B3C]/20',
    tag: 'bg-[#C89B3C]/15 text-[#9A7019]'
  },
  emerald: {
    border: 'border-[#0B5D3B]/30',
    iconBg: 'bg-[#0B5D3B]/10',
    iconText: 'text-[#0B5D3B]',
    numText: 'text-[#0B5D3B]/15',
    tag: 'bg-[#0B5D3B]/10 text-[#0B5D3B]'
  },
};

const SectionCard: React.FC<SectionCardProps> = ({ icon: Icon, title, number, children, accent = 'gold' }) => {
  const a = accentMap[accent];
  return (
    <div className={`relative bg-[#FFFFFF] border ${a.border} p-6 sm:p-8 shadow-xs overflow-hidden transition-all duration-300 hover:shadow-md`}>
      {/* watermark number */}
      <span className={`font-serif text-7xl sm:text-8xl font-bold ${a.numText} absolute -top-3 right-4 pointer-events-none select-none leading-none`}>
        {number}
      </span>
      <div className="relative">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 ${a.iconBg} border ${a.border} flex items-center justify-center ${a.iconText}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#171512]">{title}</h3>
        </div>
        <div className="text-sm text-[#6F675E] leading-relaxed font-sans space-y-3">{children}</div>
      </div>
    </div>
  );
};

/* ─────────────── Policy Bullet ─────────────── */
const Bullet: React.FC<{ children: React.ReactNode; icon?: React.ElementType; highlight?: boolean }> = ({
  children,
  icon: Icon = CheckCircle2,
  highlight = false,
}) => (
  <div className={`flex items-start gap-2.5 ${highlight ? 'bg-[#FAF0F0] border border-[#7A1010]/20 p-3 text-[#171512]' : ''}`}>
    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? 'text-[#7A1010]' : 'text-[#0B5D3B]'}`} />
    <span className={highlight ? 'font-medium text-xs sm:text-sm' : 'text-xs sm:text-sm'}>{children}</span>
  </div>
);

/* ─────────────── Accordion Item ─────────────── */
const AccItem: React.FC<{ q: string; children: React.ReactNode }> = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#EDE3D4] bg-[#FFFDF8]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer"
      >
        <span className="font-serif text-base font-semibold text-[#171512]">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#C89B3C] flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-[#6F675E] leading-relaxed font-sans border-t border-[#EDE3D4] pt-3">
          {children}
        </div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export const RentInfoPage: React.FC = () => {
  const rentalLocations = ['Delhi', 'Dwarka', 'Gurgaon', 'Faridabad', 'Noida', 'Ghaziabad'];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#171512] animate-fade-in">

      {/* ══════════════════════════════════
          HERO BANNER - Sophisticated Deep Maroon & Gold
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#540808] via-[#7A1010] to-[#540808] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,60,0.18)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/60 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <KuverasLogo className="w-[120px] sm:w-[150px] brightness-0 invert" />
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/30 border border-[#C89B3C]/50 text-[#E7C982] text-[11px] font-bold uppercase tracking-[0.25em] mb-4 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C89B3C]" />
            Customer Rental Guide &amp; Transparent Policies
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight mb-4">
            Rent Royal Indian Jewellery
            <br />
            <span className="italic font-normal text-[#E7C982]">Doorstep Delivery · Delhi NCR &amp; Pan-India</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F5EFE5] leading-relaxed max-w-2xl mx-auto mb-8">
            Adorn heirloom Kundan, Rajwadi &amp; Bridal suites at a fraction of purchase price. Seamless WhatsApp concierge, doorstep delivery, and 100% medical-grade UV-C sanitization on every set.
          </p>

          {/* Pricing Hero Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#171512]/90 border border-[#C89B3C]/60 px-6 sm:px-8 py-5 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="bg-[#0B5D3B] text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                {RENTAL_RATE_PCT}% OF SELLING PRICE
              </span>
              <div className="text-left">
                <p className="text-[#E7C982] text-xs mb-0.5">Rental Formula: 30% of Bold Selling Price</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#E7C982]">{formatINR(EXAMPLE_RENTAL_PRICE)}</span>
                  <span className="text-white/60 text-xs line-through font-sans">
                    MRP {formatINR(EXAMPLE_ORIGINAL_PRICE)}
                  </span>
                  <span className="text-white/90 text-xs font-sans font-medium">
                    (Selling {formatINR(EXAMPLE_SELLING_PRICE)})
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#C89B3C]/30" />
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20want%20to%20inquire%20about%20jewellery%20rental."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              Rent on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LOCATIONS & HIGHLIGHTS BAR
      ══════════════════════════════════ */}
      <div className="bg-[#FAF0F0] border-b border-[#7A1010]/20 py-3 text-[#7A1010]">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5 text-[#7A1010] font-bold">
            <MapPin className="w-3.5 h-3.5 text-[#C89B3C]" />
            Free Doorstep Delivery:
          </span>
          {rentalLocations.map((city) => (
            <span key={city} className="flex items-center gap-1 text-[#2B2723]">
              <span className="w-1 h-1 rounded-full bg-[#C89B3C]" />
              {city}
            </span>
          ))}
          <span className="flex items-center gap-1 text-[#0B5D3B] font-bold">
            <Globe className="w-3.5 h-3.5" />
            Pan-India Insured Dispatch
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">

        {/* ── Section Title ── */}
        <div className="text-center mb-10">
          <span className="text-[#C89B3C] text-xs font-bold uppercase tracking-[0.25em] mb-2 block">
            HOW JEWELLERY RENTAL WORKS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171512]">
            Transparent Terms, Effortless Experience
          </h2>
          <div className="mt-3 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
        </div>

        {/* 3 Steps Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFFFFF] border border-[#E8E1D8] p-6 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FAF0F0] border border-[#7A1010]/20 flex items-center justify-center mx-auto text-[#7A1010] font-serif text-xl font-bold mb-4">
              1
            </div>
            <h4 className="font-serif text-lg font-bold text-[#171512] mb-2">Day 1: Doorstep Delivery</h4>
            <p className="text-xs text-[#6F675E] leading-relaxed">
              Jewellery is delivered to your home in a sanitized tamper-evident velvet box 24–48 hours before your occasion.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#C89B3C]/50 p-6 text-center shadow-sm relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C89B3C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-0.5">
              YOUR SPECIAL DAY
            </div>
            <div className="w-12 h-12 rounded-full bg-[#FAF7F0] border border-[#C89B3C] flex items-center justify-center mx-auto text-[#C89B3C] font-serif text-xl font-bold mb-4">
              2
            </div>
            <h4 className="font-serif text-lg font-bold text-[#171512] mb-2">Day 2: Shine with Royalty</h4>
            <p className="text-xs text-[#6F675E] leading-relaxed">
              Adorn the jewellery at your wedding, sangeet, or gala with complete confidence and regal grace.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8E1D8] p-6 text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#FAF0F0] border border-[#7A1010]/20 flex items-center justify-center mx-auto text-[#7A1010] font-serif text-xl font-bold mb-4">
              3
            </div>
            <h4 className="font-serif text-lg font-bold text-[#171512] mb-2">Day 3: Hassle-Free Pickup</h4>
            <p className="text-xs text-[#6F675E] leading-relaxed">
              Our courier picks up the box from your doorstep. Security deposit is released within 24–48 hours upon inspection.
            </p>
          </div>
        </div>

        {/* ── 1. Booking Your Jewellery ── */}
        <SectionCard icon={Sparkles} title="Booking Your Jewellery" number="01" accent="gold">
          <Bullet>Browse our collection on the website and select your desired jewellery set.</Bullet>
          <Bullet>Click <strong>"Rent Via WhatsApp"</strong> on any product page to chat directly with our concierge.</Bullet>
          <Bullet>Our team confirms date availability, rental fee calculation, security deposit, and matching accessories.</Bullet>
          <Bullet>Booking is confirmed upon payment of the rental fee + refundable security deposit.</Bullet>
          <Bullet>Accepted payment modes: <strong>UPI (GPay, PhonePe, Paytm), NetBanking, Credit/Debit Cards</strong>.</Bullet>
          <Bullet highlight icon={AlertTriangle}>
            Bookings are reserved for your specific event date. Please confirm your occasion dates with our concierge.
          </Bullet>
        </SectionCard>

        {/* ── 2. Security Deposit & Verification ── */}
        <SectionCard icon={Lock} title="Security Deposit & Verification" number="02" accent="emerald">
          <Bullet>A fully <strong>refundable security deposit</strong> (typically 30–50% of retail value) is held as collateral during the rental period.</Bullet>
          <Bullet>Valid government photo ID (Aadhaar Card, PAN Card, or Passport) is verified prior to dispatch.</Bullet>
          <Bullet>The exact deposit amount is clearly communicated upfront before payment.</Bullet>
          <Bullet highlight icon={ShieldCheck}>
            Your security deposit is 100% refunded to your original payment method within 24–48 hours of return inspection.
          </Bullet>
        </SectionCard>

        {/* ── 3. Rental Duration & Extensions ── */}
        <SectionCard icon={CalendarDays} title="Rental Duration & Extensions" number="03" accent="gold">
          <Bullet>Our standard rental window is <strong>3 calendar days</strong>: Day 1 (Delivery), Day 2 (Occasion), Day 3 (Pickup).</Bullet>
          <Bullet>Extended rental days can be arranged via WhatsApp subject to set availability.</Bullet>
          <Bullet highlight icon={Clock}>
            Pickup is scheduled on Day 3 by 11:00 AM. In case of unexpected schedule changes, notify our concierge on WhatsApp.
          </Bullet>
        </SectionCard>

        {/* ── 4. Hygiene, Sanitization & Safe Delivery ── */}
        <SectionCard icon={RefreshCw} title="100% Medical-Grade UV-C Sanitization" number="04" accent="maroon">
          <Bullet>Every jewellery set undergoes <strong>medical-grade UV-C sterilization and ultrasonic cleaning</strong> before dispatch.</Bullet>
          <Bullet>Jewellery is sealed in a tamper-evident velvet box ensuring 100% hygiene and pristine polish.</Bullet>
          <Bullet>Includes certificate of quality and soft microfiber storage pouch.</Bullet>
        </SectionCard>

        {/* ── 5. Pricing Formula & Calculation Table ── */}
        <SectionCard icon={BadgePercent} title="Rental Pricing & Calculation (30% Rule)" number="05" accent="gold">
          <div className="flex items-center gap-3 bg-[#0B5D3B] text-white px-4 py-3 mb-5 shadow-xs">
            <BadgePercent className="w-5 h-5 text-[#E7C982] shrink-0" />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E7C982]">Rental Rule: Exactly 30% of Bold Selling Price</p>
              <p className="text-[11px] text-white/90 mt-0.5 font-sans">
                Formula: <strong>Rental Price = Bold Selling Price × 0.30</strong>. Preserves existing catalogue pricing rules.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-[#7A1010] text-white">
                  <th className="text-left px-4 py-3 uppercase tracking-wider font-semibold">Particulars</th>
                  <th className="text-right px-4 py-3 uppercase tracking-wider font-semibold">Selling Price</th>
                  <th className="text-right px-4 py-3 uppercase tracking-wider font-semibold">Formula</th>
                  <th className="text-right px-4 py-3 uppercase tracking-wider font-semibold text-[#E7C982]">Rental Fee (30%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE3D4]">
                <tr className="bg-[#FAF7F0]">
                  <td className="px-4 py-3 font-medium text-[#171512]">Jewellery Rental (3-Day Window)</td>
                  <td className="px-4 py-3 text-right text-[#171512] font-semibold">{formatINR(EXAMPLE_SELLING_PRICE)}</td>
                  <td className="px-4 py-3 text-right text-[#0B5D3B] font-bold">30% OF SELLING</td>
                  <td className="px-4 py-3 text-right font-bold text-[#7A1010] text-base">{formatINR(EXAMPLE_RENTAL_PRICE)}</td>
                </tr>
                <tr className="bg-[#FFFFFF]">
                  <td className="px-4 py-3 font-medium text-[#171512]">Doorstep Delivery &amp; Pickup (Delhi NCR)</td>
                  <td className="px-4 py-3 text-right text-[#6F675E]">—</td>
                  <td className="px-4 py-3 text-right text-[#6F675E]">—</td>
                  <td className="px-4 py-3 text-right font-bold text-[#0B5D3B]">FREE</td>
                </tr>
                <tr className="bg-[#FAF0F0]">
                  <td className="px-4 py-3 font-medium text-[#171512]">Refundable Security Deposit</td>
                  <td className="px-4 py-3 text-right text-[#6F675E]">Per Product</td>
                  <td className="px-4 py-3 text-right text-[#6F675E]">Collateral</td>
                  <td className="px-4 py-3 text-right font-semibold text-[#171512]">100% Refundable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* ── 6. Contact & Concierge ── */}
        <div className="bg-gradient-to-r from-[#FAF0F0] via-[#FAF7F0] to-[#FAF0F0] border-2 border-[#C89B3C]/50 p-8 sm:p-10 text-center space-y-4 shadow-sm">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#7A1010] block">
            NEED ASSISTANCE OR CUSTOM DATES?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#171512] font-normal">
            Kuveras Luxury Rental Concierge
          </h3>
          <p className="text-xs sm:text-sm text-[#6F675E] max-w-xl mx-auto leading-relaxed">
            Our jewellery stylists are available on WhatsApp 7 days a week (9:00 AM – 9:00 PM IST) to assist with bridal matching, deposit inquiries, and reservation scheduling.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20want%20to%20inquire%20about%20jewellery%20rental."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="tel:+918810461628"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#171512] hover:bg-[#7A1010] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 88104 61628</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
