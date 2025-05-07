
import React from 'react';
import { SlidersHorizontal, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UpscaleSettings as UpscaleSettingsType } from '@/types';

interface UpscaleSettingsProps {
  settings: UpscaleSettingsType;
  onSettingsChange: (settings: UpscaleSettingsType) => void;
}

const UpscaleSettings: React.FC<UpscaleSettingsProps> = ({ settings, onSettingsChange }) => {
  // Setting handlers
  const handleScaleChange = (value: string) => {
    onSettingsChange({
      ...settings,
      scale: parseInt(value) as 2 | 4 | 8
    });
  };
  
  const handleDenoiseChange = (value: number[]) => {
    onSettingsChange({
      ...settings,
      denoise: value[0]
    });
  };
  
  const handleAspectRatioChange = (checked: boolean) => {
    onSettingsChange({
      ...settings,
      preserveAspectRatio: checked
    });
  };

  return (
    <Card className="transition-all duration-500 shadow-2xl hover:shadow-primary/20 bg-gradient-to-br from-white to-red-50 animate-scale-in" style={{animationDelay: '0.4s'}}>
      <CardContent className="p-6">
        <div className="flex items-center mb-5">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">Enhancement Settings</h3>
            <p className="text-sm text-gray-500">Customize your upscaling experience</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Scale Factor */}
          <div className="bg-white/80 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{animationDelay: '0.5s'}}>
            <Label htmlFor="scale" className="block mb-3 font-medium flex items-center gap-2">
              <Sparkles size={16} className="text-primary" /> Scale Factor
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
                  <SelectItem value="8">8× (Ultra HD, slower processing)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[2, 4, 8].map(scale => (
                <div 
                  key={scale} 
                  className={`text-center p-2 rounded cursor-pointer transition-all ${
                    settings.scale === scale 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                  onClick={() => handleScaleChange(scale.toString())}
                >
                  {scale}×
                </div>
              ))}
            </div>
          </div>
          
          {/* Denoise Slider */}
          <div className="bg-white/80 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex justify-between items-center mb-3">
              <Label htmlFor="denoise" className="font-medium flex items-center gap-2">
                <Sparkles size={16} className="text-primary" /> Denoise Level
              </Label>
              <span 
                className={`text-sm font-semibold px-3 py-1 rounded-full animate-pulse ${
                  settings.denoise < 30 
                    ? 'bg-green-100 text-green-800' 
                    : settings.denoise > 70 
                      ? 'bg-primary/20 text-primary' 
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
              className="my-6"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span className="bg-green-50 px-3 py-1 rounded-full border border-green-100">Subtle</span>
              <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Medium</span>
              <span className="bg-red-50 px-3 py-1 rounded-full border border-red-100">Strong</span>
            </div>
          </div>
          
          {/* Aspect Ratio Checkbox */}
          <div className="flex items-center space-x-4 bg-white/80 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{animationDelay: '0.7s'}}>
            <Checkbox 
              id="aspectRatio" 
              checked={settings.preserveAspectRatio} 
              onCheckedChange={(checked: boolean) => handleAspectRatioChange(checked)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <div>
              <Label htmlFor="aspectRatio" className="font-medium">
                Preserve Aspect Ratio
              </Label>
              <p className="text-sm text-gray-500">Maintain original image proportions</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpscaleSettings;
