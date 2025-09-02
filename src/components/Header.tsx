import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onCartToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();

  const totalItems = getTotalItems();
  const totalWishlistItems = wishlistItems.length;

  const navigation = [
    { name: 'Accueil', page: 'home' },
    { name: 'Formations', page: 'formations' },
    { name: 'Modules', page: 'modules' },
    { name: 'Thèmes', page: 'themes' },
    { name: 'Blog', page: 'blog' },
    { name: 'À Propos', page: 'about' },
    { name: 'Support', page: 'support' }
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
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors"
            >
               <img src='logo.png' width={70}/>
              <span>PrestaShop Academy</span>
            </button>
          </div>

          {/* Search bar - Desktop */}
          {/* <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher formations, modules, thèmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div> */}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-blue-900 border-b-2 border-blue-900 pb-1'
                    : 'text-gray-700 hover:text-blue-900'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <button 
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Account */}
            <button 
              onClick={() => onNavigate(user ? 'account' : 'login')}
              className="relative p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <User className="h-6 w-6" />
              {user && (
                <span className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartToggle}
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

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-100 text-blue-900 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;