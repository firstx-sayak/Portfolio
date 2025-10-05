import React, { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = ({ heroScale, heroOpacity, scrollY, mountRef }) => {
  const extrusionLayers = useMemo(() => Array.from({ length: 28 }, (_, i) => i + 1), []);
  const heroTranslate = Math.min(scrollY * 0.4, 140);

  return (
    <section className="h-screen relative flex flex-col justify-center overflow-hidden">
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
          transform: `translateY(${heroTranslate}px) scale(${heroScale})`,
          opacity: heroOpacity,
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
              transform: `
                perspective(1600px)
                rotateX(9deg)
                rotateY(-6deg)
              `
            }}
          >
            Sayak<br />Majumder
          </h1>

          <p
            className="text-xl md:text-2xl lg:text-3xl text-gray-200/90 max-w-xl"
            style={{
              textShadow: `2px 2px 8px rgba(15, 15, 15, 0.85)`,
              transform: `perspective(1200px) rotateX(6deg)`
            }}
          >
            Data Scientist | AI Innovator | Founder
          </p>

          <div className="pt-8">
            <ChevronDown className="w-10 h-10 animate-bounce text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.45)]" />
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center relative">
          <div ref={mountRef} className="absolute inset-0" />
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
            0 0 28px rgba(127, 29, 29, 0.35),
            0 0 54px rgba(88, 17, 17, 0.28);
          filter: drop-shadow(0 4px 12px rgba(80, 10, 10, 0.32));
          mix-blend-mode: screen;
          white-space: nowrap;
        }

        @keyframes marqueeSlide {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .hero-name {
          font-family: 'Oswald', 'Bebas Neue', 'Anton', 'Impact', sans-serif;
          text-transform: uppercase;
          letter-spacing: 0.12em;
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
          animation: heroRotate 16s linear infinite;
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
            transform: rotateX(18deg) rotateY(-180deg);
          }
          100% {
            transform: rotateX(18deg) rotateY(-360deg);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes float0 {
          0%, 100% { transform: perspective(1000px) rotateX(10deg) rotateY(0deg) translateZ(20px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(15deg) rotateY(5deg) translateZ(25px) translateY(-10px); }
        }

        @keyframes float1 {
          0%, 100% { transform: perspective(1000px) rotateX(12deg) rotateY(2deg) translateZ(25px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(8deg) rotateY(-3deg) translateZ(30px) translateY(-8px); }
        }

        @keyframes float2 {
          0%, 100% { transform: perspective(1000px) rotateX(8deg) rotateY(-2deg) translateZ(30px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(18deg) rotateY(4deg) translateZ(35px) translateY(-12px); }
        }

        @keyframes float3 {
          0%, 100% { transform: perspective(1000px) rotateX(15deg) rotateY(3deg) translateZ(35px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(5deg) rotateY(-5deg) translateZ(40px) translateY(-6px); }
        }

        @keyframes float4 {
          0%, 100% { transform: perspective(1000px) rotateX(5deg) rotateY(-4deg) translateZ(40px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(20deg) rotateY(2deg) translateZ(45px) translateY(-14px); }
        }

        @keyframes float5 {
          0%, 100% { transform: perspective(1000px) rotateX(18deg) rotateY(1deg) translateZ(45px) translateY(0px); }
          50% { transform: perspective(1000px) rotateX(10deg) rotateY(-6deg) translateZ(50px) translateY(-16px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
