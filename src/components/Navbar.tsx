import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "@/store/store";
import { logout } from "@/store/slices/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <span className="text-xl font-bold">TGS</span>
          </div>
          <span className="text-xl font-bold">The Gold Star</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-brand-600 transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="font-medium hover:text-brand-600 transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="font-medium hover:text-brand-600 transition-colors">
            Contact
          </Link>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white/95 backdrop-blur-sm"
        >
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className="px-4 py-2 font-medium hover:bg-brand-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/pricing" 
              className="px-4 py-2 font-medium hover:bg-brand-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="px-4 py-2 font-medium hover:bg-brand-50 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-2 font-medium hover:bg-brand-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  className="w-full justify-center" 
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 font-medium hover:bg-brand-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Button 
                  className="w-full justify-center" 
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
