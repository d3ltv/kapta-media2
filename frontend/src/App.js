import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "@/App.css";
import { motion, useInView, useTransform, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  Phone, 
  Check, 
  X, 
  Radar, 
  Camera, 
  Trophy,
  Star,
  Nfc,
  ShieldCheck,
  MapPin,
  TrendingUp,
  ChevronDown,
  Calendar,
  MessageCircle,
  Play,
  Pause
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import SEOHead from "@/components/SEOHead";
import CounterStat from "@/components/CounterStat";
import RippleButton from "@/components/RippleButton";
import LoadingScreen from "@/components/LoadingScreen";
import MorphingShapes from "@/components/MorphingShapes";
import PullToRefreshIndicator from "@/components/PullToRefreshIndicator";
import ParticleBackground from "@/components/ParticleBackground";
import MouseGradient from "@/components/MouseGradient";
import ReadingProgress from "@/components/ReadingProgress";
import useParallax from "@/hooks/useParallax";
import usePullToRefresh from "@/hooks/usePullToRefresh";
import useReducedMotion from "@/hooks/useReducedMotion";
import useKonamiCode from "@/hooks/useKonamiCode";
import { triggerConfetti } from "@/utils/confetti";
import haptics from "@/utils/haptics";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useTheme from "@/hooks/useTheme";
import * as Analytics from "@/utils/analytics";

// Animation variants - Variées pour chaque section
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const slideInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const rotateIn = {
  initial: { opacity: 0, rotate: -5, scale: 0.95 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const blurIn = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const LOGO_SRC_SET = "/logo-64.webp 64w, /logo-96.webp 96w, /logo-128.webp 128w";

const buildImageSrcSet = (imagePath) => {
  if (!imagePath || !imagePath.startsWith("/")) return undefined;
  const extensionIndex = imagePath.lastIndexOf(".");
  if (extensionIndex === -1) return undefined;

  const base = imagePath.slice(0, extensionIndex);
  const ext = imagePath.slice(extensionIndex);

  return `${base}-320w${ext} 320w, ${base}-560w${ext} 560w, ${base}-640w${ext} 640w, ${base}-960w${ext} 960w, ${imagePath} 1080w`;
};

const updateScrollProgress = (container, progressRef) => {
  if (!container || !progressRef?.current) return;
  const maxScroll = container.scrollWidth - container.clientWidth;
  const progress = maxScroll > 0 ? (container.scrollLeft / maxScroll) * 100 : 0;
  progressRef.current.style.width = `${progress}%`;
};

// Carrousel de texte rotatif
const RotatingText = () => {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  
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
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || reduceMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3500);

    return () => {
      clearInterval(interval);
    };
  }, [isMobile, reduceMotion, texts.length]);

  const displayIndex = isMobile ? 0 : currentIndex;
  const CurrentIcon = texts[displayIndex].icon;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-6 flex items-center justify-center overflow-hidden mb-2">
        <motion.div
          key={displayIndex}
          initial={reduceMotion ? false : { opacity: 0, x: 50 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex items-center gap-2"
        >
          <CurrentIcon className="w-4 h-4 text-[#1c3ff9]" />
          <p className="text-sm text-[#52525B] font-medium">
            {texts[displayIndex].text}
          </p>
        </motion.div>
      </div>
      
      {/* Barre de progression */}
      {!isMobile && !reduceMotion && <div className="w-24 h-px bg-gray-100 rounded-full overflow-hidden opacity-30">
        <motion.div
          key={`progress-${currentIndex}`}
          className="h-full bg-[#1c3ff9] rounded-full opacity-50"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "linear" }}
        />
      </div>}
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
const Navbar = ({ onCTAClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { label: "Accueil", href: "#", icon: "🏠" },
    { label: "Solution", href: "#solution", icon: "⚙️" },
    { label: "Tarifs", href: "#pricing", icon: "💰" },
    { label: "Blog", href: "/blog", icon: "📝" },
    { label: "FAQ", href: "#faq", icon: "❓" },
    { label: "Contact", href: "#contact", icon: "📞" }
  ];

  const handleMenuClick = (href) => {
    setMobileMenuOpen(false);

    if (href.startsWith("/")) {
      return;
    }

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const handleDesktopMenuClick = (href) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  const mobileMenuLayer = mobileMenuOpen && typeof document !== "undefined"
    ? createPortal(
      <>
        <div
          className="fixed inset-0 z-[70] bg-black/45 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <motion.div
          id="mobile-menu-panel"
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.16 }}
          className="fixed right-4 z-[71] w-[min(20rem,calc(100vw-2rem))] bg-white dark:bg-[#10131A] rounded-2xl shadow-2xl border border-gray-100 dark:border-[#2A2E39] overflow-hidden md:hidden"
          style={{ top: "calc(4rem + env(safe-area-inset-top))" }}
          role="dialog"
          aria-modal="true"
        >
          <div className="p-2">
            {menuItems.map((item, index) => {
              const isRoute = item.href.startsWith("/");

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: index * 0.03 }}
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
                </motion.div>
              );
            })}
          </div>
          <div className="px-4 pb-2 pt-1 border-t border-gray-100 dark:border-[#2A2E39]">
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} className="w-full justify-center" />
          </div>

          <div className="p-4 border-t border-gray-100 dark:border-[#2A2E39]">
            <Button
              className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg btn-shimmer cta-pulse-subtle"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (onCTAClick) {
                  onCTAClick(e, 'Mobile Menu');
                } else {
                  Analytics.trackCTAClick("AUDIT GRATUIT", "Mobile Menu");
                  Analytics.trackAuditRequest("Mobile Menu");
                  handleMenuClick("#contact");
                }
              }}
            >
              AUDIT GRATUIT
            </Button>
          </div>

          <div className="border-t border-gray-100 dark:border-[#2A2E39] p-4 bg-[#F8F9FA] dark:bg-[#171B24]">
            <a
              href="tel:0686018054"
              className="flex items-center gap-2 text-sm text-[#52525B] dark:text-[#C2C8D8] hover:text-[#1c3ff9] transition-colors"
              onClick={() => {
                Analytics.trackPhoneClick("06 86 01 80 54", "Mobile Menu");
                setMobileMenuOpen(false);
              }}
            >
              <Phone className="w-4 h-4" />
              06 86 01 80 54
            </a>
          </div>
        </motion.div>
      </>,
      document.body,
    )
    : null;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glassmorphism shadow-premium" : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a href="#" className="flex items-center gap-2 custom-cursor-pointer" data-testid="logo">
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
                className="h-6 md:h-8 w-auto logo-transparent logo-isolated logo-animated"
                style={{
                  background: "transparent !important",
                  mixBlendMode: "multiply",
                  filter: "contrast(1.4) brightness(1.1) saturate(1.2)",
                  pointerEvents: "none",
                  userSelect: "none",
                  WebkitUserDrag: "none",
                  WebkitTouchCallout: "none"
                }}
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg md:text-xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F3F6FF] font-display" style={{ fontFamily: "Space Grotesk, sans-serif" }}>KAPTA</span>
                <span className="text-base md:text-lg font-medium italic gradient-text-brand" style={{ fontFamily: "Inter, sans-serif" }}>media</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => {
                  Analytics.trackMenuClick("Solution");
                  handleDesktopMenuClick("#solution");
                }}
                className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
              >
                Solution
              </button>
              <button
                onClick={() => {
                  Analytics.trackMenuClick("Tarifs");
                  handleDesktopMenuClick("#pricing");
                }}
                className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
              >
                Tarifs
              </button>
              <Link
                to="/blog"
                onClick={() => Analytics.trackMenuClick("Blog")}
                className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
              >
                Blog
              </Link>
              <button
                onClick={() => {
                  Analytics.trackMenuClick("FAQ");
                  handleDesktopMenuClick("#faq");
                }}
                className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
              >
                FAQ
              </button>
              <ThemeToggle isDark={isDark} onToggle={toggleTheme} compact />
              <Button
                data-testid="cta-audit-desktop"
                className="gradient-brand-hover text-white rounded-full px-6 btn-shimmer shadow-lg hover:shadow-xl transition-all cta-pulse-subtle"
                onClick={(e) => {
                  if (onCTAClick) {
                    onCTAClick(e, 'Navbar Desktop');
                  } else {
                    Analytics.trackCTAClick("AUDIT GRATUIT", "Navbar Desktop");
                    Analytics.trackAuditRequest("Navbar Desktop");
                    handleDesktopMenuClick("#contact");
                  }
                }}
              >
                AUDIT GRATUIT
              </Button>
            </div>

            <div className="md:hidden relative">
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-white/25 dark:bg-[#101722]/85 border border-white/35 dark:border-[#2A2E39] shadow-lg transition-all duration-300"
                data-testid="mobile-menu-button"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-panel"
              >
                <motion.div
                  animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
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
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuLayer}
    </>
  );
};

