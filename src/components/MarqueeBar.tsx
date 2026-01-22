import React, { useState, useEffect } from 'react';
import { Languages, Menu } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { smoothScrollTo } from '../utils/smoothScroll';

const MarqueeBar = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 40;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      smoothScrollTo(offsetPosition, 800);
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed md:top-0 bottom-0 md:bottom-auto left-0 right-0 z-50 pointer-events-none">
        <div className={`max-w-[1000px] mx-auto transition-colors duration-300 ${scrolled ? 'bg-[#001a03]/95 shadow-lg' : 'bg-[#001a03]'} md:shadow-none pointer-events-auto`}>
          <div className="flex items-center justify-center md:justify-center h-0 md:h-10 px-6 md:px-0 relative">
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-white hover:text-[#1fea00] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed md:top-0 bottom-0 md:bottom-auto left-0 md:left-1/2 md:-translate-x-1/2 z-50 w-full md:w-full md:max-w-[1000px] pointer-events-none" style={{ direction: 'ltr' }}>
        <div className="flex md:justify-end justify-between relative px-0">
          <div className="md:hidden relative group pointer-events-auto">
            <button
              className="flex items-center gap-2 bg-[#001a03] text-white/90 hover:text-[#1fea00] transition-colors px-4 h-14 rounded-tr-lg"
              aria-label="Navigation menu"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <Menu size={18} />
            </button>

            <div className={`absolute left-0 bottom-full bg-[#001a03] border border-[#1c6000]/30 rounded-tl-lg shadow-lg transition-all duration-200 ${isNavOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-[#1c6000]/20 transition-colors whitespace-nowrap text-white/90 hover:text-[#1fea00]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative group pointer-events-auto">
            <button
              className="flex items-center gap-2 bg-[#001a03] text-white/90 hover:text-[#1fea00] transition-colors px-4 h-14 md:h-10 md:rounded-none rounded-tl-lg"
              aria-label="Change language"
            >
              <Languages size={18} />
            </button>

            <div className="absolute right-0 md:top-full bottom-full md:bottom-auto bg-[#001a03] border border-[#1c6000]/30 md:rounded-bl-lg rounded-tl-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <button
                onClick={() => setLanguage('ar')}
                className={`block w-full text-center px-4 py-2 text-sm hover:bg-[#1c6000]/20 transition-colors whitespace-nowrap ${
                  language === 'ar' ? 'text-[#1fea00]' : 'text-white/90'
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`block w-full text-center px-4 py-2 text-sm hover:bg-[#1c6000]/20 transition-colors whitespace-nowrap ${
                  language === 'en' ? 'text-[#1fea00]' : 'text-white/90'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarqueeBar;
