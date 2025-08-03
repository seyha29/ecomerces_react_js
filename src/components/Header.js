import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  Menu,
  X,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Send,
  ChevronDown,
  Gift,
  Zap,
  Globe,
  CheckCircle,
  AlertCircle,
  Info,
  MessageCircle,
} from 'lucide-react';
import NotificationComponent from './Notification';

const Header = ({
  currentPage = 'home',
  setCurrentPage = () => {},
  cartItems = [],
  wishlistItems = [],
  getTotalItems = () => 0,
  searchQuery = '',
  setSearchQuery = () => {},
  selectedCategory = '',
  setSelectedCategory = () => {},
  isLoggedIn = false,
  user = null,
  setIsLoggedIn = () => {},
  setUser = () => {},
  isDarkMode = false,
  toggleDarkMode = () => {},
  notifications = [], // Use dynamic notifications from App.js
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home & Garden', icon: '🏠' },
    { id: 'food', name: 'Food & Drinks', icon: '🍕' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'books', name: 'Books', icon: '📚' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategoriesDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? 'bg-gray-900/95 backdrop-blur-lg shadow-xl'
            : 'bg-white/95 backdrop-blur-lg shadow-xl'
          : isDarkMode
          ? 'bg-gray-900 shadow-lg'
          : 'bg-white shadow-lg'
      }`}
    >
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+885 186-323-203</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">thanseyha2002@gmail.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 animate-pulse" />
                <span className="hidden md:inline">Free shipping on orders over $50</span>
                <span className="md:hidden">Free shipping $50+</span>
              </div>
              <div className="hidden sm:flex items-center space-x-2">
                <a href="https://www.facebook.com/than.seyha.9235/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                  <Facebook className="w-4 h-4 cursor-pointer" />
                </a>
                <a href="https://www.instagram.com/thanseyha_2002/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors">
                  <Instagram className="w-4 h-4 cursor-pointer" />
                </a>
                <a href="https://t.me/thanseyha11" target="_blank" rel="noopener noreferrer" className="hover:text-sky-300 transition-colors">
                  <Send className="w-4 h-4 cursor-pointer" />
                </a>
                <a href="mailto:thanseyha2002@gmail.com" className="hover:text-green-300 transition-colors">
                  <Mail className="w-4 h-4 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <div className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="cursor-pointer group" onClick={() => setCurrentPage('home')}>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                  MODERNSTORE
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Premium Shopping</p>
              </div>
            </div>
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                    isSearchFocused ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search for products, brands, categories..."
                    className="w-full px-6 py-4 pr-14 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500 outline-none transition-all duration-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-110">
                    <Search className="w-5 h-5 text-white" />
                  </button>
                </div>
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                    <div className="text-sm text-gray-600 mb-3">Popular Searches</div>
                    <div className="flex flex-wrap gap-2">
                      {['iPhone', 'MacBook', 'AirPods', 'Gaming', 'Fashion'].map((term, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 bg-gray-100 hover:bg-blue-100 rounded-full text-sm transition-colors"
                          onClick={() => setSearchQuery(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <NotificationComponent notifications={notifications} />
              <button
                className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 group"
                onClick={() => setCurrentPage('wishlist')}
              >
                <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500" />
                {wishlistItems.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {wishlistItems.length}
                  </div>
                )}
              </button>
              <button
                className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 group"
                onClick={() => setCurrentPage('cart')}
              >
                <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
                {getTotalItems() > 0 && (
                  <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
                    {getTotalItems()}
                  </div>
                )}
              </button>
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 group"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  {isLoggedIn && (
                    <div className="hidden lg:block">
                      <div className="text-sm font-medium text-gray-900">Hi, {user?.name || 'User'}</div>
                      <div className="text-xs text-gray-500">Premium Member</div>
                    </div>
                  )}
                  <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                          <div className="text-sm text-gray-500">{user?.email || 'user@example.com'}</div>
                        </div>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCurrentPage('profile');
                            setShowUserMenu(false);
                          }}
                        >
                          My Account
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCurrentPage('orders');
                            setShowUserMenu(false);
                          }}
                        >
                          Orders
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCurrentPage('settings');
                            setShowUserMenu(false);
                          }}
                        >
                          Settings
                        </button>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => {
                              setIsLoggedIn(false);
                              setUser(null);
                              setCurrentPage('home');
                              setShowUserMenu(false);
                            }}
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCurrentPage('login');
                            setShowUserMenu(false);
                          }}
                        >
                          Sign In
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setCurrentPage('login');
                            setShowUserMenu(false);
                          }}
                        >
                          Create Account
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <nav className="border-t border-gray-100 py-4">
          <div className="flex items-center justify-between">
            <div className="hidden lg:flex items-center space-x-1">
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                  currentPage === 'about'
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                    : isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setCurrentPage('about')}
              >
                <span className="text-lg">ℹ️</span>
                <span className="font-medium">About</span>
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                    showCategoriesDropdown
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                      : isDarkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                >
                  <span className="text-lg">🛍️</span>
                  <span className="font-medium">Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showCategoriesDropdown && (
                  <div className={`absolute left-0 top-full mt-2 w-64 rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                  }`}>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className={`flex items-center space-x-2 w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                          isDarkMode ? 'hover:bg-gray-700 text-gray-200' : 'text-gray-900'
                        }`}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage('products');
                          setShowCategoriesDropdown(false);
                        }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 ${
                  currentPage === 'contact'
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                    : isDarkMode
                    ? 'hover:bg-gray-800 text-gray-300'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setCurrentPage('contact')}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Contact Us</span>
              </button>
              
            </div>
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full">
                <Gift className="w-4 h-4 text-orange-600" />
                <span className="text-orange-700 font-medium">Special Offers</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Globe className="w-4 h-4" />
                <span>Worldwide Shipping</span>
              </div>
            </div>
          </div>
        </nav>
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white w-80 h-full animate-slide-in-right shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Menu</h2>
                  <p className="text-sm text-gray-500">Browse our categories</p>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-2">
                <button
                  className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-105 group"
                  onClick={() => {
                    setCurrentPage('about');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="text-2xl bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                    ℹ️
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">About</div>
                    <div className="text-sm text-gray-500">Learn about us</div>
                  </div>
                </button>
                <button
                  className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-105 group"
                  onClick={() => {
                    setShowCategoriesDropdown(!showCategoriesDropdown);
                  }}
                >
                  <div className="text-2xl bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                    🛍️
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Categories</div>
                    <div className="text-sm text-gray-500">Browse all categories</div>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                </button>
                {showCategoriesDropdown && (
                  <div className="ml-6 space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group"
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setCurrentPage('products');
                          setIsMenuOpen(false);
                          setShowCategoriesDropdown(false);
                        }}
                      >
                        <div className="text-2xl bg-gray-100 w-10 h-10 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">{category.name}</div>
                          <div className="text-sm text-gray-500">Browse collection</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                <button
                  className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-105 group"
                  onClick={() => {
                    setCurrentPage('contact');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="text-2xl bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Contact Us</div>
                    <div className="text-sm text-gray-500">Get in touch</div>
                  </div>
                </button>
                <button
                  className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-105 group"
                  onClick={() => {
                    setCurrentPage('help');
                    setIsMenuOpen(false);
                  }}
                >
                  <div className="text-2xl bg-gray-100 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Help Center</div>
                    <div className="text-sm text-gray-500">Find answers</div>
                  </div>
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-3">Connect with us</div>
                <div className="flex items-center space-x-4">
                  <a href="https://www.facebook.com/than.seyha.9235/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </a>
                  <a href="https://www.instagram.com/thanseyha_2002/" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-100 rounded-lg hover:bg-pink-200 transition-colors">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </a>
                  <a href="https://t.me/thanseyha11" target="_blank" rel="noopener noreferrer" className="p-2 bg-sky-100 rounded-lg hover:bg-sky-200 transition-colors">
                    <Send className="w-5 h-5 text-sky-600" />
                  </a>
                  <a href="mailto:thanseyha2002@gmail.com" className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                    <Mail className="w-5 h-5 text-green-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ),
  getTotalItems: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  setIsLoggedIn: PropTypes.func,
  setUser: PropTypes.func,
  isDarkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(['success', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ),
};

export default Header;