import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '../ui/badge';
import { Lightbulb, Rocket, Brain, Globe, Smartphone, Shield, Zap, MessageSquare, Building2 } from 'lucide-react';

const ideasData = [
  {
    id: 1,
    title: "Legacy System Migration Framework",
    problem: "Critical industries such as airlines and banking rely on legacy systems that have operated for decades and cannot be taken offline. Similar to Y2K, emerging shifts—such as data scale growth and future quantum-related security changes—expose hard-coded assumptions that require large-scale migration without downtime.",
    solution: "A structured framework and consulting approach that works alongside existing systems rather than replacing them. The framework identifies data-size constraints, cryptographic and quantum-readiness gaps, and defines incremental, backward-compatible migration paths, enabling modernization while preserving continuous operations.",
    icon: Building2,
    category: "Enterprise",
    status: "Research",
    openToBuild: false
  },
  {
    id: 2,
    title: "Local LLM Agent for Mobile",
    problem: "Cloud-based AI requires internet, raises privacy concerns, and has latency issues. Users can't leverage AI for personal data without uploading to external servers.",
    solution: "A local LLM running on-device that acts as a personal AI agent - answering questions about your local files, sending WhatsApp messages via voice commands, automating tasks without internet dependency.",
    icon: Smartphone,
    category: "AI/Privacy",
    status: "Conceptual",
    openToBuild: true
  },
  {
    id: 3,
    title: "Resume & Cover Letter AI Generator",
    problem: "Job seekers spend hours tailoring resumes and writing cover letters for each application. The process is repetitive and time-consuming.",
    solution: "An AI tool that takes a job description and existing resume as input, then generates a tailored cover letter and enhanced resume optimized for that specific role.",
    icon: Rocket,
    category: "Career Tech",
    status: "Ready to Build",
    openToBuild: true
  },
  {
    id: 4,
    title: "Instant Room-Based Data Sharing",
    problem: "Sharing text/links between devices requires apps, logins, or complicated setups. AirDrop is Apple-only, and other solutions are bloated.",
    solution: "A minimal mobile website where you enter a room code and instantly share text/links to anyone in that room. No accounts, no downloads - just simple, fast sharing.",
    icon: Zap,
    category: "Utility",
    status: "Ready to Build",
    openToBuild: true
  },
  {
    id: 5,
    title: "Lecture-to-Summary AI",
    problem: "Students and professionals attend hours of lectures but struggle to create comprehensive notes. Reviewing recordings is time-consuming.",
    solution: "An app that records lectures and automatically generates structured summaries, key points, and actionable items using AI - turning hours of content into digestible insights.",
    icon: Brain,
    category: "EdTech",
    status: "Ready to Build",
    openToBuild: true
  },
  {
    id: 6,
    title: "Privacy Sensor Dashboard",
    problem: "Mobile apps silently access sensors (camera, mic, location, accelerometer) in the background. Users have no unified view of what's accessing their data.",
    solution: "A single app that monitors all sensor activity in real-time, shows which apps are using what, and allows quick toggling of permissions for better privacy control.",
    icon: Shield,
    category: "Privacy",
    status: "Conceptual",
    openToBuild: true
  },
  {
    id: 7,
    title: "Real-Time Translation Video Chat",
    problem: "Language barriers prevent meaningful global connections. Existing translation tools are clunky and break conversation flow.",
    solution: "An Omegle-style video chat where AI translates speech in real-time. You speak in your language, the other person hears it in theirs - seamless global communication.",
    icon: MessageSquare,
    category: "Communication",
    status: "Conceptual",
    openToBuild: true
  },
  {
    id: 8,
    title: "In-Store vs Online Price Comparison",
    problem: "While shopping in physical stores, it's hard to know if you're getting a good deal. Manually checking online prices is tedious.",
    solution: "An app where you photograph a product in-store, and AI identifies it and instantly compares prices across online retailers - helping you make informed purchase decisions.",
    icon: Lightbulb,
    category: "E-commerce",
    status: "Ready to Build",
    openToBuild: true
  }
];

const Ideas = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="ideas"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-amber-400 font-medium text-sm tracking-wider uppercase">
            Innovation Lab
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Ideas & Ventures
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Problems I've identified and solutions I'm exploring. Some are ready to build, others are in research phase.
            <span className="text-amber-400 font-medium"> Open to collaborations and building together.</span>
          </p>
        </div>

        {/* Ideas Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {ideasData.map((idea, index) => (
            <div
              key={idea.id}
              onClick={() => toggleExpand(idea.id)}
              className={`group p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 cursor-pointer ${
                expandedId === idea.id ? 'border-amber-500/50 bg-slate-800/50' : ''
              } ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:bg-amber-500/20 transition-colors duration-300">
                  <idea.icon size={24} />
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      idea.status === 'Ready to Build'
                        ? 'text-green-400 border-green-500/30'
                        : idea.status === 'Conceptual'
                        ? 'text-amber-400 border-amber-500/30'
                        : 'text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {idea.status}
                  </Badge>
                  {idea.openToBuild && (
                    <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30 text-xs">
                      Open to Build
                    </Badge>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                {idea.title}
              </h3>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {idea.category}
              </span>

              {/* Problem */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-red-400 mb-1">Problem</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {idea.problem}
                </p>
              </div>

              {/* Solution - Expandable */}
              <div className={`mt-4 overflow-hidden transition-all duration-300 ${
                expandedId === idea.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <h4 className="text-sm font-semibold text-green-400 mb-1">Solution</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {idea.solution}
                </p>
              </div>

              {/* Expand hint */}
              <div className="mt-4 text-center">
                <span className="text-xs text-gray-500">
                  {expandedId === idea.id ? 'Click to collapse' : 'Click to see solution'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/10 to-teal-500/10 rounded-full border border-amber-500/20">
            <Lightbulb size={20} className="text-amber-400" />
            <span className="text-gray-300">
              Have a similar idea or want to collaborate? <a href="#contact" className="text-amber-400 font-medium hover:text-amber-300 transition-colors">Let's talk!</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ideas;
