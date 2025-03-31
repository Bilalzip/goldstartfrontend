import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface NonSalespersonGuardProps {
  children: React.ReactNode;
}

const NonSalespersonGuard: React.FC<NonSalespersonGuardProps> = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user) return null; // wait for user data to load

  // If the user is a salesperson, redirect them away from this route.
  if (user.isSalesperson) {
    // Redirect salesperson to their safe route (e.g., referrals/dashboard)
    return <Navigate to="/dashboard/referrals" replace />;
  }

  // Otherwise, render the protected content.
  return <>{children}</>;
};

export default NonSalespersonGuard;
