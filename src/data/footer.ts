export interface FooterLink {
  title: string;
  href: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const footerSections: FooterSection[] = [
  {
    title: "Formations",
    links: [
      { title: "PrestaShop Débutant", href: "/products" },
      { title: "PrestaShop Avancé", href: "/products" },
      { title: "Développement Modules", href: "/products" },
      { title: "Thèmes & Design", href: "/products" },
      { title: "SEO & Marketing", href: "/products" },
      { title: "Toutes les formations", href: "/products" }
    ]
  },
  {
    title: "Ressources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Documentation", href: "/support" },
      { title: "Tutoriels vidéo", href: "/blog" },
      { title: "FAQ", href: "/support" },
      { title: "Forum communauté", href: "/support" },
      { title: "Téléchargements", href: "/products" }
    ]
  },
  {
    title: "Support",
    links: [
      { title: "Centre d'aide", href: "/support" },
      { title: "Contact", href: "/support" },
      { title: "Chat en direct", href: "/support" },
      { title: "Signaler un bug", href: "/support" },
      { title: "Demande de fonctionnalité", href: "/support" },
      { title: "Status des services", href: "/support" }
    ]
  },
  {
    title: "Entreprise",
    links: [
      { title: "À propos", href: "/about" },
      { title: "Notre équipe", href: "/about" },
      { title: "Carrières", href: "/about" },
      { title: "Partenaires", href: "/about" },
      { title: "Presse", href: "/about" },
      { title: "Investisseurs", href: "/about" }
    ]
  }
];

export const legalLinks: FooterLink[] = [
  { title: "Conditions d'utilisation", href: "/legal/terms" },
  { title: "Politique de confidentialité", href: "/legal/privacy" },
  { title: "Politique de cookies", href: "/legal/cookies" },
  { title: "Mentions légales", href: "/legal/mentions" },
  { title: "RGPD", href: "/legal/gdpr" }
];

export const socialLinks = [
  { 
    name: "Facebook", 
    href: "https://facebook.com/prestashop", 
    icon: "Facebook",
    color: "hover:text-blue-600"
  },
  { 
    name: "Twitter", 
    href: "https://twitter.com/prestashop", 
    icon: "Twitter",
    color: "hover:text-blue-400"
  },
  { 
    name: "LinkedIn", 
    href: "https://linkedin.com/company/prestashop", 
    icon: "Linkedin",
    color: "hover:text-blue-700"
  },
  { 
    name: "YouTube", 
    href: "https://youtube.com/prestashop", 
    icon: "Youtube",
    color: "hover:text-red-600"
  },
  { 
    name: "GitHub", 
    href: "https://github.com/prestashop", 
    icon: "Github",
    color: "hover:text-gray-900"
  },
  { 
    name: "Discord", 
    href: "https://discord.gg/prestashop", 
    icon: "MessageCircle",
    color: "hover:text-indigo-600"
  }
];

export const companyInfo = {
  name: "PrestaShop Academy",
  description: "La plateforme de formation e-commerce de référence pour maîtriser PrestaShop et développer votre business en ligne.",
  address: "123 Rue du Commerce, 75001 Paris, France",
  phone: "+33 1 23 45 67 89",
  email: "contact@prestashop-academy.fr",
  copyright: "© 2025 PrestaShop Academy. Tous droits réservés."
};