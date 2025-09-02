import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Clock, Search, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqCategories = [
    { id: 'all', name: 'Toutes les questions' },
    { id: 'formations', name: 'Formations' },
    { id: 'modules', name: 'Modules' },
    { id: 'themes', name: 'Thèmes' },
    { id: 'payment', name: 'Paiement' },
    { id: 'technical', name: 'Technique' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'formations',
      question: 'Comment accéder à mes formations après achat ?',
      answer: 'Après votre achat, vous recevrez un email avec vos identifiants de connexion. Connectez-vous à votre espace personnel pour accéder à toutes vos formations.'
    },
    {
      id: 2,
      category: 'formations',
      question: 'Les formations sont-elles à vie ?',
      answer: 'Oui, toutes nos formations sont accessibles à vie. Vous pouvez les consulter autant de fois que vous le souhaitez, même après les mises à jour.'
    },
    {
      id: 3,
      category: 'modules',
      question: 'Comment installer un module PrestaShop ?',
      answer: 'Téléchargez le fichier ZIP du module, connectez-vous à votre back-office PrestaShop, allez dans Modules > Gestionnaire de modules, puis cliquez sur "Téléverser un module".'
    },
    {
      id: 4,
      category: 'themes',
      question: 'Les thèmes sont-ils compatibles avec toutes les versions ?',
      answer: 'Chaque thème indique ses versions compatibles. La plupart de nos thèmes supportent PrestaShop 1.7 et 8.0. Vérifiez la compatibilité avant achat.'
    },
    {
      id: 5,
      category: 'payment',
      question: 'Quels moyens de paiement acceptez-vous ?',
      answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard), PayPal, et les virements bancaires pour les commandes importantes.'
    },
    {
      id: 6,
      category: 'technical',
      question: 'Que faire si j\'ai un problème technique ?',
      answer: 'Contactez notre support technique via le chat en direct, email ou téléphone. Notre équipe répond sous 24h maximum.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Centre d'Aide & Support</h1>
            <p className="text-xl text-blue-100 mb-8">
              Notre équipe est là pour vous accompagner dans votre réussite
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nous Contacter</h2>
            
            <div className="space-y-4">
              {/* Live Chat */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Chat en Direct</h3>
                    <p className="text-sm text-green-600">En ligne maintenant</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Réponse immédiate de notre équipe</p>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                  Démarrer le Chat
                </button>
              </div>

              {/* Phone */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-sm text-gray-600">Lun-Ven 9h-18h</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">+33 1 23 45 67 89</p>
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
                  Appeler Maintenant
                </button>
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-sm text-gray-600">Réponse sous 24h</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">support@prestashop-academy.fr</p>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition-colors">
                  Envoyer un Email
                </button>
              </div>

              {/* Hours */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <Clock className="h-6 w-6 text-gray-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Horaires d'Ouverture</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span className="font-medium">9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span className="font-medium">10h00 - 16h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span className="text-red-500">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Questions Fréquentes</h2>

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFaqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {openFaq === faq.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune question trouvée</h3>
                <p className="text-gray-600">Essayez de modifier votre recherche ou contactez-nous directement</p>
              </div>
            )}

            {/* Contact Form */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Vous ne trouvez pas votre réponse ?</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Choisir une catégorie</option>
                  <option>Question sur une formation</option>
                  <option>Problème avec un module</option>
                  <option>Support technique thème</option>
                  <option>Question de facturation</option>
                  <option>Autre</option>
                </select>
                <textarea
                  rows={5}
                  placeholder="Décrivez votre question en détail..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Envoyer ma Question
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;