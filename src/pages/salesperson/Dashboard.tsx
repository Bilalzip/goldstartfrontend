
import { useState } from "react";
import { Copy, DollarSign, Link, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import StatsCard from "@/components/dashboard/StatsCard";

// This would come from your backend
const MOCK_REFERRALS = [
  {
    id: "1",
    businessName: "Green Cafe",
    ownerName: "John Smith",
    status: "active",
    joinDate: "2024-02-15",
    lastPayment: "2024-02-15",
    commission: 80,
  },
  {
    id: "2",
    businessName: "Blue Restaurant",
    ownerName: "Sarah Johnson",
    status: "pending",
    joinDate: "2024-02-14",
    lastPayment: null,
    commission: 0,
  },
];

const SalespersonDashboard = () => {
  const { toast } = useToast();
  const [referralLink] = useState("https://reputationrocket.com/signup?ref=SP123");
  
  const totalCommission = MOCK_REFERRALS.reduce((sum, ref) => sum + ref.commission, 0);
  const activeReferrals = MOCK_REFERRALS.filter(ref => ref.status === "active").length;
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "The referral link has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Salesperson Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Commission"
          value={`$${totalCommission}`}
          icon={<DollarSign className="h-4 w-4" />}
          description="Lifetime earnings"
        />
        <StatsCard
          title="Active Referrals"
          value={activeReferrals}
          icon={<Users className="h-4 w-4" />}
          description="Current active businesses"
        />
        <StatsCard
          title="Next Payout"
          value="Mar 1, 2024"
          icon={<Calendar className="h-4 w-4" />}
          description="Estimated date"
        />
        <StatsCard
          title="Commission Rate"
          value="20%"
          icon={<DollarSign className="h-4 w-4" />}
          description="Per successful referral"
        />
      </div>

      {/* Referral Link Section */}
      <AnimatedSection className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input value={referralLink} readOnly />
              <Button onClick={copyReferralLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Share this link with businesses to earn commission on their subscriptions
            </p>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Referrals List */}
      <AnimatedSection className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_REFERRALS.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{referral.businessName}</h3>
                    <p className="text-sm text-muted-foreground">{referral.ownerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${referral.commission}</p>
                    <span
                      className={`text-sm ${
                        referral.status === "active"
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>

      {/* Payment Schedule Info */}
      <AnimatedSection>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Commissions are calculated at the end of each month and paid out on the 1st of the following month.
                You'll receive 20% of the monthly subscription fee ($349) for each active referral.
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p className="font-medium">Next Payout Details:</p>
                <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                  <li>Payment Date: March 1, 2024</li>
                  <li>Expected Amount: ${totalCommission}</li>
                  <li>Active Referrals: {activeReferrals}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </AnimatedSection>
    </div>
  );
};

export default SalespersonDashboard;
