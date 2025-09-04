import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Shield, Calendar, Lock, CheckCircle, AlertCircle, Download, Eye, EyeOff } from 'lucide-react';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  holderName: string;
  isDefault: boolean;
  addedDate: string;
}

interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  cardLast4: string;
  invoiceUrl?: string;
}

const PaymentCards: React.FC = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2027',
      holderName: 'John Doe',
      isDefault: true,
      addedDate: '2024-01-15'
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '5555',
      expiryMonth: '08',
      expiryYear: '2026',
      holderName: 'John Doe',
      isDefault: false,
      addedDate: '2024-03-22'
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 299.99,
      description: 'Formation PrestaShop Avancé',
      date: '2024-12-15',
      status: 'completed',
      cardLast4: '4242',
      invoiceUrl: '/invoices/inv-001.pdf'
    },
    {
      id: '2',
      amount: 149.99,
      description: 'Module SEO Premium',
      date: '2024-12-10',
      status: 'completed',
      cardLast4: '5555',
      invoiceUrl: '/invoices/inv-002.pdf'
    },
    {
      id: '3',
      amount: 199.99,
      description: 'Thème Responsive Pro',
      date: '2024-12-08',
      status: 'pending',
      cardLast4: '4242'
    }
  ]);

  const [newCard, setNewCard] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    isDefault: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCard = () => {
    const newErrors: Record<string, string> = {};

    if (!newCard.number || newCard.number.replace(/\s/g, '').length < 16) {
      newErrors.number = 'Numéro de carte invalide';
    }

    if (!newCard.expiryMonth || !newCard.expiryYear) {
      newErrors.expiry = 'Date d\'expiration requise';
    }

    if (!newCard.cvv || newCard.cvv.length < 3) {
      newErrors.cvv = 'CVV invalide';
    }

    if (!newCard.holderName.trim()) {
      newErrors.holderName = 'Nom du titulaire requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getCardType = (number: string): 'visa' | 'mastercard' | 'amex' => {
    const num = number.replace(/\s/g, '');
    if (num.startsWith('4')) return 'visa';
    if (num.startsWith('5') || num.startsWith('2')) return 'mastercard';
    if (num.startsWith('3')) return 'amex';
    return 'visa';
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCard()) return;

    const cardType = getCardType(newCard.number);
    const last4 = newCard.number.replace(/\s/g, '').slice(-4);

    const card: PaymentCard = {
      id: Date.now().toString(),
      type: cardType,
      last4,
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      holderName: newCard.holderName,
      isDefault: newCard.isDefault || cards.length === 0,
      addedDate: new Date().toISOString().split('T')[0]
    };

    if (card.isDefault) {
      setCards(prev => prev.map(c => ({ ...c, isDefault: false })));
    }

    setCards(prev => [...prev, card]);
    setNewCard({
      number: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      isDefault: false
    });
    setShowAddCard(false);
    setErrors({});
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(prev => prev.filter(c => c.id !== cardId));
  };

  const handleSetDefault = (cardId: string) => {
    setCards(prev => prev.map(c => ({
      ...c,
      isDefault: c.id === cardId
    })));
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>;
      case 'mastercard':
        return <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>;
      case 'amex':
        return <div className="w-8 h-5 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>;
      default:
        return <CreditCard className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cartes de Paiement</h1>
          <p className="text-gray-600">Gérez vos méthodes de paiement en toute sécurité</p>
        </div>

        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Sécurité garantie</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">
            Toutes vos informations de paiement sont chiffrées et sécurisées selon les standards PCI DSS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cards Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Mes Cartes</h2>
              <button
                onClick={() => setShowAddCard(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Ajouter une carte</span>
              </button>
            </div>

            <div className="space-y-4">
              {cards.map((card) => (
                <div key={card.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getCardIcon(card.type)}
                      <div>
                        <p className="font-medium text-gray-900">•••• •••• •••• {card.last4}</p>
                        <p className="text-sm text-gray-500">{card.holderName}</p>
                      </div>
                    </div>
                    {card.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Par défaut
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Exp. {card.expiryMonth}/{card.expiryYear}</span>
                      </span>
                      <span>Ajoutée le {new Date(card.addedDate).toLocaleDateString('fr-FR')}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!card.isDefault && (
                        <button
                          onClick={() => handleSetDefault(card.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Définir par défaut
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteCard(card.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transactions Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Transactions Récentes</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className="font-medium text-gray-900">{transaction.description}</span>
                    </div>
                    <span className="font-bold text-gray-900">{transaction.amount.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>•••• {transaction.cardLast4}</span>
                      <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'completed' ? 'Terminé' :
                         transaction.status === 'pending' ? 'En cours' : 'Échoué'}
                      </span>
                    </div>
                    {transaction.invoiceUrl && (
                      <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Facture</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir toutes les transactions
              </button>
            </div>
          </div>
        </div>

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Ajouter une Carte</h3>
                <button
                  onClick={() => setShowAddCard(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Card Preview */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white mb-6 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {getCardIcon(getCardType(newCard.number))}
                </div>
                <div className="mb-8">
                  <div className="text-lg font-mono tracking-wider">
                    {newCard.number || '•••• •••• •••• ••••'}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-blue-200 mb-1">TITULAIRE</p>
                    <p className="font-medium">{newCard.holderName || 'NOM PRÉNOM'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-200 mb-1">EXPIRE</p>
                    <p className="font-medium">
                      {newCard.expiryMonth || 'MM'}/{newCard.expiryYear || 'AA'}
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro de carte
                  </label>
                  <input
                    type="text"
                    value={newCard.number}
                    onChange={(e) => setNewCard(prev => ({ 
                      ...prev, 
                      number: formatCardNumber(e.target.value) 
                    }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.number ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mois
                    </label>
                    <select
                      value={newCard.expiryMonth}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiryMonth: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.expiry ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Année
                    </label>
                    <select
                      value={newCard.expiryYear}
                      onChange={(e) => setNewCard(prev => ({ ...prev, expiryYear: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.expiry ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">AA</option>
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                          {String(new Date().getFullYear() + i).slice(-2)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <div className="relative">
                      <input
                        type={showCvv ? "text" : "password"}
                        value={newCard.cvv}
                        onChange={(e) => setNewCard(prev => ({ 
                          ...prev, 
                          cvv: e.target.value.replace(/\D/g, '').slice(0, 4) 
                        }))}
                        placeholder="123"
                        maxLength={4}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 ${
                          errors.cvv ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCvv(!showCvv)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                  </div>
                </div>
                {errors.expiry && <p className="text-red-500 text-xs">{errors.expiry}</p>}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du titulaire
                  </label>
                  <input
                    type="text"
                    value={newCard.holderName}
                    onChange={(e) => setNewCard(prev => ({ 
                      ...prev, 
                      holderName: e.target.value.toUpperCase() 
                    }))}
                    placeholder="JOHN DOE"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.holderName ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.holderName && <p className="text-red-500 text-xs mt-1">{errors.holderName}</p>}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={newCard.isDefault}
                    onChange={(e) => setNewCard(prev => ({ ...prev, isDefault: e.target.checked }))}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                    Définir comme carte par défaut
                  </label>
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
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Ajouter</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Transactions Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Historique des Transactions</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className="font-medium text-gray-900">{transaction.description}</span>
                    </div>
                    <span className="font-bold text-gray-900">{transaction.amount.toFixed(2)} €</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>•••• {transaction.cardLast4}</span>
                      <span>{new Date(transaction.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    {transaction.invoiceUrl && (
                      <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <Download className="h-3 w-3" />
                        <span>Facture</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir toutes les transactions
              </button>
            </div>
          </div>
        </div>

        {/* Payment Security Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité des Paiements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Chiffrement SSL</p>
                <p className="text-sm text-gray-600">Données protégées</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">PCI DSS</p>
                <p className="text-sm text-gray-600">Conformité certifiée</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">3D Secure</p>
                <p className="text-sm text-gray-600">Authentification renforcée</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCards;