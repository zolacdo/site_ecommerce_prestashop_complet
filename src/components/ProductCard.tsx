import React from 'react';
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewProduct }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'formation': return 'Formation';
      case 'module': return 'Module';
      case 'theme': return 'Thème';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'formation': return 'bg-blue-100 text-blue-800';
      case 'module': return 'bg-green-100 text-green-800';
      case 'theme': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {/* Discount badge */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isInWishlist(product.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onViewProduct(product)}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <Eye className="h-4 w-4" />
            <span>Voir Détails</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {product.rating} ({product.reviews} avis)
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-gray-500">
                +{product.features.length - 2} autres
              </span>
            )}
          </div>
        </div>

        {/* Additional info */}
        {product.difficulty && (
          <div className="mb-3">
            <span className="text-xs text-gray-500">Niveau: </span>
            <span className="text-xs font-medium text-gray-700">{product.difficulty}</span>
            {product.duration && (
              <>
                <span className="text-xs text-gray-500 ml-3">Durée: </span>
                <span className="text-xs font-medium text-gray-700">{product.duration}</span>
              </>
            )}
          </div>
        )}

        {product.version && (
          <div className="mb-3">
            <span className="text-xs text-gray-500">Version: </span>
            <span className="text-xs font-medium text-gray-700">{product.version}</span>
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">{product.price}€</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">{product.originalPrice}€</span>
            )}
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all transform hover:scale-105"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Ajouter</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;