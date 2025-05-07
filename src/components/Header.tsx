
import React from 'react';
import { Section } from '../types';
import { Sparkles, Image } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: Section[];
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, sections }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-gradient-to-r from-primary to-primary-hover bg-clip-text">
            <span 
              className="cursor-pointer flex items-center" 
              onClick={() => setActiveSection('home')}
            >
              <Sparkles className="h-6 w-6 mr-2 text-primary" />
              UpscalerPro
            </span>
          </h1>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-4 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-200 ${
                activeSection === section.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 transform hover:scale-105'
                  : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
