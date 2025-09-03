import React, { useState } from 'react';
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, Calendar, Settings, LogOut, Bell,
  Plus, Edit, Trash2, Eye, Search, Filter, Save,
  X, MessageSquare, Check, XCircle, Clock, EyeOff, Lock
} from 'lucide-react';
import { useAdmin } from '../hooks/useAdmin';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// === Types ===
interface User {
  id: string;
  name: string;
  email: string;
  role: 'Client' | 'Formateur' | 'Admin';
  status: 'Actif' | 'Inactif';
  joinDate: string;
}
  
interface Instructor {
  id: string;
  name: string;
  email: string;
  speciality: string;
  courses: number;
  students: number;
  rating: number;
  status: 'Actif' | 'Inactif';
}

interface Product {
  id: string;
  name: string;
  type: 'Formation' | 'Module' | 'Thème';
  price: number;
  createdAt: string;
}

interface Order {
  id: string;
  client: string;
  amount: number;
  status: 'Payé' | 'En cours' | 'Livré' | 'Annulé';
  date: string;
}

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  published: boolean;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

interface Setting {
  siteName: string;
  contactEmail: string;
  maintenanceMode: boolean;
}

// === Dashboard Component ===
const AdminDashboard: React.FC<{
  onNavigate: (page: string) => void;
  onAdminLogout: () => void;
}> = ({ onNavigate, onAdminLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { currentAdmin, stats, logoutAdmin } = useAdmin();

  // === États locaux simulés ===
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Marie Dubois', email: 'marie@example.com', role: 'Client', status: 'Actif', joinDate: '15 Jan 2025' },
    { id: '2', name: 'Jean Martin', email: 'jean@example.com', role: 'Client', status: 'Actif', joinDate: '12 Jan 2025' },
    { id: '3', name: 'Sophie Laurent', email: 'sophie@example.com', role: 'Formateur', status: 'Actif', joinDate: '10 Jan 2025' }
  ]);

  const [instructors, setInstructors] = useState<Instructor[]>([
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
  ]);
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
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Formation PrestaShop 8', type: 'Formation', price: 199, createdAt: '15 Jan 2025' },
    { id: '2', name: 'Module Paiement', type: 'Module', price: 89, createdAt: '14 Jan 2025' },
    { id: '3', name: 'Thème Responsive', type: 'Thème', price: 149, createdAt: '13 Jan 2025' }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'CMD-001', client: 'Marie Dubois', amount: 199, status: 'Payé', date: '15 Jan 2025' },
    { id: 'CMD-002', client: 'Jean Martin', amount: 89, status: 'En cours', date: '14 Jan 2025' },
    { id: 'CMD-003', client: 'Sophie Laurent', amount: 299, status: 'Livré', date: '13 Jan 2025' }
  ]);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Débuter avec PrestaShop 8',
      author: 'Alexandre Martin',
      category: 'Tutoriel',
      content: '<p>Apprenez à installer et configurer PrestaShop 8 en quelques étapes simples.</p>',
      published: true,
      createdAt: '10 Jan 2025',
      comments: [
        { id: 'c1', author: 'Pauline', content: 'Très bon article !', createdAt: '11 Jan', approved: false },
        { id: 'c2', author: 'Luc', content: 'Merci pour les conseils.', createdAt: '10 Jan', approved: true }
      ]
    },
    {
      id: '2',
      title: 'Optimiser ses performances',
      author: 'Sophie Dubois',
      category: 'Performance',
      content: '<p>Voici comment améliorer la vitesse de votre boutique PrestaShop.</p>',
      published: false,
      createdAt: '8 Jan 2025',
      comments: [
        { id: 'c3', author: 'Marc', content: 'Quand sera-t-il publié ?', createdAt: '9 Jan', approved: true }
      ]
    }
  ]);

  // const [settings, setSettings] = useState<Setting>({
  //   siteName: 'PrestaShop Academy',
  //   contactEmail: 'contact@prestashop-academy.fr',
  //   maintenanceMode: false
  // });

  // === Modales ===
  const [modal, setModal] = useState<{
    open: boolean;
    type:
      | 'add-user'
      | 'edit-user'
      | 'add-instructor'
      | 'edit-instructor'
      | 'add-product'
      | 'edit-product'
      | 'add-order'
      | 'edit-order'
      | 'add-post'
      | 'edit-post'
      | 'view-post'
      | 'edit-settings'
      | 'delete';
    data?: any;
  }>({ open: false, type: 'add-user' });

  // === Formulaires locaux ===
  const [newUser, setNewUser] = useState<Omit<User, 'id' | 'joinDate'>>({
    name: '',
    email: '',
    role: 'Client',
    status: 'Actif'
  });

  // const [newInstructor, setNewInstructor] = useState<Omit<Instructor, 'id' | 'courses' | 'students' | 'rating'>>({
  //   name: '',
  //   email: '',
  //   speciality: '',
  //   status: 'Actif'
  // });

  // const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'createdAt'>>({
  //   name: '',
  //   type: 'Formation',
  //   price: 0
  // });

  // const [newOrder, setNewOrder] = useState<Omit<Order, 'id'>>({
  //   client: '',
  //   amount: 0,
  //   status: 'En cours',
  //   date: new Date().toLocaleDateString('fr-FR')
  // });

  const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'createdAt' | 'comments'>>({
    title: '',
    author: '',
    category: '',
    content: '',
    published: false
  });

  // === Calcul des commentaires en attente ===
  const pendingCommentsCount = posts.reduce(
    (acc, post) => acc + post.comments.filter(c => !c.approved).length,
    0
  );

  const handleLogout = () => {
    logoutAdmin();
    onAdminLogout();
  };

  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3 },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'products', label: 'Produits', icon: Package },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart },
    { id: 'instructors', label: 'Formateurs', icon: Users },
    { id: 'posts', label: 'Articles', icon: Calendar },
    { id: 'settings', label: 'Paramètres', icon: Settings }
  ];

  // === Actions CRUD ===
  const handleAddUser = () => {
    setUsers([
      ...users,
      {
        ...newUser,
        id: Date.now().toString(),
        joinDate: new Date().toLocaleDateString('fr-FR')
      }
    ]);
    setNewUser({ name: '', email: '', role: 'Client', status: 'Actif' });
    setModal({ open: false, type: 'add-user' });
  };

  const handleEditUser = () => {
    setUsers(users.map(u => u.id === modal.data.id ? { ...u, ...newUser } : u));
    setModal({ open: false, type: 'edit-user' });
  };

  const handleDelete = () => {
    const { id, type } = modal.data;
    if (type === 'user') setUsers(users.filter(u => u.id !== id));
    if (type === 'instructor') setInstructors(instructors.filter(i => i.id !== id));
    if (type === 'product') setProducts(products.filter(p => p.id !== id));
    if (type === 'order') setOrders(orders.filter(o => o.id !== id));
    if (type === 'post') setPosts(posts.filter(p => p.id !== id));
    setModal({ open: false, type: 'delete' });
  };

  const handleApproveComment = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(c => c.id === commentId ? { ...c, approved: true } : c)
        };
      }
      return post;
    }));
  };

  // === Retourne les onglets originaux + ajout de "Posts" ===
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
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors group">
                <Bell className="h-6 w-6" />
                {pendingCommentsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingCommentsCount}
                  </span>
                )}
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 hidden group-hover:block z-50">
                  <p className="text-sm font-medium text-gray-900 mb-2">Commentaires en attente</p>
                  {posts.flatMap(p => p.comments.filter(c => !c.approved).map(c => (
                    <div key={c.id} className="text-xs text-gray-600 border-b pb-1 mb-1">
                      <p><strong>{c.author}</strong> sur "{p.title}"</p>
                    </div>
                  )))}
                </div>
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
                        <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                        <p className="text-sm text-green-600">+{users.filter(u => u.joinDate.includes('2025')).length} ce mois</p>
                      </div>
                      <Users className="h-12 w-12 text-blue-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Produits</p>
                        <p className="text-3xl font-bold text-gray-900">{products.length}</p>
                        <p className="text-sm text-blue-600">Formations, Modules, Thèmes</p>
                      </div>
                      <Package className="h-12 w-12 text-green-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Commandes</p>
                        <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
                        <p className="text-sm text-orange-600">+{orders.filter(o => o.status === 'Payé').length} payées</p>
                      </div>
                      <ShoppingCart className="h-12 w-12 text-orange-500" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Chiffre d'Affaires</p>
                        <p className="text-3xl font-bold text-gray-900">
                          {orders.reduce((acc, o) => acc + o.amount, 0)}€
                        </p>
                        <p className="text-sm text-green-600">+{orders.filter(o => o.date.includes('15')).reduce((a, o) => a + o.amount, 0)}€ aujourd'hui</p>
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
                      {posts.flatMap(p => p.comments.filter(c => !c.approved).slice(0, 3).map(c => (
                        <div key={c.id} className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                          <div>
                            <p className="font-medium text-gray-900">{c.author} a commenté "{p.title}"</p>
                            <p className="text-sm text-gray-600">{c.createdAt}</p>
                          </div>
                          <button
                            onClick={() => setModal({ open: true, type: 'view-post', data: p })}
                            className="text-blue-600 text-xs underline"
                          >
                            Modérer
                          </button>
                        </div>
                      )))}
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
                    <button
                      onClick={() => setModal({ open: true, type: 'add-user' })}
                      className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
                    >
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
                      {users.map((user) => (
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
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                              user.role === 'Formateur' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.joinDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => {
                                  setNewUser(user);
                                  setModal({ open: true, type: 'edit-user', data: user });
                                }}
                                className="text-green-600 hover:text-green-900 transition-colors"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setModal({ open: true, type: 'delete', data: { id: user.id, type: 'user' } })}
                                className="text-red-600 hover:text-red-900 transition-colors"
                              >
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

            {/* Posts Management */}
            {activeTab === 'posts' && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Articles du Blog</h2>
                    <button
                      onClick={() => setModal({ open: true, type: 'add-post' })}
                      className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Nouvel Article</span>
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Auteur</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Com.</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {posts.map(post => {
                        const pending = post.comments.filter(c => !c.approved).length;
                        return (
                          <tr key={post.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                            <td className="px-6 py-4 text-gray-900">{post.author}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                {post.published ? 'Publié' : 'Brouillon'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {pending > 0 ? (
                                <span className="flex items-center text-orange-600 text-sm">
                                  <Clock className="h-4 w-4 mr-1" /> {pending}
                                </span>
                              ) : (
                                <span className="text-gray-500 text-sm">0</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center space-x-2">
                                <button onClick={() => setModal({ open: true, type: 'view-post', data: post })}>
                                  <Eye className="h-4 w-4 text-blue-600" />
                                </button>
                                <button onClick={() => {
                                  setNewPost(post);
                                  setModal({ open: true, type: 'edit-post', data: post });
                                }}>
                                  <Edit className="h-4 w-4 text-green-600" />
                                </button>
                                <button onClick={() => setModal({ open: true, type: 'delete', data: { id: post.id, type: 'post' } })}>
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
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

        {/* === MODALES === */}
        {modal.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">
                  {modal.type === 'add-user' && 'Ajouter un utilisateur'}
                  {modal.type === 'edit-user' && 'Modifier l’utilisateur'}
                  {modal.type === 'add-post' && 'Nouvel article'}
                  {modal.type === 'edit-post' && 'Modifier l’article'}
                  {modal.type === 'view-post' && 'Détail de l’article'}
                  {modal.type === 'delete' && 'Confirmer la suppression'}
                </h3>
                <button onClick={() => setModal({ open: false, type: modal.type })}>
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Formulaire utilisateur */}
              {(modal.type === 'add-user' || modal.type === 'edit-user') && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Rôle</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Client">Client</option>
                      <option value="Formateur">Formateur</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setModal({ open: false, type: modal.type })}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={modal.type === 'add-user' ? handleAddUser : handleEditUser}
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
                    >
                      {modal.type === 'add-user' ? 'Ajouter' : 'Enregistrer'}
                    </button>
                  </div>
                </div>
              )}

              {/* Éditeur WYSIWYG pour les articles */}
              {(modal.type === 'add-post' || modal.type === 'edit-post') && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Titre</label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Auteur</label>
                    <input
                      type="text"
                      value={newPost.author}
                      onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contenu</label>
                    <ReactQuill
                      value={newPost.content}
                      onChange={(content) => setNewPost({ ...newPost, content })}
                      className="h-40 mb-12"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPost.published}
                      onChange={(e) => setNewPost({ ...newPost, published: e.target.checked })}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Publier immédiatement</label>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setModal({ open: false, type: modal.type })}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={() => {
                        if (modal.type === 'add-post') {
                          setPosts([
                            ...posts,
                            {
                              ...newPost,
                              id: Date.now().toString(),
                              createdAt: new Date().toLocaleDateString('fr-FR'),
                              comments: []
                            }
                          ]);
                        } else {
                          setPosts(posts.map(p => p.id === modal.data.id ? { ...p, ...newPost } : p));
                        }
                        setModal({ open: false, type: modal.type });
                      }}
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              )}

              {/* Vue détaillée article */}
              {modal.type === 'view-post' && modal.data && (
                <div className="p-6 space-y-6">
                  <h4 className="font-bold text-xl">{modal.data.title}</h4>
                  <p className="text-sm text-gray-600">par {modal.data.author} — {modal.data.createdAt}</p>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: modal.data.content }}
                  />
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">Commentaires à valider</h5>
                    {modal.data.comments.filter((c: Comment) => !c.approved).length === 0 ? (
                      <p className="text-gray-500 text-sm">Aucun commentaire en attente.</p>
                    ) : (
                      modal.data.comments.filter((c: Comment) => !c.approved).map((c: Comment) => (
                        <div key={c.id} className="bg-yellow-50 p-3 rounded-lg mb-3 border-l-4 border-yellow-400">
                          <p className="text-sm text-gray-800">{c.content}</p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">Par {c.author}</span>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApproveComment(modal.data.id, c.id)}
                                className="text-green-600 text-xs flex items-center space-x-1"
                              >
                                <Check className="h-3 w-3" /> <span>Approuver</span>
                              </button>
                              <button
                                onClick={() => {
                                  setPosts(posts.map(post => ({
                                    ...post,
                                    comments: post.comments.filter(com => com.id !== c.id)
                                  })));
                                }}
                                className="text-red-600 text-xs flex items-center space-x-1"
                              >
                                <XCircle className="h-3 w-3" /> <span>Rejeter</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Suppression */}
              {modal.type === 'delete' && (
                <div className="p-6">
                  <p className="text-gray-700 mb-6">Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.</p>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setModal({ open: false, type: 'delete' })}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;