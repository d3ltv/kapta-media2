import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, PenTool, Target, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import * as Analytics from "@/utils/analytics";

const Article4 = () => {
  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      <SEOHead
        title="La Puissance du Copywriting pour Votre SEO Local | Kapta Media"
        description="75% des internautes jugent votre crédibilité à la qualité de vos textes. Découvrez comment le copywriting améliore votre référencement local et vos conversions de 30%."
        keywords="copywriting, rédaction web, SEO local, contenu optimisé, rédaction persuasive, texte commercial, mots-clés locaux, conversion, référencement"
        url="https://kaptamedia.fr/blog/puissance-copywriting-seo-local"
        publishedTime="2025-01-31T10:00:00+01:00"
        modifiedTime="2025-01-31T10:00:00+01:00"
        category="Conseils"
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
                <span className="text-[#52525B]">Copywriting SEO Local</span>
              </nav>
            </div>

            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Conseils
              </span>
            </div>

            <InteractiveGlassTitle>
              La Puissance du Copywriting pour Votre SEO Local
            </InteractiveGlassTitle>

            <div className="flex items-center gap-4 text-sm text-[#71717A] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                31 Janvier 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                10 min de lecture
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
                Le <strong className="text-[#0A0A0A]">copywriting</strong> (rédaction persuasive) est l'art de séduire vos clients <strong className="text-[#0A0A0A]">ET</strong> Google avec des mots bien choisis.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Découvrez pourquoi soigner vos contenus écrits est crucial pour votre visibilité et vos conversions.
              </p>
            </motion.div>

            {/* Pourquoi Important */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                Pourquoi le Copywriting Est Crucial
              </h2>

              {/* Raison 1 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    1️⃣ Capter l'Attention en Moins de 8 Secondes
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">⏱️ Le défi de l'attention :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Durée moyenne d'attention : <strong className="text-[#1c3ff9]">8 secondes</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Les internautes <strong className="text-[#0A0A0A]">scannent</strong> plutôt que lire</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Un titre accrocheur peut <strong className="text-[#1c3ff9]">doubler</strong> votre taux de clic</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Exemple concret :</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border-2 border-[#EF4444]/30 rounded-xl p-4">
                    <h4 className="font-bold text-[#EF4444] mb-2">❌ Mauvais</h4>
                    <p className="text-sm text-[#52525B]">"Nous sommes une entreprise de plomberie qui offre des services de qualité depuis 1995."</p>
                    <p className="text-xs text-[#71717A] mt-2 italic">→ Ennuyeux, générique, centré sur vous</p>
                  </div>
                  <div className="bg-white border-2 border-[#10B981]/30 rounded-xl p-4">
                    <h4 className="font-bold text-[#10B981] mb-2">✅ Bon</h4>
                    <p className="text-sm text-[#52525B]">"Fuite d'eau à 2h du matin ? On intervient en 30 minutes à Tours."</p>
                    <p className="text-xs text-[#71717A] mt-2 italic">→ Problème + solution + bénéfice clair</p>
                  </div>
                </div>

                <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                  <p className="text-sm text-[#52525B]">
                    💡 Un bon copywriting parle au client, identifie son problème et propose une solution immédiate.
                  </p>
                </div>
              </div>

              {/* Raison 2 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    2️⃣ Établir Votre Crédibilité
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Impact sur la perception :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">75%</strong> des internautes jugent la crédibilité d'une entreprise à la qualité de ses textes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Fautes d'orthographe = <strong className="text-[#0A0A0A]">perte de confiance immédiate</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Texte professionnel = <strong className="text-[#1c3ff9]">entreprise sérieuse</strong></span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Règles d'or :</strong>
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Zéro faute d'orthographe ou de grammaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Phrases courtes et claires (15-20 mots max)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Vocabulaire adapté à votre cible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Ton professionnel mais accessible</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Raison 3 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    3️⃣ Améliorer Votre Référencement Google
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Google analyse vos textes pour comprendre votre activité et vous classer dans les résultats de recherche.
                </p>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">🔍 Ce que Google recherche :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Mots-clés locaux</strong>
                        <p className="text-sm text-[#52525B] mt-1">Ex: "plombier Tours", "restaurant italien Tours centre"</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Contenu pertinent</strong>
                        <p className="text-sm text-[#52525B] mt-1">Descriptions détaillées de vos services</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <div>
                        <strong className="text-[#0A0A0A]">Fraîcheur du contenu</strong>
                        <p className="text-sm text-[#52525B] mt-1">Mises à jour régulières = signal positif</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                  <p className="text-[#52525B]">
                    <strong className="text-[#0A0A0A]">Astuce :</strong> Intégrez naturellement vos mots-clés dans vos descriptions, sans sur-optimisation. Google détecte le bourrage de mots-clés et vous pénalise.
                  </p>
                </div>
              </div>

              {/* Raison 4 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    4️⃣ Augmenter Vos Conversions
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">💰 Impact sur les ventes :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Un bon copywriting peut augmenter les conversions de <strong className="text-[#1c3ff9]">30%</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Un CTA (Call-to-Action) clair multiplie les actions par <strong className="text-[#1c3ff9]">2</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Texte orienté bénéfices > caractéristiques</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Formule gagnante :</strong>
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-2">1. Problème</h4>
                      <p className="text-sm text-[#52525B]">"Votre chaudière tombe en panne en plein hiver ?"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-2">2. Solution</h4>
                      <p className="text-sm text-[#52525B]">"Intervention en urgence 7j/7 à Tours"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-2">3. Bénéfice</h4>
                      <p className="text-sm text-[#52525B]">"Retour au chaud en moins de 2h"</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0A] mb-2">4. Action</h4>
                      <p className="text-sm text-[#52525B] font-semibold">"Appelez maintenant : 06 XX XX XX XX"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                  <p className="text-sm text-[#52525B]">
                    💡 Parlez toujours des <strong className="text-[#0A0A0A]">bénéfices</strong> pour le client, pas des caractéristiques de votre service.
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
                Conseils Pratiques de Copywriting
              </h2>

              {/* À Faire */}
              <div className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/20 rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  Les Bonnes Pratiques
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Utilisez "vous" plutôt que "nous"</strong>
                      <p className="text-sm text-[#52525B] mt-1">Centrez le message sur le client, pas sur vous</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Soyez spécifique</strong>
                      <p className="text-sm text-[#52525B] mt-1">"Intervention en 30 min" > "Intervention rapide"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Créez l'urgence</strong>
                      <p className="text-sm text-[#52525B] mt-1">"Offre valable jusqu'au 28 février"</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Utilisez des verbes d'action</strong>
                      <p className="text-sm text-[#52525B] mt-1">"Réservez", "Découvrez", "Profitez"</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* À Éviter */}
              <div className="bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  Les Erreurs à Éviter
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Jargon technique</strong>
                      <p className="text-sm text-[#52525B] mt-1">Parlez le langage de vos clients, pas d'expert</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Phrases trop longues</strong>
                      <p className="text-sm text-[#52525B] mt-1">Maximum 20 mots par phrase</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Superlatifs excessifs</strong>
                      <p className="text-sm text-[#52525B] mt-1">"Le meilleur", "incroyable" = perte de crédibilité</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Texte générique</strong>
                      <p className="text-sm text-[#52525B] mt-1">Personnalisez selon votre secteur et votre ville</p>
                    </div>
                  </li>
                </ul>
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
                  Un bon copywriting est essentiel car il :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Capte l'attention en moins de 8 secondes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Établit votre crédibilité (75% jugent sur la qualité des textes)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Améliore votre référencement Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Augmente les conversions de 30%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Transforme les visiteurs en clients</span>
                  </li>
                </ul>
                <p className="text-gray-300 font-semibold">
                  Chez Kaptamedia, nous accordons une grande importance au copywriting - un bon contenu fait la différence entre un visiteur indifférent et un client convaincu.
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
              Prêt à optimiser vos contenus ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] mb-8 max-w-2xl mx-auto">
              Découvrez comment nous créons des textes qui séduisent vos clients ET Google pour maximiser vos conversions.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Article 4 CTA');
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

export default Article4;
