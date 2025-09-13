import React, { useState } from 'react';
import { Mail, Phone, Send, MessageCircle, Calendar } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg className="h-6 w-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="pt-24 sm:pt-20 pb-20 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Begin Your
            <span className="text-orange-500"> Spiritual Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your life? Connect with us to start your journey toward Siva Kundalini Sadhana.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Information */}
          <div className="space-y-8 max-w-6xl w-full">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Connect With Us</h3>
              
              <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16">
                <a href="mailto:sivakundalini@gmail.com" className="flex flex-col items-center text-center min-w-[200px] hover:transform hover:scale-105 transition-transform duration-200 no-underline">
                  <div className="bg-orange-100 p-4 rounded-xl mb-3">
                    <Mail className="h-6 w-6 text-orange-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base mb-1">Email Us</h4>
                  <p className="text-gray-600 text-sm">sivakundalini@gmail.com</p>
                </a>

                <a href="tel:+917801046111" className="flex flex-col items-center text-center min-w-[200px] hover:transform hover:scale-105 transition-transform duration-200 no-underline">
                  <div className="bg-orange-100 p-4 rounded-xl mb-3">
                    <Phone className="h-6 w-6 text-orange-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base mb-1">Call Us</h4>
                  <p className="text-gray-600 text-sm">+91 78010 46111</p>
                </a>

                <a href="https://wa.me/917801046111" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-center min-w-[200px] hover:transform hover:scale-105 transition-transform duration-200 no-underline">
                  <div className="bg-orange-100 p-4 rounded-xl mb-3">
                    <WhatsAppIcon />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-base mb-1">WhatsApp Us</h4>
                  <p className="text-gray-600 text-sm">+91 7801046111</p>
                </a>
              </div>
            </div>

            {/* <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h4>
              
              <div className="space-y-4">
                <button className="w-full bg-white text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-colors duration-200 flex items-center justify-center border border-orange-200">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Free Consultation
                </button>
                
                <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat with Spiritual Counselor
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;