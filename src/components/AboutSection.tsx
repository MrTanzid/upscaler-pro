
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WandSparkles, SlidersHorizontal, Lock, ArrowUp, Image } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary-hover rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-gradient-to-r from-primary to-primary-hover bg-clip-text">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Powered by state-of-the-art ESRGAN (Enhanced Super-Resolution Generative Adversarial Network) technology,
          our AI model is specifically trained to intelligently enhance low-resolution images while preserving details.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fast & Accurate Card */}
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-blue-50">
          <CardHeader className="pb-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transform transition-transform rotate-3">
              <WandSparkles className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold">Fast & Accurate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our algorithm processes images quickly while maintaining exceptional accuracy, recognizing complex patterns and recreating them in higher resolution.
            </p>
          </CardContent>
        </Card>
        
        {/* Customizable Denoise Card */}
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-purple-50 transform translate-y-4">
          <CardHeader className="pb-2">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 transform transition-transform -rotate-3">
              <SlidersHorizontal className="h-7 w-7 text-purple-600" />
            </div>
            <CardTitle className="text-xl font-bold">Customizable Denoise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Fine-tune noise reduction strength to balance detail preservation and smoothness, giving you complete control over the final result.
            </p>
          </CardContent>
        </Card>
        
        {/* Secure & Private Card */}
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-green-50">
          <CardHeader className="pb-2">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 transform transition-transform rotate-3">
              <Lock className="h-7 w-7 text-green-600" />
            </div>
            <CardTitle className="text-xl font-bold">Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your images are processed securely and never stored permanently. We prioritize your privacy with end-to-end encryption.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Process explanation */}
      <div className="mt-16 bg-white/80 p-8 rounded-xl shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">The Upscaling Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: <Image className="h-8 w-8 text-primary" />,
              title: "Upload Image",
              description: "Select your low-resolution image file"
            },
            {
              icon: <SlidersHorizontal className="h-8 w-8 text-primary" />,
              title: "Configure Settings",
              description: "Adjust scale factor and denoise strength"
            },
            {
              icon: <WandSparkles className="h-8 w-8 text-primary" />,
              title: "AI Processing",
              description: "Our ESRGAN model enhances your image"
            },
            {
              icon: <ArrowUp className="h-8 w-8 text-primary" />,
              title: "Download Result",
              description: "Get your high-resolution masterpiece"
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 relative">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                {step.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
              
              {i < 3 && (
                <div className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="#1A73E8" fillOpacity="0.2" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-3">Ready to enhance your images?</h3>
        <p className="mb-6 text-gray-600">
          Experience the difference our AI upscaling can make to your photos, graphics, and digital art.
        </p>
        <button
          onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-gradient-to-r from-primary to-primary-hover text-white px-8 py-3 rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105"
        >
          Start Upscaling
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
