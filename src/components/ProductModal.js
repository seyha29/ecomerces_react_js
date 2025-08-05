import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Zap } from 'lucide-react';

const ProductModal = ({ product, onClose, addToCart, toggleWishlist, wishlistItems, onBuyNow }) => {
  const { t } = useTranslation(); // Initialize translation hook

  // Check if product is undefined or null
  if (!product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600">{t('products.modal.noProductSelected')}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {t('products.modal.close')}
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.find((item) => item.id === product.id);

  const handleBuyNow = () => {
    onBuyNow(product);
    onClose(); // Close modal after buy now
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg"
                onError={(e) => (e.target.src = 'https://via.placeholder.com/300')} // Fallback image
              />
            </div>

            {/* Product Details */}
            <div>
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">{t('products.modal.reviews', { count: product.reviews })}</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.discount > 0 && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                    -{product.discount}%
                  </span>
                )}
              </div>

              {/* Brand */}
              <div className="mb-4">
                <span className="text-gray-600">{t('products.modal.brand', { brand: product.brand })}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">{t('products.modal.keyFeatures')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {(product.features || []).map((feature, index) => ( // Fallback to empty array
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                {/* Buy Now Button - Primary */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>{t('products.modal.buyNow')}</span>
                </button>

                {/* Add to Cart Button - Secondary */}
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{t('products.modal.addToCart')}</span>
                </button>

                {/* Action Icons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`flex-1 p-3 rounded-lg border-2 transition-colors flex items-center justify-center ${
                      isInWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    <span className="text-sm">{isInWishlist ? t('products.modal.inWishlist') : t('products.modal.addToWishlist')}</span>
                  </button>
                  <button className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
                    <Share2 className="w-6 h-6" />
                    <span className="sr-only">{t('products.modal.share')}</span>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>{t('products.modal.freeShipping')}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                  <span>{t('products.modal.returnPolicy')}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>{t('products.modal.warranty', { warranty: product.warranty })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string),
    warranty: PropTypes.string.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
  }),
  onClose: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

// Default props
ProductModal.defaultProps = {
  product: null,
  addToCart: () => {},
  toggleWishlist: () => {},
  onBuyNow: () => {},
};

export default ProductModal;