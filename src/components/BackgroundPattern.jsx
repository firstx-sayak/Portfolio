import React from 'react';

const BackgroundPattern = ({ scrollY, gradientReveal = 0 }) => {
  const angle = scrollY * 0.1;
  const baseDarkness = 1 - scrollY * 0.0008;
  const redIntensity = Math.min(0.18 + gradientReveal * 0.55, 0.6);
  const wordOpacity = Math.max(0.05, 0.08 * gradientReveal + scrollY * 0.00004);

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `linear-gradient(${angle}deg,
          rgba(0, 0, 0, ${Math.max(0, baseDarkness)}) 0%,
          rgba(139, 0, 0, ${redIntensity}) 100%)`,
        transition: 'background 0.8s ease'
      }}
    >
      {[...Array(25)].map((_, i) => (
        <div
          key={i}
          className="absolute text-4xl md:text-6xl font-black text-red-500 select-none"
          style={{
            top: `${15 + (i * 12) % 85}%`,
            left: `${5 + (i * 18) % 90}%`,
            opacity: Math.min(0.16, Math.max(wordOpacity, 0.04)),
            transform: `
              rotate(${Math.min(85, i * 12 + Math.sin(Date.now() * 0.001 + i) * 15)}deg)
              scale(${0.4 + (i % 4) * 0.2 + gradientReveal * 0.1})
              translateX(${Math.sin(Date.now() * 0.0005 + i) * 20}px)
              translateY(${Math.cos(Date.now() * 0.0008 + i) * 15}px)
            `,
            transition: 'opacity 0.5s ease, transform 0.6s ease'
          }}
        >
          FIRSTX
        </div>
      ))}
    </div>
  );
};

export default BackgroundPattern;
