import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Minus, Trash2, Heart, Star } from "lucide-react";

const CartItem = ({ item, onIncrementQuantity, onDecrementQuantity, onRemoveItem, onToggleWishlist, isDarkMode }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = () => {
    setIsUpdating(true);
    onIncrementQuantity(item.id);
    setTimeout(() => setIsUpdating(false), 200);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      setIsUpdating(true);
      onDecrementQuantity(item.id);
      setTimeout(() => setIsUpdating(false), 200);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    console.log('Removing item:', item.id); // Debug log
    setTimeout(() => {
      onRemoveItem(item.id);
    }, 300);
  };

  const handleMoveToWishlist = () => {
    onToggleWishlist(item);
    handleRemove();
  };

  return (
    <div
      className={`group rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
      } ${isRemoving ? "animate-slide-out opacity-0 scale-95" : "animate-slide-in"}`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-48 h-48 sm:h-40 overflow-hidden bg-gray-50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={handleMoveToWishlist}
              className={`p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-200 mb-2 ${
                isDarkMode ? "bg-gray-700/90 text-white hover:bg-gray-600" : "bg-white/90 hover:bg-white"
              } backdrop-blur-sm`}
              title="Move to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isDarkMode ? "text-gray-200 hover:text-red-400" : "text-gray-700 hover:text-red-500"}`} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">In Stock</span>
          </div>
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3
                  className={`font-bold text-xl transition-colors ${
                    isDarkMode ? "text-gray-100 group-hover:text-blue-400" : "text-gray-900 group-hover:text-blue-600"
                  }`}
                >
                  {item.name}
                </h3>
                <button
                  onClick={handleRemove}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                    isDarkMode ? "text-gray-400 hover:text-red-400 hover:bg-red-900/50" : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                  }`}
                  title="Remove from cart"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : isDarkMode ? "text-gray-600" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className={`text-sm ml-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>(4.8) • 127 reviews</span>
              </div>
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <span className={`text-3xl font-black ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <span className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    (${item.price.toFixed(2)} each)
                  </span>
                </div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm ${isDarkMode ? "text-gray-500 line-through" : "text-gray-400 line-through"}`}>
                      ${item.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>
              {item.size && (
                <div className="mb-3">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Size: </span>
                  <span className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{item.size}</span>
                </div>
              )}
              {item.color && (
                <div className="mb-3">
                  <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Color: </span>
                  <span className={`font-medium ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>{item.color}</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-1">
                <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"} mr-3`}>Quantity:</span>
                <div className={`flex items-center rounded-2xl p-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <button
                    onClick={handleDecrement}
                    disabled={item.quantity <= 1}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      item.quantity <= 1
                        ? isDarkMode
                          ? "text-gray-500 cursor-not-allowed"
                          : "text-gray-300 cursor-not-allowed"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-red-600 hover:scale-110"
                        : "text-gray-600 hover:text-white hover:bg-red-500 hover:scale-110"
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div
                    className={`min-w-[3rem] text-center font-bold text-lg py-2 transition-all duration-200 ${
                      isUpdating ? "scale-125 text-blue-600" : isDarkMode ? "text-gray-100" : "text-gray-900"
                    }`}
                  >
                    {item.quantity}
                  </div>
                  <button
                    onClick={handleIncrement}
                    className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                      isDarkMode ? "text-gray-300 hover:text-white hover:bg-green-600" : "text-gray-600 hover:text-white hover:bg-green-500"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleMoveToWishlist}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm hover:scale-105 ${
                    isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Save for Later
                </button>
                <button
                  className={`px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm hover:scale-105 shadow-lg ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div
              className={`mt-4 p-3 rounded-xl border ${
                isDarkMode ? "bg-green-900/50 border-green-700 text-green-200" : "bg-green-50 border-green-200 text-green-700"
              }`}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="text-sm font-medium">Free shipping on this item • Arrives by Tomorrow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    size: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  onIncrementQuantity: PropTypes.func.isRequired,
  onDecrementQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default CartItem;