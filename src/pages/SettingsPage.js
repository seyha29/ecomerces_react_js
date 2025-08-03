import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Settings, Palette, Bell, Globe } from 'lucide-react';

const SettingsPage = ({ settings = {}, setSettings }) => {
  // Initialize form data with proper fallbacks
  const [formData, setFormData] = useState({
    theme: settings.theme || 'light',
    notifications: settings.notifications !== undefined ? settings.notifications : true,
    language: settings.language || 'en',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSettings(formData);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Customize Your Experience
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Theme Selection */}
            <div>
              <label className="flex items-center space-x-3">
                <Palette className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
              </label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            {/* Notifications Toggle */}
            <div>
              <label className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Notifications</span>
              </label>
              <div className="mt-2 flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="text-gray-600 dark:text-gray-400">
                  {formData.notifications ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-medium text-gray-700 dark:text-gray-300">Language</span>
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español (Spanish)</option>
                <option value="fr">Français (French)</option>
                <option value="de">Deutsch (German)</option>
                <option value="ja">日本語 (Japanese)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
SettingsPage.propTypes = {
  settings: PropTypes.shape({
    theme: PropTypes.oneOf(['light', 'dark', 'system']),
    notifications: PropTypes.bool,
    language: PropTypes.oneOf(['en', 'es', 'fr', 'de', 'ja']),
  }),
  setSettings: PropTypes.func.isRequired,
};

// Default props
SettingsPage.defaultProps = {
  settings: {
    theme: 'light',
    notifications: true,
    language: 'en',
  },
};

export default SettingsPage;