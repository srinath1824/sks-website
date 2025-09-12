import React from 'react';
import { Globe, Sunrise } from 'lucide-react';

const Mission = () => {
  return (
    <section id="mission" className="pb-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Our Noble
            <span className="text-orange-500"> Mission</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            To elevate human consciousness to Siva Kundalini Sadhana through the sacred science of Kundalini Sadhana, 
            creating a world filled with enlightened beings living in harmony with their true nature.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-orange-100">
            <div className="flex items-center mb-6">
              <Sunrise className="h-8 w-8 text-orange-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              "To create a world where every human being is given the opportunity to realize their highest potential and transform into a divine being — living with wisdom, compassion, and unity with universal consciousness. We aspire to build an environment that nurtures inner growth, uplifts humanity, and fosters harmony across the planet.”
            </p>
            {/* <ul className="space-y-3 text-gray-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Global spiritual awakening
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Universal consciousness expansion
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Planetary healing through individual transformation
              </li>
            </ul> */}
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-orange-200 mr-3" />
              <h3 className="text-2xl font-bold">Our Mission</h3>
            </div>
            <p className="text-orange-100 leading-relaxed mb-6">
              To guide the transformation of human consciousness (Jeeva) into divine consciousness (Shiva) — helping individuals move beyond limitations of the ego and awaken to higher awareness, inner peace, and oneness with the universal Self.
            </p>
            {/* <ul className="space-y-3 text-orange-100">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-3"></div>
                Authentic spiritual education
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-3"></div>
                Safe Kundalini awakening practices
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-orange-200 rounded-full mr-3"></div>
                Building a global spiritual community
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;