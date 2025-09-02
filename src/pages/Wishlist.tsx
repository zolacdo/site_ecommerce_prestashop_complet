import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';

interface WishlistProps {
  onNavigate: (page: string) => void;
  onViewProduct: (product: any) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ onNavigate, onViewProduct }) => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Retour à l'accueil</span>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Heart className="h-8 w-8 text-red-500 mr-3" />
                Ma Liste de Souhaits ({items.length})
              </h1>
              <p className="text-gray-600 mt-2">Retrouvez tous vos produits favoris</p>
            </div>
            
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Vider la liste
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          /* Empty wishlist */
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre liste est vide</h2>
              <p className="text-gray-600 mb-8">
                Ajoutez des produits à votre liste de souhaits pour les retrouver facilement
              </p>
              <button
                onClick={() => onNavigate('home')}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
              >
                Découvrir nos Produits
              </button>
            </div>
          </div>
        ) : (
          /* Wishlist items */
          <div>
            {/* Actions bar */}
            <div className="bg-white rounded-lg p-4 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">{items.length} produit(s) dans votre liste</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    items.forEach(item => addToCart(item.product));
                    clearWishlist();
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Tout Ajouter au Panier</span>
                </button>
              </div>
            </div>

            {/* Products grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div key={item.id} className="relative">
                  <ProductCard
                    product={item.product}
                    onViewProduct={onViewProduct}
                  />
                  
                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(item.product.id)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* Quick add to cart */}
                  <button
                    onClick={() => handleAddToCart(item.product)}
                    className="absolute bottom-3 right-3 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;