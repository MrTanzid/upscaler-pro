
import React from 'react';
import { Facebook, Twitter, Instagram, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-gray-50 to-red-50 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-red-400 flex items-center justify-center mr-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19L19 6M12 3L9 6L12 9M12 15L15 18L12 21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold red-gradient-text">UpscalerPro</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center md:text-left">
              © {currentYear} UpscalerPro. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1 text-center md:text-left flex items-center justify-center md:justify-start">
              Made with <Heart size={12} className="mx-1 text-primary" fill="#ea384c" /> by AI enthusiasts
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="space-x-6">
              <a 
                href="#contact" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Contact
              </a>
              <a 
                href="#privacy" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Privacy
              </a>
              <a 
                href="#terms" 
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                Terms
              </a>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="#facebook" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all scale-on-hover"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#twitter" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all scale-on-hover"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#instagram" 
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-primary hover:text-white transition-all scale-on-hover"
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
