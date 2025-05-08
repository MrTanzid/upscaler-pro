
import React from 'react';
import { Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
  const handleScrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mt-20 text-center animate-fade-in" style={{animationDelay: '1.8s'}}>
      <h3 className="text-2xl font-semibold mb-4">Ready to enhance your images?</h3>
      <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
        Transform your photos, graphics, and digital art into stunning high-resolution masterpieces.
      </p>
      <button
        onClick={handleScrollToUpload}
        className="px-8 py-3 bg-gradient-to-r from-primary to-red-400 text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 animate-pulse-red"
      >
        <Sparkles className="inline-block mr-2 h-5 w-5" /> Start Enhancing Now
      </button>
    </div>
  );
};

export default CTASection;
