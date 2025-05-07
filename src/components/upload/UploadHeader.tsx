
import React from 'react';
import { ArrowUp } from 'lucide-react';

const UploadHeader: React.FC = () => {
  return (
    <div className="text-center mb-10">
      <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
        <ArrowUp className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-primary-hover bg-clip-text">
        High-Quality Image Upscaler
      </h1>
      <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
        Transform your low-res images into clear, detailed masterpieces using our advanced AI.
      </p>
    </div>
  );
};

export default UploadHeader;
