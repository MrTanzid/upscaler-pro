
import React from 'react';

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

interface FeaturePreviewProps {
  features: FeatureItem[];
}

const FeaturePreview: React.FC<FeaturePreviewProps> = ({ features }) => {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      {features.map((feature, i) => (
        <div key={i} className="py-3 px-4 bg-white/50 rounded-lg hover:bg-white/80 transition-all hover:shadow-md">
          <div className="text-2xl mb-1">{feature.icon}</div>
          <h3 className="text-gray-800 font-medium">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturePreview;
