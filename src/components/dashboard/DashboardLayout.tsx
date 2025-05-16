import { ReactNode, useState } from "react";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  QrCode,
  Settings,
  Menu,
  X,
  LogOut,
  Users,
  Home,
  Star,
  User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useLogout } from "@/utils/auth";

type DashboardLayoutProps = {
  children: ReactNode;
  title: string;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
}) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  const getNavigationItems = () => {
    if (user?.isSalesperson) {
      // For salesperson, show a single Dashboard item pointing to referrals
      return [
        { name: "Dashboard", href: "/dashboard/referrals", icon: Users },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ...(user?.isAdmin
          ? [{ name: "Admin", href: "/admin", icon: User2Icon }]
          : []),
      ];
    } else {
      // For non-salesperson users, include all items
      return [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Reviews", href: "/dashboard/reviews", icon: Star },
        { name: "QR Codes", href: "/dashboard/qr-code", icon: QrCode },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        ...(user?.isAdmin
          ? [{ name: "Admin", href: "/admin", icon: User2Icon }]
          : []),
      ];
    }
  };

  // If we're on an admin route but user is not admin, redirect to dashboard
  if (location.pathname.startsWith("/admin") && !user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar toggle - Update positioning */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center gap-2">
            <div className="h-16 w-16 flex items-center justify-center">
              <img
                src="/Logo.png"
                alt="Gold Star Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <span className="text-lg font-medium">The Gold Star</span>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="py-4">
          <nav className="space-y-1 px-2">
            {getNavigationItems().map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-4 py-3 text-sm font-medium rounded-md",
                  location.pathname === item.href
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon
                  size={20}
                  className={cn(
                    "mr-3 flex-shrink-0",
                    location.pathname === item.href
                      ? "text-brand-600"
                      : "text-gray-500"
                  )}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* User info */}
        <div className="absolute bottom-16 w-full border-t p-4">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
              <User2Icon size={16} className="text-gray-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{user?.business_name}</span>
              <span className="text-xs text-gray-500">
                {user?.isAdmin
                  ? "Administrator"
                  : user?.isSalesperson
                  ? "Salesperson"
                  : "Business Owner"}
              </span>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 w-full border-t p-4">
          <Button
            variant="outline"
            className="w-full justify-start text-gray-700 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content - Update header styling */}
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {/* Updated mobile header layout */}
            <div className="flex items-center">
              <div className="lg:hidden w-8"></div> {/* Spacer for mobile */}
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1 text-center lg:text-left">
                {title}
              </h1>
              <div className="lg:hidden w-8"></div> {/* Spacer for mobile */}
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
