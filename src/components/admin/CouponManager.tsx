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

  // Helper function to get the appropriate label for value input
  const getValueLabel = () => {
    switch(newCoupon.type) {
      case 'trial': return 'Trial days';
      case 'discount': return 'Discount percentage';
      case 'fixed': return 'Fixed amount ($)';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Create New Coupon</h2>
          <p className="text-sm text-gray-500">Create promotional codes for your customers</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={createCoupon} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Code</label>
                <Input
                  placeholder="Code (e.g. WELCOME10)"
                  value={newCoupon.code}
                  onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Unique code that users will enter to redeem</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  placeholder="Description (e.g. Welcome offer)"
                  value={newCoupon.description}
                  onChange={e => setNewCoupon({...newCoupon, description: e.target.value})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Internal note for your reference</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Coupon Type</label>
                <Select
                  value={newCoupon.type}
                  onChange={e => setNewCoupon({...newCoupon, type: e.target.value as 'trial' | 'discount' | 'fixed'})}
                >
                  <option value="trial">Trial (Free days)</option>
                  <option value="discount">Discount (Percentage %)</option>
                  <option value="fixed">Fixed Amount ($)</option>
                </Select>
                <p className="text-xs text-gray-500 mt-1">
                  {newCoupon.type === 'trial' && 'Gives users free trial days'}
                  {newCoupon.type === 'discount' && 'Applies percentage discount to price'}
                  {newCoupon.type === 'fixed' && 'Applies fixed dollar amount discount'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">{getValueLabel()}</label>
                <Input
                  type="number"
                  placeholder={`Enter ${getValueLabel().toLowerCase()}`}
                  value={newCoupon.value}
                  onChange={e => setNewCoupon({...newCoupon, value: parseInt(e.target.value)})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newCoupon.type === 'trial' && 'Number of days for free trial'}
                  {newCoupon.type === 'discount' && 'Percentage off (1-100)'}
                  {newCoupon.type === 'fixed' && 'Amount in dollars to discount'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Maximum Uses</label>
                <Input
                  type="number"
                  placeholder="Max number of times this can be used"
                  value={newCoupon.max_uses}
                  onChange={e => setNewCoupon({...newCoupon, max_uses: parseInt(e.target.value)})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Coupon deactivates after this many uses</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Expiration Date</label>
                <Input
                  type="datetime-local"
                  value={newCoupon.expires_at}
                  onChange={e => setNewCoupon({...newCoupon, expires_at: e.target.value})}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Coupon will be unusable after this date</p>
              </div>
            </div>
            <Button type="submit">Create Coupon</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Active Coupons</h2>
          <p className="text-sm text-gray-500">Manage your existing promotional coupons</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Value</th>
                  <th className="text-left p-2">Uses</th>
                  <th className="text-left p-2">Expires</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center p-4 text-gray-500">
                      No coupons found. Create one using the form above.
                    </td>
                  </tr>
                ) : (
                  coupons.map(coupon => (
                    <tr key={coupon.id} className="border-t">
                      <td className="p-2 font-medium">{coupon.code}</td>
                      <td className="p-2">
                        {coupon.type === 'trial' && 'Trial Days'}
                        {coupon.type === 'discount' && 'Discount %'}
                        {coupon.type === 'fixed' && 'Fixed $'}
                      </td>
                      <td className="p-2">
                        {coupon.type === 'trial' && `${coupon.value} days`}
                        {coupon.type === 'discount' && `${coupon.value}%`}
                        {coupon.type === 'fixed' && `$${coupon.value}`}
                      </td>
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}