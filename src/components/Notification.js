import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Bell, X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Notification = ({ notifications = [], onClearNotification, autoClearTime = null, toastAutoClear = true }) => {
  const { t } = useTranslation(); // Hook to access translation function
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
    if (diffMin < 60)
      return t('notifications.time.minutesAgo', '{{count}} minute{{plural}} ago').replace(
        '{{count}}',
        diffMin
      ).replace('{{plural}}', diffMin === 1 ? '' : 's');
    if (diffHr < 24)
      return t('notifications.time.hoursAgo', '{{count}} hour{{plural}} ago').replace(
        '{{count}}',
        diffHr
      ).replace('{{plural}}', diffHr === 1 ? '' : 's');

    const date = new Date(createdAt);
    return date.toLocaleString(t('notifications.locale', 'en-US'), {
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
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  // Auto-clear old notifications from dropdown (DISABLED - notifications stay forever)
  useEffect(() => {
    // Completely disabled auto-clearing for dropdown notifications
    // They will only be cleared manually by user action
    return;
  }, [notifications, autoClearTime, onClearNotification]);

  // Show new notifications as toasts
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      
      // Check if this notification is already shown as toast
      const isAlreadyShown = toastNotifications.some(n => n.id === latestNotification.id);
      
      if (!isAlreadyShown) {
        setToastNotifications(prev => [...prev, latestNotification]);
        
        // Auto-remove toast only if toastAutoClear is enabled
        if (toastAutoClear) {
          const timeoutId = setTimeout(() => {
            setToastNotifications(prev => prev.filter(n => n.id !== latestNotification.id));
          }, 3000); // 3 seconds for toast auto-clear
          
          // Store timeout ID for cleanup if needed
          latestNotification.timeoutId = timeoutId;
        }
      }
    }
  }, [notifications, toastAutoClear]);

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
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const removeToast = (notificationId) => {
    setToastNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  return (
    <>
      {/* Bell Icon */}
      <div className="relative">
        <button
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('notifications.ariaLabel', 'Notifications')}
        >
          <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
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
            className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">{t('notifications.title', 'Notifications')}</h3>
              <div className="flex items-center space-x-2">
                {notifications.length > 0 && onClearNotification && (
                  <button
                    onClick={() => {
                      notifications.forEach(n => onClearNotification(n.id));
                      setIsOpen(false); // Close dropdown after clearing all
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 font-medium transition-colors"
                  >
                    {t('notifications.clearAll', 'Clear All')}
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={t('notifications.close', 'Close notifications')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>{t('notifications.empty', 'No notifications')}</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 transition-colors group relative"
                    >
                      <div className="flex items-start space-x-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0 pr-8">
                          <p className="text-sm text-gray-900 font-medium">
                            {notification.messageKey
                              ? t(`notifications.messages.${notification.messageKey}`, notification.message)
                              : notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTimestamp(notification.createdAt)}
                          </p>
                        </div>
                        {onClearNotification && (
                          <button
                            onClick={() => onClearNotification(notification.id)}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-all opacity-70 hover:opacity-100"
                            aria-label={t('notifications.remove', 'Remove notification')}
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
            className={`pointer-events-auto w-80 border rounded-lg p-4 shadow-lg transform transition-all duration-300 ease-out ${getNotificationStyles(notification.type)} flex items-start space-x-3`}
            style={{
              transform: `translateY(-${index * 4}px)`,
            }}
          >
            {getNotificationIcon(notification.type)}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {notification.messageKey
                  ? t(`notifications.messages.${notification.messageKey}`, notification.message)
                  : notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(notification.createdAt)}
              </p>
            </div>
            <button
              onClick={() => removeToast(notification.id)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={t('notifications.dismiss', 'Dismiss notification')}
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
      type: PropTypes.oneOf(['success', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
      messageKey: PropTypes.string, // Optional key for predefined messages
      createdAt: PropTypes.number.isRequired,
    })
  ),
  onClearNotification: PropTypes.func,
  autoClearTime: PropTypes.number,
  toastAutoClear: PropTypes.bool,
};

Notification.defaultProps = {
  notifications: [],
  onClearNotification: null,
  autoClearTime: null, // DISABLED - dropdown notifications stay forever
  toastAutoClear: true, // ENABLED - toast popups auto-clear after 3 seconds
};

export default Notification;