import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  Calendar,
} from "lucide-react";
import { footerSections, socialLinks, legalLinks } from "../data/footer";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
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
      discord: MessageCircle,
    };
    const IconComponent = icons[iconName as keyof typeof icons];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : null;
  };

  const handleFooterLinkClick = (href: string, external?: boolean) => {
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      const pageMap: Record<string, string> = {
        "/formations": "formations",
        "/formations/prestashop-debutant": "formations",
        "/formations/ecommerce-avance": "formations",
        "/formations/marketing-digital": "formations",
        "/formations/seo-referencement": "formations",
        "/modules": "modules",
        "/themes": "themes",
        "/documentation": "support",
        "/tutoriels": "support",
        "/templates": "formations",
        "/aide": "support",
        "/forum": "support",
        "/blog": "blog",
        "/evenements": "about",
        "/partenaires": "about",
        "/testimonials": "about",
        "/contact": "support",
        "/support": "support",
        "/faq": "support",
        "/bug-report": "support",
        "/about": "about",
        "/careers": "about",
        "/presse": "about",
        "/investors": "about",
        "/legal": "about",
        "/privacy": "about",
        "/terms": "about",
        "/cookies": "about",
        "/gdpr": "about",
        "/cgv": "about",
      };
      const page = pageMap[href] || "home";
      navigate(`/${page}`);
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez Connecté avec Nous</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Recevez nos dernières formations, actualités e-commerce et conseils
            d'experts directement dans votre boîte mail
          </p>

          {isSubscribed ? (
            <div className="bg-green-500/20 border border-green-400 rounded-lg p-4 max-w-md mx-auto">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <p className="text-green-100">
                Merci ! Vous êtes maintenant abonné à notre newsletter.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-lg font-semibold transition-colors"
                >
                  S'abonner
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-orange-400">
              PrestaShop Academy
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              La référence française pour maîtriser PrestaShop et développer
              votre e-commerce. Plus de 15 000 entrepreneurs nous font
              confiance.
            </p>
            <div className="flex space-x-3 mb-6">
              {socialLinks.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleFooterLinkClick(social.href, true)}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
                  title={social.name}
                >
                  {getSocialIcon(social.icon)}
                </button>
              ))}
            </div>

            {/* Contact Info */}
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
                <span className="text-gray-300">
                  contact@prestashop-academy.fr
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <button
                      onClick={() =>
                        handleFooterLinkClick(link.href, link.external)
                      }
                      className="text-gray-400 hover:text-orange-400 transition-colors text-left"
                    >
                      {link.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 PrestaShop Academy. Tous droits réservés.
            </div>
            <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm">
              {legalLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleFooterLinkClick(link.href)}
                  className="text-gray-400 hover:text-orange-400 transition-colors"
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-center items-center space-x-6 mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Shield className="w-4 h-4" />
              <span>Paiements sécurisés SSL</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <CheckCircle className="w-4 h-4" />
              <span>Certifié Qualiopi</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-xs">
              <Calendar className="w-4 h-4" />
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
