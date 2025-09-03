import React, { useState } from 'react';
import { CreditCard, Plus, Trash2, Star, Calendar, Shield, AlertCircle, CheckCircle, ArrowLeft, Lock, Eye, EyeOff, Smartphone, Globe, Download, FileText, Bell } from 'lucide-react';
import { PaymentCard, BillingAddress, Transaction } from '../types/Payment';

interface PaymentCardsProps {
  onNavigate: (page: string) => void;
}

const PaymentCards: React.FC<PaymentCardsProps> = ({ onNavigate }) => {
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

  const [transactions] = useState<Transaction[]>([
    {
      id: 'txn_1',
      amount: 199,
      currency: 'EUR',
      status: 'completed',
      description: 'Formation PrestaShop Complète',
      date: '2025-01-15T10:30:00Z',
      paymentMethod: 'Visa •••• 4242',
      orderId: 'CMD-2025-001'
    },
    {
      id: 'txn_2',
      amount: 89,
      currency: 'EUR',
      status: 'completed',
      description: 'Module SEO Pro',
      date: '2025-01-10T14:20:00Z',
      paymentMethod: 'Mastercard •••• 5555',
      orderId: 'CMD-2025-002'
    },
    {
      id: 'txn_3',
      amount: 129,
      currency: 'EUR',
      status: 'pending',
      description: 'Thème Aurora Premium',
      date: '2025-01-16T09:15:00Z',
      paymentMethod: 'Visa •••• 4242'
    }
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('cards');
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    firstName: 'Jean',
    lastName: 'Dupont',
    address1: '123 Rue de la Paix',
    city: 'Paris',
    state: 'Île-de-France',
    zipCode: '75001',
    country: 'France'
  });

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    cardType: 'visa',
    saveCard: true,
    setAsDefault: false
  });

  const [showCvv, setShowCvv] = useState(false);
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});

  const tabs = [
    { id: 'cards', label: 'Mes Cartes', icon: CreditCard },
    { id: 'transactions', label: 'Historique', icon: FileText },
    { id: 'billing', label: 'Facturation', icon: Globe },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

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

  const validateCard = () => {
    const errors: Record<string, string> = {};
    
    if (!newCard.cardNumber || newCard.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'Numéro de carte invalide';
    }
    if (!newCard.expiryMonth || !newCard.expiryYear) {
      errors.expiry = 'Date d\'expiration requise';
    }
    if (!newCard.cvv || newCard.cvv.length < 3) {
      errors.cvv = 'CVV invalide';
    }
    if (!newCard.holderName.trim()) {
      errors.holderName = 'Nom du titulaire requis';
    }

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSetDefault = (cardId: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCard()) return;

    const card: PaymentCard = {
      id: Date.now().toString(),
      type: newCard.cardType as PaymentCard['type'],
      lastFour: newCard.cardNumber.replace(/\s/g, '').slice(-4),
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      holderName: newCard.holderName,
      isDefault: newCard.setAsDefault || cards.length === 0,
      isExpired: false,
      addedDate: new Date().toISOString().split('T')[0]
    };

    if (newCard.setAsDefault) {
      setCards(cards.map(c => ({ ...c, isDefault: false })));
    }

    setCards([...cards, card]);
    setNewCard({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      cardType: 'visa',
      saveCard: true,
      setAsDefault: false
    });
    setShowAddCard(false);
    setCardErrors({});
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

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Complété';
      case 'pending': return 'En attente';
      case 'failed': return 'Échoué';
      case 'refunded': return 'Remboursé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('account')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour au compte</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
          <p className="text-gray-600 mt-2">Gérez vos moyens de paiement et consultez vos transactions</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Sécurité Garantie</h3>
              <p className="text-blue-700 text-sm">
                Vos informations de paiement sont chiffrées et sécurisées selon les standards PCI DSS.
                Nous ne stockons jamais vos numéros de carte complets.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-900 text-blue-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cards Tab */}
            {activeTab === 'cards' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Mes Cartes Bancaires</h2>
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
                          onClick={() => setShowCardDetails(true)}
                          className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
                        >
                          Détails
                        </button>
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

                {cards.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                    <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune carte enregistrée</h3>
                    <p className="text-gray-600 mb-6">Ajoutez votre première carte pour faciliter vos achats</p>
                    <button
                      onClick={() => setShowAddCard(true)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Ajouter ma première carte
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Historique des Transactions</h2>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </button>
                </div>

                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(transaction.date).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">{transaction.amount}€</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(transaction.status)}`}>
                            {getTransactionStatusLabel(transaction.status)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{transaction.paymentMethod}</span>
                        {transaction.orderId && (
                          <span>Commande: {transaction.orderId}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Adresse de Facturation</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={billingAddress.firstName}
                        onChange={(e) => setBillingAddress({...billingAddress, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        value={billingAddress.lastName}
                        onChange={(e) => setBillingAddress({...billingAddress, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entreprise (optionnel)</label>
                    <input
                      type="text"
                      value={billingAddress.company || ''}
                      onChange={(e) => setBillingAddress({...billingAddress, company: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Adresse</label>
                    <input
                      type="text"
                      value={billingAddress.address1}
                      onChange={(e) => setBillingAddress({...billingAddress, address1: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ville</label>
                      <input
                        type="text"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Code postal</label>
                      <input
                        type="text"
                        value={billingAddress.zipCode}
                        onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pays</label>
                      <select
                        value={billingAddress.country}
                        onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="France">France</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sauvegarder l'adresse
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité des Paiements</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <h3 className="font-semibold">Chiffrement SSL</h3>
                      </div>
                      <p className="text-sm text-gray-600">Toutes vos données sont protégées par un chiffrement SSL 256-bit</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <h3 className="font-semibold">Conformité PCI DSS</h3>
                      </div>
                      <p className="text-sm text-gray-600">Nous respectons les standards de sécurité les plus élevés</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <h3 className="font-semibold">3D Secure</h3>
                      </div>
                      <p className="text-sm text-gray-600">Authentification renforcée pour vos paiements</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center mb-3">
                        <Bell className="w-5 h-5 text-blue-500 mr-2" />
                        <h3 className="font-semibold">Alertes Fraude</h3>
                      </div>
                      <p className="text-sm text-gray-600">Surveillance automatique des transactions suspectes</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Conseils de Sécurité</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Ne partagez jamais vos informations de carte</li>
                      <li>• Vérifiez régulièrement vos relevés bancaires</li>
                      <li>• Contactez-nous immédiatement en cas d'activité suspecte</li>
                      <li>• Utilisez des réseaux sécurisés pour vos achats</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé du Compte</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cartes actives</span>
                  <span className="font-semibold">{cards.filter(c => !c.isExpired).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Transactions ce mois</span>
                  <span className="font-semibold">{transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total dépensé</span>
                  <span className="font-semibold text-green-600">
                    {transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)}€
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Moyens de Paiement Acceptés</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                  <span className="text-2xl">💳</span>
                  <span className="ml-2 text-sm font-medium">Visa</span>
                </div>
                <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                  <span className="text-2xl">💳</span>
                  <span className="ml-2 text-sm font-medium">Mastercard</span>
                </div>
                <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                  <span className="text-2xl">🅿️</span>
                  <span className="ml-2 text-sm font-medium">PayPal</span>
                </div>
                <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg">
                  <span className="text-2xl">🏦</span>
                  <span className="ml-2 text-sm font-medium">Virement</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Voir l'historique complet
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Télécharger les factures
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Configurer les paiements automatiques
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Contacter le support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Card Modal */}
        {showAddCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Ajouter une Nouvelle Carte</h3>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddCard} className="p-6 space-y-6">
                {/* Card Preview */}
                <div className={`p-6 rounded-xl bg-gradient-to-r ${getCardColor(newCard.cardType)} text-white`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getCardIcon(newCard.cardType)}</span>
                      <div>
                        <p className="font-semibold text-lg uppercase">{newCard.cardType}</p>
                        <p className="text-sm opacity-90">
                          {newCard.cardNumber || '•••• •••• •••• ••••'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Titulaire</p>
                      <p className="font-medium">{newCard.holderName || 'NOM PRÉNOM'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-90 mb-1">Expire</p>
                      <p className="font-medium">
                        {newCard.expiryMonth || 'MM'}/{newCard.expiryYear || 'AA'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type de carte
                    </label>
                    <select
                      value={newCard.cardType}
                      onChange={(e) => setNewCard({...newCard, cardType: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                      <option value="amex">American Express</option>
                      <option value="discover">Discover</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de carte *
                    </label>
                    <input
                      type="text"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({...newCard, cardNumber: formatCardNumber(e.target.value)})}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        cardErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {cardErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{cardErrors.cardNumber}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du titulaire *
                    </label>
                    <input
                      type="text"
                      value={newCard.holderName}
                      onChange={(e) => setNewCard({...newCard, holderName: e.target.value.toUpperCase()})}
                      placeholder="JEAN DUPONT"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        cardErrors.holderName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {cardErrors.holderName && <p className="text-red-500 text-xs mt-1">{cardErrors.holderName}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mois *
                      </label>
                      <select
                        value={newCard.expiryMonth}
                        onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          cardErrors.expiry ? 'border-red-300' : 'border-gray-300'
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Année *
                      </label>
                      <select
                        value={newCard.expiryYear}
                        onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          cardErrors.expiry ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">AAAA</option>
                        {Array.from({ length: 10 }, (_, i) => (
                          <option key={2025 + i} value={2025 + i}>
                            {2025 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <div className="relative">
                        <input
                          type={showCvv ? 'text' : 'password'}
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                          placeholder="123"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${
                            cardErrors.cvv ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv(!showCvv)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCvv ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {cardErrors.cvv && <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>}
                    </div>
                  </div>
                  {cardErrors.expiry && <p className="text-red-500 text-xs">{cardErrors.expiry}</p>}

                  {/* Options */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newCard.saveCard}
                        onChange={(e) => setNewCard({...newCard, saveCard: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Sauvegarder cette carte pour les futurs achats</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newCard.setAsDefault}
                        onChange={(e) => setNewCard({...newCard, setAsDefault: e.target.checked})}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">Définir comme carte par défaut</span>
                    </label>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 text-green-600 mr-2" />
                      <span className="text-green-800 font-medium">Paiement 100% Sécurisé</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Vos données sont protégées par un cryptage SSL 256 bits et ne sont jamais stockées sur nos serveurs
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Ajouter la Carte
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Card Details Modal */}
        {showCardDetails && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Détails de la Carte</h3>
                  <button
                    onClick={() => setShowCardDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Visa •••• 4242</h4>
                  <p className="text-sm text-gray-600">Ajoutée le 15 janvier 2024</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dernière utilisation</span>
                    <span className="font-medium">Il y a 3 jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transactions ce mois</span>
                    <span className="font-medium">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total dépensé</span>
                    <span className="font-medium text-green-600">288€</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowCardDetails(false)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCards;