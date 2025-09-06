import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { WishlistProvider } from './hooks/useWishlist';
import { AdminProvider } from './hooks/useAdmin';
import { ChatProvider } from './hooks/useChat';

import Header from './components/Header';
import Footer from './components/Footer';
import MiniChat from './components/MiniChat';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Support from './pages/Support';
import Login from './pages/Login';
import Account from './pages/Account';
import EditProfile from './pages/EditProfile';
import PaymentCards from './pages/PaymentCards';
import PaymentSettings from './pages/PaymentSettings';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AdminProvider>
            <ChatProvider>
              <Router>
                <div className="min-h-screen bg-gray-50 flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/formations" element={<Products />} />
                      <Route path="/modules" element={<Products />} />
                      <Route path="/themes" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogDetail />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/account/edit" element={<EditProfile />} />
                      <Route path="/account/payment-cards" element={<PaymentCards />} />
                      <Route path="/account/payment-settings" element={<PaymentSettings />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin/*" element={<AdminDashboard />} />
                    </Routes>
                  </main>
                  <Footer />
                  <MiniChat />
                </div>
              </Router>
            </ChatProvider>
          </AdminProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;