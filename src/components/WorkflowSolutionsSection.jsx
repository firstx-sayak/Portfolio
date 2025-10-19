import React, { forwardRef } from 'react';
import { Brain, Database, Zap, Mail, MessageSquare, User } from 'lucide-react';
import useTransientWillChange from '../hooks/useTransientWillChange';

const WorkflowSolutionsSection = forwardRef(({ formData, setFormData, handleFormSubmit }, forwardedRef) => {
  const sectionRef = useTransientWillChange(forwardedRef, 'transform', { active: true });

  return (
    <section
      ref={sectionRef}
      data-section="workflow"
      className="workflow-section relative flex flex-col gap-12 py-16 lg:py-20"
    >
      <div className="container mx-auto px-6">
        <div className="workflow-intro text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_45px_rgba(239,68,68,0.35)]">
            AI Workflow Solutions
          </h2>
          <p className="text-2xl md:text-3xl text-gray-300/90 max-w-4xl mx-auto leading-relaxed">
            Supercharge your business with custom AI workflows that <span className="text-red-500 font-bold">automate the impossible</span> and turn your data into your competitive advantage.
          </p>
        </div>

        <div className="workflow-grid grid md:grid-cols-3 gap-8 mb-12">
          <div className="workflow-card">
            <Brain className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Intelligent Automation</h3>
            <p className="text-gray-300">Custom AI agents that understand your business logic and automate complex decision-making processes.</p>
          </div>

          <div className="workflow-card">
            <Database className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Data Intelligence</h3>
            <p className="text-gray-300">Transform messy data into crystal-clear insights with advanced RAG systems and knowledge graphs.</p>
          </div>

          <div className="workflow-card">
            <Zap className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Rapid Deployment</h3>
            <p className="text-gray-300">From concept to production in weeks, not months. Scalable solutions that grow with your business.</p>
          </div>
        </div>

        <div className="workflow-cta max-w-2xl mx-auto bg-gradient-to-b from-gray-900/82 to-black/80 p-8 rounded-2xl border border-red-500/30 shadow-2xl backdrop-blur-sm">
          <h3 className="text-3xl font-bold text-center mb-8 text-red-500 tracking-wide">Let's Build Something Amazing</h3>

          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-4 w-5 h-5 text-red-500" />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/50 border border-red-500/30 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-4 w-5 h-5 text-red-500" />
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/50 border border-red-500/30 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-red-500" />
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/50 border border-red-500/30 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-red-500 focus:outline-none transition-colors h-32 resize-none"
                required
              />
            </div>

            <button
              onClick={handleFormSubmit}
              className="w-full bg-gradient-to-r from-red-500 to-red-700 py-4 rounded-lg text-xl font-bold hover:from-red-600 hover:to-red-800 transition-all duration-400 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
            >
              Launch My AI Project
            </button>
          </div>
        </div>
      </div>

      <div className="workflow-transition-cap" aria-hidden="true" />

      <style jsx>{`
        .workflow-section {
          background: linear-gradient(180deg, rgba(32, 0, 0, 0.68) 0%, rgba(12, 0, 0, 0.9) 45%, rgba(0, 0, 0, 1) 100%);
        }

        .workflow-card {
          background: linear-gradient(165deg, rgba(127, 29, 29, 0.22), rgba(0, 0, 0, 0.82));
          border: 1px solid rgba(248, 113, 113, 0.3);
          padding: 2rem;
          border-radius: 1rem;
          transition: transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease;
          overflow: hidden;
        }

        .workflow-card:hover {
          transform: translateY(-12px);
          border-color: rgba(248, 113, 113, 0.55);
          box-shadow: 0 22px 45px rgba(239, 68, 68, 0.25);
        }

        .workflow-transition-cap {
          display: none;
        }

        @media (min-width: 1280px) {
          .workflow-section {
            overflow: hidden;
            position: relative;
          }

          .workflow-intro,
          .workflow-grid,
          .workflow-cta {
            transform: translateY(calc((1 - var(--workflow-opacity, 1)) * 40px));
            opacity: var(--workflow-opacity, 1);
            transition: transform 0.4s ease, opacity 0.4s ease;
          }

        .workflow-transition-cap {
          display: block;
          position: absolute;
          top: -3rem;
          left: 50%;
          width: 160vw;
          max-width: 2000px;
          height: clamp(140px, 18vh, 260px);
          background: radial-gradient(ellipse at center, rgba(236, 62, 62, 0.34) 0%, rgba(18, 2, 2, 0.85) 52%, rgba(0, 0, 0, 0) 88%);
          pointer-events: none;
          transform: translate(-50%, 0);
          opacity: var(--cap-opacity, 0);
          transition: opacity 0.35s ease;
        }
        }
      `}</style>
    </section>
  );
});

export default WorkflowSolutionsSection;
