
import React from 'react';
import { WandSparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpscaleButtonProps {
  hasFile: boolean;
  onUpscale: () => void;
}

const UpscaleButton: React.FC<UpscaleButtonProps> = ({ hasFile, onUpscale }) => {
  return (
    <div className="mt-10 flex justify-center animate-scale-in" style={{animationDelay: '0.8s'}}>
      <Button
        size="lg"
        className={`px-10 py-7 text-lg font-semibold rounded-full transition-all duration-500 ${
          hasFile 
            ? 'bg-gradient-to-r from-primary to-red-400 hover:shadow-lg hover:shadow-primary/30 hover:scale-105' 
            : 'opacity-70'
        }`}
        disabled={!hasFile}
        onClick={onUpscale}
      >
        <WandSparkles className="mr-2" /> 
        Enhance Image 
        <ArrowRight className="ml-2 animate-bounce-subtle" />
      </Button>
    </div>
  );
};

export default UpscaleButton;
