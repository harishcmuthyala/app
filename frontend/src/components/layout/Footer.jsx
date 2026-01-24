import React from 'react';
import { profileData } from '../../data/mock';
import { Linkedin, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-bold text-white">
              HM<span className="text-teal-400">.</span>
            </a>
            <p className="text-gray-400 text-sm mt-2">
              Building AI solutions that matter
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 text-gray-400 hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-800 text-gray-400 hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <Github size={20} />
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="p-3 rounded-full bg-slate-800 text-gray-400 hover:bg-teal-500 hover:text-white transition-all duration-300"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            Made with <Heart size={14} className="text-red-500" /> by {profileData.name} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
