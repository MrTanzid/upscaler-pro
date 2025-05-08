
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, ZoomIn, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { UpscaleSettings } from '@/types';

interface ResultsSectionProps {
  originalImage: File;
  resultUrl: string;
  jobId: string;
  onReset: () => void;
  settings: UpscaleSettings; // Add settings property to the interface
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  originalImage,
  resultUrl,
  jobId,
  onReset,
  settings, // Add settings parameter to the component
}) => {
  const [originalPreview, setOriginalPreview] = useState<string>('');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // Create preview URL for original image
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalPreview(reader.result as string);
    };
    reader.readAsDataURL(originalImage);
  }, [originalImage]);
  
  // Handle slider dragging
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const container = document.getElementById('comparison-container');
      if (!container) return;
      
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
      
      setSliderPosition(position);
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const toggleZoom = () => {
    setZoomLevel(zoomLevel === 1 ? 2 : 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out my enhanced image!',
          text: 'I just enhanced an image using UpscalerPro!',
          url: window.location.href
        });
      } catch (error) {
        toast.error('Error sharing the content');
      }
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-3 animate-pulse">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 red-gradient-text">
          Enhancement Complete!
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your image has been transformed! Slide the divider to compare before and after.
        </p>
      </div>
      
      {/* Before/After Comparison */}
      <Card className="mb-12 shadow-2xl overflow-hidden transform transition-all hover:shadow-xl animate-scale-in">
        <div 
          id="comparison-container" 
          className="comparison-slider relative rounded-lg overflow-hidden cursor-move"
          style={{ 
            height: '500px',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'center',
          }}
        >
          <div className="image-compare-wrapper">
            <div className="image-compare-before">
              <img 
                src={originalPreview} 
                alt="Original image" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div 
              className="image-compare-after"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img 
                src={resultUrl} 
                alt="Upscaled image" 
                className="w-full h-full object-contain"
              />
            </div>
            
            <div 
              className="image-compare-slider"
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              role="slider"
              aria-label="Image comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={sliderPosition}
              tabIndex={0}
            >
              <div className="image-compare-handle" />
            </div>
          </div>
          
          <div className="absolute top-4 left-4 bg-black/75 text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
            Original
          </div>
          <div className="absolute top-4 right-4 bg-primary text-white text-sm px-4 py-2 rounded-full backdrop-blur-sm">
            Enhanced
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
            onClick={toggleZoom}
          >
            <ZoomIn size={16} className="mr-2" /> {zoomLevel === 1 ? 'Zoom In' : 'Zoom Out'}
          </Button>
        </div>
      </Card>
      
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-scale-in" style={{animationDelay: '0.3s'}}>
        {[
          { label: 'Resolution Increase', value: `${settings.scale}×` },
          { label: 'Noise Reduction', value: `${settings.denoise}%` },
          { label: 'Processing Time', value: '3 seconds' },
          { label: 'Quality Score', value: '9.5/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-4 text-center shadow-md">
            <p className="text-gray-500 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold red-gradient-text">{stat.value}</p>
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up" style={{animationDelay: '0.5s'}}>
        <Button 
          variant="default"
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-red-400 hover:shadow-lg hover:shadow-primary/30 transform transition-transform hover:scale-105"
          size="lg"
          onClick={() => {
            window.open(resultUrl, '_blank');
            toast.success('Downloading your enhanced image!');
          }}
        >
          <Download className="mr-2 h-5 w-5" />
          Download Enhanced Image
        </Button>
        
        <Button 
          variant="outline"
          className="w-full sm:w-auto border-2 hover:bg-gray-50"
          size="lg"
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Enhance Another Image
        </Button>

        <Button
          variant="secondary"
          className="w-full sm:w-auto"
          size="lg"
          onClick={handleShare}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Result
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
