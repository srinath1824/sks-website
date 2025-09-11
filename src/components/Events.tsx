import React from 'react';
import { Users } from 'lucide-react';
import LazyImage from './LazyImage';

const Events = () => {


  const pastEvents = [
    {
      title: 'Meditation in SKS Bliss Center',
      date: 'September 2025',
      // participants: '100 pilgrims',
      description: ' Awaken your consciousness and embrace stillness with meditation at SKS Bliss Center.',
      image: 'images/Bliss Center.jpeg'
    },
    {
      title: 'Guru Poornima & Gurudev Janmadinam',
      date: 'July 2025',
      // participants: '100 pilgrims',
      description: 'A day of gratitude and reverence—honoring Gurudev on Guru Poornima and his Janmadinam.',
      image: 'images/Guru Poornima.JPG'
    },
    {
      title: 'MahaSivaratri 2025',
      date: 'February 2025',
      participants: '5000+ global attendees',
      description: 'A Night of Spiritual Awakening, devotion, and union with the Divine.',
      image: 'images/MahaSivaratri.jpg'
    }
  ];

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sacred
            <span className="text-orange-500"> Gatherings</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Awaken your spirit—join us for transformative events and programs.
          </p>
        </div>



        {/* Past Events */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8">Recent Gatherings</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <LazyImage 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h4 className="text-lg font-bold mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-200 mb-2">{event.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span>{event.date}</span>
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.participants}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;