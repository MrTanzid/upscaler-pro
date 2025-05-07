
import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image, ArrowUp, WandSparkles, SlidersHorizontal } from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-10">
        <div className="inline-block p-2 bg-primary/10 rounded-full mb-2">
          <ArrowUp className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-gradient-to-r from-primary to-primary-hover bg-clip-text">
          High-Quality Image Upscaler
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
          Transform your low-res images into clear, detailed masterpieces using our advanced AI.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File upload area */}
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
        
        {/* Settings panel */}
        <Card className="transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-secondary to-white">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <SlidersHorizontal className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-semibold">Upscale Settings</h3>
            </div>
            
            <div className="space-y-6">
              {/* Scale Factor */}
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <Label htmlFor="scale" className="block mb-2 font-medium">
                  Scale Factor
                </Label>
                <Select 
                  value={settings.scale.toString()} 
                  onValueChange={handleScaleChange}
                >
                  <SelectTrigger className="w-full bg-white">
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
              <div className="bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="denoise" className="font-medium">Denoise Strength</Label>
                  <span 
                    className={`text-sm font-semibold px-2 py-0.5 rounded ${
                      settings.denoise < 30 
                        ? 'bg-green-100 text-green-800' 
                        : settings.denoise > 70 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {settings.denoise}%
                  </span>
                </div>
                <Slider
                  id="denoise"
                  min={0}
                  max={100}
                  step={1}
                  value={[settings.denoise]}
                  onValueChange={handleDenoiseChange}
                  className="my-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="bg-green-50 px-2 py-0.5 rounded">Low</span>
                  <span className="bg-blue-50 px-2 py-0.5 rounded">Medium</span>
                  <span className="bg-red-50 px-2 py-0.5 rounded">High</span>
                </div>
              </div>
              
              {/* Aspect Ratio Checkbox */}
              <div className="flex items-center space-x-3 bg-white/80 p-4 rounded-lg shadow-sm">
                <Checkbox 
                  id="aspectRatio" 
                  checked={settings.preserveAspectRatio} 
                  onCheckedChange={(checked: boolean) => handleAspectRatioChange(checked)}
                />
                <Label htmlFor="aspectRatio" className="font-medium">
                  Preserve Aspect Ratio
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Upscale button */}
      <div className="mt-8 flex justify-center">
        <Button
          size="lg"
          className={`px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 ${
            selectedFile 
              ? 'bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg hover:shadow-primary/30 hover:scale-105' 
              : 'opacity-70'
          }`}
          disabled={!selectedFile}
          onClick={handleUpscale}
        >
          <WandSparkles className="mr-2" /> Upscale Now
        </Button>
      </div>
      
      {/* Features preview */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        {[
          { icon: "⚡", title: "Lightning Fast", text: "Process images in seconds" },
          { icon: "🔍", title: "AI Enhanced", text: "Superior quality upscaling" },
          { icon: "🎮", title: "Easy to Use", text: "Simple, intuitive controls" },
        ].map((feature, i) => (
          <div key={i} className="py-3 px-4 bg-white/50 rounded-lg hover:bg-white/80 transition-all hover:shadow-md">
            <div className="text-2xl mb-1">{feature.icon}</div>
            <h3 className="text-gray-800 font-medium">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadSection;
