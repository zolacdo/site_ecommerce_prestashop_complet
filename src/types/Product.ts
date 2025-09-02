export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'formation' | 'module' | 'theme';
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  difficulty?: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration?: string;
  version?: string;
  compatibility?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}