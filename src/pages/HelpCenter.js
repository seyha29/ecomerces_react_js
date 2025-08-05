import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

const HelpCenter = ({ isDarkMode, setCurrentPage }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const [openFaq, setOpenFaq] = useState(null);

  // Access FAQs from translations
  const faqs = t('help.faq.items', { returnObjects: true });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      className={`py-32 min-h-screen ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'
      } relative overflow-hidden`}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-64 h-64 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Section header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <div className="inline-block mb-6">
              <div
                className={`flex items-center justify-center space-x-2 ${
                  isDarkMode ? 'bg-gray-800/80 text-white' : 'bg-white/80 text-gray-700'
                } backdrop-blur-md rounded-full px-6 py-3 border ${
                  isDarkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg`}
              >
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <span className="text-sm font-bold">{t('help.title')}</span>
              </div>
            </div>
            <h2
              className={`text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r ${
                isDarkMode ? 'from-gray-200 via-blue-400 to-purple-400' : 'from-gray-800 via-blue-600 to-purple-600'
              } bg-clip-text text-transparent leading-tight`}
            >
              {t('help.title')}
            </h2>
            <p
              className={`text-xl ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              } max-w-4xl mx-auto leading-relaxed font-light`}
            >
              {t('help.subtitle')}
            </p>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className={`mb-16 p-8 rounded-xl ${
              isDarkMode
                ? 'bg-gray-800/80 border-gray-700'
                : 'bg-white/80 border-gray-200'
            } backdrop-blur-md border shadow-lg`}
            variants={itemVariants}
          >
            <h3
              className={`text-2xl font-semibold mb-6 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {t('help.faq.title')}
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <button
                    className={`flex items-center justify-between w-full p-4 rounded-xl ${
                      isDarkMode
                        ? 'bg-gray-900/50 hover:bg-gray-700'
                        : 'bg-gray-100/50 hover:bg-gray-200'
                    } transition-all duration-200`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="flex items-center gap-3">
                      <FaQuestionCircle
                        className={`w-5 h-5 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}
                      />
                      <span
                        className={`text-left font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-900'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  {openFaq === index && (
                    <motion.div
                      className={`p-4 text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info and CTA */}
          <motion.div
            className={`flex flex-wrap gap-8 justify-center`}
            variants={itemVariants}
          >
            <div
              className={`flex-1 min-w-[300px] p-8 rounded-xl ${
                isDarkMode
                  ? 'bg-gray-800/80 border-gray-700'
                  : 'bg-white/80 border-gray-200'
              } backdrop-blur-md border shadow-lg`}
            >
              <h3
                className={`text-2xl font-semibold mb-6 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}
              >
                {t('help.contact.title')}
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <FaEnvelope
                    className={`w-6 h-6 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <div>
                    <h4
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {t('help.contact.email')}
                    </h4>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {t('help.contact.emailValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaPhone
                    className={`w-6 h-6 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <div>
                    <h4
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {t('help.contact.phone')}
                    </h4>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {t('help.contact.phoneValue')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt
                    className={`w-6 h-6 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}
                  />
                  <div>
                    <h4
                      className={`text-lg font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      {t('help.contact.location')}
                    </h4>
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {t('help.contact.locationValue')}
                    </p>
                  </div>
                </div>
              </div>
              <button
                className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-500 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white`}
                onClick={() => setCurrentPage('contact')}
              >
                <FaEnvelope className="w-5 h-5" />
                <span>{t('help.contact.contactUs')}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

HelpCenter.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default HelpCenter;