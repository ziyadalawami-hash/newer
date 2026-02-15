import React, { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { smoothScrollTo } from '../utils/smoothScroll';

const MarqueeBar = () => {
  const { language, setLanguage } = useLanguage();
  const { translations } = usePortfolioData(language);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['contact', 'projects', 'hero'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Ziyad', isName: true },
    { href: '#projects', label: translations.navProjects, isName: false },
    { href: '#contact', label: translations.navContact, isName: false },
  ];

  const getSectionId = (href: string) => href.replace('#', '');

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 40;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      smoothScrollTo(offsetPosition, 800);
    }
  };

  return (
    <>
      <nav className={`fixed md:top-0 bottom-0 md:bottom-auto left-0 right-0 z-40 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-black'}`}>
        <div className="flex items-center justify-center md:justify-center h-14 md:h-10 px-6 md:px-0 relative">
          <div className="flex md:hidden items-center justify-around w-full max-w-md pr-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative text-sm transition-colors duration-300 ${
                  link.isName
                    ? 'font-bold tracking-wider text-white'
                    : activeSection === getSectionId(link.href)
                      ? 'text-[#1fea00]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {!link.isName && activeSection === getSectionId(link.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#1fea00] rounded-full" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative py-1 text-sm transition-colors duration-300 ${
                  link.isName
                    ? 'font-bold tracking-wider text-white'
                    : activeSection === getSectionId(link.href)
                      ? 'text-[#1fea00]'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {!link.isName && activeSection === getSectionId(link.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1fea00] rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="fixed md:top-0 bottom-0 md:bottom-auto left-1/2 -translate-x-1/2 z-50 w-full max-w-[1000px] pointer-events-none" style={{ direction: 'ltr' }}>
        <div className="flex justify-end relative">
          <div className="relative group pointer-events-auto">
            <button
              className="flex items-center gap-2 bg-black/90 backdrop-blur-md text-white/90 hover:text-[#1fea00] transition-colors px-4 h-14 md:h-10"
              aria-label="Change language"
            >
              <Languages size={18} />
            </button>

            <div className="absolute right-0 md:top-full bottom-full md:bottom-auto bg-black/95 backdrop-blur-md border border-[#1c6000]/30 md:rounded-bl-lg rounded-tl-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
