import { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import AnimatedSection from "@/components/AnimatedSection";
import SellerLayout from '@/layouts/SellerLayout';
import { getSellerReferralLink } from "@/services/api";

const ReferralLink = () => {
  const { toast } = useToast();
  const [referralLink, setReferralLink] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReferralLink = async () => {
      try {
        const { referralLink } = await getSellerReferralLink();
        setReferralLink(referralLink);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch referral link",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralLink();
  }, [toast]);

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "The referral link has been copied to your clipboard.",
    });
  };

  return (
    <SellerLayout>
      <div className="space-y-8">
        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={referralLink} 
                  readOnly 
                  placeholder={isLoading ? "Loading..." : ""}
                />
                <Button onClick={copyReferralLink} disabled={isLoading}>
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

        <AnimatedSection>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">1. Share Your Link</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your unique referral link with potential business owners.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">2. Business Signs Up</h3>
                  <p className="text-sm text-muted-foreground">
                    When a business owner uses your link to sign up, they'll be automatically connected to your account.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">3. Earn Commission</h3>
                  <p className="text-sm text-muted-foreground">
                    You'll earn 20% commission on their monthly subscription fee for as long as they remain a customer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </SellerLayout>
  );
};

export default ReferralLink; 