import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Camera,
  Star,
  MessageCircle,
  SearchCheck,
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

const Article10 = () => {
  const showNewBadge = isArticleNew(getArticleBySlug("article10"));

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
          name: "GEO 2026",
          item: "https://www.kaptamedia.fr/blog/article10",
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
        title="GEO 2026 : Optimiser sa Fiche Google pour l'IA | Kapta Media"
        description="Comment optimiser votre fiche Google Business Profile pour être recommandée par Google SGE, Gemini, ChatGPT et Perplexity avec une stratégie GEO claire."
        keywords="GEO 2026, generative engine optimization, fiche google IA, google sge, gemini, chatgpt local seo, optimisation google business profile"
        url="https://www.kaptamedia.fr/blog/article10"
        publishedTime="2026-02-21T17:00:00+01:00"
        modifiedTime="2026-02-21T17:00:00+01:00"
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
                <span className="text-[#52525B] dark:text-[#C2C8D8]">GEO 2026</span>
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
              2026 : Optimiser sa Fiche Google pour Dominer les Recherches IA (GEO)
            </InteractiveGlassTitle>

            <p className="text-lg text-[#52525B] dark:text-[#C2C8D8] leading-relaxed mb-8">
              Du SEO local classique au GEO : comment devenir la recommandation prioritaire des moteurs génératifs.
            </p>

            <div className="flex items-center gap-4 text-sm text-[#71717A] dark:text-[#98A2B6] mb-10 pb-6 border-b border-gray-200 dark:border-[#2A2E39]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                21 Février 2026
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <p className="text-lg text-[#52525B] leading-relaxed">
                Les recherches locales ne se limitent plus à une liste de liens bleus.
                Les assistants IA synthétisent, comparent et recommandent directement.
              </p>
              <p className="text-lg text-[#52525B] leading-relaxed">
                L'objectif 2026 : faire en sorte que votre entreprise soit citée comme la meilleure option locale.
              </p>
            </motion.div>

            <BlogEngagementBlocks
              highlights={[
                {
                  title: "Nouveau terrain",
                  value: "GEO",
                  description: "Optimiser pour les moteurs génératifs, pas seulement pour les SERP classiques.",
                },
                {
                  title: "Signal fort",
                  value: "Visuels",
                  description: "Photos et vidéos servent de preuve concrète pour les recommandations IA.",
                },
                {
                  title: "Portée IA",
                  value: "Multi-plateformes",
                  description: "Google seul ne suffit plus : il faut exister aussi sur les annuaires tiers.",
                },
              ]}
            />

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="rounded-xl border border-gray-200 bg-[#F8F9FA] p-5">
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-3">Repères opérationnels</h3>
                <ul className="space-y-2 text-[#52525B]">
                  <li>Publiez des visuels récents qui prouvent vos services, vos produits et votre environnement.</li>
                  <li>Collectez des avis sur Google et hors Google (Yelp, Facebook, Apple Maps, Trustpilot).</li>
                  <li>Structurez vos contenus pour l'IA : réponses claires, listes, schéma LocalBusiness.</li>
                </ul>
              </div>
            </motion.div>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">1. Nourrissez l'IA avec des preuves visuelles</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Montrez ce que vous promettez : produits, équipe, espace, avant/après.</li>
                <li>Ajoutez régulièrement des photos et vidéos pour signaler une entreprise active.</li>
                <li>Considérez chaque visuel comme une preuve que l'IA peut exploiter.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">2. Diversifiez vos avis et citations</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Les IA tierces n'ont pas toujours un accès complet aux données Google Business Profile.
                Pour exister dans ChatGPT ou Perplexity, vous devez aussi travailler les plateformes ouvertes et les listes locales "best of".
              </p>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">3. Pratiquez l'opinion sculpting</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Encouragez des avis détaillés (service reçu, contexte, zone géographique).</li>
                <li>Demandez un retour précis, pas juste "laissez un avis".</li>
                <li>Plus le texte est utile, plus l'IA peut vous résumer en votre faveur.</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <SearchCheck className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">4. Rédigez en mode conversationnel</h2>
              </div>
              <ul className="space-y-3 text-[#52525B]">
                <li>Traitez les questions longues comme les utilisateurs les formulent à l'oral.</li>
                <li>Donnez la réponse principale dans les 100 premiers mots.</li>
                <li>Utilisez une structure scannable (titres clairs, bullets, blocs courts).</li>
              </ul>
            </motion.section>

            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-[#1c3ff9]" />
                <h2 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] m-0">5. Parlez le langage natif de l'IA</h2>
              </div>
              <p className="text-[#52525B] leading-relaxed">
                Ajoutez du schéma markup (LocalBusiness, FAQPage, Review) pour relier clairement votre entité locale,
                vos services et vos preuves sociales. Cela facilite l'extraction fiable par les IA.
              </p>
              <div className="bg-[#0A0A0A] text-white rounded-2xl p-6 mt-6">
                <p className="text-gray-300 mb-0">
                  En clair : soyez l'entreprise la plus documentée, la plus visible et la plus explicite localement.
                  C'est ce que les IA recommandent en premier.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </article>

      <BlogCompleteGuide articleSlug="article10" />

      <section className="py-16 md:py-20 bg-[#F8F9FA] dark:bg-[#070A11]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
              Vous voulez un plan GEO prêt à déployer ?
            </h2>
            <p className="text-base md:text-lg text-[#52525B] dark:text-[#C2C8D8] mb-8 max-w-2xl mx-auto">
              On construit votre feuille de route IA locale: fiche Google, avis, contenus et structure technique.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-br from-[#0052FF] via-[#1c3ff9] to-[#3B82F6] hover:from-[#0041CC] hover:via-[#1534d4] hover:to-[#2563EB] text-white rounded-full px-8 py-6 text-base font-semibold shadow-[0_10px_40px_rgba(28,63,249,0.6)] hover:shadow-[0_15px_50px_rgba(28,63,249,0.8)] hover:scale-105 btn-shimmer group transition-all duration-300 border-2 border-white/20"
              onClick={() => {
                Analytics.trackCTAClick("RÉSERVER MON AUDIT GRATUIT", "Article 10 CTA");
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

export default Article10;
