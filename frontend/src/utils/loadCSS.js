// Utilitaire pour charger le CSS de manière non-bloquante
export const loadCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = function() {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
  
  // Fallback pour navigateurs sans support preload
  const noscript = document.createElement('noscript');
  const fallbackLink = document.createElement('link');
  fallbackLink.rel = 'stylesheet';
  fallbackLink.href = href;
  noscript.appendChild(fallbackLink);
  document.head.appendChild(noscript);
};

// Inline critical CSS (styles above-the-fold)
export const inlineCriticalCSS = () => {
  const criticalCSS = `
    /* Reset & Base */
    *,::before,::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
    html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
    body{margin:0;line-height:inherit}
    
    /* Navbar Critical Styles */
    nav{position:fixed;top:0;left:0;right:0;z-index:50;transition:all .3s}
    .glassmorphism{background:rgba(255,255,255,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
    .shadow-premium{box-shadow:0 4px 20px rgba(0,0,0,.08)}
    
    /* Hero Critical Styles */
    .gradient-brand-hover{background:linear-gradient(135deg,#0052FF 0%,#1c3ff9 50%,#3B82F6 100%)}
    .btn-shimmer{position:relative;overflow:hidden}
    .cta-pulse-subtle{animation:pulse-subtle 2s ease-in-out infinite}
    @keyframes pulse-subtle{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
    
    /* Loading Screen */
    #app-loader{position:fixed;inset:0;background:#fff;display:flex;align-items:center;justify-content:center;z-index:9999}
    
    /* Dark Mode */
    .dark{color-scheme:dark}
    .dark body{background:#070B14;color:#F3F6FF}
  `;
  
  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.insertBefore(style, document.head.firstChild);
};
