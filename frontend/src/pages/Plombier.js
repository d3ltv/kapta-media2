import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Check, Shield, MapPin, TrendingUp, Calendar, Camera, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import SharedNavbar from "@/components/SharedNavbar";
import * as Analytics from "@/utils/analytics";

const Plombier = () => {
  const [formData, setFormData] = useState({
    prenom: "",
    metier: "",
    tel: ""
  });

  useEffect(() => {
    Analytics.trackPageView("/plombier");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Analytics.trackCTAClick("AUDIT GRATUIT BTP", "BTP Landing Page");
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <SEOHead
        title="Plombiers Tours - Visibilité Google Maps | Kapta Media"
        description="Spécialiste du marketing local pour plombiers-chauffagistes à Tours. Vidéo pro + fiche Google optimisée. Devenez N°1 sur Google Maps. Audit gratuit sous 48h."
        keywords="plombier tours, plombier chauffagiste tours, google maps plombier, marketing local plombier, visibilité locale plomberie"
        canonicalUrl="https://kapta-media.fr/plombier"
      />
      
      <SharedNavbar />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-24 md:pt-28 pb-16 md:pb-20 overflow-hidden bg-white dark:bg-gradient-to-br dark:from-[#070B14] dark:via-[#05070C] dark:to-[#0C1526]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.08)_1px,transparent_1px)] bg-[size:40px_40px] dark:hidden" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c3ff9]/5 border border-[#1c3ff9]/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-[#1c3ff9]">Spécialiste Plombiers-Chauffagistes à Tours</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] leading-[1.05] mb-8"
            >
              Plombiers à Tours :{" "}
              <span className="text-[#1c3ff9]">Devenez N°1</span>
              <br />
              <span className="text-[#71717A] dark:text-[#BFC9DD]">sur Google Maps</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg text-[#52525B] dark:text-[#C7CFDE] max-w-xl mx-auto mb-10 leading-relaxed"
            >
              On améliore votre <span className="font-semibold text-[#0A0A0A] dark:text-[#F4F7FF]">visibilité Google Maps</span> avec 
              une vidéo pro + une fiche Google qui donne envie d'appeler.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <Button 
                size="lg"
                className="w-auto bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300"
                onClick={() => {
                  Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT BTP', 'Hero BTP');
                  document.getElementById('contact-btp')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                RÉSERVER MON AUDIT GRATUIT
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 text-sm text-[#52525B] dark:text-[#C2C8D8]"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#10B981]" />
                <span>Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#10B981]" />
                <span>Réponse sous 48h</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1c3ff9] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">88%</div>
              <p className="text-white/80">des clients cliquent sur les 3 premiers résultats Google Maps</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">×4</div>
              <p className="text-white/80">plus d'appels reçus avec une fiche optimisée</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">90 min</div>
              <p className="text-white/80">de votre temps - on s'occupe du reste</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-4"
            >
              Tapez votre métier sur Google Maps.
              <br />
              <span className="text-[#71717A] dark:text-[#BFC9DD]">Vous êtes où ?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#52525B] dark:text-[#C7CFDE] max-w-2xl mx-auto"
            >
              Si vous n'êtes pas dans les 3 premiers résultats, vos futurs clients ne vous verront jamais.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6 text-[#0A0A0A] dark:text-[#F4F7FF]">
                Ce n'est pas un problème de réputation.
              </h3>
              <p className="text-[#52525B] dark:text-[#C7CFDE] mb-6 leading-relaxed">
                C'est un problème de <span className="font-semibold text-[#1c3ff9]">visibilité</span>. 
                Et ça, c'est réparable.
              </p>
              <ul className="space-y-4">
                {[
                  "Vidéo professionnelle tournée chez vous",
                  "Fiche Google Maps optimisée",
                  "Publications hebdomadaires",
                  "Gestion des avis clients",
                  "Suivi de votre classement"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span className="text-[#52525B] dark:text-[#C7CFDE]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#F8FAFF] to-[#F3F6FF] dark:from-[#0B0F17] dark:to-[#050505] p-8 rounded-2xl border border-gray-100 dark:border-[#2A2E39]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white dark:bg-[#10131A] rounded-lg border border-gray-200 dark:border-[#2A2E39]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center text-[#1c3ff9] font-bold">1</div>
                    <div>
                      <div className="font-semibold text-[#0A0A0A] dark:text-[#F4F7FF]">Martin Plomberie</div>
                      <div className="text-sm text-[#52525B] dark:text-[#C7CFDE]">★★★★★ 4.9 · 47 avis</div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#1c3ff9]/10 text-[#1c3ff9] px-3 py-1 rounded-full">Vidéo</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white dark:bg-[#10131A] rounded-lg border border-gray-200 dark:border-[#2A2E39]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center text-[#1c3ff9] font-bold">2</div>
                    <div>
                      <div className="font-semibold text-[#0A0A0A] dark:text-[#F4F7FF]">Dupont Chauffage</div>
                      <div className="text-sm text-[#52525B] dark:text-[#C7CFDE]">★★★★☆ 4.6 · 31 avis</div>
                    </div>
                  </div>
                  <span className="text-xs bg-[#1c3ff9]/10 text-[#1c3ff9] px-3 py-1 rounded-full">Actif</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0A0A0A] rounded-lg border border-dashed border-gray-300 dark:border-[#2A2E39] opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2A2E39] flex items-center justify-center text-gray-400 font-bold">?</div>
                    <div>
                      <div className="font-semibold text-[#52525B] dark:text-[#71717A] italic">Votre entreprise</div>
                      <div className="text-sm text-[#71717A]">Fiche non optimisée</div>
                    </div>
                  </div>
                  <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full">Invisible</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-[#F8FAFF] to-white dark:from-[#0B0F17] dark:to-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-4"
            >
              Notre méthode <span className="text-[#1c3ff9]">GVA™</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#52525B] dark:text-[#C7CFDE] max-w-2xl mx-auto"
            >
              Google · Vidéo · Avis - Les trois piliers qui s'alimentent mutuellement
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                title: "On vient chez vous",
                description: "90 minutes sur votre chantier. On filme votre vrai travail pendant que vous continuez à bosser.",
                icon: <Camera className="w-6 h-6" />
              },
              {
                number: "02",
                title: "On gère votre fiche",
                description: "Publications hebdomadaires, réponse aux avis, suivi du classement. Sans vous déranger.",
                icon: <TrendingUp className="w-6 h-6" />
              },
              {
                number: "03",
                title: "Vous recevez les appels",
                description: "De vrais clients. Dans votre secteur. Pour les chantiers que vous voulez.",
                icon: <Phone className="w-6 h-6" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#10131A] p-8 rounded-2xl border border-gray-100 dark:border-[#2A2E39] hover:border-[#1c3ff9]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#1c3ff9]/10 flex items-center justify-center text-[#1c3ff9]">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-bold text-[#1c3ff9]/20">{item.number}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-3">{item.title}</h3>
                <p className="text-[#52525B] dark:text-[#C7CFDE] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white dark:bg-[#050505]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-4"
            >
              L'offre <span className="text-[#1c3ff9]">Monopole Local BTP™</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#52525B] dark:text-[#C7CFDE]"
            >
              Un déploiement unique. Des résultats durables.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#F8FAFF] to-white dark:from-[#10131A] dark:to-[#0A0A0A] rounded-2xl border-2 border-[#1c3ff9]/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#1c3ff9] to-[#3B82F6] p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-wider mb-2">One Shot · Done-For-You</div>
                  <div className="text-2xl font-bold">Le Système Complet</div>
                </div>
                <div className="text-right">
                  <div className="text-sm line-through opacity-60">3 343 €</div>
                  <div className="text-4xl font-bold">1 250 €</div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-4">
              {[
                { name: "Infrastructure GMB Dominateur Local", value: "997 €" },
                { name: "Tournage Trust-Builder sur site (90 min)", value: "1 500 €" },
                { name: "Récolteur d'Avis Automatique", value: "497 €", bonus: true },
                { name: "Script Fermeture Inbound", value: "349 €", bonus: true }
              ].map((item, index) => (
                <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${item.bonus ? 'bg-[#1c3ff9]/5 border border-[#1c3ff9]/20' : 'bg-gray-50 dark:bg-[#0A0A0A]'}`}>
                  <div className="flex-1">
                    {item.bonus && <span className="text-xs font-bold text-[#1c3ff9] uppercase tracking-wider mb-1 block">Bonus</span>}
                    <div className="font-semibold text-[#0A0A0A] dark:text-[#F4F7FF]">{item.name}</div>
                  </div>
                  <div className="text-[#52525B] dark:text-[#C7CFDE] line-through opacity-50">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="p-8 bg-[#1c3ff9]/5 border-t border-[#1c3ff9]/20">
              <div className="flex items-start gap-4 mb-6">
                <Shield className="w-6 h-6 text-[#1c3ff9] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-2">Garantie "Chantier Signé"</h4>
                  <p className="text-sm text-[#52525B] dark:text-[#C7CFDE] leading-relaxed">
                    Si dans les 90 jours vous n'avez pas signé au moins un nouveau chantier grâce à notre système, 
                    on continue gratuitement jusqu'à ce que ce soit le cas.
                  </p>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  Analytics.trackCTAClick('DÉPLOYER LE SYSTÈME BTP', 'Pricing BTP');
                  document.getElementById('contact-btp')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Je veux déployer le système
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-btp" className="py-20 bg-gradient-to-br from-[#F8FAFF] to-white dark:from-[#0B0F17] dark:to-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-6">
                Votre concurrent vient peut-être de recevoir{" "}
                <span className="text-[#1c3ff9]">cet audit gratuit</span>
              </h2>
              <p className="text-lg text-[#52525B] dark:text-[#C7CFDE] mb-8 leading-relaxed">
                On n'accepte qu'un seul partenaire par métier et par secteur géographique. 
                Une fois votre zone attribuée, c'est fermé.
              </p>

              <div className="bg-white dark:bg-[#10131A] p-6 rounded-xl border border-gray-200 dark:border-[#2A2E39] mb-8">
                <div className="text-sm font-semibold text-[#52525B] dark:text-[#C7CFDE] mb-3">Appel direct - le plus rapide</div>
                <a 
                  href="tel:+33686018054" 
                  className="flex items-center gap-4 text-3xl font-bold text-[#1c3ff9] hover:text-[#1534d4] transition-colors mb-4"
                  onClick={() => Analytics.trackPhoneClick("06 86 01 80 54", "BTP Landing Page")}
                >
                  <Phone className="w-8 h-8" />
                  06 86 01 80 54
                </a>
                <a 
                  href="https://wa.me/33686018054?text=Bonjour%20%F0%9F%91%8B%20je%20voudrais%20savoir%20si%20ma%20zone%20est%20encore%20disponible" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-[#25D366] hover:underline"
                  onClick={() => Analytics.trackCTAClick("WhatsApp BTP", "BTP Landing Page")}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ou par WhatsApp · Réponse rapide
                </a>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#52525B] dark:text-[#C7CFDE]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Sans engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span>Réponse sous 48h</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#10131A] p-8 rounded-2xl border border-gray-200 dark:border-[#2A2E39]"
            >
              <h3 className="text-xl font-bold text-[#0A0A0A] dark:text-[#F4F7FF] mb-6">
                Audit gratuit de votre fiche Google Maps
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-semibold text-[#52525B] dark:text-[#C7CFDE] mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="prenom"
                    value={formData.prenom}
                    onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                    placeholder="Pascal"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F4F7FF] focus:outline-none focus:ring-2 focus:ring-[#1c3ff9]/50"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="metier" className="block text-sm font-semibold text-[#52525B] dark:text-[#C7CFDE] mb-2">
                    Votre activité
                  </label>
                  <select
                    id="metier"
                    value={formData.metier}
                    onChange={(e) => setFormData({ ...formData, metier: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F4F7FF] focus:outline-none focus:ring-2 focus:ring-[#1c3ff9]/50"
                    required
                  >
                    <option value="">Choisissez</option>
                    <option>Plombier-chauffagiste</option>
                    <option>Électricien</option>
                    <option>Installateur pompe à chaleur</option>
                    <option>Cuisiniste</option>
                    <option>Pisciniste</option>
                    <option>Aménagement intérieur / showroom</option>
                    <option>Autre artisan du bâtiment</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="tel" className="block text-sm font-semibold text-[#52525B] dark:text-[#C7CFDE] mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="tel"
                    value={formData.tel}
                    onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                    placeholder="06 XX XX XX XX"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F4F7FF] focus:outline-none focus:ring-2 focus:ring-[#1c3ff9]/50"
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Vérifier si ma zone est encore libre
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                <p className="text-xs text-center text-[#71717A] dark:text-[#71717A]">
                  Sans engagement · Réponse sous 48h · Données confidentielles
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-[#10131A] border-t border-gray-200 dark:border-[#2A2E39] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1c3ff9]" />
              <span className="font-bold text-[#0A0A0A] dark:text-[#F4F7FF]">Kapta Media</span>
            </div>
            <p className="text-sm text-[#52525B] dark:text-[#C7CFDE]">
              © 2026 Kapta Media · Tours, Indre-et-Loire
            </p>
            <div className="flex gap-6">
              <Link to="/" className="text-sm text-[#52525B] dark:text-[#C7CFDE] hover:text-[#1c3ff9] transition-colors">
                Accueil
              </Link>
              <Link to="/blog" className="text-sm text-[#52525B] dark:text-[#C7CFDE] hover:text-[#1c3ff9] transition-colors">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Plombier;
