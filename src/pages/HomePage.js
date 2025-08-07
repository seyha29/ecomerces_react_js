import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
  ArrowRight,
  Zap,
  Award,
  Users,
  Heart,
  Eye,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  Gift,
  Clock,
} from 'lucide-react';
import EnhancedPartnersSection from '../components/EnhancedPartnersSection';
import Partnerships from '../components/Partnerships';

// Utility to escape HTML entities
const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// ProductCard component - Enhanced with dark mode support
const ProductCard = ({ product, addToCart, toggleWishlist, wishlistItems, setSelectedProduct, t, isDarkMode }) => {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    console.log('ProductCard translations:', {
      addToCart: t('home.products.addToCart'),
      quickView: t('home.products.quickView'),
      wishlist: t('home.products.wishlist'),
      inStock: t('home.products.inStock'),
      outOfStock: t('home.products.outOfStock'),
      new: t('home.products.new'),
      bestseller: t('home.products.bestseller'),
      limited: t('home.products.limited'),
      secure: t('home.products.secure'),
      fastShip: t('home.products.fastShip'),
      support24h: t('home.products.support24h'),
      compare: t('home.products.compare'),
      share: t('home.products.share'),
      categoryLabel: t('home.products.categoryLabel'),
      save: t('home.products.save'),
      monthlyPayment: t('home.products.monthlyPayment'),
    });
  }, [t]);

  const productData = {
    rating: 4.5,
    reviews: 127,
    originalPrice: product.price ? product.price * 1.2 : 99,
    discount: 15,
    inStock: true,
    isNew: Math.random() > 0.7,
    isBestseller: Math.random() > 0.8,
    isLimitedEdition: Math.random() > 0.9,
    ...product,
  };

  const isInWishlist = wishlistItems.find((item) => item.id === productData.id);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(productData);
    setTimeout(() => setIsAddingToCart(false), 1200);
  };

  const handleQuickView = () => {
    setSelectedProduct(productData);
  };

  return (
    <div
      className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:shadow-gray-700/50' 
          : 'bg-white border-gray-200'
      }`}
      style={{
        fontFamily: "'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif",
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={productData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'}
          alt={escapeHtml(productData.name || t('home.products.title', { defaultValue: 'Product Name' }))}
          className={`w-full h-64 object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setImageLoaded(true)}
        />

        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {productData.discount > 0 && (
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
              <span className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                -{productData.discount}%
              </span>
            </div>
          )}
          {productData.isNew && (
            <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
              <span className="flex items-center">
                <Sparkles className="w-3 h-3 mr-1" />
                {t('home.products.new', { defaultValue: 'NEW' })}
              </span>
            </div>
          )}
          {productData.isBestseller && (
            <div className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
              <span className="flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {t('home.products.bestseller', { defaultValue: 'BESTSELLER' })}
              </span>
            </div>
          )}
          {productData.isLimitedEdition && (
            <div className="bg-purple-500 text-white px-2 py-1 rounded text-sm font-medium">
              <span className="flex items-center">
                <Gift className="w-3 h-3 mr-1" />
                {t('home.products.limited', { defaultValue: 'LIMITED' })}
              </span>
            </div>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button
            onClick={() => toggleWishlist(productData)}
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 text-gray-300 hover:text-red-400' 
                  : 'bg-white text-gray-600 hover:text-red-500'
            }`}
            title={t('home.products.wishlist', { defaultValue: 'Wishlist' })}
            aria-label={t('home.products.wishlist', { defaultValue: 'Wishlist' })}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleQuickView}
            className={`p-2 rounded-full shadow-md transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:text-blue-400' 
                : 'bg-white text-gray-600 hover:text-blue-500'
            }`}
            title={t('home.products.quickView', { defaultValue: 'Quick View' })}
            aria-label={t('home.products.quickView', { defaultValue: 'Quick View' })}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h3 className={`font-semibold text-lg mb-1 line-clamp-2 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            {escapeHtml(productData.name || t('home.products.title', { defaultValue: 'Product Name' }))}
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('home.products.categoryLabel', { defaultValue: 'Electronics • Premium Collection' })}
          </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(productData.rating) ? 'text-yellow-400 fill-current' : isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{productData.rating}</span>
            <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>({productData.reviews})</span>
          </div>
          <div className={`flex items-center text-sm font-medium ${productData.inStock ? 'text-green-600' : 'text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${productData.inStock ? 'bg-green-600' : 'bg-red-600'}`} />
            {productData.inStock
              ? t('home.products.inStock', { defaultValue: 'In Stock' })
              : t('home.products.outOfStock', { defaultValue: 'Out of Stock' })}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-baseline space-x-2">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                ${productData.price || 299}
              </span>
              {productData.originalPrice > productData.price && (
                <span className={`text-sm line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>${productData.originalPrice}</span>
              )}
            </div>
            {productData.originalPrice > productData.price && (
              <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                {t('home.products.save', { amount: (productData.originalPrice - productData.price).toFixed(0), defaultValue: `Save $${(productData.originalPrice - productData.price).toFixed(0)}` })}
              </div>
            )}
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('home.products.monthlyPayment', { price: ((productData.price || 299) / 12).toFixed(0), defaultValue: `or $${((productData.price || 299) / 12).toFixed(0)}/month • 0% APR` })}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!productData.inStock || isAddingToCart}
          className={`w-full py-3 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2 mb-3 ${
            !productData.inStock
              ? `${isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'} cursor-not-allowed`
              : isAddingToCart
              ? 'bg-blue-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          aria-label={isAddingToCart ? t('home.products.addingToCart', { defaultValue: 'Adding to Cart' }) : t('home.products.addToCart', { defaultValue: 'Add to Cart' })}
        >
          {isAddingToCart ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t('home.products.addingToCart', { defaultValue: 'Adding to Cart' })}</span>
            </>
          ) : !productData.inStock ? (
            <span>{t('home.products.outOfStock', { defaultValue: 'Out of Stock' })}</span>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>{t('home.products.addToCart', { defaultValue: 'Add to Cart' })}</span>
            </>
          )}
        </button>

        <div className="flex space-x-2">
          <button
            className={`flex-1 py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm ${
              isDarkMode 
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                : 'text-gray-700 hover:text-black hover:bg-gray-100'
            }`}
            aria-label={t('home.products.compare', { defaultValue: 'Compare' })}
          >
            {t('home.products.compare', { defaultValue: 'Compare' })}
          </button>
          <button
            className={`flex-1 py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm ${
              isDarkMode 
                ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700' 
                : 'text-gray-700 hover:text-black hover:bg-gray-100'
            }`}
            aria-label={t('home.products.share', { defaultValue: 'Share' })}
          >
            {t('home.products.share', { defaultValue: 'Share' })}
          </button>
        </div>

        <div className={`flex items-center justify-between mt-3 pt-3 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-100'
        }`}>
          <div className="flex items-center space-x-3 text-xs">
            <div className="flex items-center text-green-600">
              <Shield className="w-3 h-3 mr-1" />
              <span>{t('home.products.secure', { defaultValue: 'Secure' })}</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Truck className="w-3 h-3 mr-1" />
              <span>{t('home.products.fastShip', { defaultValue: 'Fast Ship' })}</span>
            </div>
            <div className="flex items-center text-orange-600">
              <Clock className="w-3 h-3 mr-1" />
              <span>{t('home.products.support24h', { defaultValue: '24h' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    brand: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    warranty: PropTypes.string,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

// Mock products data (unchanged)
const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max Ultra',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 2847,
    brand: 'Apple',
    description: 'The most advanced iPhone ever with revolutionary A17 Pro chip.',
    features: ['A17 Pro chip', '48MP ProRAW Camera', '6.7-inch Super Retina XDR'],
    warranty: '2-year',
    originalPrice: 1499,
    discount: 13,
  },
  {
    id: 2,
    name: 'MacBook Pro M3 Max',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 1523,
    brand: 'Apple',
    description: 'Ultimate performance laptop for creative professionals.',
    features: ['M3 Max chip', '32GB RAM', '16-inch Liquid Retina XDR'],
    warranty: '2-year',
    originalPrice: 3499,
    discount: 14,
  },
  {
    id: 3,
    name: 'AirPods Pro 2nd Gen',
    price: 279,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 3891,
    brand: 'Apple',
    description: 'Next-level noise cancellation meets spatial audio.',
    features: ['Adaptive Transparency', 'Spatial Audio', 'USB-C Charging'],
    warranty: '1-year',
    originalPrice: 329,
    discount: 15,
  },
  {
    id: 4,
    name: 'Apple Watch Ultra 2',
    price: 849,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 956,
    brand: 'Apple',
    description: 'Built for the most demanding adventures.',
    features: ['Titanium Case', 'Double Tap Gesture', '49mm Display'],
    warranty: '2-year',
    originalPrice: 999,
    discount: 15,
  },
  {
    id: 5,
    name: 'iPad Pro M2 12.9"',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 734,
    brand: 'Apple',
    description: 'The ultimate iPad experience with M2 performance.',
    features: ['M2 chip', 'Liquid Retina XDR', 'Apple Pencil Hover'],
    warranty: '1-year',
    originalPrice: 1399,
    discount: 14,
  },
  {
    id: 6,
    name: 'Studio Display 5K',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 428,
    brand: 'Apple',
    description: '5K Retina display with studio-quality camera.',
    features: ['5K Resolution', '12MP Ultra Wide', 'Spatial Audio'],
    warranty: '1-year',
    originalPrice: 1999,
    discount: 15,
  },
];

// HomePage component
const HomePage = ({
  addToCart,
  toggleWishlist,
  wishlistItems,
  setSelectedProduct,
  setCurrentPage,
  t,
  isDarkMode,
}) => {
  const { i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    console.log('HomePage translations:', {
      hero: t('home.hero', { returnObjects: true }),
      products: t('home.products', { returnObjects: true }),
      stats: t('home.stats', { returnObjects: true }),
      partners: t('home.partners', { returnObjects: true }),
      features: t('home.features', { returnObjects: true }),
      newsletter: t('home.newsletter', { returnObjects: true }),
    });
  }, [t]);

  const sliderImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=600&fit=crop',
      gradient: 'from-blue-600/20 via-purple-600/20 to-pink-600/20',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1400&h=600&fit=crop',
      gradient: 'from-emerald-600/20 via-teal-600/20 to-cyan-600/20',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&h=600&fit=crop',
      gradient: 'from-purple-600/20 via-pink-600/20 to-red-600/20',
    },
  ];

  const statsIcons = [Users, Award, Zap, Star];
  const statsGradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, [sliderImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, [sliderImages.length]);

  const slides = t('home.hero.slides', { returnObjects: true, defaultValue: [] });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
      style={{ fontFamily: "'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif" }}
      lang={i18n.language}
    >
      {/* Hero Section */}
      <section ref={heroRef} className="pt-16 relative h-[700px] overflow-hidden">
        <div className="absolute inset-0 animate-pulse" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div
          className="flex transition-transform duration-1000 ease-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {sliderImages.map((slide, index) => (
            <div key={slide.id} className="min-w-full h-full relative">
              <img
                src={slide.image}
                alt={escapeHtml(slides[index]?.title || t('home.hero.slide', { defaultValue: 'Slide' }))}
                className="w-full h-full object-cover brightness-75 transition-transform duration-1000"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(1.1)`,
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-opacity duration-500`} />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-5xl">
                  <div className="mb-6 inline-block">
                    <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-4">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {slides[index]?.collectionLabel || t('home.hero.collectionLabel', { defaultValue: 'Collection' })}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl leading-tight">
                    {slides[index]?.title || t('home.hero.title', { defaultValue: 'Default Title' })}
                  </h2>
                  <p className="text-xl md:text-3xl mb-10 text-gray-200 drop-shadow-lg font-light leading-relaxed">
                    {slides[index]?.subtitle || t('home.hero.subtitle', { defaultValue: 'Default Subtitle' })}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => setCurrentPage('products')}
                      className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-110 shadow-2xl backdrop-blur-md"
                      aria-label={slides[index]?.buttonText || t('home.hero.explore', { defaultValue: 'Explore' })}
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <span>{slides[index]?.buttonText || t('home.hero.explore', { defaultValue: 'Explore' })}</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </button>
                    <button
                      className="bg-white/10 backdrop-blur-md text-white px-12 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-xl border border-white/20"
                      aria-label={t('home.hero.watchDemo', { defaultValue: 'Watch Demo' })}
                    >
                      <span className="flex items-center justify-center space-x-3">
                        <Play className="w-6 h-6" />
                        <span>{t('home.hero.watchDemo', { defaultValue: 'Watch Demo' })}</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
          aria-label={t('home.hero.prevSlide', { defaultValue: 'Previous Slide' })}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-xl border border-white/30 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-2xl"
          aria-label={t('home.hero.nextSlide', { defaultValue: 'Next Slide' })}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="relative group"
              aria-label={t('home.hero.goToSlide', { number: index + 1, defaultValue: `Go to slide ${index + 1}` })}
            >
              <div
                className={`w-16 h-3 rounded-full transition-all duration-500 ${
                  index === currentSlide ? 'bg-gradient-to-r from-blue-400 to-purple-400 shadow-lg' : 'bg-white/30 hover:bg-white/60'
                }`}
              />
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse shadow-lg" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-24 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {t('home.stats', { returnObjects: true, defaultValue: [] }).map((stat, index) => {
              const IconComponent = statsIcons[index];
              const gradientClass = statsGradients[index];

              return (
                <div key={index} className="group cursor-pointer">
                  <div
                    className={`bg-gradient-to-br ${gradientClass} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div
                    className={`text-5xl font-black mb-3 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}
                  >
                    {stat.number || t(`home.stats.${index}.number`, { defaultValue: 'N/A' })}
                  </div>
                  <div className={`font-semibold text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {stat.label || t(`home.stats.${index}.label`, { defaultValue: 'Stat' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className={`py-32 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="absolute inset-0">
          <div className={`absolute w-96 h-96 rounded-full blur-3xl top-20 left-20 animate-pulse ${
            isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
          }`} />
          <div className={`absolute w-72 h-72 rounded-full blur-3xl bottom-20 right-20 animate-pulse ${
            isDarkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
          }`} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className={`flex items-center justify-center space-x-2 rounded-full px-6 py-3 border ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/20 backdrop-blur-md' 
                  : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 backdrop-blur-md'
              }`}>
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span className={`text-sm font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {t('home.products.curatedLabel', { defaultValue: 'Curated Excellence' })}
                </span>
              </div>
            </div>
            <h2 className={`text-6xl md:text-7xl font-black mb-8 leading-tight ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-100 via-blue-300 to-purple-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {t('home.products.title', { defaultValue: 'Featured Products' })}
            </h2>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed font-light ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('home.products.subtitle', {
                defaultValue:
                  'Handpicked masterpieces. Each product represents the absolute pinnacle of design, innovation, and craftsmanship in its category.',
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlistItems={wishlistItems}
                setSelectedProduct={setSelectedProduct}
                t={t}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => setCurrentPage('products')}
              className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-16 py-5 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl"
              aria-label={t('home.products.viewAll', { defaultValue: 'View All Products' })}
            >
              <span className="flex items-center space-x-3">
                <span>{t('home.products.viewAll', { defaultValue: 'View All Products' })}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Partners Section (using EnhancedPartnersSection) */}
      <EnhancedPartnersSection setCurrentPage={setCurrentPage} />

      {/* Features Section */}
      <section className={`py-32 relative overflow-hidden ${
        isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
      }`}>
        <div className="absolute inset-0">
          <div className={`absolute w-80 h-80 rounded-full blur-3xl top-10 left-10 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-blue-400/10 to-purple-400/10' : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
          }`} />
          <div className={`absolute w-64 h-64 rounded-full blur-3xl bottom-10 right-10 animate-pulse ${
            isDarkMode ? 'bg-gradient-to-r from-pink-400/10 to-red-400/10' : 'bg-gradient-to-r from-pink-400/20 to-red-400/20'
          }`} />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <div className={`flex items-center justify-center space-x-2 rounded-full px-6 py-3 border shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800/50 backdrop-blur-md border-gray-700' 
                  : 'bg-white/50 backdrop-blur-md border-gray-200'
              }`}>
                <Shield className="w-5 h-5 text-green-500" />
                <span className={`text-sm font-bold ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  {t('home.features.experienceLabel', { defaultValue: 'Premium Experience' })}
                </span>
              </div>
            </div>
            <h2 className={`text-6xl md:text-7xl font-black mb-8 leading-tight ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-100 via-blue-300 to-purple-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              {t('home.features.title', { defaultValue: 'Why Choose Us?' })}
            </h2>
            <p className={`text-xl max-w-4xl mx-auto leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('home.features.subtitle', {
                defaultValue: 'We don\'t just sell products – we deliver experiences that transcend expectations and redefine excellence.',
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t('home.features.items', { returnObjects: true, defaultValue: [] }).map((feature, index) => {
              const FeatureIcon = [Truck, Shield, RefreshCw][index];
              const featureGradients = [
                isDarkMode ? 'from-gray-800 to-gray-700' : 'from-blue-50 to-cyan-50',
                isDarkMode ? 'from-gray-800 to-gray-700' : 'from-emerald-50 to-green-50',
                isDarkMode ? 'from-gray-800 to-gray-700' : 'from-purple-50 to-pink-50',
              ];
              const iconGradients = [
                'from-blue-500 to-cyan-500',
                'from-emerald-500 to-green-500',
                'from-purple-500 to-pink-500',
              ];

              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${featureGradients[index]} border backdrop-blur-xl p-10 rounded-3xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 group cursor-pointer relative overflow-hidden ${
                    isDarkMode 
                      ? 'border-gray-700 hover:shadow-gray-700/50' 
                      : 'border-white/50'
                  }`}
                >
                  <div className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-80 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-gray-700/60 to-gray-600/40' 
                      : 'bg-gradient-to-br from-white/60 to-white/40'
                  }`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-1 h-1 bg-gradient-to-r ${iconGradients[index]} rounded-full animate-bounce`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div
                      className={`bg-gradient-to-r ${iconGradients[index]} w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl`}
                    >
                      <FeatureIcon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className={`text-3xl font-black mb-6 transition-all duration-500 ${
                      isDarkMode 
                        ? 'text-gray-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-300 group-hover:to-purple-300 group-hover:bg-clip-text'
                        : 'text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text'
                    }`}>
                      {feature.title || t(`home.features.items.${index}.title`, { defaultValue: 'Feature' })}
                    </h3>
                    <p className={`leading-relaxed text-lg font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {feature.description || t(`home.features.items.${index}.description`, { defaultValue: 'Description' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={`py-32 relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white' 
          : 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white'
      }`}>
        <div className="absolute inset-0">
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
          <div className="absolute w-80 h-80 bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
          <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {[...Array(144)].map((_, i) => (
              <div key={i} className="border border-white/10 animate-pulse" style={{ animationDelay: `${i * 50}ms` }} />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block mb-8">
            <div className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-bold">
                {t('home.newsletter.accessLabel', { defaultValue: 'Exclusive Access' })}
              </span>
            </div>
          </div>

          <h2 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            {t('home.newsletter.title', { defaultValue: 'Stay Ahead of Tomorrow' })}
          </h2>
          <p className="text-xl mb-16 max-w-4xl mx-auto text-gray-300 leading-relaxed font-light">
            {t('home.newsletter.subtitle', {
              defaultValue: 'Join our exclusive inner circle. Get early access to revolutionary products, insider deals, and trend forecasts that shape the future.',
            })}
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <input
                type="email"
                placeholder={t('home.newsletter.emailPlaceholder', { defaultValue: 'Enter your email to unlock the future' })}
                className="flex-1 px-8 py-5 rounded-xl bg-white/10 text-white backdrop-blur-sm placeholder-white/60 focus:outline-none focus:ring-4 focus:ring-blue-500/50 font-medium text-lg border border-white/20"
                aria-label={t('home.newsletter.emailPlaceholder', { defaultValue: 'Enter your email to unlock the future' })}
              />
              <button
                className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-5 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-2xl"
                aria-label={t('home.newsletter.subscribe', { defaultValue: 'Subscribe Now' })}
              >
                {t('home.newsletter.subscribe', { defaultValue: 'Subscribe Now' })}
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-4">
              {t('home.newsletter.trustText', { defaultValue: 'Join 2.5M+ innovators who trust us with their inbox' })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

HomePage.propTypes = {
  addToCart: PropTypes.func.isRequired,
  toggleWishlist: PropTypes.func.isRequired,
  wishlistItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default HomePage;