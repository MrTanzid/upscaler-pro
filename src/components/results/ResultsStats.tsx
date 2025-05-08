
import React from 'react';
import { UpscaleSettings } from '@/types';

interface ResultsStatsProps {
  settings: UpscaleSettings;
}

const ResultsStats: React.FC<ResultsStatsProps> = ({ settings }) => {
  // Calculate processing time based on scale and denoise settings (simulated)
  const calculateProcessingTime = (): string => {
    const baseTime = 1.5; // Base time in seconds
    const scaleMultiplier = settings.scale / 2; // Higher scale = longer processing
    const denoiseImpact = settings.denoise / 100; // Higher denoise = longer processing
    
    const processingTime = baseTime * scaleMultiplier * (1 + denoiseImpact);
    return `${processingTime.toFixed(1)} seconds`;
  };
  
  // Calculate quality score based on settings (simulated)
  const calculateQualityScore = (): string => {
    const baseScore = 8.0;
    const scaleImpact = 0.5 - (settings.scale > 4 ? 0.2 : 0); // Higher scale might reduce quality
    const denoiseImpact = (settings.denoise > 50 ? 0.3 : 0.1); // Optimal denoise improves quality
    
    const qualityScore = Math.min(10, baseScore + scaleImpact + denoiseImpact);
    return `${qualityScore.toFixed(1)}/10`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-scale-in" style={{animationDelay: '0.3s'}}>
      {[
        { label: 'Resolution Increase', value: `${settings.scale}×` },
        { label: 'Noise Reduction', value: `${settings.denoise}%` },
        { label: 'Processing Time', value: calculateProcessingTime() },
        { label: 'Quality Score', value: calculateQualityScore() },
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-lg p-4 text-center shadow-md">
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <p className="text-2xl font-bold red-gradient-text">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultsStats;
