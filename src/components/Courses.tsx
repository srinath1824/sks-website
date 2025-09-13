import React from 'react';
import { Play, Users } from 'lucide-react';
import LazyImage from './LazyImage';

const Courses = () => {
  const onlineCourses = [
    {
      level: 'Level 1',
      title: 'Brahmarandhra Opening',
      duration: '8 weeks',
      price: '$299',
      description: 'Next batch starts on 19th September 2025',
      image: 'images/Level-1 brahmarandhara.jpeg',
      features: ['Meditation techniques', 'Breathing practices', 'Energy awareness', 'Weekly live sessions']
    },
    {
      level: 'Level 2',
      title: 'Sushumna Nadi Activation',
      image: 'images/Level-2 Naadis.webp'
    },
    {
      level: 'Level 3',
      title: 'Entrance Meditation Test',
      image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop'
    },
    {
      level: 'Level 3',
      title: 'Chakra Activation',
      image: 'images/Level-3 Chakra Activation.jpeg'
    },
    {
      level: 'Level 4',
      title: 'Kundalini Activation',
      image: 'images/Level-4 Kundalini1.jpg'
    }
  ];

  const residentialCourses = [
    {
      title: 'Level-5',
      duration: '7 Days',
      price: '$1,999',
      description: 'Intensify sadhana progression in the presence of Parama Pujya Gurudev, while experiencing self-realisation and oneness with universal consciousness',
      image: 'images/Level 5.jpg'
    },
    {
      title: 'Level-5.1',
      duration: '21 Days',
      price: '$4,999',
      description: 'Deepen the experience of self-realisation and expand the consciousness, in the divine presence of Pujya Gurudev',
      image: 'images/Level 5.1.jpg'
    }
  ];

  return (
    <section id="courses" className="pt-24 sm:pt-20 pb-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sacred
            <span className="text-orange-500"> Learning Path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start your transformative journey from our carefully structured courses designed to guide you through every stage of Kundalini awakening.
          </p>
        </div>

        {/* Online Courses */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <Play className="h-8 w-8 text-orange-500 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Online Courses</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {onlineCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-orange-100 flex flex-col h-full mx-auto w-full max-w-sm">
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-center mb-4">
                    <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-3">
                      {course.level}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{course.title}</h4>
                  </div>
                </div>
                <LazyImage 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-40 object-cover object-center rounded-b-2xl"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12 mb-20">
          <button 
            onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdU0NsweV8vBb7NFgxc-0p8Sr2Do0SSCOqulGZcFC8VRnzWng/viewform', '_blank')}
            className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Open registration form for free Kundalini classes in new tab"
          >
            Join FREE Kundalini Classes
          </button>
        </div>
        </div>

        {/* Residential Courses */}
        <div>
          <div className="flex items-center justify-center mb-12">
            <Users className="h-8 w-8 text-orange-500 mr-3" />
            <h3 className="text-3xl font-bold text-gray-900">Residential Courses</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {residentialCourses.map((course, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl text-white p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                <LazyImage 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-3">{course.title}</h4>
                  <p className="text-orange-100 leading-relaxed">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Your Transformation Today</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students who have experienced life-changing results through our systematic approach to Kundalini awakening.
            </p>
            <button 
              onClick={() => window.open('https://wa.me/+917801046111', '_blank')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              aria-label="Open WhatsApp chat in new tab"
            >
              Chat with us
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Courses;