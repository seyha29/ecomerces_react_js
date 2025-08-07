import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Handshake, ArrowRight, Star, Users, TrendingUp, Award, ExternalLink, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Partners data
export const partners = [
  {
    id: 1,
    name: 'TechFlow Innovations',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=60&fit=crop&crop=center',
    descriptionKey: 'partners.techflow.description',
    website: 'https://techflow-innovations.com',
    categoryKey: 'partners.categories.technology',
    rating: 4.9,
    projects: 150,
    founded: '2019',
    partnership_year: '2022',
    stats: { projects: 150, revenue: '$5M', satisfaction: 98 },
    tagKeys: ['partners.tags.ai', 'partners.tags.cloud', 'partners.tags.innovation'],
  },
  {
    id: 2,
    name: 'EcoVision Studios',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=150&h=60&fit=crop&crop=center',
    descriptionKey: 'partners.ecovision.description',
    website: 'https://ecovision-studios.com',
    categoryKey: 'partners.categories.design',
    rating: 4.8,
    projects: 200,
    founded: '2020',
    partnership_year: '2021',
    stats: { projects: 200, revenue: '$3.2M', satisfaction: 96 },
    tagKeys: ['partners.tags.sustainable', 'partners.tags.design', 'partners.tags.ecofriendly'],
  },
  {
    id: 3,
    name: 'Quantum Dynamics',
    logo: 'https://th.bing.com/th/id/OIP.-CZzN-X82D5ePMynueVxQQHaEB?w=310&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
    descriptionKey: 'partners.quantum.description',
    website: 'https://quantum-dynamics.com',
    categoryKey: 'partners.categories.science',
    rating: 5.0,
    projects: 75,
    founded: '2021',
    partnership_year: '2023',
    stats: { projects: 75, revenue: '$4.8M', satisfaction: 99 },
    tagKeys: ['partners.tags.quantum', 'partners.tags.computing', 'partners.tags.innovation'],
  },
  {
    id: 4,
    name: 'GreenTech Solutions',
    logo: 'https://th.bing.com/th/id/R.530e9452089ec18aedb9ec7acbe80d99?rik=DyTsJ4tr%2fg4XUA&pid=ImgRaw&r=0',
    descriptionKey: 'partners.greentech.description',
    website: 'https://greentech-solutions.com',
    categoryKey: 'partners.categories.cleanEnergy',
    rating: 4.7,
    projects: 15,
    founded: '2020',
    partnership_year: '2023',
    stats: { projects: 15, revenue: '$4.2M', satisfaction: 97 },
    tagKeys: ['partners.tags.sustainable', 'partners.tags.cleanEnergy', 'partners.tags.innovation'],
  },
];

const stats = [
  { icon: Users, value: '50+', labelKey: 'partners.stats.globalPartners', defaultValue: 'Global Partners' },
  { icon: TrendingUp, value: '$12M+', labelKey: 'partners.stats.combinedRevenue', defaultValue: 'Combined Revenue' },
  { icon: Award, value: '98%', labelKey: 'partners.stats.satisfactionRate', defaultValue: 'Satisfaction Rate' },
  { icon: Star, value: '4.9/5', labelKey: 'partners.stats.partnerRating', defaultValue: 'Partner Rating' },
];

