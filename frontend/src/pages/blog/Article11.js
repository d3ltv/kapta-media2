import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  PhoneCall,
  BadgeEuro,
  Radar,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import BlogCompleteGuide from "@/components/blog/BlogCompleteGuide";
import BlogEngagementBlocks from "@/components/blog/BlogEngagementBlocks";
import { getArticleBySlug, isArticleNew } from "@/data/blogArticles";
import * as Analytics from "@/utils/analytics";

const Article11 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article11"));

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
          name: "Concurrence locale et Google Maps",
          item: "https://www.kaptamedia.fr/blog/article11",
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
        title="Le concurrent d'en face n'est pas meilleur que vous (il a juste compris Google Maps) | Kapta Media"
        description="Artisans et commerces de Tours : pourquoi vos concurrents prennent les appels sur Google Maps et comment inverser la tendance en 14 jours."
        keywords="google maps tours, artisan tours visibilité, concurrence locale, fiche google business profile, avis google tours, indre-et-loire"
        url="https://www.kaptamedia.fr/blog/article11"
        publishedTime="2026-02-22T09:00:00+01:00"
        modifiedTime="2026-02-22T09:00:00+01:00"
        category="Google Maps"
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">Concurrence locale</span>
              </nav>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Google Maps
              </span>
              {showNewBadge && (
                <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase text-[#123A9B] border border-white/60 ring-1 ring-[#1D4ED8]/22 bg-gradient-to-r from-[#EAF2FF]/90 via-[#D8E7FF]/85 to-[#C2DAFF]/82 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_28px_rgba(30,64,175,0.26),inset_0_1px_0_rgba(255,255,255,0.62)]">
                  Nouveau
                </span>
              )}
            </div>

            <InteractiveGlassTitle>
              Le concurrent d'en face n'est pas meilleur que vous (il a juste compris Google Maps).
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Spécial artisans et commerces de Tours et d'Indre-et-Loire: comment reprendre les appels perdus en visibilité locale.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                22 Février 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                3 min de lecture
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
                Soyons directs: votre concurrent n'est pas forcément meilleur que vous.
                Il est surtout mieux visible quand un client tape votre métier sur Google Maps.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                En 2026, le meilleur n'est pas seulement celui qui travaille bien.
                C'est aussi celui qu'on voit en premier.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Clics captés",
                  value: "+70 %",
                  description: "Les 3 premiers résultats locaux absorbent la majorité des appels.",
                },
                {
                  title: "Perte restaurant",
                  value: "2 000 €+",
                  description: "Des réservations mensuelles qui glissent vers le voisin mieux classé.",
                },
                {
                  title: "Délai action",
                  value: "14 jours",
                  description: "Un cycle court pour reprendre l'avantage sur votre zone.",
                },
              ]}
            />

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">1. L'illusion du bouche-à-oreille</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Même quand on vous recommande, le réflexe reste le même: le prospect ouvre Google Maps, vérifie vos avis, vos horaires, vos photos, puis compare.
                Une fiche vide ou mal tenue casse la confiance en quelques secondes.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BadgeEuro className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">2. Ce que l'invisibilité coûte ce mois-ci</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li><strong className="text-[#0A0A0A]">Restaurant:</strong> 15 à 30 réservations perdues, soit souvent 2 000 € à 3 800 € de chiffre d'affaires.</li>
                <li><strong className="text-[#0A0A0A]">Artisan du bâtiment:</strong> 2 à 3 chantiers ou urgences qui partent ailleurs.</li>
                <li><strong className="text-[#0A0A0A]">Effet cumulatif:</strong> chaque mois sans action renforce la position du concurrent visible.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Radar className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">3. Inverser la tendance avec la méthode G.V.A.™</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li><strong className="text-[#0A0A0A]">[G] Google Domination:</strong> optimisation locale de votre fiche pour remonter sur vos requêtes métier.</li>
                <li><strong className="text-[#0A0A0A]">[V] Vidéo Magnétique:</strong> preuve visuelle claire de votre savoir-faire avant le premier appel.</li>
                <li><strong className="text-[#0A0A0A]">[A] Avis Automatisés:</strong> collecte simple et rapide avec plaque NFC chez vos clients satisfaits.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">4. Action immédiate</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed mb-6">
                Votre savoir-faire mérite d'être vu. Le sujet n'est pas d'ajouter du jargon marketing: le sujet est de reprendre les appels qualifiés dans votre quartier.
              </p>
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6">
                <p className="text-gray-300 mb-0">
                  Si votre concurrent vous passe devant aujourd'hui, c'est surtout un problème de système.
                  Et un système se corrige.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article11" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez un diagnostic local concret sur Tours ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On compare votre fiche à vos 3 concurrents directs et on vous donne un plan d'action clair en 48h.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
                onClick={() => {
                  Analytics.trackCTAClick("RÉSERVER AUDIT VISIBILITÉ 99€", "Article 11 Audit CTA");
                  window.location.href = "/#contact";
                }}
              >
                RÉSERVER L'AUDIT VISIBILITÉ
                <PhoneCall className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-[#1c3ff9] text-[#1c3ff9] hover:bg-[#1c3ff9]/8"
                onClick={() => {
                  Analytics.trackCTAClick("DÉCOUVRIR SETUP G.V.A.", "Article 11 Setup CTA");
                  window.location.href = "/#pricing";
                }}
              >
                DÉCOUVRIR LE SETUP G.V.A.™
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Article11;
