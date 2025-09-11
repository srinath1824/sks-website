import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { preloadCriticalResources } from './utils/performance';
import App from './App.tsx';
import './index.css';

// Preload critical resources
preloadCriticalResources();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
