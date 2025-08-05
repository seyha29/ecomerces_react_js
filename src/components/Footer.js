import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Send,
  Heart,
  Shield,
  Truck,
  CreditCard,
} from 'lucide-react';

const Footer = ({ setCurrentPage }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        footer {
          font-family: 'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif;
        }
      `}</style>

      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl -bottom-36 -right-36 animate-pulse" />
          <div className="absolute w-64 h-64 bg-pink-500 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        {/* Main Footer Content */}
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-4xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    MODERNSTORE
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {t('footer.brandDescription')}
                  </p>
                </div>
                {/* Contact Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center group cursor-pointer">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <a href="mailto:thanseyha2002@gmail.com" className="text-gray-300 group-hover:text-white transition-colors">
                      thanseyha2002@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <a href="tel:+88566675560" className="text-gray-300 group-hover:text-white transition-colors">
                      (+885) 66-675-560
                    </a>
                  </div>
                  <div className="flex items-center group cursor-pointer">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {t('footer.location')}
                    </span>
                  </div>
                </div>
                {/* Social Media */}
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/than.seyha.9235/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-blue-400 hover:bg-blue-400/20"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/thanseyha_2002/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-pink-400 hover:bg-pink-400/20"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://t.me/thanseyha11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-sky-400 hover:bg-sky-400/20"
                  >
                    <Send className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:thanseyha2002@gmail.com"
                    className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 cursor-pointer transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 hover:text-green-400 hover:bg-green-400/20"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
              {/* Customer Service */}
              <div>
                <h4 className="font-bold text-xl mb-6 text-white">{t('footer.customerCare.title')}</h4>
                <div className="space-y-3">
                  {t('footer.customerCare.items', { returnObjects: true }).map(({ text, page }, index) => (
                    <p
                      key={index}
                      onClick={() => page && setCurrentPage(page)}
                      className={`text-gray-400 cursor-pointer transition-all duration-300 hover:translate-x-2 hover:text-blue-400 ${
                        page ? 'font-medium' : ''
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
              {/* Company */}
              <div>
                <h4 className="font-bold text-xl mb-6 text-white">{t('footer.company.title')}</h4>
                <div className="space-y-3">
                  {t('footer.company.items', { returnObjects: true }).map(({ text, page }, index) => (
                    <p
                      key={index}
                      onClick={() => page && setCurrentPage(page)}
                      className={`text-gray-400 hover:text-white cursor-pointer transition-all duration-300 hover:translate-x-2 ${
                        page ? 'hover:text-purple-400' : 'hover:text-purple-400'
                      }`}
                    >
                      {text}
                    </p>
                  ))}
                </div>
              </div>
              {/* Newsletter */}
              <div>
                <h4 className="font-bold text-xl mb-6 text-white">{t('footer.newsletter.title')}</h4>
                <p className="text-gray-400 mb-6 leading-relaxed">{t('footer.newsletter.description')}</p>
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('footer.newsletter.emailPlaceholder')}
                      className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      onClick={handleSubscribe}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-110"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                  {isSubscribed && (
                    <p className="text-green-400 text-sm mt-2 animate-fade-in">
                      {t('footer.newsletter.successMessage')}
                    </p>
                  )}
                </div>
                {/* Trust Badges */}
                <div className="space-y-3">
                  {t('footer.newsletter.trustBadges', { returnObjects: true }).map(({ text }, index) => (
                    <div key={index} className="flex items-center text-gray-400">
                      {index === 0 ? <Shield className="w-4 h-4 mr-2 text-green-400" /> : <Heart className="w-4 h-4 mr-2 text-red-400" />}
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Trust Indicators */}
            <div className="border-t border-gray-700/50 pt-8 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {t('footer.trustIndicators', { returnObjects: true }).map(({ title, description }, index) => (
                  <div key={index} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
                      {index === 0 && <Truck className="w-6 h-6 text-blue-400" />}
                      {index === 1 && <Shield className="w-6 h-6 text-blue-400" />}
                      {index === 2 && <CreditCard className="w-6 h-6 text-blue-400" />}
                      {index === 3 && <Phone className="w-6 h-6 text-blue-400" />}
                    </div>
                    <div>
                      <h5 className="font-semibold text-white group-hover:text-blue-400 transition-colors">{title}</h5>
                      <p className="text-gray-400 text-sm">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom Section */}
            <div className="border-t border-gray-700/50 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-gray-400">
                    {t('footer.bottom.copyright')}
                    <span className="text-red-400 mx-2">❤️</span>
                    {t('footer.bottom.crafted')}
                  </p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex space-x-4 text-sm text-gray-400">
                    {t('footer.bottom.links', { returnObjects: true }).map(({ text }, index) => (
                      <span key={index} className="hover:text-white cursor-pointer transition-colors">
                        {text}
                      </span>
                    ))}
                  </div>
                  {/* Back to Top Button */}
                  <button
                    onClick={scrollToTop}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Footer;