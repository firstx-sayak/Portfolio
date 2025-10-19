import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { Brain, Database, Zap } from 'lucide-react';
import useTransientWillChange from '../hooks/useTransientWillChange';

const featureItems = [
  {
    icon: Database,
    title: 'Universal ingestion',
    description: 'Blend PDFs, SQL, and streaming market feeds with zero prep.'
  },
  {
    icon: Brain,
    title: 'Explainable intelligence',
    description: 'Traverse every balance sheet with chain-of-thought reasoning.'
  },
  {
    icon: Zap,
    title: 'Realtime copilots',
    description: 'Launch analysts that operate inside your workflows in minutes.'
  }
];

const FinMindSection = forwardRef((_, forwardedRef) => {
  const [introVisible, setIntroVisible] = useState(false);
  const [featureVisible, setFeatureVisible] = useState(() => featureItems.map(() => false));
  const [qaVisible, setQaVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const animationsActive = useMemo(
    () => introVisible || featureVisible.some(Boolean) || qaVisible || ctaVisible,
    [introVisible, featureVisible, qaVisible, ctaVisible]
  );
  const sectionRef = useTransientWillChange(forwardedRef, 'transform', { active: animationsActive });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const timeouts = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIntroVisible(true);
        featureItems.forEach((_, idx) => {
          timeouts.push(
            setTimeout(() => {
              setFeatureVisible((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, idx * 160)
          );
        });

        timeouts.push(setTimeout(() => setQaVisible(true), 600));
        timeouts.push(setTimeout(() => setCtaVisible(true), 900));

        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      data-section="finmind"
      className="finmind-section relative flex items-center justify-center py-28 md:py-36 overflow-hidden"
      style={{
        transform: 'translateY(var(--finmind-translate, 0px)) scale(var(--finmind-scale, 1))',
        opacity: 'var(--finmind-opacity, 1)',
        transition: 'transform 0.6s ease'
      }}
    >
      <div
        className="finmind-aura"
        style={{ opacity: 'var(--finmind-backdrop, 0.6)' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div
            className="text-center space-y-6"
            style={{
              opacity: introVisible ? 1 : 0,
              transform: introVisible
                ? 'translateY(0) scale(1)'
                : 'translateY(90px) scale(0.86)',
              transition: 'transform 0.6s ease, opacity 0.6s ease'
            }}
          >
            <span className="tracking-[0.55em] text-xs md:text-sm uppercase text-red-400/80">FINANCE OPS ENGINE</span>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.85] text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 drop-shadow-[0_0_55px_rgba(239,68,68,0.35)]">
              FinMind
            </h2>
            <p className="text-lg md:text-2xl text-gray-200/90 max-w-3xl mx-auto">
              Deploy an always-on intelligence layer that reads every document, reconciles every account, and answers the questions your desk is about to ask.
            </p>
          </div>

          <div className="relative">
            <div className="finmind-grid">
              {featureItems.map(({ icon: Icon, title, description }, index) => {
                const isVisible = featureVisible[index];
                return (
                  <div
                    key={title}
                    className="finmind-node"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
                      transition: 'transform 0.55s ease, opacity 0.55s ease',
                      transitionDelay: isVisible ? `${index * 0.08}s` : '0s'
                    }}
                  >
                    <div className="finmind-node__glow" aria-hidden="true" />
                    <Icon className="w-7 h-7 text-red-400" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
                      <p className="text-sm text-gray-400/90 leading-relaxed">{description}</p>
                    </div>
                  </div>
                );
              })}

              <div
                className="finmind-sample"
                style={{
                  opacity: qaVisible ? 1 : 0,
                  transform: qaVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: 'transform 0.6s ease, opacity 0.6s ease',
                  transitionDelay: qaVisible ? '0.25s' : '0s'
                }}
              >
                <div>
                  <span className="finmind-sample__label">PROMPT</span>
                  <div className="finmind-sample__prompt">
                    <code>
                      FinMind, surface performance drift for all strategies &gt;$200M AUM with more than 50bps variance in the last 24 hours. Compare vs FX hedges.
                    </code>
                  </div>
                </div>

                <div className="finmind-sample__response">
                  <p>
                    Showing <strong>12 strategies</strong> with variance &gt; 50bps. Largest deviation: <strong>Euro Macro</strong> (+110bps) due to EURCHF hedges breaking correlation. <strong>Latitude Credit</strong> (-80bps) triggered because loan-loss chatter from the Street hit the knowledge graph.
                  </p>
                  <p className="mt-4">
                    Underperformers: <strong>Frontier Growth</strong> (-3.4%) and <strong>Global Alpha</strong> (-1.9%). Sharpe ratios compressed due to FX hedges (+210bps drag) and delayed energy rebalance. Suggested actions are waiting in your execution queue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="text-center"
            style={{
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? 'translateY(0)' : 'translateY(70px)',
              transition: 'transform 0.6s ease, opacity 0.6s ease'
            }}
          >
            <button className="relative inline-flex items-center gap-3 px-12 py-4 rounded-full font-semibold uppercase tracking-[0.3em] text-sm md:text-base bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-[0_18px_45px_rgba(248,113,113,0.25)] transition-all duration-500 hover:shadow-[0_20px_60px_rgba(248,113,113,0.35)] hover:tracking-[0.35em]">
              Explore FinMind Live
              <span className="h-px w-8 bg-white/70" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="finmind-workflow-bridge" aria-hidden="true" />

      <style jsx>{`
        .finmind-section {
          content-visibility: auto;
          contain: layout paint size style;
          contain-intrinsic-size: 960px 1200px;
          overflow: clip;
        }

        .finmind-aura {
          position: absolute;
          width: min(60vw, 960px);
          height: min(60vw, 960px);
          top: 45%;
          left: 50%;
          transform: translate(-50%, -45%);
          overflow: hidden;
          border-radius: 50%;
          background: radial-gradient(circle at center,
            rgba(239, 68, 68, 0.48),
            rgba(30, 0, 0, 0.8) 48%,
            rgba(0, 0, 0, 0.96) 80%);
          filter: blur(140px);
          transition: opacity 0.8s ease;
          z-index: 0;
        }

        .finmind-grid {
          display: grid;
          gap: 1.5rem;
          position: relative;
        }

        @media (min-width: 1024px) {
          .finmind-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
          }
        }

        .finmind-node {
          position: relative;
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
          padding: 1.5rem 1.75rem;
          border-radius: 1.1rem;
          border: 1px solid rgba(248, 113, 113, 0.18);
          background: linear-gradient(155deg, rgba(15, 15, 15, 0.85), rgba(60, 6, 6, 0.6));
          box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.12);
          overflow: hidden;
        }

        .finmind-node__glow {
          position: absolute;
          inset: -18%;
          background: radial-gradient(circle at top left, rgba(248, 113, 113, 0.22), transparent 65%);
          filter: blur(26px);
          opacity: 0.75;
          pointer-events: none;
        }

        .finmind-sample {
          grid-column: span 2;
          display: grid;
          gap: 1.75rem;
          padding: 2rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(248, 113, 113, 0.18);
          background: linear-gradient(160deg, rgba(0, 0, 0, 0.82), rgba(24, 0, 0, 0.6));
          box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.12);
        }

        .finmind-sample__label {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(248, 113, 113, 0.75);
        }

        .finmind-sample__prompt code {
          display: block;
          padding: 1.1rem 1.3rem;
          border-radius: 0.9rem;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.16);
          color: rgb(134 239 172);
          font-size: 0.9rem;
        }

        .finmind-sample__response {
          background: rgba(0, 0, 0, 0.55);
          border-radius: 0.9rem;
          border: 1px solid rgba(248, 113, 113, 0.12);
          padding: 1.6rem 1.8rem;
          color: rgba(226, 232, 240, 0.92);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .finmind-sample__response strong {
          color: rgba(248, 113, 113, 0.85);
          font-weight: 600;
        }

        @media (max-width: 1023px) {
          .finmind-sample {
            grid-column: span 1;
          }
        }

        .finmind-workflow-bridge {
          position: absolute;
          left: 50%;
          bottom: -12vh;
          width: 140vw;
          max-width: 1600px;
          height: clamp(200px, 24vh, 340px);
          background: radial-gradient(ellipse at center, rgba(248, 113, 113, 0.32) 0%, rgba(34, 4, 4, 0.82) 45%, rgba(0, 0, 0, 0) 88%);
          pointer-events: none;
          transition: opacity 0.45s ease, transform 0.45s ease;
          opacity: var(--bridge-opacity, 0);
          transform: translate(-50%, calc(var(--bridge-opacity, 0) * -20px));
          z-index: 4;
        }
      `}</style>
    </section>
  );
});

export default FinMindSection;
