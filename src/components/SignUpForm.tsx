import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/AnimatedSection";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";

type BusinessData = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  googleReviewLink: string;
  referralCode: string;
  password: string;
  confirmPassword: string;
  isSalesperson: boolean;
};

type SignUpFormProps = {
  initialData: BusinessData;
  onSubmit: (data: BusinessData) => void;
  disabledFields?: (keyof BusinessData)[];
};

const SignUpForm = ({ initialData, onSubmit, disabledFields = [] }: SignUpFormProps) => {
  const [formData, setFormData] = useState<BusinessData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof BusinessData, string>>>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof BusinessData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BusinessData, string>> = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }
    
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email address is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Business address is required";
    }
    
    if (!formData.googleReviewLink.trim()) {
      newErrors.googleReviewLink = "Google review link is required";
    } else if (!/^https?:\/\//.test(formData.googleReviewLink)) {
      newErrors.googleReviewLink = "Please enter a valid URL";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Password confirmation is required";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        referralCode: formData.referralCode || undefined
      })).unwrap();
      
      // Only store email for form pre-filling - remove isNewSignup
      localStorage.setItem('userEmail', formData.email);
      
      toast.success("Account created successfully!");
      navigate("/onboarding");
      
    } catch (error: any) {
      toast.error(error || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <AnimatedSection delay={0.1} className="space-y-2">
          <label htmlFor="businessName" className="text-sm font-medium">
            Business Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="businessName"
            name="businessName"
            placeholder="Your Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className={errors.businessName ? "border-red-500" : ""}
          />
          {errors.businessName && (
            <p className="text-red-500 text-sm">{errors.businessName}</p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="space-y-2">
          <label htmlFor="ownerName" className="text-sm font-medium">
            Business Owner's Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="ownerName"
            name="ownerName"
            placeholder="Your Full Name"
            value={formData.ownerName}
            onChange={handleChange}
            className={errors.ownerName ? "border-red-500" : ""}
          />
          {errors.ownerName && (
            <p className="text-red-500 text-sm">{errors.ownerName}</p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.3} className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={disabledFields.includes('email')}
            className={`${disabledFields.includes('email') ? 'bg-gray-100' : ''}`}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.4} className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </AnimatedSection>

        <AnimatedSection delay={0.5} className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Business Address <span className="text-red-500">*</span>
          </label>
          <Input
            id="address"
            name="address"
            placeholder="123 Business St, City, State, ZIP"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.6} className="space-y-2">
          <label htmlFor="googleReviewLink" className="text-sm font-medium">
            Google Review Link <span className="text-red-500">*</span>
          </label>
          <Input
            id="googleReviewLink"
            name="googleReviewLink"
            placeholder="https://g.page/r/..."
            value={formData.googleReviewLink}
            onChange={handleChange}
            className={errors.googleReviewLink ? "border-red-500" : ""}
          />
          {errors.googleReviewLink && (
            <p className="text-red-500 text-sm">{errors.googleReviewLink}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Where positive reviews will be directed. Find your Google review link in your Google Business Profile.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.7} className="space-y-2">
          <label htmlFor="referralCode" className="text-sm font-medium">
            Referral Code (if applicable)
          </label>
          <Input
            id="referralCode"
            name="referralCode"
            placeholder="Enter referral code"
            value={formData.referralCode}
            onChange={handleChange}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.8} className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.9} className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? "border-red-500" : ""}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </AnimatedSection>
      </div>

      <AnimatedSection delay={1} className="pt-4">
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          Continue to Payment
        </Button>
      </AnimatedSection>
    </form>
  );
};

export default SignUpForm;
