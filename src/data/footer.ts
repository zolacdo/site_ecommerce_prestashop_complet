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
      { title: "PrestaShop Débutant", href: "/formations/prestashop-debutant" },
      { title: "E-commerce Avancé", href: "/formations/ecommerce-avance" },
      { title: "Marketing Digital", href: "/formations/marketing-digital" },
      { title: "SEO & Référencement", href: "/formations/seo-referencement" },
      { title: "Toutes les formations", href: "/formations" }
    ]
  },
  {
    title: "Ressources",
    links: [
      { title: "Documentation", href: "/documentation" },
      { title: "Tutoriels Vidéo", href: "/tutoriels" },
      { title: "Templates Gratuits", href: "/templates" },
      { title: "Modules Premium", href: "/modules" },
      { title: "Centre d'aide", href: "/aide" }
    ]
  },
  {
    title: "Communauté",
    links: [
      { title: "Forum", href: "/forum" },
      { title: "Blog", href: "/blog" },
      { title: "Événements", href: "/evenements" },
      { title: "Partenaires", href: "/partenaires" },
      { title: "Témoignages", href: "/testimonials" }
    ]
  },
  {
    title: "Support",
    links: [
      { title: "Contactez-nous", href: "/contact" },
      { title: "Support Technique", href: "/support" },
      { title: "FAQ", href: "/faq" },
      { title: "Status Système", href: "https://status.prestashop-academy.fr", external: true },
      { title: "Signaler un Bug", href: "/bug-report" }
    ]
  },
  {
    title: "Entreprise",
    links: [
      { title: "À propos", href: "/about" },
      { title: "Carrières", href: "/careers" },
      { title: "Presse", href: "/presse" },
      { title: "Investisseurs", href: "/investors" },
      { title: "Mentions légales", href: "/legal" }
    ]
  }
];

export const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/prestashopacademy", icon: "facebook" },
  { name: "Twitter", href: "https://twitter.com/prestashopacad", icon: "twitter" },
  { name: "LinkedIn", href: "https://linkedin.com/company/prestashop-academy", icon: "linkedin" },
  { name: "YouTube", href: "https://youtube.com/prestashopacademy", icon: "youtube" },
  { name: "Instagram", href: "https://instagram.com/prestashopacademy", icon: "instagram" },
  { name: "Discord", href: "https://discord.gg/prestashopacademy", icon: "discord" }
];

export const legalLinks = [
  { title: "Politique de confidentialité", href: "/privacy" },
  { title: "Conditions d'utilisation", href: "/terms" },
  { title: "Politique de cookies", href: "/cookies" },
  { title: "RGPD", href: "/gdpr" }
];