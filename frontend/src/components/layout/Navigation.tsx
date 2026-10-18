import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { MegaMenu } from './MegaMenu';
import type { MegaMenuType } from './MegaMenu';

export const Navigation: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MegaMenuType>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = (menu: MegaMenuType) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleItemClick = (menu: MegaMenuType, defaultPath: string) => {
    if (activeMenu === menu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
    if (defaultPath) {
      navigate(defaultPath);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeMenu) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeMenu]);

  const isPathActive = (path: string) => {
    if (path === '/shop') return location.pathname === '/shop' && !location.search;
    return location.pathname + location.search === path;
  };

  const navItems = [
    { id: 'jewellery', label: 'All Jewellery', path: '/shop' },
    { id: 'bridal', label: 'Bridal', path: '/shop?category=Bridal' },
    { id: 'temple', label: 'Temple', path: '/shop?category=Temple' },
    { id: 'bracelets', label: 'Bracelets', path: '/shop?category=Bracelets' },
    { id: 'rent', label: 'Product Info', path: '/rent-info' },
    { id: 'about', label: 'ABOUT US', path: '/about', isDirect: true },
    { id: 'faqs', label: 'FAQS', path: '/faqs', isDirect: true },
  ];

  return (
    <nav
      ref={navRef}
      role="navigation"
      aria-label="Kuveras Main Navigation"
      className="hidden lg:block bg-[#FFFDF8] border-b border-[#E8E1D8] relative z-30 font-sans text-[12px] xl:text-[13px] tracking-[0.14em] uppercase font-medium text-[#2B2723]"
    >
      <div className="max-w-[1340px] mx-auto px-6 h-[48px] flex items-center justify-center">
        <ul className="flex items-center gap-6 xl:gap-9 h-full">
          {navItems.map((item) => {
            const isActive = isPathActive(item.path) || activeMenu === (item.id as MegaMenuType);

            if (item.isDirect) {
              return (
                <li key={item.id} className="h-full flex items-center shrink-0">
                  <Link
                    to={item.path}
                    className={`group relative h-full flex items-center gap-1 transition-colors duration-180 cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-[#0B5D3B] font-semibold' : 'text-[#2B2723] hover:text-[#C89B3C]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Animated Underline */}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B3C] transition-transform duration-250 ease-out origin-left ${
                        isActive ? 'scale-x-100 bg-[#0B5D3B]' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={item.id}
                className="relative h-full flex items-center shrink-0"
                onMouseEnter={() => handleMouseEnter(item.id as MegaMenuType)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  aria-expanded={activeMenu === item.id}
                  aria-haspopup="true"
                  onClick={() => handleItemClick(item.id as MegaMenuType, item.path)}
                  className={`group relative h-full flex items-center gap-1 transition-colors duration-180 cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#0B5D3B] font-semibold' : 'text-[#2B2723] hover:text-[#C89B3C]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Animated Underline */}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#C89B3C] transition-transform duration-250 ease-out origin-left ${
                      isActive ? 'scale-x-100 bg-[#0B5D3B]' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mega Menu Dropdown */}
      <MegaMenu
        menuType={activeMenu}
        onClose={() => setActiveMenu(null)}
        onMouseEnter={() => {
          if (leaveTimerRef.current) {
            clearTimeout(leaveTimerRef.current);
            leaveTimerRef.current = null;
          }
        }}
        onMouseLeave={handleMouseLeave}
      />
    </nav>
  );
};
