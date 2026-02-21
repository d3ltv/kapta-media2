import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, TrendingUp, Users, MapPin, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import BlogCompleteGuide from "@/components/blog/BlogCompleteGuide";
import * as Analytics from "@/utils/analytics";

const Article1 = () => {
  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);
    
    // Add breadcrumb structured data
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.type = 'application/ld+json';
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Accueil",
          "item": "https://www.kaptamedia.fr"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.kaptamedia.fr/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "5 Raisons d'Optimiser Votre Fiche Google en 2026",
          "item": "https://www.kaptamedia.fr/blog/article1"
        }
      ]
    });
    document.head.appendChild(breadcrumbScript);
    
    return () => {
      if (breadcrumbScript.parentNode) {
        breadcrumbScript.parentNode.removeChild(breadcrumbScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      <SEOHead
        title="5 Raisons d'Optimiser Votre Fiche Google en 2026 | Kapta Media"
        description="Découvrez pourquoi optimiser votre fiche Google est crucial en 2026. Les entreprises du top 3 reçoivent 126 % de clics en plus, avec des actions concrètes à appliquer."
        keywords="fiche google, google business profile, référencement local, SEO local, optimisation google maps, visibilité locale, google my business, avis google, top 3 google maps"
        url="https://www.kaptamedia.fr/blog/article1"
        publishedTime="2025-02-09T10:00:00+01:00"
        modifiedTime="2025-02-09T10:00:00+01:00"
        category="Google Maps"
      />
      <SharedNavbar />
      
      {/* Hero Article */}
      <section className="relative pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden bg-white dark:bg-[#050505]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#52525B] hover:text-[#1c3ff9] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>

              <nav className="flex items-center gap-2 text-xs text-[#A1A1AA] md:justify-end" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-[#1c3ff9] transition-colors">Accueil</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-[#1c3ff9] transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-[#52525B]">5 Raisons d'Optimiser Votre Fiche Google</span>
              </nav>
            </div>

            {/* Category badge - Décollé du bouton */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Google Maps
              </span>
            </div>

            <InteractiveGlassTitle>
              5 Raisons d'Optimiser Votre Fiche Google en 2026
            </InteractiveGlassTitle>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-[#71717A] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                9 Février 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                8 min de lecture
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="pt-2 pb-12 md:pt-4 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <p className="text-xl text-[#52525B] leading-relaxed mb-6">
                En 2026, <strong className="text-[#0A0A0A]">votre fiche Google Business Profile</strong> est devenue votre vitrine digitale n°1. Plus importante que votre site web pour la visibilité locale.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Voici 5 raisons concrètes (avec chiffres à l'appui) pour lesquelles optimiser cette fiche est crucial pour votre entreprise.
              </p>
            </motion.div>

            {/* Raison 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A]">
                  1. Visibilité Locale Maximale
                </h2>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Les chiffres clés :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">46 %</strong> de toutes les recherches Google ont une intention locale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]">Les 3 premiers résultats locaux captent <strong className="text-[#1c3ff9]">126 %</strong> de clics en plus que les suivants</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">76 %</strong> des personnes qui font une recherche locale visitent l'entreprise dans les 24h</span>
                  </li>
                </ul>
              </div>

              <p className="text-[#52525B] leading-relaxed mb-4">
                <strong className="text-[#0A0A0A]">Concrètement :</strong> Si quelqu'un cherche "plombier à Tours" ou "restaurant italien près de moi", Google affiche d'abord le Local Pack (les 3 fiches Google avec carte).
              </p>

              <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                <p className="text-sm text-[#52525B]">
                  💡 Être dans ce top 3 = visibilité maximale. Ne pas y être = quasi invisibilité, même si vous avez un site web parfait.
                </p>
              </div>
            </motion.div>

            {/* Raison 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A]">
                  2. Crédibilité et Confiance Instantanées
                </h2>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">⭐ L'importance des avis :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">88 %</strong> des consommateurs font autant confiance aux avis en ligne qu'aux recommandations personnelles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]">Une note de <strong className="text-[#1c3ff9]">4,5★</strong> ou plus augmente les chances de visite de 70 %</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">73 %</strong> des clients ne font confiance qu'aux entreprises avec des avis positifs récents</span>
                  </li>
                </ul>
              </div>

              <p className="text-[#52525B] leading-relaxed">
                <strong className="text-[#0A0A0A]">Le réflexe client :</strong> Avant de choisir, on compare les notes Google. Une fiche bien notée avec beaucoup d'avis = gage de qualité immédiat.
              </p>
            </motion.div>

            {/* Raison 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A]">
                  3. Informations Pratiques Accessibles
                </h2>
              </div>

              <p className="text-[#52525B] leading-relaxed mb-6">
                Votre fiche Google centralise toutes les infos essentielles que vos clients recherchent :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-[#0A0A0A] mb-2">📍 Localisation</h4>
                  <p className="text-sm text-[#52525B]">Adresse + itinéraire GPS direct</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-[#0A0A0A] mb-2">⏰ Horaires</h4>
                  <p className="text-sm text-[#52525B]">Ouvert/fermé en temps réel</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-[#0A0A0A] mb-2">📞 Contact</h4>
                  <p className="text-sm text-[#52525B]">Appel en un clic depuis mobile</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-[#0A0A0A] mb-2">🌐 Site web</h4>
                  <p className="text-sm text-[#52525B]">Lien direct vers votre site</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                <p className="text-[#52525B]">
                  <strong className="text-[#0A0A0A]">Résultat :</strong> Le client obtient tout ce dont il a besoin sans quitter Google. Moins de friction = plus de conversions.
                </p>
              </div>
            </motion.div>

            {/* Raison 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A]">
                  4. Avantage Concurrentiel Direct
                </h2>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-4">🏆 La réalité du marché :</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]">Beaucoup de PME <strong className="text-[#0A0A0A]">négligent encore</strong> leur fiche Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]">Fiches incomplètes, photos obsolètes, avis non gérés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">•</span>
                    <span className="text-[#52525B]">Une fiche optimisée vous place <strong className="text-[#1c3ff9]">automatiquement devant</strong> ces concurrents</span>
                  </li>
                </ul>
              </div>

              <p className="text-[#52525B] leading-relaxed mb-4">
                <strong className="text-[#0A0A0A]">Exemple concret :</strong> Deux restaurants côte à côte. L'un a 4,7★ avec 150 avis et photos récentes. L'autre 4,2★ avec 20 avis et aucune photo.
              </p>

              <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                <p className="text-sm text-[#52525B]">
                  💡 Devinez lequel capte 80 % des nouveaux clients ? L'optimisation de votre fiche = votre meilleure arme face à la concurrence.
                </p>
              </div>
            </motion.div>

            {/* Raison 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A]">
                  5. Gratuit et Mesurable
                </h2>
              </div>

              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">🎁 Le meilleur ROI marketing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span className="text-[#52525B]"><strong className="text-[#0A0A0A]">100 % gratuit</strong> - Pas de frais d'inscription ou d'abonnement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span className="text-[#52525B]"><strong className="text-[#0A0A0A]">Statistiques détaillées</strong> - Nombre de vues, clics, appels, demandes d'itinéraire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold">✓</span>
                    <span className="text-[#52525B]"><strong className="text-[#0A0A0A]">ROI mesurable</strong> - Vous voyez exactement combien de clients viennent via Google</span>
                  </li>
                </ul>
              </div>

              <p className="text-[#52525B] leading-relaxed">
                <strong className="text-[#0A0A0A]">Comparaison :</strong> Une campagne Google Ads locale peut coûter 500-2000€/mois. Votre fiche Google optimisée = 0€ et génère du trafic qualifié 24/7.
              </p>
            </motion.div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-4">🎯 En Résumé</h2>
                <p className="text-gray-300 mb-6">
                  Optimiser votre fiche Google en 2026, c'est :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Capter 46 % des recherches locales</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Gagner la confiance de 88 % des clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Faciliter l'accès à vos infos pratiques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Dépasser vos concurrents locaux</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Obtenir un ROI gratuit et mesurable</span>
                  </li>
                </ul>
                <p className="text-gray-300 font-semibold">
                  Ne pas optimiser votre fiche Google = laisser des clients à vos concurrents. C'est aussi simple que ça.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article1" />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
              Prêt à optimiser votre fiche Google ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons vous aider à dominer les résultats locaux et attirer plus de clients.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Article 1 CTA');
                window.location.href = '/#contact';
              }}
            >
              RÉSERVER MON AUDIT GRATUIT
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-[#A1A1AA]">
            <p>© 2026 Kapta Media. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Article1;
