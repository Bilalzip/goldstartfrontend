import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toast } from 'sonner';

const ReferralRedirect = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    if (isAuthenticated) {
      toast.error("You're already logged in. You can't use a referral link while logged in.");
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default ReferralRedirect; 