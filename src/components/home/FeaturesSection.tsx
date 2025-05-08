
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { WandSparkles, SlidersHorizontal, Lock, Zap, CheckCircle, ImageIcon } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const handleScrollToUpload = () => {
    document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 px-4">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-red-400 rounded-full"></div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 red-gradient-text">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Powered by state-of-the-art ESRGAN AI technology, our model intelligently enhances low-resolution images 
          while preserving natural details and textures.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Feature Cards */}
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-red-50 animate-scale-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transform transition-transform rotate-3 animate-float">
              <WandSparkles className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">AI-Powered Enhancement</h3>
            <p className="text-gray-600">
              Our advanced algorithms recognize patterns and details in your images, recreating them in higher resolution with impressive accuracy.
            </p>
          </CardContent>
        </Card>
        
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-red-50 transform translate-y-4 animate-scale-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-4 transform transition-transform -rotate-3 animate-float">
              <SlidersHorizontal className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Advanced Controls</h3>
            <p className="text-gray-600">
              Fine-tune noise reduction, sharpening, and scaling to get exactly the results you want with our intuitive controls.
            </p>
          </CardContent>
        </Card>
        
        <Card className="feature-card border-none overflow-hidden bg-gradient-to-br from-white to-red-50 animate-scale-in" style={{animationDelay: '0.6s'}}>
          <CardContent className="p-6">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 transform transition-transform rotate-3 animate-float">
              <Lock className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Private & Secure</h3>
            <p className="text-gray-600">
              Your images are processed securely and never stored permanently. We prioritize your privacy with end-to-end encryption.
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Process steps */}
      <div className="mt-20 bg-white/80 p-8 rounded-xl shadow-lg animate-fade-in" style={{animationDelay: '0.8s'}}>
        <h3 className="text-2xl font-bold mb-10 text-center">Simple 4-Step Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              icon: <ImageIcon className="h-8 w-8 text-primary" />,
              title: "Upload Image",
              description: "Select your low-resolution image"
            },
            {
              icon: <SlidersHorizontal className="h-8 w-8 text-primary" />,
              title: "Adjust Settings",
              description: "Customize enhancement options"
            },
            {
              icon: <Zap className="h-8 w-8 text-primary" />,
              title: "AI Processing",
              description: "Our ESRGAN model enhances your image"
            },
            {
              icon: <CheckCircle className="h-8 w-8 text-primary" />,
              title: "Get Results",
              description: "Download your enhanced masterpiece"
            }
          ].map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4 relative animate-slide-up" style={{animationDelay: `${1.0 + i * 0.2}s`}}>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 animate-float" style={{animationDelay: `${i * 0.5}s`}}>
                {step.icon}
              </div>
              <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
              <p className="text-sm text-gray-600">{step.description}</p>
              
              {i < 3 && (
                <div className="hidden md:block absolute top-1/3 right-0 transform translate-x-1/2">
                  <svg width="30" height="8" viewBox="0 0 30 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3536 4.35355C29.5488 4.15829 29.5488 3.84171 29.3536 3.64645L26.1716 0.464466C25.9763 0.269204 25.6597 0.269204 25.4645 0.464466C25.2692 0.659728 25.2692 0.976311 25.4645 1.17157L28.2929 4L25.4645 6.82843C25.2692 7.02369 25.2692 7.34027 25.4645 7.53553C25.6597 7.7308 25.9763 7.7308 26.1716 7.53553L29.3536 4.35355ZM0 4.5H29V3.5H0V4.5Z" fill="#EA384C"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
