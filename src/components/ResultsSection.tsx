
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, ZoomIn } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ResultsSectionProps {
  originalImage: File;
  resultUrl: string;
  jobId: string;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  originalImage,
  resultUrl,
  jobId,
  onReset,
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
  
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-block p-2 bg-green-100 rounded-full mb-2">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Upscaling Complete!
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your image has been enhanced! Drag the slider to compare the original and upscaled versions.
        </p>
      </div>
      
      {/* Before/After Comparison */}
      <Card className="mb-12 shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
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
          
          <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
            Original
          </div>
          <div className="absolute top-4 right-4 bg-primary bg-opacity-90 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
            Upscaled
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
            onClick={toggleZoom}
          >
            <ZoomIn size={16} className="mr-1" /> {zoomLevel === 1 ? 'Zoom In' : 'Zoom Out'}
          </Button>
        </div>
      </Card>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Button 
          variant="default"
          className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg hover:shadow-primary/30 transform transition-transform hover:scale-105"
          size="lg"
          onClick={() => window.open(resultUrl, '_blank')}
        >
          <Download className="mr-2 h-5 w-5" />
          Download Upscaled Image
        </Button>
        
        <Button 
          variant="outline"
          className="w-full sm:w-auto border-2 hover:bg-secondary/50"
          size="lg"
          onClick={onReset}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Process Another Image
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
