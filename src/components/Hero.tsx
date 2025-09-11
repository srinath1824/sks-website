import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import LazyImage from './LazyImage';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 overflow-hidden pb-8 sm:pb-0"
    >
      <div className="absolute inset-0">
        <LazyImage 
          src="https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Meditation"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/60 via-orange-600/50 to-orange-700/60"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Sparkles className="h-16 w-16 text-white mx-auto mb-4 animate-pulse" aria-hidden="true" />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            <span className="sr-only">Siva Kundalini Sadhana - </span>Awaken Your
            <span className="block text-white">
              Kundalini Energy Safely
            </span>
          </h1>
        </div>

        <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
          Transform your life through the sacred science of <strong>Kundalini Sadhana</strong> and unlock your inner power. Experience safe <strong>Kundalini awakening</strong> techniques, understand <strong>chakra activation</strong>, and journey from human consciousness to divine consciousness under the guidance of our enlightened Guru <strong>Parama Pujya Sree Jeeveswara Yogi</strong>.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
          <button 
            onClick={() => scrollToSection('courses')}
            className="group bg-white text-orange-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full sm:w-auto justify-center"
            aria-label="Navigate to free Kundalini classes section"
          >
            <span>Join FREE Kundalini Classes</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </button>
          
          <button 
            onClick={() => scrollToSection('knowledge')}
            className="group border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-orange-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 w-full sm:w-auto justify-center"
            aria-label="Navigate to Kundalini knowledge section"
          >
            Learn About Kundalini
          </button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">2017</div>
            <div className="text-orange-200 text-sm md:text-base">Founded in</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">100,000+</div>
            <div className="text-orange-200 text-sm md:text-base">Students Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">40+</div>
            <div className="text-orange-200 text-sm md:text-base">Countries reached</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold">100+</div>
            <div className="text-orange-200 text-sm md:text-base">Volunteers</div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;