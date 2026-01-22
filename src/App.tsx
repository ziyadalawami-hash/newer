import React, { useState, useEffect } from 'react';
import Content from './components/Content';
import MarqueeBar from './components/MarqueeBar';
import { useLanguage } from './i18n/LanguageContext';

function App() {
  const { isRTL } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [isRTL]);

  return (
    <div id="top" className="bg-[#000a01] min-h-screen pt-10 pb-14 md:pb-0">
      <MarqueeBar />
      <main className="max-w-[1000px] mx-auto bg-[#001a03]">
        <Content />
      </main>
    </div>
  );
}

export default App;