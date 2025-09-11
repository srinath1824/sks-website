import React from 'react';
import { Star } from 'lucide-react';
import LazyImage from './LazyImage';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
            <LazyImage 
              src="/images/Meet_our_Spiritual_Guru.jpg"
              alt="Spiritual Guru"
              className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-2xl shadow-xl">
              <Star className="h-8 w-8 fill-current" />
              <div className="text-sm font-semibold mt-2">Enlightened<br />Master</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Meet Our
              <span className="block text-orange-500">Spiritual Guru</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Our revered Guru is an enlightened Sadguru who has dedicated over three decades to the study and practice of Kundalini Sadhana. Having attained the highest states of consciousness, the Guru now shares this divine knowledge to help humanity transcend its limitations and realize its true potential.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Parama Pujya <strong>Sree Jeeveswara Yogi</strong> was born with an awakened Kundalini. At the tender age of 8, during a meditation class at school, he naturally entered into a deep state of Samadhi for four hours. From that moment onward, his heart was filled with a burning curiosity to explore the mysteries of meditation.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Core Values</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <div>• Surrenderance</div>
                <div>• Service</div>
                <div>• Practice</div>
                <div>• Gratitude</div>
                <div>• Acceptance & Forgiveness</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;