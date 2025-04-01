import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';
import AnimatedSection from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/services/api';

const Onboarding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const userEmail = user?.email || '';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: "",
    ownerName: "",
    email: userEmail,
    phone: "",
    address: "",
    googleReviewLink: ""
  });

  useEffect(() => {
    if (user?.email) {
      setBusinessData(prev => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBusinessData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const response = await api.post('/auth/complete-onboarding', businessData);
      
      // Get the existing user data from localStorage to preserve all fields
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Merge the existing user data with the new data
      const userData = {
        ...existingUser,
        id: response.data.user.id,
        email: response.data.user.email,
        businessName: response.data.user.businessName,
        isSalesperson: response.data.user.isSalesperson || existingUser.isSalesperson, // Preserve salesperson status
        onboarding_completed: response.data.user.onboarding_completed,
        subscriptionStatus: response.data.user.subscriptionStatus
      };
      
      // Update both localStorage and Redux state
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch(setUser(userData));
      
      toast.success('Onboarding completed successfully!');
      
      // Redirect based on user type
      if (userData.isSalesperson) {
        navigate('/dashboard/referral');
      } else {
        navigate('/payment');
      }
    } catch (error) {
      toast.error('Failed to complete onboarding');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-lg">
        <AnimatedSection className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Details</h1>
          <p className="text-muted-foreground text-lg">Tell us about your business</p>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  name="businessName"
                  placeholder="Your Business Name"
                  value={businessData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="ownerName">Owner Name</Label>
                <Input
                  id="ownerName"
                  name="ownerName"
                  placeholder="Your Full Name"
                  value={businessData.ownerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={businessData.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-sm text-muted-foreground mt-1">Email cannot be changed</p>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={businessData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Business St, City, State, ZIP"
                  value={businessData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="googleReviewLink">Google Review Link</Label>
                <Input
                  id="googleReviewLink"
                  name="googleReviewLink"
                  placeholder="https://g.page/r/..."
                  value={businessData.googleReviewLink}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Where positive reviews will be directed. Find your Google review link in your Google Business Profile.
                </p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Complete Setup"}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Onboarding; 