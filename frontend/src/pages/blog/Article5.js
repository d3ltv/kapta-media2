import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Trophy, Star, TrendingUp, Globe, Zap, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import * as Analytics from "@/utils/analytics";

const Article5 = () => {
  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Comment Dépasser Vos Concurrents sur Google en 2026 | Kapta Media"
        description="Découvrez les 5 clés pour dominer votre marché local en 2026. IA, recherche vocale, optimisation Google : tout ce qu'il faut savoir pour dépasser vos concurrents."
        keywords="dépasser concurrents, dominer google maps, stratégie SEO local, IA google, recherche vocale, google local services, analyse concurrence, leader local"
        url="https://kaptamedia.fr/blog/depasser-concurrents-google-2026"
        publishedTime="2025-01-28T10:00:00+01:00"
        modifiedTime="2025-01-28T10:00:00+01:00"
        category="Conseils"
      />
      <SharedNavbar />
      
      {/* Hero Article */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-white">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#52525B] hover:text-[#1c3ff9] transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Retour au blog
            </Link>

            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Conseils
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-[1.1] mb-6 tracking-tight">
              Comment Dépasser Vos Concurrents sur Google en 2026
            </h1>

            <div className="flex items-center gap-4 text-sm text-[#71717A] mb-12 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                28 Janvier 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                11 min de lecture
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative pb-12 md:pb-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-48 md:h-64 lg:h-80 bg-gradient-to-br from-[#1c3ff9]/10 via-[#6366f1]/10 to-[#3B82F6]/10 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl md:text-7xl lg:text-8xl">🏆</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 md:py-16">
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
                Le référencement local évolue avec <strong className="text-[#0A0A0A]">l'IA et la recherche vocale</strong>. En 2026, de nouvelles opportunités s'ouvrent pour dominer votre marché local.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Voici les 5 clés pour dépasser vos concurrents et devenir le leader de votre secteur sur Google.
              </p>
            </motion.div>

            {/* Les 5 Clés */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                5 Clés pour Dominer en 2026
              </h2>

              {/* Clé 1 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    1️⃣ Collectez Plus d'Avis (et de Meilleurs)
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">🎯 Objectif 2026 :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Viser <strong className="text-[#1c3ff9]">50+ avis</strong> avec une note de <strong className="text-[#1c3ff9]">4,5★</strong> minimum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Obtenir <strong className="text-[#0A0A0A]">2-3 nouveaux avis par mois</strong> minimum</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Répondre à <strong className="text-[#1c3ff9]">100%</strong> des avis en moins de 48h</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Stratégie gagnante :</strong>
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Envoyez un SMS avec lien direct après chaque prestation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Facilitez le processus (QR code, lien court)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Demandez au bon moment (juste après satisfaction)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Répondez avec personnalisation à chaque avis</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                  <p className="text-sm text-[#52525B]">
                    💡 <strong className="text-[#0A0A0A]">Fait clé :</strong> Les entreprises avec 50+ avis récents dominent systématiquement le Local Pack, même face à des concurrents mieux notés mais avec moins d'avis.
                  </p>
                </div>
              </div>

              {/* Clé 2 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    2️⃣ Optimisez Votre Fiche Google à 100%
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Une fiche Google complète à 100% est <strong className="text-[#0A0A0A]">2,7x plus visible</strong> qu'une fiche incomplète.
                </p>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">✅ Checklist complète :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Nom, adresse, téléphone</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Horaires d'ouverture</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Catégorie principale + secondaires</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Description optimisée (750 caractères)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Site web + réseaux sociaux</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Photos (20+ minimum)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Vidéos (1-3 vidéos courtes)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Services détaillés</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Attributs (parking, wifi, etc.)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[#10B981]">✓</span>
                      <span className="text-sm text-[#52525B]">Posts réguliers (1-2/mois)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                  <p className="text-[#52525B]">
                    <strong className="text-[#0A0A0A]">Astuce 2026 :</strong> Ajoutez des vidéos courtes (30-60 sec) présentant votre équipe, vos locaux ou vos services. Google privilégie de plus en plus le contenu vidéo.
                  </p>
                </div>
              </div>

              {/* Clé 3 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    3️⃣ Soignez Votre Site Web et Votre SEO
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Votre fiche Google et votre site web travaillent ensemble. L'un sans l'autre = résultats limités.
                </p>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">🌐 Essentiels du site web :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Vitesse de chargement</strong>
                        <p className="text-sm text-[#52525B] mt-1">Moins de 3 secondes sur mobile (critère Google majeur)</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Mobile-first</strong>
                        <p className="text-sm text-[#52525B] mt-1">70% des recherches locales sont sur mobile</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Contenu local</strong>
                        <p className="text-sm text-[#52525B] mt-1">Pages dédiées par ville/quartier que vous couvrez</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">NAP cohérent</strong>
                        <p className="text-sm text-[#52525B] mt-1">Nom, Adresse, Téléphone identiques partout (site, Google, réseaux)</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-[#0A0A0A] mb-3">📝 Stratégie de contenu local :</h4>
                  <p className="text-sm text-[#52525B] mb-3">
                    Créez des pages ciblées pour chaque service + ville :
                  </p>
                  <ul className="space-y-1 text-sm text-[#52525B]">
                    <li>• "Plombier d'urgence à Tours"</li>
                    <li>• "Réparation chaudière Tours Nord"</li>
                    <li>• "Dépannage plomberie Tours centre"</li>
                  </ul>
                </div>
              </div>

              {/* Clé 4 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    4️⃣ Exploitez l'IA et la Recherche Vocale
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">🤖 Tendances 2026 :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">58%</strong> des recherches locales se font par <strong className="text-[#0A0A0A]">recherche vocale</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Google utilise l'<strong className="text-[#0A0A0A]">IA</strong> pour comprendre l'intention de recherche</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Les <strong className="text-[#0A0A0A]">questions naturelles</strong> dominent : "Où trouver un plombier ouvert maintenant ?"</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Comment s'adapter :</strong>
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Optimisez pour les questions longues ("Qui", "Quoi", "Où", "Quand", "Comment")</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Créez une FAQ avec questions naturelles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Utilisez un langage conversationnel dans vos contenus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Mettez à jour vos horaires en temps réel</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                  <p className="text-[#52525B]">
                    <strong className="text-[#0A0A0A]">Exemple :</strong> Au lieu d'optimiser pour "plombier Tours", optimisez pour "Quel plombier est ouvert le dimanche à Tours ?" ou "Plombier d'urgence près de moi maintenant".
                  </p>
                </div>
              </div>

              {/* Clé 5 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <BarChart className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    5️⃣ Analysez et Ajustez en Continu
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Vos concurrents évoluent. Vous devez <strong className="text-[#0A0A0A]">surveiller et ajuster</strong> votre stratégie régulièrement.
                </p>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Métriques à suivre mensuellement :</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-bold text-[#0A0A0A] mb-2">Votre fiche Google</h5>
                      <ul className="space-y-1 text-sm text-[#52525B]">
                        <li>• Nombre de vues</li>
                        <li>• Clics vers le site</li>
                        <li>• Appels téléphoniques</li>
                        <li>• Demandes d'itinéraire</li>
                        <li>• Nouveaux avis</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-bold text-[#0A0A0A] mb-2">Vos concurrents</h5>
                      <ul className="space-y-1 text-sm text-[#52525B]">
                        <li>• Nombre d'avis</li>
                        <li>• Note moyenne</li>
                        <li>• Fréquence de posts</li>
                        <li>• Nouvelles photos/vidéos</li>
                        <li>• Position dans le Local Pack</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="font-bold text-[#0A0A0A] mb-3">🎯 Plan d'action mensuel :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">1.</span>
                      <span className="text-[#52525B]">Analysez vos statistiques Google Business Profile</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">2.</span>
                      <span className="text-[#52525B]">Comparez avec vos 3 principaux concurrents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">3.</span>
                      <span className="text-[#52525B]">Identifiez les points faibles à améliorer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">4.</span>
                      <span className="text-[#52525B]">Ajustez votre stratégie (plus de photos, nouveaux posts, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">5.</span>
                      <span className="text-[#52525B]">Mesurez les résultats le mois suivant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Bonus */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                🎁 Bonus : L'Arme Secrète
              </h2>

              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4">
                  La Cohérence Multi-Plateformes
                </h3>
                <p className="text-[#52525B] mb-4">
                  Google vérifie la cohérence de vos informations sur <strong className="text-[#0A0A0A]">toutes les plateformes</strong> :
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981]">✓</span>
                    <span className="text-[#52525B]">Google Business Profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981]">✓</span>
                    <span className="text-[#52525B]">Site web</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981]">✓</span>
                    <span className="text-[#52525B]">Facebook, Instagram</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981]">✓</span>
                    <span className="text-[#52525B]">Annuaires locaux (Pages Jaunes, Yelp, etc.)</span>
                  </li>
                </ul>
                <p className="text-[#52525B] font-semibold">
                  Des informations cohérentes partout = signal de confiance fort pour Google = meilleur classement.
                </p>
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
                  Pour dépasser vos concurrents en 2026 :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">1.</span>
                    <span>Collectez 50+ avis excellents et récents</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">2.</span>
                    <span>Optimisez votre fiche Google à 100%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">3.</span>
                    <span>Soignez votre site web et votre SEO local</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">4.</span>
                    <span>Exploitez l'IA et la recherche vocale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">5.</span>
                    <span>Analysez et ajustez en continu</span>
                  </li>
                </ul>
                <p className="text-gray-300 font-semibold">
                  Kaptamedia met en place ces 5 clés pour vous aider à dominer votre marché local en 2026 et laisser vos concurrents derrière vous.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

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
              Prêt à dominer votre marché local ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons vous aider à dépasser vos concurrents et devenir le leader de votre secteur sur Google.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Article 5 CTA');
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

export default Article5;
