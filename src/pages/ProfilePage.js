import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { User, Camera } from 'lucide-react';
import './LoginPage.css';

const ProfilePage = ({ user, setUser, setIsLoggedIn, setCurrentPage }) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profileImage: user?.profileImage || '',
    password: '',
    confirmPassword: '',
  });
  const [imagePreview, setImagePreview] = useState(user?.profileImage || '');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      profileImage: user?.profileImage || '',
      password: '',
      confirmPassword: '',
    });
    setImagePreview(user?.profileImage || '');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors((prev) => ({ ...prev, profileImage: t('profile.error.invalidImage') }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, profileImage: t('profile.error.imageSize') }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setImagePreview(imageUrl);
        setFormData((prev) => ({ ...prev, profileImage: imageUrl }));
        setErrors((prev) => ({ ...prev, profileImage: '' }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('profile.error.nameRequired', { defaultValue: 'Full name is required' });
    if (!formData.email.trim()) newErrors.email = t('profile.error.emailRequired', { defaultValue: 'Email is required' });
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = t('profile.error.invalidEmail', { defaultValue: 'Please enter a valid email' });
    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('profile.error.passwordMismatch', { defaultValue: 'Passwords do not match' });
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const updatedUser = {
      name: formData.name,
      email: formData.email,
      profileImage: formData.profileImage,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsEditing(false);
    setFormData((prev) => ({ ...prev, password: '', confirmPassword: '' }));
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      profileImage: user?.profileImage || '',
      password: '',
      confirmPassword: '',
    });
    setImagePreview(user?.profileImage || '');
    setErrors({});
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-fadeIn">
        {t('profile.title', { defaultValue: 'My Profile' })}
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="profile-image-preview"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <User
              className="w-full h-full text-gray-400 rounded-full bg-gray-100 flex items-center justify-center"
              style={{ display: imagePreview ? 'none' : 'flex' }}
            />
            {isEditing && (
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors"
              >
                <Camera className="w-5 h-5 text-white" />
                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
          {errors.profileImage && <p className="error-text">{errors.profileImage}</p>}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                {t('profile.fullName', { defaultValue: 'Full Name' })}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder={t('profile.fullNamePlaceholder', { defaultValue: 'Enter your full name' })}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                {t('profile.email', { defaultValue: 'Email' })}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder={t('profile.emailPlaceholder', { defaultValue: 'Enter your email' })}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                {t('profile.password', { defaultValue: 'Password' })}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder={t('profile.passwordPlaceholder', { defaultValue: 'Enter new password' })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-200">
                {t('profile.confirmPassword', { defaultValue: 'Confirm Password' })}
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-field"
                placeholder={t('profile.confirmPasswordPlaceholder', { defaultValue: 'Confirm new password' })}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="button flex-1">
                {t('profile.save', { defaultValue: 'Save Changes' })}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="button flex-1 bg-gray-500 hover:bg-gray-600"
              >
                {t('profile.cancel', { defaultValue: 'Cancel' })}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium dark:text-gray-200">{t('profile.fullName', { defaultValue: 'Full Name' })}</p>
              <p className="text-gray-600 dark:text-gray-400">{user?.name || t('profile.noName', { defaultValue: 'No name provided' })}</p>
            </div>
            <div>
              <p className="text-sm font-medium dark:text-gray-200">{t('profile.email', { defaultValue: 'Email' })}</p>
              <p className="text-gray-600 dark:text-gray-400">{user?.email || t('profile.noEmail', { defaultValue: 'No email provided' })}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="button w-full"
            >
              {t('profile.edit', { defaultValue: 'Edit Profile' })}
            </button>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('user');
                setCurrentPage('home');
              }}
              className="button w-full bg-red-500 hover:bg-red-600"
            >
              {t('profile.logout', { defaultValue: 'Log Out' })}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    profileImage: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default ProfilePage;