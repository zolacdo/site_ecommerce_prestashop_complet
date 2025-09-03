import React, { useState, useMemo } from 'react';
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, Settings, LogOut, Bell,
  Plus, Edit, Trash2, Eye, Search, Filter,
  Save, X, MessageSquare, Newspaper, CheckCircle, XCircle, Download, Upload, RefreshCw, PieChart, Calendar, Clock, Star, Award, Target, Zap
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import ReactQuill from 'react-quill';
// Assurez-vous d'importer le CSS de react-quill dans votre point d'entrée CSS principal
// import 'react-quill/dist/quill.snow.css';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onAdminLogout: () => void;
}

// Données de simulation initiales
const initialUsers = [
  { id: '1', name: 'Marie Dubois', email: 'marie@example.com', role: 'Client', status: 'Actif', joinDate: '15 Jan 2025' },
  { id: '2', name: 'Jean Martin', email: 'jean@example.com', role: 'Client', status: 'Actif', joinDate: '12 Jan 2025' },
  { id: '3', name: 'Sophie Laurent', email: 'sophie@example.com', role: 'Formateur', status: 'Actif', joinDate: '10 Jan 2025' }
];

const initialInstructors = [
  { id: '1', name: 'Alexandre Martin', email: 'alexandre@prestashop-academy.fr', speciality: 'PrestaShop Expert', courses: 12, students: 2340, rating: 4.9, status: 'Actif' },
  { id: '2', name: 'Sophie Dubois', email: 'sophie@prestashop-academy.fr', speciality: 'Développement Modules', courses: 8, students: 1560, rating: 4.8, status: 'Actif' }
];

const initialProducts = [
    { id: 'prod1', name: 'Formation Complète PrestaShop', type: 'Formation', price: 499, stock: 999 },
    { id: 'prod2', name: 'Module SEO Ultimate', type: 'Module', price: 129, stock: 50 },
    { id: 'prod3', name: 'Thème "Elegance"', type: 'Thème', price: 89, stock: 100 },
];

