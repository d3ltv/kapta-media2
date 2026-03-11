// Ce fichier contient les sections restantes à ajouter à App.js
// Sections : CaseStudies, Process, Team, Proof, Pricing, Testimonials, FAQ, ContactForm, Footer, MobileStickyCTA, App

// IMPORTANT : Ce code sera ajouté à App.js - NE PAS EXÉCUTER CE FICHIER DIRECTEMENT

/* 
===========================================
SECTION CASESTUDIES - CONSERVÉE DE L'ORIGINAL
===========================================
*/

const CaseStudies = () => {
  const ref = useRef(null);
  const caseStudiesProgressRef = useRef(null);
  const videoProgressRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videosExpanded, setVideosExpanded] = useState(false);

  const VIDEO_ITEMS = [
    { id: 1, videoId: "U6FaRhs9W2c", title: "Vidéo 1" },
    { id: 2, videoId: "Pw_k894Lsk0", title: "Vidéo 2" },
    { id: 3, videoId: "GnDY-5dOt3Q", title: "Vidéo 3" },
    { id: 4, videoId: "EiySSMwTCz4", title: "Vidéo 4" },
    { id: 5, videoId: "D9M0JMP_V5I", title: "Vidéo 5" },
    { id: 6, videoId: "q2CnDcUkiMM", title: "Vidéo 6" }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Garage Auto Pro",
      type: "Garage automobile",
      location: "Tours Sud",
      beforeImage: "/garage1.webp",
      afterImage: "/garage2.webp",
      results: {
        position: "Position 8+ → N°1",
        calls: "+220% d'appels",
        rating: "3.1 → 4.7 étoiles"
      }
    },
    {
      id: 2,
      title: "Salon Élégance",
      type: "Coiffeur",
      location: "Tours Nord",
      beforeImage: "/salon1.webp",
      afterImage: "/salon2.webp",
      results: {
        position: "Position 12+ → N°2",
        calls: "+180% d'appels",
        rating: "3.4 → 4.8 étoiles"
      }
    },
    {
      id: 3,
      title: "Bistro Le Gourmet",
      type: "Restaurant",
      location: "Tours Centre",
      beforeImage: "/bistro1.webp",
      afterImage: "/bistro2.webp",
      results: {
        position: "Position 15+ → N°3",
        calls: "+160% d'appels",
        rating: "3.2 → 4.6 étoiles"
      }
    },
    {
      id: 4,
      title: "Boulangerie Artisanale",
      type: "Boulangerie",
      location: "Tours Est",
      beforeImage: "/boulangerie1.webp",
      afterImage: "/boulangerie2.webp",
      results: {
        position: "Position 10+ → N°2",
        calls: "+195% d'appels",
        rating: "3.3 → 4.9 étoiles"
      }
    }
  ];

  return (
    <>
    <section 
      ref={ref}
      className="py-8 md:py-16 bg-white dark:bg-[#050505] relative overflow-hidden"
      data-testid="case-studies-section"
    >
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          number="03"
          label="Résultats"
          title="AVANT / APRÈS"
          highlight="CONCRETS"
          description="Découvrez la transformation Google Maps de nos clients sur Tours"
        />
        
        {/* Grille des cas clients avant/après */}
        <div className="overflow-hidden">
          <div 
            className="flex gap-3 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onScroll={(e) => {
              updateScrollProgress(e.currentTarget, caseStudiesProgressRef);
            }}
          >
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden min-w-[440px] md:min-w-[600px] snap-start flex-shrink-0"
              >
                <div className="grid grid-cols-2 gap-0">
                  <div className="relative">
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.beforeImage} 
                        srcSet={buildImageSrcSet(caseStudy.beforeImage)}
                        sizes="(max-width: 768px) 273px, 300px"
                        alt="Avant"
                        width="960"
                        height="1280"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain object-center bg-gray-100"
                      />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="h-52 md:h-80 relative overflow-hidden">
                      <img 
                        src={caseStudy.afterImage} 
                        srcSet={buildImageSrcSet(caseStudy.afterImage)}
                        sizes="(max-width: 768px) 273px, 300px"
                        alt="Après"
                        width="960"
                        height="1280"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain object-center bg-white scale-125"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col items-center mt-4 space-y-3">
            <div className="w-32 md:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={caseStudiesProgressRef}
                className="h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            
            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
              <span>Glissez pour voir plus</span>
              <ArrowRight className="w-3 h-3" />
            </div>
            
            <p className="text-xs text-[#A1A1AA] italic text-center max-w-md mt-2">
              * Certains clients ayant souhaité préserver leur anonymat sont représentés de manière générique
            </p>
          </div>
        </div>
        
        {/* Section Vidéos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 md:mt-12 mb-4 md:mb-6 relative"
        >
          <div 
            className="absolute inset-0 opacity-40 -z-10"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(28,63,249,0.15) 1.5px, transparent 0)`,
              backgroundSize: '32px 32px'
            }}
          />
          
          <div className="text-center mb-6 md:mb-8 pt-6 md:pt-8 px-4 relative">
            <div className="absolute inset-0 mx-auto max-w-3xl">
              <div 
                className="absolute inset-0 rounded-2xl border border-[#1c3ff9]/10 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(var(--kapta-grid-soft) 1px, transparent 1px), linear-gradient(90deg, var(--kapta-grid-soft) 1px, transparent 1px)`,
                  backgroundSize: '32px 32px'
                }}
              />
            </div>
            
            <div className="relative z-10 py-6 md:py-8">
              <div className="kapta-section-marker justify-center mb-4">
                <span className="font-mono text-[10px] sm:text-xs text-[#1c3ff9] tracking-widest">04</span>
                <span className="font-mono text-[10px] sm:text-xs text-[#A1A1AA] uppercase tracking-widest">Portfolio</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-3 md:mb-4 leading-tight">
                Nos <span className="text-[#1c3ff9]">réalisations vidéo</span>
              </h2>
              
              <p className="text-sm md:text-base text-[#52525B] max-w-2xl mx-auto">
                Découvrez les vidéos professionnelles que nous créons et intégrons sur les fiches Google
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Afficher 3 vidéos directement - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 px-4 mb-6">
          {VIDEO_ITEMS.slice(0, 3).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => {
                Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                setSelectedVideo(video.videoId);
              }}
            >
              <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#1c3ff9]/30 hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                    width="480"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#1534d4] transition-all duration-300">
                      <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Afficher 3 vidéos directement - Mobile scroll */}
        <div className="md:hidden mb-6">
          <div 
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
            onScroll={(e) => {
              updateScrollProgress(e.currentTarget, videoProgressRef);
            }}
          >
            {VIDEO_ITEMS.slice(0, 3).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="min-w-[280px] snap-start group cursor-pointer"
                onClick={() => {
                  Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                  setSelectedVideo(video.videoId);
                }}
              >
                <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img 
                      src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                      alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                      width="480"
                      height="360"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl">
                        <div className="w-0 h-0 border-l-[7px] border-l-white border-y-[5px] border-y-transparent ml-1"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                      <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col items-center mt-4 space-y-2">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                ref={videoProgressRef}
                className="h-full bg-[#1c3ff9] rounded-full transition-all duration-200 ease-out"
                style={{ width: '0%' }}
              />
            </div>
            <div className="flex items-center gap-1 text-[#A1A1AA] text-xs">
              <span>Glissez pour voir plus</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
        
        {/* Bouton pour voir les 3 autres vidéos */}
        <div className="text-center mb-8">
          <motion.button
            onClick={() => {
              setVideosExpanded(!videosExpanded);
              if (!videosExpanded) {
                Analytics.trackVideoInteraction('expand', 'Videos Section');
              } else {
                Analytics.trackVideoInteraction('collapse', 'Videos Section');
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#1c3ff9] text-[#1c3ff9] hover:bg-[#1c3ff9] hover:text-white rounded-full font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-lg group"
          >
            <Camera className="w-4 h-4" />
            <span>{videosExpanded ? 'Masquer les 3 autres vidéos' : 'Voir les 3 autres vidéos'}</span>
            <motion.div
              animate={{ rotate: videosExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
        
        {/* Conteneur des 3 vidéos supplémentaires */}
        <motion.div
          initial={false}
          animate={{
            height: videosExpanded ? 'auto' : 0,
            opacity: videosExpanded ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          {videosExpanded && <div className="pb-4 md:pb-6">
            <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 px-4">
              {VIDEO_ITEMS.slice(3, 6).map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={videosExpanded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: videosExpanded ? index * 0.08 : 0 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                    setSelectedVideo(video.videoId);
                  }}
                >
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-[#1c3ff9]/30 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img 
                        src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                        width="480"
                        height="360"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-300"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#1534d4] transition-all duration-300">
                          <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                        </div>
                      </div>
                      
                      <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="md:hidden">
              <div 
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide px-4 -mx-4"
              >
                {VIDEO_ITEMS.slice(3, 6).map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={videosExpanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: videosExpanded ? index * 0.05 : 0 }}
                    className="min-w-[280px] snap-start group cursor-pointer"
                    onClick={() => {
                      Analytics.trackVideoInteraction('open', `Video ${video.id}`);
                      setSelectedVideo(video.videoId);
                    }}
                  >
                    <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        <img 
                          src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                          alt={`Vidéo professionnelle KAPTA Media ${video.id}`}
                          width="480"
                          height="360"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#1c3ff9] rounded-full flex items-center justify-center shadow-xl">
                            <div className="w-0 h-0 border-l-[7px] border-l-white border-y-[5px] border-y-transparent ml-1"></div>
                          </div>
                        </div>
                        
                        <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                          <span className="text-xs font-bold text-[#1c3ff9]">{video.id}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>}
        </motion.div>
      </div>
    </section>

    {/* Modal Visualiseur */}
    {selectedVideo && (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c3ff9] flex items-center justify-center">
                <Camera className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0A0A0A] text-sm">KAPTA Media</h3>
                <p className="text-xs text-[#52525B]">Optimisation Google Maps</p>
              </div>
            </div>
            <button
              onClick={() => {
                Analytics.trackVideoInteraction('close', selectedVideo);
                setSelectedVideo(null);
              }}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Vidéo KAPTA"
              className="w-full h-full"
              frameBorder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          <div className="p-4 bg-gradient-to-r from-[#1c3ff9]/5 to-[#6366f1]/5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#52525B]">
                Votre commerce mérite la même transformation
              </p>
              <Button 
                className="bg-[#1c3ff9] hover:bg-[#1534d4] text-white rounded-full px-4 py-2 text-sm font-semibold"
                onClick={() => {
                  Analytics.trackCTAClick('Réserver mon audit', 'Video Modal');
                  Analytics.trackAuditRequest('Video Modal');
                  setSelectedVideo(null);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Réserver mon audit
                <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )}
    </>
  );
};

// NOTE : Les sections suivantes (Process, Team, Proof, Pricing, Testimonials, FAQ, ContactForm, Footer, MobileStickyCTA, App)
// seront ajoutées dans la prochaine étape pour ne pas dépasser la limite de tokens
