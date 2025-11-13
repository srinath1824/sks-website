import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ChevronUp } from 'lucide-react';
import Header from './components/Header';
import SEO from './components/SEO';
import { organizationSchema } from './data/structuredData';
import { initPerformanceOptimizations } from './utils/performance';
import { FEATURES } from './config/features';

// Lazy load components with prefetch
const Home = lazy(() => import(/* webpackPrefetch: true */ './components/Home'));
const Results = lazy(() => import(/* webpackPrefetch: true */ './components/Results'));
const Footer = lazy(() => import(/* webpackPrefetch: true */ './components/Footer'));

// Minimal loading component to reduce blocking
const Loading = () => (
  <div className="min-h-screen pt-20 pb-20 bg-gradient-to-br from-orange-50 to-orange-100">
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  </div>
);

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    initPerformanceOptimizations();
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

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
                  <Footer />
                </Suspense>
              </>
            } />
            {FEATURES.MEDITATION_RESULTS ? (
              <Route path="/meditation-test-results" element={
                <>
                  <SEO 
                    title="Meditation Test Results | Siva Kundalini Sadhana"
                    description="Check your Level-3 entrance test results. Enter your mobile number to view your test status and next steps."
                    keywords="level 3 results, entrance test, kundalini level 3, test results, siva kundalini sadhana"
                  />
                  <Suspense fallback={<Loading />}>
                    <Results />
                    <Footer />
                  </Suspense>
                </>
              } />
            ) : (
              <Route path="/meditation-test-results" element={<Navigate to="/" replace />} />
            )}
          </Routes>

          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            >
              <ChevronUp className="h-6 w-6" />
            </button>
          )}
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;