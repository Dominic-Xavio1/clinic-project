// API Base URL Configuration
// This will use environment variable in production, or localhost in development
const getBaseURL = () => {
  // Check if we're in production (Vercel sets this automatically)
  if (import.meta.env.PROD) {
    // Use environment variable for production API URL
    return import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.vercel.app';
  }
  // Development: use localhost
  return import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
};

export const API_BASE_URL = getBaseURL();

// Helper function to create full API endpoint
export const createApiEndpoint = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

export default API_BASE_URL;

