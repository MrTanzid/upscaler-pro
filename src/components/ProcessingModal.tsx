
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { uploadAndUpscale, checkJobStatus, simulateUpscaling, processImageWithPicsart } from '../services/api';
import { UpscaleSettings, JobStatus } from '../types';

interface ProcessingModalProps {
  isOpen: boolean;
  file: File;
  settings: UpscaleSettings;
  onClose: () => void;
  onSuccess: (jobId: string, resultUrl: string) => void;
}

const ProcessingModal: React.FC<ProcessingModalProps> = ({
  isOpen,
  file,
  settings,
  onClose,
  onSuccess,
}) => {
  const [status, setStatus] = useState<string>('Uploading...');
  const [progress, setProgress] = useState<number>(0);
  const [jobId, setJobId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isOpen) return;
    
    const processFile = async () => {
      try {
        // Step 1: Initialize the job
        setStatus('Uploading to server...');
        setProgress(20);
        
        const uploadResponse = await uploadAndUpscale({
          file,
          scale: settings.scale,
          denoise: settings.denoise,
          aspect_ratio: settings.preserveAspectRatio,
        });
        
        setJobId(uploadResponse.job_id);
        
        // Step 2: Start the actual processing with Picsart
        setStatus('Processing with AI...');
        setProgress(40);
        
        // Process the image with Picsart API
        const enhancedImageUrl = await processImageWithPicsart(
          file,
          settings.scale
        );
        
        // Update progress
        setStatus('Finalizing...');
        setProgress(100);
        
        // Wait a moment for the progress to show 100%
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Pass the enhanced image URL back
        onSuccess(uploadResponse.job_id, enhancedImageUrl);
        
      } catch (error) {
        console.error('Error during processing', error);
        if ((error as Error).message.includes('Upload')) {
          toast.error('Upload failed. Please retry.');
        } else {
          toast.error('Upscaling failed. Try different settings or try again later.');
        }
        onClose();
      }
    };
    
    processFile();
  }, [isOpen, file, settings, onClose, onSuccess]);
  
  // Helper function to read file as data URL
  const readFileAsDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-live="polite" aria-busy="true">
        <div className="py-6">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4">
              <Loader className="h-10 w-10 text-primary animate-spin" />
            </div>
            <h3 className="text-xl font-semibold mb-4">{status}</h3>
            <div className="w-full max-w-xs mb-2">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-gray-500">{Math.round(progress)}%</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessingModal;
