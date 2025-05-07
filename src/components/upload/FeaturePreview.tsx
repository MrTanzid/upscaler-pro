
import React from 'react';
import { Sparkles, Zap, Shield } from 'lucide-react';

interface FeatureItem {
  icon: string;
  title: string;
  text: string;
}

interface FeaturePreviewProps {
  features: FeatureItem[];
}

const FeaturePreview: React.FC<FeaturePreviewProps> = ({ features }) => {
  const icons = [
    <Sparkles size={28} className="text-primary" key="sparkles" />,
    <Zap size={28} className="text-amber-500" key="zap" />,
    <Shield size={28} className="text-green-500" key="shield" />
  ];

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feature, i) => (
        <div 
          key={i} 
          className="feature-card bg-white rounded-xl p-6 border border-gray-100 hover:border-primary/20 transition-all"
          style={{animationDelay: `${0.2 + i * 0.2}s`}}
        >
          <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center transform -rotate-3 animate-float">
            {icons[i]}
          </div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturePreview;
