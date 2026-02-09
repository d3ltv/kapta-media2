import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Star, MessageCircle, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import * as Analytics from "@/utils/analytics";

const Article2 = () => {
  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Avis en Ligne : Pourquoi Sont-ils Essentiels ? | Kapta Media"
        description="81% des clients lisent systématiquement les avis avant de décider. Découvrez pourquoi les avis Google sont cruciaux pour votre référencement local et comment les gérer efficacement."
        keywords="avis google, avis clients, e-réputation, gestion avis, référencement local, google reviews, avis en ligne, réputation en ligne, collecte avis"
        url="https://kaptamedia.fr/blog/avis-en-ligne-pourquoi-essentiels"
        publishedTime="2025-02-06T10:00:00+01:00"
        modifiedTime="2025-02-06T10:00:00+01:00"
        category="Marketing Local"
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
                Marketing Local
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A0A0A] leading-[1.1] mb-6 tracking-tight">
              Avis en Ligne : Pourquoi Sont-ils Essentiels ?
            </h1>

            <div className="flex items-center gap-4 text-sm text-[#71717A] mb-12 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                6 Février 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                10 min de lecture
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
                <div className="text-6xl md:text-7xl lg:text-8xl">⭐</div>
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
                Les <strong className="text-[#0A0A0A]">avis en ligne</strong> sont devenus le nouveau bouche-à-oreille digital. Ils influencent directement vos ventes et votre visibilité sur Google.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Découvrez pourquoi ils sont cruciaux et comment les transformer en avantage compétitif.
              </p>
            </motion.div>

            {/* Pourquoi Essentiels */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                Pourquoi les Avis Sont Essentiels
              </h2>

              {/* Raison 1 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    1️⃣ Influence Directe sur la Décision d'Achat
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">📊 Les chiffres qui parlent :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">81%</strong> des clients lisent systématiquement les avis avant de décider</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]"><strong className="text-[#1c3ff9]">93%</strong> affirment que les avis influencent leur choix</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Une note de <strong className="text-[#1c3ff9]">4,5★</strong> ou plus augmente les conversions de <strong className="text-[#1c3ff9]">70%</strong></span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-4">
                  <strong className="text-[#0A0A0A]">Concrètement :</strong> Avant de réserver un restaurant, choisir un plombier ou acheter un produit, le réflexe est de vérifier les avis Google.
                </p>

                <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                  <p className="text-sm text-[#52525B]">
                    💡 Les avis sont devenus le <strong className="text-[#0A0A0A]">premier critère de confiance</strong>, avant même le prix ou la proximité.
                  </p>
                </div>
              </div>

              {/* Raison 2 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    2️⃣ Impact Direct sur le Référencement Local
                  </h3>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-6 md:p-8 mb-6">
                  <h4 className="text-lg font-bold text-[#0A0A0A] mb-4">🔍 Comment Google utilise les avis :</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Les avis représentent <strong className="text-[#1c3ff9]">15%</strong> du classement dans le Local Pack</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">Google privilégie les fiches avec <strong className="text-[#0A0A0A]">avis récents et nombreux</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#1c3ff9] font-bold">•</span>
                      <span className="text-[#52525B]">La <strong className="text-[#0A0A0A]">note moyenne</strong> et la <strong className="text-[#0A0A0A]">quantité</strong> comptent autant</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed">
                  <strong className="text-[#0A0A0A]">Résultat :</strong> Plus vous avez d'avis positifs récents, mieux vous êtes classé dans les résultats locaux. C'est un cercle vertueux.
                </p>
              </div>

              {/* Raison 3 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    3️⃣ Preuve Sociale et Crédibilité
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Les avis créent un effet de <strong className="text-[#0A0A0A]">preuve sociale</strong> : "Si tant de gens sont satisfaits, je peux faire confiance."
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-[#0A0A0A] mb-2">✅ Avec avis positifs</h4>
                    <p className="text-sm text-[#52525B]">Confiance immédiate, décision rapide, taux de conversion élevé</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <h4 className="font-bold text-[#0A0A0A] mb-2">❌ Sans avis</h4>
                    <p className="text-sm text-[#52525B]">Méfiance, hésitation, client part voir ailleurs</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 rounded-xl p-6">
                  <p className="text-[#52525B]">
                    <strong className="text-[#0A0A0A]">Fait intéressant :</strong> Même quelques avis négatifs (bien gérés) renforcent la crédibilité. Une note de 5★ parfaite peut sembler suspecte !
                  </p>
                </div>
              </div>

              {/* Raison 4 */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1c3ff9] rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">
                    4️⃣ Feedback Gratuit et Amélioration Continue
                  </h3>
                </div>

                <p className="text-[#52525B] leading-relaxed mb-6">
                  Les avis sont une <strong className="text-[#0A0A0A]">mine d'or d'informations</strong> sur ce qui fonctionne (ou pas) dans votre entreprise.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-[#0A0A0A] mb-3">💡 Ce que les avis vous apprennent :</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Points forts à mettre en avant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Points faibles à corriger</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Attentes des clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1c3ff9]">✓</span>
                      <span className="text-[#52525B]">Comparaison avec la concurrence</span>
                    </li>
                  </ul>
                </div>

                <p className="text-[#52525B] leading-relaxed">
                  <strong className="text-[#0A0A0A]">Bonus :</strong> Répondre aux avis montre que vous êtes à l'écoute et que vous vous souciez de vos clients.
                </p>
              </div>
            </motion.div>

            {/* Comment Gérer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 md:mb-20"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-8">
                Comment Bien Gérer Vos Avis
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
                      <strong className="text-[#0A0A0A]">Demander des avis</strong>
                      <p className="text-sm text-[#52525B] mt-1">Après chaque prestation réussie, envoyez un lien direct pour laisser un avis</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Répondre à TOUS les avis</strong>
                      <p className="text-sm text-[#52525B] mt-1">Positifs ET négatifs. Montrez que vous êtes actif et à l'écoute</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Répondre rapidement</strong>
                      <p className="text-sm text-[#52525B] mt-1">Dans les 24-48h maximum. Google et les clients apprécient la réactivité</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#10B981] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Personnaliser les réponses</strong>
                      <p className="text-sm text-[#52525B] mt-1">Évitez les réponses génériques. Mentionnez des détails spécifiques</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* À Éviter */}
              <div className="bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/20 rounded-xl p-6 md:p-8 mb-6">
                <h3 className="text-xl font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
                  <span className="text-2xl">❌</span>
                  À Éviter
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Acheter des faux avis</strong>
                      <p className="text-sm text-[#52525B] mt-1">Google détecte et pénalise. Risque de suspension de votre fiche</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Ignorer les avis négatifs</strong>
                      <p className="text-sm text-[#52525B] mt-1">Cela aggrave la situation. Répondez avec professionnalisme</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Être agressif ou défensif</strong>
                      <p className="text-sm text-[#52525B] mt-1">Même face à un avis injuste, restez courtois et professionnel</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#EF4444] font-bold text-lg">•</span>
                    <div>
                      <strong className="text-[#0A0A0A]">Demander de supprimer un avis négatif</strong>
                      <p className="text-sm text-[#52525B] mt-1">Sauf s'il est faux ou diffamatoire. Sinon, répondez et proposez une solution</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Exemple de réponse */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-bold text-[#0A0A0A] mb-3">💬 Exemple de bonne réponse à un avis négatif :</h4>
                <div className="bg-[#F8F9FA] rounded-lg p-4 mb-3">
                  <p className="text-sm text-[#52525B] italic">
                    "Bonjour [Prénom], merci pour votre retour. Nous sommes désolés que votre expérience n'ait pas été à la hauteur de vos attentes. Nous prenons vos remarques très au sérieux et aimerions comprendre ce qui s'est passé. Pourriez-vous nous contacter au [téléphone] pour que nous puissions trouver une solution ? Cordialement, [Votre nom]"
                  </p>
                </div>
                <p className="text-sm text-[#52525B]">
                  ✅ Professionnel, empathique, propose une solution, montre que vous vous souciez
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
                  Les avis en ligne sont essentiels car ils :
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Influencent 93% des décisions d'achat</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Représentent 15% de votre classement Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Créent la confiance et la preuve sociale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Vous donnent un feedback gratuit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#1c3ff9] font-bold">✓</span>
                    <span>Vous différencient de la concurrence</span>
                  </li>
                </ul>
                <p className="text-gray-300 font-semibold">
                  Chez Kaptamedia, nous vous aidons à mettre en place une stratégie de collecte et de gestion d'avis pour booster votre réputation en ligne.
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
              Prêt à booster votre e-réputation ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] mb-8 max-w-2xl mx-auto">
              Découvrez comment nous pouvons vous aider à collecter et gérer vos avis pour attirer plus de clients.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick('RÉSERVER MON AUDIT GRATUIT', 'Article 2 CTA');
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

export default Article2;
