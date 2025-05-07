
import React from 'react';
import { WandSparkles } from 'lucide-react';

const UploadHeader: React.FC = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="inline-block p-3 bg-primary/10 rounded-full mb-3 animate-pulse-red">
        <WandSparkles className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 red-gradient-text animate-slide-up" style={{animationDelay: '0.2s'}}>
        Magic Image Upscaler
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.4s'}}>
        Transform your low-res images into crystal-clear, stunning visuals using our 
        <span className="font-semibold text-primary"> AI-powered technology</span>
      </p>
      <div className="flex justify-center mt-6 gap-4 animate-slide-up" style={{animationDelay: '0.6s'}}>
        <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Instant Processing
        </div>
        <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          AI Enhanced
        </div>
        <div className="bg-white/90 px-3 py-1 rounded-full text-xs font-medium text-gray-600 shadow-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          100% Free
        </div>
      </div>
    </div>
  );
};

export default UploadHeader;
