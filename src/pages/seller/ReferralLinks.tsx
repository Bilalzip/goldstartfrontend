import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import SellerLayout from '@/layouts/SellerLayout';
import api from '@/services/api';

export default function ReferralLinks() {
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralLink();
  }, []);

  const fetchReferralLink = async () => {
    try {
      const response = await api.get('/seller/referral-link');
      setReferralLink(response.data.link);
    } catch (error) {
      console.error('Error fetching referral link:', error);
      toast.error('Failed to load referral link');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  return (
    <SellerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Referral Links</h2>

        <Card>
          <CardHeader>
            <CardTitle>Your Unique Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={referralLink} readOnly className="flex-1" />
              <Button onClick={copyToClipboard}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Share this link with businesses to earn commission on their subscriptions.</p>
              <p className="mt-2">You'll earn 20% of their monthly subscription fee.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Share your unique referral link with potential businesses</li>
              <li>When they sign up using your link, they're automatically tracked as your referral</li>
              <li>You earn 20% commission on their monthly subscription</li>
              <li>Commissions are paid out on the 1st of each month</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
} 