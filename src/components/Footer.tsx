import { useState, type MouseEvent } from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { smoothScrollTo } from '../smoothScroll';

interface FooterProps {
  translations: Record<string, string>;
  isRTL: boolean;
}

const Footer = ({ translations: t, isRTL }: FooterProps) => {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    smoothScrollTo(0, 800);
  };

  return (
    <footer className="bg-black py-12 mt-12" style={{ direction: isRTL ? 'rtl' : 'ltr' }} role="contentinfo">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <section aria-labelledby="footer-contact-heading">
            <h2 id="footer-contact-heading" className="text-white font-semibold text-lg mb-4">{t.contact}</h2>
            <address className="space-y-3 not-italic">
              {[
                { value: 'ziyad.ahmedalawami@gmail.com', display: 'ziyad.ahmedalawami@gmail.com', icon: Mail, type: 'email' as const },
                { value: '+201015754619', display: '+20 1015754619', icon: Phone, type: 'phone' as const },
              ].map(({ value, display, icon: Icon, type }) => (
                <button
                  key={type}
                  onClick={() => copyToClipboard(value, type)}
                  className="flex items-center text-white/80 hover:text-[#1fea00] transition-all duration-300 group relative"
                  aria-label={`Copy ${type} to clipboard`}
                >
                  <Icon size={20} className="mr-2 group-hover:scale-110 transition-transform" />
                  <span dir="ltr">{display}</span>
                  {copied === type && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1fea00] text-black px-3 py-1 rounded text-sm font-medium whitespace-nowrap" role="status">
                      Copied!
                    </span>
                  )}
                </button>
              ))}
            </address>
          </section>

          <nav aria-labelledby="footer-links-heading">
            <h2 id="footer-links-heading" className="text-white font-semibold text-lg mb-4">{t.quickLinks}</h2>
            <ul className="flex flex-col space-y-2">
              <li>
                <a
                  href="#top"
                  onClick={scrollToTop}
                  className="text-white/80 hover:text-[#1fea00] transition-all duration-300 hover:translate-x-1 block"
                >
                  {t.backToTop}
                </a>
              </li>
            </ul>
          </nav>

          <section aria-labelledby="footer-social-heading">
            <h2 id="footer-social-heading" className="text-white font-semibold text-lg mb-4">{t.connect}</h2>
            <ul className="flex gap-4">
              {[
                { icon: Github, href: 'https://github.com/ziyadalawami', label: 'GitHub' },
                { icon: Linkedin, href: 'https://linkedin.com/in/ziyadalawami/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:ziyad.ahmedalawami@gmail.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[#27a102] hover:text-[#1fea00] transition-all duration-300 hover:scale-110 inline-block"
                    aria-label={label}
                    title={label}
                  >
                    <Icon size={24} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#1c6000]">
          <p className="text-white/60 text-center">
            © {new Date().getFullYear()} Ziyad Ahmed. {t.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
