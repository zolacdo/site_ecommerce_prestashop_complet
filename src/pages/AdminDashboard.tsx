import React, { useState, useMemo } from 'react';
import {
  BarChart3, Users, Package, ShoppingCart, DollarSign,
  TrendingUp, Settings, LogOut, Bell,
  Plus, Edit, Trash2, Eye, Search, Filter,
  Save, X, MessageSquare, Newspaper, CheckCircle, XCircle
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
  const [activeTab, setActiveTab] = useState('dashboard');
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


  const tabs = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: BarChart3, badge: 0 },
    { id: 'users', label: 'Utilisateurs', icon: Users, badge: 0 },
    { id: 'products', label: 'Produits', icon: Package, badge: 0 },
    { id: 'orders', label: 'Commandes', icon: ShoppingCart, badge: 0 },
    { id: 'instructors', label: 'Formateurs', icon: Users, badge: 0 },
    { id: 'posts', label: 'Articles', icon: Newspaper, badge: commentsPendingValidation },
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
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
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
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-900 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
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
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-4">
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   <div className="bg-white rounded-xl shadow-lg p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Utilisateurs Total</p><p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p><p className="text-sm text-green-600">+{stats.newUsersToday} aujourd'hui</p></div><Users className="h-12 w-12 text-blue-500" /></div></div>
                   <div className="bg-white rounded-xl shadow-lg p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Produits</p><p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p><p className="text-sm text-blue-600">Formations, Modules, Thèmes</p></div><Package className="h-12 w-12 text-green-500" /></div></div>
                   <div className="bg-white rounded-xl shadow-lg p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Commandes</p><p className="text-3xl font-bold text-gray-900">{stats.totalOrders.toLocaleString()}</p><p className="text-sm text-orange-600">+{stats.ordersToday} aujourd'hui</p></div><ShoppingCart className="h-12 w-12 text-orange-500" /></div></div>
                   <div className="bg-white rounded-xl shadow-lg p-6"><div className="flex items-center justify-between"><div><p className="text-sm text-gray-600">Chiffre d'Affaires</p><p className="text-3xl font-bold text-gray-900">{stats.totalRevenue.toLocaleString()}€</p><p className="text-sm text-green-600">+{stats.revenueToday}€ aujourd'hui</p></div><DollarSign className="h-12 w-12 text-purple-500" /></div></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="text-lg font-bold text-gray-900 mb-4">Ventes des 7 derniers jours</h3><div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center"><TrendingUp className="h-16 w-16 text-gray-400" /></div></div>
                  <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="text-lg font-bold text-gray-900 mb-4">Activité Récente</h3><div className="space-y-4">{[{ action: 'Nouvelle commande', user: 'Marie D.', time: 'Il y a 5 min' },{ action: 'Nouvel utilisateur', user: 'Jean M.', time: 'Il y a 12 min' },{ action: 'Commentaire blog', user: 'Sophie L.', time: 'Il y a 25 min' }].map((activity, index) => (<div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div><p className="font-medium text-gray-900">{activity.action}</p><p className="text-sm text-gray-600">{activity.user}</p></div><span className="text-xs text-gray-500">{activity.time}</span></div>))}</div></div>
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-xl shadow-lg"><div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2><button onClick={() => openModal('addUser')} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Nouvel Utilisateur</span></button></div><div className="mt-4 flex items-center space-x-4"><div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" /><input type="text" placeholder="Rechercher un utilisateur..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div><button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"><Filter className="h-4 w-4" /><span>Filtres</span></button></div></div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{users.map((user) => (<tr key={user.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div><div className="ml-4"><div className="text-sm font-medium text-gray-900">{user.name}</div><div className="text-sm text-gray-500">{user.email}</div></div></div></td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{user.role}</span></td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">{user.status}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joinDate}</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex items-center space-x-2"><button className="text-blue-600 hover:text-blue-900 transition-colors"><Eye className="h-4 w-4" /></button><button onClick={() => openModal('editUser', user)} className="text-green-600 hover:text-green-900 transition-colors"><Edit className="h-4 w-4" /></button><button onClick={() => openModal('deleteUser', user)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="h-4 w-4" /></button></div></td></tr>))}</tbody></table></div></div>
            )}

            {/* Products Management */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-lg"><div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2><button onClick={() => openModal('addProduct')} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Nouveau Produit</span></button></div></div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{products.map((product) => (<tr key={product.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{product.name}</div></td><td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{product.type}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}€</td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex items-center space-x-2"><button onClick={() => openModal('editProduct', product)} className="text-green-600 hover:text-green-900 transition-colors"><Edit className="h-4 w-4" /></button><button onClick={() => openModal('deleteProduct', product)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="h-4 w-4" /></button></div></td></tr>))}</tbody></table></div></div>
            )}

            {/* Instructors Management */}
            {activeTab === 'instructors' && (
              <div className="bg-white rounded-xl shadow-lg"><div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Gestion des Formateurs</h2><button onClick={() => openModal('addInstructor')} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Nouveau Formateur</span></button></div></div><div className="p-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6">{instructors.map((instructor) => (<div key={instructor.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"><div className="flex items-center space-x-4 mb-4"><div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">{instructor.name.charAt(0)}</div><div><h3 className="font-bold text-gray-900">{instructor.name}</h3><p className="text-gray-600">{instructor.speciality}</p><p className="text-sm text-gray-500">{instructor.email}</p></div></div><div className="grid grid-cols-3 gap-4 mb-4 text-center"><div className="text-center"><p className="text-2xl font-bold text-blue-900">{instructor.courses}</p><p className="text-xs text-gray-600">Formations</p></div><div><p className="text-2xl font-bold text-green-600">{instructor.students.toLocaleString()}</p><p className="text-xs text-gray-600">Étudiants</p></div><div><p className="text-2xl font-bold text-orange-500">{instructor.rating}</p><p className="text-xs text-gray-600">Note</p></div></div><div className="flex items-center justify-between"><span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">{instructor.status}</span><div className="flex items-center space-x-2"><button onClick={() => openModal('editInstructor', instructor)} className="text-blue-600 hover:text-blue-900 transition-colors"><Edit className="h-4 w-4" /></button><button onClick={() => openModal('deleteInstructor', instructor)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="h-4 w-4" /></button></div></div></div>))}</div></div></div>
            )}

            {/* Articles (Posts) Management */}
            {activeTab === 'posts' && (
              <div className="bg-white rounded-xl shadow-lg"><div className="p-6 border-b border-gray-200 flex items-center justify-between"><h2 className="text-2xl font-bold text-gray-900">Gestion des Articles</h2><button onClick={() => openModal('addPost')} className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors flex items-center space-x-2"><Plus className="h-4 w-4" /><span>Nouvel Article</span></button></div><div className="p-6 space-y-6">{posts.map(post => { const pendingCount = post.comments.filter(c => c.status === 'pending').length; return (<div key={post.id} className="border border-gray-200 rounded-lg p-4"><div className="flex justify-between items-start"><div><h3 className="font-bold text-lg text-gray-900">{post.title}</h3><p className="text-sm text-gray-500">Par {post.author} - {post.date}</p></div><div className="flex items-center space-x-2"><button onClick={() => openModal('viewPostComments', post)} className="relative text-gray-600 hover:text-blue-800 transition-colors"><MessageSquare className="h-5 w-5" />{pendingCount > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">{pendingCount}</span>}</button><button onClick={() => openModal('editPost', post)} className="text-green-600 hover:text-green-900 transition-colors"><Edit className="h-5 w-5" /></button><button onClick={() => openModal('deletePost', post)} className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="h-5 w-5" /></button></div></div></div>);})}</div></div>
            )}

            {/* Orders Management */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-lg"><div className="p-6 border-b border-gray-200"><h2 className="text-2xl font-bold text-gray-900">Gestion des Commandes</h2></div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th></tr></thead><tbody className="bg-white divide-y divide-gray-200">{[{ id: 'CMD-001', client: 'Marie Dubois', amount: 199, status: 'Payé', date: '15 Jan 2025' },{ id: 'CMD-002', client: 'Jean Martin', amount: 89, status: 'En cours', date: '14 Jan 2025' },{ id: 'CMD-003', client: 'Sophie Laurent', amount: 299, status: 'Livré', date: '13 Jan 2025' }].map((order) => (<tr key={order.id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order.id}</td><td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.client}</td><td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{order.amount}€</td><td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 py-1 text-xs font-medium rounded-full ${order.status === 'Payé' ? 'bg-green-100 text-green-800' : order.status === 'En cours' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}`}>{order.status}</span></td><td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td><td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center space-x-2"><button className="text-blue-600 hover:text-blue-900 transition-colors"><Eye className="h-4 w-4" /></button><button className="text-green-600 hover:text-green-900 transition-colors"><Edit className="h-4 w-4" /></button></div></td></tr>))}</tbody></table></div></div>
            )}

            {/* Settings */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-lg p-8"><h2 className="text-2xl font-bold text-gray-900 mb-6">Paramètres du Site</h2><div className="space-y-8"><div><h3 className="font-semibold text-gray-900 mb-4">Paramètres Généraux</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-2">Nom du Site</label><input type="text" defaultValue="PrestaShop Academy" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div><div><label className="block text-sm font-medium text-gray-700 mb-2">Email de Contact</label><input type="email" defaultValue="contact@prestashop-academy.fr" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" /></div></div></div><div><h3 className="font-semibold text-gray-900 mb-4">Paramètres E-commerce</h3><div className="space-y-4"><div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"><div><p className="font-medium text-gray-900">Mode Maintenance</p><p className="text-sm text-gray-600">Activer le mode maintenance du site</p></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div></label></div></div></div><div className="flex justify-end"><button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"><Save className="h-5 w-5" /><span>Sauvegarder</span></button></div></div></div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {modal.isOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
               <h3 className="text-xl font-bold text-gray-900">
                  { (modal.type === 'addUser' || modal.type === 'addInstructor' || modal.type === 'addProduct' || modal.type === 'addPost') && 'Ajouter' }
                  { (modal.type === 'editUser' || modal.type === 'editInstructor' || modal.type === 'editProduct' || modal.type === 'editPost') && 'Modifier' }
                  { modal.type.startsWith('delete') && 'Confirmation de suppression' }
                  { modal.type === 'viewPostComments' && `Commentaires pour : ${modal.data.title}` }
               </h3>
               <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 transition-colors"><X/></button>
            </div>
            <div className="p-6 max-h-[80vh] overflow-y-auto">
               {modal.type.startsWith('delete') && (
                  <div>
                     <p>Êtes-vous sûr de vouloir supprimer "{modal.data.name || modal.data.title}" ? Cette action est irréversible.</p>
                     <div className="flex justify-end gap-4 mt-6"><button onClick={closeModal} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Annuler</button><button onClick={handleDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">Supprimer</button></div>
                  </div>
               )}
               {(modal.type === 'addUser' || modal.type === 'editUser') && <UserForm initialData={modal.data} onSubmit={handleUserSubmit} onCancel={closeModal} />}
               {(modal.type === 'addInstructor' || modal.type === 'editInstructor') && <InstructorForm initialData={modal.data} onSubmit={handleInstructorSubmit} onCancel={closeModal} />}
               {(modal.type === 'addProduct' || modal.type === 'editProduct') && <ProductForm initialData={modal.data} onSubmit={handleProductSubmit} onCancel={closeModal} />}
               {(modal.type === 'addPost' || modal.type === 'editPost') && <PostForm initialData={modal.data} onSubmit={handlePostSubmit} onCancel={closeModal} />}
               {modal.type === 'viewPostComments' && (
                  <div className="space-y-4">{modal.data.comments.length === 0 ? <p className="text-gray-500">Aucun commentaire pour cet article.</p> : modal.data.comments.map((comment: any) => (<div key={comment.id} className={`p-3 rounded-lg ${comment.status === 'pending' ? 'bg-yellow-50' : 'bg-gray-50'}`}><p className="font-semibold">{comment.author}</p><p className="text-gray-700">{comment.content}</p>{comment.status === 'pending' && (<div className="flex items-center gap-2 mt-2"><button onClick={() => handleCommentValidation(modal.data.id, comment.id, 'approved')} className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"><CheckCircle size={16}/>Approuver</button><button onClick={() => handleCommentValidation(modal.data.id, comment.id, 'rejected')} className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"><XCircle size={16}/>Rejeter</button></div>)}</div>))}</div>
               )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Formulaires pour les modales ---

const UserForm = ({ initialData, onSubmit, onCancel }: { initialData?: any, onSubmit: (data: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({ id: initialData?.id || '', name: initialData?.name || '', email: initialData?.email || '', role: initialData?.role || 'Client', status: initialData?.status || 'Actif' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
            <div><label>Nom</label><input name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label>Rôle</label><select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>Client</option><option>Formateur</option><option>Admin</option></select></div>
            <div className="flex justify-end gap-4 mt-6"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Annuler</button><button type="submit" className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800">Sauvegarder</button></div>
        </form>
    );
};

const InstructorForm = ({ initialData, onSubmit, onCancel }: { initialData?: any, onSubmit: (data: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({ id: initialData?.id || '', name: initialData?.name || '', email: initialData?.email || '', speciality: initialData?.speciality || '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
            <div><label>Nom</label><input name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label>Spécialité</label><input name="speciality" value={formData.speciality} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div className="flex justify-end gap-4 mt-6"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Annuler</button><button type="submit" className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800">Sauvegarder</button></div>
        </form>
    );
};

const ProductForm = ({ initialData, onSubmit, onCancel }: { initialData?: any, onSubmit: (data: any) => void, onCancel: () => void }) => {
    const [formData, setFormData] = useState({ id: initialData?.id || '', name: initialData?.name || '', type: initialData?.type || 'Formation', price: initialData?.price || '' });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
            <div><label>Nom du produit</label><input name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label>Type</label><select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option>Formation</option><option>Module</option><option>Thème</option></select></div>
            <div><label>Prix (€)</label><input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div className="flex justify-end gap-4 mt-6"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Annuler</button><button type="submit" className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800">Sauvegarder</button></div>
        </form>
    );
};

const PostForm = ({ initialData, onSubmit, onCancel }: { initialData?: any, onSubmit: (data: any) => void, onCancel: () => void }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ id: initialData?.id, title, content });
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Titre</label><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg" required /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Contenu</label><ReactQuill theme="snow" value={content} onChange={setContent} style={{ height: '200px', marginBottom: '50px' }} /></div>
            <div className="flex justify-end gap-4 mt-12"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">Annuler</button><button type="submit" className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800">Sauvegarder</button></div>
        </form>
    );
};

export default AdminDashboard;