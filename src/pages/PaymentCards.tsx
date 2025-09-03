import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Star, Calendar, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { PaymentCard, BillingAddress } from '../types/Payment';

const PaymentCards: React.FC = () => {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: 'Jean Dupont',
      isDefault: true,
      isExpired: false,
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      type: 'mastercard',
      lastFour: '5555',
      expiryMonth: 8,
      expiryYear: 2024,
      holderName: 'Jean Dupont',
      isDefault: false,
      isExpired: true,
      addedDate: '2023-06-20'
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: 'Jean',
    lastName: 'Dupont',
    address1: '123 Rue de la Paix',
    city: 'Paris',
    state: 'Île-de-France',
    zipCode: '75001',
    country: 'France'
  });

  const getCardIcon = (type: string) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳'
    };
    return icons[type as keyof typeof icons] || '💳';
  };

  const getCardColor = (type: string) => {
    const colors = {
      visa: 'from-blue-500 to-blue-600',
      mastercard: 'from-red-500 to-red-600',
      amex: 'from-green-500 to-green-600',
      discover: 'from-orange-500 to-orange-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const handleSetDefault = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    const newCard: PaymentCard = {
      id: Date.now().toString(),
      type: formData.get('cardType') as PaymentCard['type'],
      lastFour: (formData.get('cardNumber') as string).slice(-4),
      expiryMonth: parseInt(formData.get('expiryMonth') as string),
      expiryYear: parseInt(formData.get('expiryYear') as string),
      holderName: formData.get('holderName') as string,
      isDefault: cards.length === 0,
      isExpired: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    setCards([...cards, newCard]);
    setShowAddCard(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Moyens de Paiement</h1>
          <p className="text-gray-600">Gérez vos cartes bancaires et informations de facturation</p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Sécurité Garantie</h3>
              <p className="text-blue-700 text-sm">
                Vos informations de paiement sont chiffrées et sécurisées selon les standards PCI DSS.
                Nous ne stockons jamais vos numéros de carte complets.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Cards */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Mes Cartes</h2>
                <button
                  onClick={() => setShowAddCard(true)}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une carte
                </button>
              </div>

              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative p-6 rounded-xl bg-gradient-to-r ${getCardColor(card.type)} text-white ${
                      card.isExpired ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getCardIcon(card.type)}</span>
                        <div>
                          <p className="font-semibold text-lg uppercase">{card.type}</p>
                          <p className="text-sm opacity-90">•••• •••• •••• {card.lastFour}</p>
                        </div>
                      </div>
                      {card.isDefault && (
                        <div className="flex items-center bg-white/20 px-2 py-1 rounded-full">
                          <Star className="w-3 h-3 mr-1" />
                          <span className="text-xs font-medium">Défaut</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm opacity-90 mb-1">Titulaire</p>
                        <p className="font-medium">{card.holderName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-90 mb-1">Expire</p>
                        <p className="font-medium">
                          {String(card.expiryMonth).padStart(2, '0')}/{card.expiryYear}
                        </p>
                      </div>
                    </div>

                    {card.isExpired && (
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center bg-red-500 px-2 py-1 rounded-full">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          <span className="text-xs font-medium">Expirée</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end mt-4 space-x-2">
                      {!card.isDefault && !card.isExpired && (
                        <button
                          onClick={() => handleSetDefault(card.id)}
                          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                        >
                          Définir par défaut
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="p-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Card Form */}
              {showAddCard && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle carte</h3>
                    <form onSubmit={handleAddCard} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Numéro de carte
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mois d'expiration
                          </label>
                          <select
                            name="expiryMonth"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Année d'expiration
                          </label>
                          <select
                            name="expiryYear"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={2024 + i} value={2024 + i}>
                                {2024 + i}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom du titulaire
                        </label>
                        <input
                          type="text"
                          name="holderName"
                          placeholder="Jean Dupont"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type de carte
                        </label>
                        <select
                          name="cardType"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="visa">Visa</option>
                          <option value="mastercard">Mastercard</option>
                          <option value="amex">American Express</option>
                          <option value="discover">Discover</option>
                        </select>
                      </div>
                      <div className="flex space-x-3 pt-4">
                        <button
                          type="button"
                          onClick={() => setShowAddCard(false)}
                          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Ajouter
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Billing Address */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de facturation</h3>
              <div className="space-y-3 text-sm">
                <p className="font-medium">{billingAddress.firstName} {billingAddress.lastName}</p>
                <p className="text-gray-600">{billingAddress.address1}</p>
                <p className="text-gray-600">
                  {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
                </p>
                <p className="text-gray-600">{billingAddress.country}</p>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
                Modifier l'adresse
              </button>
            </div>

            {/* Payment Security */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Chiffrement SSL 256-bit</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Conformité PCI DSS</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-sm text-gray-700">Authentification 3D Secure</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Voir l'historique des paiements
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Télécharger les factures
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Configurer les paiements automatiques
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;