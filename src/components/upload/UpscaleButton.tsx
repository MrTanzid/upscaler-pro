
import React from 'react';
import { WandSparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UpscaleButtonProps {
  hasFile: boolean;
  onUpscale: () => void;
}

const UpscaleButton: React.FC<UpscaleButtonProps> = ({ hasFile, onUpscale }) => {
  return (
    <div className="mt-8 flex justify-center">
      <Button
        size="lg"
        className={`px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
          hasFile 
            ? 'bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg hover:shadow-primary/30 hover:scale-105' 
            : 'opacity-70'
        }`}
        disabled={!hasFile}
        onClick={onUpscale}
      >
        <WandSparkles className="mr-2" /> Upscale Now
      </Button>
    </div>
  );
};

export default UpscaleButton;
