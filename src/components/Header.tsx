import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import logo from "../../assets/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const location = useLocation();
  const navigate = useNavigate();

  const totalItems = getTotalItems();
  const totalWishlistItems = wishlistItems.length;

  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Formations', path: '/products?category=formations' },
    { name: 'Modules', path: '/products?category=modules' },
    { name: 'Thèmes', path: '/products?category=themes' },
    { name: 'Blog', path: '/blog' },
    { name: 'À Propos', path: '/about' },
    // { name: 'Support', path: '/support' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-slate-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <span>✨ Offre spéciale : -30% sur toutes les formations !</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>📞 Support : +33 1 23 45 67 89</span>
              <span>✉️ contact@prestashop-academy.fr</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
          >
            <img src={logo} width={70} />
            <span>PrestaShop Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Admin access */}
            {/* <Link
              to="/admin/login"
              className="hidden md:block text-gray-700 hover:text-blue-900 transition-colors text-sm font-medium"
            >
              Admin
            </Link> */}

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Account */}
            <button
              onClick={() => navigate(user ? '/account' : '/login')}
              className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <User className="h-6 w-6" />
              {user && (
                <span className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate('/checkout')}
              className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
