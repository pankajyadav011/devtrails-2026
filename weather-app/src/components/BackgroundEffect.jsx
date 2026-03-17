import React from 'react';

const BackgroundEffect = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Dynamic Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-teal-300/20 dark:bg-indigo-500/10 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      <div className="absolute top-[30%] right-[15%] w-[25%] h-[25%] bg-indigo-400/10 dark:bg-sky-400/5 rounded-full blur-[80px] animate-pulse [animation-delay:4s]"></div>
      
      {/* Subtle Mesh Grid (Optional) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100"></div>
    </div>
  );
};

export default BackgroundEffect;
