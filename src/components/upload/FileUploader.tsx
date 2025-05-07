
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploaderProps {
  onFileChange: (file: File | null, preview: string | null) => void;
  selectedFile: File | null;
  preview: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({ 
  onFileChange,
  selectedFile,
  preview
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file type and size
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Please select a JPEG or PNG image.');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10 MB
      toast.error('File size exceeds 10MB limit.');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      onFileChange(file, reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardContent className="p-0">
        <div
          className={`drop-area min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging ? 'bg-primary/10 border-primary' : 'bg-gray-50'
          } ${preview ? 'p-0' : 'p-8'}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <div className="w-full h-full flex items-center justify-center relative">
              <img
                src={preview}
                alt="Selected image preview"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                  <Upload size={16} className="mr-1" /> Change Image
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Image size={32} className="text-primary" />
              </div>
              <p className="text-gray-700 font-medium text-lg mb-2">
                Drag & drop your image here
              </p>
              <p className="text-gray-500 mb-4">or click to browse files</p>
              <p className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                JPEG or PNG, up to 10MB
              </p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploader;
