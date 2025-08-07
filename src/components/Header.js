import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Search, ShoppingCart, User, Heart, Menu, X, Phone, Mail,
  Facebook, Instagram, Send, ChevronDown, Gift, Zap, Globe, MessageCircle, Languages, Sun, Moon, Bell
} from 'lucide-react';
import NotificationComponent from './Notification';
import '../pages/LoginPage.css';

const LanguageSwitcher = ({ changeLanguage, currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const USFlag = () => (
    <svg className="w-5 h-3" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="#B22234" />
      <rect width="24" height="1.23" y="1.23" fill="white" />
      <rect width="24" height="1.23" y="3.69" fill="white" />
      <rect width="24" height="1.23" y="6.15" fill="white" />
      <rect width="24" height="1.23" y="8.62" fill="white" />
      <rect width="24" height="1.23" y="11.08" fill="white" />
      <rect width="24" height="1.23" y="13.54" fill="white" />
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
    </svg>
  );

  const KhmerFlag = () => (
    <svg className="w-5 h-3" viewBox="0 0 20 16" fill="none">
      <rect width="24" height="16" fill="#032EA1" />
      <rect width="24" height="4" y="6" fill="#E4002B" />
      <rect width="12" height="2" x="6" y="7" fill="white" />
    </svg>
  );

  const getCurrentFlag = () => {
    return currentLanguage === 'en' ? <USFlag /> : <KhmerFlag />;
  };

  const handleChangeLanguage = (lng) => {
    changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 p-3 hover:text-blue-300 transition-colors cursor-pointer select-none touch-manipulation"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {getCurrentFlag()}
        <Languages className="w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-50">
          <button
            type="button"
            className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer touch-manipulation ${
              currentLanguage === 'en' ? 'bg-blue-50 dark:bg-blue-900' : ''
            }`}
            onClick={() => handleChangeLanguage('en')}
          >
            <USFlag />
            <span className="text-sm">English</span>
          </button>
          <button
            type="button"
            className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer touch-manipulation ${
              currentLanguage === 'kh' ? 'bg-blue-50 dark:bg-blue-900' : ''
            }`}
            onClick={() => handleChangeLanguage('kh')}
          >
            <KhmerFlag />
            <span className="text-sm">Khmer</span>
          </button>
        </div>
      )}
    </div>
  );
};

