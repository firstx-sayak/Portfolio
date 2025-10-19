import React, { Suspense, useState } from 'react';

import BackgroundPattern from './components/BackgroundPattern';
import HeroSection from './components/HeroSection';
// Lazily importing below-the-fold sections prevents Vite from hydrating their bundles up-front, trimming the dev heap.
const FinMindSection = React.lazy(() => import('./components/FinMindSection'));
// Lazy loading keeps the workflow section's heavy gradients out of the critical path, shrinking initial memory.
const WorkflowSolutionsSection = React.lazy(() => import('./components/WorkflowSolutionsSection'));
// Delaying the marquee section avoids duplicating image references before the user scrolls to them.
const TechStackSection = React.lazy(() => import('./components/TechStackSection'));
// Deferring the footer reduces eager React tree size while preserving identical visuals once resolved.
const PortfolioFooter = React.lazy(() => import('./components/PortfolioFooter'));
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

// Centralising the tech stack data ensures a single shared array, avoiding repeated allocations that can leak in dev tools.
const TECH_STACK = Object.freeze([
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
]);

const Portfolio = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thanks! I'll get back to you soon at sayakdps@gmail.com");
    setFormData({ name: '', email: '', message: '' });
  };

  // Reusing the frozen tech stack reference avoids growth of retained objects across Suspense boundaries.
  const techStack = TECH_STACK;

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <BackgroundPattern />
      <HeroSection />
      {/* Suspense gates keep each heavy section out of memory until its chunk is requested, mirroring the prior visuals once loaded. */}
      <Suspense fallback={null}>
        <FinMindSection />
      </Suspense>
      <Suspense fallback={null}>
        <WorkflowSolutionsSection
          formData={formData}
          setFormData={setFormData}
          handleFormSubmit={handleFormSubmit}
        />
      </Suspense>
      <Suspense fallback={null}>
        <TechStackSection techStack={techStack} />
      </Suspense>
      <Suspense fallback={null}>
        <PortfolioFooter />
      </Suspense>
    </div>
  );
};

function App() {
  return <Portfolio />;
}

export default App;
