import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const WishlistPage = ({ 
  wishlistItems, 
  addToCart, 
  toggleWishlist, 
  setSelectedProduct, 
  setCurrentPage 
}) => {
  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Save items you love for later</p>
          <button
            onClick={() => setCurrentPage('products')}
            className="btn-primary"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <p className="text-gray-600">{wishlistItems.length} items saved</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlistItems={wishlistItems}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <div className="bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Ready to purchase?</h3>
          <p className="text-gray-600 mb-6">
            Add all your wishlist items to cart and checkout with ease
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                wishlistItems.forEach(item => addToCart(item));
                setCurrentPage('cart');
              }}
              className="btn-primary"
            >
              Add All to Cart
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className="btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes for the component
WishlistPage.propTypes = {
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Add other expected properties of a product object if known
      // e.g., name: PropTypes.string.isRequired,
      // price: PropTypes.number.isRequired,
    })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default WishlistPage;