const Partnerships = ({ setCurrentPage, isDarkMode }) => {
  const { t } = useTranslation();
  const [selectedPartner, setSelectedPartner] = React.useState(null);

  useEffect(() => {
    // Animation handled via CSS
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-900'
      }`}
      style={{ fontFamily: "'Noto Sans Khmer', 'Khmer OS', Arial, sans-serif" }}
    >
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-transparent text-gray-900'
        } py-24`}
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
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <div
              className={`inline-flex items-center ${
                isDarkMode ? 'bg-white/10' : 'bg-white/20'
              } backdrop-blur-sm rounded-full px-6 py-2 mb-6`}
            >
              <Handshake className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">
                {t('partners.collaborationLabel', { defaultValue: 'Collaboration' })}
              </span>
            </div>
            <h1
              className={`text-6xl font-bold mb-6 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent'
              }`}
            >
              {t('partners.title', { defaultValue: 'Our Partnerships' })}
            </h1>
            <p
              className={`text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('partners.subtitle', { defaultValue: 'Collaborating with industry leaders to drive innovation.' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className={`group ${
                  isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-gray-900 hover:bg-blue-50'
                } px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                onClick={() => setCurrentPage('contact')}
                aria-label={t('contact.getInTouch', { defaultValue: 'Get in Touch' })}
              >
                <span className="flex items-center justify-center">
                  {t('contact.getInTouch', { defaultValue: 'Get in Touch' })}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button
                className={`group bg-transparent border-2 ${
                  isDarkMode ? 'border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900' : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                } px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                onClick={() => document.getElementById('partners-section').scrollIntoView({ behavior: 'smooth' })}
                aria-label={t('partners.viewAll', { defaultValue: 'View All Partners' })}
              >
                <span className="flex items-center justify-center">
                  {t('partners.viewAll', { defaultValue: 'View All Partners' })}
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-transparent'} shadow-sm`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 ${
                    isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                  } rounded-2xl mb-4 mx-auto`}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t(stat.labelKey, { defaultValue: stat.defaultValue })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners-section" className="py-20 bg-transparent relative overflow-hidden">
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2
              className={`text-4xl font-bold mb-4 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent'
              }`}
            >
              {t('partners.title', { defaultValue: 'Our Partnerships' })}
            </h2>
            <p
              className={`text-xl max-w-2xl mx-auto ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('partners.subtitle', { defaultValue: 'Collaborating with industry leaders to drive innovation.' })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`absolute inset-0 ${
                    isDarkMode ? 'bg-blue-500/5' : 'bg-blue-500/5'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-16 w-auto object-contain rounded-xl shadow-md"
                      loading="lazy"
                    />
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? 'text-gray-400 bg-gray-700' : 'text-gray-500 bg-gray-100'
                        } px-3 py-1 rounded-full`}
                      >
                        {t(partner.categoryKey, { defaultValue: 'Category' })}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isDarkMode ? 'text-blue-400 bg-blue-900' : 'text-blue-600 bg-blue-100'
                        } px-3 py-1 rounded-full`}
                      >
                        {t('contact.partnershipSince', {
                          year: partner.partnership_year,
                          defaultValue: `Since ${partner.partnership_year}`,
                        })}
                      </span>
                    </div>
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      isDarkMode ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {partner.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 leading-relaxed ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {t(partner.descriptionKey, {
                      defaultValue: partner.description || 'No description available',
                    })}
                  </p>
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'
                    } flex items-center mb-6 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  >
                    {t('partners.visitWebsite', { defaultValue: 'Visit Website' })}
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {partner.tagKeys.map((tagKey, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`text-xs font-medium ${
                          isDarkMode ? 'text-purple-400 bg-purple-900' : 'text-purple-600 bg-purple-100'
                        } px-3 py-1 rounded-full`}
                      >
                        {t(tagKey, { defaultValue: 'Tag' })}
                      </span>
                    ))}
                  </div>
                  <div
                    className={`grid grid-cols-3 gap-4 mb-6 p-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    } rounded-2xl`}
                  >
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-900'
                        }`}
                      >
                        {partner.stats.projects}
                      </div>
                      <div
                        className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        {t('partners.projects', { defaultValue: 'Projects' })}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{partner.stats.revenue}</div>
                      <div
                        className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        {t('partners.revenue', { defaultValue: 'Revenue' })}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        {partner.stats.satisfaction}%
                      </div>
                      <div
                        className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      >
                        {t('partners.satisfaction', { defaultValue: 'Satisfaction' })}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`w-full group/btn ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    } text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    onClick={() => setSelectedPartner(partner)}
                    aria-label={t('partners.learnMore', { defaultValue: 'Learn More' })}
                  >
                    {t('partners.learnMore', { defaultValue: 'Learn More' })}
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className={`relative py-20 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-900'
        } overflow-hidden`}
      >
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl top-0 left-1/4 animate-pulse ${
            isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/20'
          }`}
        />
        <div
          className={`absolute w-96 h-96 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse ${
            isDarkMode ? 'bg-purple-500/10' : 'bg-purple-500/20'
          }`}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h2
              className={`text-5xl font-bold mb-6 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent'
              }`}
            >
              {t('partners.readyToJoin', { defaultValue: 'Ready to Join?' })}
            </h2>
            <p
              className={`text-xl mb-8 leading-relaxed ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              {t('partners.joinNetwork', { defaultValue: 'Join our network of innovators.' })}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                className={`group ${
                  isDarkMode ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white text-gray-900 hover:bg-gray-100'
                } px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                onClick={() => setCurrentPage('contact')}
                aria-label={t('partners.startPartnership', { defaultValue: 'Start a Partnership' })}
              >
                <span className="flex items-center justify-center">
                  <Handshake className="mr-3 w-6 h-6" />
                  {t('partners.startPartnership', { defaultValue: 'Start a Partnership' })}
                  <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span>
                  {t('partners.joinSuccess', {
                    count: 50,
                    defaultValue: 'Join 50+ partners succeeding with us',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Detail Modal */}
      {selectedPartner && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-labelledby="partner-modal-title"
          aria-modal="true"
        >
          <div
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3
                  id="partner-modal-title"
                  className={`text-3xl font-bold ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  {selectedPartner.name}
                </h3>
                <button
                  onClick={() => setSelectedPartner(null)}
                  className={`w-10 h-10 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  } rounded-full flex items-center justify-center transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                  aria-label={t('partners.closeModal', { defaultValue: 'Close' })}
                >
                  ×
                </button>
              </div>
              <img
                src={selectedPartner.logo}
                alt={selectedPartner.name}
                className="h-20 w-auto object-contain mb-6"
                loading="lazy"
              />
              <p
                className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {t(selectedPartner.descriptionKey, {
                  defaultValue: selectedPartner.description || 'No description available',
                })}
              </p>
              <a
                href={selectedPartner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:underline'
                } flex items-center mb-6 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {t('partners.visitWebsite', { defaultValue: 'Visit Website' })}
                <ExternalLink className="ml-1 w-4 h-4" />
              </a>
              <div className="space-y-4">
                <div>
                  <strong>{t('products.card.category', { defaultValue: 'Category' })}:</strong>{' '}
                  {t(selectedPartner.categoryKey, { defaultValue: 'Category' })}
                </div>
                <div>
                  <strong>
                    {t('contact.partnershipSince', { defaultValue: 'Since' })}:
                  </strong>{' '}
                  {selectedPartner.partnership_year}
                </div>
                <div>
                  <strong>{t('partners.projects', { defaultValue: 'Projects' })}:</strong>{' '}
                  {selectedPartner.stats.projects}
                </div>
                <div>
                  <strong>{t('partners.revenue', { defaultValue: 'Revenue' })}:</strong>{' '}
                  {selectedPartner.stats.revenue}
                </div>
                <div>
                  <strong>{t('partners.satisfaction', { defaultValue: 'Satisfaction' })}:</strong>{' '}
                  {selectedPartner.stats.satisfaction}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Partnerships.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default React.memo(Partnerships);