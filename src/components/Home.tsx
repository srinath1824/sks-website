import React, { Suspense, lazy } from 'react';

// Lazy load components with prefetch
const About = lazy(() => import(/* webpackPrefetch: true */ './About'));
const Journey = lazy(() => import(/* webpackPrefetch: true */ './Journey'));
const KundaliniKnowledge = lazy(() => import(/* webpackPrefetch: true */ './KundaliniKnowledge'));
const Courses = lazy(() => import(/* webpackPrefetch: true */ './Courses'));
const Events = lazy(() => import(/* webpackPrefetch: true */ './Events'));
const Gallery = lazy(() => import(/* webpackPrefetch: true */ './Gallery'));
const Mission = lazy(() => import(/* webpackPrefetch: true */ './Mission'));
const Contact = lazy(() => import(/* webpackPrefetch: true */ './Contact'));
const Hero = lazy(() => import(/* webpackPrefetch: true */ './Hero'));

// Minimal loading component
const Loading = () => <div className="h-4 bg-gray-100 animate-pulse"></div>;

const Home: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>
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
    </>
  );
};

export default Home;