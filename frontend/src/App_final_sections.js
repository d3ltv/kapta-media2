// Sections finales à ajouter à App.js
// Process, Team, Proof, Pricing, Testimonials, FAQ, ContactForm, Footer, MobileStickyCTA, App

/*
===========================================
SECTION PROCESS - Adapté du BTP en bleu/blanc
===========================================
*/

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      when:"Gratuit · Avant tout",
      title:"Audit de votre position",
      p:"On analyse votre fiche Maps, vos concurrents et les mots-clés de votre secteur à Tours. On vous dit exactement combien d'appels vous perdez — sans engagement."
    },
    {
      when:"Jours 1 à 5 · 90 min sur site",
      title:"Tournage chez vous",
      p:"On vient à votre atelier, sur un chantier ou dans votre camion. 90 minutes. On s'adapte à votre emploi du temps. On repart avec 6 mois de contenu."
    },
    {
      when:"Jours 5 à 14 · On gère tout",
      title:"Déploiement complet",
      p:"Fiche Maps reconfigurée, vidéos publiées, Missed Call actif, système d'avis en place. Votre téléphone commence à sonner différemment."
    },
  ];

  return (
    <section 
      ref={ref}
      id="process"
      className="py-12 md:py-20 bg-white dark:bg-[#050505] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 md:gap-20">
          {/* Intro sticky */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24"
          >
            <div className="kapta-section-marker mb-4">
              <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">05</span>
              <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Le process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              3 étapes. <span className="text-[#1c3ff9]">Vous bossez.</span> On installe.
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Pas de formation. Pas de logiciel à comprendre. Vous continuez à faire votre métier. On fait le nôtre.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative pl-12">
            {/* Ligne verticale */}
            <div className="absolute left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#1c3ff9] to-[#1c3ff9]/10" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative"
                >
                  {/* Numéro */}
                  <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-[#1c3ff9] text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#1c3ff9]/20 hover:shadow-lg transition-all">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9] block mb-2">
                      {step.when}
                    </span>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.p}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/*
===========================================
SECTION TEAM - Adapté du BTP en bleu/blanc
===========================================
*/

const Team = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="team"
      className="py-12 md:py-20 bg-gradient-to-br from-[#F8F9FA] via-white to-[#F8F9FA] dark:from-[#0B0F17] dark:via-[#050505] dark:to-[#0B0F17] relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(28,63,249,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(28,63,249,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="kapta-section-marker justify-center mb-4">
            <span className="font-mono text-xs text-[#1c3ff9] tracking-widest">06</span>
            <span className="font-mono text-xs text-[#A1A1AA] uppercase tracking-widest">Qui sommes-nous</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_380px] gap-6">
          {/* Carte fondateur */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-lg"
          >
            {/* Monogramme */}
            <div className="aspect-[4/3] bg-gradient-to-br from-[#1c3ff9]/5 to-[#6366f1]/5 relative flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `linear-gradient(rgba(28,63,249,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(28,63,249,0.03) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }}
              />
              <div className="text-[clamp(6rem,18vw,9rem)] font-bold text-[#1c3ff9]/10 relative z-10">
                KB
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-gray-100 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">Karim Benali</div>
                    <div className="text-sm text-gray-600">Fondateur · Kapta Media</div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9]">
                    Tours
                  </div>
                </div>
              </div>
            </div>

            {/* Corps */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold">8 ans avec des artisans. Un problème récurrent.</h3>
              <p className="text-gray-600 leading-relaxed">
                Des pros sérieux, qui travaillent bien, et qui perdent des chantiers parce qu'on ne les trouve pas en ligne. <strong className="text-gray-900">Pas parce qu'ils sont mauvais. Parce qu'ils sont invisibles.</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {["Google Maps","Vidéo terrain","SMS auto","Tours & agglo"].map(p=>(
                  <span key={p} className="text-xs font-bold bg-[#1c3ff9]/10 text-[#1c3ff9] px-3 py-1 rounded-full border border-[#1c3ff9]/20">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100 mx-6" />

            <div className="p-6">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Le réseau</div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Je travaille avec <strong className="text-gray-900">4 freelances sélectionnés</strong> — vidéo, montage, dev. Tous basés en Indre-et-Loire. Jamais sous-traité à l'étranger.
              </p>
              <div className="flex items-center gap-2">
                {["V","M","T","A"].map((l,i)=>(
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1c3ff9]/10 to-[#6366f1]/10 border border-[#1c3ff9]/20 flex items-center justify-center font-bold text-[#1c3ff9]">
                    {l}
                  </div>
                ))}
                <span className="text-sm text-gray-600 font-semibold ml-2">4 spécialistes locaux</span>
              </div>
            </div>
          </motion.div>

          {/* Phrase clé */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl border border-gray-100 p-8 shadow-lg flex flex-col justify-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-0.5 bg-[#1c3ff9]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1c3ff9]">La promesse</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 leading-tight">
              Une seule personne responsable de votre résultat.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pas de chef de projet qui passe le dossier à un stagiaire. Pas de ticket de support.
            </p>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-gray-900">Quand quelque chose ne va pas, c'est moi qui décroche.</strong>
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Kapta Media n'accepte qu'un seul client par métier et par secteur. Pas pour créer de la rareté artificielle — parce que je ne peux pas faire ce travail correctement autrement.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// NOTE : Les sections Proof, Pricing, Testimonials, FAQ, ContactForm, Footer, MobileStickyCTA et App
// seront dans le prochain fichier pour ne pas dépasser la limite
