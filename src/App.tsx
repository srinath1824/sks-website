import React, { Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LazySection from './components/LazySection';

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
  return (
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
  );
}

export default App;