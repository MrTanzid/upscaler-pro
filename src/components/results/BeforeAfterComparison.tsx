
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface BeforeAfterComparisonProps {
  originalImage: File;
  resultUrl: string;
}

const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({
  originalImage,
  resultUrl,
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
  );
};

export default BeforeAfterComparison;
