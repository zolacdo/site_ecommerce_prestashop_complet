# PrestaShop Academy - Site E-commerce Complet

Pour utiliser l'authentification Firebase, vous devez :
## Configuration Firebase
1. Créer un projet Firebase sur https://console.firebase.google.com/
2. Activer l'authentification par email/mot de passe
3. Créer une base de données Firestore
4. Créer les collections suivantes dans Firestore :
   - `users` : pour les utilisateurs normaux
   - `admins` : pour les administrateurs (avec champs : firstName, lastName, role, permissions, isActive)
   - `products` : pour les produits
   - `orders` : pour les commandes
5. Remplacer les valeurs dans `src/config/firebase.ts` par vos propres clés :
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

## Structure Firebase

### Collection `admins`
```javascript
{
  firstName: "John",
  lastName: "Doe", 
  role: "admin", // ou "manager"
  permissions: ["all"], // ou ["users", "products", "orders"]
  isActive: true,
  createdAt: timestamp
}
```

### Collection `products`
```javascript
{
  name: "Formation PrestaShop",
  description: "Description du produit",
  price: 199,
  originalPrice: 299,
  category: "formation", // "module", "theme"
  image: "url-image",
  rating: 4.9,
  reviews: 150,
  features: ["Feature 1", "Feature 2"],
  difficulty: "Débutant",
  duration: "25 heures",
  status: "active", // "draft", "archived"
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Fonctionnalités
- ✅ Authentification Firebase (email/password)
- ✅ Gestion des produits dynamique avec Firebase
- ✅ Backoffice admin complet avec CRUD
- ✅ Panier d'achat
- ✅ Liste de souhaits
- ✅ Blog avec commentaires
- ✅ Interface d'administration dynamique
- ✅ Chat support
- ✅ Gestion des paiements
- ✅ Responsive design
## Installation
```bash
npm install
npm run dev
```