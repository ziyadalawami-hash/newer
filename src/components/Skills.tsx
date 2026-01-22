import React, { useState, useEffect } from 'react';

interface SkillsProps {
  skills: {
    AI: string[];
    Software: string[];
    Other: string[];
  };
  translations: any;
  isRTL: boolean;
}

const Skills = ({ skills, translations, isRTL }: SkillsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<'AI' | 'Software' | 'Other'>('AI');
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [selectedCategory]);

  const categories: Array<'AI' | 'Software' | 'Other'> = ['AI', 'Software', 'Other'];

  const getCurrentIndex = () => categories.indexOf(selectedCategory);

  const handleNext = () => {
    const currentIndex = getCurrentIndex();
    const nextIndex = (currentIndex + 1) % categories.length;
    setDirection('right');
    setSelectedCategory(categories[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = getCurrentIndex();
    const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
    setDirection('left');
    setSelectedCategory(categories[prevIndex]);
  };

  const handleCategoryClick = (category: 'AI' | 'Software' | 'Other') => {
    const currentIndex = getCurrentIndex();
    const newIndex = categories.indexOf(category);
    setDirection(newIndex > currentIndex ? 'right' : 'left');
    setSelectedCategory(category);
  };

  return (
    <div className="py-8">
      <h3 className="text-3xl font-bold text-white mb-6 text-center">
        {translations.skills}
      </h3>

      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-5 py-1.5 font-semibold transition-all duration-200 rounded-lg text-sm whitespace-nowrap ${
                selectedCategory === category
                  ? 'text-black bg-[#1fea00] shadow-lg'
                  : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {category === 'Other' ? translations.otherTools : category}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrev}
            className="text-[#27a102] hover:text-[#1fea00] transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Previous category"
          >
            {isRTL ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 5L11 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 5L7 9L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
          <button
            onClick={handleNext}
            className="text-[#27a102] hover:text-[#1fea00] transition-all duration-200 hover:scale-110 p-2 rounded-full bg-white/5 hover:bg-white/10"
            aria-label="Next category"
          >
            {isRTL ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M11 5L7 9L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 5L11 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden min-h-[120px] flex items-center">
        <div
          key={animationKey}
          className={`flex flex-wrap gap-1.5 justify-center w-full ${
            isRTL
              ? (direction === 'right' ? 'animate-fadeInSlideLeft' : 'animate-fadeInSlideRight')
              : (direction === 'right' ? 'animate-fadeInSlideRight' : 'animate-fadeInSlideLeft')
          }`}
        >
          {skills[selectedCategory].map((skill, index) => (
            <div
              key={index}
              className="bg-white/5 px-3 py-1.5 rounded-md border border-[#1c6000]/20 hover:bg-white/10 transition-all duration-300 hover:border-[#27a102]/40 whitespace-nowrap"
            >
              <p className="text-white/80 font-medium text-xs">{skill}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
