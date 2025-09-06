# PrestaShop Academy - Site E-commerce Complet

Pour utiliser l'authentification Firebase, vous devez :
## Configuration Firebase
1. Créer un projet Firebase sur https://console.firebase.google.com/
2. Activer l'authentification par email/mot de passe
3. Créer une base de données Firestore
4. Remplacer les valeurs dans `src/config/firebase.ts` par vos propres clés :
```typescript
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  storageBucket: "votre-projet.appspot.com",
  messagingSenderId: "123456789",
  appId: "votre-app-id"
};
```
## Fonctionnalités
- ✅ Authentification Firebase (email/password)
- ✅ Gestion des produits (formations, modules, thèmes)
- ✅ Panier d'achat
- ✅ Liste de souhaits
- ✅ Blog avec commentaires
- ✅ Interface d'administration
- ✅ Chat support
- ✅ Gestion des paiements
- ✅ Responsive design
## Installation
```bash
npm install
npm run dev
```