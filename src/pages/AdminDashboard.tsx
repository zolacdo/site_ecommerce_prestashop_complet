import React, { useState, useMemo } from 'react';
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, Settings, LogOut, Bell,
  Plus, Edit, Trash2, Eye, Search, Filter,
  Save, X, MessageSquare, Newspaper, CheckCircle, XCircle, 
  Download, Upload, RefreshCw, PieChart, Calendar, Clock, 
  Star, Award, Target, Zap, UserPlus, BookOpen, Mail,
  Phone, MapPin, Globe, Shield, AlertTriangle, Activity
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import ReactQuill from 'react-quill';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  onAdminLogout: () => void;
}

// Données de simulation enrichies
const initialUsers = [
  { 
    id: '1', 
    name: 'Marie Dubois', 
    email: 'marie@example.com', 
    role: 'Client', 
    status: 'Actif', 
    joinDate: '15 Jan 2025',
    lastLogin: '16 Jan 2025',
    totalSpent: 299,
    coursesEnrolled: 3,
    avatar: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '2', 
    name: 'Jean Martin', 
    email: 'jean@example.com', 
    role: 'Client', 
    status: 'Actif', 
    joinDate: '12 Jan 2025',
    lastLogin: '16 Jan 2025',
    totalSpent: 189,
    coursesEnrolled: 2,
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '3', 
    name: 'Sophie Laurent', 
    email: 'sophie@example.com', 
    role: 'Formateur', 
    status: 'Actif', 
    joinDate: '10 Jan 2025',
    lastLogin: '15 Jan 2025',
    totalSpent: 0,
    coursesEnrolled: 0,
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const initialInstructors = [
  { 
    id: '1', 
    name: 'Alexandre Martin', 
    email: 'alexandre@prestashop-academy.fr', 
    speciality: 'PrestaShop Expert', 
    courses: 12, 
    students: 2340, 
    rating: 4.9, 
    status: 'Actif',
    totalEarnings: 45600,
    bio: 'Expert PrestaShop avec 15 ans d\'expérience',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '2', 
    name: 'Sophie Dubois', 
    email: 'sophie@prestashop-academy.fr', 
    speciality: 'Développement Modules', 
    courses: 8, 
    students: 1560, 
    rating: 4.8, 
    status: 'Actif',
    totalEarnings: 32400,
    bio: 'Spécialiste en développement de modules PrestaShop',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const initialProducts = [
  { 
    id: 'prod1', 
    name: 'Formation PrestaShop Complète', 
    type: 'Formation', 
    price: 199, 
    originalPrice: 299,
    stock: 999,
    sales: 456,
    rating: 4.9,
    status: 'Publié',
    category: 'E-commerce',
    description: 'Formation complète pour maîtriser PrestaShop',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'prod2', 
    name: 'Module SEO Ultimate', 
    type: 'Module', 
    price: 129, 
    stock: 50,
    sales: 234,
    rating: 4.7,
    status: 'Publié',
    category: 'SEO',
    description: 'Module SEO avancé pour PrestaShop',
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: 'prod3', 
    name: 'Thème Elegance Pro', 
    type: 'Thème', 
    price: 89, 
    stock: 100,
    sales: 189,
    rating: 4.6,
    status: 'Brouillon',
    category: 'Design',
    description: 'Thème élégant et responsive',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

const initialOrders = [
  {
    id: 'CMD-2025-001',
    userId: '1',
    userName: 'Marie Dubois',
    userEmail: 'marie@example.com',
    items: [
      { id: 'prod1', name: 'Formation PrestaShop Complète', price: 199, quantity: 1 }
    ],
    total: 199,
    status: 'completed' as const,
    paymentMethod: 'Visa •••• 4242',
    createdAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 'CMD-2025-002',
    userId: '2',
    userName: 'Jean Martin',
    userEmail: 'jean@example.com',
    items: [
      { id: 'prod2', name: 'Module SEO Ultimate', price: 129, quantity: 1 }
    ],
    total: 129,
    status: 'pending' as const,
    paymentMethod: 'PayPal',
    createdAt: '2025-01-16T09:15:00Z'
  }
];

const initialPosts = [
  {
    id: 'post1',
    title: "Nouveautés de PrestaShop 8.1",
    author: "Alexandre Martin",
    date: "22 Fév 2025",
    status: 'published',
    views: 1247,
    likes: 89,
    content: "<p>Découvrez les dernières fonctionnalités et améliorations de la version 8.1 de PrestaShop...</p>",
    excerpt: "Explorez les nouvelles fonctionnalités de PrestaShop 8.1",
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'news',
    tags: ['PrestaShop', 'Nouveautés', 'Version 8.1'],
    comments: [
      { id: 'c1', author: 'Marie Dubois', content: 'Super article, merci !', status: 'approved', date: '23 Fév 2025' },
      { id: 'c2', author: 'Jean Martin', content: 'Très informatif.', status: 'pending', date: '23 Fév 2025' },
    ],
  },
  {
    id: 'post2',
    title: "Optimiser les performances de votre boutique",
    author: "Sophie Dubois",
    date: "18 Fév 2025",
    status: 'published',
    views: 892,
    likes: 67,
    content: "<p>Un guide complet pour rendre votre site PrestaShop plus rapide et plus efficace.</p>",
    excerpt: "Techniques d'optimisation pour PrestaShop",
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=400',
    category: 'tips',
    tags: ['Performance', 'Optimisation'],
    comments: [
       { id: 'c3', author: 'Un Visiteur', content: 'Merci pour ces astuces !', status: 'approved', date: '19 Fév 2025' },
    ],
  },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, onAdminLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { currentAdmin, stats, logoutAdmin } = useAdmin();

  // États locaux pour simuler une base de données
  const [users, setUsers] = useState(initialUsers);
  const [instructors, setInstructors] = useState(initialInstructors);
  const [products, setProducts] = useState(initialProducts);
  const [posts, setPosts] = useState(initialPosts);
  const [orders, setOrders] = useState(initialOrders);

  const [modal, setModal] = useState({ isOpen: false, type: '', data: null as any });
  const [quillContent, setQuillContent] = useState('');

  const commentsPendingValidation = useMemo(() => {
    return posts.reduce((count, post) =>
      count + post.comments.filter(c => c.status === 'pending').length, 0);
  }, [posts]);

  const recentActivities = [
    { id: 1, type: 'user', message: 'Nouvel utilisateur inscrit: Marie Dubois', time: '2 min', icon: Users, color: 'blue' },
    { id: 2, type: 'sale', message: 'Formation "PrestaShop Avancé" vendue', time: '5 min', icon: DollarSign, color: 'green' },
    { id: 3, type: 'content', message: 'Nouveau module publié: "SEO Avancé"', time: '15 min', icon: Package, color: 'purple' },
    { id: 4, type: 'system', message: 'Sauvegarde automatique effectuée', time: '1h', icon: RefreshCw, color: 'gray' },
    { id: 5, type: 'support', message: '3 nouveaux tickets de support', time: '2h', icon: MessageSquare, color: 'orange' },
  ];

  const topFormations = [
    { name: 'PrestaShop Débutant', sales: 456, revenue: 12340, rating: 4.8, growth: '+12%' },
    { name: 'E-commerce Avancé', sales: 234, revenue: 8760, rating: 4.9, growth: '+8%' },
    { name: 'Marketing Digital', sales: 189, revenue: 6540, rating: 4.7, growth: '+15%' },
    { name: 'SEO & Référencement', sales: 167, revenue: 5890, rating: 4.6, growth: '+5%' },
  ];

  const enhancedStats = [
    { title: 'Utilisateurs Actifs', value: '2,847', change: '+12%', icon: Users, color: 'blue', description: 'Utilisateurs connectés ce mois' },
    { title: 'Formations Vendues', value: '1,234', change: '+8%', icon: Package, color: 'green', description: 'Ventes ce mois' },
    { title: 'Revenus du Mois', value: '€45,678', change: '+23%', icon: DollarSign, color: 'purple', description: 'Chiffre d\'affaires mensuel' },
    { title: 'Taux de Conversion', value: '3.2%', change: '+0.5%', icon: TrendingUp, color: 'orange', description: 'Visiteurs → Clients' },
  ];

  const systemHealth = [
    { name: 'Serveur Web', status: 'healthy', uptime: '99.9%', responseTime: '120ms' },
    { name: 'Base de Données', status: 'healthy', uptime: '99.8%', responseTime: '45ms' },
    { name: 'CDN', status: 'warning', uptime: '98.5%', responseTime: '200ms' },
    { name: 'Email Service', status: 'healthy', uptime: '99.9%', responseTime: '80ms' },
  ];

  const tabs = [
    { id: 'overview', label: 'Tableau de Bord', icon: BarChart3, badge: 0 },
    { id: 'users', label: 'Utilisateurs', icon: Users, badge: users.filter(u => u.joinDate.includes('16 Jan')).length },
    { id: 'products', label: 'Produits', icon: Package, badge: products.filter(p => p.status === 'Brouillon').length },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, badge: orders.filter(o => o.status === 'pending').length },
    { id: 'instructors', label: 'Formateurs', icon: Award, badge: 0 },
    { id: 'posts', label: 'Articles', icon: Newspaper, badge: commentsPendingValidation },
    { id: 'analytics', label: 'Analytiques', icon: PieChart, badge: 0 },
    { id: 'system', label: 'Système', icon: Activity, badge: systemHealth.filter(s => s.status === 'warning').length },
    { id: 'settings', label: 'Paramètres', icon: Settings, badge: 0 }
  ];

  const handleLogout = () => {
    logoutAdmin();
    onAdminLogout();
  };

  const openModal = (type: string, data: any = null) => {
    setModal({ isOpen: true, type, data });
    if (type.includes('Post') && data?.content) {
      setQuillContent(data.content);
    }
  };
  
  const closeModal = () => {
    setModal({ isOpen: false, type: '', data: null });
    setQuillContent('');
  };

  // CRUD Handlers
  const handleUserSubmit = (userData: any) => {
    if (modal.data?.id) {
      setUsers(users.map(u => u.id === userData.id ? { ...u, ...userData } : u));
    } else {
      setUsers([...users, { 
        ...userData, 
        id: `user-${Date.now()}`, 
        joinDate: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
        lastLogin: 'Jamais',
        totalSpent: 0,
        coursesEnrolled: 0,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      }]);
    }
    closeModal();
  };
  
  const handleInstructorSubmit = (instructorData: any) => {
    if (modal.data?.id) {
      setInstructors(instructors.map(i => i.id === instructorData.id ? { ...i, ...instructorData } : i));
    } else {
      setInstructors([...instructors, { 
        ...instructorData, 
        id: `instructor-${Date.now()}`,
        courses: 0,
        students: 0,
        rating: 0,
        totalEarnings: 0,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400'
      }]);
    }
    closeModal();
  };
  
  const handleProductSubmit = (productData: any) => {
    if (modal.data?.id) {
      setProducts(products.map(p => p.id === productData.id ? { ...p, ...productData } : p));
    } else {
      setProducts([...products, { 
        ...productData, 
        id: `product-${Date.now()}`,
        sales: 0,
        rating: 0,
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
      }]);
    }
    closeModal();
  };

  const handleOrderStatusUpdate = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus as any } : order
    ));
  };

  const handleDelete = () => {
    const { type, data } = modal;
    if (!data) return;
    if (type.startsWith('deleteUser')) setUsers(users.filter(u => u.id !== data.id));
    if (type.startsWith('deleteInstructor')) setInstructors(instructors.filter(i => i.id !== data.id));
    if (type.startsWith('deleteProduct')) setProducts(products.filter(p => p.id !== data.id));
    if (type.startsWith('deletePost')) setPosts(posts.filter(p => p.id !== data.id));
    if (type.startsWith('deleteOrder')) setOrders(orders.filter(o => o.id !== data.id));
    closeModal();
  };

  const handlePostSubmit = (postData: any) => {
    const postWithContent = { ...postData, content: quillContent };
    if (modal.data?.id) {
      setPosts(posts.map(p => p.id === postData.id ? { ...p, ...postWithContent } : p));
    } else {
      setPosts([{ 
        ...postWithContent, 
        id: `post-${Date.now()}`, 
        author: currentAdmin?.firstName || "Admin", 
        date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }), 
        views: 0,
        likes: 0,
        comments: [],
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400'
      }, ...posts]);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Actif':
      case 'healthy':
      case 'completed':
      case 'approved':
      case 'published': return 'bg-green-100 text-green-800';
      case 'Inactif':
      case 'cancelled':
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending':
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'Brouillon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = useMemo(() => {
    const query = searchQuery.toLowerCase();
    
    switch (activeTab) {
      case 'users':
        return users.filter(user => 
          (selectedFilter === 'all' || user.role === selectedFilter) &&
          (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query))
        );
      case 'products':
        return products.filter(product => 
          (selectedFilter === 'all' || product.type === selectedFilter) &&
          product.name.toLowerCase().includes(query)
        );
      case 'orders':
        return orders.filter(order => 
          (selectedFilter === 'all' || order.status === selectedFilter) &&
          (order.id.toLowerCase().includes(query) || order.userName.toLowerCase().includes(query))
        );
      case 'instructors':
        return instructors.filter(instructor => 
          instructor.name.toLowerCase().includes(query) || instructor.email.toLowerCase().includes(query)
        );
      case 'posts':
        return posts.filter(post => 
          (selectedFilter === 'all' || post.status === selectedFilter) &&
          post.title.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  }, [activeTab, searchQuery, selectedFilter, users, products, orders, instructors, posts]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration PrestaShop Academy</h1>
                <p className="text-sm text-gray-500">Panel de contrôle avancé</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* System Status */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Système opérationnel</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {recentActivities.length}
                  </span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Notifications Récentes</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {recentActivities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className={`p-1 rounded ${
                              activity.color === 'blue' ? 'bg-blue-100' :
                              activity.color === 'green' ? 'bg-green-100' :
                              activity.color === 'purple' ? 'bg-purple-100' :
                              activity.color === 'orange' ? 'bg-orange-100' :
                              'bg-gray-100'
                            }`}>
                              <activity.icon className={`w-3 h-3 ${
                                activity.color === 'blue' ? 'text-blue-600' :
                                activity.color === 'green' ? 'text-green-600' :
                                activity.color === 'purple' ? 'text-purple-600' :
                                activity.color === 'orange' ? 'text-orange-600' :
                                'text-gray-600'
                              }`} />
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

              {/* Admin Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {currentAdmin?.firstName.charAt(0)}
                </div>
                <div className="hidden md:block">
                  <span className="font-medium text-gray-900">{currentAdmin?.firstName} {currentAdmin?.lastName}</span>
                  <p className="text-xs text-gray-500">{currentAdmin?.role}</p>
                </div>
              </div>
              
              <button 
                onClick={handleLogout} 
                className="text-gray-600 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                title="Déconnexion"
              >
                <LogOut className="h-5 w-5" />
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
              {/* Quick Stats Card */}
              <div className="mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Revenus ce mois</p>
                      <p className="text-xl font-bold">€45,678</p>
                      <p className="text-xs opacity-75">+23% vs mois dernier</p>
                    </div>
                    <TrendingUp className="w-6 h-6 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Navigation */}
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
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Revenus aujourd'hui</span>
                    <span className="font-medium text-purple-600">€2,340</span>
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
                    <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                          <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                          <p className={`text-sm mt-1 flex items-center ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {stat.change}
                          </p>
                        </div>
                        <div className={`p-3 ${getStatColor(stat.color)} bg-opacity-10 rounded-lg`}>
                          <stat.icon className={`w-6 h-6 ${getStatColor(stat.color).replace('bg-', 'text-')}`} />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
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
                          <div className={`p-2 rounded-lg ${
                            activity.color === 'blue' ? 'bg-blue-100' :
                            activity.color === 'green' ? 'bg-green-100' :
                            activity.color === 'purple' ? 'bg-purple-100' :
                            activity.color === 'orange' ? 'bg-orange-100' :
                            'bg-gray-100'
                          }`}>
                            <activity.icon className={`w-4 h-4 ${
                              activity.color === 'blue' ? 'text-blue-600' :
                              activity.color === 'green' ? 'text-green-600' :
                              activity.color === 'purple' ? 'text-purple-600' :
                              activity.color === 'orange' ? 'text-orange-600' :
                              'text-gray-600'
                            }`} />
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
                                <span>•</span>
                                <span className="text-green-600">{formation.growth}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">€{formation.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">État du Système</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {systemHealth.map((service, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{service.name}</span>
                          <div className={`w-3 h-3 rounded-full ${
                            service.status === 'healthy' ? 'bg-green-500' :
                            service.status === 'warning' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}></div>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Uptime:</span>
                            <span className="font-medium">{service.uptime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Réponse:</span>
                            <span className="font-medium">{service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      onClick={() => openModal('addUser')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">Ajouter Utilisateur</span>
                    </button>
                    <button
                      onClick={() => openModal('addProduct')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                    >
                      <Plus className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Nouveau Produit</span>
                    </button>
                    <button
                      onClick={() => openModal('addPost')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                    >
                      <Newspaper className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Nouvel Article</span>
                    </button>
                    <button
                      onClick={() => openModal('addInstructor')}
                      className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors"
                    >
                      <Award className="w-6 h-6 text-orange-600 mb-2" />
                      <span className="text-sm font-medium">Ajouter Formateur</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Gestion des Utilisateurs</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Tous les rôles</option>
                        <option value="Client">Clients</option>
                        <option value="Formateur">Formateurs</option>
                        <option value="Assistant">Assistants</option>
                      </select>
                      <button
                        onClick={() => openModal('addUser')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter</span>
                      </button>
                    </div>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dépenses</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((user: any) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover mr-3" />
                              <div>
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
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            €{user.totalSpent}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openModal('viewUser', user)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openModal('editUser', user)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openModal('deleteUser', user)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
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
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Gestion des Produits</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Tous les types</option>
                        <option value="Formation">Formations</option>
                        <option value="Module">Modules</option>
                        <option value="Thème">Thèmes</option>
                      </select>
                      <button
                        onClick={() => openModal('addProduct')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {filteredData.map((product: any) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                            {product.status}
                          </span>
                          <span className="text-xs text-gray-500">{product.type}</span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-gray-900">€{product.price}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                          <span className="text-xs text-gray-500">{product.sales} ventes</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openModal('editProduct', product)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openModal('deleteProduct', product)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Orders Management */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Gestion des Commandes</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Rechercher..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <select
                        value={selectedFilter}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="pending">En attente</option>
                        <option value="completed">Complétées</option>
                        <option value="cancelled">Annulées</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.map((order: any) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.id}</div>
                            <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{order.userName}</div>
                            <div className="text-sm text-gray-500">{order.userEmail}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {order.items.map((item: any, index: number) => (
                                <div key={index} className="mb-1">
                                  {item.name} (x{item.quantity})
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-bold text-gray-900">€{order.total}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleOrderStatusUpdate(order.id, e.target.value)}
                              className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(order.status)}`}
                            >
                              <option value="pending">En attente</option>
                              <option value="completed">Complétée</option>
                              <option value="cancelled">Annulée</option>
                              <option value="refunded">Remboursée</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openModal('viewOrder', order)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openModal('deleteOrder', order)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
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

            {/* Instructors Management */}
            {activeTab === 'instructors' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">Gestion des Formateurs</h2>
                    <button
                      onClick={() => openModal('addInstructor')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter Formateur</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {instructors.map((instructor) => (
                    <div key={instructor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-4">
                        <img src={instructor.avatar} alt={instructor.name} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{instructor.name}</h3>
                          <p className="text-sm text-gray-600">{instructor.speciality}</p>
                          <p className="text-xs text-gray-500 mt-1">{instructor.email}</p>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-gray-500">Cours:</span>
                              <span className="font-medium ml-1">{instructor.courses}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Étudiants:</span>
                              <span className="font-medium ml-1">{instructor.students}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Note:</span>
                              <div className="flex items-center ml-1">
                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                <span className="font-medium">{instructor.rating}</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Revenus:</span>
                              <span className="font-medium ml-1 text-green-600">€{instructor.totalEarnings.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(instructor.status)}`}>
                              {instructor.status}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => openModal('editInstructor', instructor)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => openModal('deleteInstructor', instructor)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Posts Management */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                {/* Posts List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                      <h2 className="text-xl font-semibold text-gray-900">Gestion des Articles</h2>
                      <button
                        onClick={() => openModal('addPost')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Nouvel Article</span>
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {posts.map((post) => (
                      <div key={post.id} className="p-6 hover:bg-gray-50">
                        <div className="flex items-start space-x-4">
                          <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-gray-900">{post.title}</h3>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => openModal('editPost', post)}
                                  className="text-blue-600 hover:text-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => openModal('deletePost', post)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span>Par {post.author}</span>
                              <span>{post.date}</span>
                              <span>{post.views} vues</span>
                              <span>{post.likes} likes</span>
                              <span className={`px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                                {post.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments Moderation */}
                {commentsPendingValidation > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Commentaires en Attente ({commentsPendingValidation})
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {posts.map((post) =>
                        post.comments
                          .filter(comment => comment.status === 'pending')
                          .map((comment) => (
                            <div key={comment.id} className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <span className="font-medium text-gray-900">{comment.author}</span>
                                    <span className="text-sm text-gray-500">sur "{post.title}"</span>
                                  </div>
                                  <p className="text-gray-700 mb-3">{comment.content}</p>
                                  <span className="text-xs text-gray-500">{comment.date}</span>
                                </div>
                                <div className="flex items-center space-x-2 ml-4">
                                  <button
                                    onClick={() => handleCommentValidation(post.id, comment.id, 'approved')}
                                    className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200 transition-colors flex items-center space-x-1"
                                  >
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Approuver</span>
                                  </button>
                                  <button
                                    onClick={() => handleCommentValidation(post.id, comment.id, 'rejected')}
                                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition-colors flex items-center space-x-1"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    <span>Rejeter</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                {/* System Health */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">État du Système</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {systemHealth.map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <div className={`flex items-center space-x-2 ${
                            service.status === 'healthy' ? 'text-green-600' :
                            service.status === 'warning' ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              service.status === 'healthy' ? 'bg-green-500' :
                              service.status === 'warning' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}></div>
                            <span className="text-sm font-medium capitalize">{service.status}</span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Uptime:</span>
                            <span className="font-medium">{service.uptime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Temps de réponse:</span>
                            <span className="font-medium">{service.responseTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Système</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors">
                      <RefreshCw className="w-6 h-6 text-blue-600 mb-2" />
                      <span className="text-sm font-medium">Redémarrer Services</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors">
                      <Download className="w-6 h-6 text-green-600 mb-2" />
                      <span className="text-sm font-medium">Sauvegarde DB</span>
                    </button>
                    <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors">
                      <Upload className="w-6 h-6 text-purple-600 mb-2" />
                      <span className="text-sm font-medium">Logs Système</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytiques Avancées</h2>
                  <div className="text-center py-12">
                    <PieChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Graphiques en Développement</h3>
                    <p className="text-gray-600">Les graphiques détaillés seront bientôt disponibles</p>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres Système</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Configuration Générale</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du site</label>
                          <input
                            type="text"
                            defaultValue="PrestaShop Academy"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email de contact</label>
                          <input
                            type="email"
                            defaultValue="contact@prestashop-academy.fr"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Paramètres E-commerce</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Maintenance mode</span>
                          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Nouvelles inscriptions</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">Chat support</span>
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        </div>
                      </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Sauvegarder les Paramètres
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Modal System */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {modal.type.includes('add') ? 'Ajouter' : 
                   modal.type.includes('edit') ? 'Modifier' : 
                   modal.type.includes('delete') ? 'Supprimer' : 'Voir'} {' '}
                  {modal.type.includes('User') ? 'Utilisateur' :
                   modal.type.includes('Product') ? 'Produit' :
                   modal.type.includes('Instructor') ? 'Formateur' :
                   modal.type.includes('Post') ? 'Article' :
                   modal.type.includes('Order') ? 'Commande' : ''}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Delete Confirmation */}
              {modal.type.includes('delete') && (
                <div className="text-center">
                  <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Confirmer la Suppression</h3>
                  <p className="text-gray-600 mb-6">
                    Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
                  </p>
                  <div className="flex space-x-3 justify-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}

              {/* User Form */}
              {(modal.type === 'addUser' || modal.type === 'editUser') && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleUserSubmit({
                    id: modal.data?.id,
                    name: formData.get('name'),
                    email: formData.get('email'),
                    role: formData.get('role'),
                    status: formData.get('status') || 'Actif'
                  });
                }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={modal.data?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={modal.data?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                      <select
                        name="role"
                        defaultValue={modal.data?.role}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Client">Client</option>
                        <option value="Formateur">Formateur</option>
                        <option value="Assistant">Assistant</option>
                        <option value="Admin">Administrateur</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select
                        name="status"
                        defaultValue={modal.data?.status}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                        <option value="Suspendu">Suspendu</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modal.type === 'editUser' ? 'Modifier' : 'Ajouter'}
                    </button>
                  </div>
                </form>
              )}

              {/* Product Form */}
              {(modal.type === 'addProduct' || modal.type === 'editProduct') && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleProductSubmit({
                    id: modal.data?.id,
                    name: formData.get('name'),
                    type: formData.get('type'),
                    price: Number(formData.get('price')),
                    originalPrice: Number(formData.get('originalPrice')) || undefined,
                    stock: Number(formData.get('stock')),
                    status: formData.get('status'),
                    category: formData.get('category'),
                    description: formData.get('description')
                  });
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom du produit</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={modal.data?.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                      <select
                        name="type"
                        defaultValue={modal.data?.type}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Formation">Formation</option>
                        <option value="Module">Module</option>
                        <option value="Thème">Thème</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix (€)</label>
                      <input
                        type="number"
                        name="price"
                        defaultValue={modal.data?.price}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Prix original (€)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        defaultValue={modal.data?.originalPrice}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        defaultValue={modal.data?.stock}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select
                        name="status"
                        defaultValue={modal.data?.status}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Publié">Publié</option>
                        <option value="Brouillon">Brouillon</option>
                        <option value="Archivé">Archivé</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                      <input
                        type="text"
                        name="category"
                        defaultValue={modal.data?.category}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      defaultValue={modal.data?.description}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modal.type === 'editProduct' ? 'Modifier' : 'Ajouter'}
                    </button>
                  </div>
                </form>
              )}

              {/* Instructor Form */}
              {(modal.type === 'addInstructor' || modal.type === 'editInstructor') && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleInstructorSubmit({
                    id: modal.data?.id,
                    name: formData.get('name'),
                    email: formData.get('email'),
                    speciality: formData.get('speciality'),
                    bio: formData.get('bio'),
                    status: formData.get('status') || 'Actif'
                  });
                }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={modal.data?.name}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={modal.data?.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Spécialité</label>
                    <input
                      type="text"
                      name="speciality"
                      defaultValue={modal.data?.speciality}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
                    <textarea
                      name="bio"
                      defaultValue={modal.data?.bio}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modal.type === 'editInstructor' ? 'Modifier' : 'Ajouter'}
                    </button>
                  </div>
                </form>
              )}

              {/* Post Form */}
              {(modal.type === 'addPost' || modal.type === 'editPost') && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handlePostSubmit({
                    id: modal.data?.id,
                    title: formData.get('title'),
                    excerpt: formData.get('excerpt'),
                    category: formData.get('category'),
                    status: formData.get('status') || 'published',
                    tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()) || []
                  });
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={modal.data?.title}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extrait</label>
                    <textarea
                      name="excerpt"
                      defaultValue={modal.data?.excerpt}
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contenu</label>
                    <ReactQuill
                      value={quillContent}
                      onChange={setQuillContent}
                      className="bg-white"
                      style={{ height: '200px', marginBottom: '50px' }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                      <select
                        name="category"
                        defaultValue={modal.data?.category}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="news">Actualités</option>
                        <option value="tips">Conseils</option>
                        <option value="tutorials">Tutoriels</option>
                        <option value="updates">Mises à jour</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                      <select
                        name="status"
                        defaultValue={modal.data?.status}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="published">Publié</option>
                        <option value="draft">Brouillon</option>
                        <option value="archived">Archivé</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (séparés par des virgules)</label>
                    <input
                      type="text"
                      name="tags"
                      defaultValue={modal.data?.tags?.join(', ')}
                      placeholder="PrestaShop, E-commerce, SEO"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {modal.type === 'editPost' ? 'Modifier' : 'Publier'}
                    </button>
                  </div>
                </form>
              )}

              {/* View Order */}
              {modal.type === 'viewOrder' && modal.data && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de commande</label>
                      <p className="text-gray-900 font-medium">{modal.data.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
                      <p className="text-gray-900">{modal.data.userName}</p>
                      <p className="text-sm text-gray-500">{modal.data.userEmail}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Produits commandés</label>
                    <div className="border border-gray-200 rounded-lg p-4">
                      {modal.data.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center py-2">
                          <span>{item.name} (x{item.quantity})</span>
                          <span className="font-medium">€{item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center font-bold">
                          <span>Total</span>
                          <span>€{modal.data.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Méthode de paiement</label>
                      <p className="text-gray-900">{modal.data.paymentMethod}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date de commande</label>
                      <p className="text-gray-900">{new Date(modal.data.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              )}

              {/* View User */}
              {modal.type === 'viewUser' && modal.data && (
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={modal.data.avatar} alt={modal.data.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">{modal.data.name}</h3>
                    <p className="text-gray-600">{modal.data.email}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Rôle:</span>
                      <span className="font-medium ml-2">{modal.data.role}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Statut:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(modal.data.status)}`}>
                        {modal.data.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Inscription:</span>
                      <span className="font-medium ml-2">{modal.data.joinDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Dernière connexion:</span>
                      <span className="font-medium ml-2">{modal.data.lastLogin}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Total dépensé:</span>
                      <span className="font-medium ml-2 text-green-600">€{modal.data.totalSpent}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Formations:</span>
                      <span className="font-medium ml-2">{modal.data.coursesEnrolled}</span>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;