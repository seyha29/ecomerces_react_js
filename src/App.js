import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import OrdersPage from './pages/OrdersPage';
import LiveChatSupport from './components/LiveChatSupport';
import AboutUs from './pages/AboutUs';
import Partnerships from './pages/Partnerships';
import ContactUs from './pages/ContactUs';
import HelpCenter from './pages/HelpCenter';

const App = () => {
  const { t, i18n } = useTranslation();

  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('user');
      setIsLoggedIn(false);
    }
  }, [user]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'success',
        message: t('notification.add_to_cart_success', { defaultValue: 'Added to cart successfully!' }),
        createdAt: Date.now(),
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      },
    ]);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const clearNotification = (notificationId) => {
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const completeCheckout = (orderDetails) => {
    if (cartItems.length === 0) {
      console.warn('No items in cart to create order.');
      return;
    }
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(i18n.language === 'kh' ? 'kh-KH' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending',
      products: [...cartItems],
      total: getTotalPrice() + (getTotalPrice() > 50 ? 0 : 9.99) + getTotalPrice() * 0.08,
      ...orderDetails,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'success',
        message: t('notification.checkout_success', { defaultValue: 'Checkout completed successfully!' }),
        createdAt: Date.now(),
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      },
    ]);
    setCurrentPage('orders');
  };

  const pageProps = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    toggleWishlist,
    getTotalPrice,
    getTotalItems,
    setCurrentPage,
    setSelectedProduct,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    orders,
    completeCheckout,
    notifications,
    setNotifications,
    clearNotification,
    isDarkMode,
    toggleDarkMode,
    changeLanguage,
    currentLanguage: i18n.language,
    t,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} isDarkMode={isDarkMode} />;
      case 'products':
        return <ProductsPage {...pageProps} />;
      case 'cart':
        return <CartPage {...pageProps} />;
      case 'wishlist':
        return <WishlistPage {...pageProps} />;
      case 'checkout':
        return <CheckoutPage {...pageProps} />;
      case 'login':
        return <LoginPage {...pageProps} />;
      case 'profile':
        return <ProfilePage {...pageProps} />;
      case 'settings':
        return <SettingsPage {...pageProps} />;
      case 'orders':
        return <OrdersPage {...pageProps} />;
      case 'about':
        return <AboutUs {...pageProps} />;
      case 'partnerships':
        return <Partnerships {...pageProps} />;
      case 'contact':
        return <ContactUs {...pageProps} />;
      case 'help':
        return <HelpCenter {...pageProps} />;
      default:
        return <HomePage {...pageProps} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      style={{ fontFamily: "'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif" }}
    >
      <Header {...pageProps} />
      <main className="pb-20">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
        />
      )}
      <LiveChatSupport user={user} addToCart={addToCart} orders={orders} />
    </div>
  );
};

export default App;