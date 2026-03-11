import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { inlineCriticalCSS } from './utils/loadCSS';

// Inline critical CSS immédiatement
inlineCriticalCSS();

// Fonction optimisée pour cacher le loader
const hideLoader = () => {
  const loader = document.getElementById('app-loader');
  if (loader) {
    // Ajouter la classe pour déclencher la transition
    loader.classList.add('loaded');
    // Supprimer du DOM après la transition (250ms)
    setTimeout(() => {
      if (loader && loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 250);
  }
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Cacher le loader dès que React a rendu
// Utiliser requestAnimationFrame pour attendre que le DOM soit peint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    hideLoader();
  });
});

// Report web vitals (chargé en lazy après tout le reste)
if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    import('./reportWebVitals').then(({ default: reportWebVitals }) => {
      reportWebVitals();
    }).catch(() => {
      // Ignorer les erreurs de chargement de reportWebVitals
    });
  }, 3000);
}
