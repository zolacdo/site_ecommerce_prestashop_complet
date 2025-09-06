import React, { useState } from 'react';
import { User,  Package, Heart, CreditCard, MapPin, Bell, Shield, LogOut, Edit3, Download, Calendar, Award, BarChart3, BookOpen, Clock, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';



const Account: React.FC= () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const { user, logout, isInitializing } = useAuth();

  // Afficher un loader pendant l'initialisation
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Mon Profil', icon: User },
    { id: 'orders', label: 'Mes Commandes', icon: Package },
    { id: 'wishlist', label: 'Liste de Souhaits', icon: Heart },
    { id: 'downloads', label: 'Mes téléchargements', icon: Download },
    { id: 'schedule', label: 'Planning des cours', icon: Calendar },
    { id: 'certificates', label: 'Certificats', icon: Award },
    { id: 'stats', label: 'Mes statistiques', icon: BarChart3 },
    { id: 'addresses', label: 'Mes Adresses', icon: MapPin },
    { id: 'payment', label: 'Moyens de Paiement', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield }
  ];

  const mockOrders = [
    {
      id: 'CMD-2025-001',
      date: '15 Jan 2025',
      total: 199,
      status: 'delivered',
      items: 2
    },
    {
      id: 'CMD-2025-002',
      date: '10 Jan 2025',
      total: 89,
      status: 'processing',
      items: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'processing': return 'En cours';
      case 'shipped': return 'Expédié';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Connexion Requise</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder à votre compte</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Se Connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-600">Membre Premium depuis janvier 2024</p>
                <div className="flex items-center mt-2 space-x-4 text-sm">
                  <span className="flex items-center text-green-600">
                    <Award className="w-4 h-4 mr-1" />
                    5 certificats obtenus
                  </span>
                  <span className="flex items-center text-blue-600">
                    <BookOpen className="w-4 h-4 mr-1" />
                    12 formations complétées
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Formations Actives</h3>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">3</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">68% de progression moyenne</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Certificats</h3>
              <Award className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">5</p>
            <p className="text-sm text-gray-500">Dernier obtenu: SEO Avancé</p>
            <p className="text-xs text-gray-400 mt-1">Il y a 3 jours</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Temps d'étude</h3>
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-2">47h</p>
            <p className="text-sm text-gray-500">Ce mois-ci (+12h vs mois dernier)</p>
            <p className="text-xs text-green-600 mt-1">↗ +34% d'amélioration</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              {/* User info */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <h3 className="font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                {!user.isVerified && (
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mt-2">
                    Email non vérifié
                  </span>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4 border-t border-gray-200 pt-4"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
                    <button 
                      onClick={() => navigate('/edit-profile')}
                      className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Modifier</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                      <input
                        type="text"
                        value={user.firstName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                      <input
                        type="text"
                        value={user.lastName}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={user.phone || ''}
                        placeholder="Non renseigné"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Statut du Compte</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Email vérifié</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.isVerified ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {user.isVerified ? 'Vérifié' : 'En attente'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Membre depuis</span>
                        <span className="text-gray-600">{user.createdAt.toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Commandes</h2>
                  
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">Commande {order.id}</h3>
                            <p className="text-gray-600 text-sm">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            {order.items} article(s) • Total: <span className="font-semibold text-gray-900">{order.total}€</span>
                          </div>
                          <button className="text-blue-900 hover:text-blue-700 font-medium transition-colors">
                            Voir Détails
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ma Liste de Souhaits</h2>
                  <button
                    onClick={() => navigate('/wishlist')}
                    className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                  >
                    Voir ma Liste Complète
                  </button>
                </div>
              )}

              {/* Downloads Tab */}
              {activeTab === 'downloads' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Téléchargements</h2>
                  <div className="text-center py-12">
                    <Download className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun téléchargement disponible</p>
                    <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Parcourir les Ressources
                    </button>
                  </div>
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === 'schedule' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Planning des Cours</h2>
                  <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun cours planifié</p>
                    <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Voir les Formations Disponibles
                    </button>
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Certificats</h2>
                  <div className="text-center py-12">
                    <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucun certificat obtenu</p>
                    <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Commencer une Formation
                    </button>
                  </div>
                </div>
              )}

              {/* Stats Tab */}
              {activeTab === 'stats' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Statistiques</h2>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Statistiques en cours de développement</p>
                    <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Voir mes Progrès
                    </button>
                  </div>
                </div>
              )}

              {/* Other tabs with placeholder content */}
              {activeTab === 'addresses' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Mes Adresses</h2>
                  <div className="text-center py-12">
                    <MapPin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Aucune adresse enregistrée</p>
                    <button className="mt-4 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      Ajouter une Adresse
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Moyens de Paiement</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <CreditCard className="h-8 w-8 text-blue-600 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">Mes Cartes Bancaires</h3>
                        <p className="text-gray-600 text-sm mb-4">Gérez vos cartes de paiement</p>
                        <button 
                          onClick={() => navigate('/account/payment-cards')}
                          className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                        >
                          Gérer les Cartes
                        </button>
                      </div>  
                      <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <Settings className="h-8 w-8 text-green-600 mb-4" />
                        <h3 className="font-semibold text-gray-900 mb-2">Paramètres de Paiement</h3>
                        <p className="text-gray-600 text-sm mb-4">Configurez vos préférences</p>
                        <button 
                          onClick={() => navigate('/account/payment-settings')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Configurer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Préférences de Notification</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Nouvelles formations', checked: true },
                      { label: 'Promotions et offres spéciales', checked: true },
                      { label: 'Mises à jour de produits', checked: false },
                      { label: 'Newsletter hebdomadaire', checked: true }
                    ].map((pref, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <span className="font-medium text-gray-900">{pref.label}</span>
                        <input
                          type="checkbox"
                          checked={pref.checked}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité du Compte</h2>
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold mb-2">Changer le Mot de Passe</h3>
                      <p className="text-gray-600 text-sm mb-4">Dernière modification il y a 3 mois</p>
                      <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                        Modifier le Mot de Passe
                      </button>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold mb-2">Authentification à Deux Facteurs</h3>
                      <p className="text-gray-600 text-sm mb-4">Sécurisez votre compte avec la 2FA</p>
                      <button className="border border-blue-900 text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                        Activer la 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h3>
          <div className="space-y-3">
            {[
              { action: 'Completion de formation', detail: 'PrestaShop Avancé - Module 3', time: '2 heures', type: 'success' },
              { action: 'Nouveau certificat', detail: 'SEO & Référencement', time: '3 jours', type: 'achievement' },
              { action: 'Paiement effectué', detail: 'Formation Marketing Digital - €89', time: '1 semaine', type: 'payment' },
              { action: 'Profil mis à jour', detail: 'Photo de profil modifiée', time: '2 semaines', type: 'profile' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'achievement' ? 'bg-yellow-500' :
                  activity.type === 'payment' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400">Il y a {activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;