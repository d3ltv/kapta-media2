import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@/App.css";
import { motion, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Phone, 
  Check, 
  X, 
  Radar, 
  Camera, 
  Cpu, 
  Trophy,
  Star,
  Nfc,
  ShieldCheck,
  MapPin,
  TrendingUp,
  ChevronDown,
  Calendar,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import * as Analytics from "@/utils/analytics";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Carrousel de texte rotatif
const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const texts = [
    { text: "Technologie NFC Sans Contact", icon: Nfc },
    { text: "Format Vidéo Certifié Google", icon: Camera },
    { text: "Déploiement Exclusif sur Tours", icon: MapPin },
    { text: "Optimisation 100% Parcours Client", icon: TrendingUp },
    { text: "Garantie Satisfait ou Remboursé", icon: ShieldCheck },
    { text: "Résultats Visibles en 14 Jours", icon: Trophy },
    { text: "Équipe Locale Basée à Tours", icon: MapPin },
    { text: "Suivi Personnalisé Inclus", icon: Check }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
      setProgress(0);
    }, 3500);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 35); // 3500ms / 100ms = 35 steps
      });
    }, 100);
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [texts.length]);

  const CurrentIcon = texts[currentIndex].icon;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-6 flex items-center justify-center overflow-hidden mb-2">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <CurrentIcon className="w-4 h-4 text-[#1c3ff9]" />
          <p className="text-sm text-[#52525B] font-medium">
            {texts[currentIndex].text}
          </p>
        </motion.div>
      </div>
      
      {/* Barre de progression */}
      <div className="w-24 h-px bg-gray-100 rounded-full overflow-hidden opacity-30">
        <motion.div
          className="h-full bg-[#1c3ff9] rounded-full opacity-50"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
    </div>
  );
};

