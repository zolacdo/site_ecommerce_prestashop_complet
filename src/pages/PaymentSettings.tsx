import React, { useState } from 'react';
import { 
  CreditCard, Settings, Bell, Globe, Shield, Download, 
  FileText, BarChart3, TrendingUp, DollarSign, Percent,
  ArrowLeft, Save, AlertCircle, CheckCircle, Eye, EyeOff
} from 'lucide-react';
import { PaymentSettings, PaymentAnalytics, Invoice } from '../types/Payment';

interface PaymentSettingsProps {
  onNavigate: (page: string) => void;
}

const PaymentSettingsPage: React.FC<PaymentSettingsProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [settings, setSettings] = useState<PaymentSettings>({
    autoPayEnabled: true,
    defaultPaymentMethod: 'visa-4242',
    receiptEmail: 'jean.dupont@email.com',
    invoiceLanguage: 'fr',
    taxExempt: false
  });

  const [analytics] = useState<PaymentAnalytics>({
    totalRevenue: 2847.50,
    monthlyRevenue: 1234.00,
    averageOrderValue: 156.80,
    conversionRate: 3.2,
    topPaymentMethods: [
      { method: 'Carte Bancaire', percentage: 65, amount: 1850.88 },
      { method: 'PayPal', percentage: 25, amount: 711.88 },
      { method: 'Virement', percentage: 10, amount: 284.75 }
    ],
    revenueByMonth: [
      { month: 'Jan', revenue: 1234 },
      { month: 'Fév', revenue: 1456 },
      { month: 'Mar', revenue: 1678 },
      { month: 'Avr', revenue: 1890 },
      { month: 'Mai', revenue: 2100 },
      { month: 'Juin', revenue: 2847 }
    ]
  });

  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2025-001',
      orderId: 'CMD-2025-001',
      amount: 199,
      currency: 'EUR',
      issueDate: '2025-01-15',
      dueDate: '2025-02-15',
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-2025-002',
      orderId: 'CMD-2025-002',
      amount: 89,
      currency: 'EUR',
      issueDate: '2025-01-10',
      dueDate: '2025-02-10',
      status: 'sent',
      downloadUrl: '#'
    }
  ]);

  const tabs = [
    { id: 'settings', label: 'Paramètres', icon: Settings },
    { id: 'analytics', label: 'Analytiques', icon: BarChart3 },
    { id: 'invoices', label: 'Factures', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu sauvegarderais les paramètres
    console.log('Paramètres sauvegardés:', settings);
  };

  const getInvoiceStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvoiceStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payée';
      case 'sent': return 'Envoyée';
      case 'overdue': return 'En retard';
      case 'draft': return 'Brouillon';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('payment-cards')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour aux cartes</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres de Paiement</h1>
          <p className="text-gray-600 mt-2">Configurez vos préférences de paiement et consultez vos analytiques</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de Paiement</h2>
                
                <form onSubmit={handleSettingsSubmit} className="space-y-6">
                  {/* Auto Payment */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Paiement Automatique</h3>
                      <p className="text-sm text-gray-600">Renouvellement automatique des abonnements</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoPayEnabled}
                        onChange={(e) => setSettings({...settings, autoPayEnabled: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Default Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Méthode de paiement par défaut</label>
                    <select
                      value={settings.defaultPaymentMethod}
                      onChange={(e) => setSettings({...settings, defaultPaymentMethod: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="visa-4242">Visa •••• 4242</option>
                      <option value="mastercard-5555">Mastercard •••• 5555</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>

                  {/* Receipt Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email pour les reçus</label>
                    <input
                      type="email"
                      value={settings.receiptEmail}
                      onChange={(e) => setSettings({...settings, receiptEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Invoice Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Langue des factures</label>
                    <select
                      value={settings.invoiceLanguage}
                      onChange={(e) => setSettings({...settings, invoiceLanguage: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>

                  {/* Tax Exempt */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Exonération de TVA</h3>
                      <p className="text-sm text-gray-600">Applicable pour les entreprises éligibles</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.taxExempt}
                        onChange={(e) => setSettings({...settings, taxExempt: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="h-4 w-4" />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Résumé des Paiements</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total dépensé</span>
                    <span className="font-semibold text-green-600">€{analytics.totalRevenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Ce mois</span>
                    <span className="font-semibold">€{analytics.monthlyRevenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Panier moyen</span>
                    <span className="font-semibold">€{analytics.averageOrderValue}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => onNavigate('payment-cards')}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Gérer mes cartes
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Télécharger les factures
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Historique des paiements
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Support paiements
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Revenue Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                    <p className="text-2xl font-bold text-gray-900">€{analytics.totalRevenue}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Ce Mois</p>
                    <p className="text-2xl font-bold text-gray-900">€{analytics.monthlyRevenue}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Panier Moyen</p>
                    <p className="text-2xl font-bold text-gray-900">€{analytics.averageOrderValue}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                  </div>
                  <Percent className="h-8 w-8 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Payment Methods Distribution */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition des Moyens de Paiement</h3>
              <div className="space-y-4">
                {analytics.topPaymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}></div>
                      <span className="font-medium text-gray-900">{method.method}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' :
                            index === 1 ? 'bg-green-500' :
                            'bg-orange-500'
                          }`}
                          style={{ width: `${method.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{method.percentage}%</span>
                      <span className="font-semibold text-gray-900">€{method.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Mes Factures</h2>
                <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4 mr-2" />
                  Tout télécharger
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{invoice.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-gray-900">€{invoice.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(invoice.issueDate).toLocaleDateString('fr-FR')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getInvoiceStatusColor(invoice.status)}`}>
                          {getInvoiceStatusLabel(invoice.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Télécharger</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications de Paiement</h2>
            <div className="space-y-4">
              {[
                { 
                  title: 'Confirmation de paiement', 
                  description: 'Recevoir un email après chaque paiement réussi',
                  enabled: true 
                },
                { 
                  title: 'Échec de paiement', 
                  description: 'Être alerté en cas d\'échec de paiement',
                  enabled: true 
                },
                { 
                  title: 'Renouvellement automatique', 
                  description: 'Rappel avant le renouvellement des abonnements',
                  enabled: false 
                },
                { 
                  title: 'Nouvelles factures', 
                  description: 'Notification lors de la génération d\'une nouvelle facture',
                  enabled: true 
                }
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-600">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={notification.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSettingsPage;