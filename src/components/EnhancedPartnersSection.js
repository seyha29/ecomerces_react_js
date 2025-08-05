import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Handshake, ArrowRight, ExternalLink, Eye, Star, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { partners } from '../data/partners';

const EnhancedPartnersSection = ({ setCurrentPage }) => {
  const { t } = useTranslation();
  const [hoveredCard, setHoveredCard] = useState(null);

  // Debug function to test if setCurrentPage is working
  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('View Details clicked'); // Debug log
    console.log('setCurrentPage function:', setCurrentPage); // Check if function exists
    
    if (typeof setCurrentPage === 'function') {
      setCurrentPage('partnerships');
      console.log('Called setCurrentPage with partnerships'); // Confirm function call
    } else {
      console.error('setCurrentPage is not a function');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
            {t('home.partners.title', { defaultValue: 'Our Trusted Partners' })}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.partners.subtitle', {
              defaultValue: 'We collaborate with industry leaders to deliver unparalleled value and innovation.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                hoveredCard === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-12 object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
                  {partner.name}
                </h3>
                <p className="text-gray-600 text-center mb-4">{partner.description}</p>
                <div className="flex justify-center space-x-4">
                  <button
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    onClick={() => window.open(partner.website, '_blank')}
                    type="button"
                  >
                    <ExternalLink size={20} />
                    <span>{t('home.partners.website', { defaultValue: 'Visit Website' })}</span>
                  </button>
                  <button
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
                    onClick={handleViewDetails}
                    type="button"
                  >
                    <Eye size={20} />
                    <span>{t('home.partners.viewDetails', { defaultValue: 'View Details' })}</span>
                  </button>
                </div>
              </div>
              {hoveredCard === index && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleViewDetails}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 mx-auto cursor-pointer"
            type="button"
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
};

export default EnhancedPartnersSection;