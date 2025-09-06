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
  },
{
  id: 'blog-3',
  title: 'PrestaShop 8.x — Documentation, Installation & Prérequis (Windows pas à pas)',
  excerpt: "Un guide détaillé et stylé pour installer PrestaShop sur Windows avec XAMPP/WAMP, comprendre les prérequis et retrouver la documentation utile.",
  content: `
    <div style="font-family: ui-sans-serif, system-ui; line-height: 1.7; max-width:900px; margin:auto;">
      <p><span style="display:inline-block;padding:.25rem .5rem;border-radius:.5rem;background:#eef6ff;color:#1e40af;font-weight:600">🖥️ Guide Windows pas à pas</span> 
      <span style="margin-left:.5rem;color:#64748b">Mis à jour : 06/09/2025</span></p>

      <h2 id="intro">💡 Introduction — Qu'est-ce que PrestaShop ?</h2>
      <p>PrestaShop est une solution open-source pour créer et gérer une boutique en ligne. Créée en 2007, elle permet de gérer vos produits, clients, commandes, paiements et livraisons facilement.</p>
      <p><strong>Histoire et importance :</strong> PrestaShop est conçu spécifiquement pour l’e-commerce, contrairement à WordPress qui nécessite un plugin comme WooCommerce pour ajouter une boutique. PrestaShop offre nativement des fonctionnalités comme la gestion multi-boutiques, les promotions, la gestion avancée des stocks et la compatibilité avec de nombreux moyens de paiement.</p>
      <p>Pour les débutants, PrestaShop est plus structuré et dédié à l’e-commerce, tandis que WordPress reste généraliste. D’autres solutions comme Shopify ou Magento existent, mais PrestaShop est open-source, gratuit et personnalisable.</p>

      <h2 id="sommaire">📑 Sommaire</h2>
      <ol>
        <li><a href="#docs">📚 Documentation officielle</a></li>
        <li><a href="#prerequis">⚙️ Prérequis techniques</a></li>
        <li><a href="#prep">🧰 Préparation & vérifications</a></li>
        <li><a href="#install-xampp">🖥️ Installation locale avec XAMPP/WAMP</a></li>
        <li><a href="#post-install">🔒 Après l'installation (sécurité & optimisation)</a></li>
        <li><a href="#depannage">🛠️ Dépannage rapide</a></li>
        <li><a href="#ressources">🔗 Ressources utiles</a></li>
      </ol>

      <h2 id="docs">📚 Documentation officielle</h2>
      <ul>
        <li><a href="https://devdocs.prestashop-project.org/" target="_blank">Docs développeurs</a></li>
        <li><a href="https://docs.prestashop-project.org/" target="_blank">Guide utilisateur</a></li>
        <li><a href="https://www.prestashop.com/forums/" target="_blank">Forum de la communauté</a></li>
      </ul>

      <h2 id="prerequis">⚙️ Prérequis techniques (Windows)</h2>
      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:1rem;margin-bottom:1rem;">
        <ul>
          <li><strong>Windows 10/11</strong> (64 bits recommandé).</li>
          <li><strong>XAMPP ou WAMP</strong> installé avec PHP 8.1 ou 8.2.</li>
          <li><strong>Extensions PHP activées</strong> : intl, mbstring, zip, gd, curl, json, pdo_mysql.</li>
          <li><strong>Base de données</strong> : MySQL ou MariaDB inclus avec XAMPP/WAMP.</li>
          <li><strong>Mémoire recommandée</strong> : 4 Go RAM minimum pour un confort en développement.</li>
        </ul>
      </div>

      <h2 id="prep">🧰 Préparation & vérifications</h2>
      <h3>1) Installer XAMPP/WAMP</h3>
      <ul>
        <li>Téléchargez XAMPP depuis <a href="https://www.apachefriends.org/fr/index.html" target="_blank">le site officiel</a> ou WampServer.</li>
        <li>Lancez l’installateur et acceptez les options par défaut.</li>
        <li>Choisissez le dossier d’installation (ex : <code>C:\\xampp</code> ou <code>C:\\wamp</code>).</li>
      </ul>

      <h3>2) Démarrer Apache & MySQL</h3>
      <ul>
        <li>Ouvrez le panneau de contrôle XAMPP/WAMP.</li>
        <li>Démarrez Apache et MySQL (ou MariaDB).</li>
        <li>Vérifiez que les services sont actifs (vert).</li>
      </ul>
      <div style="border-left:4px solid #3b82f6;background:#eef6ff;padding:1rem;margin:1rem 0;">
        Test : Ouvrez <code>http://localhost</code> pour la page d’accueil et <code>http://localhost/phpmyadmin</code> pour phpMyAdmin.
      </div>

      <h3>3) Créer la base de données</h3>
      <ul>
        <li>Dans phpMyAdmin, créez une base appelée <code>prestashop</code>.</li>
        <li>Utilisateur par défaut : <code>root</code>, mot de passe vide (en local uniquement).</li>
      </ul>

      <h3>4) Vérifier les extensions PHP</h3>
      <p>Assurez-vous que toutes les extensions nécessaires sont activées. Sinon, éditez <code>php.ini</code> et retirez le point-virgule devant les extensions manquantes puis redémarrez Apache.</p>

      <h2 id="install-xampp">🖥️ Installation pas à pas avec XAMPP/WAMP</h2>
      <ol>
        <li>Téléchargez PrestaShop depuis <a href="https://www.prestashop.com" target="_blank">le site officiel</a> et décompressez l’archive.</li>
        <li>Copiez les fichiers dans :
          <ul>
            <li>XAMPP → <code>C:/xampp/htdocs/prestashop</code></li>
            <li>WAMP → <code>C:/wamp/www/prestashop</code></li>
          </ul>
        </li>
        <li>Ouvrez <code>http://localhost/prestashop</code> dans le navigateur.</li>
        <li>Suivez l’assistant d’installation :
          <ul>
            <li>Choix de la langue</li>
            <li>Vérification système (PHP, extensions, permissions)</li>
            <li>Connexion à la base : <code>localhost</code>, base <code>prestashop</code>, utilisateur <code>root</code>, mot de passe vide</li>
            <li>Création du compte administrateur</li>
          </ul>
        </li>
        <li>Supprimez le dossier <code>/install</code> après l’installation.</li>
        <li>Accédez au back-office via <code>http://localhost/prestashop/adminXYZ</code>.</li>
      </ol>

      <h2 id="post-install">🔒 Après l’installation</h2>
      <ul>
        <li>Vérifier toutes les extensions PHP activées.</li>
        <li>Activer le mode debug si nécessaire : <code>config/defines.inc.php</code>.</li>
        <li>Planifier des sauvegardes régulières (base + fichiers).</li>
        <li>Optimiser la boutique : activer Smarty cache et OPcache.</li>
      </ul>

      <h2 id="depannage">🛠️ Dépannage rapide</h2>
      <details>
        <summary>Erreur 500 au lancement</summary>
        <p>Activer <code>display_errors</code> dans <code>php.ini</code> ou vérifier les logs Apache dans <code>xampp/apache/logs/error.log</code>.</p>
      </details>
      <details>
        <summary>Base de données inaccessible</summary>
        <p>Vérifier que MySQL est démarré et que l’utilisateur et mot de passe sont corrects.</p>
      </details>
      <details>
        <summary>Problème d’extensions PHP</summary>
        <p>Éditer <code>php.ini</code> et décommenter les lignes manquantes, puis redémarrer Apache.</p>
      </details>

      <h2 id="ressources">🔗 Ressources utiles</h2>
      <ul>
        <li><a href="https://devdocs.prestashop-project.org/" target="_blank">Documentation développeurs</a></li>
        <li><a href="https://docs.prestashop-project.org/" target="_blank">Guide utilisateur</a></li>
        <li><a href="https://www.apachefriends.org/fr/index.html" target="_blank">Télécharger XAMPP</a></li>
        <li><a href="https://github.com/PrestaShop/PrestaShop" target="_blank">GitHub PrestaShop</a></li>
      </ul>

      <hr style="margin:2rem 0;border:none;border-top:1px solid #e5e7eb"/>
      <p style="color:#475569">👉 Ce guide est pour Windows. Besoin de la même chose pour Linux ou Docker ? Un article dédié peut être préparé.</p>
    </div>
  `,
  image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1200',
  category: 'guide',
  author: {
    id: 'author-2',
    name: 'Sophie Dubois',
    avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
    role: 'Responsable Formation'
  },
  publishedAt: new Date('2025-09-06'),
  readTime: '10 min',
  tags: ['PrestaShop', 'Installation', 'Prérequis', 'Windows', 'XAMPP', 'WAMP'],
  likes: 0,
  comments: [],
  isLiked: false
}


];