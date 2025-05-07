
import React from 'react';
import { Section } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sections: Section[];
}

const Header: React.FC<HeaderProps> = ({ activeSection, setActiveSection, sections }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary">
            <span className="cursor-pointer" onClick={() => setActiveSection('home')}>
              UpscalerPro
            </span>
          </h1>
        </div>
        
        <nav className="flex items-center space-x-1 md:space-x-4">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-3 py-2 text-sm md:text-base font-medium rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
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
