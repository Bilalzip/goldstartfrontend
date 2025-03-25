import axios from 'axios';

const api = axios.create({
  baseURL: 'https://goldstarserver.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const couponService = {
  validate: (code: string) => 
    api.post('/auth/coupons/validate', { code }),
  
  startTrial: (couponCode: string) =>
    api.post('/auth/payment/start-trial', { couponCode }),
  
  createCheckoutSession: (couponCode?: string) =>
    api.post('/auth/payment/create-checkout-session', { couponCode })
}; 