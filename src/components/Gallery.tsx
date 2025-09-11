import React, { useState } from 'react';
import { Heart, Image as ImageIcon } from 'lucide-react';
import LazyImage from './LazyImage';
import YouTubeVideos from './YouTubeVideos';

const Gallery = () => {
  const [expandedTestimonial, setExpandedTestimonial] = useState<number | null>(null);
  const images = [
    {
      url: '/images/Gallery1.jpg'
    },
    {
      url: '/images/Gallery2.jpg'
    },
    {
      url: '/images/Gallery3.jpg'
    },
    {
      url: '/images/Gallery4.jpg'
    },
    {
      url: '/images/Gallery5.jpg'
    },
    {
      url: '/images/Gallery6.jpg'
    }
  ];
  const testimonials = [
    {
      name: 'Dr. Ravali',
      location: 'Hyderabad',
      title: 'Migraine-Free After 15 Years!',
      shortQuote: 'Dr. Ravali, a medical practitioner from Hyderabad, battled severe migraines for over 15 years. Life became a constant struggle… until she met Parama Pujya Sree Jeeveswara Yogi.',
      fullQuote: 'Dr. Ravali, a medical practitioner from Hyderabad, battled severe migraines for over 15 years. Life became a constant struggle… until she met Parama Pujya Sree Jeeveswara Yogi 🙏 After attending Level 5 and receiving Shaktipatam during Mahashivaratri 2023 in Siva Kundalini Ashram, everything changed. She felt a divine shower of white energy flow through her — and healing began. Within 4 months, 90% of her migraines disappeared. Today, she lives an energetic, pain-free life — something she once thought was impossible. "He is not just a human… He is a DIVINE being."',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Chandra Mohan',
      location: 'Hyderabad',
      title: 'Kalpataru gave sadhak Financial Freedom',
      shortQuote: 'Chandra Mohan, a software professional from Hyderabad, discovered Pujya Jeeveswara Yogi on YouTube and began his spiritual journey with SKS.',
      fullQuote: 'Chandra Mohan, a software professional from Hyderabad, discovered Pujya Jeeveswara Yogi on YouTube and began his spiritual journey with SKS. During Level-1, his Sushmna Nadi activated — a life-changing miracle! After completing all online levels, Chandra Mohan attended the Kalpataru Workshop conducted by Gurudev, learning powerful techniques for healing and manifestation. At that time, he was struggling with a huge debt of ₹10 lakhs, and banks refused to sanction his loans. Using the Kalpataru technique, he manifested a breakthrough — his loans were approved within just 3 days of approaching the bank, granting him complete financial freedom. 🙏 Chandra Mohan expresses his heartfelt gratitude to Gurudev for transforming his life.',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Anjali',
      location: 'Bengaluru',
      title: 'Kalpataru Miracle: My Son Spoke Within 3 Days',
      shortQuote: 'Anjali, a Sadhak from Bangalore, was heartbroken when her son was diagnosed with a speech delay disorder.',
      fullQuote: 'Anjali, a Sadhak from Bangalore, was heartbroken when her son was diagnosed with a speech delay disorder. Despite visiting top hospitals and specialists, she was told there was no medical cure. Guided to explore holistic healing, she came across a video of a miraculous recovery—where a child with a hole in the heart (ASD) was healed by the divine grace of Parama Pujya Sree Jeeveswara Yogi. Inspired, Anjali joined the SKS Level 1 course and later attended the Kalpataru session by Pujya Gurudev—renowned as the fastest and safest healing and manifestation technique. With deep faith, she applied the technique to her son. In just 3 days, to her astonishment, he spoke his first words: "ball," "bat," and "cat." After 8 months of despair, she finally witnessed a miracle. With heartfelt gratitude, she says: "I am forever indebted to Gurudev and surrender my life at HIS feet."',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  return (
    <section id="gallery" className="pb-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Sacred
            <span className="text-orange-500"> Moments</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Witness the transformation and divine experiences of our spiritual community.
          </p>
        </div>

        {/* Photo Gallery */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <ImageIcon className="h-6 w-6 text-orange-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Sacred Gallery</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {images.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <LazyImage 
                  src={image.url}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-64 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <YouTubeVideos />

        {/* Testimonials */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-6 w-6 text-orange-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Sadhaks Experiences</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-orange-100">
                <div className="flex items-center mb-4">
                  <LazyImage 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <h5 className="font-bold text-orange-600 mb-3">{testimonial.title}</h5>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {expandedTestimonial === index ? testimonial.fullQuote : testimonial.shortQuote}
                </p>
                <button
                  onClick={() => setExpandedTestimonial(expandedTestimonial === index ? null : index)}
                  className="text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-expanded={expandedTestimonial === index}
                  aria-label={expandedTestimonial === index ? `Collapse ${testimonial.name}'s testimonial` : `Expand ${testimonial.name}'s testimonial`}
                >
                  {expandedTestimonial === index ? 'Read Less' : 'Read More'}
                </button>
              </div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
};

export default Gallery;