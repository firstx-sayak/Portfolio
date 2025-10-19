import React, { forwardRef, memo } from 'react';
import useTransientWillChange from '../hooks/useTransientWillChange';

const WORD_COUNT = 16;

// Precomputing the word transforms once avoids re-creating dozens of objects per render, easing GC pressure.
const PATTERN_WORDS = Object.freeze(
  Array.from({ length: WORD_COUNT }, (_, index) => {
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
  })
);

// Hoisting the style block keeps the large CSS payload from being recopied with each suspense reveal.
const BACKGROUND_PATTERN_STYLES = `
        .background-pattern {
          contain: layout paint size style;
          overflow: hidden;
          max-width: 100vw;
          max-height: 100vh;
        }

        .pattern-word {
          position: absolute;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: rgba(239, 68, 68, 0.32);
          opacity: var(--pattern-word-opacity, var(--pattern-default-opacity));
          overflow: hidden;
          transform: rotate(var(--pattern-rotate))
            translate3d(calc(var(--pattern-drift-x) * -1), calc(var(--pattern-drift-y) * -1), 0)
            scale(var(--pattern-scale));
        }

        @media (prefers-reduced-motion: no-preference) {
          .pattern-word {
            animation: patternFloat var(--pattern-duration) ease-in-out infinite;
            animation-delay: var(--pattern-delay);
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
        }
      `;

// memo with forwardRef keeps the background in a single instance once mounted, preventing duplicate animated layers.
const BackgroundPattern = memo(forwardRef(function BackgroundPattern(_, ref) {
  const localRef = useTransientWillChange(ref, 'opacity');

  return (
    <div
      ref={localRef}
      data-section="background"
      className="background-pattern fixed inset-0 z-0 pointer-events-none bg-pattern"
      style={{
        background: 'linear-gradient(var(--bg-angle, 32deg), rgba(0, 0, 0, var(--bg-darkness, 0.6)) 0%, rgba(70, 0, 0, var(--bg-red-intensity, 0.35)) 100%)',
        transition: 'background 0.55s ease',
        '--pattern-default-opacity': 0.12
      }}
    >
      {PATTERN_WORDS.map((word) => (
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

      <style jsx>{BACKGROUND_PATTERN_STYLES}</style>
    </div>
  );
}));

export default BackgroundPattern;
