import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { smoothScrollTo } from '../utils/smoothScroll';

interface HeaderProps {
  data: any;
  isRTL: boolean;
}

const Header = ({ data, isRTL }: HeaderProps) => {
  const t = data;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = {
    github: "https://github.com/ziyadalawami",
    linkedin: "https://linkedin.com/in/ziyadalawami/",
    email: "mailto:ziyad.ahmedalawami@gmail.com"
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      smoothScrollTo(elementPosition, 800);
    }
  };

  const socials = [
    { href: socialLinks.github, icon: Github, label: 'GitHub', external: true },
    { href: socialLinks.linkedin, icon: Linkedin, label: 'LinkedIn', external: true },
    { href: socialLinks.email, icon: Mail, label: 'Email', external: false },
  ];

  return (
    <header className="relative bg-[#001a03] w-full overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1fea00]/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-[1000px] mx-auto bg-transparent px-6 py-12 md:py-16" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="text-center">
          <div
            className={`mb-8 flex justify-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="relative">
              <img
                src="https://lh3.googleusercontent.com/d/1jmA4GNeavRwdMKSmq33YSGlNSBVFs5en"
                alt="Ziyad Ahmed"
                draggable={false}
                loading="eager"
                fetchPriority="high"
                width="128"
                height="128"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-[#1c6000]/40 shadow-lg shadow-black/30 transition-all duration-500 hover:border-[#27a102]/60 hover:shadow-[#1fea00]/10 hover:shadow-xl"
              />
              <div className="absolute -inset-1 rounded-full bg-[#1fea00]/10 blur-md -z-10" />
            </div>
          </div>

          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.name}
          </h1>

          <h2
            className={`text-base md:text-lg text-[#1fea00] font-mono font-medium mb-8 tracking-wide transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.title}
          </h2>

          <p
            className={`text-sm md:text-base text-white/70 max-w-lg mx-auto leading-relaxed mb-8 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {t.description}
          </p>

          <div
            className={`flex justify-center gap-5 mb-8 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                className="text-white/50 hover:text-[#1fea00] transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                aria-label={s.label}
                title={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>

          <div
            className={`flex justify-center items-center gap-4 mb-10 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <a
              href="/assets/ziyad_ahmed_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#27a102] text-white text-sm rounded-lg hover:bg-[#1fea00] hover:text-black transition-all duration-300 font-medium shadow-md shadow-[#27a102]/20 hover:shadow-lg hover:shadow-[#1fea00]/20 hover:-translate-y-0.5"
              aria-label="View CV"
            >
              <FileText size={16} />
              <span>{t.viewCV}</span>
            </a>
          </div>

          <button
            onClick={scrollToProjects}
            className={`mx-auto flex items-center gap-2 text-white/40 hover:text-[#1fea00] transition-all duration-500 group ${mounted ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Scroll to projects"
          >
            <span className="text-xs font-medium">{t.exploreWork}</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
