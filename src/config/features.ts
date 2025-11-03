// Feature flags configuration
export const FEATURES = {
  // Meditation test results page
  MEDITATION_RESULTS: import.meta.env.VITE_ENABLE_MEDITATION_RESULTS === 'true',
} as const;