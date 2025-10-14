import React, { useMemo } from 'react';

const WORD_COUNT = 16;

const BackgroundPattern = () => {
  const words = useMemo(
    () => Array.from({ length: WORD_COUNT }, (_, index) => {
      const top = 10 + (index * 13) % 78;
      const left = 6 + (index * 19) % 86;
      const rotate = -16 + (index % 6) * 6;
      const rotateActive = rotate + (index % 2 === 0 ? 6 : -6);
      const scale = 0.7 + (index % 4) * 0.12;
      const driftX = 12 + (index % 5) * 4;
      const driftY = 8 + (index % 4) * 3;
      const delay = (index % 8) * 1.6;
      const duration = 16 + (index % 5) * 2.4;
      return {
        id: index,
        top,
        left,
        rotate,
        rotateActive,
        scale,
        driftX,
        driftY,
        delay,
        duration
      };
    }),
    []
  );

  return (
    <div
      className="background-pattern fixed inset-0 z-0 pointer-events-none bg-pattern"
      style={{
        background: 'linear-gradient(var(--bg-angle, 32deg), rgba(0, 0, 0, var(--bg-darkness, 0.6)) 0%, rgba(70, 0, 0, var(--bg-red-intensity, 0.35)) 100%)',
        transition: 'background 0.55s ease',
        '--pattern-default-opacity': 0.12
      }}
    >
      {words.map((word) => (
        <div
          key={word.id}
          className="pattern-word"
          style={{
            top: `${word.top}%`,
            left: `${word.left}%`,
            '--pattern-rotate': `${word.rotate}deg`,
            '--pattern-rotate-active': `${word.rotateActive}deg`,
            '--pattern-scale': word.scale,
            '--pattern-drift-x': `${word.driftX}px`,
            '--pattern-drift-y': `${word.driftY}px`,
            '--pattern-delay': `${word.delay}s`,
            '--pattern-duration': `${word.duration}s`
          }}
        >
          FIRSTX
        </div>
      ))}

      <style jsx>{`
        .background-pattern {
          contain: layout paint style;
        }

        .pattern-word {
          position: absolute;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: rgba(239, 68, 68, 0.32);
          opacity: var(--pattern-word-opacity, var(--pattern-default-opacity));
          transform: rotate(var(--pattern-rotate))
            translate3d(calc(var(--pattern-drift-x) * -1), calc(var(--pattern-drift-y) * -1), 0)
            scale(var(--pattern-scale));
          animation: patternFloat var(--pattern-duration) ease-in-out infinite;
          animation-delay: var(--pattern-delay);
          will-change: transform, opacity;
        }

        @keyframes patternFloat {
          0%, 100% {
            transform: rotate(var(--pattern-rotate))
              translate3d(calc(var(--pattern-drift-x) * -1), calc(var(--pattern-drift-y) * -1), 0)
              scale(var(--pattern-scale));
          }
          50% {
            transform: rotate(var(--pattern-rotate-active))
              translate3d(var(--pattern-drift-x), var(--pattern-drift-y), 0)
              scale(calc(var(--pattern-scale) + 0.1));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pattern-word {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default BackgroundPattern;