const initialPosts = [
  {
    id: 'post1',
    title: "Nouveautés de PrestaShop 8.1",
    author: "Alexandre Martin",
    date: "22 Fév 2025",
    content: "<p>Découvrez les dernières fonctionnalités et améliorations de la version 8.1 de PrestaShop...</p>",
    comments: [
      { id: 'c1', author: 'Marie Dubois', content: 'Super article, merci !', status: 'approved' },
      { id: 'c2', author: 'Jean Martin', content: 'Très informatif.', status: 'pending' },
    ],
  },
  {
    id: 'post2',
    title: "Optimiser les performances de votre boutique",
    author: "Sophie Dubois",
    date: "18 Fév 2025",
    content: "<p>Un guide complet pour rendre votre site PrestaShop plus rapide et plus efficace.</p>",
    comments: [
       { id: 'c3', author: 'Un Visiteur', content: 'Merci pour ces astuces !', status: 'approved' },
    ],
  },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onAdminLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const { currentAdmin, stats, logoutAdmin } = useAdmin();

  // États locaux pour simuler une base de données
  const [users, setUsers] = useState(initialUsers);
  const [instructors, setInstructors] = useState(initialInstructors);
  const [products, setProducts] = useState(initialProducts);
  const [posts, setPosts] = useState(initialPosts);

  const [modal, setModal] = useState({ isOpen: false, type: '', data: null as any });

  const commentsPendingValidation = useMemo(() => {
    return posts.reduce((count, post) =>
      count + post.comments.filter(c => c.status === 'pending').length, 0);
  }, [posts]);

  const recentActivities = [
    { id: 1, type: 'user', message: 'Nouvel utilisateur inscrit: Marie Dubois', time: '2 min', icon: Users },
    { id: 2, type: 'sale', message: 'Formation "PrestaShop Avancé" vendue', time: '5 min', icon: DollarSign },
    { id: 3, type: 'content', message: 'Nouveau module publié: "SEO Avancé"', time: '15 min', icon: Package },
    { id: 4, type: 'system', message: 'Sauvegarde automatique effectuée', time: '1h', icon: RefreshCw },
  ];

  const topFormations = [
    { name: 'PrestaShop Débutant', sales: 456, revenue: '€12,340', rating: 4.8 },
    { name: 'E-commerce Avancé', sales: 234, revenue: '€8,760', rating: 4.9 },
    { name: 'Marketing Digital', sales: 189, revenue: '€6,540', rating: 4.7 },
    { name: 'SEO & Référencement', sales: 167, revenue: '€5,890', rating: 4.6 },
  ];

  const enhancedStats = [
    { title: 'Utilisateurs Actifs', value: '2,847', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Formations Vendues', value: '1,234', change: '+8%', icon: Package, color: 'green' },
    { title: 'Revenus du Mois', value: '€45,678', change: '+23%', icon: DollarSign, color: 'purple' },
    { title: 'Taux de Conversion', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: 'orange' },
  ];

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3, badge: 0 },
    { id: 'users', label: 'Utilisateurs', icon: Users, badge: 0 },
    { id: 'products', label: 'Produits', icon: Package, badge: 0 },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, badge: 0 },
    { id: 'instructors', label: 'Formateurs', icon: Award, badge: 0 },
    { id: 'posts', label: 'Articles', icon: Newspaper, badge: commentsPendingValidation },
    { id: 'analytics', label: 'Analytiques', icon: PieChart, badge: 0 },
    { id: 'settings', label: 'Paramètres', icon: Settings, badge: 0 }
  ];

  const handleLogout = () => {
    logoutAdmin();
    onAdminLogout();
  };

  const openModal = (type: string, data: any = null) => setModal({ isOpen: true, type, data });
  const closeModal = () => setModal({ isOpen: false, type: '', data: null });

  // CRUD Handlers (fonctions pour manipuler les états locaux)
  const handleUserSubmit = (userData: any) => {
    if (modal.data?.id) { // Edition
      setUsers(users.map(u => u.id === userData.id ? userData : u));
    } else { // Ajout
      setUsers([...users, { ...userData, id: `user-${Date.now()}`, joinDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) }]);
    }
    closeModal();
  };
  
  const handleInstructorSubmit = (instructorData: any) => {
    if (modal.data?.id) {
        setInstructors(instructors.map(i => i.id === instructorData.id ? instructorData : i));
    } else {
        setInstructors([...instructors, { ...instructorData, id: `instructor-${Date.now()}`}]);
    }
    closeModal();
  };
  
  const handleProductSubmit = (productData: any) => {
    if (modal.data?.id) {
        setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else {
        setProducts([...products, { ...productData, id: `product-${Date.now()}`}]);
    }
    closeModal();
  };

  const handleDelete = () => {
    const { type, data } = modal;
    if (!data) return;
    if (type.startsWith('deleteUser')) setUsers(users.filter(u => u.id !== data.id));
    if (type.startsWith('deleteInstructor')) setInstructors(instructors.filter(i => i.id !== data.id));
    if (type.startsWith('deleteProduct')) setProducts(products.filter(p => p.id !== data.id));
    if (type.startsWith('deletePost')) setPosts(posts.filter(p => p.id !== data.id));
    closeModal();
  };

  const handlePostSubmit = (postData: any) => {
    // Note: In a real app, you would get the content from the ReactQuill state
    // For this simulation, we'll assume postData contains the content.
    if (modal.data?.id) { // Edition
      setPosts(posts.map(p => p.id === postData.id ? { ...p, ...postData } : p));
    } else { // Ajout
      setPosts([{ ...postData, id: `post-${Date.now()}`, author: currentAdmin?.firstName || "Admin", date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }), comments: [] }, ...posts]);
    }
    closeModal();
  };

  const handleCommentValidation = (postId: string, commentId: string, status: 'approved' | 'rejected') => {
      setPosts(posts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: post.comments.map(comment =>
                    comment.id === commentId ? { ...comment, status } : comment
                ).filter(comment => status === 'rejected' ? comment.id !== commentId : true)
            };
        }
        return post;
      }));
  };

  const getStatColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration PrestaShop Academy</h1>
                <p className="text-sm text-gray-500">Panel de contrôle avancé</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {recentActivities.slice(0, 3).map((activity) => (
                        <div key={activity.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="p-1 bg-blue-100 rounded">
                              <activity.icon className="w-3 h-3 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-900">{activity.message}</p>
                              <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4">
                      <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir toutes les notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">{currentAdmin?.firstName.charAt(0)}</div>
                <span className="font-medium text-gray-900">{currentAdmin?.firstName}</span>
              </div>
              <button onClick={handleLogout} className="text-gray-600 hover:text-red-600 transition-colors">
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Revenus ce mois</p>
                      <p className="text-xl font-bold">€45,678</p>
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-80" />
                  </div>
                </div>
              </div>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-900 font-medium shadow-sm border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${
                          activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
              
              {/* Quick Stats in Sidebar */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Statistiques Rapides</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Utilisateurs en ligne</span>
                    <span className="font-medium text-green-600">127</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Ventes aujourd'hui</span>
                    <span className="font-medium text-blue-600">23</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Support tickets</span>
                    <span className="font-medium text-orange-600">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-4">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {enhancedStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.change}
                          </p>
                        </div>
                        <div className={`p-3 ${getStatColor(stat.color)} bg-opacity-10 rounded-lg`}>
                          <stat.icon className="w-6 h-6 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Charts and Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Activité Récente</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Voir tout
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="p-2 bg-gray-100 rounded-lg">
                            <activity.icon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Formations */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Top Formations</h3>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Rapport complet
                      </button>
                    </div>
                    <div className="space-y-4">
                      {topFormations.map((formation, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{formation.name}</p>
                              <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <span>{formation.sales} ventes</span>
                                <span>•</span>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                  <span>{formation.rating}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formation.revenue}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                  <div className="grid grid-cols-2