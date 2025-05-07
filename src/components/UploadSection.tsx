
import React, { useState } from 'react';
import { UpscaleSettings } from '../types';
import UploadHeader from './upload/UploadHeader';
import FileUploader from './upload/FileUploader';
import UpscaleSettingsComponent from './upload/UpscaleSettings';
import UpscaleButton from './upload/UpscaleButton';
import FeaturePreview from './upload/FeaturePreview';

interface UploadSectionProps {
  onStartProcessing: (file: File, settings: UpscaleSettings) => void;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onStartProcessing }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [settings, setSettings] = useState<UpscaleSettings>({
    scale: 2,
    denoise: 50,
    preserveAspectRatio: true
  });
  
  // Handle file selection
  const handleFileChange = (file: File | null, previewUrl: string | null) => {
    setSelectedFile(file);
    setPreview(previewUrl);
  };
  
  // Handle settings changes
  const handleSettingsChange = (newSettings: UpscaleSettings) => {
    setSettings(newSettings);
  };
  
  // Start processing
  const handleUpscale = () => {
    if (selectedFile) {
      onStartProcessing(selectedFile, settings);
    }
  };

  // Feature items for the feature preview section
  const features = [
    { icon: "⚡", title: "Lightning Fast", text: "Process images in seconds" },
    { icon: "🔍", title: "AI Enhanced", text: "Superior quality upscaling" },
    { icon: "🎮", title: "Easy to Use", text: "Simple, intuitive controls" },
  ];
  
  return (
    <div className="max-w-5xl mx-auto px-4">
      <UploadHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* File upload area */}
        <FileUploader 
          onFileChange={handleFileChange}
          selectedFile={selectedFile}
          preview={preview}
        />
        
        {/* Settings panel */}
        <UpscaleSettingsComponent
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />
      </div>
      
      {/* Upscale button */}
      <UpscaleButton 
        hasFile={!!selectedFile} 
        onUpscale={handleUpscale} 
      />
      
      {/* Features preview */}
      <FeaturePreview features={features} />
    </div>
  );
};

export default UploadSection;