// Hero Section - INCHANGÉ
const Hero = ({ onCTAClick }) => {
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.3);
  
  return (
    <section 
      ref={parallaxRef}
      className="relative min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#070B14] dark:via-[#05070C] dark:to-[#0C1526]"
      data-testid="hero-section"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.08)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(rgba(147,197,253,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#070B14]/80 dark:via-[#05070C]/40 dark:to-[#0A1220]/90 pointer-events-none" />
      
      {/* Soft Glow with Parallax */}
      <motion.div 
        style={{ y: parallaxY }}
        className="ios-mobile-heavy-blur hidden md:block absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#1c3ff9]/10 dark:bg-[#3B82F6]/16 rounded-full blur-[120px] pointer-events-none parallax-slow"
      />
      <motion.div 
        style={{ y: useTransform(parallaxY, (v) => v * -0.5) }}
        className="ios-mobile-heavy-blur absolute -top-20 left-[18%] w-[360px] h-[360px] hidden md:dark:block bg-[#60A5FA]/14 rounded-full blur-[130px] pointer-events-none parallax-medium"
      />
      <motion.div 
        style={{ y: useTransform(parallaxY, (v) => v * 0.7) }}
        className="ios-mobile-heavy-blur absolute bottom-[-120px] right-[12%] w-[420px] h-[420px] hidden md:dark:block bg-[#1D4ED8]/12 rounded-full blur-[150px] pointer-events-none parallax-fast"
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Left - Text Content */}
          <div className="order-1 lg:order-1 max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div 
              initial={false}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c3ff9]/5 border border-[#1c3ff9]/10 mb-8 md:mb-10"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-[#1c3ff9]">Visibilité locale renforcée en 14 jours</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={false}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] leading-[1.05] mb-8 md:mb-10"
            >
              Votre concurrent est{" "}
              <span className="text-[#1c3ff9]">N°1</span>.
              <br />
              <span className="text-[#71717A] dark:text-[#BFC9DD]">Ça vous va ?</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={false}
              className="text-base md:text-lg text-[#52525B] dark:text-[#C7CFDE] max-w-xl mx-auto mb-10 md:mb-12 leading-relaxed"
            >
              On améliore votre <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F7FF]">visibilité Google Maps</span> avec 
              une vidéo pro + une fiche Google qui donne envie d'appeler.
            </motion.p>
            
            {/* CTA */}
            <motion.div 
              initial={false}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16 px-4 sm:px-0"
            >
              <Button 
                data-testid="cta-hero-primary"
                size="lg"
                className="w-auto sm:w-auto bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer cta-pulse-subtle group transition-all duration-300 border-2 border-white/20"
                onClick={(e) => onCTAClick?.(e, 'Hero Section')}
              >
                RÉSERVER MON AUDIT GRATUIT
                <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {/* Rotating Text Carousel */}
            <motion.div 
              initial={false}
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
          onClick={() => document.querySelector('[data-testid="maps-split-section"]')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-2 text-[#A1A1AA] hover:text-[#1c3ff9] transition-colors cursor-pointer group"
          aria-label="Découvrir la section suivante"
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

// MapsSplit Section - Adapté du BTP en bleu/blanc
const MapsSplit = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const BEFORE_RESULTS = [
    {pos:"1",name:"Concurrent A",stars:"4.8",n:"62",active:true},
    {pos:"2",name:"Concurrent B",stars:"4.5",n:"41",active:false},
    {pos:"3",name:"Concurrent C",stars:"4.7",n:"28",active:false},
    {pos:"5",name:"Votre entreprise",stars:"3.9",n:"4",you:true,youType:"before"},
  ];

  const AFTER_RESULTS = [
    {pos:"1",name:"Votre entreprise",stars:"4.9",n:"37",you:true,youType:"after"},
    {pos:"2",name:"Concurrent A",stars:"4.8",n:"62",active:false},
    {pos:"3",name:"Concurrent B",stars:"4.5",n:"41",active:false},
  ];

  const MapsResult = ({r}) => {
    return (
      <motion.div 
        className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
          r.youType === "after" 
            ? "glass-card border-2 border-[#1c3ff9]/40 shadow-lg" 
            : r.youType === "before"
            ? "bg-white/50 dark:bg-[#1A1D24]/50 border border-gray-200 dark:border-[#2A2E39] opacity-60"
            : r.active
            ? "bg-white dark:bg-[#1A1D24] border border-gray-200 dark:border-[#2A2E39]"
            : "bg-white/70 dark:bg-[#1A1D24]/70 border border-gray-100 dark:border-[#2A2E39]/50"
        }`}
        whileHover={{ scale: r.youType ? 1.02 : 1, y: r.youType ? -2 : 0 }}
      >
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-md ${
            r.youType === "after" 
              ? "bg-gradient-to-br from-[#0052FF] to-[#1c3ff9] text-white" 
              : r.active 
              ? "bg-gray-300 dark:bg-[#2A2E39] text-gray-700 dark:text-gray-300" 
              : "bg-gray-200 dark:bg-[#2A2E39]/50 text-gray-500 dark:text-gray-400"
          }`}
        >
          {r.pos}
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className={`font-bold text-sm truncate ${
            r.youType === "after" ? "text-[#1c3ff9] dark:text-[#6B9FFF]" : "text-gray-900 dark:text-gray-200"
          }`}>
            {r.name}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            {r.stars} <span className="text-gray-400">({r.n} avis)</span>
          </div>
        </div>
        {r.you && (
          <span 
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              r.youType === "after" 
                ? "bg-gradient-to-r from-[#0052FF] to-[#1c3ff9] text-white shadow-md" 
                : "bg-gray-200 dark:bg-[#2A2E39] text-gray-600 dark:text-gray-400"
            }`}
          >
            VOUS
          </span>
        )}
      </motion.div>
    );
  };

  return (
    <section 
      ref={ref}
      id="maps-split"
      className="py-12 md:py-20 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-[#050505] dark:via-[#0A0D14] dark:to-[#050505] relative overflow-hidden"
      data-testid="maps-split-section"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#1c3ff9]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={fadeInDown.initial}
          animate={isInView ? fadeInDown.animate : fadeInDown.initial}
          transition={fadeInDown.transition}
        >
          <SectionHeader 
            number="01"
            label="La Réalité"
            title="VOICI CE QUI SE PASSE"
            highlight="RÉELLEMENT"
            description="Glissez pour comparer : avant et après KAPTA Media"
          />
        </motion.div>

        {/* Comparateur moderne avec glassmorphism */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* AVANT - Card glassmorphism */}
          <motion.div
            initial={fadeInLeft.initial}
            animate={isInView ? fadeInLeft.animate : fadeInLeft.initial}
            transition={{ ...fadeInLeft.transition, delay: 0.2 }}
            onHoverStart={() => setHoveredCard('before')}
            onHoverEnd={() => setHoveredCard(null)}
            className="glass-card rounded-2xl p-6 md:p-8 relative group cursor-pointer"
            whileHover={{ y: -4, scale: 1.01 }}
          >
            {/* Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Aujourd'hui — sans Kapta Media
              </span>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-3 bg-white dark:bg-[#10131A] rounded-xl p-4 mb-6 border border-gray-200 dark:border-[#2A2E39] shadow-sm">
              <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">plombier tours urgence</span>
            </div>

            {/* Results */}
            <div className="space-y-3 mb-6">
              {BEFORE_RESULTS.map((r,i)=><MapsResult key={i} r={r}/>)}
            </div>

            {/* Status */}
            <motion.div 
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-[#2A2E39] bg-white/80 dark:bg-[#10131A]/80"
              animate={hoveredCard === 'before' ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#2A2E39] flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Votre téléphone ne sonne pas.</span>
            </motion.div>

            {/* Hover indicator */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-[#1c3ff9]/0 pointer-events-none"
              animate={hoveredCard === 'before' ? { borderColor: 'rgba(28, 63, 249, 0.3)' } : {}}
            />
          </motion.div>

          {/* APRÈS - Card glassmorphism avec glow réduit */}
          <motion.div
            initial={fadeInRight.initial}
            animate={isInView ? fadeInRight.animate : fadeInRight.initial}
            transition={{ ...fadeInRight.transition, delay: 0.4 }}
            onHoverStart={() => setHoveredCard('after')}
            onHoverEnd={() => setHoveredCard(null)}
            className="glass-card rounded-2xl p-6 md:p-8 relative group cursor-pointer border-2 border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30"
            whileHover={{ y: -4, scale: 1.01 }}
          >
            {/* Badge avec animation */}
            <div className="flex items-center gap-2 mb-6">
              <motion.div 
                className="w-2 h-2 rounded-full bg-[#1c3ff9]"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9] dark:text-[#6B9FFF]">
                Après Kapta Media
              </span>
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-3 bg-white dark:bg-[#10131A] rounded-xl p-4 mb-6 border border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30 shadow-sm">
              <svg className="w-5 h-5 text-[#1c3ff9] dark:text-[#6B9FFF]" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">plombier tours urgence</span>
            </div>

            {/* Results */}
            <div className="space-y-3 mb-6">
              {AFTER_RESULTS.map((r,i)=><MapsResult key={i} r={r}/>)}
            </div>

            {/* Status avec animation réduite */}
            <div 
              className="flex items-center gap-3 p-4 rounded-xl border border-[#10B981]/30 dark:border-[#10B981]/40 bg-gradient-to-r from-[#10B981]/10 to-[#10B981]/5 dark:from-[#10B981]/15 dark:to-[#10B981]/8"
            >
              <div 
                className="w-10 h-10 rounded-full bg-[#10B981]/20 dark:bg-[#10B981]/25 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-[#10B981] dark:text-[#34D399]" />
              </div>
              <span className="text-sm font-semibold text-[#10B981] dark:text-[#34D399]">Votre téléphone sonne. Vous décrochez.</span>
            </div>
          </motion.div>
        </div>

        {/* Stats avec glassmorphism */}
        <motion.div 
          className="grid grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <CounterStat value={88} unit="%" label="des appels d'urgence" sublabel="vont aux 3 premiers résultats" delay={400} isInView={isInView} />
          <CounterStat value={90} unit=" min" label="de votre temps" sublabel="c'est tout ce qu'on vous demande" delay={500} isInView={isInView} />
          <CounterStat value={14} unit=" j" label="pour être en ligne" sublabel="et visible sur votre secteur" delay={600} isInView={isInView} />
        </motion.div>
      </div>
    </section>
  );
};

// Solution Section - Onglets interactifs adaptés en bleu/blanc
const Solution = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      num:"01", 
      title:"Top 3 Google Maps",
      h:"Votre fiche. En tête.",
      p:"Quand quelqu'un cherche en urgence, il appelle le premier résultat. On reconfigure votre fiche pour que l'algorithme Maps vous place avant tout le monde sur votre secteur à Tours.",
      result:"Position #1 sur votre zone",
      demo:"maps",
    },
    {
      num:"02", 
      title:"La vidéo qui rassure",
      h:"La peur du charlatan, supprimée.",
      p:"90 minutes de tournage chez vous — atelier, camion, chantier. Le client vous voit travailler avant même d'appuyer sur appel. Il n'a plus de raison d'hésiter.",
      result:"87 % de taux de confiance",
      demo:"video",
    },
    {
      num:"03", 
      title:"Zéro appel perdu",
      h:"Absent. Pas inaccessible.",
      p:"Vous êtes en intervention — votre téléphone ne répond pas. Un SMS part automatiquement en 30 secondes. Le client sait que vous êtes professionnel. Il attend. Il rappelle.",
      result:"20 % des appels manqués récupérés",
      demo:"sms",
    },
  ];

  const currentTab = tabs[activeTab];

  return (
    <section 
      ref={ref}
      id="solution"
      className="py-12 md:py-20 bg-gradient-to-br from-[#F8F9FA] via-white to-[#F8F9FA] dark:from-[#0B0F17] dark:via-[#050505] dark:to-[#0B0F17] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={scaleIn.initial}
          animate={isInView ? scaleIn.animate : scaleIn.initial}
          transition={{ ...scaleIn.transition, delay: 0.1 }}
          className="mb-12"
        >
          <div className="kapta-section-marker justify-center mb-4">
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">02</span>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">La solution</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Trois leviers. <span className="text-[#1c3ff9]">Un seul résultat.</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Explorez chaque levier ci-dessous pour comprendre comment on transforme votre visibilité.
          </p>
        </motion.div>

        <motion.div 
          initial={rotateIn.initial}
          animate={isInView ? rotateIn.animate : rotateIn.initial}
          transition={{ ...rotateIn.transition, delay: 0.3 }}
          className="bg-white dark:bg-[#1A1D24] rounded-2xl border-2 border-gray-100 dark:border-[#2A2E39] overflow-hidden shadow-lg"
        >
          {/* Onglets */}
          <div className="grid grid-cols-3 border-b border-gray-200 dark:border-[#2A2E39] relative">
            {/* Indicateur mobile */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 md:hidden">
              <span className="text-xs font-bold text-[#1c3ff9] bg-[#1c3ff9]/10 px-3 py-1 rounded-full border border-[#1c3ff9]/20">
                👆 Cliquez pour explorer
              </span>
            </div>

            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative p-4 md:p-6 text-left transition-all ${
                  activeTab === i 
                    ? "bg-white dark:bg-[#1A1D24]" 
                    : "bg-gray-50 dark:bg-[#10131A] hover:bg-gray-100 dark:hover:bg-[#1A1D24]"
                } ${i < tabs.length - 1 ? "border-r border-gray-200 dark:border-[#2A2E39]" : ""}`}
              >
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-2">{tab.num}</div>
                <div className={`text-sm md:text-base font-bold ${
                  activeTab === i ? "text-[#1c3ff9] dark:text-[#6B9FFF]" : "text-gray-700 dark:text-gray-300"
                }`}>
                  {tab.title}
                </div>
                {activeTab === i && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1c3ff9] dark:bg-[#6B9FFF]" />
                )}
              </button>
            ))}
          </div>

          {/* Contenu */}
          <div className="grid md:grid-cols-2">
            {/* Texte */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-8 flex flex-col justify-center border-r border-gray-100"
            >
              <div className="text-6xl font-bold text-[#1c3ff9]/10 mb-4">{currentTab.num}</div>
              <h3 className="text-2xl font-bold mb-4">{currentTab.h}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{currentTab.p}</p>
              <div className="inline-flex items-center gap-2 bg-[#1c3ff9]/10 text-[#1c3ff9] px-4 py-2 rounded-full text-sm font-bold border border-[#1c3ff9]/20">
                ↗ {currentTab.result}
              </div>
            </motion.div>

            {/* Démo visuelle */}
            <motion.div
              key={`demo-${activeTab}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#0A0D14] dark:to-[#10131A] flex items-center justify-center min-h-[280px]"
            >
              {currentTab.demo === "maps" && (
                <div className="w-full max-w-xs space-y-2">
                  <div className="flex items-center gap-2 bg-white dark:bg-[#10131A] rounded-lg p-3 border border-gray-200 dark:border-[#2A2E39] mb-3">
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" viewBox="0 0 16 16" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
                      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400">plombier tours urgence</span>
                  </div>
                  {[
                    {pos:"1",name:"Votre entreprise",stars:"4.9 (37)",top:true},
                    {pos:"2",name:"Concurrent A",stars:"4.8 (62)",top:false},
                    {pos:"3",name:"Concurrent B",stars:"4.5 (41)",top:false},
                  ].map((r,i)=>(
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                      r.top ? "bg-[#1c3ff9]/10 dark:bg-[#1c3ff9]/20 border-2 border-[#1c3ff9]/30 dark:border-[#1c3ff9]/40" : "bg-white dark:bg-[#10131A] border border-gray-200 dark:border-[#2A2E39]"
                    }`}>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        r.top ? "bg-[#1c3ff9] text-white" : "bg-gray-200 dark:bg-[#2A2E39] text-gray-600 dark:text-gray-400"
                      }`}>
                        {r.pos}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-sm ${r.top ? "text-[#1c3ff9] dark:text-[#6B9FFF]" : "dark:text-gray-200"}`}>{r.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">★ {r.stars}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {currentTab.demo === "video" && (
                <div className="w-full max-w-xs">
                  <div className="bg-white dark:bg-[#10131A] rounded-xl border border-gray-200 dark:border-[#2A2E39] overflow-hidden">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-[#1c3ff9]/20 dark:to-[#1c3ff9]/10 relative flex items-center justify-center">
                      <div className="absolute top-2 left-2 bg-black/70 dark:bg-black/80 text-white text-xs px-2 py-1 rounded">
                        Intervention · Tours
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#1c3ff9] flex items-center justify-center shadow-lg animate-pulse">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="font-bold text-sm mb-2 dark:text-gray-200">Votre entreprise</div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1 bg-gray-200 dark:bg-[#2A2E39] rounded-full overflow-hidden">
                          <div className="h-full w-[87%] bg-[#1c3ff9] rounded-full" />
                        </div>
                        <span className="text-xs font-bold text-[#1c3ff9] dark:text-[#6B9FFF]">87%</span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">confiance client</div>
                    </div>
                  </div>
                </div>
              )}

              {currentTab.demo === "sms" && (
                <div className="w-full max-w-xs space-y-2">
                  <div className="bg-gray-200 dark:bg-[#2A2E39] text-gray-700 dark:text-gray-300 p-3 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Appel entrant · 14h32 · Sans réponse
                  </div>
                  <div className="bg-[#1c3ff9] text-white p-3 rounded-2xl rounded-br-sm text-sm max-w-[85%] ml-auto">
                    Bonjour, je suis en intervention. Je vous rappelle dès que possible.
                  </div>
                  <div className="bg-white dark:bg-[#10131A] border border-gray-200 dark:border-[#2A2E39] p-3 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
                    Ok merci ! Attendrai votre appel 👍
                  </div>
                  <div className="flex justify-end">
                    <span className="text-xs font-bold bg-[#10B981]/10 dark:bg-[#10B981]/20 text-[#10B981] dark:text-[#34D399] px-3 py-1 rounded-full border border-[#10B981]/20 dark:border-[#10B981]/30">
                      Appel récupéré ✓
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
// Ce fichier contient les sections restantes à ajouter à App.js
// Sections : CaseStudies, Process, Team, Proof, Pricing, Testimonials, FAQ, ContactForm, Footer, MobileStickyCTA, App

// IMPORTANT : Ce code sera ajouté à App.js - NE PAS EXÉCUTER CE FICHIER DIRECTEMENT

/* 
===========================================
SECTION CASESTUDIES - CONSERVÉE DE L'ORIGINAL
===========================================
*/

const CaseStudies = () => {
  const ref = useRef(null);
  const caseStudiesProgressRef = useRef(null);
  const videoProgressRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videosExpanded, setVideosExpanded] = useState(false);

  const VIDEO_ITEMS = [
    { id: 1, videoId: "U6FaRhs9W2c", title: "Vidéo 1" },
    { id: 2, videoId: "Pw_k894Lsk0", title: "Vidéo 2" },
    { id: 3, videoId: "GnDY-5dOt3Q", title: "Vidéo 3" },
    { id: 4, videoId: "EiySSMwTCz4", title: "Vidéo 4" },
    { id: 5, videoId: "D9M0JMP_V5I", title: "Vidéo 5" },
    { id: 6, videoId: "q2CnDcUkiMM", title: "Vidéo 6" }
  ];

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
      className="py-8 md:py-16 bg-white dark:bg-[#050505] relative overflow-hidden"
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
        
        {/* Grille des cas clients avant/après - Modernisé avec glassmorphism */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onScroll={(e) => {
              updateScrollProgress(e.currentTarget, caseStudiesProgressRef);
            }}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-card rounded-2xl overflow-hidden min-w-[440px] md:min-w-[600px] snap-start flex-shrink-0 border-2 border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30"
                style={{
                  boxShadow: '0 0 30px rgba(28, 63, 249, 0.1), 0 20px 50px rgba(28, 63, 249, 0.08)'
                }}
              >
                <div className="grid grid-cols-2 gap-0">
                  {/* AVANT */}
                  <div className="relative group">
                    <div className="absolute top-3 left-3 z-10">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#1A1D24]/90 backdrop-blur-sm border border-gray-200 dark:border-[#2A2E39] shadow-md">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500" />
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                          Avant
                        </span>
                      </div>
                    </div>
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.beforeImage} 
                        srcSet={buildImageSrcSet(caseStudy.beforeImage)}
                        sizes="(max-width: 768px) 273px, 300px"
                        alt="Avant"
                        width="960"
                        height="1280"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain object-center bg-gray-100 dark:bg-[#10131A] transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  
                  {/* APRÈS */}
                  <div className="relative group">
                    <div className="absolute top-3 right-3 z-10">
                      <motion.div 
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#0052FF] to-[#1c3ff9] shadow-lg"
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(28,63,249,0.5)", "0 0 20px rgba(28,63,249,0.8)", "0 0 0px rgba(28,63,249,0.5)"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-white"
                          animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Après
                        </span>
                      </motion.div>
                    </div>
                    <div className="h-52 md:h-80 relative overflow-hidden border-l-2 border-[#1c3ff9]/30 dark:border-[#1c3ff9]/40">
                      <img 
                        src={caseStudy.afterImage} 
                        srcSet={buildImageSrcSet(caseStudy.afterImage)}
                        sizes="(max-width: 768px) 273px, 300px"
                        alt="Après"
                        width="960"
                        height="1280"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain object-center bg-white dark:bg-[#1A1D24] scale-125 transition-transform duration-300 group-hover:scale-[1.3]"
                      />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1c3ff9]/5 to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col items-center mt-4 space-y-3">
            <div className="w-32 md:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={caseStudiesProgressRef}
                className="h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            
            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
              <span>Glissez pour voir plus</span>
              <ArrowRight className="w-3 h-3" />
            </div>
            
            <p className="text-xs text-[#A1A1AA] italic text-center max-w-md mt-2">
              * Certains clients ayant souhaité préserver leur anonymat sont représentés de manière générique
            </p>
          </div>
        </div>
        
        {/* Section Vidéos - Redesign intégré au branding */}
        <motion.div 
          initial={fadeInUp.initial}
          animate={isInView ? fadeInUp.animate : fadeInUp.initial}
          transition={{ ...fadeInUp.transition, delay: 0.3 }}
          className="mt-12 md:mt-16"
        >
          <div className="text-center mb-8 md:mb-12">
            <div className="kapta-section-marker justify-center mb-4">
              <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">04</span>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Portfolio</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-3 md:mb-4 leading-tight">
              Nos <span className="text-[#1c3ff9]">réalisations vidéo</span>
            </h2>
            
            <p className="text-sm md:text-base text-[#52525B] max-w-2xl mx-auto">
              Découvrez les vidéos professionnelles que nous créons et intégrons sur les fiches Google
            </p>
          </div>
        </motion.div>
        
        {/* Afficher 3 vidéos directement - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 px-4 mb-6">
          {VIDEO_ITEMS.slice(0, 3).map((video, index) => (
            <motion.div
              key={video.id}
              initial={index === 0 ? fadeInLeft.initial : index === 1 ? scaleIn.initial : fadeInRight.initial}
              animate={isInView ? (index === 0 ? fadeInLeft.animate : index === 1 ? scaleIn.animate : fadeInRight.animate) : {}}
              transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
              className="group cursor-pointer"
              onClick={() => {
                Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                setSelectedVideo(video.videoId);
              }}
            >
              <div className="relative bg-white dark:bg-[#1A1D24] rounded-xl overflow-hidden border-2 border-gray-100 dark:border-[#2A2E39] hover:border-[#1c3ff9]/30 dark:hover:border-[#1c3ff9]/40 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#10131A] dark:to-[#1A1D24]">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1c3ff9] transition-all duration-300">
                      <Play className="w-6 h-6 text-[#1c3ff9] group-hover:text-white ml-0.5 transition-colors" />
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-[#2A2E39]">
                    <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                  </div>
                </div>
                
                <div className="p-3 bg-white dark:bg-[#1A1D24] border-t border-gray-100 dark:border-[#2A2E39]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Vidéo {video.id}</span>
                    <div className="flex items-center gap-1 text-[#1c3ff9] dark:text-[#6B9FFF]">
                      <Camera className="w-3 h-3" />
                      <span className="text-xs font-medium">Voir</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Afficher 3 vidéos directement - Mobile scroll */}
        <div className="md:hidden mb-6">
          <div 
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onScroll={(e) => {
              updateScrollProgress(e.currentTarget, videoProgressRef);
            }}
          >
            {VIDEO_ITEMS.slice(0, 3).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="min-w-[280px] snap-start group cursor-pointer"
                onClick={() => {
                  Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                  setSelectedVideo(video.videoId);
                }}
              >
                <div className="relative bg-white dark:bg-[#1A1D24] rounded-xl overflow-hidden border-2 border-gray-100 dark:border-[#2A2E39] shadow-md">
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#10131A] dark:to-[#1A1D24]">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                      width="480"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 text-[#1c3ff9] ml-0.5" />
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-[#2A2E39]">
                      <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                    </div>
                  </div>
                  
                  <div className="p-2.5 bg-white dark:bg-[#1A1D24] border-t border-gray-100 dark:border-[#2A2E39]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Vidéo {video.id}</span>
                      <div className="flex items-center gap-1 text-[#1c3ff9] dark:text-[#6B9FFF]">
                        <Camera className="w-3 h-3" />
                        <span className="text-xs font-medium">Voir</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col items-center mt-4 space-y-2">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={videoProgressRef}
                className="h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
              <span>Glissez pour voir plus</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        
        {/* Bouton pour voir les 3 autres vidéos */}
        <div className="text-center mb-8">
          <motion.button
            onClick={() => {
              setVideosExpanded(!videosExpanded);
              if (!videosExpanded) {
                Analytics.trackVideoInteraction('expand', 'Videos Section');
              } else {
                Analytics.trackVideoInteraction('collapse', 'Videos Section');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1A1D24] border-2 border-[#1c3ff9] dark:border-[#1c3ff9]/60 text-[#1c3ff9] dark:text-[#6B9FFF] hover:bg-[#1c3ff9] hover:text-white dark:hover:bg-[#1c3ff9] dark:hover:text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform icon-hover-rotate" />
            <span>{videosExpanded ? 'Masquer les 3 autres vidéos' : 'Voir les 3 autres vidéos'}</span>
            <motion.div
              animate={{ rotate: videosExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
        
        {/* Conteneur des 3 vidéos supplémentaires */}
        <motion.div
          initial={false}
          animate={{
            height: videosExpanded ? 'auto' : 0,
            opacity: videosExpanded ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {videosExpanded && <div className="pb-4 md:pb-6">
            <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 px-4">
              {VIDEO_ITEMS.slice(3, 6).map((video, index) => (
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
                  <div className="relative bg-white dark:bg-[#1A1D24] rounded-xl overflow-hidden border-2 border-gray-100 dark:border-[#2A2E39] hover:border-[#1c3ff9]/30 dark:hover:border-[#1c3ff9]/40 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#10131A] dark:to-[#1A1D24]">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                        width="480"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/70 transition-all duration-300"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#1c3ff9] transition-all duration-300">
                          <Play className="w-6 h-6 text-[#1c3ff9] group-hover:text-white ml-0.5 transition-colors" />
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-[#2A2E39]">
                        <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-[#1A1D24] border-t border-gray-100 dark:border-[#2A2E39]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Vidéo {video.id}</span>
                        <div className="flex items-center gap-1 text-[#1c3ff9] dark:text-[#6B9FFF]">
                          <Camera className="w-3 h-3" />
                          <span className="text-xs font-medium">Voir</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="md:hidden">
              <div 
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
              >
                {VIDEO_ITEMS.slice(3, 6).map((video, index) => (
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
                    <div className="relative bg-white dark:bg-[#1A1D24] rounded-xl overflow-hidden border-2 border-gray-100 dark:border-[#2A2E39] shadow-md">
                      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#10131A] dark:to-[#1A1D24]">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                          width="480"
                          height="360"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/90 dark:bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 text-[#1c3ff9] ml-0.5" />
                          </div>
                        </div>
                        
                        <div className="absolute top-2 right-2 w-7 h-7 bg-white/95 dark:bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md border border-gray-100 dark:border-[#2A2E39]">
                          <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                        </div>
                      </div>
                      
                      <div className="p-2.5 bg-white dark:bg-[#1A1D24] border-t border-gray-100 dark:border-[#2A2E39]">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Vidéo {video.id}</span>
                          <div className="flex items-center gap-1 text-[#1c3ff9] dark:text-[#6B9FFF]">
                            <Camera className="w-3 h-3" />
                            <span className="text-xs font-medium">Voir</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>}
        </motion.div>
      </div>
    </section>

    {/* Modal Visualiseur */}
    {selectedVideo && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-[#1A1D24] rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#2A2E39] bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5 dark:from-[#1c3ff9]/10 dark:to-[#6366f1]/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c3ff9] flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] dark:text-gray-200 text-sm">KAPTA Media</h3>
                <p className="text-xs text-[#52525B] dark:text-gray-400">Optimisation Google Maps</p>
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
          
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Vidéo KAPTA"
              className="w-full h-full"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
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

// Process Section - Adapté du BTP en bleu/blanc avec Timeline Interactive
const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      when:"Gratuit · Avant tout",
      title:"Audit de votre position",
      p:"On analyse votre fiche Maps, vos concurrents et les mots-clés de votre secteur à Tours. On vous dit exactement combien d'appels vous perdez — sans engagement.",
      details: "Analyse complète : position actuelle, concurrents directs, mots-clés performants, opportunités manquées. Rapport détaillé sous 48h."
    },
    {
      when:"Jours 1 à 5 · 90 min sur site",
      title:"Tournage chez vous",
      p:"On vient à votre atelier, sur un chantier ou dans votre camion. 90 minutes. On s'adapte à votre emploi du temps. On repart avec 6 mois de contenu.",
      details: "Équipement pro, tournage rapide, 0 interruption de votre activité. Vidéos + photos optimisées pour Google Maps."
    },
    {
      when:"Jours 5 à 14 · On gère tout",
      title:"Déploiement complet",
      p:"Fiche Maps reconfigurée, vidéos publiées, Missed Call actif, système d'avis en place. Votre téléphone commence à sonner différemment.",
      details: "Configuration complète, tests, formation rapide, suivi des premiers résultats. Support prioritaire pendant 30 jours."
    },
  ];

  return (
    <section 
      ref={ref}
      id="process"
      className="py-12 md:py-20 bg-white dark:bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-20">
          <motion.div
            initial={slideInUp.initial}
            animate={isInView ? slideInUp.animate : slideInUp.initial}
            transition={{ ...slideInUp.transition, delay: 0.1 }}
            className="md:sticky md:top-24"
          >
            <div className="kapta-section-marker mb-4">
              <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">05</span>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Le process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              3 étapes. <span className="text-[#1c3ff9]">Vous bossez.</span> On installe.
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pas de formation. Pas de logiciel à comprendre. Vous continuez à faire votre métier. On fait le nôtre.
            </p>
          </motion.div>

          <motion.div 
            className="relative pl-12"
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
          >
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#1c3ff9] to-[#1c3ff9]/10" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="relative"
                >
                  <button
                    onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                    className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center font-bold text-sm hover:scale-110 transition-transform cursor-pointer"
                  >
                    {i + 1}
                  </button>

                  <div 
                    className={`bg-white dark:bg-[#1A1D24] rounded-xl p-6 border transition-all card-3d-subtle cursor-pointer ${
                      activeStep === i 
                        ? 'border-[#1c3ff9] dark:border-[#1c3ff9]/60 shadow-xl' 
                        : 'border-gray-100 dark:border-[#2A2E39] hover:border-[#1c3ff9]/20 dark:hover:border-[#1c3ff9]/30 hover:shadow-lg'
                    }`}
                    onClick={() => setActiveStep(activeStep === i ? -1 : i)}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9] dark:text-[#6B9FFF] block mb-2">
                      {step.when}
                    </span>
                    <h3 className="text-xl font-bold mb-3 dark:text-gray-200">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.p}</p>
                    
                    {/* Détails expandables */}
                    <motion.div
                      initial={false}
                      animate={{ 
                        height: activeStep === i ? 'auto' : 0,
                        opacity: activeStep === i ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-[#2A2E39]">
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                          {step.details}
                        </p>
                      </div>
                    </motion.div>
                    
                    <div className="mt-3 text-xs text-[#1c3ff9] dark:text-[#6B9FFF] font-medium">
                      {activeStep === i ? '↑ Cliquez pour réduire' : '↓ Cliquez pour plus de détails'}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Team Section - Design moderne hero avec photo
const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="team"
      className="py-12 md:py-20 bg-white dark:bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={blurIn.initial}
          animate={isInView ? blurIn.animate : blurIn.initial}
          transition={{ ...blurIn.transition, delay: 0.1 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#1c3ff9]" />
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest uppercase">Qui sommes-nous</span>
            <div className="w-8 h-px bg-[#1c3ff9]" />
          </div>
        </motion.div>

        {/* Layout Hero avec photo à gauche */}
        <div className="grid lg:grid-cols-[400px_1fr] gap-8 lg:gap-12 items-center">
          {/* Photo Hero */}
          <motion.div
            initial={fadeInLeft.initial}
            animate={isInView ? fadeInLeft.animate : fadeInLeft.initial}
            transition={{ ...fadeInLeft.transition, delay: 0.2 }}
            className="relative max-w-[280px] sm:max-w-sm lg:max-w-md mx-auto lg:mx-0"
          >
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/charly-profile.webp" 
                alt="Charly D. Silva - Fondateur Kapta Media"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Overlay gradient subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Badge flottant */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-white/95 dark:bg-[#1A1D24]/95 backdrop-blur-md rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-xl border border-gray-100 dark:border-[#2A2E39]">
                <div className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9] dark:text-[#6B9FFF]">Tours</div>
              </div>
              
              {/* Carte info en bas */}
              <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 bg-white/95 dark:bg-[#1A1D24]/95 backdrop-blur-md rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-xl border border-gray-100 dark:border-[#2A2E39]">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#6366f1] flex items-center justify-center text-white font-bold text-base lg:text-lg flex-shrink-0">
                    CD
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-base lg:text-lg dark:text-gray-200 truncate">Charly D. Silva</div>
                    <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 truncate">Fondateur · Kapta Media</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Élément décoratif */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 bg-[#1c3ff9]/5 dark:bg-[#1c3ff9]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 lg:w-24 lg:h-24 bg-[#6366f1]/5 dark:bg-[#6366f1]/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          {/* Contenu */}
          <motion.div
            initial={fadeInRight.initial}
            animate={isInView ? fadeInRight.animate : fadeInRight.initial}
            transition={{ ...fadeInRight.transition, delay: 0.4 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Titre principal */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 leading-tight dark:text-gray-200">
                Une seule personne responsable de votre résultat.
              </h2>
              <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Pas de chef de projet qui passe le dossier à un stagiaire. Pas de ticket de support. <strong className="text-gray-900 dark:text-gray-200">Quand quelque chose ne va pas, c'est moi qui décroche.</strong>
              </p>
            </div>

            {/* Stats/Points clés */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              <div className="bg-gradient-to-br from-[#1c3ff9]/5 to-[#1c3ff9]/10 dark:from-[#1c3ff9]/10 dark:to-[#1c3ff9]/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30">
                <div className="text-2xl lg:text-3xl font-bold text-[#1c3ff9] dark:text-[#6B9FFF] mb-1 lg:mb-2">8 ans</div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Avec des artisans locaux</div>
              </div>
              <div className="bg-gradient-to-br from-[#1c3ff9]/5 to-[#1c3ff9]/10 dark:from-[#1c3ff9]/10 dark:to-[#1c3ff9]/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30">
                <div className="text-2xl lg:text-3xl font-bold text-[#1c3ff9] dark:text-[#6B9FFF] mb-1 lg:mb-2">1 seul</div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Client par métier/secteur</div>
              </div>
            </div>

            {/* Le problème */}
            <div className="bg-[#F8F9FA] dark:bg-[#0B0F17] rounded-xl lg:rounded-2xl p-5 lg:p-6 border border-gray-100 dark:border-[#2A2E39]">
              <h3 className="text-lg lg:text-xl font-bold mb-2 lg:mb-3 dark:text-gray-200">Le problème récurrent</h3>
              <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Des pros sérieux, qui travaillent bien, et qui perdent des chantiers parce qu'on ne les trouve pas en ligne. <strong className="text-gray-900 dark:text-gray-200">Pas parce qu'ils sont mauvais. Parce qu'ils sont invisibles.</strong>
              </p>
            </div>

            {/* Badges expertise */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Expertise</div>
              <div className="flex flex-wrap gap-2">
                {["Google Maps","Vidéo terrain","SMS auto","Tours & agglo"].map(p=>(
                  <span key={p} className="text-xs lg:text-sm font-semibold bg-white dark:bg-[#1A1D24] text-[#1c3ff9] dark:text-[#6B9FFF] px-3 lg:px-4 py-1.5 lg:py-2 rounded-full border border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30 shadow-sm">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Le réseau */}
            <div className="flex items-center gap-3 lg:gap-4 pt-4 border-t border-gray-200 dark:border-[#2A2E39]">
              <div className="flex -space-x-2 lg:-space-x-3">
                {["V","M","T","A"].map((l,i)=>(
                  <div key={i} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#6366f1] border-2 border-white dark:border-[#050505] flex items-center justify-center font-bold text-white text-sm lg:text-base shadow-lg">
                    {l}
                  </div>
                ))}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm lg:text-base text-gray-900 dark:text-gray-200">4 spécialistes locaux</div>
                <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">Vidéo, montage, dev · Indre-et-Loire</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Proof Section - iPhone avec conversations auto-cycle (adapté du BTP en bleu/blanc)
const CYCLE_DURATION = 10000; // 10 secondes par conversation

const CONVOS = [
  {
    init:"PL",
    name:"Pierre Lefèvre",
    job:"Plombier · Tours Nord",
    msgs:[
      {who:"them",text:"Salut Charly, juste un retour rapide",time:"14:32"},
      {who:"us",text:"Salut Pierre ! Dis-moi tout",time:"14:35"},
      {who:"them",text:"J'ai eu 4 appels ce matin pour des dépannages. Tous via Google Maps.",time:"14:37"},
      {who:"them",text:"Avant personne m'appelait. Maintenant je suis dans le top 3 sur ma zone.",time:"14:38"},
      {who:"us",text:"Excellent ! C'est exactement ce qu'on voulait 👍",time:"14:40"},
    ]
  },
  {
    init:"MC",
    name:"Marie Caron",
    job:"Coiffeuse · Tours Centre",
    msgs:[
      {who:"them",text:"Charly, la vidéo fait vraiment la différence",time:"10:12"},
      {who:"us",text:"Content que ça marche ! Tu as des retours ?",time:"10:15"},
      {who:"them",text:"Oui, plusieurs clientes m'ont dit qu'elles m'ont vue sur Google avant de venir.",time:"10:17"},
      {who:"them",text:"Ça les rassure de voir le salon et moi en vidéo.",time:"10:19"},
      {who:"them",text:"J'ai pris 6 nouveaux RDV cette semaine, c'est du jamais vu !",time:"10:21"},
    ]
  },
  {
    init:"JD",
    name:"Jean Dubois",
    job:"Électricien · Tours Sud",
    msgs:[
      {who:"them",text:"Franchement au début j'étais sceptique",time:"16:45"},
      {who:"us",text:"Je comprends. Et maintenant ?",time:"16:48"},
      {who:"them",text:"Mon téléphone sonne beaucoup plus. Et surtout, les gens ont déjà confiance quand ils appellent.",time:"16:50"},
      {who:"them",text:"Ils ont vu la vidéo, ils savent à qui ils ont affaire.",time:"16:52"},
      {who:"us",text:"C'est tout l'intérêt ! Merci pour ton retour 🙂",time:"16:54"},
    ]
  },
];

const Proof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const [msgKey, setMsgKey] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const showConvo = (idx) => {
    setActive(idx);
    setMsgs([]);
    setProgress(0);
    setTimeout(() => {
      setMsgs(CONVOS[idx].msgs);
      setMsgKey(k => k + 1);
    }, 50);
  };

  const startProgress = (idx) => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / CYCLE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(() => {
          const next = (idx + 1) % CONVOS.length;
          showConvo(next);
          startProgress(next);
        }, 200);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    showConvo(0);
    startProgress(0);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = CONVOS[active];
  const nextIdx = (active + 1) % CONVOS.length;

  return (
    <section 
      ref={ref}
      id="proof"
      className="py-12 md:py-20 bg-white dark:bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={slideInUp.initial}
            animate={isInView ? slideInUp.animate : slideInUp.initial}
            transition={{ ...slideInUp.transition, delay: 0.1 }}
          >
            <div className="kapta-section-marker mb-4">
              <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">07</span>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Ce qu'ils disent</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Les vraies <span className="text-[#1c3ff9]">conversations.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Pas de témoignages formatés. Pas de photos souriantes.
              <br/>
              <strong className="text-gray-900">Ce que les clients ont dit après le déploiement.</strong>
            </p>

            <div className="flex gap-2 mb-6">
              {CONVOS.map((co, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full overflow-hidden cursor-pointer ${
                    i < active ? "bg-[#1c3ff9]" : i === active ? "bg-gray-200" : "bg-gray-100"
                  }`}
                  onClick={() => { showConvo(i); startProgress(i); }}
                >
                  {i === active && (
                    <div
                      className="h-full bg-[#1c3ff9] transition-none"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center font-bold text-lg">
                {c.init}
              </div>
              <div>
                <div className="font-bold text-gray-900">{c.name}</div>
                <div className="text-sm text-gray-600">{c.job}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={scaleIn.initial}
            animate={isInView ? scaleIn.animate : scaleIn.initial}
            transition={{ ...scaleIn.transition, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[280px] md:max-w-[340px] bg-white dark:bg-[#1A1D24] rounded-[32px] md:rounded-[40px] border-[10px] md:border-[12px] border-gray-900 dark:border-[#0A0D14] shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 h-5 md:h-6 bg-gray-900 dark:bg-[#0A0D14] rounded-b-2xl z-10">
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 md:w-16 h-1 bg-gray-700 dark:bg-gray-600 rounded-full" />
              </div>

              <div className="bg-gradient-to-br from-[#1c3ff9]/5 to-[#6366f1]/5 dark:from-[#1c3ff9]/10 dark:to-[#6366f1]/10 p-3 md:p-4 pt-6 md:pt-8 border-b border-gray-100 dark:border-[#2A2E39]">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center font-bold text-sm md:text-base">
                    {c.init}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs md:text-sm dark:text-gray-200">{c.name}</div>
                    <div className="flex items-center gap-1 text-[10px] md:text-xs text-[#10B981] dark:text-[#34D399]">
                      <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-[#10B981] dark:bg-[#34D399]" />
                      En ligne
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 space-y-2 md:space-y-3 bg-white dark:bg-[#1A1D24]" key={msgKey}>
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`flex ${m.who === "us" ? "justify-end" : "justify-start"}`}
                    style={{
                      opacity: 0,
                      transform: "translateY(8px)",
                      animation: `fadeInUp 0.38s ${i * 0.18}s forwards`
                    }}
                  >
                    <div className={`max-w-[75%] rounded-xl md:rounded-2xl px-3 md:px-4 py-1.5 md:py-2 ${
                      m.who === "us" 
                        ? "bg-[#1c3ff9] text-white rounded-br-sm" 
                        : "bg-gray-100 dark:bg-[#2A2E39] text-gray-900 dark:text-gray-200 rounded-bl-sm"
                    }`}>
                      <div className="text-xs md:text-sm leading-relaxed">{m.text}</div>
                      <div className={`text-[10px] md:text-xs mt-0.5 md:mt-1 ${m.who === "us" ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}>
                        {m.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 md:p-4 bg-gray-50 dark:bg-[#10131A] border-t border-gray-100 dark:border-[#2A2E39]">
                <div className="h-1 bg-gray-200 dark:bg-[#2A2E39] rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#1c3ff9] transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-600 dark:text-gray-400">
                  <span>{c.job}</span>
                  <button 
                    onClick={() => {
                      const next = (active + 1) % CONVOS.length;
                      showConvo(next);
                      startProgress(next);
                    }}
                    className="hover:text-[#1c3ff9] dark:hover:text-[#6B9FFF] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Suivant : {CONVOS[nextIdx].name.split(" ")[0]}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Pricing Section - Adapté du BTP en bleu/blanc
const STACK = [
  {name:"Fiche Google Maps reconfigurée",desc:"Optimisation complète de votre profil",val:"✓",bonus:false},
  {name:"Vidéo professionnelle",desc:"90 min de tournage sur site",val:"✓",bonus:false},
  {name:"Système Missed Call SMS",desc:"Récupération automatique des appels manqués",val:"✓",bonus:false},
  {name:"Système d'avis automatisé",desc:"Génération d'avis clients",val:"✓",bonus:false},
  {name:"Suivi mensuel",desc:"Rapport de performance",val:"✓",bonus:true},
  {name:"Support prioritaire",desc:"Réponse sous 24h",val:"✓",bonus:true},
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="pricing"
      className="py-12 md:py-20 bg-gradient-to-br from-[#F8F9FA] via-white to-[#F8F9FA] dark:from-[#0B0F17] dark:via-[#050505] dark:to-[#0B0F17] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={fadeInDown.initial}
          animate={isInView ? fadeInDown.animate : fadeInDown.initial}
          transition={{ ...fadeInDown.transition, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="kapta-section-marker justify-center mb-4">
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">08</span>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">L'offre</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ce que vous <span className="text-[#1c3ff9]">recevez.</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Un déploiement unique. Un système autonome. Aucun abonnement.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.2fr] gap-6">
          <motion.div
            initial={rotateIn.initial}
            animate={isInView ? rotateIn.animate : rotateIn.initial}
            transition={{ ...rotateIn.transition, delay: 0.2 }}
            className="bg-white dark:bg-[#1A1D24] rounded-2xl border-2 border-[#1c3ff9]/20 dark:border-[#1c3ff9]/30 p-6 md:p-8 shadow-lg"
          >
            <div className="inline-flex items-center gap-2 bg-[#1c3ff9]/10 dark:bg-[#1c3ff9]/20 text-[#1c3ff9] dark:text-[#6B9FFF] px-3 py-1 rounded-full text-xs font-bold mb-4">
              Système Intercepteur d'Urgences™
            </div>
            <h3 className="text-2xl font-bold mb-2 dark:text-gray-200">Méthode GVA</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Google · Vidéo · Avis — Done-For-You · Tours & agglomération</p>
            
            <div className="flex items-end gap-2 mb-6">
              <span className="text-lg text-gray-400 dark:text-gray-500 line-through">990 €</span>
              <span className="text-5xl font-bold text-[#1c3ff9] dark:text-[#6B9FFF]">490</span>
              <span className="text-xl text-gray-600 dark:text-gray-400 mb-2">€ HT</span>
            </div>

            <div className="space-y-2 mb-6">
              {[
                {icon:"⏱️",text:"90 min de votre temps"},
                {icon:"📅",text:"Déployé en 14 jours"},
                {icon:"✓",text:"100% géré par nous"},
                {icon:"💳",text:"Un seul paiement"},
              ].map((item,i)=>(
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 dark:from-[#10B981]/20 dark:to-[#059669]/20 rounded-xl p-4 border border-[#10B981]/20 dark:border-[#10B981]/30">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#10B981] dark:text-[#34D399] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-gray-900 dark:text-gray-200 mb-1">Garantie Satisfait ou Remboursé</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    Pas satisfait du travail livré (vidéo, photos, optimisation) ? <strong className="dark:text-gray-300">Remboursement intégral sous 30 jours.</strong> Sans discussion.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={slideInUp.initial}
            animate={isInView ? slideInUp.animate : slideInUp.initial}
            transition={{ ...slideInUp.transition, delay: 0.4 }}
            className="bg-white dark:bg-[#1A1D24] rounded-2xl border border-gray-100 dark:border-[#2A2E39] overflow-hidden shadow-lg"
          >
            <div className="bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5 dark:from-[#1c3ff9]/10 dark:to-[#6366f1]/10 p-4 border-b border-gray-100 dark:border-[#2A2E39]">
              <h4 className="font-bold text-gray-900 dark:text-gray-200">Ce qui est inclus</h4>
            </div>
            <div className="p-4 space-y-3">
              {STACK.map((item,i)=>(
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-[#10131A] transition-colors">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.bonus ? "bg-[#10B981]/10 dark:bg-[#10B981]/20" : "bg-[#1c3ff9]/10 dark:bg-[#1c3ff9]/20"
                  }`}>
                    <Check className={`w-4 h-4 ${item.bonus ? "text-[#10B981] dark:text-[#34D399]" : "text-[#1c3ff9] dark:text-[#6B9FFF]"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-200">{item.name}</span>
                      {item.bonus && (
                        <span className="text-xs font-bold bg-[#10B981]/10 dark:bg-[#10B981]/20 text-[#10B981] dark:text-[#34D399] px-2 py-0.5 rounded-full">
                          Bonus
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Button
            size="lg"
            className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onClick={() => {
              Analytics.trackCTAClick('Démarrer l\'audit gratuit', 'Pricing Section');
              Analytics.trackAuditRequest('Pricing Section');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Démarrer l'audit gratuit
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-xs text-gray-500 mt-4">
            1 partenaire par métier · par secteur · Premier contacté, premier servi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// FAQ Section - Scroll horizontal mobile (adapté du BTP en bleu/blanc)
const FAQS = [
  {
    q:"Vous avez déjà des clients satisfaits ?",
    a:"Nous travaillons avec des commerces locaux sur Tours depuis plusieurs mois. Les résultats sont visibles dans la section témoignages ci-dessus. Chaque nouveau partenaire bénéficie de notre expérience accumulée."
  },
  {
    q:"Pourquoi Tours uniquement ?",
    a:"On se concentre sur Tours et son agglomération pour garantir un service de proximité. On peut intervenir rapidement, tourner sur site, et assurer un suivi personnalisé. La qualité avant la quantité."
  },
  {
    q:"Combien de temps ça prend ?",
    a:"Audit gratuit : 15 min par téléphone. Tournage : 90 min chez vous. Mise en ligne : 5 à 14 jours. Premiers résultats visibles : sous 14 jours avec des indicateurs mesurables."
  },
  {
    q:"C'est un abonnement ?",
    a:"Non. Paiement unique de 490€ HT (offre pilote). Pas de frais cachés, pas d'engagement mensuel. Vous payez une fois, le système reste actif. Seul le suivi mensuel est optionnel."
  },
  {
    q:"Et si ça ne marche pas ?",
    a:"Garantie « Résultat Visible ». Pas de nouveaux clients dans les 90 jours ? Je continue gratuitement jusqu'à ce que ça arrive. C'est mon risque, pas le vôtre."
  },
  {
    q:"Vous travaillez avec mes concurrents ?",
    a:"Non. Un seul partenaire par métier et par secteur géographique. Si votre concurrent signe avant vous, sa zone est bloquée. Premier arrivé, premier servi."
  },
];

const FAQ = () => {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDot, setActiveDot] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQS = FAQS.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / FAQS.length;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveDot(Math.min(idx, FAQS.length - 1));
    };
    el.addEventListener("scroll", onScroll, {passive:true});
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section 
      ref={ref}
      id="faq"
      className="py-12 md:py-20 bg-white dark:bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={blurIn.initial}
          animate={isInView ? blurIn.animate : blurIn.initial}
          transition={{ ...blurIn.transition, delay: 0.1 }}
          className="mb-8 md:mb-12"
        >
          <div className="kapta-section-marker justify-center mb-4">
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">09</span>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Les questions <span className="text-[#1c3ff9]">qu'on nous pose.</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Directement. Sans langue de bois.</p>
          
          {/* Barre de recherche */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full border-2 border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#1A1D24] text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#1c3ff9] dark:focus:border-[#1c3ff9]/60 focus:outline-none transition-colors"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {searchQuery && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                {filteredFAQS.length} résultat{filteredFAQS.length > 1 ? 's' : ''} trouvé{filteredFAQS.length > 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mt-6 md:hidden"
          >
            <ArrowRight className="w-4 h-4 text-[#1c3ff9] animate-pulse" />
            <span className="text-xs text-gray-500">Glissez pour voir la suite</span>
          </motion.div>
        </motion.div>

        {/* Desktop: Grid avec stagger */}
        <motion.div 
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
        >
          {filteredFAQS.map((faq, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white dark:bg-[#1A1D24] rounded-xl border border-gray-100 dark:border-[#2A2E39] p-6 hover:border-[#1c3ff9]/30 dark:hover:border-[#1c3ff9]/40 hover:shadow-lg transition-all"
            >
              <div className="text-5xl font-bold text-[#1c3ff9]/10 dark:text-[#1c3ff9]/20 mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-200">
                {searchQuery ? (
                  <span dangerouslySetInnerHTML={{ 
                    __html: faq.q.replace(
                      new RegExp(searchQuery, 'gi'), 
                      match => `<mark class="bg-[#1c3ff9]/20 dark:bg-[#1c3ff9]/30">${match}</mark>`
                    )
                  }} />
                ) : faq.q}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          >
            {filteredFAQS.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white dark:bg-[#1A1D24] rounded-xl border border-gray-100 dark:border-[#2A2E39] p-6 min-w-[85vw] snap-start shadow-md"
              >
                <div className="text-5xl font-bold text-[#1c3ff9]/10 dark:text-[#1c3ff9]/20 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900 dark:text-gray-200">{faq.q}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          {/* Dots pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {FAQS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = scrollRef.current;
                  if (!el) return;
                  const cardW = el.scrollWidth / FAQS.length;
                  el.scrollTo({ left: cardW * i, behavior: "smooth" });
                }}
                className={`h-1.5 rounded-full transition-all ${
                  activeDot === i ? "w-8 bg-[#1c3ff9]" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong className="text-gray-900 dark:text-gray-200">Une question qui n'est pas là ?</strong> On vous répond en moins de 24h.
          </p>
          <Button
            className="bg-white dark:bg-[#1A1D24] border-2 border-[#1c3ff9] dark:border-[#1c3ff9]/60 text-[#1c3ff9] dark:text-[#6B9FFF] hover:bg-[#1c3ff9] hover:text-white dark:hover:bg-[#1c3ff9] dark:hover:text-white rounded-full px-6 py-3 font-semibold transition-all"
            onClick={() => {
              Analytics.trackCTAClick('Poser une question', 'FAQ Section');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Poser une question
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

// ContactForm Section - Adapté avec Calendly
const ContactForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCalendly, setShowCalendly] = useState(false);

  useEffect(() => {
    if (!showCalendly) return;

    let cancelled = false;
    const calendlyContainer = document.querySelector(".calendly-inline-widget");
    if (!calendlyContainer) return;

    const showFallbackIfNeeded = () => {
      const calendlyFallback = document.querySelector(".calendly-fallback");
      if (!calendlyContainer || !calendlyFallback) return;
      const hasCalendlyContent = calendlyContainer.querySelector("iframe") || calendlyContainer.innerHTML.trim().length > 200;
      if (!hasCalendlyContent) {
        calendlyContainer.style.display = "none";
        calendlyFallback.style.display = "block";
      }
    };

    const initCalendly = () => {
      if (cancelled || !window.Calendly) return;
      const calendlyFallback = document.querySelector(".calendly-fallback");

      if (calendlyFallback) {
        calendlyFallback.style.display = "none";
      }

      calendlyContainer.style.display = "block";
      calendlyContainer.innerHTML = "";

      window.Calendly.initInlineWidget({
        url: "https://calendly.com/charly-silva/appel-decouverte",
        parentElement: calendlyContainer,
        prefill: {},
        utm: {}
      });

      setTimeout(showFallbackIfNeeded, 4000);
    };

    const existingScript = document.querySelector("script[data-calendly-widget='true']");
    if (window.Calendly) {
      initCalendly();
      return () => {
        cancelled = true;
      };
    }

    if (existingScript) {
      existingScript.addEventListener("load", initCalendly);
      return () => {
        cancelled = true;
        existingScript.removeEventListener("load", initCalendly);
      };
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.defer = true;
    script.dataset.calendlyWidget = "true";
    script.addEventListener("load", initCalendly);
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.removeEventListener("load", initCalendly);
    };
  }, [showCalendly]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const openCalendly = () => {
    setActiveDropdown(null);
    setShowCalendly(true);
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
      className="py-12 md:py-32 bg-[#F8F9FA] dark:bg-[#070A11] relative overflow-hidden"
      data-testid="contact-section"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={blurIn.initial}
          animate={isInView ? blurIn.animate : blurIn.initial}
          transition={{ ...blurIn.transition, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="kapta-section-marker justify-center mb-4">
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">10</span>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dans 14 jours, votre téléphone <span className="text-[#1c3ff9]">sonnera différemment.</span>
          </h2>
          <p className="text-gray-600 mb-2">
            Audit gratuit. On analyse votre position et on vous dit exactement ce que vous perdez. Zéro engagement.
          </p>
          <p className="text-xs text-[#A1A1AA] italic">
            Le calendrier nécessite quelques secondes de chargement pour s'afficher correctement.
          </p>
        </motion.div>

        
        <motion.div 
          initial={scaleIn.initial}
          animate={isInView ? scaleIn.animate : scaleIn.initial}
          transition={{ ...scaleIn.transition, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <Button
            size="lg"
            className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300"
            onClick={() => {
              Analytics.trackCalendlyOpen('Contact Section Main CTA');
              Analytics.trackAuditRequest('Contact Section Main CTA');
              openCalendly();
            }}
          >
            <Calendar className="w-5 h-5 mr-2" />
            RÉSERVER MON CRÉNEAU GRATUIT
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
        
        <div className="flex items-center gap-4 mb-8 max-w-md mx-auto">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-[#A1A1AA]">ou contactez-nous</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        
        <motion.div 
          initial={slideInUp.initial}
          animate={isInView ? slideInUp.animate : slideInUp.initial}
          transition={{ ...slideInUp.transition, delay: 0.3 }}
          className="flex justify-center gap-4 mb-8"
        >
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

          <div className="relative">
            <button
              onClick={() => toggleDropdown('phone')}
              className="w-16 h-16 rounded-full bg-white dark:bg-[#1A1D24] border-2 border-gray-200 dark:border-[#2A2E39] text-gray-700 dark:text-gray-300 flex items-center justify-center hover:border-[#1c3ff9] dark:hover:border-[#1c3ff9]/60 hover:text-[#1c3ff9] dark:hover:text-[#6B9FFF] transition-colors shadow-lg"
              title="Téléphone"
            >
              <Phone className="w-7 h-7 icon-hover-bounce" />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('calendar')}
              className="w-16 h-16 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center hover:bg-[#1534d4] transition-colors shadow-lg"
              title="Calendrier"
            >
              <Calendar className="w-7 h-7 icon-hover-pulse" />
            </button>
          </div>
        </motion.div>

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
                className="bg-white dark:bg-[#1A1D24] rounded-lg shadow-xl border border-gray-200 dark:border-[#2A2E39] p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Contactez-nous directement sur WhatsApp</p>
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
                className="bg-white dark:bg-[#1A1D24] rounded-lg shadow-xl border border-gray-200 dark:border-[#2A2E39] p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Téléphone</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Appelez-nous directement</p>
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
                className="bg-white dark:bg-[#1A1D24] rounded-lg shadow-xl border border-gray-200 dark:border-[#2A2E39] p-4 w-full max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-200 mb-2">Calendrier</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Réservez un créneau dans notre calendrier</p>
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
        
        {showCalendly && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="calendly-section p-2 sm:p-5 md:p-8 rounded-xl md:rounded-2xl bg-white dark:bg-[#1A1D24] shadow-lg border border-gray-200 dark:border-[#2A2E39] overflow-hidden mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Réserver votre audit gratuit</h3>
              <button 
                onClick={() => setShowCalendly(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="Fermer le calendrier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
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
            
            <div className="calendly-fallback text-center py-8" style={{display: 'none'}}>
              <h3 className="text-lg font-semibold mb-4 dark:text-gray-200">Réserver un appel découverte</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Le calendrier se charge...</p>
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
          </motion.div>
        )}

        {!showCalendly && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-8 p-6 bg-gradient-to-br from-[#1c3ff9]/5 to-[#6366f1]/5 dark:from-[#1c3ff9]/10 dark:to-[#6366f1]/10 rounded-xl border border-[#1c3ff9]/10 dark:border-[#1c3ff9]/20"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check className="w-5 h-5 text-[#10B981] dark:text-[#34D399]" />
              <span className="text-sm font-semibold text-[#0A0A0A] dark:text-gray-200">Audit 100% gratuit</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              ✓ 15 minutes par téléphone<br />
              ✓ Analyse de votre fiche Google<br />
              ✓ Plan d'action personnalisé
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// Footer Section
const Footer = ({ onOpenLegalModal = () => {} }) => {
  return (
    <footer className="py-12 md:py-24 bg-[#0A0A0A] relative overflow-hidden" data-testid="footer">
      <div className="absolute top-10 left-10 w-32 h-32 opacity-[0.03] hidden md:block">
        <MapPin className="w-full h-full text-white" />
      </div>
      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-[0.03] rotate-12 hidden md:block">
        <MapPin className="w-full h-full text-white" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              src="/logo-64.webp"
              srcSet={LOGO_SRC_SET}
              sizes="(max-width: 768px) 20px, 24px"
              alt="KAPTA Media - Logo agence marketing local Tours" 
              loading="lazy"
              width="96"
              height="96"
              decoding="async"
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
          
          <p className="text-[10px] md:text-xs font-mono text-[#8A93A5] tracking-wider hidden md:block">
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
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 md:mt-8 text-xs text-[#9BA3B5]">
          <button onClick={() => onOpenLegalModal("mentions")} className="text-[#9BA3B5] hover:text-white transition-colors">
            Mentions légales
          </button>
          <button onClick={() => onOpenLegalModal("privacy")} className="text-[#9BA3B5] hover:text-white transition-colors">
            Politique de confidentialité
          </button>
          <button onClick={() => onOpenLegalModal("cgv")} className="text-[#9BA3B5] hover:text-white transition-colors">
            CGV
          </button>
        </div>
        
        <p className="text-center text-xs md:text-sm text-[#9BA3B5] mt-4 md:mt-6">
          © 2026 Kapta Media. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

// Mobile Sticky CTA
const MobileStickyCTA = () => {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [hideOnContact, setHideOnContact] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > 600);
        ticking = false;
      });
    };

    const contactObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'contact') {
            setHideOnContact(entry.isIntersecting);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactObserver.observe(contactSection);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      contactObserver.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div 
      initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: hideOnContact ? 100 : 0
      }}
      exit={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0, y: 100 }}
      transition={{ 
        type: reduceMotion ? "tween" : "spring",
        stiffness: 260, 
        damping: 20,
        duration: reduceMotion ? 0.2 : undefined,
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
          <span className="text-[9px] font-bold leading-none">AUDIT</span>
        </div>
      </Button>
    </motion.div>
  );
};

// Legal Modals Content
const LEGAL_MODAL_CONTENT = {
  mentions: {
    title: "Mentions Légales",
    lines: [
      ["Éditeur du site :", "Kapta Media"],
      ["Responsable de la publication :", "[Votre nom]"],
      ["Adresse :", "[Votre adresse], Tours, France"],
      ["Téléphone :", "06 86 01 80 54"],
      ["Email :", "contact@kaptamedia.fr"],
      ["SIRET :", "[Numéro SIRET]"],
      ["Hébergeur :", "[Nom de l'hébergeur]"]
    ]
  },
  privacy: {
    title: "Politique de Confidentialité",
    lines: [
      ["Données collectées :", "Nom, email, téléphone, nom de l'établissement."],
      ["Finalité :", "Vous recontacter pour l'audit gratuit et le suivi de votre projet."],
      ["Conservation :", "Vos données sont conservées pendant 3 ans maximum."],
      ["Partage :", "Vos données ne sont jamais vendues ni partagées à des tiers."],
      ["Vos droits :", "Accès, rectification, suppression. Contactez-nous à contact@kaptamedia.fr"],
      ["Cookies :", "Ce site n'utilise pas de cookies de tracking."]
    ]
  },
  cgv: {
    title: "Conditions Générales de Vente",
    lines: [
      ["Prestation :", "Création de contenu vidéo et photo, optimisation de fiche Google Business, système Missed Call SMS."],
      ["Tarif pilote :", "490€ HT - Paiement unique, pas d'abonnement. Offre réservée aux 5 premiers partenaires sur Tours."],
      ["Livraison :", "Sous 14 jours ouvrés après le tournage."],
      ["Garantie :", "Satisfait ou remboursé sous 30 jours si vous n'êtes pas satisfait du travail livré."],
      ["Propriété :", "Vous êtes propriétaire de tous les contenus créés (vidéo, photos)."],
      ["Témoignage :", "En contrepartie du tarif pilote, vous acceptez de fournir un témoignage si satisfait."],
      ["Exclusivité :", "Un seul partenaire par métier et par secteur géographique."]
    ]
  }
};

// Legal Modals Component
const LegalModals = ({ activeModal, onClose }) => {
  if (!activeModal || !LEGAL_MODAL_CONTENT[activeModal]) return null;

  const { title, lines } = LEGAL_MODAL_CONTENT[activeModal];

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-[#1A1D24] rounded-2xl max-w-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4 dark:text-gray-200">{title}</h2>
        <div className="text-sm text-[#52525B] space-y-4">
          {lines.map(([label, value]) => (
            <p key={label}>
              <strong>{label}</strong> {value}
            </p>
          ))}
        </div>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-[#1c3ff9] text-white rounded-lg">
          Fermer
        </button>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [activeLegalModal, setActiveLegalModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Respecter les préférences d'accessibilité
  useReducedMotion();

  // Easter egg - Konami Code
  useKonamiCode(() => {
    alert('🎉 KAPTA MEDIA - Code secret activé ! Vous êtes un vrai geek ! 🚀');
    // Déclencher confetti partout
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        triggerConfetti(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
      }, i * 200);
    }
  });

  useEffect(() => {
    Analytics.initAnalytics();
  }, []);

  // Pull to refresh
  const handleRefresh = async () => {
    haptics.medium();
    // Simuler un refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    haptics.success();
  };

  const pullToRefresh = usePullToRefresh(handleRefresh);

  const handleCTAClick = (e, source) => {
    // Haptic feedback
    haptics.medium();
    
    // Trigger confetti au clic
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    triggerConfetti(x, y);
    
    // Analytics
    Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', source);
    Analytics.trackCheckoutBegin();
    
    // Scroll vers contact
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="App min-h-screen bg-white dark:bg-[#050505] custom-cursor pattern-kapta-animated">
          <ReadingProgress />
          <MorphingShapes />
          <ParticleBackground particleCount={30} />
          <PullToRefreshIndicator {...pullToRefresh} />
          <SEOHead
            title="KAPTA Media - Agence Google Maps à Tours"
            description="Agence locale à Tours : optimisation Google Maps, vidéo professionnelle et système G.V.A. pour générer plus d'appels et de devis en 14 jours."
            keywords="google maps tours, référencement local tours, vidéo professionnelle, optimisation google business, marketing local tours"
            url="https://www.kaptamedia.fr/"
            image="https://www.kaptamedia.fr/logo2.webp"
          />
          <Navbar onCTAClick={handleCTAClick} />
          <Hero onCTAClick={handleCTAClick} />
          <MapsSplit />
          <Solution />
          <CaseStudies />
          <Process />
          <Team />
          <Proof />
          <Pricing onCTAClick={handleCTAClick} />
          <FAQ />
          <ContactForm />
          <Footer onOpenLegalModal={setActiveLegalModal} />
          <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
        </div>
      )}
    </>
  );
}

export default App;
