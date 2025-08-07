import React from 'react';
import PropTypes from 'prop-types';
import { Handshake, ArrowRight, ExternalLink, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { partners } from '../data/partners';

const EnhancedPartnersSection = ({ setCurrentPage, isDarkMode }) => {
  const { t } = useTranslation();

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View Details clicked');
    console.log('setCurrentPage function:', setCurrentPage);
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('partnerships');
      console.log('Called setCurrentPage with partnerships');
    } else {
      console.error('setCurrentPage is not a function');
    }
  };

  return (
    <section
      className={`py-20 bg-transparent relative overflow-hidden ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}
      style={{ fontFamily: "'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif" }}
    >
      <div
        className={`absolute w-96 h-96 rounded-full blur-3xl top-20 left-20 animate-pulse ${
          isDarkMode ? 'bg-blue-500/10' : 'bg-blue-300/20'
        }`}
      />
      <div
        className={`absolute w-72 h-72 rounded-full blur-3xl bottom-20 right-20 animate-pulse ${
          isDarkMode ? 'bg-purple-500/10' : 'bg-purple-300/20'
        }`}
      />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode
                ? 'bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent'
            }`}
          >
            {t('home.partners.title', { defaultValue: 'Our Trusted Partners' })}
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            {t('home.partners.subtitle', {
              defaultValue: 'We collaborate with industry leaders to deliver unparalleled value and innovation.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className={`relative group ${
                isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
              } backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
            >
              <div
                className={`absolute inset-0 ${
                  isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/10'
                } rounded-2xl animate-pulse pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="p-6 relative">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3
                  className={`text-xl font-semibold text-center mb-2 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-800'
                  }`}
                >
                  {partner.name}
                </h3>
                <p
                  className={`text-center mb-4 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  {t(partner.descriptionKey, {
                    defaultValue: partner.description || 'No description available',
                  })}
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    } transition-colors cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    onClick={() => window.open(partner.website, '_blank')}
                    type="button"
                    aria-label={t('home.partners.website', { defaultValue: 'Visit Website' })}
                  >
                    <ExternalLink size={20} />
                    <span>{t('home.partners.website', { defaultValue: 'Visit Website' })}</span>
                  </button>
                  <button
                    className={`flex items-center space-x-2 ${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
                    } transition-colors cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    onClick={handleViewDetails}
                    type="button"
                    aria-label={t('home.partners.viewDetails', { defaultValue: 'View Details' })}
                  >
                    <Eye size={20} />
                    <span>{t('home.partners.viewDetails', { defaultValue: 'View Details' })}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewDetails}
            className={`group ${
              isDarkMode
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
            } text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            type="button"
            aria-label={t('home.partners.viewAll', { defaultValue: 'Discover All Partners' })}
          >
            <span>{t('home.partners.viewAll', { defaultValue: 'Discover All Partners' })}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

EnhancedPartnersSection.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default React.memo(EnhancedPartnersSection);