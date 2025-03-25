import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SellerLayout from '@/layouts/SellerLayout';
import api from '@/services/api';

interface Referral {
  id: string;
  businessName: string;
  ownerName: string;
  status: 'active' | 'pending' | 'cancelled';
  joinDate: string;
  lastPayment: string | null;
  commission: number;
}

export default function Referrals() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await api.get('/seller/referrals');
      setReferrals(response.data);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Referrals</h2>

        <Card>
          <CardHeader>
            <CardTitle>Referred Businesses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Business</th>
                    <th className="px-6 py-3">Owner</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Join Date</th>
                    <th className="px-6 py-3">Last Payment</th>
                    <th className="px-6 py-3">Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((referral) => (
                    <tr key={referral.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium">{referral.businessName}</td>
                      <td className="px-6 py-4">{referral.ownerName}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          referral.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : referral.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(referral.joinDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {referral.lastPayment 
                          ? new Date(referral.lastPayment).toLocaleDateString()
                          : '-'}
                      </td>
                      <td className="px-6 py-4">${referral.commission.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
} 