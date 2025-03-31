import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface OnboardingRouteProps {
  children: React.ReactNode;
}

const OnboardingRoute: React.FC<OnboardingRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    console.log("🚨 Redirecting to login...");
    return <Navigate to="/login" replace />;
  }
  
  // If no user data or not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if(user.isSalesperson){
    return <Navigate to="/dashboard/referrals" replace />;
  }
  
  // If onboarding is completed, redirect to payment
  if (user.onboarding_completed) {
    console.log("✅ Onboarding completed → Redirecting to /payment");
    return <Navigate to="/dashboard/payment" replace />;
  }

  
  // If not completed onboarding, show onboarding page
  console.log("🟢 Rendering Onboarding Page");
  return <>{children}</>;
};

export default OnboardingRoute;
