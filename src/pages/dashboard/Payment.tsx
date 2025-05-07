import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Tag, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/services/api";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/authSlice";

interface Coupon {
  code: string;
  description: string;
  type: "trial" | "discount";
  value: number;
}

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    try {
      setIsApplying(true);
      const response = await api.post("/auth/coupons/validate", {
        code: couponCode,
      });
      setAppliedCoupon(response.data);

      // Get current user data
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

      if (response.data.type === "trial") {
        // Update user data with trial status
        const updatedUser = {
          ...currentUser,
          subscriptionStatus: "trial",
          hasFreeTrialCoupon: true,
        };

        // Update Redux store and localStorage
        dispatch(setUser(updatedUser));
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.success(`Trial activated for ${response.data.value} days!`);
        navigate("/dashboard");
      } else {
        toast.success(`Coupon applied: ${response.data.description}`);
      }

      setCouponCode("");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon removed");
  };

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      if (appliedCoupon?.type === "trial") {
        await api.post("/payment/start-trial", {
          couponCode: appliedCoupon.code,
        });
        toast.success(`Trial started! Valid for ${appliedCoupon.value} days.`);
        navigate("/dashboard");
        return;
      }

      const response = await api.post("/payment/create-checkout-session", {
        couponCode: appliedCoupon?.code,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to process request");
    } finally {
      setLoading(false);
    }
  };

  const getPrice = () => {
    if (!appliedCoupon) return "$349/month";
    if (appliedCoupon.type === "trial") return "Free Trial";
    const discountedPrice = 399 * (1 - appliedCoupon.value / 100);
    return `$${discountedPrice.toFixed(2)}/month`;
  };

  useEffect(() => {
    if (appliedCoupon?.type === "trial") {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [appliedCoupon, navigate]);

  return (
    <DashboardLayout title="Subscribe">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="border-2 border-purple-500">
          <CardHeader>
            <CardTitle className="text-2xl">
              Complete Your Subscription
            </CardTitle>
            <CardDescription>
              Get started with our service today
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Price Display */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-3xl font-bold">{getPrice()}</div>
                  {appliedCoupon?.type === "trial" && (
                    <div className="text-sm text-purple-200">
                      {appliedCoupon.value} days free trial
                    </div>
                  )}
                </div>
                {appliedCoupon && (
                  <div className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {appliedCoupon.type === "trial"
                      ? "Trial Active"
                      : "Discount Applied"}
                  </div>
                )}
              </div>
            </div>

            {/* Features and Subscribe Button */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">What's included:</h3>
                <ul className="space-y-3">
                  {[
                    "Unlimited QR code generation",
                    "Real-time review monitoring",
                    "Customer feedback analytics",
                    "Review response templates",
                    "Multi-location support",
                    "Priority customer support",
                    "Custom branding options",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : appliedCoupon?.type === "trial" ? (
                  `Start ${appliedCoupon.value}-Day Free Trial`
                ) : (
                  "Subscribe Now"
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Secure payment powered by Stripe. Cancel anytime.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
