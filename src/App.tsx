import React, { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import SEO from './components/SEO';
import { organizationSchema } from './data/structuredData';
import { initPerformanceOptimizations } from './utils/performance';

// Lazy load components with prefetch
const About = lazy(() => import(/* webpackPrefetch: true */ './components/About'));
const Journey = lazy(() => import(/* webpackPrefetch: true */ './components/Journey'));
const KundaliniKnowledge = lazy(() => import(/* webpackPrefetch: true */ './components/KundaliniKnowledge'));
const Courses = lazy(() => import(/* webpackPrefetch: true */ './components/Courses'));
const Events = lazy(() => import(/* webpackPrefetch: true */ './components/Events'));
const Gallery = lazy(() => import(/* webpackPrefetch: true */ './components/Gallery'));
const Mission = lazy(() => import(/* webpackPrefetch: true */ './components/Mission'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './components/Contact'));
const Footer = lazy(() => import(/* webpackPrefetch: true */ './components/Footer'));
const Chatbot = lazy(() => import(/* webpackPrefetch: true */ './components/Chatbot'));

// Minimal loading component
const Loading = () => <div className="h-4 bg-gray-100 animate-pulse"></div>;

function App() {
  useEffect(() => {
    initPerformanceOptimizations();
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
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Journey />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <KundaliniKnowledge />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Courses />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Events />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Mission />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Footer />
      </Suspense>
      {/* <Suspense fallback={null}>
        <Chatbot />
      </Suspense> */}
      </div>
    </HelmetProvider>
  );
}

export default App;