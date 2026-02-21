import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  Smartphone,
  Mail,
  CheckCircle2,
  BarChart3,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import BlogCompleteGuide from "@/components/blog/BlogCompleteGuide";
import BlogEngagementBlocks from "@/components/blog/BlogEngagementBlocks";
import { getArticleBySlug, isArticleNew } from "@/data/blogArticles";
import * as Analytics from "@/utils/analytics";

const Article8 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article8"));

  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);

    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Accueil",
          item: "https://www.kaptamedia.fr",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://www.kaptamedia.fr/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Avis Google 2026 : Méthode 30 Jours pour Doubler Vos Avis",
          item: "https://www.kaptamedia.fr/blog/article8",
        },
      ],
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
        title="Avis Google 2026 : Méthode 30 Jours pour Doubler Vos Avis | Kapta Media"
        description="Une méthode simple en 30 jours pour augmenter le volume et la qualité de vos avis Google sans forcer vos clients."
        keywords="avis google, collecte avis clients, google reviews 2026, e-réputation locale, stratégie avis google"
        url="https://www.kaptamedia.fr/blog/article8"
        publishedTime="2026-02-19T09:00:00+01:00"
        modifiedTime="2026-02-19T09:00:00+01:00"
        category="Marketing Local"
        author="Kapta Media"
      />

      <SharedNavbar />

      <section className="relative pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden bg-white dark:bg-[#050505]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#52525B] dark:text-[#C2C8D8] hover:text-[#1c3ff9] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>

              <nav className="flex items-center gap-2 text-xs text-[#A1A1AA] dark:text-[#98A2B6] md:justify-end" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-[#1c3ff9] transition-colors">Accueil</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-[#1c3ff9] transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-[#52525B] dark:text-[#C2C8D8]">Méthode Avis 30 Jours</span>
              </nav>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Marketing Local
              </span>
              {showNewBadge && (
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase text-[#123A9B] border border-white/60 ring-1 ring-[#1D4ED8]/22 bg-gradient-to-r from-[#EAF2FF]/90 via-[#D8E7FF]/85 to-[#C2DAFF]/82 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_28px_rgba(30,64,175,0.26),inset_0_1px_0_rgba(255,255,255,0.62)]">
                  Nouveau
                </span>
              )}
            </div>

            <InteractiveGlassTitle>
              Avis Google 2026 : Méthode 30 Jours pour Doubler Vos Avis
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Une méthode simple, terrain, et durable pour augmenter vos avis sans forcer vos clients.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                19 Février 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                6 min de lecture
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="pt-2 pb-12 md:pt-4 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <p className="text-lg text-[#52525B] leading-relaxed">
                Beaucoup d'entreprises demandent des avis "quand elles y pensent". Résultat : un flux irrégulier, peu prévisible,
                et une note qui bouge mal dans le temps.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Cette méthode transforme la collecte d'avis en système simple, exécutable par une petite équipe, en 30 jours.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Durée plan",
                  value: "30 jours",
                  description: "Une fenêtre réaliste pour installer un rythme de collecte durable.",
                },
                {
                  title: "Canaux clés",
                  value: "SMS + QR",
                  description: "Deux canaux bien exécutés valent mieux qu'une diffusion dispersée.",
                },
                {
                  title: "Temps de réponse",
                  value: "< 48h",
                  description: "Répondre rapidement aux avis renforce la confiance et la conversion.",
                },
              ]}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="rounded-xl border border-gray-200 bg-[#F8F9FA] p-5">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">À retenir</h3>
                <ul className="space-y-2 text-[#52525B]">
                  <li>Visez une cadence stable : mieux vaut peu de demandes chaque semaine que des pics rares.</li>
                  <li>N'offrez pas de remise contre un avis : restez sur un feedback authentique et conforme.</li>
                  <li>Face à un avis négatif, répondez vite et proposez une résolution claire hors ligne.</li>
                </ul>
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Pourquoi le rythme des avis compte autant en 2026</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Les avis récents rassurent davantage les prospects.</li>
                <li>Google valorise les profils actifs et crédibles.</li>
                <li>Une note stable + un flux constant convertit mieux qu'un pic ponctuel.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <MessageCircle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Étape 1 : Définir le moment parfait de demande</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Le meilleur timing est juste après la preuve de satisfaction client (service rendu, livraison validée, problème résolu).
              </p>
              <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-200">
                <h4 className="font-semibold text-[#0A0A0A] mb-2">Script court recommandé</h4>
                <p className="text-sm text-[#52525B] mb-0">
                  "Merci encore pour votre confiance. Votre retour nous aide énormément. Vous pouvez laisser un avis ici en 30 secondes." 
                </p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Smartphone className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Étape 2 : Utiliser 2 canaux maximum (SMS + QR)</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Trop de canaux = exécution moyenne. Deux canaux bien tenus suffisent largement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Canal 1 : SMS</h4>
                  <p className="text-sm text-[#52525B]">Taux d'ouverture très élevé, idéal après prestation.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Canal 2 : QR code</h4>
                  <p className="text-sm text-[#52525B]">Comptoir, facture, carte de remerciement, borne NFC.</p>
                </div>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Mail className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Étape 3 : Séquence de relance légère (J+2 / J+7)</h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Jour</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">J+2</td>
                      <td className="px-4 py-3 text-[#0A0A0A]">Rappel court et poli avec lien direct.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">J+7</td>
                      <td className="px-4 py-3 text-[#0A0A0A]">Dernier rappel, ton humain, sans insister.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Étape 4 : Répondre à 100 % des avis</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Répondre améliore la perception client, renforce la preuve sociale, et envoie un signal positif à Google.
              </p>
              <div className="bg-[#1c3ff9]/5 border-l-4 border-[#1c3ff9] p-4 rounded">
                <p className="text-sm text-[#52525B] mb-0">
                  Règle simple : réponse en moins de 48h, ton professionnel, mention d'un détail concret du retour client.
                </p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <BarChart3 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Tableau de bord minimum à suivre</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Nombre d'avis collectés par semaine.</li>
                <li>Taux de réponse aux demandes d'avis.</li>
                <li>Note moyenne et évolution sur 30 jours.</li>
                <li>Délai moyen de réponse aux avis publiés.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Les erreurs qui cassent la dynamique</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Demander un avis à tout le monde, sans filtrer le moment de satisfaction.</li>
                <li>Envoyer des relances agressives ou trop nombreuses.</li>
                <li>Acheter des avis ou manipuler les notes.</li>
                <li>Ignorer les avis négatifs.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Conclusion</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Le bon objectif n'est pas "avoir plus d'avis" en one-shot.
                Le bon objectif est d'installer un rythme sain et durable. En 30 jours, vous pouvez déjà créer cet avantage.
              </p>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article8" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez industrialiser la collecte d'avis ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On met en place votre workflow terrain (messages, scripts, suivi KPI) en restant conforme aux bonnes pratiques Google.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick("RÉSERVER MON AUDIT GRATUIT", "Article 8 CTA");
                window.location.href = "/#contact";
              }}
            >
              RÉSERVER MON AUDIT GRATUIT
              <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Article8;
