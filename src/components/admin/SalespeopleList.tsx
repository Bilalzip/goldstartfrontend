import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'total_referrals',
    header: 'Total Referrals',
  },
  {
    accessorKey: 'active_referrals',
    header: 'Active Referrals',
  },
  {
    accessorKey: 'total_commission',
    header: 'Total Commission',
    cell: ({ row }) => {
      const amount = row.getValue('total_commission');
      return `$${parseFloat(amount || 0).toFixed(2)}`;
    },
  },
  {
    accessorKey: 'last_payout',
    header: 'Last Payout',
    cell: ({ row }) => {
      const date = row.getValue('last_payout');
      return date ? new Date(date).toLocaleDateString() : 'No payouts';
    }
  },
];

export default function SalespeopleList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalespeople();
  }, []);

  const fetchSalespeople = async () => {
    try {
      const response = await api.get('/auth/admin/salespeople');
      setData(response.data);
    } catch (error) {
      toast.error('Failed to fetch salespeople');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Salespeople</h2>
        <Button>Export Data</Button>
      </div>
      
      <DataTable
        columns={columns}
        data={data}
        loading={loading}
      />
    </div>
  );
} 