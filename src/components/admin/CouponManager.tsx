import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { toast } from 'react-hot-toast';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { Button } from '../ui/button';
import { Ticket } from 'lucide-react';

interface Coupon {
  id: number;
  code: string;
  description: string;
  type: 'trial' | 'discount' | 'fixed';
  value: number;
  max_uses: number;
  times_used: number;
  is_active: boolean;
  expires_at: string;
}

export default function CouponManager() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    type: 'trial',
    value: 0,
    max_uses: 100,
    expires_at: ''
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch('https://goldstarserver-xeqt.onrender.com/auth/coupons/list', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      toast.error('Failed to fetch coupons');
    }
  };
  
  const createCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://goldstarserver-xeqt.onrender.com/auth/coupons/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newCoupon)
      });
      
      if (response.ok) {
        toast.success('Coupon created successfully');
        fetchCoupons();
        setNewCoupon({
          code: '',
          description: '',
          type: 'trial',
          value: 0,
          max_uses: 100,
          expires_at: ''
        });
      }
    } catch (error) {
      toast.error('Failed to create coupon');
    }
  };

  const deactivateCoupon = async (id: number) => {
    try {
      const response = await fetch(`https://goldstarserver-xeqt.onrender.com/auth/coupons/${id}/deactivate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        toast.success('Coupon deactivated');
        fetchCoupons();
      }
    } catch (error) {
      toast.error('Failed to deactivate coupon');
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Create New Coupon</h2>
        </CardHeader>
        <CardContent>
          <form onSubmit={createCoupon} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Code"
                value={newCoupon.code}
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                required
              />
              <Input
                placeholder="Description"
                value={newCoupon.description}
                onChange={e => setNewCoupon({...newCoupon, description: e.target.value})}
                required
              />
              <Select
                value={newCoupon.type}
                onChange={e => setNewCoupon({...newCoupon, type: e.target.value as 'trial' | 'discount' | 'fixed'})}
              >
                <option value="trial">Trial</option>
                <option value="discount">Discount</option>
                <option value="fixed">Fixed Amount</option>
              </Select>
              <Input
                type="number"
                placeholder="Value"
                value={newCoupon.value}
                onChange={e => setNewCoupon({...newCoupon, value: parseInt(e.target.value)})}
                required
              />
              <Input
                type="number"
                placeholder="Max Uses"
                value={newCoupon.max_uses}
                onChange={e => setNewCoupon({...newCoupon, max_uses: parseInt(e.target.value)})}
                required
              />
              <Input
                type="datetime-local"
                value={newCoupon.expires_at}
                onChange={e => setNewCoupon({...newCoupon, expires_at: e.target.value})}
                required
              />
            </div>
            <Button type="submit">Create Coupon</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Active Coupons</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Uses</th>
                  <th className="text-left p-2">Expires</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map(coupon => (
                  <tr key={coupon.id} className="border-t">
                    <td className="p-2">{coupon.code}</td>
                    <td className="p-2">{coupon.type}</td>
                    <td className="p-2">{coupon.value}</td>
                    <td className="p-2">{coupon.times_used} / {coupon.max_uses}</td>
                    <td className="p-2">{new Date(coupon.expires_at).toLocaleDateString()}</td>
                    <td className="p-2">
                      {coupon.is_active ? (
                        <Button 
                          variant="destructive"
                          onClick={() => deactivateCoupon(coupon.id)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <span className="text-red-500">Inactive</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 