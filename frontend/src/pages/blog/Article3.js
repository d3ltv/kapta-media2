import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Camera, Eye, TrendingUp, Zap, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import BlogCompleteGuide from "@/components/blog/BlogCompleteGuide";
import * as Analytics from "@/utils/analytics";

const Article3 = () => {
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
          "name": "Le Pouvoir des Photos et Vidéos",
          "item": "https://www.kaptamedia.fr/blog/article3"
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
        title="Le Pouvoir des Photos et Vidéos sur Votre Fiche Google | Kapta Media"
        description="Les fiches avec photos génèrent 35% de clics en plus. Découvrez comment les visuels transforment votre fiche Google en machine à clients. Guide complet avec statistiques."
        keywords="photos google, vidéo google business, visuels fiche google, photos professionnelles, vidéo entreprise, marketing visuel, contenu visuel, google maps photos"
        url="https://www.kaptamedia.fr/blog/article3"
        publishedTime="2025-02-03T10:00:00+01:00"
        modifiedTime="2025-02-03T10:00:00+01:00"
        category="Vidéo"
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
                <span className="text-[#52525B]">Photos et Vidéos</span>
              </nav>
            </div>

            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Vidéo
              </span>
            </div>

            <InteractiveGlassTitle>
              Le Pouvoir des Photos et Vidéos sur Votre Fiche Google
            </InteractiveGlassTitle>

            <div className="flex items-center gap-4 text-sm text-[#71717A] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                3 Février 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                6 min de lecture
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
                <strong className="text-[#0A0A0A]">Un visuel vaut mille mots</strong> - les visuels sont devenus indispensables pour promouvoir votre entreprise locale et convaincre vos clients potentiels.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Découvrez les 4 pouvoirs des photos et vidéos pour transformer votre fiche Google en machine à clients.
              </p>
            </motion.div>

            {/* Les 4 Pouvoirs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                4 Pouvoirs des Visuels
              </h2>

              {/* Pouvoir 1 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    1️⃣ Crédibiliser et Humaniser l'Image
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <p className="text-[#52525B] mb-3">
                    Un profil Google avec images est perçu comme <strong className="text-[#1c3ff9]">2x plus fiable</strong> qu'un profil sans photos.
                  </p>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Impact :</strong> Des photos de vos locaux, de votre équipe et de vos réalisations créent un lien de confiance immédiat avec vos prospects.
                </p>

                <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                  <p className="text-sm text-[#52525B]">
                    💡 Les clients veulent voir à qui ils ont affaire. Montrez les coulisses, l'équipe, l'ambiance - cela humanise votre entreprise.
                  </p>
                </div>
              </div>

              {/* Pouvoir 2 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    2️⃣ Augmenter le Taux de Clics
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Les chiffres qui parlent :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Fiches Google avec photos génèrent <strong className="text-[#1c3ff9]">35% de clics en plus</strong> vers le site</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">50%</strong> des internautes font davantage confiance après avoir visionné une courte vidéo</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed">
                  <strong className="text-[#0A0A0A]">Le message est clair :</strong> La vidéo est concrète et vivante. Elle transmet votre message en 30 secondes là où un texte serait ignoré.
                </p>
              </div>

              {/* Pouvoir 3 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    3️⃣ Mieux Convertir les Prospects
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Impact sur les conversions :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Vidéo sur page d'accueil peut augmenter le taux de conversion de <strong className="text-[#1c3ff9]">80%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Vidéo sur fiche produit : <strong className="text-[#1c3ff9]">+34%</strong> de conversions</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed">
                  <strong className="text-[#0A0A0A]">Raison :</strong> Les visuels aident les clients à se projeter et suppriment les doutes. Ils voient concrètement ce qu'ils vont obtenir.
                </p>
              </div>

              {/* Pouvoir 4 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    4️⃣ Améliorer le Référencement
                  </h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="font-bold text-[#0A0A0A] mb-3">🔍 Points clés :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Google apprécie les fiches régulièrement alimentées en visuels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Les images peuvent apparaître dans Google Images</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Vidéos YouTube/Facebook dans les résultats de recherche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]"><strong className="text-[#0A0A0A]">Google Lens 2026 :</strong> recherche visuelle par caméra</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                  <p className="text-[#52525B]">
                    <strong className="text-[#0A0A0A]">Résultat :</strong> Cercle vertueux = plus de confiance → plus de clics → plus de clients → meilleur classement Google.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Conseils Pratiques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                Conseils Pratiques
              </h2>

              {/* À Faire */}
              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  À Faire
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Mettre à jour régulièrement</strong>
                      <p className="text-sm text-[#52525B] mt-1">Des photos de 2018 = commerce négligé. Montrez que vous êtes actif !</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Varier les types</strong>
                      <p className="text-sm text-[#52525B] mt-1">Extérieur, intérieur, équipe, produits phares, avant/après</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Vidéo d'1 minute</strong>
                      <p className="text-sm text-[#52525B] mt-1">Le dirigeant présente l'entreprise ou montre les coulisses</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Respecter les consignes Google</strong>
                      <p className="text-sm text-[#52525B] mt-1">Formats corrects, pas de texte sur l'image, qualité professionnelle</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Exemples de types de visuels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image className="w-5 h-5 text-[#1c3ff9]" />
                    <h4 className="font-bold text-[#0A0A0A]">Photos Essentielles</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-[#52525B]">
                    <li>• Façade du commerce</li>
                    <li>• Intérieur / ambiance</li>
                    <li>• Équipe au travail</li>
                    <li>• Produits / services phares</li>
                    <li>• Réalisations clients</li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Camera className="w-5 h-5 text-[#1c3ff9]" />
                    <h4 className="font-bold text-[#0A0A0A]">Vidéos Impactantes</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-[#52525B]">
                    <li>• Présentation du dirigeant</li>
                    <li>• Visite guidée des locaux</li>
                    <li>• Démonstration de service</li>
                    <li>• Témoignages clients</li>
                    <li>• Coulisses / savoir-faire</li>
                  </ul>
                </div>
              </div>
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
                  Les photos et vidéos sont essentielles car elles :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Doublent votre crédibilité</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Génèrent 35% de clics en plus</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Augmentent les conversions de 80%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Améliorent votre référencement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Créent un cercle vertueux de croissance</span>
                  </li>
                </ul>
                <p className="text-gray-300 font-semibold">
                  Kaptamedia réalise des photos professionnelles et vidéos courtes impactantes pour enrichir votre fiche Google et maximiser votre visibilité.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article3" />

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
              Prêt à booster votre visibilité avec des visuels pro ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] mb-8 max-w-2xl mx-auto">
              Découvrez comment nous créons des photos et vidéos qui transforment votre fiche Google en machine à clients.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Article 3 CTA');
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
            <p>© 2025 Kapta Media. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Article3;
