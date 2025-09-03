import { BlogPost } from '../types/Blog';

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Comment optimiser les performances de votre boutique PrestaShop',
    excerpt: 'Découvrez les meilleures techniques pour améliorer la vitesse de chargement et l\'expérience utilisateur de votre boutique en ligne.',
    content: `
      <h2>Introduction</h2>
      <p>L'optimisation des performances de votre boutique PrestaShop est cruciale pour offrir une excellente expérience utilisateur et améliorer votre référencement naturel. Dans cet article, nous allons explorer les techniques les plus efficaces pour accélérer votre site.</p>
      
      <h2>1. Optimisation de la base de données</h2>
      <p>La base de données est le cœur de votre boutique PrestaShop. Une base de données mal optimisée peut considérablement ralentir votre site.</p>
      <ul>
        <li>Nettoyez régulièrement les logs et statistiques anciennes</li>
        <li>Optimisez les tables MySQL avec des requêtes OPTIMIZE TABLE</li>
        <li>Utilisez des index appropriés sur les colonnes fréquemment interrogées</li>
      </ul>
      
      <h2>2. Configuration du cache</h2>
      <p>Le cache est votre meilleur allié pour améliorer les performances :</p>
      <ul>
        <li>Activez le cache Smarty dans les paramètres avancés</li>
        <li>Configurez un cache Redis ou Memcached si possible</li>
        <li>Utilisez un CDN pour servir vos ressources statiques</li>
      </ul>
      
      <h2>3. Optimisation des images</h2>
      <p>Les images représentent souvent la majeure partie du poids d'une page :</p>
      <ul>
        <li>Compressez vos images avant de les télécharger</li>
        <li>Utilisez des formats modernes comme WebP</li>
        <li>Implémentez le lazy loading pour les images</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>En appliquant ces techniques, vous devriez voir une amélioration significative des performances de votre boutique. N'hésitez pas à mesurer l'impact de chaque optimisation avec des outils comme GTmetrix ou PageSpeed Insights.</p>
    `,
    image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'tips',
    author: {
      id: 'author-1',
      name: 'Alexandre Martin',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Expert PrestaShop'
    },
    publishedAt: new Date('2025-01-15'),
    readTime: '8 min',
    tags: ['Performance', 'Optimisation', 'Cache', 'SEO'],
    likes: 127,
    comments: [
      {
        id: 'comment-1',
        author: {
          id: 'user-1',
          name: 'Marie Rousseau',
          avatar: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        content: 'Excellent article ! J\'ai appliqué vos conseils et ma boutique est maintenant 3x plus rapide.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        likes: 12,
        isLiked: false
      },
      {
        id: 'comment-2',
        author: {
          id: 'user-2',
          name: 'Thomas Laurent',
          avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        content: 'Merci pour ces conseils pratiques. Avez-vous des recommandations spécifiques pour les CDN ?',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        likes: 5,
        isLiked: true
      }
    ],
    isLiked: false
  },
  {
    id: 'blog-2',
    title: 'PrestaShop 8.1 : Toutes les nouveautés à connaître',
    excerpt: 'Explorez les nouvelles fonctionnalités et améliorations apportées par la dernière version de PrestaShop.',
    content: `
      <h2>Les nouveautés de PrestaShop 8.1</h2>
      <p>PrestaShop 8.1 apporte de nombreuses améliorations et nouvelles fonctionnalités...</p>
    `,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'news',
    author: {
      id: 'author-2',
      name: 'Sophie Dubois',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      role: 'Responsable Formation'
    },
    publishedAt: new Date('2025-01-12'),
    readTime: '6 min',
    tags: ['PrestaShop', 'Nouveautés', 'Version 8.1'],
    likes: 89,
    comments: [],
    isLiked: false
  }
];