import React, { useEffect, useRef, useState } from 'react';
import { skillsData } from '../../data/mock';
import { Progress } from '../ui/progress';
import { Code2, Brain, Cloud, Wrench } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProgress(true), 500);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: 'Languages & Frameworks',
      icon: Code2,
      skills: skillsData.languages,
      color: 'teal',
    },
    {
      title: 'AI & Machine Learning',
      icon: Brain,
      skills: skillsData.aiml,
      color: 'cyan',
    },
    {
      title: 'Cloud & AWS',
      icon: Cloud,
      skills: skillsData.cloud,
      color: 'emerald',
    },
    {
      title: 'Developer Tools',
      icon: Wrench,
      skills: skillsData.tools,
      color: 'sky',
    },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 bg-slate-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-teal-400 font-medium text-sm tracking-wider uppercase">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Technical Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, cIndex) => (
            <div
              key={category.title}
              className={`p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-teal-500/30 transition-all duration-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(cIndex + 1) * 150}ms` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-500/10 rounded-lg text-teal-400">
                  <category.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, sIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium text-sm">
                        {skill.name}
                      </span>
                      <span className="text-teal-400 text-sm font-medium">
                        {animateProgress ? skill.level : 0}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animateProgress ? `${skill.level}%` : '0%',
                          transitionDelay: `${(cIndex * 4 + sIndex) * 50}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-white font-semibold mb-4">Also Proficient In</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Problem Solving',
              'Communication',
              'Leadership',
              'Agile/Scrum',
              'System Design',
              'Technical Writing',
              'Team Collaboration',
              'Innovation',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-slate-800/50 text-gray-400 rounded-full text-sm border border-slate-700/50 hover:border-teal-500/30 hover:text-teal-400 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
