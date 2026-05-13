import { type MouseEvent } from 'react';
import { Github, Linkedin, Mail, ArrowDown, FileText } from 'lucide-react';
import { smoothScrollTo } from '../smoothScroll';

interface HeroProps {
  data: Record<string, string>;
  isRTL: boolean;
}

const Hero = ({ data, isRTL }: HeroProps) => {
  const scrollToProjects = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('projects');
    if (el) {
      smoothScrollTo(el.getBoundingClientRect().top + window.pageYOffset - 40, 800);
    }
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ziyadalawami', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/ziyadalawami/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ziyad.ahmedalawami@gmail.com', label: 'Email' },
  ];

  return (
    <header className="bg-[#001a03] w-full">
      <div className="max-w-[1000px] mx-auto px-6 py-8 md:py-12" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/d/1jmA4GNeavRwdMKSmq33YSGlNSBVFs5en"
              alt="Ziyad Ahmed"
              draggable={false}
              loading="eager"
              width="128"
              height="128"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#1c6000]/30 shadow-lg transition-all duration-300 hover:border-[#27a102]/50 hover:shadow-xl"
            />
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{data.name}</h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-[#1fea00] font-medium mb-6">{data.title}</h2>

          {/* Desktop layout */}
          <div className="hidden md:flex md:flex-row-reverse md:gap-6 lg:gap-8 max-w-2xl mx-auto mb-8 items-start">
            <p className={`flex-1 text-base text-white/80 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {data.description}
            </p>
            <div className="w-px bg-[#27a102]/10 self-stretch" />
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[#27a102] hover:text-[#1fea00] transition-all duration-300 hover:scale-110"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden mb-8">
            <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed mb-5">{data.description}</p>
            <div className="flex justify-center gap-5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="text-[#27a102] hover:text-[#1fea00] transition-all duration-300 hover:scale-110"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <a
              href="/assets/ziyad_ahmed_cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#27a102] text-white text-sm rounded hover:bg-[#1fea00] hover:text-black transition-all duration-300 font-medium shadow-md hover:shadow-lg"
            >
              <FileText size={16} />
              <span>{data.viewCV}</span>
            </a>
          </div>

          <button
            onClick={scrollToProjects}
            className="mx-auto flex items-center gap-2 text-[#27a102] hover:text-[#1fea00] transition-all duration-300"
            aria-label="Scroll to projects"
          >
            <span className="text-xs md:text-sm font-medium">{data.exploreWork}</span>
            <ArrowDown size={16} className="animate-bounce" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
