import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Crown, User as UserIcon, LogOut, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

interface NavbarProps {
  onCartClick: () => void;
}

const Navbar = ({ onCartClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-card/95 backdrop-blur-md shadow-soft-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="w-8 h-8 text-accent transition-transform duration-300 group-hover:scale-110" />
            <span className="font-display text-2xl tracking-wider">
              SNEAKER ZONE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-medium transition-colors duration-200 relative group ${
                  isActiveLink(link.href) 
                    ? 'text-foreground' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.name}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActiveLink(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} 
                />
              </Link>
            ))}
          </div>

          {/* Wishlist, Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/wishlist">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label={`Open wishlist${wishlistCount > 0 ? `, ${wishlistCount} item${wishlistCount === 1 ? '' : 's'}` : ''}`}
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-accent text-accent' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={onCartClick}
              aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} item${totalItems === 1 ? '' : 's'}` : ''}`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {totalItems}
                </span>
              )}
            </Button>

            {user ? (
              <Button variant="ghost" size="icon" onClick={() => signOut()} title="Sign out" aria-label="Sign out">
                <LogOut className="w-5 h-5" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" title="Sign in" aria-label="Sign in">
                  <UserIcon className="w-5 h-5" />
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-card shadow-soft-lg transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="container-custom py-6 space-y-4">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-display text-2xl py-2 transition-colors ${
                isActiveLink(link.href) 
                  ? 'text-foreground' 
                  : 'text-foreground/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
