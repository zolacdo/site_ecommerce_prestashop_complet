import React, { useState } from 'react';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import { WishlistProvider } from './hooks/useWishlist';
import { AdminProvider } from './hooks/useAdmin';
import { ChatProvider } from './hooks/useChat';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import MiniChat from './components/MiniChat';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Support from './pages/Support';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import EditProfile from './pages/EditProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Product } from './types/Product';
import { BlogPost } from './types/Blog';
// import { blogPosts } from './data/blog';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setSelectedBlogPost(null);
    setIsCartOpen(false);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleViewBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post);
    setCurrentPage('blog-detail');
  };
  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
    setCurrentPage('blog');
  };
  const handleCheckout = () => {
    setCurrentPage('checkout');
    setIsCartOpen(false);
  };

  const handleAdminLogin = () => {
    setIsAdminMode(true);
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
    setCurrentPage('home');
  };

  const renderCurrentPage = () => {
    if (selectedBlogPost) {
      return (
        <BlogDetail
          post={selectedBlogPost}
          onBack={handleBackToBlog}
        />
      );
    }

    if (selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          onBack={handleBackToProducts}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
      case 'formations':
        return <Products category="formation" onViewProduct={handleViewProduct} />;
      case 'modules':
        return <Products category="module" onViewProduct={handleViewProduct} />;
      case 'themes':
        return <Products category="theme" onViewProduct={handleViewProduct} />;
      case 'support':
        return <Support />;
      case 'wishlist':
        return <Wishlist onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
      case 'account':
        return <Account onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'checkout':
        return <Checkout onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} onViewPost={handleViewBlogPost} />;
      case 'edit-profile':
        return <EditProfile onNavigate={handleNavigate} />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} onAdminLogin={handleAdminLogin} />;
      case 'admin-dashboard':
        return isAdminMode ? (
          <AdminDashboard onNavigate={handleNavigate} onAdminLogout={handleAdminLogout} />
        ) : <AdminLogin onNavigate={handleNavigate} onAdminLogin={handleAdminLogin} />;
      default:
        return <Home onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <AuthProvider>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            <ChatProvider>
              <div className="min-h-screen bg-gray-50">
                {!isAdminMode && (
                  <Header 
                    currentPage={currentPage}
                    onNavigate={handleNavigate}
                    onCartToggle={() => setIsCartOpen(!isCartOpen)}
                  />
                )}
                
                <main>
                  {renderCurrentPage()}
                </main>

                {!isAdminMode && (
                  <Footer onNavigate={handleNavigate} />
                )}

                {!isAdminMode && (
                  <>
                    <Cart 
                      isOpen={isCartOpen}
                      onClose={() => setIsCartOpen(false)}
                      onCheckout={handleCheckout}
                    />
                    <MiniChat />
                  </>
                )}
              </div>
            </ChatProvider>
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;