
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ResultsActionsProps {
  resultUrl: string;
  onReset: () => void;
}

const ResultsActions: React.FC<ResultsActionsProps> = ({ resultUrl, onReset }) => {
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
  );
};

export default ResultsActions;
