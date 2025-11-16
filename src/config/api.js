// Use VITE_API_BASE_URL for active environment
// To switch: change .env VITE_API_BASE_URL to either LOCAL or PRODUCTION value
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

// Alternative: Auto-detect based on hostname (uncomment to use)
// export const API_BASE_URL = window.location.hostname === 'localhost' 
//   ? import.meta.env.VITE_API_BASE_URL_LOCAL 
//   : import.meta.env.VITE_API_BASE_URL_PRODUCTION;
