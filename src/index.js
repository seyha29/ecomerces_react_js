import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './input.css';
import './i18n';
import App from './App';
import i18n from './i18n';

i18n.on('initialized', () => {
  console.log('i18next initialized with language:', i18n.language);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error('Failed loading language:', lng, 'Namespace:', ns, 'Message:', msg);
});

i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);