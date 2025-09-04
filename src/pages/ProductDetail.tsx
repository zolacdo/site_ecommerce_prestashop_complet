import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Download, Users, Clock } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../hooks/useCart';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find((p) => p.id === id);


  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        Produit introuvable
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'features', label: 'Fonctionnalités' },
    { id: 'reviews', label: 'Avis Clients' },
    { id: 'support', label: 'Support' }
  ];

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'formation': return 'Formation';
      case 'module': return 'Module';
      case 'theme': return 'Thème';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'formation': return 'bg-blue-100 text-blue-800';
      case 'module': return 'bg-green-100 text-green-800';
      case 'theme': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Bouton retour */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour aux produits</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image produit */}
          <div>
            <div className="sticky top-8">
              <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Infos produit */}
          <div>
            {/* Catégorie & actions */}
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(product.category)}`}>
                {getCategoryLabel(product.category)}
              </span>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className="h-5 w-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Note */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-lg font-medium">{product.rating}</span>
              <span className="ml-2 text-gray-600">({product.reviews} avis)</span>
            </div>

            {/* Prix */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">{product.price}€</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">{product.originalPrice}€</span>
              )}
            </div>

            {/* Détails supplémentaires */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {product.difficulty && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">Niveau: </span>
                    <span className="font-medium ml-1">{product.difficulty}</span>
                  </div>
                )}
                {product.duration && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">Durée: </span>
                    <span className="font-medium ml-1">{product.duration}</span>
                  </div>
                )}
                {product.version && (
                  <div className="flex items-center">
                    <Download className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-gray-600">Version: </span>
                    <span className="font-medium ml-1">{product.version}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Compatibilité */}
            {product.compatibility && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Compatibilité:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((version, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {version}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ajouter au panier */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Ajouter au Panier</span>
              </button>
              <button className="px-8 py-3 border-2 border-blue-900 text-blue-900 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors">
                Acheter Maintenant
              </button>
            </div>
          </div>
        </div>

        {/* Onglets */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Navigation des onglets */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-900 text-blue-900'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contenu de l'onglet */}
            <div className="p-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Description Complète</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Fonctionnalités Incluses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-bold mb-6">Avis Clients ({product.reviews})</h3>
                  {/* Exemple d’avis mockés */}
                  <div className="space-y-6">
                    {[{ name: 'Pierre D.', rating: 5, comment: 'Excellent produit !', date: '15 Jan 2025' }].map(
                      (review, index) => (
                        <div key={index} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{review.name}</span>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div>
                  <h3 className="text-xl font-bold mb-4">Support & Assistance</h3>
                  <p className="text-gray-700">Notre équipe est disponible pour vous accompagner.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
