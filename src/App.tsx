import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/dashboard/Dashboard";
import Reviews from "./pages/dashboard/Reviews";
import QrCode from "./pages/dashboard/QrCode";
import Settings from "./pages/dashboard/Settings";
import SalespersonDashboard from "./pages/salesperson/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Onboarding from "./pages/Onboarding";
import OnboardingGuard from "./components/OnboardingGuard";
import Review from "./pages/Review";
import Survey from "./pages/Survey";
import OnboardingRoute from "@/components/OnboardingRoute";
import ReferralDashboard from "./pages/dashboard/ReferralDashboard";
import Payment from "./pages/dashboard/Payment";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/admin/Dashboard";
import BusinessDetails from "./components/admin/BusinessDetails";
import AdminRoute from "./components/auth/AdminRoute";
import BusinessList from "@/components/admin/BusinessList";
import SalespeopleList from "@/components/admin/SalespeopleList";
import FinancialOverview from "@/components/admin/FinancialOverview";
import AdminLayout from "@/components/admin/AdminLayout";
import CouponManager from "@/components/admin/CouponManager";
import NonSalespersonGuard from "@/components/NonSalespersonGuard";
import SubscriptionGuard from "@/components/SubscriptionGuard";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingRoute>
                    <Onboarding />
                  </OnboardingRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <OnboardingGuard>
                    <Routes>
                      {/* Wrap the main dashboard page with NonSalespersonGuard */}
                      <Route
                        index
                        element={
                          <NonSalespersonGuard>
                            <Dashboard />
                          </NonSalespersonGuard>
                        }
                      />
                      <Route
                        path="payment"
                        element={
                          <NonSalespersonGuard>
                            <Payment />
                          </NonSalespersonGuard>
                        }
                      />
                      <Route
                        path="reviews"
                        element={
                          <NonSalespersonGuard>
                            <SubscriptionGuard>
                              <Reviews />
                            </SubscriptionGuard>
                          </NonSalespersonGuard>
                        }
                      />
                      <Route
                        path="qr-code"
                        element={
                          <NonSalespersonGuard>
                            <SubscriptionGuard>
                              <QrCode />
                            </SubscriptionGuard>
                          </NonSalespersonGuard>
                        }
                      />
                      <Route path="settings" element={<Settings />} />
                      <Route
                        path="referrals"
                        element={
                          <OnboardingGuard>
                            {({ user }) =>
                              user?.isSalesperson ? (
                                <ReferralDashboard />
                              ) : (
                                <Navigate to="/dashboard" replace />
                              )
                            }
                          </OnboardingGuard>
                        }
                      />
                    </Routes>
                  </OnboardingGuard>
                </ProtectedRoute>
              }
            />
            <Route
              path="/salesperson/dashboard"
              element={
                <ProtectedRoute>
                  <OnboardingGuard>
                    {({ user }) =>
                      user?.isSalesperson ? (
                        <SalespersonDashboard />
                      ) : (
                        <Navigate to="/dashboard" replace />
                      )
                    }
                  </OnboardingGuard>
                </ProtectedRoute>
              }
            />
            <Route path="/review/:businessId" element={<Review />} />
            <Route path="/survey/:businessId" element={<Survey />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="businesses" element={<BusinessList />} />
              <Route path="businesses/:id" element={<BusinessDetails />} />
              <Route path="salespeople" element={<SalespeopleList />} />
              <Route path="financial" element={<FinancialOverview />} />
              <Route path="coupons" element={<CouponManager />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
