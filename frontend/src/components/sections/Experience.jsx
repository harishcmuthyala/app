import React, { useEffect, useRef, useState } from 'react';
import { experienceData } from '../../data/mock';
import { MapPin, Calendar, Building2, ChevronRight } from 'lucide-react';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-teal-400 font-medium text-sm tracking-wider uppercase">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Professional Experience
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Timeline Navigation */}
          <div
            className={`lg:col-span-4 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="space-y-2">
              {experienceData.map((exp, index) => (
                <button
                  key={exp.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                    activeIndex === index
                      ? 'bg-teal-500/10 border border-teal-500/30'
                      : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        activeIndex === index ? 'bg-teal-400' : 'bg-slate-600'
                      } ${
                        exp.type === 'current' ? 'animate-pulse' : ''
                      }`}
                    />
                    <div className="flex-1">
                      <h4
                        className={`font-medium transition-colors duration-300 ${
                          activeIndex === index ? 'text-white' : 'text-gray-400'
                        }`}
                      >
                        {exp.role}
                      </h4>
                      <p className="text-sm text-gray-500">{exp.company}</p>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-all duration-300 ${
                        activeIndex === index
                          ? 'text-teal-400 translate-x-1'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div
            className={`lg:col-span-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            {experienceData.map((exp, index) => (
              <div
                key={exp.id}
                className={`transition-all duration-500 ${
                  activeIndex === index
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute pointer-events-none'
                }`}
              >
                {activeIndex === index && (
                  <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {exp.type === 'current' && (
                            <span className="px-2 py-1 bg-teal-500/10 text-teal-400 text-xs font-medium rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {exp.role}
                        </h3>
                        <p className="text-teal-400 font-medium">{exp.department}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-6 mb-8 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Building2 size={18} className="text-teal-400" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-teal-400" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-teal-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-white font-semibold mb-4">Key Achievements</h4>
                      <ul className="space-y-4">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li
                            key={hIndex}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <span className="w-2 h-2 mt-2 bg-teal-400 rounded-full flex-shrink-0" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
