
import React from 'react';
import { Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const handleScrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-block relative">
          <span className="absolute -top-10 -right-10 text-5xl animate-float">✨</span>
          <span className="inline-block text-6xl md:text-8xl font-extrabold mb-6 red-gradient-text animate-slide-up">
            AI Image Upscaler
          </span>
        </div>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 animate-slide-up" style={{animationDelay: '0.3s'}}>
          Transform low-resolution images into crystal-clear, stunning visuals with our advanced AI technology
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-slide-up" style={{animationDelay: '0.4s'}}>
          <button 
            onClick={handleScrollToUpload}
            className="px-8 py-4 bg-gradient-to-r from-primary to-red-400 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 flex items-center"
          >
            <Sparkles className="mr-2" /> Try it Now - It's Free
          </button>
          <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 text-lg font-semibold rounded-full hover:bg-gray-50 transition-all">
            Learn More
          </button>
        </div>
        
        {/* Example Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 animate-fade-in" style={{animationDelay: '0.7s'}}>
          <div className="relative overflow-hidden rounded-lg group">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Before" className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
              <span className="text-white text-xs font-bold">Before</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg group">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80" 
              alt="After" className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
              <span className="text-white text-xs font-bold">After</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg group">
            <img src="https://images.unsplash.com/photo-1533208087231-c3618eab623c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=70" 
              alt="Before" className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
              <span className="text-white text-xs font-bold">Before</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg group">
            <img src="https://images.unsplash.com/photo-1533208087231-c3618eab623c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=100" 
              alt="After" className="w-full h-32 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
              <span className="text-white text-xs font-bold">After</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
