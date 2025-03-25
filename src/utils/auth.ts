import { store } from '@/store/store';
import { logout } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

export const globalLogout = async () => {
  await store.dispatch(logout());
  
  // Clear all localStorage
  localStorage.clear();
  
  // Remove Authorization header
  delete api.defaults.headers.common['Authorization'];
  
  // Redirect to home page
  window.location.href = '/';
};

// Hook for components to use
export const useLogout = () => {
  const navigate = useNavigate();
  
  return async () => {
    await store.dispatch(logout());
    navigate('/', { replace: true });
  };
}; 