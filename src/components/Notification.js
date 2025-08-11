import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Bell, X, CheckCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';

const Notification = ({ 
  notifications = [], 
  clearNotification,
  autoClearTime = null, 
  toastAutoClear = true,
  isDarkMode = false 
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [toastNotifications, setToastNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Format timestamp to relative time or exact time
  const formatTimestamp = (createdAt) => {
    const now = Date.now();
    const diffMs = now - createdAt;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return t('notifications.time.justNow', 'Just now');
    if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? '' : 's'} ago`;
    if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? '' : 's'} ago`;

    const date = new Date(createdAt);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  // Show new notifications as toasts
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      
      const isAlreadyShown = toastNotifications.some(n => n.id === latestNotification.id);
      
      if (!isAlreadyShown) {
        setToastNotifications(prev => [...prev, latestNotification]);
        
        if (toastAutoClear) {
          setTimeout(() => {
            setToastNotifications(prev => prev.filter(n => n.id !== latestNotification.id));
          }, 4000);
        }
      }
    }
  }, [notifications, toastAutoClear, toastNotifications]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationStyles = (type) => {
    const baseStyles = 'border transition-all duration-300';
    
    if (isDarkMode) {
      switch (type) {
        case 'success':
          return `${baseStyles} bg-green-900/20 border-green-700 text-green-300`;
        case 'warning':
          return `${baseStyles} bg-yellow-900/20 border-yellow-700 text-yellow-300`;
        case 'info':
          return `${baseStyles} bg-blue-900/20 border-blue-700 text-blue-300`;
        case 'error':
          return `${baseStyles} bg-red-900/20 border-red-700 text-red-300`;
        default:
          return `${baseStyles} bg-gray-800 border-gray-600 text-gray-300`;
      }
    } else {
      switch (type) {
        case 'success':
          return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
        case 'warning':
          return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
        case 'info':
          return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
        case 'error':
          return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
        default:
          return `${baseStyles} bg-gray-50 border-gray-200 text-gray-800`;
      }
    }
  };

  const removeToast = (notificationId) => {
    setToastNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleClearNotification = (notificationId) => {
    if (clearNotification && typeof clearNotification === 'function') {
      clearNotification(notificationId);
    }
  };

  const handleClearAll = () => {
    if (clearNotification && typeof clearNotification === 'function') {
      notifications.forEach(notification => {
        clearNotification(notification.id);
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Bell Icon */}
      <div className="relative">
        <button
          className={`relative p-2 rounded-lg transition-all duration-200 ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-gray-300 hover:text-blue-400' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-blue-600'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6" />
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg">
              {notifications.length > 99 ? '99+' : notifications.length}
            </div>
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className={`absolute right-0 top-full mt-2 w-80 rounded-lg shadow-xl border z-50 max-h-96 overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className={`flex justify-between items-center p-4 border-b ${
              isDarkMode ? 'border-gray-600' : 'border-gray-100'
            }`}>
              <h3 className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Notifications
              </h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && clearNotification && (
                  <button
                    onClick={handleClearAll}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 font-medium transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors p-1 rounded ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-label="Close notifications"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className={`w-12 h-12 mx-auto mb-2 ${
                    isDarkMode ? 'text-gray-600' : 'text-gray-300'
                  }`} />
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    No notifications
                  </p>
                </div>
              ) : (
                <div className={`divide-y ${isDarkMode ? 'divide-gray-600' : 'divide-gray-100'}`}>
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors group relative ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {notification.icon || getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0 pr-8">
                          <p className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {notification.message}
                          </p>
                          <p className={`text-xs mt-1 ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(notification.createdAt)}
                          </p>
                        </div>
                        {clearNotification && (
                          <button
                            onClick={() => handleClearNotification(notification.id)}
                            className={`absolute top-3 right-3 p-1 rounded-full transition-all opacity-0 group-hover:opacity-100 ${
                              isDarkMode 
                                ? 'hover:bg-gray-600 text-gray-400 hover:text-gray-200' 
                                : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                            }`}
                            aria-label="Remove notification"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50 pointer-events-none">
        {toastNotifications.map((notification, index) => (
          <div
            key={`toast-${notification.id}`}
            className={`pointer-events-auto w-80 rounded-lg p-4 shadow-lg transform transition-all duration-300 ${getNotificationStyles(notification.type)} flex items-start space-x-3`}
            style={{
              transform: `translateY(-${index * 4}px)`,
            }}
          >
            {notification.icon || getNotificationIcon(notification.type)}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {notification.message}
              </p>
              <p className={`text-xs mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {formatTimestamp(notification.createdAt)}
              </p>
            </div>
            <button
              onClick={() => removeToast(notification.id)}
              className={`transition-colors p-1 rounded ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-200' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(['success', 'warning', 'info', 'error']).isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      icon: PropTypes.element,
    })
  ),
  clearNotification: PropTypes.func,
  autoClearTime: PropTypes.number,
  toastAutoClear: PropTypes.bool,
  isDarkMode: PropTypes.bool,
};

Notification.defaultProps = {
  notifications: [],
  clearNotification: null,
  autoClearTime: null,
  toastAutoClear: true,
  isDarkMode: false,
};

export default Notification;