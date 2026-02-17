import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  AlertTriangle,
  Search,
  BarChart3,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import InteractiveGlassTitle from "@/components/InteractiveGlassTitle";
import * as Analytics from "@/utils/analytics";

const Article6 = () => {
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
          item: "https://kaptamedia.fr",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: "https://kaptamedia.fr/blog",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Votre Profil Google Business est-il Prêt pour 2026 ?",
          item: "https://kaptamedia.fr/blog/article6",
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
        title="Votre Profil Google Business est-il Prêt pour 2026 ? | Kapta Media"
        description="En 2026, un profil Google Business incomplet vous rend invisible. Analyse des données Birdeye et plan d'action concret pour renforcer votre visibilité locale."
        keywords="google business profile 2026, visibilité locale, référencement local, avis google, AI overviews, optimisation fiche google"
        url="https://kaptamedia.fr/blog/article6"
        publishedTime="2026-02-14T10:00:00+01:00"
        modifiedTime="2026-02-14T10:00:00+01:00"
        category="Google Maps"
        author=""
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">Google Business 2026</span>
              </nav>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-[#1c3ff9]/10 text-xs font-semibold text-[#1c3ff9] border border-[#1c3ff9]/20">
                Google Maps
              </span>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase text-[#123A9B] border border-white/60 ring-1 ring-[#1D4ED8]/22 bg-gradient-to-r from-[#EAF2FF]/90 via-[#D8E7FF]/85 to-[#C2DAFF]/82 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_12px_28px_rgba(30,64,175,0.26),inset_0_1px_0_rgba(255,255,255,0.62)]">
                Nouveau
              </span>
            </div>

            <InteractiveGlassTitle>
              Votre Profil Google Business est-il Prêt pour 2026 ?
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Pourquoi votre visibilité locale en dépend.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                14 Février 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                8 min de lecture
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
                En 2026, votre Google Business Profile n'est plus une simple fiche annuaire.
                C'est votre première vitrine locale et, très souvent, votre première chance de convaincre.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                Une étude Birdeye sur plus de 200 000 entreprises confirme un point clé : un profil incomplet ou mal entretenu vous rend progressivement invisible.
              </p>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <AlertTriangle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">La nouvelle réalité : Google a rehaussé ses standards</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Vérification plus stricte : informations incohérentes ou obsolètes = risque de suspension.</li>
                <li>Suppression massive d'avis suspects : l'authenticité pèse davantage dans le classement local.</li>
                <li>AI Overviews : Google privilégie les profils les mieux structurés et les mieux tenus à jour.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <Search className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Parcours client : la décision se joue en quelques secondes</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                La majorité des vues provient de recherches par catégorie, pas par nom de marque.
                En clair : vos prospects ne vous connaissent pas encore. Ils comparent.
              </p>
              <p className="text-[#52525B] leading-relaxed">
                Leur décision se fait très vite sur 4 signaux : note, horaires, photos et infos de contact.
                Si un de ces éléments est faible, le client part chez un concurrent.
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <BarChart3 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Impact mesurable d'un profil optimisé</h2>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead className="bg-[#F8F9FA]">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Métrique</th>
                      <th className="text-left px-4 py-3 font-semibold text-[#0A0A0A]">Impact profil complet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Visibilité recherche locale</td>
                      <td className="px-4 py-3 text-[#0A0A0A] font-medium">+80%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Visites du site web</td>
                      <td className="px-4 py-3 text-[#0A0A0A] font-medium">x4</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Appels entrants</td>
                      <td className="px-4 py-3 text-[#0A0A0A] font-medium">+12%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-[#52525B]">Demandes d'itinéraire</td>
                      <td className="px-4 py-3 text-[#0A0A0A] font-medium">+10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <CheckCircle2 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">Plan d'action concret pour 2026</h2>
              </div>
              <ol className="space-y-3 text-[#52525B]">
                <li>Compléter tous les champs et maintenir des informations exactes (horaires inclus).</li>
                <li>Mettre en place une vraie routine d'avis clients et répondre systématiquement.</li>
                <li>Publier des photos et vidéos récentes, cohérentes avec votre réalité terrain.</li>
                <li>Utiliser Google Posts et Questions/Réponses pour rester actif.</li>
              </ol>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-5">Conclusion</h2>
              <p className="text-[#52525B] leading-relaxed">
                En 2026, Google Business Profile est un actif business prioritaire. Les entreprises qui l'exploitent sérieusement prennent une avance nette.
                Les autres deviennent progressivement invisibles.
              </p>
              <p className="text-[#52525B] leading-relaxed">
                Référence :
                {" "}
                <a
                  href="https://birdeye.com/blog/state-of-google-business-profiles/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#1c3ff9] hover:text-[#1534d4]"
                >
                  Birdeye - State of Google Business Profiles 2026
                  <ExternalLink className="w-4 h-4" />
                </a>
              </p>
            </motion.section>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Article6;
