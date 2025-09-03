import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, Eye, EyeOff, Shield, Bell, CreditCard } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface EditProfileProps {
  onNavigate: (page: string) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'personal' | 'security' | 'notifications' | 'billing'>('personal');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialiser les données avec fallback
  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNewsletter: true,
    emailPromotions: true,
    emailUpdates: false,
    smsNotifications: false
  });

  const sections = [
    { id: 'personal', label: 'Informations Personnelles', icon: '👤' },
    { id: 'security', label: 'Sécurité', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'billing', label: 'Facturation', icon: '💳' }
  ];

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!personalData.firstName || !personalData.lastName || !personalData.email) {
      setError('Les champs Prénom, Nom et Email sont obligatoires.');
      return;
    }

    // Ici, tu appelleras ton API pour sauvegarder
    console.log('Données personnelles sauvegardées:', personalData);
    setSuccess('Informations personnelles mises à jour avec succès.');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }

    // Appel API ici pour changer le mot de passe
    console.log('Mot de passe changé');
    setSuccess('Mot de passe mis à jour avec succès.');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveNotifications = () => {
    setSuccess('Préférences de notification sauvegardées.');
    console.log('Notifications mises à jour:', notifications);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('L’image ne doit pas dépasser 2 Mo.');
        return;
      }
      // Ici tu peux uploader vers un service ou mettre en prévisualisation
      const reader = new FileReader();
      reader.onload = () => {
        setPersonalData({ ...personalData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => onNavigate('account')}
            className="flex items-center text-gray-600 hover:text-blue-900 transition-colors mb-4"
            aria-label="Retour au compte"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Retour au compte</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Modifier mon Profil</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-100 text-blue-900 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-current={activeSection === section.id ? 'page' : undefined}
                  >
                    <span className="text-lg" aria-hidden="true">{section.icon}</span>
                    <span>{section.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
                  {error}
                </div>
              )}
              {success && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
                  {success}
                </div>
              )}

              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations Personnelles</h2>
                  <form onSubmit={handlePersonalSubmit} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-6">
                      <div
                        className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden"
                        aria-label="Photo de profil"
                      >
                        {personalData.avatar ? (
                          <img src={personalData.avatar} alt="Profil" className="w-full h-full object-cover" />
                        ) : (
                          `${personalData.firstName.charAt(0)}${personalData.lastName.charAt(0)}`
                        )}
                      </div>
                      <div>
                        <label className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer flex items-center space-x-2">
                          <Upload className="h-4 w-4" />
                          <span>Changer la Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG max 2MB</p>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                        <input
                          type="text"
                          value={personalData.firstName}
                          onChange={(e) => setPersonalData({ ...personalData, firstName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                        <input
                          type="text"
                          value={personalData.lastName}
                          onChange={(e) => setPersonalData({ ...personalData, lastName: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) => setPersonalData({ ...personalData, phone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-5 w-5" />
                        <span>Sauvegarder</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Security */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Sécurité du Compte</h2>
                  <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel *</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showCurrentPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        >
                          {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe *</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label={showNewPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                        >
                          {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe *</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">Conseils de Sécurité</span>
                      </div>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Utilisez au moins 8 caractères</li>
                        <li>• Incluez des majuscules, minuscules et chiffres</li>
                        <li>• Évitez les mots de passe trop simples</li>
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-5 w-5" />
                        <span>Changer le Mot de Passe</span>
                      </button>
                    </div>
                  </form>

                  {/* Two-factor authentication */}
                  <div className="mt-8 p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-4">Authentification à Deux Facteurs</h3>
                    <p className="text-gray-600 mb-4">Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                    <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      Activer la 2FA
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications */}
              {activeSection === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Préférences de Notification</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Bell className="h-5 w-5 mr-2" />
                        Notifications Email
                      </h3>
                      <div className="space-y-4">
                        {[
                          { key: 'emailNewsletter', label: 'Newsletter hebdomadaire', description: 'Recevez nos derniers articles et conseils' },
                          { key: 'emailPromotions', label: 'Promotions et offres spéciales', description: 'Soyez informé de nos meilleures offres' },
                          { key: 'emailUpdates', label: 'Mises à jour de produits', description: 'Notifications sur les nouveaux produits et mises à jour' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{item.label}</p>
                              <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={notifications[item.key as keyof typeof notifications]}
                                onChange={(e) => handleNotificationChange(item.key as keyof typeof notifications, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Notifications SMS</h3>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">Notifications SMS</p>
                            <p className="text-sm text-gray-600">Recevez des SMS pour les commandes importantes</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications.smsNotifications}
                              onChange={(e) => handleNotificationChange('smsNotifications', e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleSaveNotifications}
                        className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"
                      >
                        <Save className="h-5 w-5" />
                        <span>Sauvegarder les Préférences</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Billing */}
              {activeSection === 'billing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de Facturation</h2>
                  <div className="space-y-6">
                    {/* Billing address */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Adresse de Facturation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Prénom"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Nom"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Entreprise (optionnel)"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Adresse"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent md:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Ville"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="Code postal"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Payment methods */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Moyens de Paiement
                      </h3>
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Aucun moyen de paiement enregistré</p>
                        <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                          Ajouter une Carte
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2"
                        onClick={() => setSuccess('Informations de facturation sauvegardées.')}
                      >
                        <Save className="h-5 w-5" />
                        <span>Sauvegarder</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;