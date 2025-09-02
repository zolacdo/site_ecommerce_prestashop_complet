import React from 'react';
import { X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Panier ({items.length})</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty cart */
            <div className="flex-1 flex items-center justify-center px-6">
              <div className="text-center">
                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Votre panier est vide</h3>
                <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats</p>
                <button
                  onClick={onClose}
                  className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Continuer vos achats
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className="flex-1 px-6 py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 line-clamp-2">{item.product.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{item.product.category}</p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="font-medium px-2">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{item.product.price * item.quantity}€</p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">{item.product.price}€ / unité</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear cart */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full mt-6 text-red-500 hover:text-red-700 font-medium py-2 transition-colors"
                  >
                    Vider le panier
                  </button>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
                <div className="space-y-4">
                  {/* Total */}
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-orange-500">{getTotalPrice()}€</span>
                  </div>

                  {/* Checkout button */}
                  <button 
                    onClick={onCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Procéder au Paiement</span>
                  </button>

                  {/* Continue shopping */}
                  <button
                    onClick={onClose}
                    className="w-full text-gray-600 hover:text-gray-800 py-2 transition-colors"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;