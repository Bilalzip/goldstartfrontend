import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import api from '@/services/api';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('Invalid verification link');
        setVerifying(false);
        return;
      }

      try {
        await api.get(`/auth/verify-email/${token}`);
        toast.success('Email verified successfully!');
        navigate('/dashboard');
      } catch (error: any) {
        setError(error.response?.data?.message || 'Verification failed');
      } finally {
        setVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const handleResendVerification = async () => {
    try {
      const token = localStorage.getItem('token');
      
      await api.post('/auth/resend-verification', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Verification email sent!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send verification email');
    }
  };

  if (verifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Verification Failed</h1>
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleResendVerification}>
          Resend Verification Email
        </Button>
      </div>
    );
  }

  return null;
} 