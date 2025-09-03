import React, { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { BlogPost } from '../types/Blog';
import { blogPosts } from '../data/blog';

interface BlogProps {
  onNavigate: (page: string) => void;
  onViewPost: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate, onViewPost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'tutorials', name: 'Tutoriels' },
    { id: 'news', name: 'Actualités' },
    { id: 'tips', name: 'Conseils' },
    { id: 'updates', name: 'Mises à jour' }
  ];

  const filteredArticles = blogPosts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tutorials': return 'bg-blue-100 text-blue-800';
      case 'news': return 'bg-green-100 text-green-800';
      case 'tips': return 'bg-orange-100 text-orange-800';
      case 'updates': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'tutorials': return 'Tutoriel';
      case 'news': return 'Actualité';
      case 'tips': return 'Conseil';
      case 'updates': return 'Mise à jour';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog & Actualités</h1>
            <p className="text-xl text-blue-100 mb-8">
              Restez informé des dernières tendances et bonnes pratiques PrestaShop
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <img
                  src={filteredArticles[0].image}
                  alt={filteredArticles[0].title}
                  className="w-full h-64 lg:h-full object-cover"
                />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredArticles[0].category)}`}>
                      {getCategoryLabel(filteredArticles[0].category)}
                    </span>
                    <span className="ml-3 text-sm text-gray-500">Article à la une</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{filteredArticles[0].title}</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{filteredArticles[0].excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{filteredArticles[0].author.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{filteredArticles[0].publishedAt.toLocaleDateString('fr-FR')}</span>
                      </div>
                      <span>{filteredArticles[0].readTime} de lecture</span>
                    </div>
                    <button 
                      onClick={() => onViewPost(filteredArticles[0])}
                      className="text-blue-900 hover:text-blue-700 font-medium flex items-center"
                    >
                      Lire l'article
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article) => (
            <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {getCategoryLabel(article.category)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{article.author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{article.publishedAt.toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.readTime} de lecture</span>
                  <button 
                    onClick={() => onViewPost(article)}
                    className="text-blue-900 hover:text-blue-700 font-medium flex items-center group"
                  >
                    Lire plus
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aucun article trouvé</h3>
              <p className="text-gray-600">Essayez de modifier votre recherche ou vos filtres</p>
            </div>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-blue-900 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Restez Informé</h3>
          <p className="text-blue-100 mb-6">
            Recevez nos derniers articles et conseils directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;