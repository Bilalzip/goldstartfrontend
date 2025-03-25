import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Copy, DollarSign, Users, TrendingUp, Share2, Gift } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/services/api';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Input } from '@/components/ui/input';

interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
}

interface Referral {
  id: number;
  referredBusinessId: number;
  businessName: string;
  email: string;
  status: string;
  createdAt: string;
  earnings: number;
  onboardingCompleted: boolean;
  subscriptionStatus: string;
}

interface BankDetails {
  accountHolderName: string;
  transitNumber: string;     // 5 digits
  institutionNumber: string; // 3 digits
  accountNumber: string;     // 7-12 digits
  bankName: string;
  accountType: 'checking' | 'savings';
}

export default function ReferralDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [referralCode, setReferralCode] = useState<string>('');
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    accountHolderName: '',
    transitNumber: '',
    institutionNumber: '',
    accountNumber: '',
    bankName: '',
    accountType: 'checking'
  });
  const [isSavingBank, setIsSavingBank] = useState(false);

  useEffect(() => {
    fetchReferralData();
    fetchReferralCode();
    fetchBankDetails();
  }, []);

  const fetchReferralData = async () => {
    try {
      console.log('Fetching referral data...');
      const response = await api.get('/referral/dashboard');
      console.log('Referral data response:', response.data);
      console.log(response.data)
      setStats(response.data.stats);
      setReferrals(response.data.referrals);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchReferralCode = async () => {
    try {
      console.log('Fetching referral code...');
      const response = await api.post('/referral/generate-code');
      console.log('Referral code response:', response.data);
      if (response.data.referralCode) {
        setReferralCode(response.data.referralCode);
      }
    } catch (error) {
      console.error('Error generating referral code:', error);
      toast.error('Failed to generate referral code');
    }
  };

  const fetchBankDetails = async () => {
    try {
      const response = await api.get('/bank-details');
      if (response.data) {
        setBankDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching bank details:', error);
    }
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBankDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateBankDetails = () => {
    if (!/^\d{5}$/.test(bankDetails.transitNumber)) {
      toast.error('Transit number must be 5 digits');
      return false;
    }
    if (!/^\d{3}$/.test(bankDetails.institutionNumber)) {
      toast.error('Institution number must be 3 digits');
      return false;
    }
    if (!/^\d{7,12}$/.test(bankDetails.accountNumber)) {
      toast.error('Account number must be 7-12 digits');
      return false;
    }
    return true;
  };

  const handleSaveBankDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateBankDetails()) return;
    
    setIsSavingBank(true);
    try {
      await api.post('/bank-details', bankDetails);
      toast.success('Bank details saved successfully');
    } catch (error) {
      console.error('Error saving bank details:', error);
      toast.error('Failed to save bank details');
    } finally {
      setIsSavingBank(false);
    }
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  if (loading) {
    return (
      <DashboardLayout title="Referral Program">
        <div className="flex items-center justify-center h-96">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Referral Program">
      <div className="w-full overflow-x-hidden">
        <div className="space-y-4 px-4 max-w-[100vw] mx-auto">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 md:p-8 text-white w-[calc(100vw-2rem)] md:w-full mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="w-full">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Refer & Earn</h1>
                <p className="text-purple-100 mb-4 text-sm md:text-base">
                  Earn 20% of monthly subscription fees from businesses you refer
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full sm:w-auto bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <code className="text-base md:text-lg font-mono break-all">{referralCode}</code>
                  </div>
                  <Button 
                    onClick={copyReferralLink} 
                    variant="secondary"
                    className="w-full sm:w-auto bg-white text-purple-600 hover:bg-purple-50"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 w-[calc(100vw-2rem)] md:w-full mx-auto">
            <Card className="border-l-4 border-l-green-500 w-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  Total Earnings
                </CardTitle>
                <CardDescription className="text-sm">Your lifetime earnings from referrals</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-green-600">
                  ${Number(stats?.totalEarnings).toFixed(2)}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500 w-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Users className="h-4 w-4 text-blue-500" />
                  Total Referrals
                </CardTitle>
                <CardDescription className="text-sm">Businesses you've referred</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-blue-600">
                  {stats?.totalReferrals}
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 w-full">
              <CardHeader className="p-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  Active Referrals
                </CardTitle>
                <CardDescription className="text-sm">Currently subscribed businesses</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-purple-600">
                  {stats?.activeReferrals}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-[calc(100vw-2rem)] md:w-full mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Referral History</CardTitle>
                <CardDescription className="text-sm">Track all your referrals and earnings</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-left">Business</th>
                          <th className="px-6 py-4 text-left">Email</th>
                          <th className="px-6 py-4 text-left">Status</th>
                          <th className="px-6 py-4 text-right">Earnings</th>
                          <th className="px-6 py-4 text-right">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {referrals.map((referral) => (
                          <tr key={referral.id} className="bg-card hover:bg-muted/50 transition-colors">
                            <td className="px-6 py-4 font-medium">{referral.businessName}</td>
                            <td className="px-6 py-4 text-muted-foreground">{referral.email}</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                referral.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : referral.status === 'pending_onboarding'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-orange-100 text-orange-800'
                              }`}>
                                {referral.status === 'pending_onboarding' 
                                  ? 'Pending Onboarding'
                                  : referral.status === 'pending_subscription'
                                  ? 'Pending Subscription'
                                  : 'Active'}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right font-medium">
                              ${Number(referral.earnings).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-right text-muted-foreground">
                              {new Date(referral.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                        {referrals.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                              <div className="flex flex-col items-center gap-2">
                                <Gift className="w-8 h-8 text-muted-foreground/50" />
                                <p>No referrals yet. Share your referral code to start earning!</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-[calc(100vw-2rem)] md:w-full mx-auto">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Bank Account Details</CardTitle>
                <CardDescription className="text-sm">
                  Add your Canadian bank account details to receive referral payments
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <form onSubmit={handleSaveBankDetails} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">
                        Account Holder Name
                      </label>
                      <Input
                        name="accountHolderName"
                        value={bankDetails.accountHolderName}
                        onChange={handleBankDetailsChange}
                        placeholder="Enter the name on your bank account"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Transit Number
                        <span className="text-xs text-muted-foreground ml-2">(5 digits)</span>
                      </label>
                      <Input
                        name="transitNumber"
                        value={bankDetails.transitNumber}
                        onChange={handleBankDetailsChange}
                        placeholder="XXXXX"
                        maxLength={5}
                        pattern="\d{5}"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Found on your cheque or through online banking
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Institution Number
                        <span className="text-xs text-muted-foreground ml-2">(3 digits)</span>
                      </label>
                      <Input
                        name="institutionNumber"
                        value={bankDetails.institutionNumber}
                        onChange={handleBankDetailsChange}
                        placeholder="XXX"
                        maxLength={3}
                        pattern="\d{3}"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Your bank's unique identifier
                      </p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">
                        Account Number
                        <span className="text-xs text-muted-foreground ml-2">(7-12 digits)</span>
                      </label>
                      <Input
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        placeholder="Enter your account number"
                        maxLength={12}
                        pattern="\d{7,12}"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Bank Name
                      </label>
                      <select
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={(e) => handleBankDetailsChange(e as any)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="">Select your bank</option>
                        <option value="RBC Royal Bank">RBC Royal Bank</option>
                        <option value="TD Canada Trust">TD Canada Trust</option>
                        <option value="Scotiabank">Scotiabank</option>
                        <option value="BMO">BMO</option>
                        <option value="CIBC">CIBC</option>
                        <option value="National Bank">National Bank</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Account Type
                      </label>
                      <select
                        name="accountType"
                        value={bankDetails.accountType}
                        onChange={(e) => handleBankDetailsChange(e as any)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        required
                      >
                        <option value="checking">Checking Account</option>
                        <option value="savings">Savings Account</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Where to find these numbers?</h4>
                    <img 
                      src="/cheque-example.png" 
                      alt="Canadian cheque showing transit, institution, and account numbers"
                      className="w-full max-w-md mx-auto"
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <Button 
                      type="submit" 
                      disabled={isSavingBank}
                      className="w-full md:w-auto"
                    >
                      {isSavingBank ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        'Save Bank Details'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="w-[calc(100vw-2rem)] md:w-full mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="p-4">
                <CardTitle className="text-base">Payment History</CardTitle>
                <CardDescription className="text-sm">Track your referral payments</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-6 py-4 text-left">Amount</th>
                          <th className="px-6 py-4 text-left">Status</th>
                          <th className="px-6 py-4 text-left">Date</th>
                          <th className="px-6 py-4 text-left">Transaction ID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                            <div className="flex flex-col items-center gap-2">
                              <DollarSign className="w-8 h-8 text-muted-foreground/50" />
                              <p>No payments processed yet</p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 
