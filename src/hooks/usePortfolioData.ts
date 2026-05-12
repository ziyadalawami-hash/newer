import heroData from '../data/hero.json';
import translationsData from '../data/translations.json';
import projectsData from '../data/projects.json';

type Language = 'en' | 'ar';

interface PortfolioData {
  hero: (typeof heroData)['en'];
  translations: (typeof translationsData)['en'];
  projects: (typeof projectsData)['en'];
}

export const usePortfolioData = (language: Language): PortfolioData => {
  return {
    hero: heroData[language],
    translations: translationsData[language],
    projects: projectsData[language],
  };
};
