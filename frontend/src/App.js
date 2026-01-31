import { useState, useEffect, useRef } from "react";
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
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    }, 2000);
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 20); // 2000ms / 100ms = 20 steps
      });
    }, 100);
    
    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              src="https://customer-assets.emergentagent.com/job_e9af3148-6038-40b0-a95f-b7160e86bcee/artifacts/v4yy8wt0_logo2.webp" 
              alt="KAPTA" 
              className="h-6 md:h-8 w-auto"
            />
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg md:text-xl font-black tracking-tight text-[#0A0A0A]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>KAPTA</span>
              <span className="text-base md:text-lg font-medium italic text-[#1c3ff9]" style={{ fontFamily: 'Inter, sans-serif' }}>media</span>
            </div>
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#mechanism" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">
              Mécanisme
            </a>
            <a href="#pricing" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">
              Tarifs
            </a>
            <a href="#faq" className="text-sm font-medium text-[#52525B] hover:text-[#0A0A0A] transition-colors">
              FAQ
            </a>
            <Button 
              data-testid="cta-audit-desktop"
              className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-6 btn-shimmer"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              AUDIT GRATUIT
            </Button>
          </div>

          <a
            href="tel:0686018054"
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#1c3ff9] text-white shadow-glow-sm"
            data-testid="cta-phone-mobile"
          >
            <Phone className="w-5 h-5" />
          </a>
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
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 md:mb-16"
            >
              <Button 
                data-testid="cta-hero-primary"
                size="lg"
                className="w-full sm:w-auto bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-8 py-6 text-base font-semibold shadow-glow btn-shimmer group"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                RÉSERVER MON AUDIT GRATUIT
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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

  return (
    <section 
      ref={ref}
      className="py-12 md:py-20 bg-white relative"
      data-testid="before-after-section"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <SectionHeader 
          number="01"
          label="La Réalité"
          title="VOICI CE QUI SE PASSE"
          highlight="VRAIMENT"
          description="Votre concurrent a une fiche Google optimisée. Vous, vous êtes invisible."
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
              const indicator = document.querySelector('.gmb-scroll-progress-indicator');
              if (indicator) {
                indicator.style.left = `${progress}%`;
              }
            }}
          >
            {/* AVANT - Fiche basique - Mobile */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative min-w-[280px] snap-start flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden opacity-70 h-[350px] flex flex-col">
                <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-[#4285F4] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Google</span>
                </div>
                
                <div className="h-28 bg-gray-100 relative">
                  <div className="absolute bottom-2 left-2 right-2">
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
              
              <div className="absolute top-12 left-2 bg-[#EF4444] text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                VOUS AUJOURD'HUI
              </div>
              
              <div className="absolute bottom-2 right-2 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Position 15+
              </div>
            </motion.div>

            {/* APRÈS - Fiche optimisée - Mobile */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative min-w-[280px] snap-start flex-shrink-0"
            >
              <div className="bg-white rounded-xl shadow-2xl border-2 border-[#1c3ff9] overflow-hidden relative animate-pulse-glow">
                {/* Effet néon subtil */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/5 via-transparent to-[#1c3ff9]/5 animate-shimmer"></div>
                
                <div className="bg-white px-3 py-2 border-b border-gray-100 flex items-center gap-2 relative z-10">
                  <div className="w-5 h-5 rounded bg-[#4285F4] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="text-xs font-medium text-gray-700">Google</span>
                </div>
                
                <div className="h-28 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10"></div>
                  <div className="absolute bottom-2 left-2 right-2">
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
                
                <div className="p-3 space-y-2">
                  {/* Section Vidéos intégrée */}
                  <div className="border-t border-gray-100 pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Camera className="w-3 h-3 text-[#1c3ff9]" />
                      <span className="text-xs font-medium text-gray-700">Vidéos</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mb-2">
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
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3 text-[#1c3ff9]" />
                    <span>123 Rue de la République, Tours</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    <span className="text-[#10B981] font-medium">Ouvert</span>
                    <span className="text-gray-600">· Ferme à 19h00</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Phone className="w-3 h-3 text-[#1c3ff9]" />
                    <span>06 86 01 80 54</span>
                  </div>
                  
                  <div className="flex gap-1 pt-2">
                    <button className="flex-1 bg-[#1c3ff9] text-white py-1.5 px-2 rounded text-xs font-medium">
                      Appeler
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-1.5 px-2 rounded text-xs font-medium">
                      Itinéraire
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-12 left-2 bg-[#10B981] text-white px-2 py-1 rounded-full text-xs font-bold shadow-xl animate-bounce-slow z-20">
                AVEC KAPTA
              </div>
              
              <div className="absolute top-2 right-2 bg-[#1c3ff9] text-white px-2 py-1 rounded-full text-xs font-bold shadow-xl z-20">
                Position N°1 ✓
              </div>
            </motion.div>
          </div>
          
          {/* Scroll indicator for mobile */}
          <div className="md:hidden flex flex-col items-center mt-2 mb-4">
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1 text-[#A1A1AA] text-xs mb-2"
            >
              <span>Glissez pour comparer</span>
              <ArrowRight className="w-3 h-3" />
            </motion.div>
            
            {/* Progress track */}
            <div className="relative w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="gmb-scroll-progress-indicator absolute top-0 w-3 h-1 bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out shadow-sm"
                style={{ left: '0%' }}
              />
            </div>
          </div>

          {/* Desktop: Original layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block relative"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden opacity-70 h-[400px] flex flex-col">
              <div className="bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </div>
              
              <div className="h-32 bg-gray-100 relative">
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 rounded-lg p-3">
                    <h3 className="font-bold text-base text-gray-900">Votre Commerce</h3>
                    <div className="flex items-center gap-1 mt-1">
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
                
                {/* Espace vide pour égaliser la hauteur */}
                <div className="flex-1"></div>
              </div>
            </div>
            
            <div className="absolute -top-3 -left-3 bg-[#EF4444] text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
              VOUS AUJOURD'HUI
            </div>
            
            <div className="absolute -bottom-3 -right-3 bg-gray-500 text-white px-3 py-1.5 rounded-full text-sm font-bold">
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
        
        {/* Flèche et résultat */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-[#10B981]/10 rounded-2xl p-4 border border-[#10B981]/20">
            <ArrowRight className="w-6 h-6 text-[#1c3ff9]" />
            <div>
              <p className="text-xl font-bold text-[#10B981]">+127%</p>
              <p className="text-xs text-gray-600">d'appels en plus en moyenne</p>
            </div>
          </div>
        </motion.div>
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
      className="py-12 md:py-32 bg-[#F8F9FA] relative overflow-hidden"
      data-testid="comparison-section"
    >
      {/* Strong Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="02"
          label="L'Impact"
          title="CE QUE ÇA VOUS"
          highlight="COÛTE VRAIMENT"
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
            {/* Problème - Impact négatif - Mobile */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative p-4 rounded-xl bg-white border-2 border-[#EF4444]/20 shadow-lg min-w-[320px] snap-start flex-shrink-0"
              data-testid="card-problem-impact-mobile"
            >
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#EF4444]/10 text-[9px] font-medium text-[#EF4444] border border-[#EF4444]/20">
                💸 Perte quotidienne
              </div>
              
              <h3 className="text-base font-bold text-[#EF4444] mb-3 mt-3">
                SANS OPTIMISATION
              </h3>
              
              <div className="space-y-3">
                <div className="bg-[#EF4444]/5 rounded-lg p-3 border border-[#EF4444]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">📉</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">Clients perdus</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">15-30 clients/mois choisissent vos concurrents</p>
                </div>
                
                <div className="bg-[#EF4444]/5 rounded-lg p-3 border border-[#EF4444]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">💰</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">Manque à gagner</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">3 000€ à 15 000€ de CA perdu/mois</p>
                </div>
                
                <div className="bg-[#EF4444]/5 rounded-lg p-3 border border-[#EF4444]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">⏰</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">Temps perdu</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">Chaque mois d'attente = 6 mois pour rattraper</p>
                </div>
              </div>
            </motion.div>
            
            {/* Solution - Impact positif - Mobile */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative p-4 rounded-xl bg-white border-2 border-[#10B981]/20 shadow-lg min-w-[320px] snap-start flex-shrink-0"
              data-testid="card-solution-impact-mobile"
            >
              <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-[#10B981] text-[9px] font-bold text-white shadow-lg">
                📈 ROI Immédiat
              </div>
              
              <h3 className="text-base font-bold text-[#10B981] mb-3 mt-3">
                AVEC KAPTA
              </h3>
              
              <div className="space-y-3">
                <div className="bg-[#10B981]/5 rounded-lg p-3 border border-[#10B981]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🎯</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">Clients récupérés</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">+127% d'appels = 20-40 nouveaux clients/mois</p>
                </div>
                
                <div className="bg-[#10B981]/5 rounded-lg p-3 border border-[#10B981]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">💎</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">ROI calculé</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">Investissement récupéré en 1-2 semaines</p>
                </div>
                
                <div className="bg-[#10B981]/5 rounded-lg p-3 border border-[#10B981]/10">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🚀</span>
                    <h4 className="font-bold text-[#0A0A0A] text-sm">Effet boule de neige</h4>
                  </div>
                  <p className="text-xs text-[#52525B]">Plus d'avis = meilleur classement = plus de clients</p>
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

          {/* Desktop: Original grid layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block relative p-5 md:p-8 rounded-2xl bg-white border-2 border-[#EF4444]/20 shadow-lg"
            data-testid="card-problem-impact"
          >
            <div className="absolute top-3 md:top-4 right-3 md:right-4 px-2 md:px-3 py-1 rounded-full bg-[#EF4444]/10 text-[10px] md:text-xs font-medium text-[#EF4444] border border-[#EF4444]/20">
              💸 Perte quotidienne
            </div>
            
            <h3 className="text-lg md:text-2xl font-bold text-[#EF4444] mb-4 md:mb-6 mt-4">
              SANS OPTIMISATION
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-[#EF4444]/5 rounded-xl p-4 border border-[#EF4444]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                    <span className="text-lg">📉</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">Clients perdus</h4>
                </div>
                <p className="text-sm text-[#52525B]">15-30 clients/mois choisissent vos concurrents mieux classés</p>
              </div>
              
              <div className="bg-[#EF4444]/5 rounded-xl p-4 border border-[#EF4444]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                    <span className="text-lg">💰</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">Manque à gagner</h4>
                </div>
                <p className="text-sm text-[#52525B]">3 000€ à 15 000€ de CA perdu par mois selon votre secteur</p>
              </div>
              
              <div className="bg-[#EF4444]/5 rounded-xl p-4 border border-[#EF4444]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#EF4444]/10 flex items-center justify-center">
                    <span className="text-lg">⏰</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">Temps perdu</h4>
                </div>
                <p className="text-sm text-[#52525B]">Chaque mois d'attente = 6 mois de plus pour rattraper</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden md:block relative p-5 md:p-8 rounded-2xl bg-white border-2 border-[#10B981]/20 shadow-lg"
            data-testid="card-solution-impact"
          >
            <div className="absolute top-3 md:top-4 right-3 md:right-4 px-3 md:px-4 py-1.5 rounded-full bg-[#10B981] text-[10px] md:text-xs font-bold text-white shadow-lg">
              📈 ROI Immédiat
            </div>
            
            <h3 className="text-lg md:text-2xl font-bold text-[#10B981] mb-4 md:mb-6 mt-4">
              AVEC KAPTA
            </h3>
            
            <div className="space-y-4 md:space-y-6">
              <div className="bg-[#10B981]/5 rounded-xl p-4 border border-[#10B981]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">Clients récupérés</h4>
                </div>
                <p className="text-sm text-[#52525B]">+127% d'appels en moyenne = 20-40 nouveaux clients/mois</p>
              </div>
              
              <div className="bg-[#10B981]/5 rounded-xl p-4 border border-[#10B981]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <span className="text-lg">💎</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">ROI calculé</h4>
                </div>
                <p className="text-sm text-[#52525B]">Investissement récupéré en 1-2 semaines selon votre panier moyen</p>
              </div>
              
              <div className="bg-[#10B981]/5 rounded-xl p-4 border border-[#10B981]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#10B981]/10 flex items-center justify-center">
                    <span className="text-lg">🚀</span>
                  </div>
                  <h4 className="font-bold text-[#0A0A0A]">Effet boule de neige</h4>
                </div>
                <p className="text-sm text-[#52525B]">Plus d'avis positifs = meilleur classement = encore plus de clients</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* ROI Calculator */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 md:mt-12 p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl bg-white border border-[#1c3ff9]/20 shadow-lg"
        >
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0A0A0A] mb-1 md:mb-2">Calculateur d'impact</h3>
            <p className="text-xs md:text-sm text-[#52525B]">Estimation basée sur nos données sectorielles</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-8">
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-[#1c3ff9]/5">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1c3ff9] mb-1">350€</p>
              <p className="text-xs md:text-sm text-[#52525B]">Investissement unique</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-[#10B981]/5">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#10B981] mb-1">+25</p>
              <p className="text-xs md:text-sm text-[#52525B]">Clients/mois en moyenne</p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-lg md:rounded-xl bg-[#FBBC04]/10">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold text-[#F59E0B] mb-1">ROI 10x</p>
              <p className="text-xs md:text-sm text-[#52525B]">Retour sur investissement</p>
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

  return (
    <section 
      ref={ref}
      className="py-12 md:py-32 bg-white relative"
      data-testid="case-studies-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          number="02"
          label="Transparence"
          title="PREMIERS PARTENAIRES"
          highlight="EN COURS"
          description=""
        />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-[#F8F9FA] rounded-2xl p-6 md:p-10 text-center border border-[#E4E4E7]"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center mx-auto mb-4 md:mb-6">
            <Camera className="w-8 h-8 md:w-10 md:h-10 text-[#1c3ff9]" />
          </div>
          
          <h3 className="text-lg md:text-2xl font-bold text-[#0A0A0A] mb-3 md:mb-4">
            Nous déployons actuellement notre système sur 5 commerces de Tours
          </h3>
          
          <p className="text-sm md:text-base text-[#52525B] mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Coiffeur, garage, restaurant... Les résultats avant/après seront publiés ici 
            avec captures d'écran Google Maps sous 30 jours.
          </p>
          
          <div className="bg-white rounded-xl p-4 md:p-6 border border-[#1c3ff9]/20 max-w-md mx-auto">
            <p className="text-sm md:text-base font-semibold text-[#0A0A0A] mb-2">
              Vous voulez faire partie des premiers ?
            </p>
            <p className="text-xs md:text-sm text-[#52525B] mb-4">
              Les 5 prochains partenaires bénéficient du <span className="font-semibold text-[#1c3ff9]">tarif pilote (350€)</span> en échange d'un témoignage vidéo si satisfaits.
            </p>
            <Button 
              className="w-full bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full py-4 md:py-5 text-sm md:text-base font-semibold btn-shimmer"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-testid="cta-case-studies"
            >
              DEVENIR PARTENAIRE PILOTE
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </motion.div>
        
        {/* Stats - Real numbers */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-12 grid grid-cols-3 gap-2 md:gap-4"
        >
          {[
            { value: "5", label: "Places disponibles" },
            { value: "350€", label: "Tarif pilote" },
            { value: "30j", label: "Garantie remboursement" }
          ].map((stat, i) => (
            <div key={i} className="text-center p-3 md:p-6 rounded-xl bg-white shadow-premium border border-[#E4E4E7]">
              <p className="text-lg md:text-3xl lg:text-4xl font-bold text-[#1c3ff9]">{stat.value}</p>
              <p className="text-[10px] md:text-sm text-[#52525B] mt-0.5 md:mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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
      className="py-12 md:py-32 bg-white relative"
      data-testid="mechanism-section"
    >
      {/* Floating brand pins */}
      <div className="absolute top-20 left-10 w-12 h-12 opacity-5 hidden md:block">
        <MapPin className="w-full h-full text-[#1c3ff9]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="03"
          label="Comment ça marche"
          title="4 ÉTAPES,"
          highlight="14 JOURS"
          description="Concrètement, voici ce qui se passe."
        />
        
        {/* Steps */}
        <div className="relative">
          {/* Connecting Line SVG */}
          <svg 
            className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 overflow-visible"
            style={{ zIndex: 0 }}
          >
            <motion.line
              x1="12.5%"
              y1="50%"
              x2="87.5%"
              y2="50%"
              stroke="#E4E4E7"
              strokeWidth="2"
              strokeDasharray="8 4"
            />
            <motion.line
              x1="12.5%"
              y1="50%"
              x2="87.5%"
              y2="50%"
              stroke="#1c3ff9"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: (activeStep + 1) / 4 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </svg>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
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
                
                {i <= activeStep && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#10B981] flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
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
      className="py-12 md:py-32 bg-[#F8F9FA] relative overflow-hidden"
      data-testid="pricing-section"
    >
      {/* Background brand pattern */}
      <div className="absolute inset-0 kapta-dots" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="04"
          label="Tarif"
          title="TARIF PILOTE"
          highlight="350€"
          description=""
        />
        
        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-lg mx-auto"
        >
          <div className="relative p-6 md:p-8 rounded-2xl bg-white border-2 border-[#1c3ff9] shadow-premium-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1c3ff9] text-white text-xs font-semibold">
              5 PLACES RESTANTES
            </div>
            
            <div className="text-center mb-6 md:mb-8">
              <p className="text-sm text-[#52525B] mb-2">Installation complète</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl md:text-5xl font-bold text-[#0A0A0A]">350€</span>
                <span className="text-[#52525B]">HT</span>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-2">Tarif normal après les 10 premiers : 790€</p>
            </div>
            
            <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              {[
                "Vidéo professionnelle 4K (30-60 secondes)",
                "15-20 photos HD de votre établissement",
                "Optimisation complète de votre fiche Google",
                "Borne NFC pour collecter des avis automatiquement",
                "Suivi de position pendant 30 jours"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#10B981]" />
                  </div>
                  <span className="text-sm md:text-base text-[#0A0A0A]">{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20 mb-6">
              <p className="text-sm text-center text-[#0A0A0A]">
                <span className="font-semibold">Garantie satisfait ou remboursé :</span> Pas satisfait du travail livré ? Remboursement intégral sous 30 jours.
              </p>
            </div>
            
            <Button 
              className="w-full py-5 md:py-6 bg-[#1c3ff9] hover:bg-[#1534d4] text-white font-semibold text-base shadow-glow btn-shimmer"
              data-testid="cta-pricing-premium"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              RÉSERVER MON AUDIT GRATUIT
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-center text-xs text-[#52525B] mt-4">
              En échange du tarif pilote, nous vous demanderons un témoignage vidéo si vous êtes satisfait.
            </p>
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
      answer: "Nous lançons notre activité sur Tours. Les 5 premiers partenaires sont en cours d'installation. Leurs résultats (avec captures d'écran Google Maps) seront publiés sous 30 jours. C'est pour ça qu'on propose le tarif pilote à 350€ au lieu de 790€."
    },
    {
      question: "Pourquoi Tours ?",
      answer: "On commence par une ville pour bien maîtriser notre processus avant de s'étendre. Tours est notre zone pilote. Les premiers partenaires bénéficient des meilleurs tarifs."
    },
    {
      question: "Combien de temps ça prend vraiment ?",
      answer: "Audit gratuit : 15 minutes par téléphone. Tournage : 2h chez vous, sans perturber votre service. Mise en ligne : 48h après le tournage. Premiers résultats : 14 jours en moyenne, garantie Top 5 sous 30 jours."
    },
    {
      question: "C'est un abonnement ?",
      answer: "Non. Paiement unique de 350€. Pas de frais cachés, pas d'engagement. Vous payez une fois, vous gardez tout à vie : vidéo, photos, optimisations, borne NFC."
    },
    {
      question: "C'est quoi la borne NFC ?",
      answer: "Un petit support élégant que vous placez à la caisse. Vos clients satisfaits le scannent avec leur smartphone et laissent un avis Google en 10 secondes. C'est le meilleur moyen de collecter des avis positifs sans demander."
    },
    {
      question: "Et si ça ne marche pas ?",
      answer: "Garantie satisfait ou remboursé. Si vous n'êtes pas satisfait du travail livré (vidéo, photos, optimisation), on vous rembourse intégralement sous 30 jours. Sans discussion."
    }
  ];

  return (
    <section 
      id="faq"
      ref={ref}
      className="py-12 md:py-32 bg-white relative"
      data-testid="faq-section"
    >
      {/* Floating brand pins */}
      <div className="absolute top-24 right-20 w-10 h-10 opacity-5 -rotate-12 hidden md:block">
        <MapPin className="w-full h-full text-[#1c3ff9]" />
      </div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="05"
          label="Questions"
          title="VOS QUESTIONS,"
          highlight="NOS RÉPONSES"
        />
        
        {/* Guarantee Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-10 p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#10B981]/5 border border-[#10B981]/20"
          data-testid="guarantee-box"
        >
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#10B981]" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#0A0A0A] mb-0.5 md:mb-1">Garantie 30 Jours</h3>
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
          <Accordion type="single" collapsible className="space-y-2 md:space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem 
                key={i} 
                value={`item-${i}`}
                className="border border-[#E4E4E7] rounded-lg md:rounded-xl px-4 md:px-6 data-[state=open]:border-[#1c3ff9] data-[state=open]:shadow-glow-sm transition-all"
                data-testid={`faq-item-${i}`}
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-[#0A0A0A] hover:no-underline py-4 md:py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-[#52525B] pb-4 md:pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
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
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', business: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Store form data in localStorage as backup
    const submissions = JSON.parse(localStorage.getItem('kapta_leads') || '[]');
    submissions.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('kapta_leads', JSON.stringify(submissions));
    
    // Open WhatsApp with pre-filled message (more reliable than mailto)
    const whatsappMessage = encodeURIComponent(
      `Bonjour, je suis ${formData.name} de "${formData.business}".\n\nJe souhaite réserver un audit gratuit.\n\n📞 ${formData.phone}\n📧 ${formData.email}\n\n${formData.message ? `Message: ${formData.message}` : ''}`
    );
    
    // Simulate brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSubmitted(true);
    setIsSubmitting(false);
    
    // Open WhatsApp in new tab
    window.open(`https://wa.me/33686018054?text=${whatsappMessage}`, '_blank');
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
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeader 
          number="06"
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
          Laissez vos coordonnées, je vous rappelle sous 24h.
        </motion.p>
        
        {/* Quick contact options */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
        >
          <a 
            href="https://wa.me/33686018054?text=Bonjour%2C%20je%20souhaite%20un%20audit%20gratuit%20pour%20mon%20commerce."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-medium hover:bg-[#20bd5a] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp direct
          </a>
          <a 
            href="tel:0686018054"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-[#E4E4E7] text-[#0A0A0A] font-medium hover:border-[#1c3ff9] transition-colors"
          >
            <Phone className="w-5 h-5" />
            06 86 01 80 54
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-5 md:p-8 rounded-xl md:rounded-2xl bg-white shadow-premium-xl border border-[#E4E4E7]"
        >
          {submitted ? (
            <div className="text-center py-6 md:py-8">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Check className="w-7 h-7 md:w-8 md:h-8 text-[#10B981]" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#0A0A0A] mb-1 md:mb-2">Demande envoyée !</h3>
              <p className="text-sm md:text-base text-[#52525B]">Nous vous recontactons sous 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                <div>
                  <label className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1.5 md:mb-2">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-[#E4E4E7] focus:border-[#1c3ff9] focus:ring-2 focus:ring-[#1c3ff9]/20 outline-none transition-all"
                    placeholder="Jean Dupont"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1.5 md:mb-2">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-[#E4E4E7] focus:border-[#1c3ff9] focus:ring-2 focus:ring-[#1c3ff9]/20 outline-none transition-all"
                    placeholder="06 86 01 80 54"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1.5 md:mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-[#E4E4E7] focus:border-[#1c3ff9] focus:ring-2 focus:ring-[#1c3ff9]/20 outline-none transition-all"
                  placeholder="jean@restaurant.fr"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1.5 md:mb-2">Nom de l'établissement</label>
                <input
                  type="text"
                  required
                  value={formData.business}
                  onChange={(e) => setFormData({...formData, business: e.target.value})}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-[#E4E4E7] focus:border-[#1c3ff9] focus:ring-2 focus:ring-[#1c3ff9]/20 outline-none transition-all"
                  placeholder="Restaurant Le Gourmet"
                  data-testid="input-business"
                />
              </div>
              
              <div>
                <label className="block text-xs md:text-sm font-medium text-[#0A0A0A] mb-1.5 md:mb-2">Message (optionnel)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl border border-[#E4E4E7] focus:border-[#1c3ff9] focus:ring-2 focus:ring-[#1c3ff9]/20 outline-none transition-all resize-none"
                  placeholder="Parlez-nous de votre établissement..."
                  data-testid="input-message"
                />
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 md:py-6 text-xs md:text-base bg-[#1c3ff9] hover:bg-[#1534d4] text-white font-semibold shadow-glow btn-shimmer disabled:opacity-50"
                data-testid="cta-submit-form"
              >
                {isSubmitting ? 'Envoi en cours...' : 'RÉSERVER MON AUDIT GRATUIT'}
                {!isSubmitting && <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />}
              </Button>
              
              <p className="text-center text-[10px] md:text-xs text-[#A1A1AA] mt-3">
                Vous serez redirigé vers WhatsApp · Sans engagement
              </p>
            </form>
          )}
        </motion.div>
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
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            RÉSERVER MON AUDIT GRATUIT
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        
        <div className="border-t border-[#1f1f1f] pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <a href="#" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_e9af3148-6038-40b0-a95f-b7160e86bcee/artifacts/v4yy8wt0_logo2.webp" 
              alt="KAPTA" 
              className="h-5 md:h-6 w-auto brightness-0 invert"
            />
          </a>
          
          <p className="text-[10px] md:text-xs font-mono text-[#52525B] tracking-wider hidden md:block">
            LA VISIBILITÉ, C'EST NOUS.
          </p>
          
          <div className="flex items-center gap-4 md:gap-6">
            <a href="tel:0686018054" className="text-[#A1A1AA] hover:text-white transition-colors flex items-center gap-2 text-sm md:text-base">
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

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="md:hidden sticky-cta-mobile"
      data-testid="mobile-sticky-cta"
    >
      <Button 
        className="w-full py-5 bg-[#1c3ff9] hover:bg-[#1534d4] text-white font-semibold shadow-glow btn-shimmer"
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      >
        AUDIT GRATUIT
        <ArrowRight className="ml-2 w-5 h-5" />
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
          <p><strong>Hébergeur :</strong> Emergent Labs</p>
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
