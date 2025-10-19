import React, { forwardRef } from 'react';

const TechStackSection = forwardRef(({ techStack }, ref) => {
  const duplicatedStack = [...techStack, ...techStack];

  return (
  <section
    ref={ref}
    data-section="techstack"
    className="techstack-section pt-6 pb-0"
    style={{
      opacity: 'var(--techstack-opacity, 1)',
      transition: 'opacity 0.6s ease'
    }}
  >
    <div className="container mx-auto px-6 pb-8">
      <h2 className="text-4xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.35)]">
        Powered By Innovation
      </h2>

      <div className="tech-marquee">
        <div className="tech-marquee-track">
          {duplicatedStack.map((tech, index) => (
            <div key={`${tech.name}-${index}`} className="tech-pill">
              <div className="tech-logo">
                {tech.logoSrc ? (
                  <img src={tech.logoSrc} alt={tech.name} />
                ) : (
                  <span className="text-4xl">{tech.logo}</span>
                )}
              </div>
              <span className="text-sm font-semibold text-center tracking-wide uppercase text-gray-200/85">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <style jsx>{`
      .techstack-section {
        content-visibility: auto;
        contain: layout paint size style;
        contain-intrinsic-size: 640px 220px;
        padding: clamp(1.25rem, 3.5vw, 2.5rem) 0 3.5rem;
        margin: 0;
      }

      .tech-marquee {
        overflow: hidden;
        border: 1px solid rgba(248, 113, 113, 0.18);
        border-radius: 1.5rem;
        padding: 0.75rem 0; margin: 0;
        position: relative;
        mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
      }

      .tech-marquee-track {
        display: flex;
        align-items: center;
        gap: clamp(2rem, 4vw, 3.5rem);
        min-width: 200%;
        transform: translateX(0);
        animation: techMarqueeSlide 22s linear infinite;
        will-change: transform;
      }

      .tech-pill {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        border-radius: 1rem;
        border: 1px solid rgba(248, 113, 113, 0.28);
        background: linear-gradient(165deg, rgba(76, 0, 0, 0.28), rgba(0, 0, 0, 0.82));
        transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
        overflow: hidden;
        min-width: clamp(8rem, 12vw, 10rem);
      }

      .tech-logo {
        width: clamp(4rem, 5vw, 5rem);
        height: clamp(4rem, 5vw, 5rem);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.75rem;
      }

      .tech-logo img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 12px rgba(248, 113, 113, 0.35));
      }

      .tech-pill:hover {
        transform: translateY(-10px) scale(1.06);
        border-color: rgba(248, 113, 113, 0.55);
        box-shadow: 0 18px 38px rgba(239, 68, 68, 0.22);
      }

      @keyframes techMarqueeSlide {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .tech-marquee-track {
          animation: none;
          transform: none;
        }
      }
    `}</style>
  </section>
  );
});

export default TechStackSection;
