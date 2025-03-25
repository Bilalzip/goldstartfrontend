import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import SellerLayout from '@/layouts/SellerLayout';
import api from '@/services/api';

interface DashboardStats {
  totalCommission: number;
  activeReferrals: number;
  nextPayout: number;
  nextPayoutDate: string;
}

export default function SellerDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/seller/dashboard-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
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
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats?.totalCommission.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.activeReferrals}</div>
              <p className="text-xs text-muted-foreground">Current active businesses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats?.nextPayout.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Expected {new Date(stats?.nextPayoutDate || '').toLocaleDateString()}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">20%</div>
              <p className="text-xs text-muted-foreground">Per successful referral</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div>
                  <h3 className="font-medium">Next Payment Date</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(stats?.nextPayoutDate || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Payments are processed on the 1st of each month for the previous month's commissions.</p>
                <p className="mt-2">Commission rate: 20% of monthly subscription fees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  );
} 