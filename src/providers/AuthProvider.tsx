import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearAuth } from '@/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { globalLogout } from '@/utils/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for storage events (localStorage changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        dispatch(clearAuth());
        navigate('/login');
      }
    };

    // Listen for visibility changes (tab focus)
    const handleVisibilityChange = () => {
      if (!localStorage.getItem('token')) {
        dispatch(clearAuth());
        navigate('/login');
      }
    };

    // Add event listeners
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000; // Convert to milliseconds
        
        if (Date.now() >= expiryTime) {
          globalLogout();
          navigate('/login');
        } else {
          // Set timeout to logout when token expires
          const timeout = setTimeout(() => {
            globalLogout();
            navigate('/login');
          }, expiryTime - Date.now());
          
          return () => clearTimeout(timeout);
        }
      } catch (error) {
        console.error('Error parsing token:', error);
        globalLogout();
        navigate('/login');
      }
    }
  }, [navigate]);

  return <>{children}</>;
}; 