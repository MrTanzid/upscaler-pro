
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

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
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Upscaling Complete!</h2>
        <p className="text-gray-600 text-lg">
          Drag the slider to compare the original and upscaled images
        </p>
      </div>
      
      {/* Before/After Comparison */}
      <div 
        id="comparison-container" 
        className="comparison-slider mb-8 relative rounded-lg shadow-lg"
        style={{ height: '400px' }}
      >
        <div className="image-compare-wrapper">
          <div className="image-compare-before">
            <img 
              src={originalPreview} 
              alt="Original image" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div 
            className="image-compare-after"
            style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
          >
            <img 
              src={resultUrl} 
              alt="Upscaled image" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          <div 
            className="image-compare-slider"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
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
        
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
          Original
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded">
          Upscaled
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button 
          variant="default"
          className="w-full sm:w-auto"
          size="lg"
          onClick={() => window.open(resultUrl, '_blank')}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Upscaled Image
        </Button>
        
        <Button 
          variant="outline"
          className="w-full sm:w-auto"
          size="lg"
          onClick={onReset}
        >
          Process Another Image
        </Button>
      </div>
    </div>
  );
};

export default ResultsSection;