// Improved IconButton Component with better mobile support
const IconButton = ({ 
  onClick, 
  children, 
  className = '', 
  badgeCount = null, 
  badgeColor = 'bg-blue-500',
  ariaLabel,
  disabled = false 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleTouchStart = (e) => {
    if (!disabled) {
      setIsPressed(true);
      // Add haptic feedback for supported devices
      if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  };

  const handleTouchEnd = (e) => {
    setIsPressed(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      className={`
        relative min-w-[48px] min-h-[48px] p-3 rounded-xl 
        transition-all duration-200 cursor-pointer select-none touch-manipulation
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 active:scale-95'
        } 
        ${isPressed ? 'scale-95 bg-gray-200 dark:bg-gray-600' : ''} 
        ${className}
      `}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <div className="flex items-center justify-center w-6 h-6">
        {children}
      </div>
      {badgeCount !== null && badgeCount > 0 && (
        <div className={`absolute -top-1 -right-1 ${badgeColor} text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg animate-pulse`}>
          {badgeCount > 99 ? '99+' : badgeCount}
        </div>
      )}
    </button>
  );
};

// Mobile Action Bar Component for bottom navigation on mobile
const MobileActionBar = ({
  handleCartClick,
  handleWishlistClick,
  handleNotificationClick,
  handleDarkModeToggle,
  handleUserClick,
  getTotalItems,
  wishlistItems,
  notifications,
  isDarkMode,
  isLoggedIn,
  user,
  t
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2">
        {/* Cart */}
        <IconButton
          onClick={handleCartClick}
          badgeCount={getTotalItems()}
          badgeColor="bg-blue-500"
          ariaLabel="View cart"
          className="flex-1 max-w-[20%]"
        >
          <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </IconButton>

        {/* Wishlist */}
        <IconButton
          onClick={handleWishlistClick}
          badgeCount={wishlistItems.length}
          badgeColor="bg-red-500"
          ariaLabel="View wishlist"
          className="flex-1 max-w-[20%]"
        >
          <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </IconButton>

        {/* Notifications */}
        <IconButton
          onClick={handleNotificationClick}
          badgeCount={notifications.length}
          badgeColor="bg-red-500"
          ariaLabel="View notifications"
          className="flex-1 max-w-[20%]"
        >
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </IconButton>

        {/* Dark Mode Toggle */}
        <IconButton
          onClick={handleDarkModeToggle}
          ariaLabel={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
          className="flex-1 max-w-[20%]"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </IconButton>

        {/* User Profile */}
        <IconButton 
          onClick={handleUserClick} 
          ariaLabel="User menu"
          className="flex-1 max-w-[20%]"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
            {isLoggedIn && user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <User
              className="w-5 h-5 text-white"
              style={{ display: isLoggedIn && user?.profileImage ? 'none' : 'flex' }}
            />
          </div>
        </IconButton>
      </div>
    </div>
  );
};

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
  notifications = [],
  t = (key) => key,
  changeLanguage = () => {},
  currentLanguage = 'en',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  const categories = [
    { id: 'electronics', name: t('categories.electronics'), icon: '📱' },
    { id: 'fashion', name: t('categories.fashion'), icon: '👕' },
    { id: 'home', name: t('categories.home'), icon: '🏠' },
    { id: 'food', name: t('categories.food'), icon: '🍕' },
    { id: 'sports', name: t('categories.sports'), icon: '⚽' },
    { id: 'books', name: t('categories.books'), icon: '📚' },
    { id: 'beauty', name: t('categories.beauty'), icon: '💄' },
  ];

  const popularSearchTerms = [
    t('search.iphone'),
    t('search.macbook'),
    t('search.airpods'),
    t('search.gaming'),
    t('search.fashion'),
  ];

  // Detect mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

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
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handler functions with proper logging for debugging
  const handleCartClick = () => {
    console.log('Cart clicked!');
    setCurrentPage('cart');
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked!');
    setCurrentPage('wishlist');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked!');
    setShowNotifications(!showNotifications);
  };

  const handleDarkModeToggle = () => {
    console.log('Dark mode toggled!');
    toggleDarkMode();
  };

  const handleUserClick = () => {
    console.log('User menu clicked!');
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('user');
    }
    setCurrentPage('home');
    setShowUserMenu(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
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
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <a
                    href="tel:+885186323203"
                    className="inline hover:text-blue-300 transition-colors touch-manipulation"
                    aria-label="Call +885 186-323-203"
                  >
                    +885 186-323-203
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">thanseyha2002@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span className="hidden md:inline">{t('header.freeShippingFull')}</span>
                  <span className="md:hidden">{t('header.freeShippingShort')}</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <a
                    href="https://www.facebook.com/than.seyha.9235/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-blue-300 transition-colors touch-manipulation"
                  >
                    <Facebook className="w-4 h-4 cursor-pointer" />
                  </a>
                  <a
                    href="https://www.instagram.com/thanseyha_2002/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-pink-300 transition-colors touch-manipulation"
                  >
                    <Instagram className="w-4 h-4 cursor-pointer" />
                  </a>
                  <a
                    href="https://t.me/thanseyha11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-sky-300 transition-colors touch-manipulation"
                  >
                    <Send className="w-4 h-4 cursor-pointer" />
                  </a>
                  <a href="mailto:thanseyha2002@gmail.com" className="p-2 hover:text-green-300 transition-colors touch-manipulation">
                    <Mail className="w-4 h-4 cursor-pointer" />
                  </a>
                  <div className="mx-2 w-px h-4 bg-white/30"></div>
                  <LanguageSwitcher changeLanguage={changeLanguage} currentLanguage={currentLanguage} />
                </div>
                <div className="sm:hidden">
                  <LanguageSwitcher changeLanguage={changeLanguage} currentLanguage={currentLanguage} />
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
                  type="button"
                  className="lg:hidden p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px]"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="cursor-pointer group ml-2 touch-manipulation" onClick={() => setCurrentPage('home')}>
                  <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                    MODERNSTORE
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">{t('header.tagline')}</p>
                </div>
              </div>

              <div className="hidden md:flex flex-1 max-w-2xl mx-8">
                <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                  <div
                    className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                      isSearchFocused ? 'ring-2 ring-blue-500 shadow-lg' : 'ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600'
                    }`}
                  >
                    <input
                      type="text"
                      placeholder={t('search.placeholder')}
                      className="w-full px-6 py-3 pr-14 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all duration-300 text-sm touch-manipulation"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-110 cursor-pointer touch-manipulation min-w-[40px] min-h-[40px]"
                      onClick={() => setSearchQuery(searchQuery)}
                    >
                      <Search className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  {isSearchFocused && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-50">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('search.popular')}</div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearchTerms.map((term, index) => (
                          <button
                            key={index}
                            type="button"
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full text-sm transition-colors cursor-pointer touch-manipulation min-h-[36px]"
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

              {/* Desktop Action Icons */}
              <div className="hidden md:flex items-center space-x-2">
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <IconButton
                    onClick={handleNotificationClick}
                    badgeCount={notifications.length}
                    badgeColor="bg-red-500"
                    ariaLabel="View notifications"
                  >
                    <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600" />
                  </IconButton>
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-200">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.map((notification, index) => (
                            <div key={index} className="p-4 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  {notification.icon || <Bell className="w-5 h-5 text-blue-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-900 dark:text-gray-200">{notification.message}</p>
                                  {notification.time && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Wishlist */}
                <IconButton
                  onClick={handleWishlistClick}
                  badgeCount={wishlistItems.length}
                  badgeColor="bg-red-500"
                  ariaLabel="View wishlist"
                >
                  <Heart className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-red-500" />
                </IconButton>

                {/* Cart */}
                <IconButton
                  onClick={handleCartClick}
                  badgeCount={getTotalItems()}
                  badgeColor="bg-blue-500"
                  ariaLabel="View cart"
                >
                  <ShoppingCart className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600" />
                </IconButton>

                {/* Dark Mode Toggle */}
                <IconButton
                  onClick={handleDarkModeToggle}
                  ariaLabel={isDarkMode ? t('header.lightMode') : t('header.darkMode')}
                >
                  {isDarkMode ? (
                    <Sun className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-yellow-500" />
                  ) : (
                    <Moon className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-blue-600" />
                  )}
                </IconButton>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <IconButton onClick={handleUserClick} ariaLabel="User menu">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                      {isLoggedIn && user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <User
                        className="w-5 h-5 text-white"
                        style={{ display: isLoggedIn && user?.profileImage ? 'none' : 'flex' }}
                      />
                    </div>
                  </IconButton>

                  {showUserMenu && (
                      <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                        {isLoggedIn ? (
                          <>
                            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                                {user?.profileImage ? (
                                  <img
                                    src={user.profileImage}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.style.display = 'none';
                                      e.target.nextSibling.style.display = 'flex';
                                    }}
                                  />
                                ) : null}
                                <User
                                  className="w-6 h-6 text-white"
                                  style={{ display: user?.profileImage ? 'none' : 'flex' }}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {user?.name || t('user.defaultName')}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{user?.email || 'user@example.com'}</div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                              onClick={() => {
                                setCurrentPage('profile');
                                setShowUserMenu(false);
                              }}
                            >
                              {t('user.myAccount')}
                            </button>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                              onClick={() => {
                                setCurrentPage('orders');
                                setShowUserMenu(false);
                              }}
                            >
                              {t('user.orders')}
                            </button>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                              onClick={() => {
                                setCurrentPage('settings');
                                setShowUserMenu(false);
                              }}
                            >
                              {t('user.settings')}
                            </button>
                            <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
                              <button
                                type="button"
                                className="w-full text-left px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                                onClick={handleLogout}
                              >
                                {t('user.signOut')}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                              onClick={() => {
                                setCurrentPage('login');
                                setShowUserMenu(false);
                              }}
                            >
                              {t('user.signIn')}
                            </button>
                            <button
                              type="button"
                              className="w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px]"
                              onClick={() => {
                                setCurrentPage('login');
                                setShowUserMenu(false);
                              }}
                            >
                              {t('user.createAccount')}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>

          <nav className="border-t border-gray-100 dark:border-gray-700 py-4">
            <div className="flex items-center justify-between">
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  type="button"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer touch-manipulation min-h-[48px] ${
                    currentPage === 'about'
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                      : isDarkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setCurrentPage('about')}
                >
                  <span className="text-lg">ℹ️</span>
                  <span className="font-medium">{t('nav.about')}</span>
                </button>
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer touch-manipulation min-h-[48px] ${
                      showCategoriesDropdown
                        ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                        : isDarkMode
                        ? 'hover:bg-gray-800 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                  >
                    <span className="text-lg">🛍️</span>
                    <span className="font-medium">{t('nav.categories')}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showCategoriesDropdown && (
                    <div
                      className={`absolute left-0 top-full mt-2 w-64 rounded-2xl shadow-2xl border py-2 z-50 ${
                        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'
                      }`}
                    >
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          className={`flex items-center space-x-2 w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer touch-manipulation min-h-[48px] ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
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
                  type="button"
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-pointer touch-manipulation min-h-[48px] ${
                    currentPage === 'contact'
                      ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 shadow-md'
                      : isDarkMode
                      ? 'hover:bg-gray-800 text-gray-300'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setCurrentPage('contact')}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{t('nav.contact')}</span>
                </button>
              </div>
              <div className="hidden lg:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full">
                  <Gift className="w-4 h-4 text-orange-600" />
                  <span className="text-orange-700 font-medium">{t('header.specialOffers')}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4" />
                  <span>{t('header.worldwideShipping')}</span>
                </div>
              </div>
            </div>
          </nav>

          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search.mobilePlaceholder')}
                className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-sm rounded-xl touch-manipulation min-h-[48px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setIsMenuOpen(false)}>
            <div
              className="bg-white dark:bg-gray-900 w-full h-full animate-slide-in-right shadow-2xl overflow-y-auto"
              ref={mobileMenuRef}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {t('menu.title')}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t('menu.subtitle')}</p>
                  </div>
                  <button
                    type="button"
                    className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Quick Action Icons in Mobile Menu */}
                <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <button
                    type="button"
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer touch-manipulation min-h-[80px]"
                    onClick={() => {
                      handleCartClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="relative">
                      <ShoppingCart className="w-7 h-7 text-blue-600" />
                      {getTotalItems() > 0 && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {getTotalItems()}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Cart</span>
                  </button>

                  <button
                    type="button"
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer touch-manipulation min-h-[80px]"
                    onClick={() => {
                      handleWishlistClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="relative">
                      <Heart className="w-7 h-7 text-red-500" />
                      {wishlistItems.length > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {wishlistItems.length}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Wishlist</span>
                  </button>

                  <button
                    type="button"
                    className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all cursor-pointer touch-manipulation min-h-[80px]"
                    onClick={() => {
                      handleNotificationClick();
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="relative">
                      <Bell className="w-7 h-7 text-yellow-600" />
                      {notifications.length > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {notifications.length}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">Alerts</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 hover:scale-105 group cursor-pointer touch-manipulation min-h-[72px]"
                    onClick={() => {
                      setCurrentPage('about');
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                      ℹ️
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('nav.about')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.aboutDesc')}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 hover:scale-105 group cursor-pointer touch-manipulation min-h-[72px]"
                    onClick={() => {
                      setShowCategoriesDropdown(!showCategoriesDropdown);
                    }}
                  >
                    <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                      🛍️
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('nav.categories')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.categoriesDesc')}</div>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600" />
                  </button>

                  {showCategoriesDropdown && (
                    <div className="ml-6 space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 group cursor-pointer touch-manipulation min-h-[64px]"
                          onClick={() => {
                            setSelectedCategory(category.id);
                            setCurrentPage('products');
                            setIsMenuOpen(false);
                            setShowCategoriesDropdown(false);
                          }}
                        >
                          <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-10 h-10 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                            {category.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{category.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.browseCollection')}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 hover:scale-105 group cursor-pointer touch-manipulation min-h-[72px]"
                    onClick={() => {
                      setCurrentPage('contact');
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('nav.contact')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.contactDesc')}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 hover:scale-105 group cursor-pointer touch-manipulation min-h-[72px]"
                    onClick={() => {
                      setCurrentPage('help');
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('nav.help')}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.helpDesc')}</div>
                    </div>
                  </button>

                  {/* User Menu Options in Mobile Menu */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('menu.account')}</div>
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <button
                          type="button"
                          className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 group cursor-pointer touch-manipulation min-h-[72px]"
                          onClick={() => {
                            setCurrentPage('profile');
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center overflow-hidden">
                            {user?.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <User
                              className="w-6 h-6 text-white"
                              style={{ display: user?.profileImage ? 'none' : 'flex' }}
                            />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('user.myAccount')}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.name || t('user.defaultName')}</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-200 group cursor-pointer touch-manipulation min-h-[72px]"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                        >
                          <div className="text-2xl bg-red-100 dark:bg-red-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-700 transition-colors">
                            <X className="w-6 h-6 text-red-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-red-600 group-hover:text-red-700">{t('user.signOut')}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.signOutDesc')}</div>
                          </div>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 hover:scale-105 group cursor-pointer touch-manipulation min-h-[72px]"
                        onClick={() => {
                          setCurrentPage('login');
                          setIsMenuOpen(false);
                        }}
                      >
                        <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                          <User className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">{t('user.signIn')}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.signInDesc')}</div>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Dark Mode Toggle in Mobile Menu */}
                  <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('menu.preferences')}</div>
                    <button
                      type="button"
                      className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-200 group cursor-pointer touch-manipulation min-h-[72px]"
                      onClick={() => {
                        handleDarkModeToggle();
                        setIsMenuOpen(false);
                      }}
                    >
                      <div className="text-2xl bg-gray-100 dark:bg-gray-800 w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors">
                        {isDarkMode ? (
                          <Sun className="w-6 h-6 text-yellow-500" />
                        ) : (
                          <Moon className="w-6 h-6 text-blue-600" />
                        )}
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-gray-900 dark:text-gray-200 group-hover:text-blue-600">
                          {isDarkMode ? t('header.lightMode') : t('header.darkMode')}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{t('menu.themeDesc')}</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('menu.connect')}</div>
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://www.facebook.com/than.seyha.9235/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <Facebook className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </a>
                    <a
                      href="https://www.instagram.com/thanseyha_2002/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-800 transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <Instagram className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                    </a>
                    <a
                      href="https://t.me/thanseyha11"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-sky-100 dark:bg-sky-900 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-800 transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <Send className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </a>
                    <a
                      href="mailto:thanseyha2002@gmail.com"
                      className="p-3 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors cursor-pointer touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                    >
                      <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </a>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('menu.language')}</div>
                    <LanguageSwitcher changeLanguage={changeLanguage} currentLanguage={currentLanguage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Action Bar */}
      <MobileActionBar
        handleCartClick={handleCartClick}
        handleWishlistClick={handleWishlistClick}
        handleNotificationClick={handleNotificationClick}
        handleDarkModeToggle={handleDarkModeToggle}
        handleUserClick={handleUserClick}
        getTotalItems={getTotalItems}
        wishlistItems={wishlistItems}
        notifications={notifications}
        isDarkMode={isDarkMode}
        isLoggedIn={isLoggedIn}
        user={user}
        t={t}
      />

      {/* Notification Component */}
      {showNotifications && (
        <NotificationComponent
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
};

// PropTypes for better type checking
Header.propTypes = {
  currentPage: PropTypes.string,
  setCurrentPage: PropTypes.func,
  cartItems: PropTypes.array,
  wishlistItems: PropTypes.array,
  getTotalItems: PropTypes.func,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object,
  setIsLoggedIn: PropTypes.func,
  setUser: PropTypes.func,
  isDarkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
  notifications: PropTypes.array,
  t: PropTypes.func,
  changeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
};

LanguageSwitcher.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  badgeCount: PropTypes.number,
  badgeColor: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

MobileActionBar.propTypes = {
  handleCartClick: PropTypes.func.isRequired,
  handleWishlistClick: PropTypes.func.isRequired,
  handleNotificationClick: PropTypes.func.isRequired,
  handleDarkModeToggle: PropTypes.func.isRequired,
  handleUserClick: PropTypes.func.isRequired,
  getTotalItems: PropTypes.func.isRequired,
  wishlistItems: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.object,
  t: PropTypes.func.isRequired,
};

export default Header;