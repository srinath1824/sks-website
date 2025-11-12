import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initAdvancedPerformance, measurePerformance } from './utils/performanceOptimizations';
import { reportWebVitals, optimizeCRP, preloadCriticalResources } from './utils/webVitals';

// Initialize performance optimizations
initAdvancedPerformance();
measurePerformance();
reportWebVitals();
optimizeCRP();
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
