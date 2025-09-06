import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { Product } from '../types/Product';
import { Star, Shield, Headphones, Award, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 6);

  const handleViewProduct = (product: Product) => {
    navigate(`/products/${product.id}`);
  };
    const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };
  return (
    <div>
      {/* Hero Section */}
      <Hero onNavigate={handleNavigate} />

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Produits Populaires</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez nos formations, modules et thèmes les plus demandés par la communauté PrestaShop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={() => handleViewProduct(product)}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/products')}
              className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors inline-flex items-center space-x-2"
            >
              <span>Voir Tous les Produits</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi Nous Choisir ?</h2>
            <p className="text-lg text-gray-600">Les raisons qui font de nous le leader de la formation PrestaShop</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <Award className="h-8 w-8 text-blue-900" />
              </div>
              <h3 className="font-bold text-lg mb-2">Expertise Reconnue</h3>
              <p className="text-gray-600">Plus de 10 ans d'expérience dans l'écosystème PrestaShop</p>
            </div>

            <div className="text-center group">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Star className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="font-bold text-lg mb-2">Qualité Premium</h3>
              <p className="text-gray-600">Tous nos produits sont testés et validés par des experts</p>
            </div>

            <div className="text-center group">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                <Headphones className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Support 24/7</h3>
              <p className="text-gray-600">Une équipe dédiée pour vous accompagner à tout moment</p>
            </div>

            <div className="text-center group">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <Shield className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="font-bold text-lg mb-2">Garantie Satisfait</h3>
              <p className="text-gray-600">30 jours de garantie satisfait ou remboursé</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ils Nous Font Confiance</h2>
            <p className="text-lg text-blue-200">Découvrez les témoignages de nos clients satisfaits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 mb-4 leading-relaxed">
                "Les formations sont exceptionnelles ! J'ai pu créer ma boutique en ligne en quelques semaines seulement."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  M
                </div>
                <div className="ml-3">
                  <p className="font-medium">Marie Dubois</p>
                  <p className="text-sm text-blue-200">E-commerçante</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 mb-4 leading-relaxed">
                "Les modules sont de qualité professionnelle. Mon chiffre d'affaires a augmenté de 40% !"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-medium">Jean Martin</p>
                  <p className="text-sm text-blue-200">Directeur E-commerce</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 mb-4 leading-relaxed">
                "Support exceptionnel et produits de qualité. Je recommande vivement cette plateforme."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="ml-3">
                  <p className="font-medium">Sophie Laurent</p>
                  <p className="text-sm text-blue-200">Développeuse Web</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Prêt à Booster Votre E-commerce ?</h2>
          <p className="text-xl mb-8 text-orange-100">
            Rejoignez plus de 15 000 entrepreneurs qui ont transformé leur business avec nos solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/products?category=formations')}
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Commencer une Formation
            </button>
            <button
              onClick={() => navigate('/products?category=modules')}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explorer les Modules
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
