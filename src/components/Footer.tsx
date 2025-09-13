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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {/* Brand & Mission */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <Logo />
              <span className="text-2xl font-bold">Siva Kundalini Sadhana</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Siva Kundalini Sadhana (SKS) is a non-profit organization founded by Parama Pujya Sree Jeeveswara Yogi, with a divine purpose of transforming every human life into a healthy and blissful journey towards self-realisation, through simple, safe and powerful Siva Kundalini Sadhana.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4" role="list" aria-label="Social media links">
              <a href="https://www.facebook.com/SivaKundaliniSadhana" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Visit our Facebook page">
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/sivakundalinisadhana" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Visit our Instagram page">
                <Instagram className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href="https://www.youtube.com/@SivaKundaliniSadhanaChannel" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Visit our YouTube channel">
                <Youtube className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900" aria-label="Navigate to About Guru section">
                  About Guru
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('knowledge')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900" aria-label="Navigate to Kundalini Knowledge section">
                  Kundalini Knowledge
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('courses')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900" aria-label="Navigate to Courses section">
                  Courses
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('events')} className="text-gray-300 hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900" aria-label="Navigate to Events section">
                  Events
                </button>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href="mailto:sivakundalini@gmail.com" className="text-gray-300 text-sm hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Send email to sivakundalini@gmail.com">
                    sivakundalini@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href="tel:+917801046111" className="text-gray-300 text-sm hover:text-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500" aria-label="Call +91 78010 46111">
                    +91 78010 46111
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <address className="text-gray-300 text-sm not-italic">
                    Nayal, Dunagiri, Uttarakhand<br />India
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Siva Kundalini Sadhana Foundation. All rights reserved.
            </p>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm italic">
            “You are already enlightened, just realize it.” -Parama Sri Jeeveswara Yogi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;