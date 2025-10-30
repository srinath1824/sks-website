import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import SEO from './components/SEO';
import { organizationSchema } from './data/structuredData';
import { initPerformanceOptimizations } from './utils/performance';

// Lazy load components with prefetch
const Home = lazy(() => import(/* webpackPrefetch: true */ './components/Home'));
const Results = lazy(() => import(/* webpackPrefetch: true */ './components/Results'));
const Footer = lazy(() => import(/* webpackPrefetch: true */ './components/Footer'));

// Minimal loading component
const Loading = () => <div className="h-4 bg-gray-100 animate-pulse"></div>;

function App() {
  useEffect(() => {
    initPerformanceOptimizations();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <SEO 
                  title="Siva Kundalini Sadhana - Awaken Your Kundalini Energy | Free Online Classes"
                  description="Transform your life through authentic Kundalini awakening practices. Learn safe techniques, understand symptoms, and experience spiritual transformation under enlightened guidance. Join free online classes."
                  keywords="kundalini awakening, kundalini energy, spiritual awakening, kundalini yoga, meditation, chakra activation, kundalini symptoms, kundalini dangers, safe kundalini practices, siva kundalini sadhana, jeeveswara yogi"
                  structuredData={[organizationSchema]}
                />
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              </>
            } />
            <Route path="/meditation-test-results" element={
              <>
                <SEO 
                  title="Meditation Test Results | Siva Kundalini Sadhana"
                  description="Check your Level-3 entrance test results. Enter your mobile number to view your test status and next steps."
                  keywords="level 3 results, entrance test, kundalini level 3, test results, siva kundalini sadhana"
                />
                <Suspense fallback={<Loading />}>
                  <Results />
                </Suspense>
              </>
            } />
          </Routes>
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<Loading />}>
                <Footer />
              </Suspense>
            } />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;