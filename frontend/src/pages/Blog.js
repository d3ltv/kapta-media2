import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, MapPin, Camera, MessageCircle, Target } from "lucide-react";
import SharedNavbar from "@/components/SharedNavbar";
import SEOHead from "@/components/SEOHead";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import * as Analytics from "@/utils/analytics";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    Analytics.initAnalytics();
    window.scrollTo(0, 0);
  }, []);

  const categories = ["Tous", "Google Maps", "Marketing Local", "Vidéo", "Conseils"];

  const articles = [...BLOG_ARTICLES].sort((a, b) => b.id - a.id);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Track search when user types
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const timer = setTimeout(() => {
        Analytics.trackSearch(searchQuery, filteredArticles.length);
      }, 1000); // Debounce 1 seconde
      
      return () => clearTimeout(timer);
    }
  }, [searchQuery, filteredArticles.length]);

  const handleCategoryScroll = (e) => {
    const element = e.target;
    const scrollPercentage = (element.scrollLeft / (element.scrollWidth - element.clientWidth)) * 100;
    setScrollProgress(scrollPercentage);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Google Maps": <MapPin className="w-4 h-4" />,
      "Marketing Local": <TrendingUp className="w-4 h-4" />,
      "Vidéo": <Camera className="w-4 h-4" />,
      "Conseils": <MessageCircle className="w-4 h-4" />,
      "Tous": <Target className="w-4 h-4" />
    };
    return icons[category] || null;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      <SEOHead
        title="Blog Marketing Local & SEO | Kapta Media"
        description="Découvrez nos conseils d'experts en marketing local, SEO et optimisation Google Business Profile. Articles pratiques pour booster votre visibilité locale."
        keywords="blog marketing local, SEO local, google business profile, conseils marketing, optimisation google maps, avis clients, référencement local"
        url="https://kaptamedia.fr/blog"
      />
      <SharedNavbar />

      <main id="main-content">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-br from-[#1c3ff9]/5 via-white to-[#6366f1]/5 dark:from-[#0B0D12] dark:via-[#050505] dark:to-[#0B0D12]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(147,197,253,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c3ff9]/10 border border-[#1c3ff9]/20 mb-6">
              <span className="text-sm font-semibold text-[#1c3ff9]">📝 Blog</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-6 leading-tight">
              Conseils & Actualités
              <br />
              <span className="text-[#1c3ff9]">Marketing Local</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#52525B] dark:text-[#C2C8D8] max-w-3xl mx-auto mb-12">
              Découvrez nos articles d'experts pour optimiser votre visibilité locale et dominer Google Maps
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-[#2A2E39] bg-white dark:bg-[#10131A] focus:border-[#1c3ff9] focus:outline-none transition-colors text-[#0A0A0A] dark:text-[#F3F6FF] placeholder:text-[#A1A1AA]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/80 dark:bg-[#050505]/85 backdrop-blur-sm border-b border-gray-100 dark:border-[#1E2430] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div
              className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
              onScroll={handleCategoryScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 snap-start ${
                    selectedCategory === category
                      ? "bg-[#1c3ff9] text-white shadow-lg scale-105"
                      : "bg-gray-100 dark:bg-[#171B24] text-[#52525B] dark:text-[#C2C8D8] hover:bg-gray-200 dark:hover:bg-[#1E2430]"
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span className="text-sm font-medium">{category}</span>
                </button>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="h-1 bg-gray-100 rounded-full mt-2 overflow-hidden md:hidden">
              <div
                className="h-full bg-[#1c3ff9] transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-[#52525B]">Aucun article trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <Link
                    to={article.link}
                    className="group relative flex flex-col bg-white dark:bg-[#10131A] rounded-2xl border border-gray-200 dark:border-[#2A2E39] hover:border-[#1c3ff9] hover:shadow-xl transition-all duration-300 overflow-hidden h-full"
                    onClick={() => Analytics.trackCTAClick(article.title, 'Blog Article Click')}
                  >
                  {article.isNew && (
                    <span className="absolute right-4 top-4 z-20 inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-[0.08em] uppercase text-[#10389C] dark:text-[#DCEBFF] border border-white/60 dark:border-[#60A5FA]/45 ring-1 ring-[#1D4ED8]/22 dark:ring-[#3B82F6]/35 bg-gradient-to-r from-[#EAF2FF]/95 via-[#DCE9FF]/90 to-[#C7DCFF]/90 dark:from-[#0F254B]/95 dark:via-[#12336A]/92 dark:to-[#184386]/90 backdrop-blur-xl shadow-[0_10px_24px_rgba(30,64,175,0.24)]">
                      Nouveau
                    </span>
                  )}
                  {/* Image/Emoji Header */}
                  <div className="relative h-48 bg-gradient-to-br from-[#1c3ff9]/10 via-[#6366f1]/10 to-[#3B82F6]/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.04)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <span className="relative text-6xl group-hover:scale-110 transition-transform duration-300">
                      {article.emoji}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedCategory === article.category
                          ? "bg-[#1c3ff9] text-white"
                          : "bg-[#1c3ff9]/10 text-[#1c3ff9]"
                      }`}>
                        {article.category}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-[#0A0A0A] dark:text-[#F3F6FF] mb-3 group-hover:text-[#1c3ff9] transition-colors line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="text-[#52525B] dark:text-[#C2C8D8] mb-4 line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[#52525B] dark:text-[#98A2B6] pt-4 border-t border-gray-100 dark:border-[#2A2E39]">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              </div>
              ))}
            </div>
          )}
        </div>
      </section>
      </main>

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

export default Blog;
