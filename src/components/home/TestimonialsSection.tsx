
import React from 'react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "This tool saved my old family photos. The enhancement is incredible!",
      name: "Sarah Johnson",
      role: "Photographer"
    },
    {
      quote: "I've tried many upscalers and this one provides the most natural results by far.",
      name: "Mark Chen",
      role: "Graphic Designer"
    },
    {
      quote: "Impressive AI technology that actually delivers on its promise. Highly recommended!",
      name: "Lisa Rodriguez",
      role: "Digital Artist"
    }
  ];

  return (
    <div className="mt-24 text-center">
      <h3 className="text-3xl font-bold mb-10 red-gradient-text">What Users Are Saying</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, i) => (
          <div 
            key={i} 
            className="bg-white p-6 rounded-xl shadow-md animate-scale-in" 
            style={{animationDelay: `${1.2 + i * 0.2}s`}}
          >
            <div className="text-4xl text-primary mb-4">"</div>
            <p className="text-gray-700 mb-4">{testimonial.quote}</p>
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="ml-2 text-left">
                <p className="font-medium">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
