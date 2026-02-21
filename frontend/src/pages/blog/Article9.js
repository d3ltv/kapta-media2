import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  MessageCircle,
  SearchCheck,
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

const Article9 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article9"));

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
          name: "Réponses aux Avis Google",
          item: "https://www.kaptamedia.fr/blog/article9",
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
        title="Répondre aux Avis Google : Stratégies et Meilleures Pratiques | Kapta Media"
        description="Méthode simple et efficace pour répondre aux avis Google, améliorer votre réputation et renforcer votre visibilité locale sur Google Maps."
        keywords="répondre avis google, gestion avis google business profile, e-réputation locale, seo local google maps, réponse avis négatif"
        url="https://www.kaptamedia.fr/blog/article9"
        publishedTime="2026-02-20T15:00:00+01:00"
        modifiedTime="2026-02-20T15:00:00+01:00"
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">Avis Google</span>
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
              Répondre aux Avis Google : Stratégies et Meilleures Pratiques
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Une méthode claire pour transformer vos réponses en moteur de confiance, de SEO local et de conversion.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                20 Février 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                5 min de lecture
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="pt-2 pb-12 md:pt-4 md:pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <p className="text-lg text-[#52525B] leading-relaxed">
                Aujourd'hui, <strong className="text-[#0A0A0A]">98% des consommateurs</strong> lisent les avis avant d'acheter.
                Laisser des avis sans réponse, c'est laisser de l'argent sur la table.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Les entreprises qui répondent de manière cohérente obtiennent plus d'avis, plus de confiance et une meilleure visibilité locale.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Attente client",
                  value: "< 24h",
                  description: "Le bon réflexe pour répondre, surtout quand l'avis est négatif.",
                },
                {
                  title: "Confiance",
                  value: "88%",
                  description: "Des clients font davantage confiance aux entreprises qui répondent.",
                },
                {
                  title: "Effet volume",
                  value: "+12%",
                  description: "En moyenne, les entreprises actives reçoivent plus d'avis.",
                },
              ]}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="rounded-xl border border-gray-200 bg-[#F8F9FA] p-5">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Repères opérationnels</h3>
                <ul className="space-y-2 text-[#52525B]">
                  <li>Répondez à tous les avis, pas seulement aux 5 étoiles.</li>
                  <li>Utilisez des templates, mais personnalisez toujours avec un détail concret.</li>
                  <li>Pour les avis sensibles, déplacez vite la discussion en contact direct.</li>
                </ul>
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">1. Les 5 règles d'or</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li><strong className="text-[#0A0A0A]">Rapidité :</strong> idéalement sous 24h.</li>
                <li><strong className="text-[#0A0A0A]">Personnalisation :</strong> prénom + détail du commentaire.</li>
                <li><strong className="text-[#0A0A0A]">Authenticité :</strong> ton humain, pas robotique.</li>
                <li><strong className="text-[#0A0A0A]">Courtoisie :</strong> même en cas de tension.</li>
                <li><strong className="text-[#0A0A0A]">SEO intelligent :</strong> mots-clés seulement sur les avis positifs.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">2. Avis positifs : exploitez-les vraiment</h2>
              </div>
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-200">
                <ul className="space-y-3 text-[#52525B]">
                  <li>Reprenez le produit ou service cité par le client.</li>
                  <li>Rappelez votre promesse (qualité, accueil, rapidité, etc.).</li>
                  <li>Invitez à revenir avec une recommandation simple.</li>
                </ul>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <SearchCheck className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">3. Avis négatifs : la bonne méthode</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Restez factuel et présentez des excuses pour la frustration ressentie.</li>
                <li>Proposez un contact direct pour résoudre le problème hors ligne.</li>
                <li>Évitez les mots-clés business dans la réponse publique.</li>
                <li>Si le cas est bien géré, le client peut réviser son avis.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">4. Impact direct Google Maps</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Répondre aux avis est un signal d'activité et de fiabilité. Google analyse le volume, la fraîcheur, la note et le contenu.
                Plus votre fiche vit, plus elle a de chances de remonter localement.
              </p>
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 mt-6">
                <p className="text-gray-300 mb-0">
                  En pratique : activez les notifications, mettez des modèles personnalisables, et visez le <strong className="text-white">zéro avis sans réponse</strong>.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article9" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez une routine d'avis qui convertit ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On construit votre système de réponse et de suivi pour améliorer votre réputation et votre visibilité locale.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick("RÉSERVER MON AUDIT GRATUIT", "Article 9 CTA");
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

export default Article9;
