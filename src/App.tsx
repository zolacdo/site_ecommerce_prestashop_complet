import React, { useState } from 'react';
import { CartProvider } from './hooks/useCart';
import { AuthProvider } from './hooks/useAuth';
import { WishlistProvider } from './hooks/useWishlist';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
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
import { Product } from './types/Product';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    setIsCartOpen(false);
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const handleCheckout = () => {
    setCurrentPage('checkout');
    setIsCartOpen(false);
  };
  const renderCurrentPage = () => {
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
        return <Blog onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} onViewProduct={handleViewProduct} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div className="min-h-screen bg-gray-50">
            <Header 
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onCartToggle={() => setIsCartOpen(!isCartOpen)}
            />
            
            <main>
              {renderCurrentPage()}
            </main>

            <Footer />

            <Cart 
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              onCheckout={handleCheckout}
            />
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;