import { useState, useEffect, useCallback } from 'react';

interface CachedData {
  hero: any;
  translations: any;
  projects: any;
  experience: any;
  education: any;
  skills: any;
}

const dataCache: Record<string, CachedData> = {};

export const usePortfolioData = (language: string) => {
  const [data, setData] = useState<CachedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (dataCache[language]) {
      setData(dataCache[language]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [heroRes, transData, projData, expData, eduData, skillsData] = await Promise.all([
        fetch('/data/hero.json').then(res => res.json()),
        fetch('/data/translations.json').then(res => res.json()),
        fetch('/data/projects.json').then(res => res.json()),
        fetch('/data/experience.json').then(res => res.json()),
        fetch('/data/education.json').then(res => res.json()),
        fetch('/data/skills.json').then(res => res.json())
      ]);

      const cachedData: CachedData = {
        hero: heroRes[language],
        translations: transData[language],
        projects: projData[language],
        experience: expData[language],
        education: eduData[language],
        skills: skillsData[language]
      };

      dataCache[language] = cachedData;
      setData(cachedData);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading portfolio data:', err);
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error };
};
