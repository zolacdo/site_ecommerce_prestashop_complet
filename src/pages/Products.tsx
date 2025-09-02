import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types/Product';
import { Filter, Grid, List } from 'lucide-react';

interface ProductsProps {
  category?: 'formation' | 'module' | 'theme';
  onViewProduct: (product: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ category, onViewProduct }) => {
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('rating');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let filtered = category 
      ? products.filter(product => product.category === category)
      : products;

    // Apply additional filters
    if (filterBy !== 'all') {
      filtered = filtered.filter(product => {
        switch (filterBy) {
          case 'promotion':
            return product.originalPrice && product.originalPrice > product.price;
          case 'beginner':
            return product.difficulty === 'Débutant';
          case 'advanced':
            return product.difficulty === 'Avancé';
          default:
            return true;
        }
      });
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [category, sortBy, filterBy]);

  const getCategoryTitle = () => {
    switch (category) {
      case 'formation': return 'Formations PrestaShop';
      case 'module': return 'Modules PrestaShop';
      case 'theme': return 'Thèmes PrestaShop';
      default: return 'Tous les Produits';
    }
  };

  const getCategoryDescription = () => {
    switch (category) {
      case 'formation': return 'Formations complètes pour maîtriser PrestaShop de A à Z';
      case 'module': return 'Modules professionnels pour étendre les fonctionnalités de votre boutique';
      case 'theme': return 'Thèmes premium responsive pour sublimer votre boutique en ligne';
      default: return 'Découvrez notre catalogue complet de produits PrestaShop';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{getCategoryDescription()}</p>
          </div>
        </div>
      </div>

      {/* Filters and sorting */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les produits</option>
              <option value="promotion">En promotion</option>
              <option value="beginner">Niveau débutant</option>
              <option value="advanced">Niveau avancé</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{filteredProducts.length} produit(s)</span>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="rating">Mieux notés</option>
              <option value="name">Nom A-Z</option>
              <option value="price">Prix croissant</option>
            </select>

            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:text-blue-900'} transition-colors`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-900 text-white' : 'text-gray-600 hover:text-blue-900'} transition-colors`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600">Essayez de modifier vos filtres pour voir plus de résultats</p>
            </div>
          </div>
        ) : (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;