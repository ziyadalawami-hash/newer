import React, { useState } from 'react';
import { GitBranch, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { usePortfolioData } from '../hooks/usePortfolioData';
import Hero from './Hero';
import Footer from './Footer';
import Contact from './Contact';

const MainContent = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const { language, isRTL } = useLanguage();
  const { data, loading } = usePortfolioData(language);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#000a01] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1fea00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { hero: heroData, translations, projects: projectsList } = data;
  const t = translations;

  const handleCardClick = (index: number) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  const isCardOpen = (index: number) => expandedProject === index;

  const parseContent = (content: string, isRTL: boolean) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) {
        continue;
      }

      if (line.startsWith('*') && !line.startsWith('**')) {
        const text = line.substring(1).trim();
        const parsedText = parseBoldText(text);
        elements.push(
          <li key={key++} className={`text-sm text-gray-600 ${isRTL ? 'mr-4' : 'ml-4'} list-disc`}>
            {parsedText}
          </li>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.substring(2, line.length - 2);
        elements.push(
          <p key={key++} className="text-sm font-semibold text-gray-700 mt-3 mb-2">
            {text}
          </p>
        );
      } else {
        const parsedText = parseBoldText(line);
        elements.push(
          <p key={key++} className="text-sm text-gray-600 mb-2">
            {parsedText}
          </p>
        );
      }
    }

    return elements;
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
        <strong key={key++} className="font-semibold text-gray-800">
          {match[1]}
        </strong>
      );
      currentIndex = match.index + match[0].length;
    }

    if (currentIndex < text.length) {
      parts.push(text.substring(currentIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  return (
    <div>
      <div id="hero">
        <Hero data={{...heroData, ...translations}} isRTL={isRTL} />
      </div>
      <section id="projects" className="py-12 bg-[#001a03]" style={{ direction: isRTL ? 'rtl' : 'ltr' }} aria-label="Projects Portfolio">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="space-y-12">
            <div>
              <div className="mb-8 text-center">
                <p className="text-white/60 text-sm">{t.clickDetails}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsList.map((project, index) => (
                  <article
                    key={index}
                    className="relative h-96 rounded-xl overflow-hidden transition-all duration-300 group"
                    style={{ direction: isRTL ? 'rtl' : 'ltr' }}
                  >
                    <div
                      className="absolute inset-0 flex flex-col cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                      onClick={() => !isCardOpen(index) && handleCardClick(index)}
                    >
                      <div className="flex-[3] border border-[#1c6000]/30 group-hover:border-[#27a102]/50 overflow-hidden transition-all duration-300">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          draggable="false"
                          className="w-full h-full object-cover aspect-[4/3]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      <div className="flex-[1] bg-white p-4 flex flex-col justify-start gap-2">
                        <h2 className="text-base font-bold text-gray-800 truncate">
                          {project.title}
                        </h2>
                        <p className="text-gray-600 text-xs line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-auto h-6 overflow-hidden">
                          {project.categories.map((cat, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-xs font-medium bg-[#27a102]/10 text-[#27a102] rounded border border-[#27a102]/20 whitespace-nowrap"
                            >
                              {cat}
                            </span>
                          ))}
                          {project.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded whitespace-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute inset-0 rounded-xl overflow-hidden bg-white flex flex-col pointer-events-none ${isCardOpen(index) ? 'card-overlay-open' : 'card-overlay-closed'}`}
                    >
                      <div className={`absolute top-4 z-10 ${isRTL ? 'left-4' : 'right-4'} pointer-events-auto`}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(index);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all text-lg font-semibold"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col p-6 pt-4 pb-20 min-h-0 overflow-y-auto pointer-events-auto relative z-10">
                        <div className="mb-3">
                          <h2 className="text-lg font-bold text-gray-800 mb-3">
                            {project.title}
                          </h2>
                          <div className="flex flex-wrap gap-1.5 mb-0.5">
                            {project.categories.map((cat, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs font-medium bg-[#27a102]/10 text-[#27a102] rounded border border-[#27a102]/20"
                              >
                                {cat}
                              </span>
                            ))}
                            {project.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1">
                          {project.content ? parseContent(project.content, isRTL) : (
                            <p className="text-gray-600 text-sm">{project.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 px-6 py-4 flex gap-3 bg-white/99 backdrop-blur-sm pointer-events-none z-20">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-[#1fea00] hover:text-black transition-all duration-200 text-sm font-semibold pointer-events-auto"
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
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#27a102] text-white rounded-lg hover:bg-[#1fea00] hover:text-black transition-all duration-200 text-sm font-semibold pointer-events-auto"
                          >
                            <ExternalLink size={16} />
                            <span>Demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Contact translations={translations} isRTL={isRTL} />
      <Footer translations={translations} isRTL={isRTL} />
    </div>
  );
};

export default MainContent;
