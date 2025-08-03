import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';

// Import pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  // Global state management
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

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Page rendering
  const renderPage = () => {
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
      setUser
    };

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
      default: 
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
      
      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
        />
      )}
    </div>
  );
};

export default App;