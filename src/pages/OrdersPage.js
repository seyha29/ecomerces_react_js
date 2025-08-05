import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ProductModal from '../components/ProductModal';
import { products } from '../data/products';
import OrderTracking from '../components/common/OrderTracking'; // Import tracking component

// Helper to map order status to step index
const getStepFromStatus = (status) => {
  switch (status) {
    case 'Pending':
      return 0;
    case 'Processing':
      return 1;
    case 'Shipped':
      return 2;
    case 'Out for Delivery':
      return 3;
    case 'Delivered':
      return 4;
    default:
      return 0;
  }
};

const OrdersPage = ({
  orders = [],
  setCurrentPage,
  isLoggedIn,
  user,
  addToCart,
  toggleWishlist,
  wishlistItems,
  setSelectedProduct,
}) => {
  const { t } = useTranslation(); // Hook to access translation function
  const [selectedProduct, setSelectedProductLocal] = useState(null);

  const fallbackProduct = {
    image: 'https://via.placeholder.com/64',
    name: t('orders.fallbackProduct.name', 'Sample Product'),
    price: '0.00',
    description: t('orders.fallbackProduct.description', 'No description available'),
    brand: t('orders.fallbackProduct.brand', 'Unknown'),
    features: [],
    rating: 0,
    reviews: 0,
    warranty: t('orders.fallbackProduct.warranty', 'N/A'),
  };

  const getProductDetails = (product) => {
    const fullProduct = products.find((p) => p.id === product.id) || product;
    return { ...fallbackProduct, ...fullProduct };
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">{t('orders.title', 'Order History')}</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">{t('orders.loginPrompt', 'Please log in to view your order history.')}</p>
          <button
            onClick={() => setCurrentPage('login')}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {t('user.signIn', 'Sign In')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('orders.title', 'Order History')}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {orders.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">{t('orders.empty', 'No orders found')}</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">
                      {t('orders.orderNumber', 'Order #{{id}}').replace('{{id}}', order.id)}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t('orders.placedOn', 'Placed on {{date}}').replace('{{date}}', order.date)}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {t(`orders.status.${order.status.toLowerCase()}`, order.status)}
                  </span>
                </div>

                {/* Order tracking progress bar */}
                <OrderTracking currentStep={getStepFromStatus(order.status)} />

                {order.products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 mb-2">
                    <img
                      src={product.image || fallbackProduct.image}
                      alt={product.name || fallbackProduct.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name || fallbackProduct.name}</p>
                      <p className="text-gray-600">
                        $
                        {typeof product.price === 'number'
                          ? product.price.toFixed(2)
                          : fallbackProduct.price}{' '}
                        x {product.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => {
                          const fullProduct = getProductDetails(product);
                          setSelectedProductLocal(fullProduct);
                          setSelectedProduct(fullProduct);
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {t('orders.viewDetails', 'View Details')}
                      </button>
                    </div>
                  </div>
                ))}
                <p className="font-semibold text-right">
                  {t('orders.total', 'Total')}: ${order.total.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for product detail */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => {
            setSelectedProductLocal(null);
            setSelectedProduct(null);
          }}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
        />
      )}
    </div>
  );
};

// Define PropTypes
OrdersPage.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      total: PropTypes.number.isRequired,
      products: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          name: PropTypes.string,
          price: PropTypes.number,
          quantity: PropTypes.number.isRequired,
          image: PropTypes.string,
        })
      ).isRequired,
    })
  ),
  setCurrentPage: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
};

export default OrdersPage;