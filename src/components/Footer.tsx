
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-blue-50 py-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19L19 6M12 3L9 6L12 9M12 15L15 18L12 21" stroke="#1A73E8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">UpscalerPro</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center md:text-left">
              © {currentYear} UpscalerPro. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="space-x-6">
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Contact Us
              </a>
              <a 
                href="#privacy" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Terms of Service
              </a>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#facebook" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#twitter" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#instagram" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
