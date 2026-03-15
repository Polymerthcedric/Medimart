import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl text-primary-600">💊</span> {/* Will replace this pill with icon in Navbar/GetProduct too, but for branding consistency keeping simple or using icon */}
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Medimart
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Your trusted partner for quality medical supplies and equipment. We provide essential healthcare products to your doorstep.
            </p>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-primary-500 text-sm transition-colors">Home</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5" />
                <span>123 Medical Plaza, Health Avenue, Nairobi</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-500" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-500" />
                <span>fidelcedricodoyo@gmail.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Stay Connected</h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/polymerth_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all text-slate-600 dark:text-slate-400"
                title="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">@polymerth_</p>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
          <p className="text-slate-500 dark:text-slate-500 text-xs">
            © {new Date().getFullYear()} Medimart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
