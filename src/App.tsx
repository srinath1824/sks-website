import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import LazySection from './components/LazySection';
import SEO from './components/SEO';
import { kundaliniFAQSchema, organizationSchema } from './data/structuredData';
import { preloadCriticalResources } from './utils/performance';
import { preloadCriticalImages } from './utils/imageCache';

// Lazy load components
const About = lazy(() => import('./components/About'));
const Journey = lazy(() => import('./components/Journey'));
const KundaliniKnowledge = lazy(() => import('./components/KundaliniKnowledge'));
const Courses = lazy(() => import('./components/Courses'));
const Events = lazy(() => import('./components/Events'));
const Gallery = lazy(() => import('./components/Gallery'));
const Mission = lazy(() => import('./components/Mission'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App() {
  useEffect(() => {
    preloadCriticalResources();
    preloadCriticalImages();
  }, []);

  return (
    <HelmetProvider>
      <SEO 
        title="Siva Kundalini Sadhana - Awaken Your Kundalini Energy | Free Online Classes"
        description="Transform your life through authentic Kundalini awakening practices. Learn safe techniques, understand symptoms, and experience spiritual transformation under enlightened guidance. Join free online classes."
        keywords="kundalini awakening, kundalini energy, spiritual awakening, kundalini yoga, meditation, chakra activation, kundalini symptoms, kundalini dangers, safe kundalini practices, siva kundalini sadhana, jeeveswara yogi"
        structuredData={[organizationSchema]}
      />
      <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <About />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Journey />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <KundaliniKnowledge />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Courses />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Events />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Gallery />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Mission />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Contact />
        </Suspense>
      </LazySection>
      <LazySection>
        <Suspense fallback={<div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div></div>}>
          <Footer />
        </Suspense>
      </LazySection>
      </div>
    </HelmetProvider>
  );
}

export default App;