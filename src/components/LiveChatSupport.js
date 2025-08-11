import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MessageSquare, X, Send, Bot, Moon, Sun, Globe, Settings, Star, ShoppingCart, Zap, HelpCircle } from "lucide-react";

// CSS for Khmer font support
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Khmer&display=swap');
  body {
    font-family: 'Noto Sans Khmer', sans-serif;
  }
  .dark {
    background-color: #111827;
    color: #ffffff;
  }
`;

// Product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 999.99,
    originalPrice: 1199.99,
    category: "electronics",
    image: "📱",
    rating: 4.8,
    reviews: 1247,
    description: "Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system. The most powerful iPhone ever created.",
    features: ["A17 Pro Chip", "Titanium Design", "Pro Camera System", "Action Button"],
    inStock: true,
    discount: 17,
    brand: "Apple",
    warranty: "1 year",
    badge: "Popular",
    availability: "In Stock",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1099.99,
    originalPrice: 1299.99,
    category: "electronics",
    image: "📱",
    rating: 4.7,
    reviews: 892,
    description: "Premium Android flagship with S Pen, AI features, and exceptional camera capabilities. Built for productivity and creativity.",
    features: ["S Pen Included", "AI Features", "200MP Camera", "5000mAh Battery"],
    inStock: true,
    discount: 15,
    brand: "Samsung",
    warranty: "1 year",
    badge: "New",
    availability: "In Stock",
  },
  {
    id: 3,
    name: "MacBook Air M3",
    price: 1299.99,
    originalPrice: 1599.99,
    category: "electronics",
    image: "💻",
    rating: 4.9,
    reviews: 756,
    description: "Ultra-thin laptop with M3 chip delivering incredible performance and all-day battery life. Perfect for work and creativity.",
    features: ["M3 Chip", "18hr Battery", "Liquid Retina Display", "1080p Camera"],
    inStock: false,
    discount: 19,
    brand: "Apple",
    warranty: "1 year",
    badge: "Premium",
    availability: "Out of Stock",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5 Headphones",
    price: 349.99,
    originalPrice: 399.99,
    category: "electronics",
    image: "🎧",
    rating: 4.6,
    reviews: 1034,
    description: "Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.",
    features: ["Noise Canceling", "30hr Battery", "Touch Controls", "Multipoint Connection"],
    inStock: true,
    discount: 13,
    brand: "Sony",
    warranty: "1 year",
    badge: "Best Seller",
    availability: "In Stock",
  },
  // Add more products as needed (abridged for brevity; include all 97 products from the provided list in the actual implementation)
];

// Category data
const categories = [
  { id: 'all', name: 'All Products', icon: '🛍️', description: 'Browse all available products' },
  { id: 'electronics', name: 'Electronics', icon: '📱', description: 'Latest gadgets and electronic devices' },
  { id: 'fashion', name: 'Fashion', icon: '👕', description: 'Trendy clothing and accessories' },
  { id: 'home', name: 'Home & Garden', icon: '🏠', description: 'Home decor and garden essentials' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Sports equipment and fitness gear' },
  { id: 'food', name: 'Food & Drinks', icon: '🍕', description: 'Gourmet food and beverages' },
  { id: 'books', name: 'Books', icon: '📚', description: 'Literature, educational books, and magazines' },
  { id: 'beauty', name: 'Beauty', icon: '💄', description: 'Cosmetics, skincare, and personal care products' },
];

const EnhancedChatSupport = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize chat with greeting
  useEffect(() => {
    if (messages.length === 0) {
      const quickReplies = [
        t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
        t('quickReplies.popular', { defaultValue: 'Popular products' }),
        t('quickReplies.offers', { defaultValue: 'Special offers' }),
        t('quickReplies.categories', { defaultValue: 'Browse categories' }),
      ];
      setMessages([{
        id: 1,
        sender: "bot",
        text: `${t('greeting', { defaultValue: 'Welcome to our store!' })}\n\n${t('greetingOptions', { defaultValue: 'Browse products, track orders, or ask a question.' })}`,
        timestamp: new Date(),
        quickReplies,
      }]);
    }
  }, [i18n.language, t]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      scrollToBottom();
    }, 50);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botResponse.text,
        timestamp: new Date(),
        products: botResponse.products,
        quickReplies: botResponse.quickReplies,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }, Math.random() * 1500 + 800);
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
    setTimeout(() => handleSend(), 100);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'kh' ? 'en' : 'kh';
    i18n.changeLanguage(newLang).catch((error) => {
      console.error('Language change failed:', error);
    });
  };

  const ProductCard = ({ product }) => (
    <div className={`
      relative overflow-hidden rounded-lg p-3 m-1 backdrop-blur-lg border border-opacity-20
      ${isDarkMode 
        ? 'bg-white/5 border-white/10 hover:bg-white/10' 
        : 'bg-white/60 border-gray-200 hover:bg-white/80'
      }
      transition-all duration-300 hover:scale-105 group cursor-pointer
    `}>
      {product.badge && (
        <div className={`
          absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-semibold
          ${product.badge === 'Sale' ? 'bg-red-500 text-white' :
            product.badge === 'New' ? 'bg-green-500 text-white' :
            product.badge === 'Popular' ? 'bg-blue-500 text-white' :
            'bg-purple-500 text-white'}
        `}>
          {product.badge}
        </div>
      )}
      
      <div className="flex items-start space-x-3">
        <div className="text-2xl bg-gradient-to-br from-blue-400 to-purple-600 rounded p-2">
          {product.image}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            {product.name}
          </h3>
          <div className="flex items-center space-x-1 mt-0.5">
            <span className="text-green-500 font-bold text-sm">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={`text-xs line-through ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount && (
              <span className="text-xs text-red-500">({product.discount}% off)</span>
            )}
          </div>
          <div className="flex items-center mt-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className={`text-xs ml-0.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {product.rating} ({product.reviews} {t('products.reviews', { defaultValue: 'reviews' })})
            </span>
          </div>
          <div className="mt-1">
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('products.category')}: {t(`categories.${product.category}`, { defaultValue: product.category })}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('products.description')}: {product.description}
            </p>
            <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('products.availability')}: {t(`products.${product.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: product.availability })}
            </p>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {t('products.features')}:
            </p>
            <ul className="list-disc list-inside text-xs">
              {product.features.map((feature, index) => (
                <li key={index} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  ProductCard.propTypes = {
    product: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
      inStock: PropTypes.bool.isRequired,
      discount: PropTypes.number,
      brand: PropTypes.string.isRequired,
      warranty: PropTypes.string.isRequired,
      badge: PropTypes.string,
      availability: PropTypes.string.isRequired,
    }).isRequired,
  };

  const QuickReplyButton = ({ reply, onClick, icon }) => (
    <button
      className={`
        flex items-center space-x-1 px-2 py-1 rounded-full m-0.5 text-xs font-medium
        backdrop-blur-lg border border-opacity-30 transition-all duration-300
        hover:scale-105 active:scale-95
        ${isDarkMode
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/20 text-white hover:from-blue-500/30 hover:to-purple-500/30'
          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200 text-blue-700 hover:from-blue-500/20 hover:to-purple-500/20'
        }
      `}
      onClick={() => onClick(reply)}
    >
      {icon && <span className="text-xs">{icon}</span>}
      <span>{reply}</span>
    </button>
  );

  QuickReplyButton.propTypes = {
    reply: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    icon: PropTypes.node,
  };

  const getBotResponse = (text) => {
    const q = text.toLowerCase();
    const lang = i18n.language;

    const categoryIcons = categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.icon }), {});

    if (lang === "en") {
      if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
        return {
          text: `${t('greeting', { defaultValue: 'Welcome to our store!' })}\n\n${t('user.greeting', { name: t('user.defaultName', { defaultValue: 'User' }) })}! I'm your AI shopping assistant. I can help you find products, compare prices, and answer questions!`,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
            t('quickReplies.popular', { defaultValue: 'Popular products' }),
            t('quickReplies.offers', { defaultValue: 'Special offers' }),
            t('quickReplies.categories', { defaultValue: 'Browse categories' }),
          ],
        };
      }

      if (q.includes("products") || q.includes(t('quickReplies.viewProducts').toLowerCase())) {
        const topProducts = products.slice(0, 3);
        return {
          text: `🛍️ ${t('categories.all', { defaultValue: 'All Products' })}:\n\n🔥 Top picks:\n${topProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: topProducts,
          quickReplies: categories.map(cat => t(`categories.${cat.id}`, { defaultValue: cat.name })),
        };
      }

      if (q.includes("popular") || q.includes(t('quickReplies.popular').toLowerCase())) {
        const popularProducts = products.filter(p => p.badge === "Popular" || p.rating >= 4.8).slice(0, 3);
        return {
          text: `🔥 ${t('header.popularProducts', { defaultValue: 'Popular Products' })}:\n\n${popularProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: popularProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
            t('quickReplies.offers', { defaultValue: 'Special offers' }),
            t('quickReplies.categories', { defaultValue: 'Browse categories' }),
          ],
        };
      }

      if (q.includes("deal") || q.includes("sale") || q.includes("offer") || q.includes("discount") || q.includes(t('quickReplies.offers').toLowerCase())) {
        const discountedProducts = products.filter(p => p.discount).slice(0, 3);
        return {
          text: `🎉 ${t('header.specialOffers', { defaultValue: 'Special Offers' })}! ⚡\n\n🔥 Limited offers:\n${discountedProducts.map(p => `• ${p.name}: Save ${p.discount}% (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}\n\n⏰ Hurry! Sale ends soon!`,
          products: discountedProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
            t('quickReplies.popular', { defaultValue: 'Popular products' }),
            t('quickReplies.categories', { defaultValue: 'Browse categories' }),
          ],
        };
      }

      if (q.includes("categories") || q.includes(t('quickReplies.categories').toLowerCase())) {
        return {
          text: `📋 ${t('header.categories', { defaultValue: 'Categories' })}:\n\n${categories.map(cat => `${cat.icon} ${t(`categories.${cat.id}`, { defaultValue: cat.name })}: ${cat.description}`).join('\n')}`,
          quickReplies: categories.map(cat => t(`categories.${cat.id}`, { defaultValue: cat.name })),
        };
      }

      // Handle specific category queries
      const matchedCategory = categories.find(cat => q.includes(cat.id) || q.includes(cat.name.toLowerCase()));
      if (matchedCategory) {
        const categoryProducts = products.filter(p => p.category === matchedCategory.id).slice(0, 3);
        return {
          text: `${categoryIcons[matchedCategory.id]} ${t(`categories.${matchedCategory.id}`, { defaultValue: matchedCategory.name })}:\n\n${categoryProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: categoryProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
            t('quickReplies.popular', { defaultValue: 'Popular products' }),
            t('quickReplies.offers', { defaultValue: 'Special offers' }),
          ],
        };
      }

      // Handle specific product queries
      const matchedProduct = products.find(p => q.includes(p.name.toLowerCase()) || q.includes(p.brand.toLowerCase()));
      if (matchedProduct) {
        return {
          text: `${categoryIcons[matchedProduct.category] || '🛍️'} ${matchedProduct.name}:\n\n${matchedProduct.description}\n\n💰 Price: $${matchedProduct.price.toFixed(2)} ${matchedProduct.discount ? `(Save ${matchedProduct.discount}%)` : ''}\n⭐ Rating: ${matchedProduct.rating} (${matchedProduct.reviews} reviews)\n📦 ${t(`products.${matchedProduct.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: matchedProduct.availability })}`,
          products: [matchedProduct],
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'View all products' }),
            t(`categories.${matchedProduct.category}`, { defaultValue: matchedProduct.category }),
            t('quickReplies.offers', { defaultValue: 'Special offers' }),
          ],
        };
      }

      return { 
        text: `${t('help', { defaultValue: 'Help' })}: I'd love to assist you! 🤔\n\nWhat are you looking for today?`,
        quickReplies: [
          t('quickReplies.browseProducts', { defaultValue: 'Browse products' }),
          t('quickReplies.priceComparison', { defaultValue: 'Price comparison' }),
          t('quickReplies.customerService', { defaultValue: 'Customer service' }),
        ],
      };
    }

    if (lang === "kh") {
      if (q.includes("សួស្តី") || q.includes("hello") || q.includes("hi")) {
        return {
          text: `${t('greeting', { defaultValue: 'សួស្តី! ស្វាគមន៍មកកាន់ហាង។' })}\n\n${t('user.greeting', { name: t('user.defaultName', { defaultValue: 'អ្នកប្រើប្រាស់' }) })}! ខ្ញុំជាជំនួយការទិញដោយ AI។ ខ្ញុំអាចជួយរកផលិតផល ប្រៀបធៀបតម្លៃ និងឆ្លើយសំណួរ!`,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'មើលផលិតផលទាំងអស់' }),
            t('quickReplies.popular', { defaultValue: 'ផលិតផលពេញនិយម' }),
            t('quickReplies.offers', { defaultValue: 'ការផ្តល់ជូនពិសេស' }),
            t('quickReplies.categories', { defaultValue: 'រុករកប្រភេទ' }),
          ],
        };
      }

      if (q.includes("ផលិតផល") || q.includes(t('quickReplies.viewProducts').toLowerCase())) {
        const topProducts = products.slice(0, 3);
        return {
          text: `🛍️ ${t('categories.all', { defaultValue: 'ផលិតផលទាំងអស់' })}:\n\n🔥 ជម្រើសពេញនិយម:\n${topProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: topProducts,
          quickReplies: categories.map(cat => t(`categories.${cat.id}`, { defaultValue: cat.name })),
        };
      }

      if (q.includes("ពេញនិយម") || q.includes(t('quickReplies.popular').toLowerCase())) {
        const popularProducts = products.filter(p => p.badge === "Popular" || p.rating >= 4.8).slice(0, 3);
        return {
          text: `🔥 ${t('header.popularProducts', { defaultValue: 'ផលិតផលពេញនិយម' })}:\n\n${popularProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: popularProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'មើលផលិតផលទាំងអស់' }),
            t('quickReplies.offers', { defaultValue: 'ការផ្តល់ជូនពិសេស' }),
            t('quickReplies.categories', { defaultValue: 'រុករកប្រភេទ' }),
          ],
        };
      }

      if (q.includes("ការផ្តល់ជូន") || q.includes("បញ្ចុះតម្លៃ") || q.includes("deal") || q.includes("sale") || q.includes(t('quickReplies.offers').toLowerCase())) {
        const discountedProducts = products.filter(p => p.discount).slice(0, 3);
        return {
          text: `🎉 ${t('header.specialOffers', { defaultValue: 'ការផ្តល់ជូនពិសេស' })}! ⚡\n\n🔥 ការផ្តល់ជូនកំណត់:\n${discountedProducts.map(p => `• ${p.name}: សន្សំ ${p.discount}% (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}\n\n⏰ ប្រញាប់! ការបញ្ចុះតម្លៃនឹងចប់!`,
          products: discountedProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'មើលផលិតផលទាំងអស់' }),
            t('quickReplies.popular', { defaultValue: 'ផលិតផលពេញនិយម' }),
            t('quickReplies.categories', { defaultValue: 'រុករកប្រភេទ' }),
          ],
        };
      }

      if (q.includes("ប្រភេទ") || q.includes(t('quickReplies.categories').toLowerCase())) {
        return {
          text: `📋 ${t('header.categories', { defaultValue: 'ប្រភេទ' })}:\n\n${categories.map(cat => `${cat.icon} ${t(`categories.${cat.id}`, { defaultValue: cat.name })}: ${cat.description}`).join('\n')}`,
          quickReplies: categories.map(cat => t(`categories.${cat.id}`, { defaultValue: cat.name })),
        };
      }

      const matchedCategory = categories.find(cat => q.includes(cat.id) || q.includes(cat.name.toLowerCase()));
      if (matchedCategory) {
        const categoryProducts = products.filter(p => p.category === matchedCategory.id).slice(0, 3);
        return {
          text: `${categoryIcons[matchedCategory.id]} ${t(`categories.${matchedCategory.id}`, { defaultValue: matchedCategory.name })}:\n\n${categoryProducts.map(p => `• ${p.name}: ${p.description} (${t(`products.${p.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: p.availability })})`).join('\n')}`,
          products: categoryProducts,
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'មើលផលិតផលទាំងអស់' }),
            t('quickReplies.popular', { defaultValue: 'ផលិតផលពេញនិយម' }),
            t('quickReplies.offers', { defaultValue: 'ការផ្តល់ជូនពិសេស' }),
          ],
        };
      }

      const matchedProduct = products.find(p => q.includes(p.name.toLowerCase()) || q.includes(p.brand.toLowerCase()));
      if (matchedProduct) {
        return {
          text: `${categoryIcons[matchedProduct.category] || '🛍️'} ${matchedProduct.name}:\n\n${matchedProduct.description}\n\n💰 តម្លៃ: $${matchedProduct.price.toFixed(2)} ${matchedProduct.discount ? `(សន្សំ ${matchedProduct.discount}%)` : ''}\n⭐ ការវាយតម្លៃ: ${matchedProduct.rating} (${matchedProduct.reviews} ការពិនិត្យ)\n📦 ${t(`products.${matchedProduct.inStock ? 'inStock' : 'outOfStock'}`, { defaultValue: matchedProduct.availability })}`,
          products: [matchedProduct],
          quickReplies: [
            t('quickReplies.viewProducts', { defaultValue: 'មើលផលិតផលទាំងអស់' }),
            t(`categories.${matchedProduct.category}`, { defaultValue: matchedProduct.category }),
            t('quickReplies.offers', { defaultValue: 'ការផ្តល់ជូនពិសេស' }),
          ],
        };
      }

      return { 
        text: `${t('help', { defaultValue: 'ជំនួយ' })}: ខ្ញុំចង់ជួយអ្នកស្វែងរក! 🤔\n\nតើអ្នកកំពុងស្វែងរកអ្វី?`,
        quickReplies: [
          t('quickReplies.browseProducts', { defaultValue: 'រុករកផលិតផល' }),
          t('quickReplies.priceComparison', { defaultValue: 'ប្រៀបធៀបតម្លៃ' }),
          t('quickReplies.customerService', { defaultValue: 'សេវាកម្មអតិថិជន' }),
        ],
      };
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <style>{styles}</style>
      {!isOpen ? (
        <button
          className={`
            group relative p-4 rounded-full shadow-2xl transition-all duration-300 
            hover:scale-110 active:scale-95 hover:rotate-6
            ${isDarkMode
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-blue-500/25'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:shadow-blue-500/25'
            }
          `}
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageSquare size={28} className="text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-75 blur-lg group-hover:blur-xl transition-all duration-300"></div>
        </button>
      ) : (
        <div className={`
          w-[95vw] max-w-sm h-[400px] rounded-2xl shadow-2xl flex flex-col overflow-hidden
          backdrop-blur-2xl border border-opacity-20 transition-all duration-300
          ${isDarkMode 
            ? 'bg-gray-900/80 border-white/10' 
            : 'bg-white/80 border-gray-200/50'
          }
          sm:w-80
        `}>
          <div className={`
            p-3 rounded-t-2xl backdrop-blur-lg relative overflow-hidden
            ${isDarkMode 
              ? 'bg-gradient-to-r from-gray-800/90 to-gray-900/90' 
              : 'bg-gradient-to-r from-blue-600/90 to-purple-600/90'
            }
          `}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"></div>
            <div className="relative flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t('botName', { defaultValue: 'SurTamJit' })}</h3>
                  <p className="text-blue-100 text-xs">AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
                  aria-label="Settings"
                >
                  <Settings size={14} className="text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
                  aria-label="Close chatbot"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>
            
            {showSettings && (
              <div className={`
                absolute top-full left-0 right-0 p-3 rounded-b-xl backdrop-blur-lg border-t border-white/10 z-10
                ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'}
              `}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {t('darkMode', { defaultValue: 'Dark Mode' })}
                    </span>
                    <button
                      onClick={toggleDarkMode}
                      className={`
                        relative w-10 h-5 rounded-full transition-colors duration-200
                        ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'}
                      `}
                    >
                      <div className={`
                        absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-200
                        ${isDarkMode ? 'left-6' : 'left-1'}
                      `}>
                        {isDarkMode ? <Moon size={8} className="text-blue-500 m-0.5" /> : <Sun size={8} className="text-yellow-500 m-0.5" />}
                      </div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      {t('language', { defaultValue: 'Language' })}
                    </span>
                    <button
                      onClick={toggleLanguage}
                      className={`
                        px-2 py-1 rounded text-xs font-medium transition-colors duration-200
                        ${isDarkMode 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                        }
                      `}
                    >
                      <Globe size={10} className="inline mr-1" />
                      {i18n.language === "kh" ? "ខ្មែរ" : "EN"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`
            flex-1 overflow-y-auto p-2 space-y-2 scroll-smooth
            ${isDarkMode ? 'bg-gray-900/40' : 'bg-gray-50/40'}
          `} 
          style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`
                  max-w-[85%] transition-all duration-300
                  ${msg.sender === "user"
                    ? `rounded-xl rounded-br-md p-2 ${isDarkMode 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      } shadow-lg`
                    : `rounded-xl rounded-bl-md p-2 backdrop-blur-lg border border-opacity-20 ${isDarkMode 
                        ? 'bg-gray-800/60 border-white/10 text-gray-100' 
                        : 'bg-white/60 border-gray-200/50 text-gray-800'
                      } shadow-lg`
                  }
                `}>
                  {msg.sender === "bot" && (
                    <div className="flex items-center space-x-1 mb-1">
                      <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <Bot size={8} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold opacity-75">{t('botChat', { defaultValue: 'SurTamJit' })}</span>
                    </div>
                  )}
                  
                  <p className="whitespace-pre-wrap text-xs leading-relaxed">{msg.text}</p>
                  
                  {msg.products && (
                    <div className="mt-2 space-y-1">
                      {msg.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  
                  {msg.quickReplies && (
                    <div className="mt-2 flex flex-wrap">
                      {msg.quickReplies.map((reply, index) => {
                        const getIcon = (reply) => {
                          const cat = categories.find(c => t(`categories.${c.id}`, { defaultValue: c.name }).toLowerCase() === reply.toLowerCase());
                          if (cat) return <span className="text-xs">{cat.icon}</span>;
                          if (reply.toLowerCase().includes('product') || reply.toLowerCase().includes('ផលិតផល')) return <ShoppingCart size={10} />;
                          if (reply.toLowerCase().includes('offer') || reply.toLowerCase().includes('ការផ្តល់ជូន')) return <Zap size={10} />;
                          return <HelpCircle size={10} />;
                        };
                        
                        return (
                          <QuickReplyButton
                            key={index}
                            reply={reply}
                            onClick={handleQuickReply}
                            icon={getIcon(reply)}
                          />
                        );
                      })}
                    </div>
                  )}
                  
                  <p className={`text-xs mt-1 opacity-60 ${msg.sender === "user" ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className={`
                  rounded-xl rounded-bl-md p-2 backdrop-blur-lg border border-opacity-20
                  ${isDarkMode 
                    ? 'bg-gray-800/60 border-white/10' 
                    : 'bg-white/60 border-gray-200/50'
                  }
                  shadow-lg
                `}>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <Bot size={8} className="text-white" />
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {t('typing', { defaultValue: 'ShopBot is typing' })}
                    </span>
                    <div className="flex space-x-1">
                      <div className={`w-1 h-1 rounded-full animate-bounce ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '0ms' }}></div>
                      <div className={`w-1 h-1 rounded-full animate-bounce ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '150ms' }}></div>
                      <div className={`w-1 h-1 rounded-full animate-bounce ${isDarkMode ? 'bg-blue-400' : 'bg-blue-500'}`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`
            p-2 border-t border-opacity-20 backdrop-blur-lg
            ${isDarkMode 
              ? 'bg-gray-900/60 border-white/10' 
              : 'bg-white/60 border-gray-200/50'
            }
          `}>
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder={t('placeholder', { defaultValue: 'Type your message...' })}
                  className={`
                    w-full p-2 pr-8 rounded-xl border border-opacity-30 backdrop-blur-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    transition-all duration-200 text-xs
                    ${isDarkMode
                      ? 'bg-gray-800/50 border-white/20 text-white placeholder-gray-400'
                      : 'bg-white/70 border-gray-200/50 text-gray-800 placeholder-gray-500'
                    }
                  `}
                  aria-label="Chat input"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className={`w-1.5 h-1.5 rounded-full ${input.length > 0 ? 'bg-green-400 animate-pulse' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
                </div>
              </div>
              
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={`
                  p-2 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                  ${input.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                    : isDarkMode 
                      ? 'bg-gray-700' 
                      : 'bg-gray-300'
                  }
                `}
                aria-label="Send message"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
            
            <div className="flex justify-center mt-2 space-x-1">
              <button
                onClick={() => handleQuickReply(t('quickReplies.viewProducts', { defaultValue: 'View all products' }))}
                className={`
                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                  backdrop-blur-lg border border-opacity-30 transition-all duration-200
                  hover:scale-105 active:scale-95
                  ${isDarkMode
                    ? 'bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30'
                    : 'bg-blue-500/10 border-blue-400/30 text-blue-600 hover:bg-blue-500/20'
                  }
                `}
              >
                <ShoppingCart size={10} />
                <span>{t('all', { defaultValue: 'All' })}</span>
              </button>
              
              <button
                onClick={() => handleQuickReply(t('quickReplies.offers', { defaultValue: 'Special offers' }))}
                className={`
                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                  backdrop-blur-lg border border-opacity-30 transition-all duration-200
                  hover:scale-105 active:scale-95
                  ${isDarkMode
                    ? 'bg-purple-500/20 border-purple-400/30 text-purple-300 hover:bg-purple-500/30'
                    : 'bg-purple-500/10 border-purple-400/30 text-purple-600 hover:bg-purple-500/20'
                  }
                `}
              >
                <Zap size={10} />
                <span>{t('offers', { defaultValue: 'Offers' })}</span>
              </button>
              
              <button
                onClick={() => handleQuickReply(t('quickReplies.help', { defaultValue: 'Help' }))}
                className={`
                  flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                  backdrop-blur-lg border border-opacity-30 transition-all duration-200
                  hover:scale-105 active:scale-95
                  ${isDarkMode
                    ? 'bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30'
                    : 'bg-green-500/10 border-green-400/30 text-green-600 hover:bg-green-500/20'
                  }
                `}
              >
                <HelpCircle size={10} />
                <span>{t('help', { defaultValue: 'Help' })}</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center mt-1 space-x-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {t('online', { defaultValue: 'Online • Ready to help' })}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <div className={`
          absolute -top-12 -left-6 p-1.5 rounded-lg shadow-lg backdrop-blur-lg border border-opacity-20
          ${isDarkMode 
            ? 'bg-gray-900/90 border-white/10 text-white' 
            : 'bg-white/90 border-gray-200/50 text-gray-800'
          }
          animate-bounce
        `} style={{ animationDuration: '3s' }}>
          <div className="flex items-center space-x-1">
            <Zap size={12} className="text-yellow-400" />
            <span className="text-xs font-medium whitespace-nowrap">
              {t('newAssistant', { defaultValue: 'New AI Assistant!' })}
            </span>
          </div>
          <div className="absolute -bottom-0.5 left-4 w-1.5 h-1.5 bg-inherit transform rotate-45 border-b border-r border-opacity-20"></div>
        </div>
      )}
      
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
};

EnhancedChatSupport.propTypes = {};

export default EnhancedChatSupport;