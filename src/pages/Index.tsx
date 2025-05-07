import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadSection from '../components/UploadSection';
import ProcessingModal from '../components/ProcessingModal';
import ResultsSection from '../components/ResultsSection';
import AboutSection from '../components/AboutSection';
import { Section, UpscaleSettings } from '../types';

// Define sections
const sections: Section[] = [
  { id: 'home', title: 'Home' },
  { id: 'upload', title: 'Upload' },
  { id: 'about', title: 'About' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [processingFile, setProcessingFile] = useState<File | null>(null);
  const [processingSettings, setProcessingSettings] = useState<UpscaleSettings | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedResult, setProcessedResult] = useState<{
    jobId: string;
    resultUrl: string;
    originalFile: File;
  } | null>(null);

  // Handle starting the processing workflow
  const handleStartProcessing = (file: File, settings: UpscaleSettings) => {
    setProcessingFile(file);
    setProcessingSettings(settings);
    setIsProcessing(true);
  };

  // Handle processing completion
  const handleProcessingSuccess = (jobId: string, resultUrl: string) => {
    if (processingFile) {
      setProcessedResult({
        jobId,
        resultUrl,
        originalFile: processingFile,
      });
    }
    setIsProcessing(false);
  };

  // Handle processing cancellation/errors
  const handleProcessingClose = () => {
    setIsProcessing(false);
  };

  // Reset to upload state
  const handleReset = () => {
    setProcessedResult(null);
    setProcessingFile(null);
    setProcessingSettings(null);
  };

  // Determine which section to render based on state and activeSection
  const renderContent = () => {
    // If we have processed results, show them regardless of active section
    if (processedResult) {
      return (
        <ResultsSection
          originalImage={processedResult.originalFile}
          resultUrl={processedResult.resultUrl}
          jobId={processedResult.jobId}
          onReset={handleReset}
        />
      );
    }

    // Otherwise show the content based on active section
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'home':
      case 'upload':
      default:
        return (
          <div id="upload-section">
            <UploadSection onStartProcessing={handleStartProcessing} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        sections={sections}
      />
      
      <main className="flex-grow py-8 px-4">
        {renderContent()}
      </main>
      
      <Footer />
      
      {/* Processing Modal */}
      {isProcessing && processingFile && processingSettings && (
        <ProcessingModal
          isOpen={isProcessing}
          file={processingFile}
          settings={processingSettings}
          onClose={handleProcessingClose}
          onSuccess={handleProcessingSuccess}
        />
      )}
    </div>
  );
};

export default Index;
