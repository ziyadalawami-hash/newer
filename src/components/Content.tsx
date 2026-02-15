import { useState } from 'react';
import { GitBranch, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import Hero from './Hero';
import Footer from './Footer';
import Contact from './Contact';

const ProjectCard = ({ project, index, isRTL, isOpen, onToggle }: {
  project: any;
  index: number;
  isRTL: boolean;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <article
      ref={ref}
      className={`relative h-96 rounded-xl overflow-hidden group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ direction: isRTL ? 'rtl' : 'ltr', transitionDelay: `${index * 100}ms` }}
    >
      <div
        className="absolute inset-0 flex flex-col cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        onClick={() => !isOpen && onToggle()}
      >
        <div className="flex-[3] border border-[#1c6000]/30 group-hover:border-[#27a102]/40 overflow-hidden transition-all duration-300">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="w-full h-full object-cover aspect-[4/3] transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="flex-[1] bg-white p-4 flex flex-col justify-start gap-2">
          <h2 className="text-base font-bold text-gray-800 truncate">
            {project.title}
          </h2>
          <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-auto h-6 overflow-hidden">
            {project.categories.map((cat: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-medium bg-[#27a102]/10 text-[#27a102] rounded border border-[#27a102]/20 whitespace-nowrap"
              >
                {cat}
              </span>
            ))}
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-xl overflow-hidden bg-white flex flex-col pointer-events-none ${isOpen ? 'card-overlay-open' : 'card-overlay-closed'}`}
      >
        <div className={`absolute top-4 z-10 ${isRTL ? 'left-4' : 'right-4'} pointer-events-auto`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all text-lg"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 pt-5 pb-24 min-h-0 overflow-y-auto pointer-events-auto relative">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.categories.map((cat: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold bg-[#27a102]/10 text-[#27a102] rounded-md border border-[#27a102]/20"
                >
                  {cat}
                </span>
              ))}
              {project.tags.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-gray-700 leading-relaxed">
            {project.content ? parseContent(project.content, isRTL) : (
              <p className="text-gray-600 text-sm">{project.description}</p>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex gap-3 pointer-events-none bg-gradient-to-t from-white via-white to-transparent">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-[#1fea00] hover:text-black transition-all duration-200 text-sm font-semibold shadow-lg pointer-events-auto"
            >
              <GitBranch size={16} />
              <span>Repo</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#27a102] text-white rounded-lg hover:bg-[#1fea00] hover:text-black transition-all duration-200 text-sm font-semibold shadow-lg pointer-events-auto"
            >
              <ExternalLink size={16} />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const parseBoldText = (text: string): (string | JSX.Element)[] => {
  const parts: (string | JSX.Element)[] = [];
  let currentIndex = 0;
  let key = 0;
  const boldRegex = /\*\*(.*?)\*\*/g;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }
    parts.push(
      <strong key={key++} className="font-bold text-gray-900">{match[1]}</strong>
    );
    currentIndex = match.index + match[0].length;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : [text];
};

const parseContent = (content: string, isRTL: boolean) => {
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('*') && !line.startsWith('**')) {
      const text = line.substring(1).trim();
      elements.push(
        <li key={key++} className={`text-sm text-gray-700 ${isRTL ? 'mr-5' : 'ml-5'} list-disc leading-relaxed`}>
          {parseBoldText(text)}
        </li>
      );
    } else if (line.startsWith('**') && line.endsWith('**')) {
      const text = line.substring(2, line.length - 2);
      elements.push(
        <p key={key++} className="text-sm font-bold text-gray-900 mt-4 mb-2">{text}</p>
      );
    } else {
      elements.push(
        <p key={key++} className="text-sm text-gray-700 mb-2 leading-relaxed">{parseBoldText(line)}</p>
      );
    }
  }

  return elements;
};

const MainContent = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { language, isRTL } = useLanguage();
  const { hero: heroData, translations, projects: projectsList } = usePortfolioData(language);
  const t = translations;
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.05);

  const handleCardClick = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div>
      <div id="hero">
        <Hero data={{...heroData, ...translations}} isRTL={isRTL} />
      </div>

      <section
        id="projects"
        ref={sectionRef}
        className="py-12 bg-[#001a03]"
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
        aria-label="Projects Portfolio"
      >
        <div className="max-w-[1000px] mx-auto px-6">
          <div
            className={`mb-8 text-center transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <p className="text-white/40 text-sm">{t.clickDetails}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsList.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                isRTL={isRTL}
                isOpen={expandedProject === index}
                onToggle={() => handleCardClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <Contact translations={translations} isRTL={isRTL} />
      <Footer translations={translations} isRTL={isRTL} />
    </div>
  );
};

export default MainContent;
