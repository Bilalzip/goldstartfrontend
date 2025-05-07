import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedSection from "@/components/AnimatedSection";
import { useDispatch } from "react-redux";
import { signup } from "@/store/slices/authSlice";
import type { AppDispatch } from "@/store/store";
import { Checkbox } from "@/components/ui/checkbox";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const SalespersonSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const referralCode = searchParams.get("ref");

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [legalConsent, setLegalConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!legalConsent) {
      toast.error(
        "You must agree to the terms and policies to create an account"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await dispatch(
        signup({
          email: formData.email,
          password: formData.password,
          isSalesperson: true, // Always true for salesperson signup
          referralCode: referralCode || undefined,
        })
      ).unwrap();

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      toast.success("Salesperson account created successfully!");
      navigate("/dashboard/referrals");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "You already have an account "
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 pt-24 pb-12">
        <div className="container max-w-lg">
          <AnimatedSection className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Create Salesperson Account
            </h1>
            <p className="text-muted-foreground text-lg">
              Join The Gold Star sales team
            </p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8"
          >
            {/* Salesperson info banner */}
            <div className="p-4 bg-brand-50 border border-brand-200 rounded-lg mb-6">
              <h3 className="font-semibold text-brand-700 mb-1">
                Salesperson Account
              </h3>
              <p className="text-sm text-brand-600">
                This signup is for Gold Star salespeople only. If you're a
                regular user,{" "}
                <Link to="/signup" className="font-medium underline">
                  click here to sign up
                </Link>
                .
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {referralCode && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Signing up with referral code: {referralCode}
                  </p>
                </div>
              )}

              {/* Legal consent checkbox */}
              <div className="space-y-4 mt-6 border-t pt-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="legal-consent"
                    checked={legalConsent}
                    onCheckedChange={(checked) =>
                      setLegalConsent(checked as boolean)
                    }
                    className="mt-1"
                    required
                  />
                  <div>
                    <label
                      htmlFor="legal-consent"
                      className="text-sm leading-relaxed"
                    >
                      By checking this box, I confirm that I have read and agree
                      to The Gold Star's{" "}
                      <Link
                        to="/legal/terms"
                        className="text-brand-600 hover:underline"
                      >
                        Terms of Service
                      </Link>
                      ,{" "}
                      <Link
                        to="/legal/privacy"
                        className="text-brand-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      ,{" "}
                      <Link
                        to="/legal/refund"
                        className="text-brand-600 hover:underline"
                      >
                        Refund & Cancellation Policy
                      </Link>
                      , and{" "}
                      <Link
                        to="/legal/payment"
                        className="text-brand-600 hover:underline"
                      >
                        Payment & Billing Policy
                      </Link>
                      . I confirm that I am authorized to act as a salesperson
                      for The Gold Star.
                    </label>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Salesperson Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-brand-600 hover:text-brand-700 font-medium"
                >
                  Log in
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SalespersonSignUp;
