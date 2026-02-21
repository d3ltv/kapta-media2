import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Smartphone,
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

const Article12 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article12"));

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
          name: "La guerre invisible de Tours",
          item: "https://www.kaptamedia.fr/blog/article12",
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
        title="La guerre invisible de Tours : pourquoi les clients de votre quartier vous échappent | Kapta Media"
        description="Commerçants, restaurateurs et artisans de Tours: pourquoi vous perdez des clients sur Google Maps et comment récupérer la première place locale."
        keywords="google maps tours, visibilité locale tours, place plumereau, joue les tours, saint avertin, chambray les tours, artisan tours"
        url="https://www.kaptamedia.fr/blog/article12"
        publishedTime="2026-02-23T09:00:00+01:00"
        modifiedTime="2026-02-23T09:00:00+01:00"
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">Tours local</span>
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
              La guerre invisible de Tours : pourquoi les clients de votre quartier vous échappent (et comment les récupérer).
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Spécial commerçants, restaurateurs et artisans de Tours et sa métropole.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                23 Février 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                4 min de lecture
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
                La concurrence locale à Tours est réelle. Mais la bataille principale ne se joue plus seulement dans la rue Nationale, aux Halles ou à la Place Plumereau.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Elle se joue sur un écran: Google Maps. Et sur cet écran, trois places captent l'essentiel des appels.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Top local",
                  value: "3 places",
                  description: "Le Local Pack concentre la majorité des clics utiles.",
                },
                {
                  title: "Restaurant",
                  value: "20 à 40",
                  description: "Couverts hebdo qui peuvent basculer vers un concurrent visible.",
                },
                {
                  title: "Artisan",
                  value: "1 appel",
                  description: "Peut représenter un chantier à plusieurs milliers d'euros.",
                },
              ]}
            />

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">1. L'erreur fatale des entreprises locales</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Les clients ne choisissent plus au hasard. Ils tapent des requêtes ultra-locales:
                "restaurant italien Tours centre", "plombier urgence Chambray-lès-Tours", "coiffeur visagiste Tours Nord".
                Si votre fiche n'apparaît pas dans les premiers résultats, vous devenez invisible.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BadgeEuro className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">2. Le coût silencieux de l'invisibilité</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li><strong className="text-[#0A0A0A]">Commerces et restaurants:</strong> touristes, étudiants et salariés du centre-ville partent vers les fiches mieux optimisées.</li>
                <li><strong className="text-[#0A0A0A]">Artisans métropole:</strong> en urgence, le client clique le premier numéro crédible avec des avis récents.</li>
                <li><strong className="text-[#0A0A0A]">Conséquence:</strong> une perte régulière de chiffre d'affaires sans alerte visible.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Radar className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">3. L'avantage du terrain: la méthode G.V.A.™</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li><strong className="text-[#0A0A0A]">[G] Google Domination:</strong> aligner votre fiche sur les requêtes exactes des habitants de Tours et de la métropole.</li>
                <li><strong className="text-[#0A0A0A]">[V] Vidéo Magnétique:</strong> montrer l'ambiance de votre lieu ou la qualité de vos interventions avant l'appel.</li>
                <li><strong className="text-[#0A0A0A]">[A] Avis Automatisés:</strong> transformer les clients satisfaits en preuve sociale rapide via NFC.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">4. Reprendre la place n°1 dans votre quartier</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed mb-6">
                Il n'y a pas de place infinie en haut de Google Maps. Le plus tôt vous structurez votre présence locale, le plus vite vous bloquez l'avance des concurrents sur votre zone.
              </p>
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6">
                <p className="text-gray-300 mb-0">
                  Votre marché local ne se gagne pas avec des promesses vagues.
                  Il se gagne avec un système clair, adapté à Tours et à vos vrais clients.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article12" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez savoir où vos clients s'échappent à Tours ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On vous montre précisément les failles de votre fiche et celles de vos concurrents quartier par quartier.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
                onClick={() => {
                  Analytics.trackCTAClick("RÉSERVER AUDIT LOCAL TOURS", "Article 12 Audit CTA");
                  window.location.href = "/#contact";
                }}
              >
                RÉSERVER L'AUDIT LOCAL
                <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-base font-semibold border-[#1c3ff9] text-[#1c3ff9] hover:bg-[#1c3ff9]/8"
                onClick={() => {
                  Analytics.trackCTAClick("DÉCOUVRIR GVA TOURS", "Article 12 Setup CTA");
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

export default Article12;
