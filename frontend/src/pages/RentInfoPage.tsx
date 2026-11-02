import React, { useState } from 'react';
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
} from 'lucide-react';
import { KuverasLogo } from '../components/common/KuverasLogo';

/* ─────────────── Helpers ─────────────── */
const formatINR = (n: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

const EXAMPLE_ACTUAL_PRICE = 11500;
const RENTAL_RATE_PCT = 30;
const EXAMPLE_RENTAL_PRICE = Math.round(EXAMPLE_ACTUAL_PRICE * 0.30); // 3450

/* ─────────────── Section Card ─────────────── */
interface SectionCardProps {
  icon: React.ElementType;
  title: string;
  number: string;
  children: React.ReactNode;
  accent?: 'gold' | 'emerald' | 'crimson';
}

const accentMap = {
  gold: { border: 'border-[#C89B3C]/40', iconBg: 'bg-[#C89B3C]/10', iconText: 'text-[#C89B3C]', numText: 'text-[#C89B3C]/20' },
  emerald: { border: 'border-[#0B5D3B]/30', iconBg: 'bg-[#0B5D3B]/10', iconText: 'text-[#0B5D3B]', numText: 'text-[#0B5D3B]/15' },
  crimson: { border: 'border-[#7A1010]/30', iconBg: 'bg-[#7A1010]/10', iconText: 'text-[#7A1010]', numText: 'text-[#7A1010]/15' },
};

const SectionCard: React.FC<SectionCardProps> = ({ icon: Icon, title, number, children, accent = 'gold' }) => {
  const a = accentMap[accent];
  return (
    <div className={`relative bg-[#FFFDF9] border ${a.border} p-7 sm:p-8 shadow-sm overflow-hidden`}>
      {/* watermark number */}
      <span className={`font-serif text-8xl font-bold ${a.numText} absolute -top-3 right-4 pointer-events-none select-none leading-none`}>
        {number}
      </span>
      <div className="relative">
        <div className={`inline-flex items-center gap-3 mb-5`}>
          <div className={`w-10 h-10 ${a.iconBg} border ${a.border} flex items-center justify-center ${a.iconText}`}>
            <Icon className="w-5 h-5" />
          </div>
          <h3 className={`font-serif text-xl sm:text-2xl font-bold text-[#171512]`}>{title}</h3>
        </div>
        <div className="text-sm text-[#6F675E] leading-relaxed font-sans space-y-3">{children}</div>
      </div>
    </div>
  );
};

/* ─────────────── Policy Bullet ─────────────── */
const Bullet: React.FC<{ children: React.ReactNode; icon?: React.ElementType; highlight?: boolean }> = ({
  children, icon: Icon = CheckCircle2, highlight = false,
}) => (
  <div className={`flex items-start gap-2.5 ${highlight ? 'bg-[#FAF7F0] border border-[#C89B3C]/30 p-3' : ''}`}>
    <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${highlight ? 'text-[#C89B3C]' : 'text-[#0B5D3B]'}`} />
    <span className={highlight ? 'text-[#171512] font-medium text-xs' : ''}>{children}</span>
  </div>
);

/* ─────────────── Accordion Item ─────────────── */
const AccItem: React.FC<{ q: string; children: React.ReactNode }> = ({ q, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#EDE3D4] bg-[#FDFAF5]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
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
  const rentalLocations = ['Delhi', 'Dwarka', 'Gurgaon', 'Faridabad'];

  return (
    <div className="min-h-screen bg-[#0E0C09] text-white animate-fade-in">

      {/* ══════════════════════════════════
          HERO BANNER
      ══════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Decorative gold lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C89B3C]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(200,155,60,0.07)_0%,_transparent_65%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center relative">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <KuverasLogo className="w-[130px] sm:w-[160px]" />
          </div>

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#C89B3C]/50 text-[#C89B3C] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Customer Rental Instructions &amp; Policies
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            Rent Royal Indian Jewellery
            <br />
            <span className="italic font-normal text-[#C89B3C]">Doorstep Delivery · Delhi &amp; Pan-India</span>
          </h1>

          <p className="text-sm sm:text-base text-[#9E9990] leading-relaxed max-w-2xl mx-auto mb-10">
            Adorn heirloom Kundan, Rajwadi &amp; Bridal sets at a fraction of retail prices. Seamless WhatsApp booking,
            doorstep delivery, and 100% medical-grade UV-C sanitization on every piece.
          </p>

          {/* Pricing Hero Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-[#1A1508] border border-[#C89B3C]/50 px-8 py-5 shadow-[0_0_30px_rgba(200,155,60,0.12)]">
            <div className="flex items-center gap-3">
              <span className="bg-[#0B5D3B] text-white text-xs font-bold uppercase tracking-widest px-3 py-1">
                {RENTAL_RATE_PCT}% OF ACTUAL PRICE
              </span>
              <div className="text-left">
                <p className="text-[#9E9990] text-xs mb-0.5">Rental Price (30% Calculation Formula)</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-bold text-[#C89B3C]">{formatINR(EXAMPLE_RENTAL_PRICE)}</span>
                  <span className="text-[#9E9990] text-sm">(Actual Price: {formatINR(EXAMPLE_ACTUAL_PRICE)})</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block w-px h-10 bg-[#C89B3C]/30" />
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20want%20to%20book%20a%20jewellery%20rental."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Book on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          LOCATIONS BAR
      ══════════════════════════════════ */}
      <div className="bg-[#C89B3C] py-3">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[#0E0C09] text-xs font-bold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5" />
          <span>Free Doorstep Delivery:</span>
          {rentalLocations.map((city) => (
            <span key={city} className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#0E0C09]/40" />
              {city}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            Pan-India via Courier
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════
          MAIN CONTENT — light bg
      ══════════════════════════════════ */}
      <div className="bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">

          {/* ── Section Title ── */}
          <div className="text-center mb-10">
            <p className="text-[#C89B3C] text-xs font-bold uppercase tracking-[0.2em] mb-2">Policy Handbook</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171512]">
              Rental Terms &amp; Conditions
            </h2>
            <div className="mt-3 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
          </div>

          {/* ── 1. Booking Your Jewellery ── */}
          <SectionCard icon={Sparkles} title="Booking Your Jewellery" number="01" accent="gold">
            <Bullet>Browse our collection and select your desired jewellery set from the website or WhatsApp catalogue.</Bullet>
            <Bullet>Click <strong>"Rent Via WhatsApp"</strong> on the product page to initiate your booking with our concierge.</Bullet>
            <Bullet>Our team will confirm date availability, rental fee breakdown, security deposit, and matching accessories.</Bullet>
            <Bullet>Booking is confirmed only after payment of the full rental fee + refundable security deposit.</Bullet>
            <Bullet>Accepted payment modes: <strong>UPI, NetBanking, Credit Card, Debit Card</strong> (no cash-on-delivery for rentals).</Bullet>
            <Bullet highlight icon={AlertTriangle}>
              Bookings are date-specific and non-transferable. Please confirm your event date before completing payment.
            </Bullet>
          </SectionCard>

          {/* ── 2. Security Deposit & Verification ── */}
          <SectionCard icon={Lock} title="Security Deposit & Verification" number="02" accent="emerald">
            <Bullet>A fully <strong>refundable security deposit</strong> (typically 30–50% of the retail/purchase value of the jewellery) is collected at the time of booking.</Bullet>
            <Bullet>The deposit is held as collateral to cover any potential loss, damage, or non-return of items during the rental period.</Bullet>
            <Bullet>You will be required to share a valid government-issued photo ID (Aadhaar Card, PAN Card, Passport, or Driving Licence) for identity verification before dispatch.</Bullet>
            <Bullet>The deposit amount will be clearly communicated to you via WhatsApp before you confirm the booking.</Bullet>
            <Bullet highlight icon={ShieldCheck}>
              Your security deposit is 100% refundable upon safe return and successful inspection of the jewellery.
            </Bullet>
          </SectionCard>

          {/* ── 3. Rental Duration & Extensions ── */}
          <SectionCard icon={CalendarDays} title="Rental Duration & Extensions" number="03" accent="gold">
            <Bullet>Our <strong>standard rental period is 1 Day</strong> (or as agreed via WhatsApp).</Bullet>
            <Bullet>The full 3-day window is structured as: <strong>Day 1</strong> — Delivery to your doorstep; <strong>Day 2</strong> — Your occasion/event; <strong>Day 3</strong> — Scheduled pickup.</Bullet>
            <Bullet>Extensions beyond the agreed period can be arranged via WhatsApp, subject to availability.</Bullet>
            <Bullet>Extended rental charges will apply for each additional day at the agreed daily rental rate.</Bullet>
            <Bullet highlight icon={Clock}>
              Pickup is scheduled on Day 3. Please ensure the jewellery is packed and ready by 11:00 AM on the return day.
            </Bullet>
          </SectionCard>

          {/* ── 4. Late Return Policy ── */}
          <SectionCard icon={AlertTriangle} title="Late Return Policy" number="04" accent="crimson">
            <Bullet icon={AlertTriangle}>If jewellery is not returned on the scheduled pickup day without prior intimation, a <strong>late return fee</strong> will be charged per additional day at the standard daily rental rate.</Bullet>
            <Bullet icon={AlertTriangle}>Repeated failure to return the jewellery or non-cooperation with pickup will be treated as <strong>non-return</strong>, and the full security deposit will be forfeited.</Bullet>
            <Bullet>In case of genuine emergencies, please notify us immediately via WhatsApp to arrange an extension and avoid late fees.</Bullet>
            <Bullet highlight icon={AlertTriangle}>
              Late fees will be deducted from the security deposit if not paid separately. Please communicate proactively to avoid disputes.
            </Bullet>
          </SectionCard>

          {/* ── 5. Jewellery Care & Return Conditions ── */}
          <SectionCard icon={Gem} title="Jewellery Care & Return Conditions" number="05" accent="gold">
            <Bullet>Handle all jewellery with care. Store in the provided velvet box when not wearing.</Bullet>
            <Bullet>Keep jewellery away from water, perfumes, hairsprays, cosmetics, and direct sunlight.</Bullet>
            <Bullet>Do not attempt to repair, resize, or alter any jewellery during the rental period.</Bullet>
            <div className="mt-2 space-y-2">
              <p className="font-semibold text-[#171512] text-sm">Return Condition Standards:</p>
              <Bullet>✅ <strong>Fully Covered (No Charge):</strong> Normal light wear on thread cords (dori), minor patina, back clasp looseness.</Bullet>
              <Bullet icon={AlertTriangle}>⚠️ <strong>Assessed from Deposit:</strong> Significant stone loss (non-dori), bent metal framework, broken chains or structural damage.</Bullet>
              <Bullet icon={AlertTriangle}>❌ <strong>Full Deposit Forfeiture:</strong> Complete loss of jewellery, theft, or severe irreparable damage.</Bullet>
            </div>
            <Bullet highlight icon={ShieldCheck}>
              Our inspection team conducts a fair, transparent assessment within 24–48 hours of return.
            </Bullet>
          </SectionCard>

          {/* ── 6. Security Deposit Refund ── */}
          <SectionCard icon={CreditCard} title="Security Deposit Refund" number="06" accent="emerald">
            <Bullet>The refundable security deposit is released back to your original payment method within <strong>24–48 hours</strong> after the returned jewellery passes inspection.</Bullet>
            <Bullet>Refunds are processed via the same UPI, bank account, or card used for payment.</Bullet>
            <Bullet>If any deduction is made from the deposit for damages or late fees, you will receive a detailed WhatsApp message explaining the assessment before deduction.</Bullet>
            <Bullet>Disputes, if any, will be resolved transparently via WhatsApp communication with photo evidence.</Bullet>
            <Bullet highlight icon={CheckCircle2}>
              In cases of no damage and on-time return, expect your full deposit refund within 48 hours — guaranteed.
            </Bullet>
          </SectionCard>

          {/* ── 7. Delivery & Try-at-Home ── */}
          <SectionCard icon={Truck} title="Delivery & Try-at-Home" number="07" accent="gold">
            <Bullet><strong>Delhi NCR (Delhi, Dwarka, Gurgaon, Faridabad):</strong> Free doorstep delivery and pickup by our own courier team.</Bullet>
            <Bullet><strong>Pan-India:</strong> Insured courier dispatch via Bluedart/Delhivery to all major cities. Shipping charges apply and will be communicated via WhatsApp.</Bullet>
            <Bullet>All items are delivered in a <strong>tamper-evident velvet jewellery box</strong> with authenticity documentation.</Bullet>
            <Bullet>Every piece is sanitized with <strong>medical-grade UV-C sterilization + ultrasonic cleaning</strong> prior to dispatch.</Bullet>
            <Bullet>Delivery is typically arranged <strong>24–48 hours before your occasion</strong> to give you ample preparation time.</Bullet>
            <Bullet highlight icon={Globe}>
              Customers outside Delhi NCR: Please contact us at least <strong>5–7 days in advance</strong> for courier rental arrangements.
            </Bullet>
          </SectionCard>

          {/* ── 8. Rental Charges & Pricing ── */}
          <SectionCard icon={BadgePercent} title="Rental Pricing & Calculation (30% Formula)" number="08" accent="gold">
            {/* Calculation Formula Banner */}
            <div className="flex items-center gap-3 bg-[#0B5D3B] text-white px-4 py-3 mb-5">
              <BadgePercent className="w-5 h-5 text-[#E7C982] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#E7C982]">Rental Price Rule: Exactly 30% of Actual Jewellery Price</p>
                <p className="text-[11px] text-white/90 mt-0.5 font-sans">Formula: <strong>Rental Price = Actual Jewellery Price × 0.30</strong>. No discount applied—the rental price is exactly 30% of the actual jewellery value.</p>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-xs sm:text-sm border-collapse min-w-[520px]">
                <thead>
                  <tr className="bg-[#171512] text-white">
                    <th className="text-left px-4 py-3 font-sans font-semibold uppercase tracking-wider border border-[#C89B3C]/30">Particulars</th>
                    <th className="text-right px-4 py-3 font-sans font-semibold uppercase tracking-wider border border-[#C89B3C]/30">Actual Jewellery MRP</th>
                    <th className="text-right px-4 py-3 font-sans font-semibold uppercase tracking-wider border border-[#C89B3C]/30">Calculation Formula</th>
                    <th className="text-right px-4 py-3 font-sans font-semibold uppercase tracking-wider border border-[#C89B3C]/30 text-[#C89B3C]">Rental Price (30%)</th>
                  </tr>
                </thead>
                <tbody className="font-sans">
                  {/* Rental fee */}
                  <tr className="bg-[#FFF9ED] border border-[#C89B3C]/20">
                    <td className="px-4 py-3 font-medium text-[#171512]">
                      Jewellery Rental Fee <span className="text-[10px] font-normal text-[#6F675E]">(per day / 1 occasion)</span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#171512]">{formatINR(EXAMPLE_ACTUAL_PRICE)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className="bg-[#0B5D3B] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider">30% OF ACTUAL</span>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-[#C89B3C] text-base">{formatINR(EXAMPLE_RENTAL_PRICE)}</td>
                  </tr>
                  {/* Security deposit */}
                  <tr className="bg-[#FDFAF5] border border-[#EDE3D4]">
                    <td className="px-4 py-3 font-medium text-[#171512]">
                      Security Deposit <span className="text-[10px] font-normal text-[#6F675E]">(refundable · 30–50% of retail)</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#6F675E]">As per product</td>
                    <td className="px-4 py-3 text-right text-[#6F675E] text-xs">Held as collateral</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#171512]">As per product</td>
                  </tr>
                  {/* Delhi delivery */}
                  <tr className="bg-[#FFF9ED]/60 border border-[#EDE3D4]">
                    <td className="px-4 py-3 font-medium text-[#171512]">
                      Delivery &amp; Pickup <span className="text-[10px] font-normal text-[#6F675E]">(Delhi NCR)</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#6F675E]">—</td>
                    <td className="px-4 py-3 text-right text-[#6F675E] text-xs">—</td>
                    <td className="px-4 py-3 text-right font-bold text-[#0B5D3B]">FREE</td>
                  </tr>
                  {/* Pan-India */}
                  <tr className="bg-[#FDFAF5] border border-[#EDE3D4]">
                    <td className="px-4 py-3 font-medium text-[#171512]">
                      Courier Shipping <span className="text-[10px] font-normal text-[#6F675E]">(Pan-India, insured)</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#6F675E]">Actuals</td>
                    <td className="px-4 py-3 text-right text-[#6F675E] text-xs">Standard courier rate</td>
                    <td className="px-4 py-3 text-right font-semibold text-[#171512]">Actuals</td>
                  </tr>
                  {/* Total example */}
                  <tr className="bg-[#171512] text-white border-2 border-[#C89B3C]/50">
                    <td className="px-4 py-3.5 font-bold font-serif text-sm">
                      Example Total <span className="text-[11px] font-sans font-normal text-[#9E9990]">(Delhi NCR, 1 Day Rental)</span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-[#9E9990] text-xs">{formatINR(EXAMPLE_ACTUAL_PRICE)} MRP</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="text-[#C89B3C] text-[10px] font-bold px-2 py-0.5 tracking-wider">30% CALCULATION</span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-bold text-[#C89B3C] text-lg">{formatINR(EXAMPLE_RENTAL_PRICE)} + deposit</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-[#6F675E] mt-3 italic font-sans">
              * Rental price is calculated automatically for every product as exactly 30% of its actual jewellery price (Formula: Rental Price = Actual Price × 0.30). Security deposit is product-specific and 100% refundable upon return.
            </p>
          </SectionCard>

          {/* ── 9. Important Booking Reminders ── */}
          <SectionCard icon={PackageCheck} title="Important Booking Reminders" number="09" accent="crimson">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: CalendarDays, text: 'Book at least 3–5 days in advance for Delhi NCR rentals and 7+ days for Pan-India courier rentals.' },
                { icon: ShieldCheck, text: 'A valid government-issued photo ID is mandatory for all rental bookings.' },
                { icon: Lock, text: 'Booking is confirmed only after receipt of both rental fee + security deposit.' },
                { icon: RefreshCw, text: 'All jewellery is sanitized with UV-C sterilization and ultrasonic cleaning before dispatch.' },
                { icon: PackageCheck, text: 'Return the jewellery in the original velvet box provided. Do not use alternate packaging.' },
                { icon: Phone, text: 'In case of any issue during the rental period, contact us immediately via WhatsApp: +91 99102 04680.' },
                { icon: AlertTriangle, text: 'Do not lend, share, or sub-rent the jewellery to a third party during your rental window.' },
                { icon: Truck, text: 'Ensure someone is available at the delivery address to receive and sign for the package.' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-start gap-3 bg-[#FAF7F0] border border-[#EDE3D4] p-3.5">
                  <div className="w-7 h-7 bg-[#7A1010]/10 border border-[#7A1010]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-[#7A1010]" />
                  </div>
                  <p className="text-xs text-[#6F675E] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </SectionCard>

        </div>
      </div>

      {/* ══════════════════════════════════
          PROCESS STEPS — dark bg
      ══════════════════════════════════ */}
      <section className="bg-[#0E0C09] py-16 sm:py-20 border-t border-[#C89B3C]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C89B3C] text-xs font-bold uppercase tracking-[0.2em] mb-2">How It Works</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">6 Simple Steps to Rent</h2>
            <div className="mt-3 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: '01', icon: Sparkles, title: 'Select Jewellery', desc: 'Explore our catalog of royal Kundan chokers, temple gold-tone sets, and bridal Rani Haars. Click "Rent Via WhatsApp".' },
              { step: '02', icon: MessageCircle, title: 'WhatsApp Consultation', desc: 'Our jewellery concierge verifies date availability, rental fee breakdown, security deposit, and matching accessories.' },
              { step: '03', icon: Lock, title: 'Confirm Booking & Deposit', desc: 'Pay rental fee + refundable security deposit securely via UPI, NetBanking, or Credit Card.' },
              { step: '04', icon: RefreshCw, title: 'UV-C Sanitization', desc: 'Every piece undergoes medical-grade UV-C light sterilization and ultrasonic cleaning prior to dispatch.' },
              { step: '05', icon: Truck, title: 'Insured Delivery', desc: 'Receive your luxury set 24–48 hours before your occasion in a tamper-evident velvet box.' },
              { step: '06', icon: ShieldCheck, title: 'Hassle-Free Return', desc: 'Place items back in box. Our courier team picks up from your doorstep. Deposit refunded upon inspection.' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative bg-[#141209] border border-[#C89B3C]/20 p-7 overflow-hidden hover:border-[#C89B3C]/50 transition-colors group">
                <span className="font-serif text-7xl font-bold text-[#C89B3C]/8 absolute -top-2 right-3 pointer-events-none select-none leading-none group-hover:text-[#C89B3C]/12 transition-colors">
                  {step}
                </span>
                <div className="w-10 h-10 bg-[#C89B3C]/10 border border-[#C89B3C]/30 flex items-center justify-center text-[#C89B3C] mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-xs text-[#9E9990] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          FAQs — light bg
      ══════════════════════════════════ */}
      <section className="bg-[#FAF8F5] py-16 border-t border-[#EDE3D4]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C89B3C] text-xs font-bold uppercase tracking-[0.2em] mb-2">Answers</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171512]">Frequently Asked Questions</h2>
            <div className="mt-3 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-[#C89B3C] to-transparent" />
          </div>

          <div className="space-y-2">
            <AccItem q="What is the standard rental duration?">
              Our standard rental period is <strong>1 Day</strong> at exactly <strong>30% of the actual jewellery price</strong> (for example: Actual Price <span className="text-[#171512] font-semibold">{formatINR(EXAMPLE_ACTUAL_PRICE)}</span> → Rental Price <span className="text-[#C89B3C] font-bold">{formatINR(EXAMPLE_RENTAL_PRICE)}</span>). The full window is 3 calendar days — delivery, occasion, pickup. Extended rental periods can be arranged via WhatsApp.
            </AccItem>
            <AccItem q="How does the refundable security deposit work?">
              A refundable deposit (usually 30–50% of retail price) is held during the rental window. Once our inspection team verifies the returned set within 48 hours, the full deposit is released back to your bank account or UPI.
            </AccItem>
            <AccItem q="What if there is minor wear or accidental damage?">
              Normal light wear on thread cords (dori) or back clasps is fully covered — no charge. Severe stone loss or metal bending will be assessed fairly and transparently from the deposit with photo documentation.
            </AccItem>
            <AccItem q="Is the jewellery sanitized before I wear it?">
              Yes — hygiene is paramount at KUVERAS. Every returned rental item undergoes a 3-step purification process: ultrasonic bath, medical-grade UV-C sterilization, and tamper-evident velvet box sealing.
            </AccItem>
            <AccItem q="Can I rent jewellery if I live outside Delhi?">
              Absolutely. We ship via insured courier (Bluedart/Delhivery) to all major cities across India. Please contact us on WhatsApp at least 7 days in advance for Pan-India rental arrangements.
            </AccItem>
            <AccItem q="What ID is required for a rental booking?">
              A valid government-issued photo ID is required — Aadhaar Card, PAN Card, Passport, or Driving Licence. This is shared securely via WhatsApp before dispatch.
            </AccItem>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════
          WHATSAPP CTA — dark
      ══════════════════════════════════ */}
      <section className="bg-[#0E0C09] py-16 border-t border-[#C89B3C]/20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <div className="relative inline-flex">
            <MessageCircle className="w-14 h-14 text-[#25D366]" />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#25D366] rounded-full border-2 border-[#0E0C09] animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
            Ready to Rent? <br />
            <span className="italic font-normal text-[#C89B3C]">Chat with Our Jewellery Concierge</span>
          </h2>
          <p className="text-sm text-[#9E9990] max-w-lg mx-auto leading-relaxed">
            Get instant answers on date availability, security deposits, delivery across Delhi NCR, and custom bridal styling — all on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919910204680?text=Hi%20Kuveras!%20I%20want%20to%20inquire%20about%20jewellery%20rental%20with%20doorstep%20delivery%20across%20Delhi."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp Now
            </a>
            <a
              href="tel:+918810461628"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#C89B3C]/50 hover:border-[#C89B3C] text-[#C89B3C] text-xs font-bold uppercase tracking-widest transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 88104 61628
            </a>
          </div>
          {/* Delivery Areas */}
          <div className="pt-4 border-t border-[#C89B3C]/15 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-[#6F675E] uppercase tracking-widest">
            <Globe className="w-3.5 h-3.5 text-[#C89B3C]" />
            {rentalLocations.map((c) => <span key={c}>{c}</span>)}
            <span className="text-[#C89B3C] font-semibold">+ Pan-India</span>
          </div>
        </div>
      </section>

    </div>
  );
};
