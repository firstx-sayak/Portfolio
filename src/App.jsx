import React, { useEffect, useRef, useState } from 'react';

import BackgroundPattern from './components/BackgroundPattern';
import HeroSection from './components/HeroSection';
import FinMindSection from './components/FinMindSection';
import WorkflowSolutionsSection from './components/WorkflowSolutionsSection';
import TechStackSection from './components/TechStackSection';
import PortfolioFooter from './components/PortfolioFooter';
import langchainLogo from './logos/langchain.png';
import openaiLogo from './logos/openai.jpeg';
import mistralLogo from './logos/mistral.png';
import neo4jLogo from './logos/images.png';
import chromaLogo from './logos/chroma.png';
import groqLogo from './logos/groq.png';
import huggingFaceLogo from './logos/hugging face.jpeg';
import llamaIndexLogo from './logos/llamaindex.jpeg';
import cloudflaredLogo from './logos/cloudflared.png';
import postgresqlLogo from './logos/postgresql.png';
import doltLogo from './logos/dolt.png';

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const smoothstep = (min, max, value) => {
  if (max === min) return 0;
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const Portfolio = () => {
  const scrollTargetRef = useRef(0);
  const scrollValueRef = useRef(0);
  const scrollRafRef = useRef(null);
  const scrollDirectionRef = useRef(1);
  const lastFrameRef = useRef(0);
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
    finmindWorkflowBridge: Number.NaN,
    workflowCapOpacity: Number.NaN,
  });
  const activeSectionsRef = useRef({
    hero: true,
    finmind: false,
    workflow: false,
    techstack: false,
    background: true,
  });
  const heroSectionRef = useRef(null);
  const finmindSectionRef = useRef(null);
  const workflowSectionRef = useRef(null);
  const techStackSectionRef = useRef(null);
  const backgroundPatternRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const metrics = metricsRef.current;
    const activity = activeSectionsRef.current;

    const getTarget = () => ({
      hero: heroSectionRef.current,
      finmind: finmindSectionRef.current,
      workflow: workflowSectionRef.current,
      techstack: techStackSectionRef.current,
      background: backgroundPatternRef.current,
    });

    const computeVisibility = (node) => {
      if (!node) return false;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const buffer = viewportHeight * 0.2;
      return rect.bottom > -buffer && rect.top < viewportHeight + buffer;
    };

    const setNumericVar = (key, element, cssVar, value, { precision = 3, threshold = 0.002, suffix = '' } = {}) => {
      if (!element) return;
      const last = metrics[key];
      if (Number.isFinite(last) && Math.abs(last - value) < threshold) return;
      metrics[key] = value;
      const formatted = suffix ? `${value.toFixed(precision)}${suffix}` : value.toFixed(precision);
      element.style.setProperty(cssVar, formatted);
    };

    const initialScroll = window.scrollY || 0;
    scrollTargetRef.current = initialScroll;
    scrollValueRef.current = initialScroll;

    const applyMetrics = (value) => {
      const viewportHeight = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 0);
      const overlap = viewportHeight * 0.25;

      const heroNode = heroSectionRef.current;
      const finmindNode = finmindSectionRef.current;
      const workflowNode = workflowSectionRef.current;
      const techstackNode = techStackSectionRef.current;
      const backgroundNode = backgroundPatternRef.current;

      const heroHeight = heroNode?.offsetHeight || viewportHeight;
      const finmindHeight = finmindNode?.offsetHeight || viewportHeight;
      const workflowHeight = workflowNode?.offsetHeight || viewportHeight;

      const heroStart = 0;
      const heroEnd = heroStart + heroHeight;
      const finmindStart = heroStart + heroHeight - overlap;
      const finmindEnd = finmindStart + finmindHeight;
      const workflowStart = finmindEnd - overlap;
      const workflowEnd = workflowStart + workflowHeight;
      const techstackStart = workflowEnd;
      const techstackEnd = techstackStart + viewportHeight;

      const heroFadeOut = smoothstep(heroEnd - overlap, heroEnd, value);
      const heroOpacityValue = clamp(1 - heroFadeOut, 0, 1);
      const heroProgress = clamp(heroFadeOut, 0, 1);

      const finmindFadeIn = smoothstep(finmindStart, finmindStart + overlap, value);
      const finmindFadeOut = smoothstep(finmindEnd - overlap, finmindEnd, value);
      const finmindPlateau = value >= finmindStart + overlap && value <= finmindEnd - overlap ? 1 : 0;
      const finmindOpacityValue = clamp(finmindFadeIn * (1 - finmindFadeOut) + finmindPlateau, 0, 1);

      const workflowOpacityValue = smoothstep(workflowStart, workflowStart + overlap, value);

      const techStackProgress = smoothstep(techstackStart, techstackEnd, value);

      const gradientReveal = smoothstep(finmindStart - overlap * 0.4, finmindStart + overlap * 0.4, value);
      const bridgeProgress = smoothstep(finmindEnd - overlap, finmindEnd, value) * clamp(1 - workflowOpacityValue, 0, 1);
      const capOpacity = clamp(1 - workflowOpacityValue, 0, 1);

      if (activity.hero && heroNode) {
        const heroScale = Math.max(0.42, 1 - heroProgress * 0.6);
        const heroTranslate = Math.min(heroFadeOut * 140, 140);

        setNumericVar('heroScale', heroNode, '--hero-scale', heroScale, { threshold: 0.0015 });
        setNumericVar('heroOpacity', heroNode, '--hero-opacity', heroOpacityValue, { threshold: 0.01 });
        setNumericVar('heroTranslate', heroNode, '--hero-translate', heroTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });
      }

      if (activity.finmind && finmindNode) {
        const finmindScale = 0.86 + finmindOpacityValue * 0.14;
        const finmindOffset = (1 - finmindOpacityValue) * 120;
        const direction = scrollDirectionRef.current;
        const finmindTranslate = direction >= 0
          ? finmindOffset
          : -finmindOffset;
        const finmindBackdrop = Math.max(gradientReveal, finmindOpacityValue);

        setNumericVar('finmindScale', finmindNode, '--finmind-scale', finmindScale, { threshold: 0.0015 });
        setNumericVar('finmindOpacity', finmindNode, '--finmind-opacity', finmindOpacityValue, { threshold: 0.01 });
        setNumericVar('finmindTranslate', finmindNode, '--finmind-translate', finmindTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });
        setNumericVar('finmindBackdrop', finmindNode, '--finmind-backdrop', finmindBackdrop, { threshold: 0.01 });
        setNumericVar('finmindWorkflowBridge', finmindNode, '--bridge-opacity', bridgeProgress, { threshold: 0.01 });
      } else if (finmindNode) {
        setNumericVar('finmindWorkflowBridge', finmindNode, '--bridge-opacity', 0, { threshold: 0.01 });
      }

      if (activity.workflow && workflowNode) {
        const workflowTranslate = Math.min((1 - workflowOpacityValue) * 140, 140);
        const workflowScale = 0.82 + workflowOpacityValue * 0.18;

        setNumericVar('workflowTranslate', workflowNode, '--workflow-translate', workflowTranslate, { precision: 2, threshold: 0.75, suffix: 'px' });
        setNumericVar('workflowScale', workflowNode, '--workflow-scale', workflowScale, { threshold: 0.002 });
        setNumericVar('workflowOpacity', workflowNode, '--workflow-opacity', workflowOpacityValue, { threshold: 0.01 });
        setNumericVar('workflowCapOpacity', workflowNode, '--cap-opacity', capOpacity, { threshold: 0.01 });
      } else if (workflowNode) {
        setNumericVar('workflowCapOpacity', workflowNode, '--cap-opacity', 0, { threshold: 0.01 });
      }

      if (activity.techstack && techstackNode) {
        const techStackOpacity = 0.55 + techStackProgress * 0.45;
        setNumericVar('techStackOpacity', techstackNode, '--techstack-opacity', techStackOpacity, { threshold: 0.01 });
      }

      if (backgroundNode) {
        const bgAngle = Math.min(48, 14 + value * 0.07);
        const bgDarkness = Math.max(0.22, 1 - value * 0.0009);
        const bgRedIntensity = Math.min(0.2 + gradientReveal * 0.45, 0.5);
        const wordOpacity = clamp(0.06 + gradientReveal * 0.12, 0.06, 0.18);

        setNumericVar('bgAngle', backgroundNode, '--bg-angle', bgAngle, { precision: 2, threshold: 0.45, suffix: 'deg' });
        setNumericVar('bgDarkness', backgroundNode, '--bg-darkness', bgDarkness, { threshold: 0.01 });
        setNumericVar('bgRedIntensity', backgroundNode, '--bg-red-intensity', bgRedIntensity, { threshold: 0.01 });
        setNumericVar('patternWordOpacity', backgroundNode, '--pattern-word-opacity', wordOpacity, { threshold: 0.01 });
      }
    };

    const initialTargets = getTarget();
    activity.hero = computeVisibility(initialTargets.hero);
    activity.finmind = computeVisibility(initialTargets.finmind);
    activity.workflow = computeVisibility(initialTargets.workflow);
    activity.techstack = computeVisibility(initialTargets.techstack);

    applyMetrics(initialScroll);

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        let shouldRefresh = false;
        entries.forEach((entry) => {
          const id = entry.target.dataset.section;
          if (!id || !(id in activity)) return;
          const nextActive = entry.isIntersecting || entry.intersectionRatio > 0;
          if (activity[id] !== nextActive) {
            activity[id] = nextActive;
            if (nextActive) {
              shouldRefresh = true;
            }
          }
        });
        if (shouldRefresh) {
          applyMetrics(scrollValueRef.current);
        }
      },
      {
        rootMargin: '0px 0px -15% 0px',
        threshold: [0, 0.1, 0.25],
      }
    );

    const observedTargets = getTarget();
    Object.entries(observedTargets).forEach(([id, node]) => {
      if (!node) return;
      if (id === 'background') return;
      sectionObserver.observe(node);
    });

    const FRAME_INTERVAL = 1000 / 20;

    const update = (time) => {
      const lastFrameTime = lastFrameRef.current;
      if (!lastFrameTime || time - lastFrameTime >= FRAME_INTERVAL) {
        lastFrameRef.current = time;

        const target = scrollTargetRef.current;
        const previous = scrollValueRef.current;
        const diff = target - previous;

        const nextValue = Math.abs(diff) < 0.5 ? target : previous + diff * 0.16;
        scrollValueRef.current = nextValue;

        const direction = target > previous ? 1 : target < previous ? -1 : scrollDirectionRef.current;
        scrollDirectionRef.current = direction;

        applyMetrics(nextValue);

        if (Math.abs(target - nextValue) < 0.5) {
          scrollRafRef.current = null;
          return;
        }
      }

      scrollRafRef.current = requestAnimationFrame(update);
    };

    const handleScroll = () => {
      const nextTarget = window.scrollY || 0;
      if (Math.abs(nextTarget - scrollTargetRef.current) < 0.5) return;
      scrollTargetRef.current = nextTarget;
      if (!scrollRafRef.current) {
        lastFrameRef.current = 0;
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
          lastFrameRef.current = 0;
          scrollRafRef.current = requestAnimationFrame(update);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (!scrollRafRef.current) {
      lastFrameRef.current = 0;
      scrollRafRef.current = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sectionObserver.disconnect();
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
    { name: 'LangChain', logo: 'LC', logoSrc: langchainLogo },
    { name: 'OpenAI', logo: 'OA', logoSrc: openaiLogo },
    { name: 'Mistral', logo: 'MI', logoSrc: mistralLogo },
    { name: 'Neo4j', logo: 'N4', logoSrc: neo4jLogo },
    { name: 'ChromaDB', logo: 'CD', logoSrc: chromaLogo },
    { name: 'Groq', logo: 'GQ', logoSrc: groqLogo },
    { name: 'Hugging Face', logo: 'HF', logoSrc: huggingFaceLogo },
    { name: 'LlamaIndex', logo: 'LI', logoSrc: llamaIndexLogo },
    { name: 'Cloudflared', logo: 'CF', logoSrc: cloudflaredLogo },
    { name: 'PostgreSQL', logo: 'PG', logoSrc: postgresqlLogo },
    { name: 'Dolt', logo: 'DT', logoSrc: doltLogo },
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <BackgroundPattern ref={backgroundPatternRef} />
      <HeroSection ref={heroSectionRef} />
      <FinMindSection ref={finmindSectionRef} />
      <WorkflowSolutionsSection
        ref={workflowSectionRef}
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
      />
      <TechStackSection ref={techStackSectionRef} techStack={techStack} />
      <PortfolioFooter />
    </div>
  );
};

function App() {
  return <Portfolio />;
}

export default App;
