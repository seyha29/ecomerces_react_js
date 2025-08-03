import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Enable smooth scrolling globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
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
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Handle checkout completion
  const completeCheckout = (orderDetails) => {
    if (cartItems.length === 0) {
      console.warn('No items in cart to create order.');
      return;
    }
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      status: 'Pending',
      products: [...cartItems],
      total:
        getTotalPrice() +
        (getTotalPrice() > 50 ? 0 : 9.99) +
        getTotalPrice() * 0.08,
      ...orderDetails,
    };
    setOrders((prev) => [...prev, newOrder]);
    setCartItems([]);
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: 'success',
        message: `Your order #${newOrder.id} has been placed successfully!`,
        time: 'Just now',
        icon: <CheckCircle className="w-5 h-5 text-green-500" />,
      },
    ]);
    console.log('New notification added:', {
      id: Date.now(),
      type: 'success',
      message: `Your order #${newOrder.id} has been placed successfully!`,
      time: 'Just now',
    });
    setCurrentPage('orders');
  };

  // Common props
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
    isDarkMode,
    toggleDarkMode,
  };

  // Page renderer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />;
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
        return (<OrdersPage {...pageProps}  />);
      case 'about':
        return <AboutUs {...pageProps} />;
      case 'partnerships':
        return <Partnerships {...pageProps} />;
      case 'contact':
        return <ContactUs {...pageProps} />;
      case 'help':
        return <HelpCenter {...pageProps} />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItems={cartItems}
        wishlistItems={wishlistItems}
        getTotalItems={getTotalItems}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isLoggedIn={isLoggedIn}
        user={user}
        setIsLoggedIn={setIsLoggedIn}
        setUser={setUser}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        notifications={notifications}
      />
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