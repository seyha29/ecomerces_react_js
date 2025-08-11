import React, { useState } from "react";
import PropTypes from "prop-types";
import { Plus, Minus, Trash2, Heart, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const CartItem = ({ item, onIncrementQuantity, onDecrementQuantity, onRemoveItem, onToggleWishlist, isDarkMode }) => {
  const { t } = useTranslation(); // Hook to access translation function
  const [isRemoving, setIsRemoving] = useState(false);

  const handleIncrement = () => {
    onIncrementQuantity(item.id);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onDecrementQuantity(item.id);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemoveItem(item.id);
    }, 200);
  };

  const handleMoveToWishlist = () => {
    onToggleWishlist(item);
    handleRemove();
  };

  return (
    <div
      className={`transition-all duration-200 ${
        isRemoving ? "opacity-0 scale-95" : ""
      }`}
    >
      <div
        className={`rounded-lg border p-4 ${
          isDarkMode
            ? "border-gray-700"
            : "border-gray-200"
        }`}
      >

        <div className="flex gap-4">
          {/* Image */}
          <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-semibold text-lg ${
                isDarkMode ? "text-white" : "text-black"
              }`}>
                {item.name}
              </h3>
              <button
                onClick={handleRemove}
                className={`p-1 rounded transition-colors ${
                  isDarkMode 
                    ? "text-gray-400 hover:text-red-400 hover:bg-gray-700" 
                    : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
                }`}
                aria-label={t('cart.item.remove', 'Remove item')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < 4 
                        ? "text-yellow-400 fill-current" 
                        : isDarkMode ? "text-gray-600" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className={`text-xs ${
                isDarkMode ? "text-white" : "text-black"
              }`}>
                {t('cart.item.rating', '4.8 (127)')}
              </span>
            </div>

            {/* Price */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${
                  isDarkMode ? "text-white" : "text-black"
                }`}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className={`text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}>
                  {t('cart.item.priceEach', '${{price}} each').replace('{{price}}', item.price.toFixed(2))}
                </span>
              </div>
              
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm line-through ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}>
                    ${item.originalPrice.toFixed(2)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    isDarkMode 
                      ? "bg-red-900 text-red-200" 
                      : "bg-red-100 text-red-700"
                  }`}>
                    {t('cart.item.save', 'Save ${{amount}}').replace(
                      '{{amount}}',
                      ((item.originalPrice - item.price) * item.quantity).toFixed(2)
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Product Details */}
            {(item.size || item.color) && (
              <div className="flex gap-4 mb-3 text-sm">
                {item.size && (
                  <span className={isDarkMode ? "text-white" : "text-black"}>
                    {t('cart.item.size', 'Size')}: <span className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}>{item.size}</span>
                  </span>
                )}
                {item.color && (
                  <span className={isDarkMode ? "text-white" : "text-black"}>
                    {t('cart.item.color', 'Color')}: <span className={`font-medium ${isDarkMode ? "text-white" : "text-black"}`}>{item.color}</span>
                  </span>
                )}
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex items-center justify-between">
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className={`text-sm ${
                  isDarkMode ? "text-white" : "text-black"
                }`}>
                  {t('cart.item.quantity', 'Qty')}:
                </span>
                <div className={`flex items-center border rounded transition-colors ${
                  isDarkMode 
                    ? "border-gray-600" 
                    : "border-gray-300"
                }`}>
                  <button
                    onClick={handleDecrement}
                    disabled={item.quantity <= 1}
                    className={`p-1 transition-colors ${
                      item.quantity <= 1
                        ? "text-gray-400 cursor-not-allowed"
                        : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    aria-label={t('cart.item.decrement', 'Decrease quantity')}
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  
                  <span className={`px-3 py-1 min-w-[2rem] text-center text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={handleIncrement}
                    className={`p-1 transition-colors ${
                      isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    aria-label={t('cart.item.increment', 'Increase quantity')}
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleMoveToWishlist}
                  className={`px-3 py-1.5 text-sm rounded border transition-colors ${
                    isDarkMode
                      ? "border-gray-600 text-white hover:bg-gray-700"
                      : "border-gray-300 text-black hover:bg-gray-50"
                  }`}
                >
                  <Heart className="w-3 h-3 inline mr-1" />
                  {t('cart.item.saveToWishlist', 'Save')}
                </button>
                
                <button 
                  onClick={() => console.log('Buy now clicked for item:', item.id)}
                  className={`px-4 py-1.5 text-sm rounded transition-colors ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  {t('cart.item.buyNow', 'Buy Now')}
                </button>
              </div>
            </div>

            {/* Shipping */}
            <div className={`mt-3 text-xs flex items-center gap-1 ${
              isDarkMode ? "text-green-400" : "text-green-600"
            }`}>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {t('cart.item.shipping', 'Free shipping • Arrives tomorrow')}
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