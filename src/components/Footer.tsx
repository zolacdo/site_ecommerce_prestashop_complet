import React from 'react';
interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">PrestaShop Academy</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Votre partenaire de confiance pour maîtriser PrestaShop. Formations, modules et thèmes professionnels pour faire évoluer votre e-commerce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('formations')} className="text-gray-300 hover:text-orange-400 transition-colors">Toutes les Formations</button></li>
              <li><button onClick={() => onNavigate('modules')} className="text-gray-300 hover:text-orange-400 transition-colors">Modules Premium</button></li>
              <li><button onClick={() => onNavigate('themes')} className="text-gray-300 hover:text-orange-400 transition-colors">Thèmes Responsive</button></li>
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-orange-400 transition-colors">Documentation</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-gray-300 hover:text-orange-400 transition-colors">Blog & Actualités</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support & Aide</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-orange-400 transition-colors">Centre d'Aide</button></li>
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-orange-400 transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-orange-400 transition-colors">Tutoriels Vidéo</button></li>
              <li><button onClick={() => onNavigate('support')} className="text-gray-300 hover:text-orange-400 transition-colors">Contact Support</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-gray-300 hover:text-orange-400 transition-colors">Communauté</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">75001 Paris, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <span className="text-gray-300">contact@prestashop-academy.fr</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">Newsletter</h5>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-400 text-white placeholder-gray-400"
                />
                <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg transition-colors">
                  <Mail className="h-4 w-4" />
                </button>
              </form>
              {isSubscribed && (
                <p className="text-green-400 text-sm mt-2">✓ Inscription réussie !</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 PrestaShop Academy. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <button onClick={() => onNavigate('legal')} className="text-gray-400 hover:text-orange-400 transition-colors">Mentions Légales</button>
              <button onClick={() => onNavigate('terms')} className="text-gray-400 hover:text-orange-400 transition-colors">Conditions d'Utilisation</button>
              <button onClick={() => onNavigate('privacy')} className="text-gray-400 hover:text-orange-400 transition-colors">Politique de Confidentialité</button>
              <button onClick={() => onNavigate('cgv')} className="text-gray-400 hover:text-orange-400 transition-colors">CGV</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;