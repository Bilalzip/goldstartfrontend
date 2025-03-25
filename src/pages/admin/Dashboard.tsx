import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  Users, Building2, DollarSign, LineChart,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import BusinessList from '@/components/admin/BusinessList';
import SalespeopleList from '@/components/admin/SalespeopleList';
import FinancialOverview from '@/components/admin/FinancialOverview';
import { DataTable } from '@/components/ui/data-table';
import api from '@/services/api';
import { toast } from 'sonner';

interface DashboardStats {
  total_revenue: number;
  active_businesses: number;
  total_salespeople: number;
  total_commissions: number;
  revenue_change: number;
  business_change: number;
  salespeople_change: number;
  commission_change: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);
  
  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/auth/admin/financial/overview');
      const { overview } = response.data;
      setStats(overview);
    } catch (error) {
      toast.error('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <p className={`text-sm flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 mr-1" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-1" />
        )}
        {Math.abs(change)}% from last month
      </p>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(stats?.total_revenue || 0)}
              </h3>
              {formatChange(stats?.revenue_change || 0)}
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Businesses
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats?.active_businesses || 0}
              </h3>
              {formatChange(stats?.business_change || 0)}
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Salespeople
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {stats?.total_salespeople || 0}
              </h3>
              {formatChange(stats?.salespeople_change || 0)}
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Commissions Paid
              </p>
              <h3 className="text-2xl font-bold mt-2">
                {formatCurrency(stats?.total_commissions || 0)}
              </h3>
              {formatChange(stats?.commission_change || 0)}
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <LineChart className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <Tabs defaultValue="businesses" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none p-0">
            <TabsTrigger value="businesses" className="rounded-none px-6 py-3 data-[state=active]:border-b-2">
              Businesses
            </TabsTrigger>
            <TabsTrigger value="salespeople" className="rounded-none px-6 py-3 data-[state=active]:border-b-2">
              Salespeople
            </TabsTrigger>
            <TabsTrigger value="financial" className="rounded-none px-6 py-3 data-[state=active]:border-b-2">
              Financial Overview
            </TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="businesses">
              <BusinessList />
            </TabsContent>
            <TabsContent value="salespeople">
              <SalespeopleList />
            </TabsContent>
            <TabsContent value="financial">
              <FinancialOverview />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
} 