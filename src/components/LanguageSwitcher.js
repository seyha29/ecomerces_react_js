import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ changeLanguage, currentLanguage }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Flag components as SVGs
  const USFlag = () => (
    <svg className="w-5 h-3" viewBox="0 0 24 16" fill="none">
      <rect width="24" height="16" fill="#B22234" />
      <rect width="24" height="1.23" y="1.23" fill="white" />
      <rect width="24" height="1.23" y="3.69" fill="white" />
      <rect width="24" height="1.23" y="6.15" fill="white" />
      <rect width="24" height="1.23" y="8.62" fill="white" />
      <rect width="24" height="1.23" y="11.08" fill="white" />
      <rect width="24" height="1.23" y="13.54" fill="white" />
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
    </svg>
  );

  const KhmerFlag = () => (
    <svg className="w-5 h-3" viewBox="0 0 20 16" fill="none">
      <rect width="24" height="16" fill="#032EA1" />
      <rect width="24" height="4" y="6" fill="#E4002B" />
      <rect width="12" height="2" x="6" y="7" fill="white" />
    </svg>
  );

  const getCurrentFlag = () => {
    return currentLanguage === 'en' ? <USFlag /> : <KhmerFlag />;
  };

  const handleChangeLanguage = (lng) => {
    changeLanguage(lng);
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="hidden">
      {/* This component is now integrated into the Header component */}
      {/* Use the Header's built-in language switcher instead */}
    </div>
  );
};

LanguageSwitcher.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

export default LanguageSwitcher;