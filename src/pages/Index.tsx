
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadSection from '../components/UploadSection';
import ProcessingModal from '../components/ProcessingModal';
import ResultsSection from '../components/ResultsSection';
import { Section, UpscaleSettings } from '../types';
import { Sparkles, Image as ImageIcon, Zap, CheckCircle, SlidersHorizontal, WandSparkles, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Define sections
const sections: Section[] = [
  { id: 'home', title: 'Home' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [processingFile, setProcessingFile] = useState<File | null>(null);
  const [processingSettings, setProcessingSettings] = useState<UpscaleSettings | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedResult, setProcessedResult] = useState<{
    jobId: string;
    resultUrl: string;
    originalFile: File;
  } | null>(null);

  // Handle starting the processing workflow
  const handleStartProcessing = (file: File, settings: UpscaleSettings) => {
    setProcessingFile(file);
    setProcessingSettings(settings);
    setIsProcessing(true);
  };

  // Handle processing completion
  const handleProcessingSuccess = (jobId: string, resultUrl: string) => {
    if (processingFile) {
      setProcessedResult({
        jobId,
        resultUrl,
        originalFile: processingFile,
      });
    }
    setIsProcessing(false);
  };

  // Handle processing cancellation/errors
  const handleProcessingClose = () => {
    setIsProcessing(false);
  };

  // Reset to upload state
  const handleReset = () => {
    setProcessedResult(null);
    setProcessingFile(null);
    setProcessingSettings(null);
  };

  // Scroll to sections on page load or active section change
  useEffect(() => {
    if (activeSection === 'home' || activeSection === 'upload') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSection]);

  // Determine which section to render based on state and activeSection
  const renderContent = () => {
    // If we have processed results, show them
    if (processedResult && processingSettings) {
      return (
        <ResultsSection
          originalImage={processedResult.originalFile}
          resultUrl={processedResult.resultUrl}
          jobId={processedResult.jobId}
          onReset={handleReset}
          settings={processingSettings}
        />
      );
    }

    // Otherwise show the upload section
    return (
      <div id="upload-section">
        <UploadSection onStartProcessing={handleStartProcessing} />
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        sections={sections}
      />
      
      <main className="flex-grow py-10 px-4">
        {/* Hero Section */}
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
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
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
        
        {/* Main content - Uploader or Results */}
        {renderContent()}
        
        {/* Feature section moved from About */}
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
          
          {/* Testimonials */}
          <div className="mt-24 text-center">
            <h3 className="text-3xl font-bold mb-10 red-gradient-text">What Users Are Saying</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote: "This tool saved my old family photos. The enhancement is incredible!",
                  name: "Sarah Johnson",
                  role: "Photographer"
                },
                {
                  quote: "I've tried many upscalers and this one provides the most natural results by far.",
                  name: "Mark Chen",
                  role: "Graphic Designer"
                },
                {
                  quote: "Impressive AI technology that actually delivers on its promise. Highly recommended!",
                  name: "Lisa Rodriguez",
                  role: "Digital Artist"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-scale-in" style={{animationDelay: `${1.2 + i * 0.2}s`}}>
                  <div className="text-4xl text-primary mb-4">"</div>
                  <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ml-2 text-left">
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Final CTA */}
          <div className="mt-20 text-center animate-fade-in" style={{animationDelay: '1.8s'}}>
            <h3 className="text-2xl font-semibold mb-4">Ready to enhance your images?</h3>
            <p className="mb-8 text-gray-600 max-w-2xl mx-auto">
              Transform your photos, graphics, and digital art into stunning high-resolution masterpieces.
            </p>
            <button
              onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-gradient-to-r from-primary to-red-400 text-white rounded-full text-lg font-medium hover:shadow-lg hover:shadow-primary/30 transition-all hover:scale-105 animate-pulse-red"
            >
              <Sparkles className="inline-block mr-2 h-5 w-5" /> Start Enhancing Now
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Processing Modal */}
      {isProcessing && processingFile && processingSettings && (
        <ProcessingModal
          isOpen={isProcessing}
          file={processingFile}
          settings={processingSettings}
          onClose={handleProcessingClose}
          onSuccess={handleProcessingSuccess}
        />
      )}
    </div>
  );
};

export default Index;
