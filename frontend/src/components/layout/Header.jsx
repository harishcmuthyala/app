import React, { useState, useEffect } from 'react';
import { navLinks, profileData } from '../../data/mock';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleResumeDownload = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/resume/download`, null, {
        params: { user_agent: navigator.userAgent }
      });
    } catch (error) {
      console.error('Error tracking download:', error);
    }
    window.open(profileData.resumeUrl, '_blank');
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="text-2xl font-bold text-white hover:text-teal-400 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
          >
            HM<span className="text-teal-400">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={profileData.resumeUrl}
              onClick={handleResumeDownload}
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium relative group flex items-center gap-1 cursor-pointer"
            >
              <Download size={14} />
              Resume
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full" />
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25"
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="block text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href={profileData.resumeUrl}
              onClick={handleResumeDownload}
              className="block text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium py-2 flex items-center gap-2 cursor-pointer"
            >
              <Download size={14} />
              Download Resume
            </a>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full"
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
