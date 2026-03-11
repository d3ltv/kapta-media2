import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "@/App.css";
import { motion, useInView, useReducedMotion } from "framer-motion";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useTheme from "@/hooks/useTheme";
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

const LOGO_SRC_SET = "/logo-64.webp 64w, /logo-96.webp 96w, /logo-128.webp 128w";
const VIDEO_ITEMS = [
  { id: 1, videoId: "U6FaRhs9W2c", title: "Vidéo 1" },
  { id: 2, videoId: "Pw_k894Lsk0", title: "Vidéo 2" },
  { id: 3, videoId: "GnDY-5dOt3Q", title: "Vidéo 3" },
  { id: 4, videoId: "EiySSMwTCz4", title: "Vidéo 4" },
  { id: 5, videoId: "D9M0JMP_V5I", title: "Vidéo 5" },
  { id: 6, videoId: "q2CnDcUkiMM", title: "Vidéo 6" }
];

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

const DeferredSection = ({
  children,
  minHeight = 480,
  rootMargin = "350px 0px",
  className = "",
  disableOnMobile = true,
  fallbackClassName = ""
}) => {
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === "undefined") return false;
    return disableOnMobile && window.innerWidth < 768;
  });
  const sectionRef = useRef(null);

  useEffect(() => {
    if (shouldRender) return;
    if (typeof window === "undefined") return;

    if (disableOnMobile && window.innerWidth < 768) {
      setShouldRender(true);
      return;
    }

    let timeoutId = null;
    let idleId = null;
    const reveal = () => setShouldRender(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(reveal, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(reveal, 1200);
    }

    return () => {
      observer.disconnect();
      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [disableOnMobile, rootMargin, shouldRender]);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={shouldRender ? undefined : { minHeight }}
    >
      {shouldRender ? (
        children
      ) : (
        <div
          className={`h-full min-h-full rounded-3xl bg-gradient-to-b from-[#F8FAFF] via-[#F3F6FF] to-[#FFFFFF] ${fallbackClassName}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
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
const Navbar = () => {
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
    { label: "Mécanisme", href: "#mechanism", icon: "⚙️" },
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
              className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-6 py-3 text-sm font-semibold shadow-lg btn-shimmer"
              onClick={() => {
                Analytics.trackCTAClick("AUDIT GRATUIT", "Mobile Menu");
                Analytics.trackAuditRequest("Mobile Menu");
                setMobileMenuOpen(false);
                handleMenuClick("#contact");
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
            <a href="#" className="flex items-center gap-2" data-testid="logo">
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
                <span className="text-lg md:text-xl font-black tracking-tight text-[#0A0A0A] dark:text-[#F3F6FF]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>KAPTA</span>
                <span className="text-base md:text-lg font-medium italic text-[#1c3ff9]" style={{ fontFamily: "Inter, sans-serif" }}>media</span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => {
                  Analytics.trackMenuClick("Mécanisme");
                  handleDesktopMenuClick("#mechanism");
                }}
                className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors dark:text-[#C2C8D8] dark:hover:text-[#F3F6FF]"
              >
                Mécanisme
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
                className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-6 btn-shimmer"
                onClick={() => {
                  Analytics.trackCTAClick("AUDIT GRATUIT", "Navbar Desktop");
                  Analytics.trackAuditRequest("Navbar Desktop");
                  handleDesktopMenuClick("#contact");
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

// Hero Section - Clean & Visual with Google Maps Mockup
const Hero = () => {
  return (
    <section 
      className="relative min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#070B14] dark:via-[#05070C] dark:to-[#0C1526]"
      data-testid="hero-section"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.08)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
      <div className="absolute inset-0 hidden dark:block bg-[linear-gradient(rgba(147,197,253,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.07)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-[#070B14]/80 dark:via-[#05070C]/40 dark:to-[#0A1220]/90 pointer-events-none" />
      
      {/* Soft Glow */}
      <div className="ios-mobile-heavy-blur hidden md:block absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#1c3ff9]/10 dark:bg-[#3B82F6]/16 rounded-full blur-[120px] pointer-events-none" />
      <div className="ios-mobile-heavy-blur absolute -top-20 left-[18%] w-[360px] h-[360px] hidden md:dark:block bg-[#60A5FA]/14 rounded-full blur-[130px] pointer-events-none" />
      <div className="ios-mobile-heavy-blur absolute bottom-[-120px] right-[12%] w-[420px] h-[420px] hidden md:dark:block bg-[#1D4ED8]/12 rounded-full blur-[150px] pointer-events-none" />
      
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
          onClick={() => document.querySelector('[data-testid="before-after-section"]')?.scrollIntoView({ behavior: 'smooth' })}
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
      className="py-8 md:py-12 bg-gradient-to-br from-white via-[#F8F9FA] to-white dark:from-[#050505] dark:via-[#0B0F17] dark:to-[#050505] relative overflow-hidden"
      data-testid="before-after-section"
    >
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
        
        <div className="md:grid md:grid-cols-2 md:gap-4 md:gap-8 -mx-2 md:mx-0" data-nosnippet="true">
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
            {/* Flèches de navigation */}
            {mobileSlideIndex === 0 && (
              <button
                onClick={() => setMobileSlideIndex(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-[#10B981] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Voir après"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            {mobileSlideIndex === 1 && (
              <button
                onClick={() => setMobileSlideIndex(0)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-[#EF4444] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Voir avant"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            
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
                  
                  <div className="absolute top-16 right-3 bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
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
            
            <div className="absolute -top-3 -right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
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
            <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#1c3ff9] overflow-hidden relative animate-pulse-glow">
              {/* Effet néon subtil */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/5 via-transparent to-[#1c3ff9]/5 animate-shimmer"></div>
              
              <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-2 relative z-10">
                <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </div>
              
              <div className="h-32 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <h3 className="font-bold text-base text-gray-900">Votre Commerce</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04] animate-twinkle" style={{ animationDelay: `${i * 0.1}s` }} />
                      ))}
                      <span className="text-sm text-gray-600 ml-2 font-semibold">4.9 (127 avis)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {/* Section Vidéos intégrée */}
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-4 h-4 text-[#1c3ff9]" />
                    <span className="text-sm font-medium text-gray-700">Vidéos</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[4px] border-l-[#1c3ff9] border-y-[3px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">1:24</div>
                    </div>
                    <div className="relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[4px] border-l-[#1c3ff9] border-y-[3px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">0:45</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#1c3ff9]" />
                  <span>123 Rue de la République, Tours</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  <span className="text-[#10B981] font-medium">Ouvert</span>
                  <span className="text-gray-600">· Ferme à 19h00</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#1c3ff9]" />
                  <span>06 86 01 80 54</span>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 bg-[#1c3ff9] text-white py-2 px-4 rounded-lg text-sm font-medium">
                    Appeler
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                    Itinéraire
                  </button>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -left-4 bg-[#10B981] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-xl animate-bounce-slow z-20">
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
// Problem Comparison Section - Version simplifiée
const ProblemComparison = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      className="py-8 md:py-12 bg-white dark:bg-[#070A11] relative overflow-hidden"
      data-testid="comparison-section"
    >
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="02"
          label="L'Impact"
          title="CE QUE ÇA VOUS"
          highlight="COÛTE VRAIMENT"
          description="Sans optimisation, vous perdez des clients chaque jour."
        />
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Sans optimisation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-gray-50 rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                📉
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0A]">Sans optimisation</h3>
            </div>
            
            <ul className="space-y-3 text-sm text-[#52525B]">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>15-30 clients/mois perdus au profit de concurrents</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>3 000€ à 15 000€ de CA perdu par mois</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span>Chaque mois d'attente = 6 mois pour rattraper</span>
              </li>
            </ul>
          </motion.div>

          {/* Avec Kapta */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1c3ff9]/5 rounded-xl p-6 border-2 border-[#1c3ff9]/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1c3ff9] flex items-center justify-center text-lg">
                📈
              </div>
              <h3 className="text-lg font-bold text-[#1c3ff9]">Avec Kapta</h3>
            </div>
            
            <ul className="space-y-3 text-sm text-[#0A0A0A]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1c3ff9] mt-0.5 flex-shrink-0" />
                <span><strong>+127% d'appels</strong> = 20-40 nouveaux clients/mois</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1c3ff9] mt-0.5 flex-shrink-0" />
                <span><strong>ROI en 1-2 semaines</strong> selon votre panier moyen</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#1c3ff9] mt-0.5 flex-shrink-0" />
                <span><strong>Effet boule de neige</strong> : plus d'avis = meilleur classement</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


// Case Studies Section - Honest version
const CaseStudies = () => {
  const ref = useRef(null);
  const caseStudiesProgressRef = useRef(null);
  const videoProgressRef = useRef(null);
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
        
        {/* Grille des cas clients avant/après - Version améliorée */}
        <div className="overflow-hidden">
          {/* Conteneur scrollable horizontal */}
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
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-w-[440px] md:min-w-[600px] snap-start flex-shrink-0"
              >
                {/* Section Avant/Après - Côte à côte simplifié */}
                <div className="grid grid-cols-2 gap-0">
                  {/* AVANT */}
                  <div className="relative">
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
                        className="w-full h-full object-contain object-center bg-gray-100"
                      />
                    </div>
                  </div>
                  
                  {/* APRÈS */}
                  <div className="relative">
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.afterImage} 
                        srcSet={buildImageSrcSet(caseStudy.afterImage)}
                        sizes="(max-width: 768px) 273px, 300px"
                        alt="Après"
                        width="960"
                        height="1280"
                        loading="lazy"
                        decoding="async"
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
                ref={caseStudiesProgressRef}
                className="h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
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
                  backgroundImage: `linear-gradient(var(--kapta-grid-soft) 1px, transparent 1px), linear-gradient(90deg, var(--kapta-grid-soft) 1px, transparent 1px)`,
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
              
              <p className="text-sm md:text-base text-[#52525B] max-w-2xl mx-auto">
                Découvrez les vidéos professionnelles que nous créons et intégrons sur les fiches Google
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Afficher 3 vidéos directement - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 px-4 mb-6">
          {VIDEO_ITEMS.slice(0, 3).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
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
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                      width="480"
                      height="360"
                      loading="lazy"
                      decoding="async"
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#1c3ff9] text-[#1c3ff9] hover:bg-[#1c3ff9] hover:text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <Camera className="w-4 h-4" />
            <span>{videosExpanded ? 'Masquer les 3 autres vidéos' : 'Voir les 3 autres vidéos'}</span>
            <motion.div
              animate={{ rotate: videosExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
        
        {/* Conteneur des 3 vidéos supplémentaires avec animation fluide */}
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
            {/* Grille responsive pour desktop, scroll horizontal pour mobile */}
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
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#1c3ff9]/30 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                        width="480"
                        height="360"
                        loading="lazy"
                        decoding="async"
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
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                          width="480"
                          height="360"
                          loading="lazy"
                          decoding="async"
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
            </div>
          </div>}
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
              loading="lazy"
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
  const mobileProgressRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const steps = [
    {
      id: "G",
      title: "Google Domination",
      icon: Radar,
      gradient: "from-[#1c3ff9] to-[#1534d4]",
      description:
        "Optimisation technique totale de votre fiche : catégories, mots-clés, horaires et structure locale. On aligne votre fiche avec ce que Google veut montrer en priorité.",
    },
    {
      id: "V",
      title: "Vidéo Magnétique",
      icon: Camera,
      gradient: "from-[#1c3ff9] to-[#1534d4]",
      description:
        "On vient filmer votre savoir-faire sur place. Une vidéo verticale professionnelle, claire et crédible, qui déclenche l'appel avant même la comparaison des prix.",
    },
    {
      id: "A",
      title: "Avis Automatisés",
      icon: Nfc,
      gradient: "from-[#1c3ff9] to-[#1534d4]",
      description:
        "On installe une plaque NFC intelligente pour simplifier la collecte d'avis. Vos clients satisfaits laissent un avis en quelques secondes, sans friction.",
    },
  ];

  return (
    <section 
      id="mechanism"
      ref={ref}
      className="py-8 md:py-12 bg-white dark:bg-[#070A11] relative overflow-hidden"
      data-testid="mechanism-section"
    >
      {/* Background grid subtil */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="05"
          label="Le Système"
          title="SYSTÈME"
          highlight="G.V.A.™"
          description="On ne vend pas du SEO isolé, on installe un écosystème complet en 14 jours."
        />
        
        <div className="relative">
          {/* Mobile - Scroll horizontal */}
          <div 
            className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            onScroll={(e) => updateScrollProgress(e.currentTarget, mobileProgressRef)}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative min-w-[85%] snap-start"
                data-testid={`step-${step.id}`}
              >
                {/* Card simple et propre */}
                <div className="relative p-6 rounded-xl bg-white border border-gray-100 shadow-lg h-[300px] flex flex-col">
                  {/* Badge pilier + Icône sur la même ligne */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c3ff9]/10 rounded-full">
                      <span className="text-xs font-mono text-[#1c3ff9] font-semibold">PILIER {i + 1}</span>
                    </div>
                    
                    {/* Icône avec gradient */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.gradient} shadow-md`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Badge lettre G/V/A + Titre */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm`}>
                      <span className="text-white font-bold text-sm">{step.id}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0A0A0A]">{step.title}</h3>
                  </div>
                  
                  <p className="text-sm text-[#52525B] leading-relaxed flex-1">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indicateur mobile */}
          <div className="md:hidden flex flex-col items-center mt-4 gap-2">
            <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                ref={mobileProgressRef}
                className="h-full bg-gradient-to-r from-[#1c3ff9] to-[#1534d4] rounded-full transition-all duration-200 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <p className="text-xs text-[#A1A1AA]">Glissez pour voir les 3 piliers</p>
          </div>

          {/* Desktop - Grille 3 colonnes */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative group"
                data-testid={`step-${step.id}-desktop`}
              >
                {/* Card simple et propre */}
                <div className="relative p-8 rounded-xl bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-[#1c3ff9]/20 transition-all duration-300">
                  {/* Badge pilier + Icône sur la même ligne */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1c3ff9]/10 rounded-full">
                      <span className="text-xs font-mono text-[#1c3ff9] font-semibold">PILIER {i + 1}</span>
                    </div>
                    
                    {/* Icône avec gradient */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${step.gradient} shadow-md group-hover:shadow-lg transition-shadow duration-300`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Badge lettre G/V/A + Titre */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-sm`}>
                      <span className="text-white font-bold text-base">{step.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0A0A0A] group-hover:text-[#1c3ff9] transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-[#52525B] leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Timeline Section - 14 jours - Style cohérent avec le branding
const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Handler pour détecter le scroll et mettre à jour l'index actif
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.scrollWidth / timelineSteps.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(newIndex);
    }
  };
  
  const timelineSteps = [
    {
      day: "J+1",
      title: "Audit Gratuit",
      description: "15 min par téléphone pour analyser votre fiche Google",
      icon: Phone,
    },
    {
      day: "J+2-3",
      title: "Tournage",
      description: "2h chez vous pour filmer et photographier votre activité",
      icon: Camera,
    },
    {
      day: "J+4-5",
      title: "Optimisation",
      description: "Montage vidéo, SEO de votre fiche et installation NFC",
      icon: Radar,
    },
    {
      day: "J+14",
      title: "Résultats",
      description: "+127% d'appels en moyenne, position améliorée",
      icon: TrendingUp,
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-8 md:py-12 bg-white dark:bg-[#070A11] relative overflow-hidden"
      data-testid="timeline-section"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="05B"
          label="Processus"
          title="CONCRÈTEMENT,"
          highlight="IL SE PASSE QUOI ?"
          description="Pas de blabla. Voici exactement ce qui va se passer, jour par jour."
        />
        
        {/* Timeline - Scroll horizontal mobile, grille desktop */}
        <div className="relative">
          {/* Desktop - Grille 4 colonnes */}
          <div className="hidden md:grid md:grid-cols-4 gap-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Ligne de connexion */}
                {index < timelineSteps.length - 1 && (
                  <div className="absolute top-8 left-[calc(50%+2rem)] w-[calc(100%+1.5rem)] h-0.5 bg-gradient-to-r from-[#1c3ff9] to-[#1c3ff9]/30 z-0" />
                )}
                
                <div className="relative z-10 bg-white rounded-xl p-5 shadow-lg border border-gray-100 hover:shadow-xl hover:border-[#1c3ff9]/20 transition-all duration-300">
                  {/* Icône */}
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#1534d4] flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Badge jour */}
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-[#1c3ff9]/10 text-[#1c3ff9] text-xs font-bold rounded-full">
                      {step.day}
                    </span>
                  </div>
                  
                  {/* Contenu */}
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#52525B] text-center leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile - Scroll horizontal */}
          <div className="md:hidden">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            >
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="min-w-[75%] snap-start bg-white rounded-xl p-5 shadow-lg border border-gray-100 flex-shrink-0"
                >
                  {/* Icône */}
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#1534d4] flex items-center justify-center shadow-md">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Badge jour */}
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-[#1c3ff9]/10 text-[#1c3ff9] text-xs font-bold rounded-full">
                      {step.day}
                    </span>
                  </div>
                  
                  {/* Contenu */}
                  <h3 className="text-base font-bold text-[#0A0A0A] mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#52525B] text-center leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            {/* Indicateur de scroll */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {timelineSteps.map((_, index) => (
                <div 
                  key={index} 
                  className={`rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-6 h-2 bg-[#1c3ff9]' 
                      : 'w-2 h-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Badge garantie + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 md:mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 rounded-full border border-[#10B981]/20 mb-6">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-semibold text-[#0A0A0A]">
              Garantie satisfait ou remboursé 30 jours
            </span>
          </div>
        </motion.div>
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
      className="py-8 md:py-16 bg-gradient-to-br from-[#F8F9FA] via-[#F1F5F9] to-[#F8F9FA] dark:from-[#050505] dark:via-[#0D121C] dark:to-[#050505] relative overflow-hidden"
      data-testid="pricing-section"
    >
      {/* Quadrillage subtil en fond */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `linear-gradient(var(--kapta-grid-strong) 1px, transparent 1px), linear-gradient(90deg, var(--kapta-grid-strong) 1px, transparent 1px)`,
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
          highlight="490€"
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
              <span className="relative z-10">OFFRE PILOTE TOURS</span>
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
            </motion.div>
            
            <div className="relative z-10">
              <div className="text-center mb-4 sm:mb-5">
                <p className="text-xs text-[#52525B] mb-1">Installation complète</p>
                
                {/* Badge Garantie visible */}
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 rounded-full border border-[#10B981]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span className="text-xs font-semibold text-[#10B981]">Garantie 30 jours</span>
                  </div>
                </div>
                
                <div className="flex items-baseline justify-center gap-2">
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
                    className="text-3xl sm:text-4xl font-bold text-[#0A0A0A] relative"
                  >
                    490€
                    <div className="absolute -inset-2 bg-[#1c3ff9]/5 rounded-lg -z-10 animate-pulse" />
                  </motion.span>
                  <span className="text-sm text-[#52525B]">HT</span>
                </div>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  <span className="line-through opacity-60">990€</span>
                  <span className="ml-2 text-[#10B981] font-semibold">-51%</span>
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

// Testimonials Section - iPhone avec conversations auto-cycle
const CYCLE_DURATION = 10000; // ms par conversation

const CONVERSATIONS = [
  {
    init: "MD",
    name: "Marc D.",
    business: "Garage automobile",
    location: "Tours Sud",
    msgs: [
      { who: "them", text: "En 2 semaines, je suis passé de la page 2 à la position N°1.", time: "J-14" },
      { who: "us", text: "C'est exactement ce qu'on vise. Les appels ont suivi ?", time: "Lu ✓✓" },
      { who: "them", text: "Les appels ont explosé, je dois refuser des clients maintenant. +220% d'appels.", time: "J-7" }
    ]
  },
  {
    init: "SL",
    name: "Sophie L.",
    business: "Salon de coiffure",
    location: "Tours Nord",
    msgs: [
      { who: "them", text: "La vidéo fait toute la différence. Les clients me disent qu'ils m'ont choisie grâce à elle.", time: "J-10" },
      { who: "us", text: "C'est le but — créer la confiance avant même l'appel.", time: "Lu ✓✓" },
      { who: "them", text: "Investissement rentabilisé en 10 jours. +180% d'appels.", time: "J-5" }
    ]
  },
  {
    init: "TB",
    name: "Thomas B.",
    business: "Restaurant",
    location: "Tours Centre",
    msgs: [
      { who: "them", text: "Enfin une solution qui marche. Fini de payer des pubs Google Ads qui ne convertissent pas.", time: "J-20" },
      { who: "us", text: "Google Maps, c'est du trafic local qualifié. Pas de budget pub.", time: "Lu ✓✓" },
      { who: "them", text: "Là, ce sont des vrais clients locaux. +160% d'appels.", time: "J-12" }
    ]
  }
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const [msgKey, setMsgKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const pausedProgressRef = useRef(0);

  const showConvo = (idx) => {
    setActiveIndex(idx);
    setMsgs([]);
    setProgress(0);
    pausedProgressRef.current = 0;
    setIsPaused(false);
    setTimeout(() => {
      setMsgs(CONVERSATIONS[idx].msgs);
      setMsgKey(k => k + 1);
    }, 50);
  };

  // Progress bar via requestAnimationFrame
  const startProgress = (idx, resumeFrom = 0) => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
    startRef.current = performance.now() - (resumeFrom * CYCLE_DURATION / 100);
    
    const tick = (now) => {
      if (isPaused) {
        pausedProgressRef.current = progress;
        return;
      }
      
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / CYCLE_DURATION) * 100, 100);
      setProgress(pct);
      
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(() => {
          const next = (idx + 1) % CONVERSATIONS.length;
          showConvo(next);
          startProgress(next);
        }, 200);
      }
    };
    
    rafRef.current = requestAnimationFrame(tick);
  };

  // Toggle pause/play
  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  // Effect pour gérer la pause/reprise
  useEffect(() => {
    if (isPaused) {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
      pausedProgressRef.current = progress;
    } else if (pausedProgressRef.current > 0) {
      startProgress(activeIndex, pausedProgressRef.current);
    }
  }, [isPaused]);

  useEffect(() => {
    showConvo(0);
    startProgress(0);
    
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  const currentConvo = CONVERSATIONS[activeIndex];
  const nextIdx = (activeIndex + 1) % CONVERSATIONS.length;

  return (
    <section 
      ref={ref}
      className="py-12 md:py-20 bg-white dark:bg-[#070A11] relative overflow-hidden"
      data-testid="testimonials-section"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.03)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="07"
          label="Témoignages"
          title="LES VRAIES"
          highlight="CONVERSATIONS"
          description="Pas de témoignages formatés. Ce que nos clients disent vraiment après le déploiement."
        />
        
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Texte gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-md w-full"
          >
            <p className="text-sm text-[#52525B] leading-relaxed mb-6">
              Pas de témoignages formatés.
              <br/>
              <span className="font-semibold text-[#0A0A0A]">Ce qu'ils disent vraiment.</span>
            </p>

            {/* Bouton Pause/Play - Desktop uniquement */}
            <div className="hidden md:flex items-center justify-between mb-4">
              <button
                onClick={togglePause}
                className="flex items-center gap-2 px-4 py-2 bg-[#1c3ff9]/10 hover:bg-[#1c3ff9]/20 text-[#1c3ff9] rounded-full transition-all duration-200 text-sm font-semibold"
              >
                {isPaused ? (
                  <>
                    <Play className="w-4 h-4" />
                    Reprendre
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                )}
              </button>
              <span className="text-xs text-[#A1A1AA]">
                {activeIndex + 1} / {CONVERSATIONS.length}
              </span>
            </div>

            {/* Indicateurs de progression - Desktop uniquement */}
            <div className="hidden md:flex gap-2 mb-4">
              {CONVERSATIONS.map((_, i) => (
                <div
                  key={i}
                  className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden cursor-pointer"
                  onClick={() => { showConvo(i); startProgress(i); }}
                >
                  <div
                    className="h-full bg-[#1c3ff9] rounded-full transition-all"
                    style={{
                      width: i < activeIndex ? '100%' : i === activeIndex ? `${progress}%` : '0%',
                      transition: i === activeIndex ? 'none' : 'width 0.3s'
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Nom actif - Desktop uniquement */}
            <div className="hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#1534d4] flex items-center justify-center text-white font-bold text-sm">
                {currentConvo.init}
              </div>
              <div>
                <p className="font-bold text-[#0A0A0A] text-sm">{currentConvo.name}</p>
                <p className="text-xs text-[#52525B]">{currentConvo.business} · {currentConvo.location}</p>
              </div>
            </div>
          </motion.div>

          {/* iPhone à droite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0 w-full max-w-[320px]"
          >
            <div className="bg-[#0A0A0A] rounded-[42px] border-[5.5px] border-[#1E1E1E] overflow-hidden shadow-2xl">
              {/* Notch */}
              <div className="h-7 bg-[#0A0A0A] flex items-center justify-center">
                <div className="w-20 h-1.5 bg-[#1A1A1A] rounded-full" />
              </div>

              {/* Barre de contact */}
              <div className="bg-[#111] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="w-8 h-8 rounded-full bg-[#1c3ff9]/20 flex items-center justify-center text-[#1c3ff9] font-bold text-xs flex-shrink-0">
                  {currentConvo.init}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-bold truncate">{currentConvo.name}</p>
                  <p className="text-[#3A3] text-[10px] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#3A3]" />
                    En ligne
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="bg-[#0F0F0F] px-3 py-4 h-[320px] flex flex-col gap-2 overflow-hidden" key={msgKey}>
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[82%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      m.who === "them"
                        ? "bg-[#1E1E1E] text-[#C8C8C8] rounded-bl-sm self-start"
                        : "bg-[#1c3ff9] text-white rounded-br-sm self-end font-medium"
                    }`}
                    style={{
                      opacity: 0,
                      transform: 'translateY(8px)',
                      animation: `fadeInUp 0.4s ${i * 0.2}s forwards`
                    }}
                  >
                    {m.text}
                    <div className={`text-[9px] mt-1 ${m.who === "them" ? "text-[#444]" : "text-white/40"}`}>
                      {m.time}
                    </div>
                  </div>
                ))}
              </div>

              {/* Barre de progression en bas */}
              <div className="bg-[#111] px-4 py-3 flex flex-col gap-2">
                <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1c3ff9] rounded-full"
                    style={{ width: `${progress}%`, transition: 'none' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-white/40 font-bold">{currentConvo.business}</span>
                  <span className="text-white/30">Suivant : {CONVERSATIONS[nextIdx].name.split(" ")[0]} →</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Contrôles mobile - Sous l'iPhone */}
        <div className="md:hidden mt-8 w-full max-w-[320px] mx-auto">
          {/* Indicateurs de progression */}
          <div className="flex gap-2 mb-4">
            {CONVERSATIONS.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden"
                onClick={() => { showConvo(i); startProgress(i); }}
              >
                <div
                  className="h-full bg-[#1c3ff9] rounded-full transition-all"
                  style={{
                    width: i < activeIndex ? '100%' : i === activeIndex ? `${progress}%` : '0%',
                    transition: i === activeIndex ? 'none' : 'width 0.3s'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Bouton Pause/Play et compteur */}
          <div className="flex items-center justify-between">
            <button
              onClick={togglePause}
              className="flex items-center gap-2 px-4 py-2 bg-[#1c3ff9]/10 hover:bg-[#1c3ff9]/20 text-[#1c3ff9] rounded-full transition-all duration-200 text-sm font-semibold"
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  Reprendre
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              )}
            </button>
            <span className="text-xs text-[#A1A1AA]">
              {activeIndex + 1} / {CONVERSATIONS.length}
            </span>
          </div>

          {/* Nom actif */}
          <div className="flex items-center gap-3 mt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c3ff9] to-[#1534d4] flex items-center justify-center text-white font-bold text-sm">
              {currentConvo.init}
            </div>
            <div>
              <p className="font-bold text-[#0A0A0A] text-sm">{currentConvo.name}</p>
              <p className="text-xs text-[#52525B]">{currentConvo.business} · {currentConvo.location}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
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
      answer: "Nous lançons notre activité sur Tours. Les 5 premiers partenaires sont en cours d'installation. Leurs résultats (avec captures d'écran Google Maps) seront publiés sous 30 jours. C'est pour ça qu'on propose le tarif pilote à 490€ au lieu de 990€.",
      icon: Trophy
    },
    {
      question: "Pourquoi Tours ?",
      answer: "On commence par une ville pour bien maîtriser notre processus avant de s'étendre. Tours est notre zone pilote. Les premiers partenaires bénéficient des meilleurs tarifs.",
      icon: MapPin
    },
    {
      question: "Combien de temps ça prend vraiment ?",
      answer: "Audit gratuit : 15 minutes par téléphone. Tournage : 2h chez vous, sans perturber votre service. Mise en ligne : 48h après le tournage. Premiers résultats : 14 jours en moyenne avec des indicateurs de visibilité mesurables.",
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
      className="py-8 md:py-16 bg-gradient-to-br from-white via-[#F8F9FA] to-white dark:from-[#050505] dark:via-[#0B0F17] dark:to-[#050505] relative overflow-hidden"
      data-testid="faq-section"
    >
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
          number="08"
          label="Questions"
          title="VOS QUESTIONS,"
          highlight="NOS RÉPONSES"
        />
        
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
      className="py-12 md:py-32 bg-[#F8F9FA] dark:bg-[#070A11] relative overflow-hidden"
      data-testid="contact-section"
    >
      {/* Background brand pattern */}
      <div className="absolute inset-0 kapta-dots" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="09"
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
          Réservez votre créneau en 2 clics. Audit gratuit de 15 minutes par téléphone.
          <br />
          <span className="text-xs text-[#A1A1AA] italic">
            Le calendrier nécessite quelques secondes de chargement pour s'afficher correctement.
          </span>
        </motion.p>
        
        {/* CTA Principal - Ouvrir Calendly directement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
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
        
        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 max-w-md mx-auto">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-xs text-[#A1A1AA]">ou contactez-nous</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        
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
            className="text-center mt-8 p-6 bg-gradient-to-br from-[#1c3ff9]/5 to-[#6366f1]/5 rounded-xl border border-[#1c3ff9]/10"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Check className="w-5 h-5 text-[#10B981]" />
              <span className="text-sm font-semibold text-[#0A0A0A]">Audit 100% gratuit</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
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
        
        {/* Legal Links */}
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      contactObserver.disconnect();
    };
  }, []);

  // Ne pas afficher si on n'est pas assez scrollé, mais laisser l'animation se faire pour hideOnContact
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
          <span className="text-[8px] font-bold leading-none">AUDIT</span>
        </div>
      </Button>
    </motion.div>
  );
};

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
      ["Prestation :", "Création de contenu vidéo et photo, optimisation de fiche Google Business, fourniture d'une borne NFC."],
      ["Tarif pilote :", "490€ HT - Paiement unique, pas d'abonnement."],
      ["Livraison :", "Sous 14 jours ouvrés après le tournage."],
      ["Garantie :", "Satisfait ou remboursé sous 30 jours si vous n'êtes pas satisfait du travail livré."],
      ["Propriété :", "Vous êtes propriétaire de tous les contenus créés (vidéo, photos)."],
      ["Témoignage :", "En contrepartie du tarif pilote, vous acceptez de fournir un témoignage vidéo si satisfait."]
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
      <div className="bg-white rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
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

  // Initialize analytics on mount
  useEffect(() => {
    Analytics.initAnalytics();
  }, []);

  return (
    <div className="App min-h-screen bg-white dark:bg-[#050505]">
      <SEOHead
        title="KAPTA Media - Agence Google Maps à Tours"
        description="Agence locale à Tours : optimisation Google Maps, vidéo professionnelle et système G.V.A. pour générer plus d'appels et de devis en 14 jours."
        keywords="google maps tours, référencement local tours, vidéo professionnelle, optimisation google business, marketing local tours"
        url="https://www.kaptamedia.fr/"
        image="https://www.kaptamedia.fr/logo2.webp"
      />
      <Navbar />
      <Hero />
      <BeforeAfter />
      <DeferredSection minHeight={1000}>
        <ProblemComparison />
      </DeferredSection>
      <DeferredSection minHeight={1200}>
        <CaseStudies />
      </DeferredSection>
      <Mechanism />
      <Timeline />
      <Pricing />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <DeferredSection minHeight={460}>
        <Footer onOpenLegalModal={setActiveLegalModal} />
      </DeferredSection>
      <MobileStickyCTA />
      <LegalModals activeModal={activeLegalModal} onClose={() => setActiveLegalModal(null)} />
    </div>
  );
}

export default App;
