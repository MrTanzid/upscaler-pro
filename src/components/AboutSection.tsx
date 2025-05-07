
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ZapIcon, Settings, Lock } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Powered by state-of-the-art ESRGAN (Enhanced Super-Resolution Generative Adversarial Network) technology,
          our AI model is specifically trained to intelligently enhance low-resolution images while preserving details.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Fast & Accurate Card */}
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ZapIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Fast & Accurate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Our algorithm processes images quickly while maintaining exceptional accuracy, recognizing complex patterns and recreating them in higher resolution.
            </p>
          </CardContent>
        </Card>
        
        {/* Customizable Denoise Card */}
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Customizable Denoise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Fine-tune noise reduction strength to balance detail preservation and smoothness, giving you complete control over the final result.
            </p>
          </CardContent>
        </Card>
        
        {/* Secure & Private Card */}
        <Card className="feature-card">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle>Secure & Private</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Your images are processed securely and never stored permanently. We prioritize your privacy with end-to-end encryption.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-3">Ready to enhance your images?</h3>
        <p className="mb-6 text-gray-600">
          Experience the difference our AI upscaling can make to your photos, graphics, and digital art.
        </p>
        <button
          onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Start Upscaling
        </button>
      </div>
    </div>
  );
};

export default AboutSection;
