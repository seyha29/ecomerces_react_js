import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Settings, Palette, Bell, Globe, ChevronUp, Save, Check } from 'lucide-react';

const SettingsPage = ({ 
  settings = {}, 
  setSettings, 
  smoothScrollToTop, 
  scrollToElement,
  isDarkMode,
  toggleDarkMode,
  changeLanguage,
  currentLanguage,
  t 
}) => {
  const { i18n } = useTranslation();

  // Initialize form data with proper fallbacks
  const [formData, setFormData] = useState({
    theme: settings.theme || (isDarkMode ? 'dark' : 'light'),
    notifications: settings.notifications !== undefined ? settings.notifications : true,
    language: settings.language || currentLanguage || 'en',
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update form data when external props change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      theme: isDarkMode ? 'dark' : 'light',
      language: currentLanguage || 'en'
    }));
  }, [isDarkMode, currentLanguage]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Apply changes immediately for better UX
    if (name === 'theme') {
      if (value === 'dark' && !isDarkMode) {
        toggleDarkMode();
      } else if (value === 'light' && isDarkMode) {
        toggleDarkMode();
      }
    }

    if (name === 'language' && value !== currentLanguage) {
      changeLanguage(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save settings
    if (setSettings) {
      setSettings(formData);
    }

    // Show success message
    setSaveStatus('success');
    setTimeout(() => setSaveStatus(''), 3000);

    // Smooth scroll to top after saving
    setTimeout(() => {
      if (smoothScrollToTop) {
        smoothScrollToTop();
      }
    }, 500);
  };

  const handleScrollToSection = (sectionId) => {
    if (scrollToElement) {
      scrollToElement(sectionId, 100);
    }
  };

  return (
    <div className={`container mx-auto px-4 py-8 min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('settings.title', 'Settings')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {t('settings.subtitle', 'Customize your experience and preferences')}
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => handleScrollToSection('theme-section')}
            className="px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 transition-all duration-200 hover:scale-105"
          >
            <Palette className="w-4 h-4 inline mr-2" />
            {t('settings.theme.label', 'Theme')}
          </button>
          <button
            onClick={() => handleScrollToSection('notifications-section')}
            className="px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 transition-all duration-200 hover:scale-105"
          >
            <Bell className="w-4 h-4 inline mr-2" />
            {t('settings.notifications.label', 'Notifications')}
          </button>
          <button
            onClick={() => handleScrollToSection('language-section')}
            className="px-4 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 transition-all duration-200 hover:scale-105"
          >
            <Globe className="w-4 h-4 inline mr-2" />
            {t('settings.language.label', 'Language')}
          </button>
        </div>

        {/* Settings Form */}
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-2xl shadow-xl p-8 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}>
            
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold">
                {t('settings.customize', 'Customize Your Experience')}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Theme Selection */}
              <div id="theme-section" className="space-y-4">
                <label className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xl font-medium">
                    {t('settings.theme.label', 'Theme')}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['light', 'dark', 'system'].map((theme) => (
                    <label key={theme} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={formData.theme === theme}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        formData.theme === theme
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-300'
                      }`}>
                        <div className="text-lg font-medium capitalize">
                          {t(`settings.theme.${theme}`, theme)}
                        </div>
                        {formData.theme === theme && (
                          <Check className="w-5 h-5 text-blue-500 mx-auto mt-2" />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notifications Toggle */}
              <div id="notifications-section" className="space-y-4">
                <label className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <Bell className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xl font-medium">
                    {t('settings.notifications.label', 'Notifications')}
                  </span>
                </label>
                <div className={`p-6 rounded-lg border ${
                  isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        {t('settings.notifications.push', 'Push Notifications')}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {t('settings.notifications.description', 'Get notified about orders, promotions, and updates')}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={formData.notifications}
                        onChange={handleInputChange}
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div id="language-section" className="space-y-4">
                <label className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xl font-medium">
                    {t('settings.language.label', 'Language')}
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { code: 'en', name: 'English', flag: '🇺🇸' },
                    { code: 'kh', name: 'ភាសាខ្មែរ', flag: '🇰🇭' }
                  ].map((lang) => (
                    <label key={lang.code} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="language"
                        value={lang.code}
                        checked={formData.language === lang.code}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        formData.language === lang.code
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-purple-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                          {formData.language === lang.code && (
                            <Check className="w-5 h-5 text-purple-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
                >
                  <Save className="w-5 h-5" />
                  <span>{t('settings.save', 'Save Settings')}</span>
                </button>
                
                {saveStatus === 'success' && (
                  <div className="mt-4 p-4 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>{t('settings.saveSuccess', 'Settings saved successfully!')}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Back to Top Button */}
        {showScrollTop && smoothScrollToTop && (
          <button
            onClick={smoothScrollToTop}
            className="fixed bottom-24 right-6 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 z-50"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

// Prop type validation
SettingsPage.propTypes = {
  settings: PropTypes.shape({
    theme: PropTypes.oneOf(['light', 'dark', 'system']),
    notifications: PropTypes.bool,
    language: PropTypes.oneOf(['en', 'kh']),
  }),
  setSettings: PropTypes.func,
  smoothScrollToTop: PropTypes.func,
  scrollToElement: PropTypes.func,
  isDarkMode: PropTypes.bool,
  toggleDarkMode: PropTypes.func,
  changeLanguage: PropTypes.func,
  currentLanguage: PropTypes.string,
  t: PropTypes.func,
};

// Default props
SettingsPage.defaultProps = {
  settings: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
  isDarkMode: false,
  currentLanguage: 'en',
  t: (key, fallback) => fallback || key,
};

export default SettingsPage;