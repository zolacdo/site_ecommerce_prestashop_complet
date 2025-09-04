import React, { useState } from 'react';
import { Calendar, User, Search } from 'lucide-react';
import { BlogPost } from '../types/Blog';
import { blogPosts } from '../data/blog';
import { useNavigate } from 'react-router-dom';

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'tutorials', name: 'Tutoriels' },
    { id: 'news', name: 'Actualités' },
    { id: 'tips', name: 'Conseils' },
    { id: 'updates', name: 'Mises à jour' },
  ];

  const filteredArticles = blogPosts.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
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

  const handleViewPost = (post: BlogPost) => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog & Actualités</h1>
          <p className="text-xl text-blue-100 mb-8">
            Restez informé des dernières tendances et bonnes pratiques PrestaShop
          </p>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
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

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
                onClick={() => handleViewPost(article)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}
                    >
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-900 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.publishedAt).toLocaleDateString('fr-FR')}</span>

                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">Aucun article trouvé</h3>
              <p className="text-gray-600">Essayez de modifier votre recherche ou vos filtres</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
