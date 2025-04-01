import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OnboardingGuardProps {
  children: React.ReactNode | ((props: { user: any }) => React.ReactNode);
}

const OnboardingGuard: React.FC<OnboardingGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Avoid unnecessary re-renders and state changes
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return null; // Wait for user data
  // Only redirect normal users (non-salespersons) who haven't completed onboarding.
  if (!user.isSalesperson && !user.onboarding_completed && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  
  return <>{typeof children === 'function' ? children({ user }) : children}</>;
};

export default OnboardingGuard;
