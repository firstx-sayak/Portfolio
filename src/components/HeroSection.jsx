import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const extrusionLayers = useMemo(() => Array.from({ length: 28 }, (_, i) => i + 1), []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero-shell h-screen relative flex flex-col justify-center overflow-hidden ${isActive ? 'hero-active' : 'hero-paused'}`}
    >
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none firstx-marquee">
        <div className="firstx-marquee-track">
          {[0, 1].map((segment) => (
            <div key={segment} className="firstx-marquee-segment">
              {['F', 'I', 'R', 'S', 'T', 'X'].map((letter) => (
                <span key={`${segment}-${letter}`} className="firstx-letter select-none">
                  {letter}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="container mx-auto px-6 flex items-center justify-between relative z-20 mt-32 min-h-[60vh]"
        style={{
          transform: 'translateY(var(--hero-translate, 0px)) scale(var(--hero-scale, 1))',
          opacity: 'var(--hero-opacity, 1)',
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
          willChange: 'transform, opacity'
        }}
      >
        <div className="flex-1 space-y-8 pr-6 md:pr-10">
          <h1
            className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold leading-tight select-none"
            style={{
              background: `linear-gradient(120deg,
                #ffffff 0%,
                #f8fafc 12%,
                #e2e8f0 35%,
                #cbd5e1 55%,
                #94a3b8 72%,
                #64748b 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: `
                4px 4px 0px rgba(15, 23, 42, 0.8),
                0px 0px 24px rgba(255, 255, 255, 0.22),
                0px 0px 72px rgba(148, 163, 184, 0.55)
              `,
              transform: 'perspective(1600px) rotateX(9deg) rotateY(-6deg)'
            }}
          >
            Sayak<br />Majumder
          </h1>

          <p
            className="text-xl md:text-2xl lg:text-3xl text-gray-200/90 max-w-xl"
            style={{
              textShadow: '2px 2px 8px rgba(15, 15, 15, 0.85)',
              transform: 'perspective(1200px) rotateX(6deg)'
            }}
          >
            Data Scientist | AI Innovator | Founder
          </p>

          <div className="pt-8">
            <ChevronDown className="w-10 h-10 hero-chevron text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.45)]" />
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative">
          <div className="hero-logo-wrapper">
            <div className="hero-logo">
              {extrusionLayers.map((layer) => (
                <span
                  key={layer}
                  className="hero-logo-layer"
                  style={{
                    transform: `translateZ(${-layer * 3.5}px)`,
                    opacity: Math.max(0.12, 1 - layer * 0.04)
                  }}
                  aria-hidden="true"
                >
                  FX
                </span>
              ))}
              <span className="hero-logo-front">FX</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-shell {
          contain: layout paint style;
        }

        .hero-paused .hero-logo,
        .hero-paused .firstx-marquee-track,
        .hero-paused .hero-chevron,
        .hero-paused .hero-logo::before,
        .hero-paused .hero-logo::after {
          animation-play-state: paused;
        }

        .firstx-marquee {
          overflow: hidden;
          background: linear-gradient(180deg, rgba(18, 4, 4, 0.78), rgba(12, 3, 3, 0));
          padding: 0.65rem 0.75rem;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid rgba(239, 68, 68, 0.12);
        }

        .firstx-marquee-track {
          display: flex;
          width: 200%;
          transform: translateX(-50%);
          animation: marqueeSlide 20s linear infinite;
        }

        .firstx-marquee-segment {
          flex: 0 0 50%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 6vw;
        }

        .firstx-letter {
          font-size: clamp(2.3rem, 5vw, 3.6rem);
          font-weight: 800;
          letter-spacing: 0.28em;
          color: rgba(90, 12, 12, 0.78);
          text-shadow:
            0 0 14px rgba(220, 38, 38, 0.45),
            0 0 28px rgba(127, 29, 29, 0.35);
        }

        .hero-name {
          position: relative;
        }

        .hero-name::after {
          content: '';
          position: absolute;
          inset: -18px -32px;
          border-radius: 28px;
          border: 1px solid rgba(148, 163, 184, 0.22);
          background: linear-gradient(140deg, rgba(15, 23, 42, 0.55), rgba(239, 68, 68, 0.08));
          opacity: 0.25;
          filter: blur(3px);
          pointer-events: none;
          z-index: -1;
        }

        .hero-logo-wrapper {
          position: relative;
          font-size: clamp(12rem, 25vw, 28rem);
          line-height: 0.8;
          transform-style: preserve-3d;
          perspective: 2600px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter:
            drop-shadow(0 0 70px rgba(239, 68, 68, 0.5))
            drop-shadow(0 0 140px rgba(136, 19, 19, 0.45));
        }

        .hero-logo {
          position: relative;
          transform-style: preserve-3d;
          animation: heroRotate 18s linear infinite;
          will-change: transform;
        }

        .hero-logo-layer,
        .hero-logo-front {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          letter-spacing: -0.04em;
          pointer-events: none;
        }

        .hero-logo-layer {
          color: transparent;
          -webkit-text-stroke: 5px rgba(255, 255, 255, 0.14);
          text-shadow:
            -2px 2px 2px rgba(17, 24, 39, 0.9),
            -4px 5px 6px rgba(51, 65, 85, 0.6),
            -6px 8px 8px rgba(203, 213, 225, 0.4);
          filter: blur(0.55px);
        }

        .hero-logo-front {
          background: linear-gradient(135deg,
            #ef4444 0%,
            #dc2626 18%,
            #b91c1c 32%,
            #991b1b 52%,
            #7f1d1d 74%,
            #450a0a 92%,
            #ef4444 100%);
          -webkit-background-clip: text;
          color: transparent;
          text-shadow:
            0 0 50px rgba(239, 68, 68, 0.55),
            0 0 110px rgba(220, 38, 38, 0.4);
          transform: translateZ(0);
        }

        @keyframes heroRotate {
          0% {
            transform: rotateX(18deg) rotateY(0deg);
          }
          50% {
            transform: rotateX(18deg) rotateY(180deg);
          }
          100% {
            transform: rotateX(18deg) rotateY(360deg);
          }
        }

        @keyframes marqueeSlide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .hero-logo::before,
        .hero-logo::after {
          content: '';
          position: absolute;
          inset: -6% -8%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(239, 68, 68, 0.35), transparent 65%);
          filter: blur(12px);
          opacity: 0.6;
          animation: pulse 4.5s ease-in-out infinite;
        }

        .hero-logo::after {
          animation-delay: 1.8s;
          filter: blur(18px);
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.75; }
          50% { opacity: 0.4; }
        }

        .hero-chevron {
          animation: gentleBounce 3s ease-in-out infinite;
        }

        @keyframes gentleBounce {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(12px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-logo,
          .firstx-marquee-track,
          .hero-chevron {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
