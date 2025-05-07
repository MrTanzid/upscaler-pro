
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { UpscaleSettings } from '../types';

interface UploadSectionProps {
  onStartProcessing: (file: File, settings: UpscaleSettings) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onStartProcessing }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [settings, setSettings] = useState<UpscaleSettings>({
    scale: 2,
    denoise: 50,
    preserveAspectRatio: true
  });
  
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
    
    setSelectedFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
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
  
  // Setting handlers
  const handleScaleChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      scale: parseInt(value) as 2 | 4 | 8
    }));
  };
  
  const handleDenoiseChange = (value: number[]) => {
    setSettings(prev => ({
      ...prev,
      denoise: value[0]
    }));
  };
  
  const handleAspectRatioChange = (checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      preserveAspectRatio: checked
    }));
  };
  
  // Start processing
  const handleUpscale = () => {
    if (selectedFile) {
      onStartProcessing(selectedFile, settings);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">High-Quality Image Upscaler</h1>
        <p className="text-gray-600 text-lg">
          Transform your low-res images into clear, detailed masterpieces.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File upload area */}
        <div>
          <div
            className={`drop-area rounded-lg p-8 h-64 flex flex-col items-center justify-center cursor-pointer ${
              isDragging ? 'active' : ''
            }`}
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
                  className="max-h-full max-w-full object-contain rounded"
                />
                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow">
                  <Button variant="ghost" size="icon" aria-label="Change image">
                    <Upload size={16} />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Image size={48} className="text-gray-400 mb-4" />
                <p className="text-gray-500 text-center mb-2">
                  Drag & drop your image here or click to browse
                </p>
                <p className="text-gray-400 text-sm text-center">
                  JPEG or PNG, up to 10MB
                </p>
              </>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/jpeg,image/png"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </div>
        </div>
        
        {/* Settings panel */}
        <div className="bg-secondary p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Upscale Settings</h3>
          
          <div className="space-y-6">
            {/* Scale Factor */}
            <div>
              <Label htmlFor="scale" className="block mb-2">
                Scale Factor
              </Label>
              <Select 
                value={settings.scale.toString()} 
                onValueChange={handleScaleChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select scale factor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Scale Options</SelectLabel>
                    <SelectItem value="2">2× (Good for minor enhancements)</SelectItem>
                    <SelectItem value="4">4× (Recommended)</SelectItem>
                    <SelectItem value="8">8× (High detail, slower processing)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Denoise Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="denoise">Denoise Strength</Label>
                <span className="text-sm text-gray-500">{settings.denoise}%</span>
              </div>
              <Slider
                id="denoise"
                min={0}
                max={100}
                step={1}
                value={[settings.denoise]}
                onValueChange={handleDenoiseChange}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Low</span>
                <span>Medium</span>
                <span>High</span>
              </div>
            </div>
            
            {/* Aspect Ratio Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="aspectRatio" 
                checked={settings.preserveAspectRatio} 
                onCheckedChange={(checked: boolean) => handleAspectRatioChange(checked)}
              />
              <Label htmlFor="aspectRatio">Preserve Aspect Ratio</Label>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upscale button */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          className="w-full sm:w-auto px-8 py-6 text-lg"
          disabled={!selectedFile}
          onClick={handleUpscale}
        >
          Upscale Now
        </Button>
      </div>
    </div>
  );
};

export default UploadSection;
