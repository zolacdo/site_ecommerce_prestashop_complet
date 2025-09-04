import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, Package, Shield, Check } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';



const Checkout: React.FC= () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France'
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const steps = [
    { id: 1, name: 'Informations', icon: MapPin },
    { id: 2, name: 'Paiement', icon: CreditCard },
    { id: 3, name: 'Confirmation', icon: Check }
  ];

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOrder = () => {
    // Simulation de commande
    clearCart();
    setCurrentStep(3);
  };

  if (items.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Panier Vide</h2>
          <p className="text-gray-600 mb-6">Votre panier est vide. Ajoutez des produits pour continuer.</p>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Continuer mes Achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Finaliser ma Commande</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.id 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 font-medium ${
                    currentStep >= step.id ? 'text-blue-900' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {step.id < steps.length && (
                    <div className={`w-16 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-blue-900' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Informations de Livraison</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                      <input
                        type="text"
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                      <input
                        type="text"
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+33 6 12 34 56 78"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                    <input
                      type="text"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123 Rue de la Paix"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                      <input
                        type="text"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Paris"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Code Postal *</label>
                      <input
                        type="text"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="75001"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pays *</label>
                      <select
                        value={shippingData.country}
                        onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                </form>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleNextStep}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Continuer vers le Paiement
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Méthode de Paiement</h2>

                {/* Payment methods */}
                <div className="space-y-4 mb-6">
                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <CreditCard className="h-5 w-5 ml-3 mr-2" />
                      <span className="font-medium">Carte Bancaire</span>
                    </label>
                  </div>

                  <div className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="h-5 w-5 ml-3 mr-2 bg-blue-600 rounded"></div>
                      <span className="font-medium">PayPal</span>
                    </label>
                  </div>
                </div>

                {/* Card form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Numéro de carte *</label>
                      <input
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom sur la carte *</label>
                      <input
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Jean Dupont"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date d'expiration *</label>
                        <input
                          type="text"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                        <input
                          type="text"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">Paiement 100% Sécurisé</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Vos données sont protégées par un cryptage SSL 256 bits
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePreviousStep}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleCompleteOrder}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Finaliser la Commande
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Commande Confirmée !</h2>
                <p className="text-gray-600 mb-6">
                  Merci pour votre achat. Vous recevrez un email de confirmation avec tous les détails.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-600">Numéro de commande</p>
                  <p className="font-bold text-lg">CMD-2025-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/account')}
                    className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Voir mes Commandes
                  </button>
                  <button
                    onClick={() => navigate('/home')}
                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continuer mes Achats
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {currentStep !== 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.product.name}</p>
                        <p className="text-gray-500 text-xs">Qté: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-gray-900">{item.product.price * item.quantity}€</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sous-total</span>
                    <span>{getTotalPrice()}€</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>TVA (20%)</span>
                    <span>{Math.round(getTotalPrice() * 0.2)}€</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                    <span>Total</span>
                    <span className="text-orange-500">{Math.round(getTotalPrice() * 1.2)}€</span>
                  </div>
                </div>

                {/* Guarantees */}
                <div className="mt-6 space-y-2 text-sm">
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Garantie 30 jours</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Support technique inclus</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Check className="h-4 w-4 mr-2" />
                    <span>Accès immédiat</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;