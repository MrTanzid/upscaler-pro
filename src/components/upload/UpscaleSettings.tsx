
import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
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
  );
};

export default UpscaleSettings;
