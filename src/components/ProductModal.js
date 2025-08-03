import React from 'react';
import PropTypes from 'prop-types';
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductModal = ({ product, onClose, addToCart, toggleWishlist, wishlistItems }) => {
  // Check if product is undefined or null
  if (!product) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-lg p-6">
          <p className="text-gray-600">No product selected.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.find((item) => item.id === product.id);

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
                <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
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
                <span className="text-gray-600">Brand: </span>
                <span className="font-semibold">{product.brand}</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Key Features:</h4>
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
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => {
                    addToCart(product);
                    onClose();
                  }}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isInWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className="w-6 h-6" />
                </button>
                <button className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <RefreshCw className="w-5 h-5" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>{product.warranty} warranty included</span>
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
    features: PropTypes.arrayOf(PropTypes.string), // Made optional
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
};

// Default props
ProductModal.defaultProps = {
  product: null,
  addToCart: () => {},
  toggleWishlist: () => {},
};

export default ProductModal;