import React, { useEffect, useRef, useState } from 'react';
import { profileData, certificationsData } from '../../data/mock';
import { Award, Cloud, GraduationCap, Briefcase, Code2, Brain, FileText, ExternalLink } from 'lucide-react';

const iconMap = {
  Cloud: Cloud,
  Award: Award,
  GraduationCap: GraduationCap,
  FileText: FileText,
};

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Briefcase, value: '3+', label: 'Years Experience' },
    { icon: Code2, value: '75%', label: 'Process Automation' },
    { icon: Brain, value: '10+', label: 'AI/ML Projects' },
    { icon: Cloud, value: 'AWS', label: 'Certified Architect' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-teal-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-teal-400 font-medium text-sm tracking-wider uppercase">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Crafting AI Solutions with Impact
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {profileData.bio}
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Currently pursuing my Master's in Computer Science at the University of Houston, 
              I'm passionate about pushing the boundaries of LLM inference optimization and 
              building scalable AI systems that solve real-world problems.
            </p>

            {/* Certifications */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg mb-4">Certifications & Awards</h3>
              <div className="grid gap-3">
                {certificationsData.map((cert) => {
                  const IconComponent = iconMap[cert.icon] || Award;
                  const content = (
                    <>
                      <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400 group-hover:bg-teal-500/20 transition-colors duration-300">
                        <IconComponent size={20} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium flex items-center gap-2">
                          {cert.name}
                          {cert.link && <ExternalLink size={14} className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
                        </h4>
                        <p className="text-gray-400 text-sm">{cert.issuer}</p>
                      </div>
                    </>
                  );

                  return cert.link ? (
                    <a
                      key={cert.id}
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 group cursor-pointer"
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      key={cert.id}
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 group"
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="p-6 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 group text-center"
                >
                  <div className="inline-flex p-3 bg-teal-500/10 rounded-xl text-teal-400 mb-4 group-hover:bg-teal-500/20 transition-colors duration-300">
                    <stat.icon size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Quick Info Card */}
            <div className="mt-6 p-6 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl border border-teal-500/20">
              <h3 className="text-white font-semibold mb-4">What I Do</h3>
              <ul className="space-y-3">
                {[
                  'Design and architect RAG pipelines',
                  'Build production-grade GenAI applications',
                  'Optimize LLM inference for scale',
                  'Implement MLOps best practices',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <span className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
