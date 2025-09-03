import React, { useState } from 'react';
import { 
  BarChart3, Users, Package, ShoppingCart, DollarSign, 
  TrendingUp, Calendar, Settings, LogOut, Bell,
  Plus, Edit, Trash2, Eye, Search, Filter,
  Save
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onAdminLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onAdminLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentAdmin, stats, logoutAdmin } = useAdmin();

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'instructors', label: 'Formateurs', icon: Users },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  const handleLogout = () => {
    logoutAdmin();
    onAdminLogout();
  };

  const mockUsers = [
    { id: '1', name: 'Marie Dubois', email: 'marie@example.com', role: 'Client', status: 'Actif', joinDate: '15 Jan 2025' },
    { id: '2', name: 'Jean Martin', email: 'jean@example.com', role: 'Client', status: 'Actif', joinDate: '12 Jan 2025' },
    { id: '3', name: 'Sophie Laurent', email: 'sophie@example.com', role: 'Formateur', status: 'Actif', joinDate: '10 Jan 2025' }
  ];

  const mockInstructors = [
    { 
      id: '1', 
      name: 'Alexandre Martin', 
      email: 'alexandre@prestashop-academy.fr', 
      speciality: 'PrestaShop Expert',
      courses: 12,
      students: 2340,
      rating: 4.9,
      status: 'Actif'
    },
    { 
      id: '2', 
      name: 'Sophie Dubois', 
      email: 'sophie@prestashop-academy.fr', 
      speciality: 'Développement Modules',
      courses: 8,
      students: 1560,
      rating: 4.8,
      status: 'Actif'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Administration PrestaShop Academy</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                  {currentAdmin?.firstName.charAt(0)}
                </div>
                <span className="font-medium text-gray-900">{currentAdmin?.firstName}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <nav className="space-y-2">
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
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-4">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Utilisateurs Total</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                        <p className="text-sm text-green-600">+{stats.newUsersToday} aujourd'hui</p>
                      </div>
                      <Users className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Produits</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
                        <p className="text-sm text-blue-600">Formations, Modules, Thèmes</p>
                      </div>
                      <Package className="h-12 w-12 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Commandes</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p>
                        <p className="text-sm text-orange-600">+{stats.ordersToday} aujourd'hui</p>
                      </div>
                      <ShoppingCart className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}€</p>
                        <p className="text-sm text-green-600">+{stats.revenueToday}€ aujourd'hui</p>
                      </div>
                      <DollarSign className="h-12 w-12 text-purple-500" />
                    </div>
                  </div>
                </div>

                {/* Charts and recent activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Ventes des 7 derniers jours</h3>
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-16 w-16 text-gray-400" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Activité Récente</h3>
                    <div className="space-y-4">
                      {[
                        { action: 'Nouvelle commande', user: 'Marie D.', time: 'Il y a 5 min' },
                        { action: 'Nouvel utilisateur', user: 'Jean M.', time: 'Il y a 12 min' },
                        { action: 'Commentaire blog', user: 'Sophie L.', time: 'Il y a 25 min' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.user}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Nouvel Utilisateur</span>
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Rechercher un utilisateur..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Filter className="h-4 w-4" />
                      <span>Filtres</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
                                {user.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Nouveau Produit</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-blue-900">Formations</h3>
                      <p className="text-2xl font-bold text-blue-900">24</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-green-900">Modules</h3>
                      <p className="text-2xl font-bold text-green-900">87</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <h3 className="font-semibold text-purple-900">Thèmes</h3>
                      <p className="text-2xl font-bold text-purple-900">45</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Produits Récents</h3>
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                          <div>
                            <p className="font-medium text-gray-900">Produit {i}</p>
                            <p className="text-sm text-gray-600">Formation • 199€</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Instructors Management */}
            {activeTab === 'instructors' && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Formateurs</h2>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Ajouter un Formateur</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockInstructors.map((instructor) => (
                      <div key={instructor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {instructor.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">{instructor.name}</h3>
                            <p className="text-gray-600">{instructor.speciality}</p>
                            <p className="text-sm text-gray-500">{instructor.email}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-blue-900">{instructor.courses}</p>
                            <p className="text-xs text-gray-600">Formations</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">{instructor.students}</p>
                            <p className="text-xs text-gray-600">Étudiants</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-orange-500">{instructor.rating}</p>
                            <p className="text-xs text-gray-600">Note</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {instructor.status}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Management */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        { id: 'CMD-001', client: 'Marie Dubois', amount: 199, status: 'Payé', date: '15 Jan 2025' },
                        { id: 'CMD-002', client: 'Jean Martin', amount: 89, status: 'En cours', date: '14 Jan 2025' },
                        { id: 'CMD-003', client: 'Sophie Laurent', amount: 299, status: 'Livré', date: '13 Jan 2025' }
                      ].map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                            {order.client}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">
                            {order.amount}€
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              order.status === 'Payé' ? 'bg-green-100 text-green-800' :
                              order.status === 'En cours' ? 'bg-orange-100 text-orange-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {order.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button className="text-blue-600 hover:text-blue-900 transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du Site</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Paramètres Généraux</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Site</label>
                        <input
                          type="text"
                          defaultValue="PrestaShop Academy"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contact</label>
                        <input
                          type="email"
                          defaultValue="contact@prestashop-academy.fr"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Paramètres E-commerce</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Maintenance Mode</p>
                          <p className="text-sm text-gray-600">Activer le mode maintenance du site</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2">
                      <Save className="h-5 w-5" />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;