// Branded Section Header Component
const SectionHeader = ({ number, label, title, highlight, description, centered = true }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={centered ? "text-center mb-8 md:mb-16" : "mb-8 md:mb-16"}
  >
    <div className={`kapta-section-marker ${centered ? "justify-center" : ""}`}>
      <span className="font-mono text-[10px] sm:text-xs text-[#1c3ff9] tracking-widest">{number}</span>
      <span className="font-mono text-[10px] sm:text-xs text-[#A1A1AA] uppercase tracking-widest">{label}</span>
    </div>
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A0A0A] mb-2 md:mb-4 leading-tight">
      {title} <span className="text-[#1c3ff9]">{highlight}</span>
    </h2>
    {description && (
      <p className="text-sm md:text-base lg:text-lg text-[#52525B] max-w-2xl mx-auto px-4 md:px-0">
        {description}
      </p>
    )}
  </motion.div>
);

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "#", icon: "🏠" },
    { label: "Mécanisme", href: "#mechanism", icon: "⚙️" },
    { label: "Tarifs", href: "#pricing", icon: "💰" },
    { label: "Blog", href: "/blog", icon: "📝" },
    { label: "FAQ", href: "#faq", icon: "❓" },
    { label: "Contact", href: "#contact", icon: "📞" }
  ];

  const handleMenuClick = (href) => {
    setMobileMenuOpen(false);
    
    // Si c'est un lien externe (commence par /), ne rien faire (Link s'en occupe)
    if (href.startsWith('/')) {
      return;
    }
    
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Compensation pour la navbar fixe
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  const handleDesktopMenuClick = (href) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Compensation pour la navbar fixe
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glassmorphism shadow-premium" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="logo">
            <img 
              src="/logo.webp" 
              alt="KAPTA Media - Agence marketing local et optimisation Google Maps à Tours" 
              loading="eager"
              fetchpriority="high"
              width="32"
              height="32"
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
              <span className="text-lg md:text-xl font-black tracking-tight text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>KAPTA</span>
              <span className="text-base md:text-lg font-medium italic text-[#1c3ff9]" style={{ fontFamily: 'Inter, sans-serif' }}>media</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => {
                Analytics.trackMenuClick('Mécanisme');
                handleDesktopMenuClick('#mechanism');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors"
            >
              Mécanisme
            </button>
            <button 
              onClick={() => {
                Analytics.trackMenuClick('Tarifs');
                handleDesktopMenuClick('#pricing');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors"
            >
              Tarifs
            </button>
            <Link 
              to="/blog"
              onClick={() => Analytics.trackMenuClick('Blog')}
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors"
            >
              Blog
            </Link>
            <button 
              onClick={() => {
                Analytics.trackMenuClick('FAQ');
                handleDesktopMenuClick('#faq');
              }} 
              className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors"
            >
              FAQ
            </button>
            <Button 
              data-testid="cta-audit-desktop"
              className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-6 btn-shimmer"
              onClick={() => {
                Analytics.trackCTAClick('AUDIT GRATUIT', 'Navbar Desktop');
                Analytics.trackAuditRequest('Navbar Desktop');
                handleDesktopMenuClick('#contact');
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
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#1c3ff9]" />
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                    <div className="w-4 h-0.5 bg-[#1c3ff9] rounded-full" />
                  </div>
                )}
              </motion.div>
            </button>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <>
                {/* Overlay */}
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setMobileMenuOpen(false)}
                />
                
                {/* Menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-16 right-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                >
                  <div className="p-2">
                    {menuItems.map((item, index) => {
                      const isRoute = item.href.startsWith('/');
                      
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
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
                              <span className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#1c3ff9] transition-colors">
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
                              <span className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#1c3ff9] transition-colors">
                                {item.label}
                              </span>
                              <ArrowRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#1c3ff9] group-hover:translate-x-1 transition-all ml-auto" />
                            </button>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                  
                  {/* CTA Button */}
                  <div className="p-4 border-t border-gray-100">
                    <Button 
                      className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg btn-shimmer"
                      onClick={() => {
                        Analytics.trackCTAClick('AUDIT GRATUIT', 'Mobile Menu');
                        Analytics.trackAuditRequest('Mobile Menu');
                        setMobileMenuOpen(false);
                        handleMenuClick('#contact');
                      }}
                    >
                      AUDIT GRATUIT
                    </Button>
                  </div>
                  
                  {/* Footer avec contact */}
                  <div className="border-t border-gray-100 p-4 bg-[#F8F9FA]">
                    <a 
                      href="tel:0686018054"
                      className="flex items-center gap-2 text-sm text-[#52525B] hover:text-[#1c3ff9] transition-colors"
                      onClick={() => {
                        Analytics.trackPhoneClick('06 86 01 80 54', 'Mobile Menu');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      06 86 01 80 54
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Hero Section - Clean & Visual with Google Maps Mockup
const Hero = () => {
  return (
    <section 
      className="relative min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-white"
      data-testid="hero-section"
    >
      {/* Strong Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      
      {/* Soft Blue Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#1c3ff9]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Left - Text Content */}
          <div className="order-1 lg:order-1 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c3ff9]/5 border border-[#1c3ff9]/10 mb-8 md:mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-[#1c3ff9]">Top Google Maps en 14 jours</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] leading-[1.05] mb-8 md:mb-10"
            >
              Votre concurrent est{" "}
              <span className="text-[#1c3ff9]">N°1</span>.
              <br />
              <span className="text-[#71717A]">Ça vous va ?</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-[#52525B] max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
            >
              On vous met dans le <span className="font-semibold text-[#0A0A0A]">Top Google Maps</span> avec 
              une vidéo pro + une fiche Google qui donne envie d'appeler.
            </motion.p>
            
            {/* CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16 px-4 sm:px-0"
            >
              <Button 
                data-testid="cta-hero-primary"
                size="lg"
                className="w-auto sm:w-auto bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
                onClick={() => {
                  Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Hero Section');
                  Analytics.trackCheckoutBegin();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                RÉSERVER MON AUDIT GRATUIT
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {/* Rotating Text Carousel */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center"
            >
              <RotatingText />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.querySelector('[data-testid="before-after-section"]')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-[#A1A1AA] hover:text-[#1c3ff9] transition-colors cursor-pointer group"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-wider hidden md:block group-hover:text-[#1c3ff9] transition-colors">Découvrir</span>
            <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

// Avant/Après Section
const BeforeAfter = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === 'left' && mobileSlideIndex === 0) {
      setMobileSlideIndex(1);
    } else if (direction === 'right' && mobileSlideIndex === 1) {
      setMobileSlideIndex(0);
    }
  };

  return (
    <section 
      ref={ref}
      className="py-8 md:py-12 bg-gradient-to-br from-white via-[#F8F9FA] to-white relative overflow-hidden"
      data-testid="before-after-section"
    >
      {/* Quadrillage subtil */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(28,63,249,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(28,63,249,0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Artefacts blur */}
      <motion.div
        className="absolute w-64 h-64 bg-[#EF4444]/8 rounded-full blur-3xl"
        style={{ top: '20%', left: '5%' }}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-[#10B981]/6 rounded-full blur-3xl"
        style={{ bottom: '15%', right: '8%' }}
        animate={{
          y: [0, 20, 0],
          x: [0, -18, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="01"
          label="La Réalité"
          title="VOICI CE QUI SE PASSE"
          highlight="RÉELLEMENT"
          description="Votre concurrent a une fiche Google optimisée. Vous, vous êtes invisible."
        />
        
        <div className="md:grid md:grid-cols-2 md:gap-4 md:gap-8 -mx-2 md:mx-0">
          {/* Mobile: Interactive slider optimisé pour la lisibilité */}
          <div className="md:hidden relative overflow-hidden bg-gray-50 rounded-xl p-2"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              e.currentTarget.dataset.startX = touch.clientX;
              e.currentTarget.dataset.startY = touch.clientY;
            }}
            onTouchEnd={(e) => {
              const startX = parseFloat(e.currentTarget.dataset.startX);
              const startY = parseFloat(e.currentTarget.dataset.startY);
              const endX = e.changedTouches[0].clientX;
              const endY = e.changedTouches[0].clientY;
              
              const diffX = startX - endX;
              const diffY = startY - endY;
              
              // Seuil plus bas pour une meilleure réactivité
              if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
                if (diffX > 0) {
                  handleSwipe('left');
                } else {
                  handleSwipe('right');
                }
              }
            }}
          >
            {/* Container with animation */}
            <motion.div
              animate={{ x: mobileSlideIndex === 0 ? 0 : '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="flex w-full"
            >
              {/* AVANT - Fiche basique - Mobile optimisé */}
              <div className="min-w-full px-1 pb-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden opacity-70 min-h-[500px] flex flex-col">
                    <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-2 flex-shrink-0">
                      <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">G</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </div>
                    
                    <div className="h-44 bg-gray-100 relative flex-shrink-0">
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/90 rounded-lg p-3">
                          <h3 className="font-bold text-base text-gray-900">Votre Commerce</h3>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                            ))}
                            {[...Array(2)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                            <span className="text-sm text-gray-600 ml-2">3.2 (8 avis)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>123 Rue de la République, Tours</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>Pas de téléphone visible</span>
                        </div>
                        <div className="text-sm text-gray-400">
                          <span>Horaires non renseignés</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-16 left-3 bg-[#EF4444] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    VOUS AUJOURD'HUI
                  </div>
                  
                  <div className="absolute bottom-8 right-3 bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
                    Position 15+
                  </div>
                </motion.div>
              </div>

              {/* APRÈS - Fiche optimisée - Mobile optimisé */}
              <div className="min-w-full px-1 pb-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative"
                >
                  <div className="bg-white rounded-xl shadow-2xl border-2 border-[#1c3ff9] overflow-hidden relative animate-pulse-glow min-h-[500px] flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/5 via-transparent to-[#1c3ff9]/5 animate-shimmer"></div>
                    
                    <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-2 relative z-10 flex-shrink-0">
                      <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">G</span>
                      </div>
                      <span className="text-sm font-medium text-gray-700">Google</span>
                    </div>
                    
                    <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                          <h3 className="font-bold text-base text-gray-900">Votre Commerce</h3>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04] animate-twinkle" style={{ animationDelay: `${i * 0.1}s` }} />
                            ))}
                            <span className="text-sm text-gray-600 ml-2 font-semibold">4.9 (127 avis)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 space-y-3 flex-1">
                      <div className="border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Camera className="w-4 h-4 text-[#1c3ff9]" />
                          <span className="text-sm font-medium text-gray-700">Vidéos</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded aspect-video overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[4px] border-l-[#1c3ff9] border-y-[3px] border-y-transparent ml-0.5"></div>
                              </div>
                            </div>
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">1:24</div>
                          </div>
                          <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded aspect-video overflow-hidden">
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <div className="w-5 h-5 bg-white/90 rounded-full flex items-center justify-center">
                                <div className="w-0 h-0 border-l-[4px] border-l-[#1c3ff9] border-y-[3px] border-y-transparent ml-0.5"></div>
                              </div>
                            </div>
                            <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">0:45</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#1c3ff9]" />
                        <span>123 Rue de la République, Tours</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                        <span className="text-[#10B981] font-medium">Ouvert</span>
                        <span className="text-gray-600">· Ferme à 19h00</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#1c3ff9]" />
                        <span className="font-medium">06 86 01 80 54</span>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 bg-[#1c3ff9] text-white py-2.5 px-3 rounded-lg text-sm font-medium">
                          Appeler
                        </button>
                        <button className="flex-1 border border-gray-300 text-gray-700 py-2.5 px-3 rounded-lg text-sm font-medium">
                          Itinéraire
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-16 left-3 bg-[#10B981] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-xl animate-bounce-slow z-20">
                    AVEC KAPTA
                  </div>
                  
                  <div className="absolute top-4 right-3 bg-[#1c3ff9] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-xl z-20">
                    Position N°1 ✓
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Navigation controls optimisées avec boutons */}
            <div className="flex flex-col items-center mt-4 mb-2 space-y-3">
              {/* Boutons AVANT / APRÈS */}
              <div className="flex items-center gap-3" role="tablist" aria-label="Navigation des comparaisons">
                <button
                  onClick={() => setMobileSlideIndex(0)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    mobileSlideIndex === 0 
                      ? 'bg-[#EF4444] text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  role="tab"
                  aria-selected={mobileSlideIndex === 0}
                  aria-label="Voir la fiche avant optimisation"
                >
                  AVANT
                </button>
                <button
                  onClick={() => setMobileSlideIndex(1)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    mobileSlideIndex === 1 
                      ? 'bg-[#10B981] text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  role="tab"
                  aria-selected={mobileSlideIndex === 1}
                  aria-label="Voir la fiche après optimisation"
                >
                  APRÈS
                </button>
              </div>
              
              {/* Indicateur visuel optionnel */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mobileSlideIndex === 0 ? 'bg-[#EF4444] w-6' : 'bg-gray-300'
                }`} />
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  mobileSlideIndex === 1 ? 'bg-[#10B981] w-6' : 'bg-gray-300'
                }`} />
              </div>
              
              {/* Instruction simplifiée */}
              <p className="text-xs text-[#A1A1AA] text-center">
                Cliquez sur les boutons pour comparer
              </p>
            </div>
          </div>

          {/* Desktop: Original layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden opacity-70 h-[320px] flex flex-col">
              <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-xs font-medium text-gray-700">Google</span>
              </div>
              
              <div className="h-24 bg-gray-100 relative">
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="bg-white/90 rounded-lg p-2">
                    <h3 className="font-bold text-sm text-gray-900">Votre Commerce</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(3)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04]" />
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gray-300" />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">3.2 (8 avis)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>123 Rue de la République, Tours</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Phone className="w-3 h-3" />
                    <span>Pas de téléphone visible</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span>Horaires non renseignés</span>
                  </div>
                </div>
                
                {/* Espace vide pour égaliser la hauteur */}
                <div className="flex-1"></div>
              </div>
            </div>
            
            <div className="absolute -top-3 -left-3 bg-[#EF4444] text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
              VOUS AUJOURD'HUI
            </div>
            
            <div className="absolute -bottom-3 -right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Position 15+
            </div>
          </motion.div>

          {/* APRÈS - Fiche optimisée - Desktop */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1c3ff9] overflow-hidden relative animate-pulse-glow h-[320px] flex flex-col">
              {/* Effet néon subtil */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/5 via-transparent to-[#1c3ff9]/5 animate-shimmer"></div>
              
              <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center gap-2 relative z-10">
                <div className="w-5 h-5 rounded bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-xs font-medium text-gray-700">Google</span>
              </div>
              
              <div className="h-24 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10"></div>
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                    <h3 className="font-bold text-sm text-gray-900">Votre Commerce</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#FBBC04] text-[#FBBC04] animate-twinkle" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                      <span className="text-xs text-gray-600 ml-1 font-semibold">4.9 (127 avis)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-2 flex-1 overflow-hidden">
                {/* Section Vidéos intégrée */}
                <div className="border-t border-gray-100 pt-2">
                  <div className="flex items-center gap-1 mb-1">
                    <Camera className="w-3 h-3 text-[#1c3ff9]" />
                    <span className="text-xs font-medium text-gray-700">Vidéos</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[3px] border-l-[#1c3ff9] border-y-[2px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0.5 left-0.5 bg-black/70 text-white text-[10px] px-1 rounded">1:24</div>
                    </div>
                    <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[3px] border-l-[#1c3ff9] border-y-[2px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-0.5 left-0.5 bg-black/70 text-white text-[10px] px-1 rounded">0:45</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <MapPin className="w-3 h-3 text-[#1c3ff9]" />
                  <span>123 Rue de la République, Tours</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></div>
                  <span className="text-[#10B981] font-medium">Ouvert</span>
                  <span className="text-gray-600">· Ferme à 19h00</span>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Phone className="w-3 h-3 text-[#1c3ff9]" />
                  <span>06 86 01 80 54</span>
                </div>
                
                <div className="flex gap-1.5 pt-1">
                  <button className="flex-1 bg-[#1c3ff9] text-white py-1.5 px-2 rounded-lg text-xs font-medium">
                    Appeler
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-2 rounded-lg text-xs font-medium">
                    Itinéraire
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-3 -left-3 bg-[#10B981] text-white px-2 py-1 rounded-full text-xs font-bold shadow-xl animate-bounce-slow z-20">
              AVEC KAPTA
            </div>
            
            <div className="absolute -top-3 -right-3 bg-[#1c3ff9] text-white px-2 py-1 rounded-full text-xs font-bold shadow-xl z-20">
              Position N°1 ✓
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Problem Comparison Section
// Problem Comparison Section
const ProblemComparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-8 md:py-12 bg-[#F8F9FA] relative overflow-hidden"
      data-testid="comparison-section"
    >
      {/* Strong Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="02"
          label="L'Impact"
          title="CE QUE ÇA VOUS"
          highlight="COÛTE CONCRÈTEMENT"
          description="Chaque jour sans optimisation = clients perdus définitivement."
        />
        
        <div className="md:grid md:grid-cols-2 md:gap-4 md:gap-8 -mx-2 md:mx-0">
          {/* Mobile: Scrollable horizontal container */}
          <div 
            className="md:hidden flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide pl-2 pr-2"
            onScroll={(e) => {
              const container = e.target;
              const scrollLeft = container.scrollLeft;
              const maxScroll = container.scrollWidth - container.clientWidth;
              const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
              
              // Update progress indicator
              const indicator = document.querySelector('.scroll-progress-indicator');
              if (indicator) {
                indicator.style.left = `${progress}%`;
              }
            }}
          >
            {/* Problème - Impact négatif - Mobile épuré */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-4 rounded-xl bg-white border border-gray-200 shadow-lg min-w-[320px] snap-start flex-shrink-0 hover:shadow-xl transition-all duration-300"
              data-testid="card-problem-impact-mobile"
            >
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-gray-100 text-[9px] font-medium text-gray-600 border border-gray-200">
                💸 Perte quotidienne
              </div>
              
              <h3 className="text-base font-bold text-gray-800 mb-3 mt-3">
                SANS OPTIMISATION
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">📉</span>
                    <h4 className="font-bold text-gray-800 text-sm">Clients perdus</h4>
                  </div>
                  <p className="text-xs text-gray-600">15-30 clients/mois choisissent vos concurrents</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">💰</span>
                    <h4 className="font-bold text-gray-800 text-sm">Manque à gagner</h4>
                  </div>
                  <p className="text-xs text-gray-600">3 000€ à 15 000€ de CA perdu/mois</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">⏰</span>
                    <h4 className="font-bold text-gray-800 text-sm">Temps perdu</h4>
                  </div>
                  <p className="text-xs text-gray-600">Chaque mois d'attente = 6 mois pour rattraper</p>
                </div>
              </div>
            </motion.div>
            
            {/* Solution - Impact positif - Mobile épuré */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-4 rounded-xl bg-white border-2 border-[#1c3ff9] shadow-lg min-w-[320px] snap-start flex-shrink-0 hover:shadow-xl transition-all duration-300"
              data-testid="card-solution-impact-mobile"
            >
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#1c3ff9] text-[9px] font-bold text-white shadow-lg">
                📈 ROI Immédiat
              </div>
              
              <h3 className="text-base font-bold text-[#1c3ff9] mb-3 mt-3">
                AVEC KAPTA
              </h3>
              
              <div className="space-y-3">
                <div className="bg-[#1c3ff9]/5 rounded-lg p-3 border border-[#1c3ff9]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🎯</span>
                    <h4 className="font-bold text-gray-800 text-sm">Clients récupérés</h4>
                  </div>
                  <p className="text-xs text-gray-600">+127% d'appels = 20-40 nouveaux clients/mois</p>
                </div>
                
                <div className="bg-[#1c3ff9]/5 rounded-lg p-3 border border-[#1c3ff9]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">💎</span>
                    <h4 className="font-bold text-gray-800 text-sm">ROI calculé</h4>
                  </div>
                  <p className="text-xs text-gray-600">Investissement récupéré en 1-2 semaines</p>
                </div>
                
                <div className="bg-[#1c3ff9]/5 rounded-lg p-3 border border-[#1c3ff9]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🚀</span>
                    <h4 className="font-bold text-gray-800 text-sm">Effet boule de neige</h4>
                  </div>
                  <p className="text-xs text-gray-600">Plus d'avis = meilleur classement = plus de clients</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator for mobile */}
          <div className="md:hidden flex flex-col items-center mt-2">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 text-[#A1A1AA] text-xs mb-2"
            >
              <span>Glissez</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
            
            {/* Progress track */}
            <div className="relative w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="scroll-progress-indicator absolute top-0 w-3 h-1 bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out shadow-sm"
                style={{ left: '0%' }}
              />
            </div>
          </div>

          {/* Desktop: Original grid layout - Design épuré */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block relative p-4 md:p-5 rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="card-problem-impact"
          >
            <div className="absolute top-2 md:top-3 right-2 md:right-3 px-2 py-0.5 rounded-full bg-gray-100 text-[10px] font-medium text-gray-600 border border-gray-200">
              💸 Perte quotidienne
            </div>
            
            <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4 mt-3">
              SANS OPTIMISATION
            </h3>
            
            <div className="space-y-2.5 md:space-y-3">
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm">📉</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">Clients perdus</h4>
                </div>
                <p className="text-xs text-gray-600">15-30 clients/mois choisissent vos concurrents mieux classés</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm">💰</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">Manque à gagner</h4>
                </div>
                <p className="text-xs text-gray-600">3 000€ à 15 000€ de CA perdu par mois selon votre secteur</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-sm">⏰</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">Temps perdu</h4>
                </div>
                <p className="text-xs text-gray-600">Chaque mois d'attente = 6 mois de plus pour rattraper</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block relative p-4 md:p-5 rounded-2xl bg-white border-2 border-[#1c3ff9] shadow-lg hover:shadow-xl transition-all duration-300"
            data-testid="card-solution-impact"
          >
            <div className="absolute top-2 md:top-3 right-2 md:right-3 px-2 py-0.5 rounded-full bg-[#1c3ff9] text-[10px] font-bold text-white shadow-lg">
              📈 ROI Immédiat
            </div>
            
            <h3 className="text-base md:text-lg font-bold text-[#1c3ff9] mb-3 md:mb-4 mt-3">
              AVEC KAPTA
            </h3>
            
            <div className="space-y-2.5 md:space-y-3">
              <div className="bg-[#1c3ff9]/5 rounded-lg p-2.5 border border-[#1c3ff9]/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center">
                    <span className="text-sm">🎯</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">Clients récupérés</h4>
                </div>
                <p className="text-xs text-gray-600">+127% d'appels en moyenne = 20-40 nouveaux clients/mois</p>
              </div>
              
              <div className="bg-[#1c3ff9]/5 rounded-lg p-2.5 border border-[#1c3ff9]/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center">
                    <span className="text-sm">💎</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">ROI calculé</h4>
                </div>
                <p className="text-xs text-gray-600">Investissement récupéré en 1-2 semaines selon votre panier moyen</p>
              </div>
              
              <div className="bg-[#1c3ff9]/5 rounded-lg p-2.5 border border-[#1c3ff9]/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center">
                    <span className="text-sm">🚀</span>
                  </div>
                  <h4 className="font-bold text-gray-800 text-sm">Effet boule de neige</h4>
                </div>
                <p className="text-xs text-gray-600">Plus d'avis positifs = meilleur classement = encore plus de clients</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* ROI Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 md:mt-8 p-4 md:p-4 rounded-xl bg-white border border-[#1c3ff9]/20 shadow-lg"
        >
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-3 md:mb-3"
          >
            <h3 className="text-base md:text-base font-bold text-[#0A0A0A] mb-1">Calculateur d'impact</h3>
            <p className="text-xs text-[#52525B]">Estimation basée sur nos données sectorielles</p>
          </motion.div>
          
          {/* Layout mobile: 2 cartes sur la première ligne, 1 centrée sur la deuxième */}
          <div className="space-y-3 md:space-y-0">
            {/* Première ligne - 2 cartes */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-3 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-xl font-bold text-[#1c3ff9] mb-1"
                >
                  350€
                </motion.p>
                <p className="text-xs text-[#52525B]">Investissement unique</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center p-3 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="text-xl font-bold text-[#1c3ff9] mb-1"
                >
                  +25
                </motion.p>
                <p className="text-xs text-[#52525B]">Clients/mois en moyenne</p>
              </motion.div>
            </div>
            
            {/* Deuxième ligne - 1 carte centrée avec effet "=" */}
            <div className="flex justify-center md:hidden">
              <div className="flex items-center space-x-2">
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  className="text-2xl font-bold text-[#1c3ff9]"
                >
                  =
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-center p-3 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10 w-32"
                >
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 1.8 }}
                    className="text-xl font-bold text-[#1c3ff9] mb-1"
                  >
                    ROI 10x
                  </motion.p>
                  <p className="text-xs text-[#52525B]">Retour sur investissement</p>
                </motion.div>
              </div>
            </div>
            
            {/* Layout desktop - 3 cartes en ligne */}
            <div className="hidden md:grid md:grid-cols-3 md:gap-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-2.5 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  className="text-lg font-bold text-[#1c3ff9] mb-0.5"
                >
                  350€
                </motion.p>
                <p className="text-xs text-[#52525B]">Investissement unique</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center p-2.5 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  className="text-lg font-bold text-[#1c3ff9] mb-0.5"
                >
                  +25
                </motion.p>
                <p className="text-xs text-[#52525B]">Clients/mois en moyenne</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center p-2.5 rounded-lg bg-[#1c3ff9]/5 border border-[#1c3ff9]/10"
              >
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  className="text-lg font-bold text-[#1c3ff9] mb-0.5"
                >
                  ROI 10x
                </motion.p>
                <p className="text-xs text-[#52525B]">Retour sur investissement</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};


// Case Studies Section - Honest version
const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videosExpanded, setVideosExpanded] = useState(false);

  const caseStudies = [
    {
      id: 1,
      title: "Garage Auto Pro",
      type: "Garage automobile",
      location: "Tours Sud",
      beforeImage: "/garage1.webp",
      afterImage: "/garage2.webp",
      results: {
        position: "Position 8+ → N°1",
        calls: "+220% d'appels",
        rating: "3.1 → 4.7 étoiles"
      }
    },
    {
      id: 2,
      title: "Salon Élégance",
      type: "Coiffeur",
      location: "Tours Nord",
      beforeImage: "/salon1.webp",
      afterImage: "/salon2.webp",
      results: {
        position: "Position 12+ → N°2",
        calls: "+180% d'appels",
        rating: "3.4 → 4.8 étoiles"
      }
    },
    {
      id: 3,
      title: "Bistro Le Gourmet",
      type: "Restaurant",
      location: "Tours Centre",
      beforeImage: "/bistro1.webp",
      afterImage: "/bistro2.webp",
      results: {
        position: "Position 15+ → N°3",
        calls: "+160% d'appels",
        rating: "3.2 → 4.6 étoiles"
      }
    },
    {
      id: 4,
      title: "Boulangerie Artisanale",
      type: "Boulangerie",
      location: "Tours Est",
      beforeImage: "/boulangerie1.webp",
      afterImage: "/boulangerie2.webp",
      results: {
        position: "Position 10+ → N°2",
        calls: "+195% d'appels",
        rating: "3.3 → 4.9 étoiles"
      }
    }
  ];

  return (
    <>
    <section 
      ref={ref}
      className="py-8 md:py-16 bg-white relative overflow-hidden"
      data-testid="case-studies-section"
    >
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          number="03"
          label="Résultats"
          title="AVANT / APRÈS"
          highlight="CONCRETS"
          description="Découvrez la transformation Google Maps de nos clients sur Tours"
        />
        
        {/* Grille des cas clients avant/après - Version améliorée */}
        <div className="overflow-hidden">
          {/* Conteneur scrollable horizontal */}
          <div 
            className="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onScroll={(e) => {
              const container = e.target;
              const scrollLeft = container.scrollLeft;
              const maxScroll = container.scrollWidth - container.clientWidth;
              const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
              
              const progressBar = document.querySelector('.case-studies-progress-bar');
              if (progressBar) {
                progressBar.style.width = `${progress}%`;
              }
            }}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-w-[440px] md:min-w-[600px] snap-start flex-shrink-0"
              >
                {/* Section Avant/Après - Côte à côte simplifié */}
                <div className="grid grid-cols-2 gap-0">
                  {/* AVANT */}
                  <div className="relative">
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.beforeImage} 
                        alt="Avant"
                        loading="lazy"
                        className="w-full h-full object-contain object-center bg-gray-100"
                      />
                    </div>
                  </div>
                  
                  {/* APRÈS */}
                  <div className="relative">
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.afterImage} 
                        alt="Après"
                        loading="lazy"
                        className="w-full h-full object-contain object-center bg-white scale-125"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Barre de progression */}
          <div className="flex flex-col items-center mt-4 space-y-3">
            {/* Progress track */}
            <div className="w-32 md:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="case-studies-progress-bar h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            
            {/* Indicateur de scroll */}
            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
              <span>Glissez pour voir plus</span>
              <ArrowRight className="w-3 h-3" />
            </div>
            
            {/* Note de confidentialité */}
            <p className="text-xs text-[#A1A1AA] italic text-center max-w-md mt-2">
              * Certains clients ayant souhaité préserver leur anonymat sont représentés de manière générique
            </p>
          </div>
        </div>
        
        {/* Section Vidéos - Design cohérent avec le branding */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-12 mb-4 md:mb-6 relative"
        >
          {/* Fond avec points de couleur pour détacher visuellement */}
          <div 
            className="absolute inset-0 opacity-40 -z-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(28,63,249,0.15) 1.5px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
          
          {/* En-tête de section avec cadre quadrillage subtil */}
          <div className="text-center mb-6 md:mb-8 pt-6 md:pt-8 px-4 relative">
            {/* Cadre avec quadrillage subtil comme l'élément Impact */}
            <div className="absolute inset-0 mx-auto max-w-3xl">
              {/* Fond avec quadrillage subtil */}
              <div 
                className="absolute inset-0 rounded-2xl border border-[#1c3ff9]/10 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(28,63,249,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,63,249,0.04) 1px, transparent 1px)`,
                  backgroundSize: '32px 32px'
                }}
              >
                {/* Artefacts blur flottants subtils */}
                <motion.div
                  className="absolute w-32 h-32 bg-[#1c3ff9]/12 rounded-full blur-3xl"
                  style={{ top: '8%', left: '12%' }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 12, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute w-36 h-36 bg-[#6366f1]/10 rounded-full blur-3xl"
                  style={{ top: '55%', right: '8%' }}
                  animate={{
                    y: [0, 18, 0],
                    x: [0, -18, 0],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                <motion.div
                  className="absolute w-28 h-28 bg-[#1c3ff9]/14 rounded-full blur-2xl"
                  style={{ bottom: '18%', left: '68%' }}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 10, 0],
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
                <motion.div
                  className="absolute w-34 h-34 bg-[#3B82F6]/8 rounded-full blur-3xl"
                  style={{ top: '28%', left: '78%' }}
                  animate={{
                    y: [0, 14, 0],
                    x: [0, -12, 0],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </div>
            </div>
            
            {/* Contenu au-dessus du quadrillage */}
            <div className="relative z-10 py-6 md:py-8">
              <div className="kapta-section-marker justify-center mb-4">
                <span className="font-mono text-[10px] sm:text-xs text-[#1c3ff9] tracking-widest">04</span>
                <span className="font-mono text-[10px] sm:text-xs text-[#A1A1AA] uppercase tracking-widest">Portfolio</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-3 md:mb-4 leading-tight">
                Nos <span className="text-[#1c3ff9]">réalisations vidéo</span>
              </h2>
              
              <p className="text-sm md:text-base text-[#52525B] max-w-2xl mx-auto mb-6">
                Découvrez les vidéos professionnelles que nous créons et intégrons sur les fiches Google
              </p>
              
              {/* Bouton dépliable avec animation de pulsation */}
              <motion.button
                onClick={() => {
                  setVideosExpanded(!videosExpanded);
                  if (!videosExpanded) {
                    Analytics.trackVideoInteraction('expand', 'Videos Section');
                  } else {
                    Analytics.trackVideoInteraction('collapse', 'Videos Section');
                  }
                }}
                animate={!videosExpanded ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl btn-shimmer group relative"
              >
                {/* Effet de pulsation visuel autour du bouton */}
                {!videosExpanded && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-[#1c3ff9]"
                    animate={{
                      scale: [1, 1.3, 1.3],
                      opacity: [0.5, 0, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                )}
                
                <Camera className="w-4 h-4" />
                <span>{videosExpanded ? 'Masquer les vidéos' : 'Voir nos 6 vidéos'}</span>
                <motion.div
                  animate={{ rotate: videosExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.div>
        
        {/* Conteneur des vidéos avec animation fluide */}
        <motion.div
          initial={false}
          animate={{
            height: videosExpanded ? 'auto' : 0,
            opacity: videosExpanded ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="pb-4 md:pb-6">
            {/* Grille responsive pour desktop, scroll horizontal pour mobile */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 px-4">
              {[
                { id: 1, videoId: "U6FaRhs9W2c", title: "Vidéo 1" },
                { id: 2, videoId: "Pw_k894Lsk0", title: "Vidéo 2" },
                { id: 3, videoId: "GnDY-5dOt3Q", title: "Vidéo 3" },
                { id: 4, videoId: "EiySSMwTCz4", title: "Vidéo 4" },
                { id: 5, videoId: "D9M0JMP_V5I", title: "Vidéo 5" },
                { id: 6, videoId: "q2CnDcUkiMM", title: "Vidéo 6" }
              ].map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={videosExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: videosExpanded ? index * 0.08 : 0 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                    setSelectedVideo(video.videoId);
                  }}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#1c3ff9]/30 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      
                      {/* Bouton play */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#1534d4] transition-all duration-300">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                        </div>
                      </div>
                      
                      {/* Badge numéro */}
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Version mobile - Scroll horizontal */}
            <div className="md:hidden">
              <div 
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
                onScroll={(e) => {
                  const container = e.target;
                  const scrollLeft = container.scrollLeft;
                  const maxScroll = container.scrollWidth - container.clientWidth;
                  const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
                  
                  const progressBar = document.querySelector('.youtube-progress-bar');
                  if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                  }
                }}
              >
                {[
                  { id: 1, videoId: "U6FaRhs9W2c" },
                  { id: 2, videoId: "Pw_k894Lsk0" },
                  { id: 3, videoId: "GnDY-5dOt3Q" },
                  { id: 4, videoId: "EiySSMwTCz4" },
                  { id: 5, videoId: "D9M0JMP_V5I" },
                  { id: 6, videoId: "q2CnDcUkiMM" }
                ].map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={videosExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: videosExpanded ? index * 0.05 : 0 }}
                    className="min-w-[280px] snap-start group cursor-pointer"
                    onClick={() => {
                      Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                      setSelectedVideo(video.videoId);
                    }}
                  >
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        
                        {/* Bouton play */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl">
                            <div className="w-0 h-0 border-l-[7px] border-l-white border-y-[5px] border-y-transparent ml-1"></div>
                          </div>
                        </div>
                        
                        {/* Badge numéro */}
                        <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Indicateur de scroll mobile */}
              <div className="flex flex-col items-center mt-4 space-y-2">
                <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="youtube-progress-bar h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                    style={{ width: '0%' }}
                  />
                </div>
                <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
                  <span>Glissez pour voir plus</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Modal Visualiseur avec branding Kapta */}
    {selectedVideo && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header avec branding Kapta */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c3ff9] flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] text-sm">KAPTA Media</h3>
                <p className="text-xs text-[#52525B]">Optimisation Google Maps</p>
              </div>
            </div>
            <button
              onClick={() => {
                Analytics.trackVideoInteraction('close', selectedVideo);
                setSelectedVideo(null);
              }}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Vidéo YouTube */}
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Vidéo KAPTA"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Footer avec CTA */}
          <div className="p-4 bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#52525B]">
                Votre commerce mérite la même transformation
              </p>
              <Button 
                className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  Analytics.trackCTAClick('Réserver mon audit', 'Video Modal');
                  Analytics.trackAuditRequest('Video Modal');
                  setSelectedVideo(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Réserver mon audit
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
    </>
  );
};

// Mechanism Section
const Mechanism = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      id: "01", 
      title: "AUDIT GRATUIT", 
      icon: Radar,
      description: "Je regarde votre fiche Google, celle de vos 3 concurrents, et je vous montre où vous perdez des clients. 15 minutes."
    },
    { 
      id: "02", 
      title: "TOURNAGE", 
      icon: Camera,
      description: "Je filme votre équipe, votre espace, vos produits. 2h chez vous, sans perturber votre service."
    },
    { 
      id: "03", 
      title: "MISE EN LIGNE", 
      icon: Cpu,
      description: "Vidéo + photos + textes optimisés pour que Google vous comprenne. Votre fiche passe de 'basique' à 'premium' en 48h."
    },
    { 
      id: "04", 
      title: "RÉSULTATS", 
      icon: Trophy,
      description: "Vous montez dans le classement. On suit votre position chaque semaine pendant 30 jours."
    }
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < 3 ? prev + 1 : prev));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section 
      id="mechanism"
      ref={ref}
      className="py-4 md:py-8 bg-white relative"
      data-testid="mechanism-section"
    >
      {/* Floating brand pins */}
      <div className="absolute top-20 left-10 w-12 h-12 opacity-5 hidden md:block">
        <MapPin className="w-full h-full text-[#1c3ff9]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="05"
          label="Comment ça marche"
          title="4 ÉTAPES,"
          highlight="14 JOURS"
          description="Concrètement, voici ce qui se passe."
        />
        
        {/* Steps */}
        <div className="relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div key={step.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`relative p-4 md:p-6 rounded-2xl bg-white border-2 transition-all duration-500 card-hover ${
                    i <= activeStep 
                      ? "border-[#1c3ff9] shadow-glow-sm" 
                      : "border-[#E4E4E7]"
                  }`}
                  data-testid={`step-${step.id}`}
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 transition-colors duration-500 ${
                    i <= activeStep ? "bg-[#1c3ff9]" : "bg-[#F8F9FA]"
                  }`}>
                    <step.icon className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${
                      i <= activeStep ? "text-white" : "text-[#52525B]"
                    }`} />
                  </div>
                  
                  <span className="font-mono text-[10px] md:text-xs text-[#A1A1AA] mb-1 md:mb-2 block">{step.id}</span>
                  <h3 className="text-sm md:text-lg font-bold text-[#0A0A0A] mb-1 md:mb-2">{step.title}</h3>
                  <p className="text-[11px] md:text-sm text-[#52525B] leading-relaxed">{step.description}</p>
                  
                  {/* Coche verte qui apparaît après l'animation de la ligne */}
                  {i <= activeStep && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        duration: 0.5,
                        delay: i * 1.2 + 0.8,
                        type: "spring",
                        stiffness: 200
                      }}
                      className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#10B981] flex items-center justify-center shadow-lg"
                    >
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Ligne de progression entre les cartes (sauf après la dernière) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 md:-right-6 w-3 md:w-6 h-1 -translate-y-1/2 z-0">
                    {/* Ligne de fond grise */}
                    <div className="absolute inset-0 bg-[#E4E4E7] rounded-full" />
                    
                    {/* Ligne bleue animée */}
                    <motion.div
                      className="absolute inset-0 bg-[#1c3ff9] rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      animate={isInView && activeStep > i ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ 
                        duration: 0.8,
                        delay: i * 1.2,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="pricing"
      ref={ref}
      className="py-8 md:py-16 bg-gradient-to-br from-[#F8F9FA] via-[#F1F5F9] to-[#F8F9FA] relative overflow-hidden"
      data-testid="pricing-section"
    >
      {/* Quadrillage subtil en fond */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(rgba(28,63,249,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(28,63,249,0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Artefacts blur animés passifs */}
      <motion.div
        className="absolute w-64 h-64 bg-[#1c3ff9]/8 rounded-full blur-3xl"
        style={{ top: '10%', left: '5%' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-[#6366f1]/6 rounded-full blur-3xl"
        style={{ bottom: '10%', right: '5%' }}
        animate={{
          y: [0, 25, 0],
          x: [0, -20, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-[#3B82F6]/5 rounded-full blur-3xl"
        style={{ top: '50%', right: '15%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#1c3ff9]/20 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#1c3ff9]/30 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader 
            number="06"
            label="Tarif"
            title="TARIF PILOTE"
            highlight="350€"
            description=""
          />
        </motion.div>
        
        {/* Single Pricing Card - Version compacte */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileInView={{ y: [0, -10, 0] }}
          viewport={{ once: false }}
          className="max-w-lg mx-auto"
        >
          <div className="relative p-4 sm:p-5 md:p-6 rounded-2xl bg-white border-2 border-[#1c3ff9] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            style={{
              boxShadow: '0 20px 60px -15px rgba(28, 63, 249, 0.3), 0 10px 30px -10px rgba(28, 63, 249, 0.2)'
            }}
          >
            {/* Glow effect animé */}
            <motion.div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1c3ff9]/10 via-transparent to-[#1c3ff9]/10"
              animate={{
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Badge with animation */}
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              whileInView={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, repeatDelay: 3 },
                rotate: { duration: 0.5, delay: 0.5 }
              }}
              viewport={{ once: false }}
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#1c3ff9] to-[#1534d4] text-white text-xs font-semibold shadow-lg"
            >
              <span className="relative z-10">5 PLACES RESTANTES</span>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            </motion.div>
            
            <div className="relative z-10">
              <div className="text-center mb-4 sm:mb-5">
                <p className="text-xs text-[#52525B] mb-1">Installation complète</p>
                <div className="flex items-baseline justify-center gap-2">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                    className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] relative"
                  >
                    350€
                    <div className="absolute -inset-2 bg-[#1c3ff9]/5 rounded-lg -z-10 animate-pulse" />
                  </motion.span>
                  <span className="text-sm text-[#52525B]">HT</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  <span className="line-through opacity-60">790€</span>
                  <span className="ml-2 text-[#10B981] font-semibold">-56%</span>
                </p>
              </div>
              
              <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                {[
                  "Vidéo professionnelle 4K (30-60 secondes)",
                  "15-20 photos HD de votre établissement",
                  "Optimisation complète de votre fiche Google",
                  "Borne NFC pour collecter des avis automatiquement",
                  "Suivi de position pendant 30 jours"
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 1 + (i * 0.1) }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#0A0A0A] leading-tight">{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="p-3 rounded-xl bg-gradient-to-r from-[#10B981]/5 to-[#059669]/5 border border-[#10B981]/20 mb-4 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#10B981] to-[#059669]" />
                <p className="text-xs text-center text-[#0A0A0A] leading-tight">
                  <span className="font-semibold">Garantie satisfait ou remboursé :</span> Pas satisfait du travail livré ? Remboursement intégral sous 30 jours.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <Button 
                  className="w-full py-4 sm:py-5 bg-gradient-to-r from-[#1c3ff9] to-[#1534d4] hover:from-[#1534d4] hover:to-[#1c3ff9] text-white font-semibold text-sm shadow-glow btn-shimmer relative overflow-hidden group"
                  data-testid="cta-pricing-premium"
                  onClick={() => {
                    Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Pricing Section');
                    Analytics.trackAuditRequest('Pricing Section');
                    Analytics.trackServiceInterest();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    RÉSERVER MON AUDIT GRATUIT
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                </Button>
              </motion.div>
              
              <p className="text-center text-[10px] sm:text-xs text-[#52525B] mt-3 opacity-75">
                En échange du tarif pilote, nous vous demanderons un témoignage vidéo si vous êtes satisfait.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const faqs = [
    {
      question: "Vous avez déjà des clients satisfaits ?",
      answer: "Nous lançons notre activité sur Tours. Les 5 premiers partenaires sont en cours d'installation. Leurs résultats (avec captures d'écran Google Maps) seront publiés sous 30 jours. C'est pour ça qu'on propose le tarif pilote à 350€ au lieu de 790€.",
      icon: Trophy
    },
    {
      question: "Pourquoi Tours ?",
      answer: "On commence par une ville pour bien maîtriser notre processus avant de s'étendre. Tours est notre zone pilote. Les premiers partenaires bénéficient des meilleurs tarifs.",
      icon: MapPin
    },
    {
      question: "Combien de temps ça prend vraiment ?",
      answer: "Audit gratuit : 15 minutes par téléphone. Tournage : 2h chez vous, sans perturber votre service. Mise en ligne : 48h après le tournage. Premiers résultats : 14 jours en moyenne, garantie Top 5 sous 30 jours.",
      icon: Calendar
    },
    {
      question: "C'est un abonnement ?",
      answer: "Non. Paiement unique de 350€. Pas de frais cachés, pas d'engagement. Vous payez une fois, vous gardez tout à vie : vidéo, photos, optimisations, borne NFC.",
      icon: Check
    },
    {
      question: "C'est quoi la borne NFC ?",
      answer: "Un petit support élégant que vous placez à la caisse. Vos clients satisfaits le scannent avec leur smartphone et laissent un avis Google en 10 secondes. C'est le meilleur moyen de collecter des avis positifs sans demander.",
      icon: Nfc
    },
    {
      question: "Et si ça ne marche pas ?",
      answer: "Garantie satisfait ou remboursé. Si vous n'êtes pas satisfait du travail livré (vidéo, photos, optimisation), on vous rembourse intégralement sous 30 jours. Sans discussion.",
      icon: ShieldCheck
    }
  ];

  return (
    <section 
      id="faq"
      ref={ref}
      className="py-8 md:py-16 bg-gradient-to-br from-white via-[#F8F9FA] to-white relative overflow-hidden"
      data-testid="faq-section"
    >
      {/* Quadrillage subtil en fond */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(28,63,249,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(28,63,249,0.04) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Artefacts blur animés */}
      <motion.div
        className="absolute w-48 h-48 bg-[#1c3ff9]/6 rounded-full blur-3xl"
        style={{ top: '15%', right: '10%' }}
        animate={{
          y: [0, -20, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-56 h-56 bg-[#10B981]/5 rounded-full blur-3xl"
        style={{ bottom: '20%', left: '8%' }}
        animate={{
          y: [0, 18, 0],
          x: [0, -12, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="07"
          label="Questions"
          title="VOS QUESTIONS,"
          highlight="NOS RÉPONSES"
        />
        
        {/* Guarantee Box - Version améliorée */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileInView={{ scale: [1, 1.02, 1] }}
          viewport={{ once: false }}
          className="mb-6 md:mb-8 p-4 md:p-5 rounded-xl bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border-2 border-[#10B981]/30 relative overflow-hidden"
          data-testid="guarantee-box"
          style={{
            boxShadow: '0 10px 30px -10px rgba(16, 185, 129, 0.2)'
          }}
        >
          {/* Barre verte en haut */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] to-[#059669]" />
          
          <div className="flex items-start gap-3 md:gap-4">
            <motion.div 
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0 shadow-lg"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#0A0A0A] mb-1">Garantie 30 Jours</h3>
              <p className="text-xs md:text-sm text-[#52525B] leading-relaxed">
                Aucun résultat visible en 30 jours ? Remboursement intégral. Sans question.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + (i * 0.1) }}
              >
                <AccordionItem 
                  value={`item-${i}`}
                  className="border-2 border-[#E4E4E7] rounded-xl px-4 md:px-5 bg-white data-[state=open]:border-[#1c3ff9] data-[state=open]:shadow-lg transition-all duration-300 hover:border-[#1c3ff9]/50"
                  data-testid={`faq-item-${i}`}
                >
                  <AccordionTrigger 
                    className="text-left text-sm md:text-base font-semibold text-[#0A0A0A] hover:no-underline py-4 md:py-4 group"
                    onClick={() => Analytics.trackFAQClick(faq.question)}
                  >
                    <div className="flex items-center gap-3 pr-4">
                      <div className="w-8 h-8 rounded-lg bg-[#1c3ff9]/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-[#1c3ff9] transition-colors">
                        <faq.icon className="w-4 h-4 text-[#1c3ff9] group-data-[state=open]:text-white transition-colors" />
                      </div>
                      <span>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-[#52525B] pb-4 leading-relaxed pl-11">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Form Section
const ContactForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);

  // Ensure Calendly widget loads properly when shown
  useEffect(() => {
    if (showCalendly && window.Calendly) {
      setTimeout(() => {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/charly-silva/appel-decouverte',
          parentElement: document.querySelector('.calendly-inline-widget'),
          prefill: {},
          utm: {}
        });
      }, 100);
    }
  }, [showCalendly]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const openCalendly = () => {
    setActiveDropdown(null);
    setShowCalendly(true);
    // Scroll vers le widget Calendly après un court délai
    setTimeout(() => {
      document.querySelector('.calendly-section')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  };

  return (
    <section 
      id="contact"
      ref={ref}
      className="py-12 md:py-32 bg-[#F8F9FA] relative overflow-hidden"
      data-testid="contact-section"
    >
      {/* Background brand pattern */}
      <div className="absolute inset-0 kapta-dots" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="07"
          label="Contact"
          title="AUDIT"
          highlight="GRATUIT"
          description=""
        />
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center text-xs md:text-sm text-[#52525B] max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed"
        >
          <span className="font-semibold text-[#0A0A0A]">5 places disponibles</span> pour le lancement. 
          Choisissez votre méthode de contact préférée.
          <br />
          <span className="text-xs text-[#A1A1AA] italic">
            Le calendrier nécessite quelques secondes de chargement pour s'afficher correctement.
          </span>
        </motion.p>
        
        {/* Quick contact options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          {/* WhatsApp */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('whatsapp')}
              className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20bd5a] transition-colors shadow-lg"
              title="WhatsApp"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </button>
          </div>

          {/* Téléphone */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('phone')}
              className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 text-gray-700 flex items-center justify-center hover:border-[#1c3ff9] hover:text-[#1c3ff9] transition-colors shadow-lg"
              title="Téléphone"
            >
              <Phone className="w-7 h-7" />
            </button>
          </div>

          {/* Calendrier */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('calendar')}
              className="w-16 h-16 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center hover:bg-[#1534d4] transition-colors shadow-lg"
              title="Calendrier"
            >
              <Calendar className="w-7 h-7" />
            </button>
          </div>
        </motion.div>

        {/* Popups centrées avec Flexbox */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 z-40 bg-black/20 flex items-center justify-center p-4" 
            onClick={() => setActiveDropdown(null)}
          >
            {activeDropdown === 'whatsapp' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-600 mb-3">Contactez-nous directement sur WhatsApp</p>
                  <a 
                    href="https://wa.me/33686018054?text=Bonjour%2C%20je%20souhaite%20un%20audit%20gratuit%20pour%20mon%20commerce."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors"
                    onClick={() => {
                      Analytics.trackWhatsAppClick();
                      Analytics.trackAuditRequest('WhatsApp Contact');
                      setActiveDropdown(null);
                    }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Ouvrir WhatsApp
                  </a>
                </div>
              </motion.div>
            )}

            {activeDropdown === 'phone' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
                  <p className="text-sm text-gray-600 mb-3">Appelez-nous directement</p>
                  <a 
                    href="tel:0686018054"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg hover:bg-[#1534d4] transition-colors"
                    onClick={() => {
                      Analytics.trackPhoneClick('06 86 01 80 54', 'Contact Section Popup');
                      setActiveDropdown(null);
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    06 86 01 80 54
                  </a>
                </div>
              </motion.div>
            )}

            {activeDropdown === 'calendar' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-2">Calendrier</h3>
                  <p className="text-sm text-gray-600 mb-3">Réservez un créneau dans notre calendrier</p>
                  <button 
                    onClick={() => {
                      Analytics.trackCalendlyOpen('Contact Section Popup');
                      openCalendly();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg hover:bg-[#1534d4] transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Voir le calendrier
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
        
        {/* Calendly Widget - Only show when requested */}
        {showCalendly && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="calendly-section p-2 sm:p-5 md:p-8 rounded-xl md:rounded-2xl bg-white shadow-premium-xl border border-[#E4E4E7] overflow-hidden mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Réserver votre audit gratuit</h3>
              <button 
                onClick={() => setShowCalendly(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Fermer le calendrier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Début de widget en ligne Calendly */}
            <div 
              className="calendly-inline-widget" 
              data-url="https://calendly.com/charly-silva/appel-decouverte"
              data-auto-load="false"
              style={{
                minWidth: '280px',
                width: '100%',
                height: '650px',
                border: 'none'
              }}
            />
            
            {/* Fallback si Calendly ne charge pas */}
            <div className="calendly-fallback text-center py-8" style={{display: 'none'}}>
              <h3 className="text-lg font-semibold mb-4">Réserver un appel découverte</h3>
              <p className="text-gray-600 mb-4">Le calendrier se charge...</p>
              <a 
                href="https://calendly.com/charly-silva/appel-decouverte" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c3ff9] text-white rounded-lg hover:bg-[#1534d4] transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Ouvrir Calendly
              </a>
            </div>
            {/* Fin de widget en ligne Calendly */}
          </motion.div>
        )}

        {/* Message d'invitation si Calendly n'est pas encore ouvert */}
        {!showCalendly && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100"
          >
            <Calendar className="w-8 h-8 text-[#1c3ff9] mx-auto mb-3" />
            <p className="text-gray-600 mb-4">
              Cliquez sur l'icône <strong>Calendrier</strong> ci-dessus pour réserver votre créneau
            </p>
            <button 
              onClick={() => {
                Analytics.trackCalendlyOpen('Contact Section Bottom');
                openCalendly();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1c3ff9] text-white rounded-lg hover:bg-[#1534d4] transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Ouvrir le calendrier
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  return (
    <footer className="py-12 md:py-24 bg-[#0A0A0A] relative overflow-hidden" data-testid="footer">
      {/* Background brand decoration */}
      <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03] hidden md:block">
        <MapPin className="w-full h-full text-white" />
      </div>
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-[0.03] rotate-12 hidden md:block">
        <MapPin className="w-full h-full text-white" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Tagline */}
        <p className="text-center text-[10px] sm:text-xs font-mono text-[#1c3ff9] tracking-[0.2em] sm:tracking-[0.3em] mb-4 md:mb-6">
          — LA VISIBILITÉ, C'EST NOUS —
        </p>
        
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight px-2">
            IL N'Y A QU'UNE PLACE DE <span className="text-[#1c3ff9]">N°1</span>
          </h2>
          <p className="text-base md:text-lg text-[#A1A1AA] mb-6 md:mb-8">
            Par quartier. Par ville. <span className="text-white font-medium">Par zone.</span>
          </p>
          
          <Button 
            size="lg"
            className="w-full sm:w-auto bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-8 md:px-10 py-5 md:py-7 text-base md:text-lg font-semibold shadow-glow btn-shimmer"
            data-testid="cta-footer"
            onClick={() => {
              Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Footer Section');
              Analytics.trackAuditRequest('Footer Section');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            RÉSERVER MON AUDIT GRATUIT
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        <div className="border-t border-[#1f1f1f] pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <a href="#" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_e9af3148-6038-40b0-a95f-b7160e86bcee/artifacts/v4yy8wt0_logo2.webp" 
              alt="KAPTA Media - Logo agence marketing local Tours" 
              loading="lazy"
              className="h-5 md:h-6 w-auto brightness-0 invert"
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                WebkitUserDrag: 'none',
                WebkitTouchCallout: 'none'
              }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </a>
          
          <p className="text-[10px] md:text-xs font-mono text-[#52525B] tracking-wider hidden md:block">
            LA VISIBILITÉ, C'EST NOUS.
          </p>
          
          <div className="flex items-center gap-4 md:gap-6">
            <a 
              href="tel:0686018054" 
              className="text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base"
              onClick={() => Analytics.trackPhoneClick('06 86 01 80 54', 'Footer')}
            >
              <Phone className="w-4 h-4" />
              06 86 01 80 54
            </a>
          </div>
        </div>
        
        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs text-[#52525B]">
          <button onClick={() => document.getElementById('modal-mentions')?.classList.remove('hidden')} className="hover:text-white transition-colors">
            Mentions légales
          </button>
          <button onClick={() => document.getElementById('modal-privacy')?.classList.remove('hidden')} className="hover:text-white transition-colors">
            Politique de confidentialité
          </button>
          <button onClick={() => document.getElementById('modal-cgv')?.classList.remove('hidden')} className="hover:text-white transition-colors">
            CGV
          </button>
        </div>
        
        <p className="text-center text-xs md:text-sm text-[#52525B] mt-4 md:mt-6">
          © 2025 Kapta Media. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

// Mobile Sticky CTA
const MobileStickyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [hideOnContact, setHideOnContact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };

    // Observer pour détecter quand on arrive sur la section contact
    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'contact') {
            setHideOnContact(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.3, // Se déclenche quand 30% de la section est visible
        rootMargin: '-100px 0px' // Marge pour ajuster le déclenchement
      }
    );

    // Observer la section contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactObserver.observe(contactSection);
    }

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      contactObserver.disconnect();
    };
  }, []);

  // Ne pas afficher si on n'est pas assez scrollé, mais laisser l'animation se faire pour hideOnContact
  if (!visible) return null;

  return (
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        y: hideOnContact ? 100 : 0
      }}
      exit={{ scale: 0, opacity: 0, y: 100 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        y: { duration: 0.4, ease: "easeInOut" }
      }}
      className="md:hidden sticky-cta-mobile"
      data-testid="mobile-sticky-cta"
    >
      <Button 
        className="w-14 h-14 bg-[#1c3ff9] hover:bg-[#1534d4] text-white font-semibold shadow-2xl rounded-full p-0 flex items-center justify-center group hover:scale-110 transition-all duration-200"
        onClick={() => {
          Analytics.trackCTAClick('AUDIT', 'Mobile Sticky CTA');
          Analytics.trackAuditRequest('Mobile Sticky CTA');
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        title="Audit gratuit"
      >
        <div className="flex flex-col items-center justify-center">
          <Calendar className="w-5 h-5 mb-0.5" />
          <span className="text-[8px] font-bold leading-none">AUDIT</span>
        </div>
      </Button>
    </motion.div>
  );
};

// Legal Modals Component
const LegalModals = () => (
  <>
    {/* Mentions Légales Modal */}
    <div id="modal-mentions" className="hidden fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={(e) => e.target.id === 'modal-mentions' && e.target.classList.add('hidden')}>
      <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4">Mentions Légales</h2>
        <div className="text-sm text-[#52525B] space-y-4">
          <p><strong>Éditeur du site :</strong> Kapta Media</p>
          <p><strong>Responsable de la publication :</strong> [Votre nom]</p>
          <p><strong>Adresse :</strong> [Votre adresse], Tours, France</p>
          <p><strong>Téléphone :</strong> 06 86 01 80 54</p>
          <p><strong>Email :</strong> contact@kaptamedia.fr</p>
          <p><strong>SIRET :</strong> [Numéro SIRET]</p>
          <p><strong>Hébergeur :</strong> [Nom de l'hébergeur]</p>
        </div>
        <button onClick={() => document.getElementById('modal-mentions')?.classList.add('hidden')} className="mt-6 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg">Fermer</button>
      </div>
    </div>
    
    {/* Politique de Confidentialité Modal */}
    <div id="modal-privacy" className="hidden fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={(e) => e.target.id === 'modal-privacy' && e.target.classList.add('hidden')}>
      <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4">Politique de Confidentialité</h2>
        <div className="text-sm text-[#52525B] space-y-4">
          <p><strong>Données collectées :</strong> Nom, email, téléphone, nom de l'établissement.</p>
          <p><strong>Finalité :</strong> Vous recontacter pour l'audit gratuit et le suivi de votre projet.</p>
          <p><strong>Conservation :</strong> Vos données sont conservées pendant 3 ans maximum.</p>
          <p><strong>Partage :</strong> Vos données ne sont jamais vendues ni partagées à des tiers.</p>
          <p><strong>Vos droits :</strong> Accès, rectification, suppression. Contactez-nous à contact@kaptamedia.fr</p>
          <p><strong>Cookies :</strong> Ce site n'utilise pas de cookies de tracking.</p>
        </div>
        <button onClick={() => document.getElementById('modal-privacy')?.classList.add('hidden')} className="mt-6 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg">Fermer</button>
      </div>
    </div>
    
    {/* CGV Modal */}
    <div id="modal-cgv" className="hidden fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={(e) => e.target.id === 'modal-cgv' && e.target.classList.add('hidden')}>
      <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4">Conditions Générales de Vente</h2>
        <div className="text-sm text-[#52525B] space-y-4">
          <p><strong>Prestation :</strong> Création de contenu vidéo et photo, optimisation de fiche Google Business, fourniture d'une borne NFC.</p>
          <p><strong>Tarif pilote :</strong> 350€ HT - Paiement unique, pas d'abonnement.</p>
          <p><strong>Livraison :</strong> Sous 14 jours ouvrés après le tournage.</p>
          <p><strong>Garantie :</strong> Satisfait ou remboursé sous 30 jours si vous n'êtes pas satisfait du travail livré.</p>
          <p><strong>Propriété :</strong> Vous êtes propriétaire de tous les contenus créés (vidéo, photos).</p>
          <p><strong>Témoignage :</strong> En contrepartie du tarif pilote, vous acceptez de fournir un témoignage vidéo si satisfait.</p>
        </div>
        <button onClick={() => document.getElementById('modal-cgv')?.classList.add('hidden')} className="mt-6 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg">Fermer</button>
      </div>
    </div>
  </>
);

// Main App Component
function App() {
  // Initialize analytics on mount
  useEffect(() => {
    Analytics.initAnalytics();
  }, []);

  return (
    <div className="App min-h-screen bg-white">
      <Navbar />
      <Hero />
      <BeforeAfter />
      <ProblemComparison />
      <CaseStudies />
      <Mechanism />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
      <MobileStickyCTA />
      <LegalModals />
    </div>
  );
}

export default App;
