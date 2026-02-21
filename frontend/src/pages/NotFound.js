import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center px-4">
      <SEOHead
        title="Page introuvable | Kapta Media"
        description="Cette page n'existe pas ou a été déplacée."
        url="https://www.kaptamedia.fr/404"
        robots="noindex,follow"
        googlebot="noindex,follow"
      />
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold tracking-[0.12em] uppercase text-[#1c3ff9] mb-3">Erreur 404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-4">
          Page introuvable
        </h1>
        <p className="text-[#52525B] dark:text-[#C2C8D8] mb-8">
          L'URL demandée est invalide ou n'est plus disponible.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center rounded-full px-6 py-3 bg-[#1c3ff9] text-white font-semibold hover:bg-[#1632c7] transition-colors"
        >
          Retour au blog
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
