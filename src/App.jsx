import React, { useEffect, useRef, useState } from 'react';

import BackgroundPattern from './components/BackgroundPattern';
import HeroSection from './components/HeroSection';
import FinMindSection from './components/FinMindSection';
import WorkflowSolutionsSection from './components/WorkflowSolutionsSection';
import TechStackSection from './components/TechStackSection';
import PortfolioFooter from './components/PortfolioFooter';

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothStep = (v) => {
  const t = clamp(v);
  return t * t * (3 - 2 * t);
};

const Portfolio = () => {
  const scrollTargetRef = useRef(0);
  const scrollValueRef = useRef(0);
  const scrollRafRef = useRef(null);
  const scrollDirectionRef = useRef(1);
  const metricsRef = useRef({
    heroScale: Number.NaN,
    heroOpacity: Number.NaN,
    heroTranslate: Number.NaN,
    finmindScale: Number.NaN,
    finmindOpacity: Number.NaN,
    finmindTranslate: Number.NaN,
    finmindBackdrop: Number.NaN,
    workflowTranslate: Number.NaN,
    workflowScale: Number.NaN,
    workflowOpacity: Number.NaN,
    techStackOpacity: Number.NaN,
    bgAngle: Number.NaN,
    bgDarkness: Number.NaN,
    bgRedIntensity: Number.NaN,
    patternWordOpacity: Number.NaN,
  });

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const root = document.documentElement;
    const rootStyle = root.style;
    const metrics = metricsRef.current;

    const setNumericVar = (key, cssVar, value, { precision = 3, threshold = 0.002, suffix = '' } = {}) => {
      const last = metrics[key];
      if (Number.isFinite(last) && Math.abs(last - value) < threshold) return;
      metrics[key] = value;
      const formatted = suffix ? `${value.toFixed(precision)}${suffix}` : value.toFixed(precision);
      rootStyle.setProperty(cssVar, formatted);
    };

    const initialScroll = window.scrollY || 0;
    scrollTargetRef.current = initialScroll;
    scrollValueRef.current = initialScroll;

    const applyMetrics = (value) => {
      const heroProgress = smoothStep(value / 520);
      const heroScale = Math.max(0.42, 1 - heroProgress * 0.6);
      const heroOpacity = Math.max(0, 1 - heroProgress * 1.05);
      const heroTranslate = Math.min(value * 0.4, 140);

      const finmindProgress = smoothStep((value - 320) / 520);
      const finmindScale = 0.86 + finmindProgress * 0.14;
      const finmindOpacity = finmindProgress;
      const gradientReveal = smoothStep((value - 160) / 360);

      const workflowProgress = smoothStep((value - 820) / 520);
      const finmindTranslateBase = (1 - finmindProgress) * 120;
      const finmindReturnBoost = workflowProgress * 120;
      const finmindDirection = scrollDirectionRef.current;
      const finmindTranslate = finmindDirection >= 0
        ? finmindTranslateBase
        : -(finmindTranslateBase + finmindReturnBoost);
      const finmindBackdrop = Math.max(gradientReveal, finmindOpacity);

      const workflowTranslate = (1 - workflowProgress) * 140;
      const workflowScale = 0.82 + workflowProgress * 0.18;
      const workflowOpacity = 0.38 + workflowProgress * 0.62;

      const techStackProgress = smoothStep((value - 1500) / 520);
      const techStackOpacity = 0.55 + techStackProgress * 0.45;

      const bgAngle = Math.min(48, 14 + value * 0.07);
      const bgDarkness = Math.max(0.22, 1 - value * 0.0009);
      const bgRedIntensity = Math.min(0.2 + gradientReveal * 0.45, 0.5);
      const wordOpacity = Math.max(0.06, Math.min(0.18, 0.08 + gradientReveal * 0.14));

      setNumericVar('heroScale', '--hero-scale', heroScale, { threshold: 0.0015 });
      setNumericVar('heroOpacity', '--hero-opacity', heroOpacity, { threshold: 0.01 });
      setNumericVar('heroTranslate', '--hero-translate', heroTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });

      setNumericVar('finmindScale', '--finmind-scale', finmindScale, { threshold: 0.0015 });
      setNumericVar('finmindOpacity', '--finmind-opacity', finmindOpacity, { threshold: 0.01 });
      setNumericVar('finmindTranslate', '--finmind-translate', finmindTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });
      setNumericVar('finmindBackdrop', '--finmind-backdrop', finmindBackdrop, { threshold: 0.01 });

      setNumericVar('workflowTranslate', '--workflow-translate', workflowTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });
      setNumericVar('workflowScale', '--workflow-scale', workflowScale, { threshold: 0.002 });
      setNumericVar('workflowOpacity', '--workflow-opacity', workflowOpacity, { threshold: 0.01 });

      setNumericVar('techStackOpacity', '--techstack-opacity', techStackOpacity, { threshold: 0.01 });

      setNumericVar('bgAngle', '--bg-angle', bgAngle, { precision: 2, threshold: 0.45, suffix: 'deg' });
      setNumericVar('bgDarkness', '--bg-darkness', bgDarkness, { threshold: 0.01 });
      setNumericVar('bgRedIntensity', '--bg-red-intensity', bgRedIntensity, { threshold: 0.01 });
      setNumericVar('patternWordOpacity', '--pattern-word-opacity', wordOpacity, { threshold: 0.01 });
    };

    applyMetrics(initialScroll);

    const update = () => {
      const target = scrollTargetRef.current;
      const previous = scrollValueRef.current;
      const diff = target - previous;

      if (Math.abs(diff) < 0.5) {
        scrollValueRef.current = target;
      } else {
        scrollValueRef.current = previous + diff * 0.16;
      }

      const currentValue = scrollValueRef.current;
      const direction = target > previous ? 1 : target < previous ? -1 : scrollDirectionRef.current;
      scrollDirectionRef.current = direction;

      applyMetrics(currentValue);

      if (Math.abs(target - currentValue) >= 0.5) {
        scrollRafRef.current = requestAnimationFrame(update);
      } else {
        scrollRafRef.current = null;
      }
    };

    const handleScroll = () => {
      const nextTarget = window.scrollY || 0;
      if (Math.abs(nextTarget - scrollTargetRef.current) < 0.5) return;
      scrollTargetRef.current = nextTarget;
      if (!scrollRafRef.current) {
        scrollRafRef.current = requestAnimationFrame(update);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (scrollRafRef.current) {
          cancelAnimationFrame(scrollRafRef.current);
          scrollRafRef.current = null;
        }
      } else {
        scrollTargetRef.current = window.scrollY || 0;
        if (!scrollRafRef.current) {
          scrollRafRef.current = requestAnimationFrame(update);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (!scrollRafRef.current) {
      scrollRafRef.current = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      scrollRafRef.current = null;
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thanks! I'll get back to you soon at sayakdps@gmail.com");
    setFormData({ name: '', email: '', message: '' });
  };

  const techStack = [
    { name: 'LangChain', logo: 'LC' },
    { name: 'OpenAI', logo: 'OA' },
    { name: 'Mistral', logo: 'MI' },
    { name: 'Neo4j', logo: 'N4' },
    { name: 'ChromaDB', logo: 'CD' },
    { name: 'Groq', logo: 'GQ' },
    { name: 'Hugging Face', logo: 'HF' },
    { name: 'LlamaIndex', logo: 'LI' },
    { name: 'PostgreSQL', logo: 'PG' },
    { name: 'Python', logo: 'PY' },
    { name: 'Streamlit', logo: 'ST' },
    { name: 'Docker', logo: 'DK' },
    { name: 'AWS', logo: 'AW' },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <BackgroundPattern />
      <HeroSection />
      <FinMindSection />
      <WorkflowSolutionsSection
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
      />
      <TechStackSection techStack={techStack} />
      <PortfolioFooter />
    </div>
  );
};

function App() {
  return <Portfolio />;
}

export default App;
