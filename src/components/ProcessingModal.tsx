
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { uploadAndUpscale, checkJobStatus } from '../services/api';
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
        // Step 1: Upload file and start processing
        setStatus('Uploading...');
        setProgress(20);
        
        const uploadResponse = await uploadAndUpscale({
          file,
          scale: settings.scale,
          denoise: settings.denoise,
          aspect_ratio: settings.preserveAspectRatio,
        });
        
        setJobId(uploadResponse.job_id);
        setStatus('Processing...');
        setProgress(40);
        
        // Step 2: Poll for job status
        let jobStatus: JobStatus = { status: 'pending', progress: 40 };
        
        while (jobStatus.status !== 'completed' && jobStatus.status !== 'failed') {
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          jobStatus = await checkJobStatus(uploadResponse.job_id);
          
          if (jobStatus.status === 'processing') {
            setStatus('Processing...');
            setProgress(Math.min(40 + jobStatus.progress / 2, 90));
          } else if (jobStatus.status === 'completed') {
            setStatus('Finalizing...');
            setProgress(100);
            
            // Wait a moment for the progress to show 100%
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (jobStatus.result_url) {
              onSuccess(uploadResponse.job_id, jobStatus.result_url);
            }
          } else if (jobStatus.status === 'failed') {
            throw new Error(jobStatus.message || 'Processing failed');
          }
        }
      } catch (error) {
        console.error('Error during processing', error);
        if ((error as Error).message.includes('Upload')) {
          toast.error('Upload failed. Please retry.');
        } else {
          toast.error('Upscaling failed. Try different settings.');
        }
        onClose();
      }
    };
    
    processFile();
  }, [isOpen, file, settings, onClose, onSuccess]);
  
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
