import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Bell, X } from 'lucide-react';

const Notification = ({ notifications = [] }) => {
  const defaultNotifications = [
    { id: 1, type: 'info', message: 'Welcome to our store!', time: new Date().toISOString(), createdAt: Date.now() },
  ];
  const notificationList = notifications.length > 0 ? notifications : defaultNotifications;
  const [isOpen, setIsOpen] = useState(false);
  const [visibleNotifications, setVisibleNotifications] = useState(notificationList);
  const dropdownRef = useRef(null);

  // Format timestamp to relative time or exact time
  const formatTimestamp = (createdAt) => {
    const now = Date.now();
    const diffMs = now - createdAt;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'Just now';
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
    }); // e.g., "12:57 AM, Aug 2, 2025"
  };

  // Update visibleNotifications when notifications prop changes
  useEffect(() => {
    setVisibleNotifications(notifications.length > 0 ? notifications : defaultNotifications);
    console.log('Notification component updated with:', notifications);
  }, [notifications]);

  // Auto-show new notifications as toasts
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[notifications.length - 1];
      if (latestNotification && !visibleNotifications.some(n => n.id === latestNotification.id)) {
        setVisibleNotifications(prev => [...prev, latestNotification]);
        setTimeout(() => {
          setVisibleNotifications(prev => prev.filter(n => n.id !== latestNotification.id));
        }, 7000); // Extended to 7 seconds for readability
      }
    }
  }, [notifications]);

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

  console.log('Notification component rendered with:', notificationList);

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

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600" />
        {notificationList.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 flex items-center justify-center font-bold shadow-lg animate-bounce">
            {notificationList.length}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 max-h-96 overflow-y-auto"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {notificationList.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No notifications</div>
          ) : (
            notificationList.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-3 mb-2 ${getNotificationStyles(notification.type)} flex items-start space-x-2`}
              >
                {notification.icon}
                <div>
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-gray-500">{formatTimestamp(notification.createdAt)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        {visibleNotifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`notification-toast w-80 border rounded-lg p-4 shadow-lg animate-slide-in-right ${getNotificationStyles(notification.type)} flex items-start space-x-2`}
            style={{ transform: `translateY(-${index * 100}px)` }} // Stack toasts vertically
          >
            {notification.icon}
            <div>
              <p className="text-sm font-medium">{notification.message}</p>
              <p className="text-xs text-gray-500">{formatTimestamp(notification.createdAt)}</p>
            </div>
            <button
              onClick={() => setVisibleNotifications(prev => prev.filter(n => n.id !== notification.id))}
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Notification.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.oneOf(['success', 'warning', 'info']).isRequired,
      message: PropTypes.string.isRequired,
      time: PropTypes.string,
      createdAt: PropTypes.number.isRequired,
      icon: PropTypes.element,
    })
  ),
};

export default Notification;