import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface SubscriptionStatus {
  isSubscribed: boolean;
  trialReviewsLeft: number;
  subscriptionEndsAt?: string;
}

export default function SubscriptionSettings() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await api.get('/payment/subscription-status');
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      toast.error('Failed to load subscription status');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);
      const response = await api.post('/payment/create-checkout-session');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to initiate payment process');
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription?')) return;
    
    try {
      setLoading(true);
      await api.post('/payment/cancel-subscription');
      toast.success('Subscription cancelled successfully');
      fetchSubscriptionStatus();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error('Failed to cancel subscription');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Subscription Settings">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Subscription Settings">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Status</CardTitle>
            <CardDescription>Manage your subscription and billing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status?.isSubscribed ? (
              <>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">Active Subscription</p>
                  {status.subscriptionEndsAt && (
                    <p className="text-sm text-green-600">
                      Next billing date: {new Date(status.subscriptionEndsAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleCancelSubscription}
                  variant="destructive"
                  disabled={loading}
                >
                  Cancel Subscription
                </Button>
              </>
            ) : (
              <>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <p className="text-yellow-700">Free Trial</p>
                  </div>
                  <p className="text-sm text-yellow-600 mt-1">
                    {status?.trialReviewsLeft} reviews remaining in trial
                  </p>
                </div>
                <Button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600"
                  disabled={loading}
                >
                  Upgrade to Premium
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 