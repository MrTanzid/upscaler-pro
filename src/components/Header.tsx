
import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: Section[];
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, sections }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
      scrolled ? 'bg-white/90 shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center animate-fade-in">
          <div className={`flex items-center ${scrolled ? 'scale-90' : ''} transition-transform duration-300`}>
            <div className="mr-3 relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-pulse-red opacity-30"></div>
              <div className="relative bg-gradient-to-r from-primary to-red-400 w-10 h-10 rounded-full flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
            <h1 
              className="text-2xl md:text-3xl font-bold red-gradient-text cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              UpscalerPro
            </h1>
          </div>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-3 animate-fade-in">
          {scrolled && (
            <button
              className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-105"
              onClick={() => {
                document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection('upload');
              }}
            >
              Try Now
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
