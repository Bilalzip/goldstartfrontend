import { useEffect, useState } from "react";
import { MessageSquare, Star, ThumbsUp, ThumbsDown, QrCode, Users, CheckCircle, DollarSign, TrendingUp, Calendar, Link as LinkIcon } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import SetupGuide from "@/components/dashboard/SetupGuide";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { getDashboardStats } from '@/services/business';
import { toast } from "react-hot-toast";
import api from "@/services/api";
import { type LucideIcon } from "lucide-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { setUser } from '@/store/slices/authSlice';

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
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (isAuthenticated && !user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, [isAuthenticated, user, dispatch]);
  
  useEffect(() => {
    if (user) {
      console.log("User subscriptionStatus:", user.subscriptionStatus);
      if (user.subscriptionStatus === 'pending') {
        toast.success("Subscribe to continue using the app.");
      }
    }
  }, [user]);
  
  // Fetch dashboard statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/business/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
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
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            {user.isSalesperson 
              ? `Welcome, ${user.businessName || 'New Seller'}! 🎯` 
              : `Welcome, ${user.businessName || 'New Business'}! 👋`}
          </h1>
          <p className="text-purple-100">
            {user.isSalesperson
              ? "Track your referrals and commissions from your sales dashboard"
              : "Track and manage your business reputation all in one place"}
          </p>
        </div>

        {/* Stats Section */}
        {user.isSalesperson ? (
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              title="Total Referrals"
              value="0"
              description="Businesses referred"
              icon={<Users className="h-4 w-4" />}
            />
            <StatsCard
              title="Active Referrals"
              value="0"
              description="Currently subscribed"
              icon={<CheckCircle className="h-4 w-4" />}
            />
            <StatsCard
              title="Total Earnings"
              value="$0"
              description="Commission earned"
              icon={<DollarSign className="h-4 w-4" />}
            />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <StatsCard
              title="Total Reviews"
              value={stats?.stats.total.toString() || "0"}
              description="Reviews collected"
              icon={<Star className="h-4 w-4" />}
            />
            <StatsCard
              title="Positive Reviews"
              value={stats?.stats.positive.toString() || "0"}
              description="4+ star reviews"
              icon={<ThumbsUp className="h-4 w-4" />}
            />
            <StatsCard
              title="Areas to Improve"
              value={stats?.stats.negative.toString() || "0"}
              description="Reviews under 4 stars"
              icon={<ThumbsDown className="h-4 w-4" />}
            />
          </div>
        )}

        {/* Action Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {user.isSalesperson ? (
            <>
              <ActionCard
                title="Share Referral Link"
                description="Generate and share your unique referral link"
                icon={<LinkIcon className="h-6 w-6" />}
                href="/dashboard/referrals"
              />
              <ActionCard
                title="View Earnings"
                description="Track your commission and payment history"
                icon={<DollarSign className="h-6 w-6" />}
                href="/dashboard/referrals"
              />
            </>
          ) : (
            <>
              <ActionCard
                title="Generate QR Code"
                description="Create a new QR code for review collection"
                icon={<QrCode className="h-6 w-6" />}
                href="/dashboard/qr-code"
              />
              <ActionCard
                title="View Reviews"
                description="See all your collected reviews"
                icon={<MessageSquare className="h-6 w-6" />}
                href="/dashboard/reviews"
              />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface ActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const ActionCard = ({ title, description, icon, href }: ActionCardProps) => (
  <Link to={href}>
    <Card className="hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  </Link>
);

export default Dashboard;
