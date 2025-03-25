import { Navigate } from 'react-router-dom';

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: SellerRouteProps) => {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userType !== 'seller') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default SellerRoute; 