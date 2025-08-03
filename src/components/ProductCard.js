import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Star, Heart, Eye, ShoppingCart, Zap, Shield, Truck } from 'lucide-react';

const ProductCard = ({
  product,
  addToCart = () => {},
  toggleWishlist = () => {},
  wishlistItems = [],
  setSelectedProduct = () => {},
  onViewDetails = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  const productData = {
    rating: 4.5,
    reviews: 127,
    originalPrice: product.price ? product.price * 1.2 : 99,
    discount: 15,
    inStock: true,
    isNew: Math.random() > 0.7,
    isBestseller: Math.random() > 0.8,
    ...product,
  };

  const isInWishlist = wishlistItems.find((item) => item.id === productData.id);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(productData);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleQuickView = () => {
    setShowQuickView(true);
    setSelectedProduct(productData);
    setTimeout(() => setShowQuickView(false), 300);
  };

  return (
    <div
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={productData.image || 'https://picsum.photos/400/300'}
          alt={productData.name || 'Product'}
          className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
          onError={(e) => (e.target.src = '/fallback-image.png')}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {productData.discount > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              -{productData.discount}%
            </div>
          )}
          {productData.isNew && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              NEW
            </div>
          )}
          {productData.isBestseller && (
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              BESTSELLER
            </div>
          )}
        </div>
        <div
          className={`absolute top-4 right-4 flex flex-col space-y-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
          }`}
        >
          <button
            onClick={() => toggleWishlist(productData)}
            className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isInWishlist ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className={`p-3 rounded-full shadow-lg backdrop-blur-sm bg-white/90 text-gray-600 hover:text-blue-500 hover:bg-white transition-all duration-200 hover:scale-110 ${
              showQuickView ? 'scale-110 text-blue-500' : ''
            }`}
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
        <div
          className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-green-600">
                <Shield className="w-4 h-4 mr-1" />
                <span>Secure</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Truck className="w-4 h-4 mr-1" />
                <span>Fast Ship</span>
              </div>
            </div>
            <button
              onClick={handleQuickView}
              className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="font-bold text-xl mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {productData.name || 'Premium Product'}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{productData.category || 'Electronics • Premium'}</p>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(productData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{productData.rating}</span>
            <span className="text-sm text-gray-500 ml-1">({productData.reviews})</span>
          </div>
          <div className={`flex items-center text-sm font-medium ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
            <div
              className={`w-2 h-2 rounded-full mr-2 ${productData.inStock ? 'bg-green-500' : 'bg-red-500'} ${
                productData.inStock ? 'animate-pulse' : ''
              }`}
            />
            {productData.inStock ? 'In Stock' : 'Out of Stock'}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-black text-blue-600">${productData.price || 299}</span>
              {productData.originalPrice > productData.price && (
                <span className="text-lg text-gray-400 line-through">${productData.originalPrice}</span>
              )}
            </div>
            {productData.originalPrice > productData.price && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                Save ${(productData.originalPrice - productData.price).toFixed(0)}
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">or ${((productData.price || 299) / 12).toFixed(0)}/month with financing</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!productData.inStock || isAddingToCart}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 ${
            !productData.inStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isAddingToCart
              ? 'bg-green-500 text-white'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-xl'
          }`}
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Adding...</span>
            </>
          ) : !productData.inStock ? (
            <span>Out of Stock</span>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
        <div className="flex space-x-2 mt-3">
          <button
            onClick={() => onViewDetails(productData)}
            className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm"
          >
            View Details
          </button>
          <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium text-sm">
            Share
          </button>
        </div>
      </div>
      <div
        className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${
          isHovered ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
        }`}
      />
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
    inStock: PropTypes.bool,
    isNew: PropTypes.bool,
    isBestseller: PropTypes.bool,
    brand: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    warranty: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func,
  toggleWishlist: PropTypes.func,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  setSelectedProduct: PropTypes.func,
  onViewDetails: PropTypes.func,
};

export default ProductCard;