
import React from 'react';
import { UpscaleSettings } from '@/types';
import BeforeAfterComparison from './results/BeforeAfterComparison';
import ResultsStats from './results/ResultsStats';
import ResultsActions from './results/ResultsActions';

interface ResultsSectionProps {
  originalImage: File;
  resultUrl: string;
  jobId: string;
  onReset: () => void;
  settings: UpscaleSettings;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  originalImage,
  resultUrl,
  jobId,
  onReset,
  settings,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-block p-3 bg-green-100 rounded-full mb-3 animate-pulse">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-3 red-gradient-text">
          Enhancement Complete!
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your image has been transformed! Slide the divider to compare before and after.
        </p>
      </div>
      
      {/* Before/After Comparison */}
      <BeforeAfterComparison
        originalImage={originalImage}
        resultUrl={resultUrl}
      />
      
      {/* Statistics */}
      <ResultsStats settings={settings} />
      
      {/* Action buttons */}
      <ResultsActions
        resultUrl={resultUrl}
        onReset={onReset}
      />
    </div>
  );
};

export default ResultsSection;
