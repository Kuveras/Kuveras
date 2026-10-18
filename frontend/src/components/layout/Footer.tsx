import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext';
import { KuverasLogo } from '../common/KuverasLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const { showToast } = useUI();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    if (!agreed) {
      showToast('Please agree to the terms and conditions');
      return;
    }
    showToast('Thank you for subscribing to Kuveras!');
    setEmail('');
    setAgreed(false);
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Jost:wght@300;400;500&display=swap');
      `}</style>

      <footer className="kv-footer">
        <div className="kv-footer-inner">
          {/* ── Column 1: Brand + QR ── */}
          <div className="kv-footer-col kv-footer-brand">
            {/* Logo Emblem */}
            <div className="kv-brand-logo-area">
              <KuverasLogo variant="emerald" className="w-36 sm:w-44 !items-start" />
            </div>
            <p className="kv-brand-tagline">
              Handcrafted Indian jewellery — jewels<br />
              of prosperity, love &amp; blessings.
            </p>

            {/* QR Code */}
            <div className="kv-qr-section">
              <img src="/qr-code.png" alt="Scan to explore" className="kv-qr-img" />
              <p className="kv-qr-caption">Scan to explore the full collection</p>
            </div>

            {/* CTA Buttons */}
            <div className="kv-cta-buttons">
              <a href="https://wa.me/919910204680" target="_blank" rel="noopener noreferrer" className="kv-cta-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.95 1.34-.5.04-.99.22-3.35-.7-2.83-1.12-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.96-2.31.24-.28.53-.35.71-.35.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.56.8 1.94.87 2.08.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.26.13.44.2.5.31.06.11.06.64-.18 1.32Z"></path></svg>
                <span>Order or rent via<br /><strong>WhatsApp</strong></span>
              </a>
              <Link to="/shop" className="kv-cta-btn">
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"></path></svg>
                <span>Browse the<br /><strong>Full Collection</strong></span>
              </Link>
            </div>
          </div>

          {/* ── Column 2: Collections ── */}
          <div className="kv-footer-col kv-collections">
            <h3 className="kv-heading">Collections</h3>
            <ul className="kv-clist">
              <li><Link to="/shop">All Jewellery</Link></li>
              <li><Link to="/shop?category=Bridal">Bridal &amp; Wedding</Link></li>
              <li><Link to="/shop?category=Kundan">Kundan Jewellery</Link></li>
              <li><Link to="/shop?category=Temple">Temple Jewellery</Link></li>
              <li><Link to="/shop?category=Cubic+Zirconia">Cubic Zirconia (CZ)</Link></li>
              <li><Link to="/shop?category=Bracelets">Bracelets</Link></li>
            </ul>
            <Link className="kv-viewall" to="/shop">
              View all jewellery
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </Link>
          </div>

          {/* ── Column 3: Information ── */}
          <div className="kv-footer-col kv-information">
            <h3 className="kv-heading">Information</h3>
            <ul className="kv-clist">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/rent-info">Rent Information</Link></li>
              <li><Link to="/faqs">Help &amp; FAQs</Link></li>
              <li><Link to="/cart">Track Your Order</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/faqs">My Account</Link></li>
            </ul>
            <Link className="kv-viewall" to="/faqs">
              Visit help centre
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6"></path></svg>
            </Link>
          </div>

          {/* ── Column 4: Contact Us ── */}
          <div className="kv-footer-col kv-contact">
            <h3 className="kv-heading">Contact Us</h3>

            <a className="kv-crow" href="tel:+919910204680">
              <span className="kv-crow-ic">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1L6.6 10.8Z"></path></svg>
              </span>
              <span className="kv-crow-tx">
                <small>CALL US</small>
                <b>+91 99102 04680</b>
              </span>
            </a>

            <a className="kv-crow" href="https://wa.me/919910204680" target="_blank" rel="noopener noreferrer">
              <span className="kv-crow-ic">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.1c-.24.68-1.42 1.3-1.95 1.34-.5.04-.99.22-3.35-.7-2.83-1.12-4.6-4-4.74-4.19-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.96-2.31.24-.28.53-.35.71-.35.18 0 .35 0 .51.01.16.01.38-.06.6.46.24.56.8 1.94.87 2.08.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.3.36-.42.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.6-.14.24.09 1.55.73 1.81.86.26.13.44.2.5.31.06.11.06.64-.18 1.32Z"></path></svg>
              </span>
              <span className="kv-crow-tx">
                <small>CHAT ON WHATSAPP</small>
                <b>+91 99102 04680</b>
              </span>
            </a>

            <a className="kv-crow" href="mailto:Kuverasoverseas@gmail.com">
              <span className="kv-crow-ic">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.01L12 11l8-4.99V6H4Zm16 2.24-7.47 4.66a1 1 0 0 1-1.06 0L4 8.24V18h16V8.24Z"></path></svg>
              </span>
              <span className="kv-crow-tx">
                <small>EMAIL US</small>
                <b className="kv-mail">Kuverasoverseas@gmail.com</b>
              </span>
            </a>

            <a
              className="kv-follow"
              href="https://www.instagram.com/kuverasjewellery"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.59 0-4.85-.07c-1.17-.05-1.8-.25-2.22-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.17-.42-.37-1.05-.42-2.22C2.21 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.05-.37 2.22-.42C8.41 2.21 8.8 2.2 12 2.2Zm0 4.86A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.94Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.13-1.14a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z"></path></svg>
              Follow @kuverasjewellery
            </a>
          </div>

          {/* ── Column 5: Sign Up for Email ── */}
          <div className="kv-footer-col kv-signup">
            <h3 className="kv-heading">Sign Up for Email</h3>
            <form onSubmit={handleSubscribe} className="kv-signup-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kuverasoverseas@gmail.com"
                className="kv-signup-input"
                required
              />
              <label className="kv-signup-check">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>I agree to receive emails and accept the terms and conditions.</span>
              </label>
              <button type="submit" className="kv-signup-btn">
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom copyright bar ── */}
        <div className="kv-footer-bottom">
          <p>™ {new Date().getFullYear()} Kuveras Fine Jewellery. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        /* ===========================
           KUVERAS FOOTER – EXACT MATCH
           =========================== */
        .kv-footer {
          font-family: 'Jost', -apple-system, 'Segoe UI', sans-serif;
          font-weight: 300;
          line-height: 1.6;
          background: linear-gradient(180deg, #0a5e38 0%, #06452f 40%, #053d28 100%);
          color: #f6efe4;
          padding: 56px 0 0;
        }

        .kv-footer-inner {
          max-width: 1260px;
          margin: 0 auto;
          padding: 0 32px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.2fr 1.2fr;
          gap: 36px;
        }

        /* ── Generic Column ── */
        .kv-footer-col {
          min-width: 0;
        }

        /* ── HEADING (Playfair) ── */
        .kv-footer .kv-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 1.5rem;
          color: #f6efe4;
          margin: 0 0 22px;
          letter-spacing: 0.2px;
        }

        /* ── BRAND COLUMN ── */
        .kv-brand-logo-area {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        .kv-brand-emblem {
          width: 48px;
          height: 48px;
          margin-bottom: 6px;
          filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));
        }
        .kv-brand-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 2rem;
          color: #e7c982;
          letter-spacing: 0.25em;
          margin: 0;
          line-height: 1.1;
        }
        .kv-brand-tagline {
          font-size: 0.88rem;
          color: #cbddcb;
          margin: 0 0 20px;
          font-style: italic;
          line-height: 1.5;
          font-weight: 300;
        }

        /* QR Code */
        .kv-qr-section {
          margin-bottom: 18px;
        }
        .kv-qr-img {
          width: 130px;
          height: 130px;
          border-radius: 10px;
          border: 3px solid rgba(230,201,135,0.25);
          object-fit: cover;
          display: block;
          margin-bottom: 8px;
        }
        .kv-qr-caption {
          font-size: 0.78rem;
          color: #a9c6ac;
          margin: 0;
          font-style: italic;
        }

        /* CTA Buttons */
        .kv-cta-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .kv-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(230,201,135,0.2);
          color: #f6efe4;
          text-decoration: none;
          font-size: 0.82rem;
          line-height: 1.3;
          transition: background 0.22s ease, border-color 0.22s ease;
          width: fit-content;
        }
        .kv-cta-btn:hover {
          background: rgba(230,201,135,0.15);
          border-color: rgba(230,201,135,0.5);
        }
        .kv-cta-btn strong {
          font-weight: 600;
          font-family: 'Playfair Display', Georgia, serif;
        }
        .kv-cta-btn svg {
          color: #e6c987;
          flex: 0 0 auto;
        }

        /* ── COLLECTIONS & INFORMATION COLUMNS ── */
        .kv-collections .kv-clist,
        .kv-information .kv-clist {
          list-style: none;
          margin: 0 0 20px;
          padding: 0;
        }
        .kv-collections .kv-clist li,
        .kv-information .kv-clist li {
          margin: 0 0 13px;
        }
        .kv-collections .kv-clist a,
        .kv-information .kv-clist a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #cbddcb;
          font-size: 1.02rem;
          line-height: 1.3;
          text-decoration: none;
          transition: color 0.22s ease, transform 0.22s ease;
        }
        .kv-collections .kv-clist a::before,
        .kv-information .kv-clist a::before {
          content: "";
          width: 7px;
          height: 7px;
          flex: 0 0 auto;
          border-right: 2px solid #d9bc7a;
          border-top: 2px solid #d9bc7a;
          transform: rotate(45deg);
          transition: transform 0.22s ease, border-color 0.22s ease;
        }
        .kv-collections .kv-clist a:hover,
        .kv-information .kv-clist a:hover {
          color: #f6efe4;
          transform: translateX(4px);
        }
        .kv-collections .kv-clist a:hover::before,
        .kv-information .kv-clist a:hover::before {
          border-color: #f6efe4;
          transform: rotate(45deg) scale(1.15);
        }

        /* "View all" link */
        .kv-viewall {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #d9bc7a;
          font-size: 1.02rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          font-family: 'Playfair Display', Georgia, serif;
          text-decoration: none;
          transition: gap 0.22s ease, color 0.22s ease;
        }
        .kv-viewall:hover {
          color: #f6efe4;
          gap: 12px;
        }
        .kv-viewall:focus-visible {
          outline: 2px solid #d9bc7a;
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ── CONTACT COLUMN ── */
        .kv-crow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
          text-decoration: none;
          color: inherit;
        }
        .kv-crow-ic {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          color: #e6c987;
          border: 1px solid rgba(230,201,135,0.35);
          transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease;
        }
        .kv-crow-tx {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .kv-crow-tx small {
          font-size: 0.7rem;
          letter-spacing: 0.6px;
          text-transform: uppercase;
          color: #a9c6ac;
        }
        .kv-crow-tx b {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 1.18rem;
          color: #f6efe4;
          transition: color 0.22s ease;
        }
        .kv-crow-tx b.kv-mail {
          font-size: 1rem;
          word-break: break-all;
          line-height: 1.35;
        }
        .kv-crow:hover .kv-crow-ic {
          background: #e6c987;
          color: #0d6b34;
          border-color: #e6c987;
        }
        .kv-crow:hover .kv-crow-tx b {
          color: #e6c987;
        }

        /* Follow Link */
        .kv-follow {
          margin-top: 6px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #eaf3ea;
          text-decoration: none;
          font-size: 0.98rem;
          transition: color 0.22s ease;
        }
        .kv-follow svg {
          color: #e6c987;
        }
        .kv-follow:hover {
          color: #ffffff;
        }
        .kv-contact a:focus-visible {
          outline: 2px solid #e6c987;
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ── SIGN UP COLUMN ── */
        .kv-signup-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .kv-signup-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid rgba(230,201,135,0.3);
          border-radius: 4px;
          background: rgba(255,255,255,0.07);
          color: #f6efe4;
          font-family: 'Jost', sans-serif;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.22s ease, background 0.22s ease;
          box-sizing: border-box;
        }
        .kv-signup-input::placeholder {
          color: rgba(246,239,228,0.5);
        }
        .kv-signup-input:focus {
          border-color: #e6c987;
          background: rgba(255,255,255,0.1);
        }
        .kv-signup-check {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          cursor: pointer;
          font-size: 0.82rem;
          color: #cbddcb;
          line-height: 1.4;
        }
        .kv-signup-check input[type="checkbox"] {
          margin-top: 2px;
          accent-color: #e6c987;
          cursor: pointer;
          flex: 0 0 auto;
          width: 16px;
          height: 16px;
        }
        .kv-signup-btn {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 4px;
          background: #e6c987;
          color: #06452f;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: background 0.22s ease, transform 0.15s ease;
        }
        .kv-signup-btn:hover {
          background: #f6efe4;
          transform: translateY(-1px);
        }
        .kv-signup-btn:active {
          transform: translateY(0);
        }

        /* ── BOTTOM BAR ── */
        .kv-footer-bottom {
          margin-top: 48px;
          padding: 20px 32px;
          border-top: 1px solid rgba(255,255,255,0.1);
          text-align: center;
          font-size: 0.8rem;
          color: #a9c6ac;
        }
        .kv-footer-bottom p {
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .kv-footer-inner {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 40px 32px;
          }
          .kv-footer-brand {
            grid-column: 1 / -1;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0 32px;
          }
          .kv-brand-logo-area {
            grid-row: 1 / 3;
          }
          .kv-qr-section {
            grid-row: 3 / 4;
          }
          .kv-cta-buttons {
            flex-direction: row;
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 768px) {
          .kv-footer {
            padding: 40px 0 0;
          }
          .kv-footer-inner {
            grid-template-columns: 1fr 1fr;
            gap: 36px 24px;
            padding: 0 20px;
          }
          .kv-footer-brand {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
          .kv-brand-logo-area {
            align-items: center;
          }
          .kv-brand-tagline {
            text-align: center;
          }
          .kv-qr-section {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .kv-cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          .kv-signup {
            grid-column: 1 / -1;
          }
          .kv-footer-bottom {
            padding: 16px 20px;
          }
        }

        @media (max-width: 480px) {
          .kv-footer-inner {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 0 16px;
          }
          .kv-footer-brand {
            grid-column: 1;
          }
          .kv-signup {
            grid-column: 1;
          }
          .kv-heading {
            font-size: 1.3rem !important;
          }
        }
      `}</style>
    </>
  );
};
