import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

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
  const mountRef = useRef(null);
  const scrollTargetRef = useRef(0);
  const scrollRafRef = useRef(null);
  const scrollDirectionRef = useRef(1);

  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Smoothed scroll tracking
  useEffect(() => {
    const updateScroll = () => {
      setSmoothScrollY((prev) => {
        const target = scrollTargetRef.current;
        // slightly stronger easing, quantize to reduce re-renders
        const next = prev + (target - prev) * 0.18;
        const nextQ = Math.round(next * 2) / 2; // 0.5px steps
        const direction = target > prev ? 1 : target < prev ? -1 : scrollDirectionRef.current;
        scrollDirectionRef.current = direction;
        if (Math.abs(target - nextQ) < 0.5) {
          scrollRafRef.current = null;
          return target;
        }
        scrollRafRef.current = requestAnimationFrame(updateScroll);
        return nextQ;
      });
    };

    const handleScroll = () => {
      scrollTargetRef.current = window.scrollY;
      if (!scrollRafRef.current) {
        scrollRafRef.current = requestAnimationFrame(updateScroll);
      }
    };

    scrollTargetRef.current = window.scrollY;
    setSmoothScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, []);

  // Tiny THREE background particles for the hero logo
  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const particles = [];
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.SphereGeometry(0.02, 8, 8);
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(0, 1, 0.5 + Math.random() * 0.5),
        transparent: true,
        opacity: 0.4,
      });
      const p = new THREE.Mesh(geometry, material);
      p.position.x = (Math.random() - 0.5) * 8;
      p.position.y = (Math.random() - 0.5) * 8;
      p.position.z = (Math.random() - 0.5) * 5;
      particles.push(p);
      scene.add(p);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      particles.forEach((p, i) => {
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
        p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.008;
        p.position.x += Math.cos(Date.now() * 0.0008 + i) * 0.005;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thanks! I'll get back to you soon at sayakdps@gmail.com");
    setFormData({ name: '', email: '', message: '' });
  };

  const techStack = [
    { name: 'LangChain', logo: '🧠' },
    { name: 'OpenAI', logo: '⚙️' },
    { name: 'Mistral', logo: '🌬️' },
    { name: 'Neo4j', logo: '🕸️' },
    { name: 'ChromaDB', logo: '🟪' },
    { name: 'Groq', logo: '🚀' },
    { name: 'HuggingFace', logo: '🤗' },
    { name: 'LlamaIndex', logo: '🦙' },
    { name: 'PostgreSQL', logo: '🐘' },
    { name: 'Python', logo: '🐍' },
    { name: 'Streamlit', logo: '📊' },
    { name: 'Docker', logo: '🐳' },
    { name: 'AWS', logo: '☁️' },
  ];

  // Eased progress values for sections
  const heroProgress = smoothStep(smoothScrollY / 520);
  const heroScale = Math.max(0.35, 1 - heroProgress * 0.7);
  const heroOpacity = Math.max(0, 1 - heroProgress * 1.05);

  const finmindProgress = smoothStep((smoothScrollY - 320) / 520);
  const finmindScale = 0.82 + finmindProgress * 0.18;
  const finmindOpacity = finmindProgress;
  const gradientReveal = smoothStep((smoothScrollY - 160) / 360);
  // Drive FinMind's inner stagger directly from its section progress
  const finmindDetailSmooth = finmindProgress;

  const workflowProgress = smoothStep((smoothScrollY - 820) / 520);
  const finmindTranslateBase = (1 - finmindProgress) * 160;
  const finmindReturnBoost = workflowProgress * 160;
  const finmindTranslate = scrollDirectionRef.current >= 0 ? finmindTranslateBase : -(finmindTranslateBase + finmindReturnBoost);
  const finmindBackdropIntensity = Math.max(gradientReveal, finmindOpacity);

  const workflowTranslate = (1 - workflowProgress) * 180;
  const workflowScale = 0.78 + workflowProgress * 0.22;
  const workflowOpacity = 0.25 + workflowProgress * 0.75;

  const techStackProgress = smoothStep((smoothScrollY - 1500) / 520);
  const techStackOpacity = 0.45 + techStackProgress * 0.55;

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <BackgroundPattern scrollY={smoothScrollY} gradientReveal={gradientReveal} />
      <HeroSection heroScale={heroScale} heroOpacity={heroOpacity} scrollY={smoothScrollY} mountRef={mountRef} />
      <FinMindSection
        scale={finmindScale}
        opacity={finmindOpacity}
        translateY={finmindTranslate}
        backdropIntensity={finmindBackdropIntensity}
        detailProgress={finmindDetailSmooth}
      />
      <WorkflowSolutionsSection
        translateY={workflowTranslate}
        opacity={workflowOpacity}
        scale={workflowScale}
        formData={formData}
        setFormData={setFormData}
        handleFormSubmit={handleFormSubmit}
      />
      <TechStackSection opacity={techStackOpacity} techStack={techStack} />
      <PortfolioFooter currentDate={currentDate} />
    </div>
  );
};

function App() {
  return <Portfolio />;
}

export default App;
