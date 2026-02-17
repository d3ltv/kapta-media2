import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import useTheme from "@/hooks/useTheme";
import * as Analytics from "@/utils/analytics";

const LOGO_SRC_SET = "/logo-64.webp 64w, /logo-96.webp 96w, /logo-128.webp 128w";

const SharedNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "/", icon: "🏠" },
    { label: "Mécanisme", href: "/#mechanism", icon: "⚙️" },
    { label: "Tarifs", href: "/#pricing", icon: "💰" },
    { label: "Blog", href: "/blog", icon: "📝" },
    { label: "FAQ", href: "/#faq", icon: "❓" },
    { label: "Contact", href: "/#contact", icon: "📞" }
  ];

  const handleMenuClick = (href) => {
    setMobileMenuOpen(false);
    
    // Si c'est un lien externe (commence par /), ne rien faire (Link s'en occupe)
    if (href.startsWith('/') && !href.startsWith('/#')) {
      return;
    }
    
    // Pour les liens /#section, naviguer vers la homepage puis scroller
    if (href.startsWith('/#')) {
      window.location.href = href;
    } else if (href === "/") {
      // Déjà géré par Link
      return;
    }
  };

  const handleDesktopMenuClick = (href) => {
    // Pour les liens /#section depuis le blog, naviguer vers la homepage
    if (href.startsWith('/#')) {
      window.location.href = href;
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glassmorphism shadow-premium" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2" data-testid="logo">
            <img 
              src="/logo-96.webp"
              srcSet={LOGO_SRC_SET}
              sizes="(max-width: 768px) 24px, 32px"
              alt="KAPTA Media - Agence marketing local et optimisation Google Maps à Tours" 
              loading="eager"
              fetchPriority="high"
              width="96"
              height="96"
              decoding="async"
              className="h-6 md:h-8 w-auto logo-transparent logo-isolated"
              style={{ 
                background: 'transparent !important',
                mixBlendMode: 'multiply',
                filter: 'contrast(1.4) brightness(1.1) saturate(1.2)',
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserDrag: 'none',
                WebkitTouchCallout: 'none'
              }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg md:text-xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F3F6FF]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>KAPTA</span>
              <span className="text-base md:text-lg font-medium italic text-[#1c3ff9]" style={{ fontFamily: 'Inter, sans-serif' }}>media</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                Analytics.trackMenuClick('Mécanisme');
                handleDesktopMenuClick('/#mechanism');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
            >
              Mécanisme
            </button>
            <button 
              onClick={() => {
                Analytics.trackMenuClick('Tarifs');
                handleDesktopMenuClick('/#pricing');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
            >
              Tarifs
            </button>
            <Link 
              to="/blog"
              onClick={() => Analytics.trackMenuClick('Blog')}
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
            >
              Blog
            </Link>
            <button 
              onClick={() => {
                Analytics.trackMenuClick('FAQ');
                handleDesktopMenuClick('/#faq');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
            >
              FAQ
            </button>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />
            <Button 
              data-testid="cta-audit-desktop"
              className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-6 btn-shimmer"
              onClick={() => {
                Analytics.trackCTAClick('AUDIT GRATUIT', 'Navbar Desktop');
                Analytics.trackAuditRequest('Navbar Desktop');
                handleDesktopMenuClick('/#contact');
              }}
            >
              AUDIT GRATUIT
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-white/30"
              data-testid="mobile-menu-button"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <div className={`transition-transform duration-300 ${mobileMenuOpen ? "rotate-180" : ""}`}>
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#1c3ff9]" />
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                  </div>
                )}
              </div>
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <>
                {/* Overlay */}
                <div 
                  className="fixed inset-x-0 top-16 bottom-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu */}
                <div
                  id="mobile-menu-panel"
                  className="absolute top-16 right-0 w-64 bg-white dark:bg-[#10131A] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2A2E39] overflow-hidden z-50"
                >
                  <div className="p-2">
                    {menuItems.map((item, index) => {
                      const isRoute = item.href.startsWith('/') && !item.href.startsWith('/#');
                      
                      return (
                        <div
                          key={item.label}
                          className="animate-in fade-in slide-in-from-right-2 duration-200"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          {isRoute ? (
                            <Link
                              to={item.href}
                              onClick={() => {
                                Analytics.trackMenuClick(item.label);
                                setMobileMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#1c3ff9]/5 transition-all duration-200 group"
                            >
                              <span className="text-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                              </span>
                              <span className="text-sm font-medium text-[#0A0A0A] dark:text-[#F3F6FF] group-hover:text-[#1c3ff9] transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#1c3ff9] group-hover:translate-x-1 transition-all ml-auto" />
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                Analytics.trackMenuClick(item.label);
                                handleMenuClick(item.href);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#1c3ff9]/5 transition-all duration-200 group"
                            >
                              <span className="text-lg group-hover:scale-110 transition-transform">
                                {item.icon}
                              </span>
                              <span className="text-sm font-medium text-[#0A0A0A] dark:text-[#F3F6FF] group-hover:text-[#1c3ff9] transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#1c3ff9] group-hover:translate-x-1 transition-all ml-auto" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-4 pb-2 pt-1 border-t border-gray-100 dark:border-[#2A2E39]">
                    <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="w-full justify-center" />
                  </div>
                  
                  {/* CTA Button */}
                  <div className="p-4 border-t border-gray-100 dark:border-[#2A2E39]">
                    <Button 
                      className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg btn-shimmer"
                      onClick={() => {
                        Analytics.trackCTAClick('AUDIT GRATUIT', 'Mobile Menu');
                        Analytics.trackAuditRequest('Mobile Menu');
                        setMobileMenuOpen(false);
                        handleMenuClick('/#contact');
                      }}
                    >
                      AUDIT GRATUIT
                    </Button>
                  </div>
                  
                  {/* Footer avec contact */}
                  <div className="border-t border-gray-100 dark:border-[#2A2E39] p-4 bg-[#F8F9FA] dark:bg-[#171B24]">
                    <a 
                      href="tel:0686018054"
                      className="flex items-center gap-2 text-sm text-[#52525B] dark:text-[#C2C8D8] hover:text-[#1c3ff9] transition-colors"
                      onClick={() => {
                        Analytics.trackPhoneClick('06 86 01 80 54', 'Mobile Menu');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      06 86 01 80 54
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SharedNavbar;
