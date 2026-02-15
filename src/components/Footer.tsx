import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

interface FooterProps {
  translations: any;
  isRTL: boolean;
}

const Footer = ({ translations, isRTL }: FooterProps) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (target === '#top') {
      smoothScrollTo(0, 800);
    } else {
      const el = document.querySelector(target);
      if (el) {
        const navHeight = 40;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - navHeight;
        smoothScrollTo(pos, 800);
      }
    }
  };

  const quickLinks = [
    { href: '#top', label: translations.backToTop },
    { href: '#projects', label: translations.navProjects },
    { href: '#contact', label: translations.navContact },
  ];

  return (
    <footer className="bg-black py-12 mt-12" style={{ direction: isRTL ? 'rtl' : 'ltr' }} role="contentinfo">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{translations.contact}</h2>
            <address className="space-y-3 not-italic">
              <button
                onClick={() => copyToClipboard('ziyad.ahmedalawami@gmail.com', 'email')}
                className="flex items-center text-white/60 hover:text-[#1fea00] transition-all duration-300 group relative text-sm"
                aria-label="Copy email address to clipboard"
              >
                <Mail size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform`} />
                <span dir="ltr">ziyad.ahmedalawami@gmail.com</span>
                {copiedEmail && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1fea00] text-black px-3 py-1 rounded text-xs font-medium whitespace-nowrap" role="status">
                    Copied!
                  </span>
                )}
              </button>
              <button
                onClick={() => copyToClipboard('+201015754619', 'phone')}
                className="flex items-center text-white/60 hover:text-[#1fea00] transition-all duration-300 group relative text-sm"
                aria-label="Copy phone number to clipboard"
              >
                <Phone size={16} className={`${isRTL ? 'ml-2' : 'mr-2'} group-hover:scale-110 transition-transform`} />
                <span dir="ltr">+20 1015754619</span>
                {copiedPhone && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1fea00] text-black px-3 py-1 rounded text-xs font-medium whitespace-nowrap" role="status">
                    Copied!
                  </span>
                )}
              </button>
            </address>
          </section>

          <nav aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{translations.quickLinks}</h2>
            <ul className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-white/60 hover:text-[#1fea00] transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-social-heading">
            <h2 id="footer-social-heading" className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{translations.connect}</h2>
            <nav aria-label="Social media links">
              <ul className="flex gap-4" style={{ flexDirection: 'row' }}>
                {[
                  { icon: <Github size={20} />, href: 'https://github.com/ziyadalawami', label: 'GitHub' },
                  { icon: <Linkedin size={20} />, href: 'https://linkedin.com/in/ziyadalawami/', label: 'LinkedIn' },
                  { icon: <Mail size={20} />, href: 'mailto:ziyad.ahmedalawami@gmail.com', label: 'Email' }
                ].map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.href}
                      target={social.label !== 'Email' ? '_blank' : undefined}
                      rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                      className="text-white/40 hover:text-[#1fea00] transition-all duration-300 hover:scale-110 inline-block"
                      aria-label={social.label}
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-white/30 text-center text-sm">
            {new Date().getFullYear()} Ziyad Ahmed. {translations.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
