import React, { useState, useEffect } from 'react';
import { Languages, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { smoothScrollTo } from '../utils/smoothScroll';

const MarqueeBar = () => {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
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
    { href: '#experience', label: 'Experience' },
    { href: '#education', label: 'Education' },
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
      setIsOpen(false);
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-black/95 shadow-lg' : 'bg-black'}`}>
        <div className="flex items-center justify-between md:justify-center h-10 px-6 md:px-0 relative">
          <button
            className={`md:hidden text-white`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

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
      </nav>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[1000px] pointer-events-none" style={{ direction: 'ltr' }}>
        <div className="flex justify-end relative">
          <div className="relative group pointer-events-auto">
            <button
              className="flex items-center gap-2 bg-black text-white/90 hover:text-[#1fea00] transition-colors px-4 h-10"
              aria-label="Change language"
            >
              <Languages size={18} />
            </button>

            <div className="absolute right-0 top-full bg-black border border-[#1c6000]/30 rounded-bl-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 md:hidden z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="fixed top-10 left-0 h-full w-3/4 max-w-[300px] bg-black transform translate-x-0 transition-transform duration-300 md:hidden z-40"
            onClick={handleMenuClick}
          >
            <div className="flex flex-col pt-20 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-white py-4 border-b border-[#1c6000] hover:text-[#1fea00] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MarqueeBar;
