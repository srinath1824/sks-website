import React from 'react';
import LazyImage from './LazyImage';

const Journey = () => {
  return (
    <section id="journey" className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              <span className="block text-orange-500">Journey of our Guru</span>
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Parama Pujya <strong>Sree Jeeveswara Yogi</strong> was born with an awakened Kundalini. At the tender age of 8, during a meditation class at school, he naturally entered into a deep state of Samadhi for four hours. From that moment onward, his heart was filled with a burning curiosity to explore the mysteries of meditation.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              At the age of 13, guided by his spiritual quest, he traveled to the sacred land of <strong>Srisailam</strong>, a powerful abode of Lord Shiva. There, in a miraculous turn, he encountered his Guru — none other than <strong>Lord Shiva Himself</strong>. In the divine presence of his Guru, he spent three days and received profound, intense meditation techniques.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Through years of dedicated practice, he eventually attained <strong>Enlightenment</strong>. Choosing to renounce worldly pursuits, he initially intended to enter <strong>Jeeva Samadhi</strong>, but on the divine guidance of his Guru, he redirected his life towards serving humanity. Leaving behind a flourishing professional career, he resolved to dedicate his entire life to spreading the sacred knowledge of <strong>Kundalini Sadhana</strong>.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              In 2017, he founded <strong>Siva Kundalini Sadhana</strong>, a non-profit spiritual organization with the mission of offering this divine practice freely to all seekers. Gurudev strongly believes that <strong>Salvation is the birthright of every human being</strong>, and thus he shares these teachings without any barriers or prerequisites.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Sree Jeeveswara Yogi Gurudev is among the rarest of masters who bestow <strong>Shaktipatham</strong> (the direct transmission of energy from Guru to disciple) and <strong>Shivapatham</strong>, guiding seekers on the path to ultimate realization.
            </p>
          </div>

          <div className="relative h-full min-h-[400px] lg:min-h-[500px]">
            <LazyImage 
              src="/images/Journey of our Guru.jpg"
              alt="Spiritual Guru"
              className="w-full h-full object-cover object-center rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;