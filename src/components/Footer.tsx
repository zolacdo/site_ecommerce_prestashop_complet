import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { footerSections, socialLinks, legalLinks } from '../data/footer';
import { Link } from 'react-router-dom';
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

  const getSocialIcon = (iconName: string) => {
    const icons = {
      facebook: Facebook,
      twitter: Twitter,
      instagram: Instagram,
      linkedin: Linkedin,
      youtube: Youtube,
      discord: MessageCircle
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-orange-400">PrestaShop Academy</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Maîtrisez PrestaShop et développez votre e-commerce avec nos formations expertes.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  title={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
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

          {/* Dynamic Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Restez informé</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos dernières formations et actualités e-commerce
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors font-medium">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 PrestaShop Academy. Tous droits réservés.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-6 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Shield className="w-4 h-4" />
              <span>Paiements sécurisés</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>Certifié Qualiopi</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Calendar className="w-4 h-4" />
              <span>Support 24/7</span>
              <button onClick={() => onNavigate('cgv')} className="text-gray-400 hover:text-orange-400 transition-colors">CGV</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;