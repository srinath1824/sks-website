import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo />
              <span className="text-2xl font-bold">Siva Kundalini Sadhana</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Transforming human consciousness to Siva Kundalini Sadhana through the sacred science of Kundalini Sadhana. 
              Join our global community of awakened souls.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/SivaKundaliniSadhana" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/sivakundalinisadhana" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com/@SivaKundaliniSadhanaChannel" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 cursor-pointer">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  About Guru
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('knowledge')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Kundalini Knowledge
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('courses')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('events')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200">
                  Events
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">sivakundalini@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">+91 78010 46111</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Nayal, Dunagiri, Uttarakhand<br />India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Siva Kundalini Sadhana Organization. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-orange-500 transition-colors duration-200">Terms of Service</a>
              <a href="#" className="hover:text-orange-500 transition-colors duration-200">Refund Policy</a>
            </div> */}
          </div>
        </div>

        {/* <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm italic">
            "Arise, awake, and stop not till the goal is reached" - Ancient Vedic Wisdom
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;