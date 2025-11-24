import React, { useState, useEffect } from 'react';

interface HeroProps {
  startDate: string;
}

const Hero: React.FC<HeroProps> = ({ startDate }) => {
  const [days, setDays] = useState(0);
  const [years, setYears] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const calculatedYears = (totalDays / 365.25).toFixed(1);
      
      setDays(totalDays);
      setYears(parseFloat(calculatedYears));
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, [startDate]);

  return (
    <div className="relative h-screen min-h-[600px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,228,230,0.4),rgba(255,255,255,0))] z-0" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

      <div className="z-10 text-center px-4 animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-serif text-rose-900 mb-6 drop-shadow-sm">
          Amber <span className="text-rose-500">&amp;</span> Jasper
        </h1>
        <p className="text-xl md:text-2xl text-rose-700 font-light tracking-wide mb-12">
          Falling in love since {startDate.replace(/-/g, '/')}
        </p>

        <div className="bg-white/60 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-xl inline-block transform hover:scale-105 transition-transform duration-500">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
             <div className="flex flex-col items-center">
                <span className="text-7xl md:text-9xl font-bold text-rose-600 tabular-nums">
                  {days}
                </span>
                <span className="text-sm md:text-lg uppercase tracking-widest text-slate-500 font-semibold mt-2">
                  Days Together
                </span>
             </div>
          </div>
          <div className="mt-4 pt-4 border-t border-rose-100">
             <p className="text-rose-400 text-sm font-medium">
               That's approximately {years} years of happiness
             </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-rose-400">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Hero;