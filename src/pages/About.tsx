import React from 'react';
import { Users, Award, Target, Heart, ArrowRight } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const team = [
    {
      name: 'Alexandre Martin',
      role: 'Fondateur & Expert PrestaShop',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: '15 ans d\'expérience dans l\'e-commerce et PrestaShop'
    },
    {
      name: 'Sophie Dubois',
      role: 'Responsable Formation',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Experte en pédagogie digitale et développement web'
    },
    {
      name: 'Thomas Laurent',
      role: 'Développeur Senior',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Spécialiste modules et thèmes PrestaShop'
    },
    {
      name: 'Marie Rousseau',
      role: 'Support Client',
      image: 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Dédiée à votre satisfaction et votre réussite'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque formation, module et thème que nous créons.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Notre passion pour PrestaShop et l\'e-commerce guide tout ce que nous faisons.'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous croyons en la force de la communauté et de l\'entraide entre e-commerçants.'
    },
    {
      icon: Award,
      title: 'Innovation',
      description: 'Nous innovons constamment pour vous offrir les meilleures solutions du marché.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">À Propos de PrestaShop Academy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Depuis 2015, nous accompagnons les entrepreneurs dans leur réussite e-commerce avec des formations expertes, 
              des modules innovants et des thèmes professionnels pour PrestaShop.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  PrestaShop Academy est née de la passion de notre fondateur Alexandre Martin pour l'e-commerce 
                  et PrestaShop. Après avoir aidé des centaines d'entreprises à développer leur boutique en ligne, 
                  il a décidé de créer une plateforme dédiée à la formation et aux outils PrestaShop.
                </p>
                <p>
                  Aujourd'hui, nous sommes fiers d'avoir formé plus de 15 000 entrepreneurs et développé plus de 
                  100 modules et thèmes utilisés par des milliers de boutiques à travers le monde francophone.
                </p>
                <p>
                  Notre mission est simple : démocratiser l'accès aux connaissances PrestaShop et fournir les 
                  meilleurs outils pour réussir dans l'e-commerce.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Notre équipe"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600">Les principes qui guident notre travail au quotidien</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-900" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600">Des experts passionnés à votre service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-900 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">15k+</div>
              <p className="text-blue-100">Étudiants Formés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">100+</div>
              <p className="text-blue-100">Modules Développés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <p className="text-blue-100">Thèmes Créés</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">4.9/5</div>
              <p className="text-blue-100">Satisfaction Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Rejoignez Notre Communauté</h2>
          <p className="text-xl mb-8 text-orange-100">
            Faites partie des milliers d'entrepreneurs qui ont transformé leur business avec nos solutions
          </p>
          <button
            onClick={() => onNavigate('formations')}
            className="bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Commencer Maintenant</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;