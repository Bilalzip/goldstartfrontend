// src/pages/dashboard/Dashboard.tsx
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "@/services/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  customer_name?: string;
}

interface DashboardStats {
  stats: {
    total: number;
    positive: number;
    negative: number;
  };
  recentActivity: Review[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  // Fetch latest user data when dashboard loads
  useEffect(() => {
    const refreshUserData = async () => {
      if (isAuthenticated) {
        try {
          // Get fresh user data from server
          const response = await api.get("/auth/me"); // Update with your actual endpoint
          if (response.data) {
            // Update Redux store
            dispatch(setUser(response.data));
            // Update localStorage
            localStorage.setItem("user", JSON.stringify(response.data));
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
          // Fallback to localStorage if API call fails
          const storedUser = localStorage.getItem("user");
          if (storedUser && !user) {
            dispatch(setUser(JSON.parse(storedUser)));
          }
        }
      }
    };

    refreshUserData();
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (user) {
      console.log("User subscriptionStatus:", user.subscriptionStatus);
      if (user.subscriptionStatus === "pending") {
        toast.success("Subscribe to continue using the app.");
      }
    }
  }, [user]);

  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/business/dashboard-stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !user) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </DashboardLayout>
    );
  }

  const positivePercentage = stats?.stats.total
    ? ((stats.stats.positive / stats.stats.total) * 100).toFixed(1)
    : "0";

  return (
    <DashboardLayout title="Dashboard">
      {/* Rest of your dashboard component content */}
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {user.isSalesperson
              ? `Welcome, ${user.businessName || "New Seller"}! 🎯`
              : `Welcome, ${user.businessName || "New Business"}! 👋`}
          </h1>
          <p className="text-purple-100">
            {user.isSalesperson
              ? "Track your referrals and commissions from your sales dashboard"
              : "Track and manage your business reputation all in one place"}
          </p>
        </div>

        {/* Display subscription status indicator if needed */}
        {user.subscriptionStatus === "pending" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <h3 className="font-medium">Subscription Required</h3>
            <p>
              Your subscription has expired. Some features will be unavailable
              until you renew.
            </p>
            <Button
              as={Link}
              to="/dashboard/payment"
              className="mt-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Renew Subscription
            </Button>
          </div>
        )}

        {/* Rest of your Dashboard component remains the same */}
        {/* ... */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
