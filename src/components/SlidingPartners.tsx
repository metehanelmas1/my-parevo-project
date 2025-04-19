'use client';

import { useEffect, useRef } from 'react';

const partners = [
  'ChatBot',
  'Synitel',
  'Xtreme Digital',
  'Slack',
  'BidFire',
  'Repl.it'
];

export default function SlidingPartners() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-[#6366F1] mb-2">İş Ortaklarımız</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            <span className="text-[#27285C]">Bizi ilham veren </span>
            <span className="text-[#6366F1]">ortaklarımız</span>
          </h2>
        </div>

        {/* Desktop View */}
        <div 
          ref={containerRef}
          className="hidden md:flex items-center gap-12 overflow-x-hidden"
        >
          {/* First set of partners */}
          <div className="flex items-center gap-12 animate-slide">
            {partners.map((partner, index) => (
              <div 
                key={`first-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
                <span className="text-[#6366F1] text-2xl font-semibold">{partner}</span>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-12 animate-slide">
            {partners.map((partner, index) => (
              <div 
                key={`second-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
                <span className="text-[#6366F1] text-2xl font-semibold">{partner}</span>
              </div>
            ))}
          </div>

          {/* Third set for extra smoothness */}
          <div className="flex items-center gap-12 animate-slide">
            {partners.map((partner, index) => (
              <div 
                key={`third-${index}`}
                className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
              >
                <span className="text-[#6366F1] text-2xl font-semibold">{partner}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden grid grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <div 
              key={`mobile-${index}`}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
            >
              <span className="text-[#6366F1] text-xl font-semibold text-center">{partner}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
          min-width: 100%;
        }
      `}</style>
    </div>
  );
} 