import React from 'react';
import Content from './components/Content';
import MarqueeBar from './components/MarqueeBar';

function App() {
  return (
    <div id="top" className="bg-[#000a01] min-h-screen md:pt-10 pb-14 md:pb-0">
      <MarqueeBar />
      <main className="max-w-[1000px] mx-auto bg-[#001a03]">
        <Content />
      </main>
    </div>
  );
}

export default App;