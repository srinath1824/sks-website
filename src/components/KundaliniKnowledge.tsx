import React from 'react';
import { Zap, Circle, Target, Flame } from 'lucide-react';

const KundaliniKnowledge = () => {
  const chakras = [
    { name: 'Muladhara', color: 'bg-red-500', description: 'Root Chakra - Foundation of existence' },
    { name: 'Svadhisthana', color: 'bg-orange-500', description: 'Sacral Chakra - Creative force' },
    { name: 'Manipura', color: 'bg-yellow-500', description: 'Solar Plexus - Personal power' },
    { name: 'Anahata', color: 'bg-green-500', description: 'Heart Chakra - Unconditional love' },
    { name: 'Vishuddha', color: 'bg-blue-500', description: 'Throat Chakra - Divine expression' },
    { name: 'Ajna', color: 'bg-indigo-500', description: 'Third Eye - Intuitive wisdom' },
    { name: 'Sahasrara', color: 'bg-purple-500', description: 'Crown Chakra - Divine connection' },
  ];

  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Enhanced Energy',
      description: 'Experience unlimited cosmic energy flowing through your being.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Mental Clarity',
      description: 'Achieve crystal clear focus and enhanced cognitive abilities.'
    },
    {
      icon: <Circle className="h-8 w-8" />,
      title: 'Emotional Balance',
      description: 'Reduces stress, fear, and negativity, creating inner peace.'
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: 'Chakra Activation',
      description: 'Aligns and energizes the body’s subtle energy centers.'
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: 'Spiritual Awakening',
      description: 'Expands consciousness and deepens connection with the Divine.'
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: 'Inner Transformation',
      description: 'Brings self-realization and a purposeful, harmonious life.'
    }
  ];

  return (
    <section id="knowledge" className="py-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            The Science of
            <span className="block text-orange-500">Kundalini Awakening</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-4">
            Kundalini is the primordial cosmic energy that lies dormant at the base of the spine. Often depicted as a coiled serpent, this divine feminine energy represents the creative force of the universe.
          </p>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed mb-4">
            When awakened through proper Sadhana (spiritual practice), Kundalini rises through the seven chakras, activating higher states of consciousness and ultimately leading to self-realization and unity with the divine.
          </p>
          <p className="text-xl text-gray-600 max-w-5xl mx-auto leading-relaxed">
            This ancient science, preserved in Vedic traditions for millennia, offers a systematic path to spiritual evolution, healing, and the fulfillment of human potential.
          </p> 
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">The Seven Chakras</h3>
            <div className="space-y-4">
              {chakras.map((chakra, index) => (
                <div key={chakra.name} className="flex items-center space-x-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className={`w-12 h-12 ${chakra.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{chakra.name}</h4>
                    <p className="text-gray-600 text-sm">{chakra.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Benefits of Kundalini Sadhana</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="text-orange-500 mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KundaliniKnowledge;