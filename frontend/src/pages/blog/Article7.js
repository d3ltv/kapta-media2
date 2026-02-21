import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Radar,
  Star,
  Camera,
  Phone,
  MessageCircle,
  Globe,
  ShieldCheck,
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

const Article7 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article7"));

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
          name: "7 Signaux Google qui Boostent Votre Fiche Locale en 2026",
          item: "https://www.kaptamedia.fr/blog/article7",
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
        title="7 Signaux Google qui Boostent Votre Fiche Locale en 2026 | Kapta Media"
        description="Les 7 signaux les plus impactants pour améliorer votre classement local Google en 2026, avec un plan d'action concret sur 14 jours."
        keywords="google maps 2026, signaux classement local, fiche google business, seo local, visibilité locale, optimisation fiche google"
        url="https://www.kaptamedia.fr/blog/article7"
        publishedTime="2026-02-18T10:00:00+01:00"
        modifiedTime="2026-02-18T10:00:00+01:00"
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">7 Signaux Google</span>
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
              7 Signaux Google qui Boostent Votre Fiche Locale en 2026
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Le guide opérationnel pour remonter dans le Local Pack sans brûler votre budget.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                18 Février 2026
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
                Les contenus qui performent le mieux répondent à une vraie question business :
                <strong className="text-[#0A0A0A]"> comment gagner plus de visibilité locale rapidement</strong>.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Ici, on va un cran plus loin avec les 7 signaux que Google valorise le plus en 2026, classés par impact réel.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Signal prioritaire",
                  value: "NAP",
                  description: "Des infos cohérentes partout restent la base avant tout autre levier.",
                },
                {
                  title: "Cadence idéale",
                  value: "2-3 sem.",
                  description: "Un post utile toutes les 2 à 3 semaines maintient une fiche active.",
                },
                {
                  title: "Levier rapide",
                  value: "Avis frais",
                  description: "La récence des avis améliore la confiance client et le classement local.",
                },
              ]}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="rounded-xl border border-gray-200 bg-[#F8F9FA] p-5">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">À retenir</h3>
                <ul className="space-y-2 text-[#52525B]">
                  <li>Commencez par les avis récents et la cohérence des informations.</li>
                  <li>Les premiers effets se voient souvent entre 2 et 6 semaines selon votre marché local.</li>
                  <li>Publiez des posts utiles même sans promotion : conseil, nouveauté ou preuve terrain.</li>
                </ul>
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Radar className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 1 : Cohérence des informations (NAP)</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Nom, adresse, téléphone : ce trio doit être strictement identique partout (fiche Google, site, annuaires, réseaux).
                Les incohérences freinent la confiance de l'algorithme.
              </p>
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-gray-200">
                <p className="text-sm text-[#52525B] mb-0"><strong className="text-[#0A0A0A]">Action rapide :</strong> fais un audit NAP trimestriel et corrige en priorité les annuaires les plus visibles.</p>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Star className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 2 : Avis récents + réponses systématiques</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Le volume d'avis reste important.</li>
                <li>La fraîcheur des avis compte de plus en plus.</li>
                <li>La qualité des réponses du propriétaire est un signal de fiabilité.</li>
              </ul>
              <p className="text-[#52525B] leading-relaxed">
                Une fiche avec 200 avis anciens peut être dépassée par une fiche avec 80 avis mais une cadence régulière.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Camera className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 3 : Fraîcheur visuelle (photos et vidéos)</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Google veut montrer des établissements actifs et crédibles. Les visuels datés donnent l'effet inverse.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Minimum recommandé</h4>
                  <p className="text-sm text-[#52525B]">4 à 8 nouvelles photos par mois.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h4 className="font-semibold text-[#0A0A0A] mb-2">Bonus</h4>
                  <p className="text-sm text-[#52525B]">1 vidéo courte terrain toutes les 4 à 6 semaines.</p>
                </div>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Phone className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 4 : Interactions utiles (appels, itinéraires, clics)</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Plus les utilisateurs interagissent avec votre fiche, plus Google comprend qu'elle répond à l'intention locale.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Interaction</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Levier direct</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Appels</td>
                      <td className="px-4 py-3 text-[#0A0A0A]">CTA clair + horaires fiables</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Itinéraires</td>
                      <td className="px-4 py-3 text-[#0A0A0A]">Adresse propre + zone desservie précise</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Clic site</td>
                      <td className="px-4 py-3 text-[#0A0A0A]">Landing locale alignée à la requête</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <MessageCircle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 5 : Activité continue (Posts + Q/R)</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Une fiche figée ressemble à une fiche abandonnée. Google Posts et Questions/Réponses montrent que l'établissement vit.
              </p>
              <ul className="space-y-3 text-[#52525B]">
                <li>Publie un post utile toutes les 2 à 3 semaines.</li>
                <li>Pré-remplis les questions fréquentes et y réponds proprement.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Globe className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 6 : Alignement fiche Google ↔ site web</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Si votre fiche promet une chose et que la page d'atterrissage dit l'inverse, vous perdez l'utilisateur et le signal qualité.
                Le trio gagnant : même promesse, même zone locale, même offre.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Signal 7 : Hygiène anti-spam et fiabilité</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                En 2026, Google est plus strict. Les pratiques douteuses (avis artificiels, bourrage de mots-clés, changements incohérents)
                coûtent cher en visibilité.
              </p>
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-3">Plan 14 jours</h3>
                <ol className="space-y-2 text-gray-300">
                  <li>J1-J2 : audit NAP + catégories + horaires.</li>
                  <li>J3-J7 : relance avis clients satisfaits + réponses aux avis existants.</li>
                  <li>J8-J11 : mise à jour photos + publication d'un post local utile.</li>
                  <li>J12-J14 : alignement fiche/site et vérification des interactions.</li>
                </ol>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Conclusion</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Le classement local n'est pas magique. Il est la conséquence d'une fiche utile, fiable et active.
                Si vous traitez ces 7 signaux comme une routine mensuelle, vous prenez de l'avance de façon durable.
              </p>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article7" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez un plan d'action sur votre fiche ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On audite vos signaux actuels et on vous donne les priorités exactes pour les 30 prochains jours.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick("RÉSERVER MON AUDIT GRATUIT", "Article 7 CTA");
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

export default Article7;
