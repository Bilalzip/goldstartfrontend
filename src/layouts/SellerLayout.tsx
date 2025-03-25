import { Link, useLocation } from 'react-router-dom';
import { DollarSign, Users, Link as LinkIcon, Calendar } from 'lucide-react';

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/seller',
      icon: DollarSign,
      current: location.pathname === '/seller'
    },
    {
      name: 'Referrals',
      href: '/seller/referrals',
      icon: Users,
      current: location.pathname === '/seller/referrals'
    },
    {
      name: 'Referral Links',
      href: '/seller/links',
      icon: LinkIcon,
      current: location.pathname === '/seller/links'
    },
    {
      name: 'Payments',
      href: '/seller/payments',
      icon: Calendar,
      current: location.pathname === '/seller/payments'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-purple-600">Seller Portal</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      item.current
                        ? 'border-purple-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }
                    inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
} 