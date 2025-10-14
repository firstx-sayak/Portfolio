import React from 'react';

const TechStackSection = ({ techStack }) => (
  <section
    className="techstack-section py-24"
    style={{
      opacity: 'var(--techstack-opacity, 1)',
      transition: 'opacity 0.6s ease'
    }}
  >
    <div className="container mx-auto px-6">
      <h2 className="text-4xl md:text-6xl font-black text-center mb-16 bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(239,68,68,0.35)]">
        Powered By Innovation
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techStack.map((tech, index) => (
          <div key={index} className="tech-pill">
            <div className="text-4xl mb-3">{tech.logo}</div>
            <span className="text-sm font-semibold text-center tracking-wide uppercase text-gray-200/85">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>

    <style jsx>{`
      .techstack-section {
        content-visibility: auto;
        contain: layout paint style;
        contain-intrinsic-size: 640px 720px;
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
      }

      .tech-pill:hover {
        transform: translateY(-10px) scale(1.06);
        border-color: rgba(248, 113, 113, 0.55);
        box-shadow: 0 18px 38px rgba(239, 68, 68, 0.22);
      }
    `}</style>
  </section>
);

export default TechStackSection;
