import React, { useEffect, useRef, useState } from 'react';
import { educationData } from '../../data/mock';
import { GraduationCap, MapPin, Calendar, BookOpen } from 'lucide-react';

const Education = () => {
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

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-24 bg-slate-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-teal-400 font-medium text-sm tracking-wider uppercase">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Education
          </h2>
        </div>

        {/* Education Cards */}
        <div className="max-w-4xl mx-auto space-y-6">
          {educationData.map((edu, index) => (
            <div
              key={edu.id}
              className={`relative p-6 md:p-8 bg-slate-800/30 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-500 group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              {/* Current Badge */}
              {index === 0 && (
                <div className="absolute -top-3 right-6">
                  <span className="px-3 py-1 bg-teal-500 text-white text-xs font-medium rounded-full">
                    Current
                  </span>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="p-4 bg-teal-500/10 rounded-2xl text-teal-400 group-hover:bg-teal-500/20 transition-colors duration-300">
                    <GraduationCap size={32} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-teal-400 font-medium mb-4">
                    {edu.institution}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mb-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-teal-400" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-teal-400" />
                      <span>{edu.period}</span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-teal-400" />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2">
                    {edu.specializations.map((spec, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3 py-1 bg-slate-900/50 text-gray-400 text-xs font-medium rounded-full border border-slate-700/50"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
