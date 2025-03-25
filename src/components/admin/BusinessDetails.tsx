import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  ArrowLeft, 
  Ban, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  CreditCard,
  DollarSign,
  Users,
  Landmark,
  Building,
  Download
} from 'lucide-react';
import api from '@/services/api';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/ui/data-table";

interface Business {
  id: string;
  business_name: string;
  owner_name: string;
  email: string;
  subscription_status: string;
  last_payment_date: string;
  last_payment_amount: number;
  address: string;
  phone: string;
  created_at: string;
  total_referrals: number;
  active_referrals: number;
  is_salesperson: boolean;
  bank_details?: {
    bank_name: string;
    account_number: string;
    transit_number?: string;
    institution_number?: string;
    account_type?: string;
  };
}

interface Stats {
  total_earnings: string | number;
  pending_payments: string | number;
  successful_referrals: string | number;
  conversion_rate: string | number;
}

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<Business | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingInvoice, setSendingInvoice] = useState(false);

  useEffect(() => {
    fetchBusinessDetails();
  }, [id]);

  const fetchBusinessDetails = async () => {
    try {
      const [businessRes, statsRes] = await Promise.all([
        api.get(`/auth/admin/businesses/${id}`),
        api.get(`/auth/admin/businesses/${id}/stats`)
      ]);
      setBusiness(businessRes.data);
      setStats(statsRes.data);
    } catch (error) {
      toast.error('Failed to fetch business details');
      navigate('/admin/businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvoice = async () => {
    if (!business) return;
    
    setSendingInvoice(true);
    try {
      await api.post(`/auth/admin/businesses/${business.id}/send-invoice`);
      toast.success('Invoice sent successfully');
    } catch (error) {
      toast.error('Failed to send invoice');
    } finally {
      setSendingInvoice(false);
    }
  };

  const handleSuspend = async () => {
    if (!business || !window.confirm('Are you sure you want to suspend this business?')) {
      return;
    }

    try {
      await api.post(`/auth/admin/businesses/${business.id}/suspend`);
      toast.success('Business suspended successfully');
      fetchBusinessDetails();
    } catch (error) {
      toast.error('Failed to suspend business');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!business) return <div>Business not found</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{business.business_name}</h1>
            <p className="text-sm text-muted-foreground">
              {business.is_salesperson ? 'Salesperson Account' : 'Business Account'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSendInvoice}
            disabled={sendingInvoice}
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {sendingInvoice ? 'Sending...' : 'Send Invoice'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleSuspend}
            className="flex items-center gap-2"
          >
            <Ban className="h-4 w-4" />
            Suspend
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          icon={<DollarSign className="h-4 w-4" />}
          label="Total Earnings"
          value={formatCurrency(stats?.total_earnings)}
        />
        <StatsCard 
          icon={<Users className="h-4 w-4" />}
          label="Total Referrals"
          value={business.total_referrals?.toString() || '0'}
        />
        <StatsCard 
          icon={<Users className="h-4 w-4" />}
          label="Active Referrals"
          value={business.active_referrals?.toString() || '0'}
        />
        <StatsCard 
          icon={<CreditCard className="h-4 w-4" />}
          label="Last Payment"
          value={formatCurrency(business.last_payment_amount)}
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Business Details</TabsTrigger>
          <TabsTrigger value="financial">Financial Information</TabsTrigger>
          {business.is_salesperson && (
            <TabsTrigger value="bank">Bank Details</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <DetailRow icon={<User />} label="Owner" value={business.owner_name} />
                <DetailRow icon={<Mail />} label="Email" value={business.email} />
                <DetailRow icon={<Phone />} label="Phone" value={business.phone || 'Not provided'} />
                <DetailRow icon={<MapPin />} label="Address" value={business.address || 'Not provided'} />
                <DetailRow 
                  icon={<Calendar />} 
                  label="Member Since" 
                  value={new Date(business.created_at).toLocaleDateString()} 
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Subscription Status</h2>
              <div className="space-y-4">
                <div className="mb-6">
                  <StatusBadge status={business.subscription_status} />
                </div>
                <DetailRow 
                  icon={<Calendar />}
                  label="Last Payment Date" 
                  value={business.last_payment_date ? 
                    new Date(business.last_payment_date).toLocaleDateString() : 
                    'No payment'} 
                />
                <DetailRow 
                  icon={<DollarSign />}
                  label="Last Payment Amount" 
                  value={business.last_payment_amount ? 
                    `$${business.last_payment_amount.toFixed(2)}` : 
                    'N/A'} 
                />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6">Financial Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <DetailRow 
                icon={<DollarSign className="h-4 w-4" />}
                label="Total Earnings" 
                value={formatCurrency(stats?.total_earnings)} 
              />
              <DetailRow 
                icon={<DollarSign className="h-4 w-4" />}
                label="Pending Payments" 
                value={formatCurrency(stats?.pending_payments)} 
              />
              <DetailRow 
                icon={<Users className="h-4 w-4" />}
                label="Successful Referrals" 
                value={stats?.successful_referrals?.toString() || '0'} 
              />
              <DetailRow 
                icon={<CreditCard className="h-4 w-4" />}
                label="Conversion Rate" 
                value={`${stats?.conversion_rate || 0}%`} 
              />
            </div>
          </Card>
        </TabsContent>

        {business.is_salesperson && (
          <TabsContent value="bank">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Bank Account Information</h2>
              {business.bank_details ? (
                <div className="space-y-4">
                  <DetailRow 
                    icon={<Landmark className="h-4 w-4" />}
                    label="Bank Name" 
                    value={business.bank_details.bank_name} 
                  />
                  <DetailRow 
                    icon={<CreditCard className="h-4 w-4" />}
                    label="Account Number" 
                    value={`****${business.bank_details.account_number.slice(-4)}`} 
                  />
                  {business.bank_details.transit_number && (
                    <DetailRow 
                      icon={<Building className="h-4 w-4" />}
                      label="Transit Number" 
                      value={business.bank_details.transit_number} 
                    />
                  )}
                  {business.bank_details.institution_number && (
                    <DetailRow 
                      icon={<Building2 className="h-4 w-4" />}
                      label="Institution Number" 
                      value={business.bank_details.institution_number} 
                    />
                  )}
                  {business.bank_details.account_type && (
                    <DetailRow 
                      icon={<CreditCard className="h-4 w-4" />}
                      label="Account Type" 
                      value={business.bank_details.account_type} 
                    />
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No bank details provided yet.</p>
              )}
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}

function StatsCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </Card>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusStyles()}`}>
      {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Inactive'}
    </div>
  );
}

const formatCurrency = (amount: string | number | null | undefined): string => {
  if (amount === null || amount === undefined) return '$0.00';
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
};