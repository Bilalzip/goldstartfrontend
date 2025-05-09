import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, CreditCard, Save } from "lucide-react";
import { getBusinessProfile, updateBusinessProfile } from "@/services/business";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    googleReviewLink: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "active" | "trial" | "cancelled" | "cancelling" | "pending" | null
  >(null);
  const [trialEndsAt, setTrialEndsAt] = useState<string | null>(null);
  const [subscriptionEndsAt, setSubscriptionEndsAt] = useState<string | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<{
    cardLast4: string | null;
    cardBrand: string | null;
    displayName: string | null;
  } | null>(null);

  // Check for subscription expired parameter
  useEffect(() => {
    // Check if we were redirected here due to an expired subscription
    const params = new URLSearchParams(window.location.search);
    if (params.get("expired") === "true") {
      toast({
        title: "Subscription Expired",
        description:
          "Your subscription has ended. Please renew to continue using premium features.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Fetch business profile data when component mounts
  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getBusinessProfile();
        setFormData({
          businessName: data.business_name,
          ownerName: data.owner_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          googleReviewLink: data.google_review_link,
        });
      } catch (error) {
        console.error("Error fetching business profile:", error);
        toast({
          title: "Error",
          description: "Failed to load business profile",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessProfile();
  }, [toast]);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const response = await api.get("/payment/subscription-status");
        console.log("Subscription response: ", response);
        setSubscriptionStatus(response.data.status);
        setTrialEndsAt(response.data.trialEndsAt);
        setSubscriptionEndsAt(response.data.subscriptionEndsAt);
        setPaymentMethod(response.data.paymentMethod);
      } catch (error) {
        console.error("Error fetching subscription status:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription status",
          variant: "destructive",
        });
      }
    };

    fetchSubscriptionStatus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateBusinessProfile(formData);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Direct cancellation function
  const handleDirectCancellation = async () => {
    if (
      !confirm(
        "Are you sure you want to cancel your subscription? Your access will continue until the end of your billing period."
      )
    ) {
      return;
    }

    try {
      setIsSaving(true);
      const response = await api.post("/payment/cancel-subscription");

      toast({
        title: "Success",
        description:
          "Your subscription has been cancelled and will end at the end of your billing period.",
      });

      // Refresh subscription status
      const statusResponse = await api.get("/payment/subscription-status");
      setSubscriptionStatus(statusResponse.data.status);
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to cancel subscription",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Stripe portal management function
  const handleManageInStripe = async () => {
    try {
      setIsSaving(true);
      const response = await api.post("/payment/create-update-session");

      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error("Failed to get Stripe portal URL");
      }
    } catch (error) {
      console.error("Error accessing Stripe portal:", error);
      toast({
        title: "Error",
        description: "Failed to access Stripe portal. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpgrade = async () => {
    try {
      setIsSaving(true);
      const response = await api.post("/payment/create-checkout-session");
      window.location.href = response.data.url; // Redirect to Stripe checkout
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast({
        title: "Error",
        description: "Failed to start upgrade process",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Add loading state
  if (isLoading) {
    return (
      <DashboardLayout title="Settings">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Settings">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and subscription settings
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <form onSubmit={handleSaveProfile}>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Update your business details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner's Name</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      disabled={true}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleReviewLink">
                    Google Review Link
                    <span className="ml-2 text-xs text-muted-foreground">
                      (Where 4+ star reviews will be redirected)
                    </span>
                  </Label>
                  <Input
                    id="googleReviewLink"
                    name="googleReviewLink"
                    value={formData.googleReviewLink}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    How to find your Google review link:
                    <a
                      href="https://support.google.com/business/answer/7035772"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-600 ml-1 hover:underline"
                    >
                      Learn more
                    </a>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subscriptionStatus === "trial" ? (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Free Trial{" "}
                        <span className="text-blue-600 text-xs font-normal">
                          (Active)
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Trial ends on{" "}
                        {new Date(trialEndsAt!).toLocaleDateString()}
                      </p>
                    </div>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-4">
                      Upgrade now to continue using all features after your
                      trial ends.
                    </p>
                    <Button
                      className="w-full"
                      onClick={handleUpgrade}
                      disabled={isSaving}
                    >
                      {isSaving ? "Processing..." : "Upgrade to Premium Plan"}
                    </Button>
                  </div>
                </div>
              ) : subscriptionStatus === "active" ? (
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Premium Plan{" "}
                        <span className="text-green-600 text-xs font-normal">
                          (Active)
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        $349.00 per month
                      </p>
                    </div>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Next billing date:</span>
                      <span className="text-sm font-medium">
                        {subscriptionEndsAt
                          ? new Date(subscriptionEndsAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "Not available"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Payment method:</span>
                      <span className="text-sm font-medium">
                        {paymentMethod?.displayName ||
                          "No payment method found"}
                      </span>
                    </div>
                  </div>
                </div>
              ) : subscriptionStatus === "cancelling" ? (
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-orange-600">
                        Subscription Ending Soon
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your subscription has been cancelled but remains active
                        until{" "}
                        {subscriptionEndsAt
                          ? new Date(subscriptionEndsAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "the end of your billing period"}
                        .
                      </p>
                      <Button
                        className="mt-2"
                        variant="outline"
                        onClick={handleManageInStripe}
                        disabled={isSaving}
                      >
                        {isSaving ? "Processing..." : "Reactivate Subscription"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : subscriptionStatus === "cancelled" ||
                subscriptionStatus === "pending" ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-600">
                        Subscription Ended
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your subscription has ended and premium features are no
                        longer available. Upgrade now to restore full access to
                        all features.
                      </p>
                      <Button
                        className="mt-2"
                        onClick={handleUpgrade}
                        disabled={isSaving}
                      >
                        {isSaving ? "Processing..." : "Reactivate Subscription"}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-600">
                        No Active Subscription
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You currently don't have an active subscription. Upgrade
                        now to access all premium features.
                      </p>
                      <Button
                        className="mt-2"
                        onClick={handleUpgrade}
                        disabled={isSaving}
                      >
                        {isSaving ? "Processing..." : "Upgrade Now"}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {subscriptionStatus === "active" && (
                <>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 mt-6">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-red-600">
                          Cancel Subscription
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Canceling your subscription will disable all review
                          collection features at the end of your current billing
                          period.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDirectCancellation}
                            disabled={isSaving}
                          >
                            {isSaving ? "Processing..." : "Cancel Subscription"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {user?.isSalesperson && (
          <TabsContent value="referrals">
            {/* Referral settings content */}
          </TabsContent>
        )}
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
