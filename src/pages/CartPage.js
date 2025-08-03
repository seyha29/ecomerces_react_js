import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCart, CreditCard } from 'lucide-react';
import CartItem from '../components/CartItem'; // Import CartItem

const CartPage = ({
  cartItems,
  removeFromCart,
  updateCartQuantity,
  getTotalPrice,
  getTotalItems,
  setCurrentPage,
  toggleWishlist, // Added for CartItem
}) => {
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some products to get started</p>
          <button onClick={() => setCurrentPage('products')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({getTotalItems()})</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="card">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrementQuantity={() => updateCartQuantity(item.id, item.quantity + 1)}
                onDecrementQuantity={() => updateCartQuantity(item.id, item.quantity - 1)}
                onRemoveItem={removeFromCart}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {subtotal < 50 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-700">Add ${(50 - subtotal).toFixed(2)} more to get free shipping!</p>
              </div>
            )}

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to Checkout</span>
            </button>

            <button onClick={() => setCurrentPage('products')} className="w-full mt-3 btn-secondary">
              Continue Shopping
            </button>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center mb-2">Secure checkout with</p>
              <div className="flex justify-center space-x-2">
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">VISA</div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">MC</div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">AMEX</div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">PayPal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateCartQuantity: PropTypes.func.isRequired,
  getTotalPrice: PropTypes.func.isRequired,
  getTotalItems: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired, // Added for CartItem
};

export default CartPage;