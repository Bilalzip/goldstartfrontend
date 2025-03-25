import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  LineChart,
  Menu,
  X,
  Home,
  ArrowLeft,
  LogOut,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLogout } from '@/utils/auth';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  
  const navigationItems = [
    { name: 'Overview', href: '/admin', icon: Home },
    { name: 'Businesses', href: '/admin/businesses', icon: Building2 },
    { name: 'Salespeople', href: '/admin/salespeople', icon: Users },
    { name: 'Financial', href: '/admin/financial', icon: LineChart },
    { name: 'Coupons', href: '/admin/coupons', icon: Ticket }
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto bg-white px-4 py-4 border-r">
          {/* Logo */}
          <div className="flex h-16 items-center border-b mb-4 px-2">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <span className="text-xl font-semibold">Admin Portal</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  location.pathname === item.href
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t pt-4 mt-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:text-brand-600"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-gray-700 hover:text-red-600"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile header and main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden border-b bg-white px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <span className="text-white font-semibold">A</span>
              </div>
              <span className="text-xl font-semibold">Admin</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 lg:px-8">
            {/* Page header */}
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {navigationItems.find(item => item.href === location.pathname)?.name || 'Admin'}
              </h1>
            </div>

            {/* Page content */}
            <div className="min-h-[calc(100vh-12rem)]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600/75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}