import { Product } from '../types/Product';

export const products: Product[] = [
  // Formations
  {
    id: 'formation-1',
    name: 'Formation PrestaShop Complète - De Débutant à Expert',
    description: 'Maîtrisez PrestaShop de A à Z avec cette formation complète. Apprenez à créer, configurer et optimiser votre boutique en ligne.',
    price: 199,
    originalPrice: 299,
    category: 'formation',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 247,
    features: [
      'Installation et configuration',
      'Gestion des produits et catalogues',
      'Personnalisation des thèmes',
      'Modules et extensions',
      'SEO et optimisation',
      'Support à vie'
    ],
    difficulty: 'Débutant',
    duration: '25 heures'
  },
  {
    id: 'formation-2',
    name: 'Développement de Modules PrestaShop Avancé',
    description: 'Apprenez à développer vos propres modules PrestaShop avec les meilleures pratiques et techniques avancées.',
    price: 149,
    category: 'formation',
    image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 128,
    features: [
      'Architecture des modules',
      'Hooks et overrides',
      'Base de données',
      'Interface admin',
      'API et services web',
      'Tests et débogage'
    ],
    difficulty: 'Avancé',
    duration: '18 heures'
  },
  {
    id: 'formation-3',
    name: 'Optimisation Performance PrestaShop',
    description: 'Optimisez les performances de votre boutique PrestaShop pour une meilleure expérience utilisateur et un meilleur référencement.',
    price: 99,
    category: 'formation',
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 89,
    features: [
      'Optimisation base de données',
      'Cache et CDN',
      'Optimisation images',
      'Code optimization',
      'Monitoring',
      'Outils de mesure'
    ],
    difficulty: 'Intermédiaire',
    duration: '12 heures'
  },
  
  // Modules
  {
    id: 'module-1',
    name: 'Module Livraison Express Premium',
    description: 'Module avancé de gestion des livraisons avec suivi en temps réel et notifications automatiques.',
    price: 79,
    category: 'module',
    image: 'https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 156,
    features: [
      'Suivi en temps réel',
      'Notifications SMS/Email',
      'Intégration transporteurs',
      'Interface admin complète',
      'Rapports détaillés',
      'Support technique'
    ],
    version: '2.1.0',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  },
  {
    id: 'module-2',
    name: 'Module SEO Pro - Optimisation Avancée',
    description: 'Optimisez votre référencement avec ce module SEO professionnel incluant toutes les fonctionnalités avancées.',
    price: 89,
    category: 'module',
    image: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    reviews: 203,
    features: [
      'Meta tags automatiques',
      'URLs optimisées',
      'Sitemap XML',
      'Rich snippets',
      'Analytics intégré',
      'Audit SEO'
    ],
    version: '3.2.1',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  },
  {
    id: 'module-3',
    name: 'Module Newsletter & Marketing Automation',
    description: 'Automatisez vos campagnes marketing avec ce module complet de newsletter et d\'automation.',
    price: 69,
    category: 'module',
    image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    reviews: 94,
    features: [
      'Campagnes automatisées',
      'Segmentation avancée',
      'Templates responsive',
      'A/B testing',
      'Statistiques détaillées',
      'Intégrations CRM'
    ],
    version: '1.8.3',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  },

  // Thèmes
  {
    id: 'theme-1',
    name: 'Thème E-commerce Moderne "Aurora"',
    description: 'Thème premium responsive avec design moderne et fonctionnalités avancées pour boutiques haut de gamme.',
    price: 129,
    originalPrice: 199,
    category: 'theme',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.9,
    reviews: 312,
    features: [
      'Design responsive premium',
      'Page builder intégré',
      'Mega menu avancé',
      'Optimisé SEO',
      '10+ layouts',
      'Support technique'
    ],
    version: '2.5.0',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  },
  {
    id: 'theme-2',
    name: 'Thème Minimaliste "Clean Pro"',
    description: 'Thème élégant et minimaliste parfait pour les boutiques de luxe et produits haut de gamme.',
    price: 99,
    category: 'theme',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    reviews: 189,
    features: [
      'Design minimaliste',
      'Performance optimisée',
      'Personnalisation facile',
      'Mobile first',
      'Animation subtiles',
      'Documentation complète'
    ],
    version: '1.3.2',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  },
  {
    id: 'theme-3',
    name: 'Thème Fashion "Stylish"',
    description: 'Thème spécialement conçu pour les boutiques de mode avec galeries photos avancées et filtres produits.',
    price: 119,
    category: 'theme',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    reviews: 167,
    features: [
      'Galerie photos avancée',
      'Filtres produits intelligents',
      'Lookbook intégré',
      'Quick view produits',
      'Wishlist avancée',
      'Zoom produit'
    ],
    version: '2.1.5',
    compatibility: ['PrestaShop 1.7', 'PrestaShop 8.0']
  }
];