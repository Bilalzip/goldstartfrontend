import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AnimatedSection from "@/components/AnimatedSection";
import { useDispatch } from 'react-redux';
import { signup } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store/store';
import { Checkbox } from "@/components/ui/checkbox";

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  isSalesperson: boolean;
}

type OnboardingFormData = {
  businessName: string;
  ownerName: string;
  phone: string;
  address: string;
  googleReviewLink: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  
  const referralCode = searchParams.get('ref');

  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    isSalesperson: false
  });

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

    try {
      setIsSubmitting(true);
      const result = await dispatch(signup({
        email: formData.email,
        password: formData.password,
        isSalesperson: formData.isSalesperson,
        referralCode: referralCode || undefined
      })).unwrap();
      
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      toast.success("Account created successfully!");
      if(formData.isSalesperson){
        navigate("/dashboard");
      } else {
        navigate("/onboarding");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'You already have an account ');
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
              Create Your Account
            </h1>
            <p className="text-muted-foreground text-lg">
              Get started with The Gold Star
            </p>
          </AnimatedSection>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8"
          >
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

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isSalesperson" 
                  checked={formData.isSalesperson}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isSalesperson: checked as boolean }))
                  }
                />
                <label 
                  htmlFor="isSalesperson" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Sign up as a salesperson
                </label>
              </div>

              {referralCode && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">
                    Signing up with referral code: {referralCode}
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Creating Account..." : "Create Account"}
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

export default SignUp;
