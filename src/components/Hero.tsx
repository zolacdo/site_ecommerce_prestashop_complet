import React from 'react';
import { ArrowRight, Star, Users, Award } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-orange-400 mr-2" />
              <span className="text-orange-300 text-sm font-medium">
                Formation #1 en France
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Maîtrisez <span className="text-orange-400">PrestaShop</span> comme un Pro
            </h1>

            <p className="text-lg lg:text-xl text-blue-100 mb-8 leading-relaxed max-w-xl">
              Formations expertes, modules premium et thèmes professionnels pour
              propulser votre boutique e-commerce vers le succès.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => onNavigate('formations')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center group transition-all transform hover:scale-105"
              >
                Découvrir les Formations
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('modules')}
                className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transition-all"
              >
                Voir les Modules
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-orange-400 mr-2" />
                  <span className="text-2xl font-bold">15k+</span>
                </div>
                <p className="text-blue-200 text-sm">Étudiants Formés</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-6 w-6 text-orange-400 mr-2" />
                  <span className="text-2xl font-bold">4.9/5</span>
                </div>
                <p className="text-blue-200 text-sm">Note Moyenne</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-orange-400 mr-2" />
                  <span className="text-2xl font-bold">100+</span>
                </div>
                <p className="text-blue-200 text-sm">Produits Premium</p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="relative">
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Cours en ligne sur PrestaShop avec formateur"
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-300 font-medium">
                    Formation du moment
                  </span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-orange-400 fill-current" />
                    <span className="ml-1 text-sm">4.9 (247 avis)</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">
                  Formation PrestaShop Complète
                </h3>
                <p className="text-blue-100 text-sm">
                  De débutant à expert en 25 heures
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-orange-400">
                      199€
                    </span>
                    <span className="text-gray-400 line-through">299€</span>
                  </div>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    -33%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
