import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

export default function FinancialOverview() {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      const response = await api.get('/auth/admin/financial/overview');
      setOverviewData(response.data);
    } catch (error) {
      toast.error('Failed to fetch financial data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData?.monthlyData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                <Line type="monotone" dataKey="commissions" stroke="#82ca9d" name="Commissions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 sm:p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Profit</h3>
          <div className="h-[300px] sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData?.monthlyData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey={(data) => data.revenue - data.commissions} 
                  stroke="#8884d8" 
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Revenue</h4>
          <p className="text-2xl font-bold">${overviewData?.overview?.total_revenue || 0}</p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Commissions</h4>
          <p className="text-2xl font-bold">${overviewData?.overview?.total_commissions || 0}</p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Active Businesses</h4>
          <p className="text-2xl font-bold">{overviewData?.overview?.active_businesses || 0}</p>
        </Card>
        <Card className="p-4">
          <h4 className="text-sm font-medium text-gray-500">Total Salespeople</h4>
          <p className="text-2xl font-bold">{overviewData?.overview?.total_salespeople || 0}</p>
        </Card>
      </div>
    </div>
  );
} 