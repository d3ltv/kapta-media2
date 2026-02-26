/*
  ─────────────────────────────────────────────────────
  AboutSection.jsx — Section "Qui suis-je" Kapta Media
  ─────────────────────────────────────────────────────
  Utilisation dans KaptaMedia.jsx :

    import AboutSection from "./AboutSection";
    // Placer <AboutSection /> entre <Testimonials /> et <Offer />

  Le CSS s'injecte automatiquement. Aucune dépendance externe.
  ─────────────────────────────────────────────────────
*/

import { useEffect, useRef } from "react";

/* ── CSS ── */
const ABOUT_CSS = `
#about {
  padding: 100px 0;
  background: var(--bg);
  transition: background var(--tr);
}

.about-layout {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

@media (min-width: 860px) {
  .about-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 72px;
    align-items: start;
  }
}

/* ── PHOTO COLUMN ── */
.about-photo-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-photo-wrap {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--bg3);
  border: 1px solid var(--line);
  transition: background var(--tr), border-color var(--tr);
}

.about-photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--muted);
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.about-photo-placeholder svg {
  opacity: .3;
}

/* La ligne orange en biais dans le coin — signature visuelle */
.about-photo-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--fire), var(--fire-l));
}

/* Carte "Disponible" sous la photo */
.about-avail {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--bg2);
  border: 1px solid var(--line);
  border-radius: 8px;
  transition: background var(--tr), border-color var(--tr);
}

.about-avail-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2ECC71;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(46, 204, 113, .15);
  animation: availPulse 2.5s ease-in-out infinite;
}

@keyframes availPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(46, 204, 113, .15); }
  50%       { box-shadow: 0 0 0 6px rgba(46, 204, 113, .05); }
}

.about-avail-text {
  font-size: .78rem;
  line-height: 1.4;
  color: var(--muted);
}

.about-avail-text strong {
  display: block;
  font-weight: 700;
  font-size: .82rem;
  color: var(--bone);
  margin-bottom: 1px;
}

/* ── COPY COLUMN ── */
.about-copy {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.about-eyebrow {
  font-weight: 700;
  font-size: .68rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--fire);
  margin-bottom: 16px;
  display: block;
}

.about-name {
  font-weight: 800;
  font-size: clamp(2rem, 5.5vw, 3.6rem);
  line-height: 1.02;
  letter-spacing: -.045em;
  margin-bottom: 6px;
}

.about-title {
  font-family: var(--ff-s);
  font-style: italic;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--fire);
  margin-bottom: 32px;
  line-height: 1.4;
}

.about-intro {
  font-size: clamp(.9rem, 2vw, 1rem);
  font-weight: 300;
  color: var(--muted);
  line-height: 1.78;
  margin-bottom: 32px;
  max-width: 520px;
}

.about-intro strong {
  color: var(--bone);
  font-weight: 500;
}

/* Quote signature */
.about-quote {
  position: relative;
  padding: 24px 24px 24px 28px;
  margin-bottom: 36px;
  border-left: 2px solid var(--fire);
  background: rgba(240, 82, 26, .04);
  border-radius: 0 6px 6px 0;
}

.about-quote p {
  font-family: var(--ff-s);
  font-style: italic;
  font-size: clamp(.95rem, 2.2vw, 1.1rem);
  line-height: 1.65;
  color: var(--bone);
}

.about-quote cite {
  display: block;
  margin-top: 10px;
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  font-style: normal;
  color: var(--fire);
}

/* Expertise pills */
.about-expertise {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 36px;
}

.about-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 100px;
  font-size: .78rem;
  font-weight: 600;
  color: var(--muted);
  background: var(--bg2);
  transition: border-color .2s, color .2s, background var(--tr);
  white-space: nowrap;
}

.about-pill:hover {
  border-color: rgba(240, 82, 26, .35);
  color: var(--bone);
}

.about-pill-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--fire);
  flex-shrink: 0;
}

/* Facts strip */
.about-facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 36px;
}

.about-fact {
  background: var(--bg2);
  padding: 20px 16px;
  text-align: center;
  transition: background var(--tr);
}

.about-fact-val {
  font-weight: 800;
  font-size: clamp(1.4rem, 3.5vw, 1.9rem);
  letter-spacing: -.04em;
  color: var(--fire);
  line-height: 1;
  display: block;
  margin-bottom: 5px;
}

.about-fact-lbl {
  font-size: .7rem;
  color: var(--muted);
  line-height: 1.4;
}

/* CTA contact */
.about-cta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.about-cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--fire);
  color: #fff;
  font-weight: 800;
  font-size: .9rem;
  padding: 14px 22px;
  border-radius: 3px;
  transition: background .2s, transform .15s;
  white-space: nowrap;
}

.about-cta-primary:hover { background: var(--fire-l); }
.about-cta-primary:active { transform: scale(.97); }

.about-cta-secondary {
  font-size: .82rem;
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color .2s;
}

.about-cta-secondary:hover { color: var(--bone); }

/* Reveal (réutilise la classe globale du parent) */
.about-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .65s cubic-bezier(.22,.68,0,1.2), transform .65s cubic-bezier(.22,.68,0,1.2);
}
.about-reveal.in { opacity: 1; transform: translateY(0); }
.about-reveal.d1 { transition-delay: .1s; }
.about-reveal.d2 { transition-delay: .2s; }
.about-reveal.d3 { transition-delay: .3s; }
`;

/* ── COMPOSANT ── */
export default function AboutSection() {
  const sectionRef = useRef(null);

  /* Inject CSS */
  useEffect(() => {
    const id = "kapta-about-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = ABOUT_CSS;
      document.head.appendChild(style);
    }
  }, []);

  /* Scroll reveal local */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".about-reveal") ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pills = [
    "SEO Local Google Maps",
    "Production vidéo terrain",
    "Méthode GVA™",
    "Artisans BTP",
    "Tours & agglomération",
    "100% Done-For-You",
  ];

  const facts = [
    { val: "1", lbl: "seul expert\npar zone" },
    { val: "90", lbl: "minutes sur\nvotre chantier" },
    { val: "0", lbl: "bureau à\nParis" },
  ];

  return (
    <section id="about" ref={sectionRef}>
      <div className="km-wrap">
        <div className="about-layout">

          {/* ── COL GAUCHE — Photo ── */}
          <div className="about-photo-col about-reveal">
            <div className="about-photo-wrap">
              {/*
                Remplacez ce bloc par :
                <img src="/votre-photo.jpg" alt="[Votre prénom] — Kapta Media" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              */}
              <div className="about-photo-placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="18" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Votre photo ici
              </div>
              <div className="about-photo-accent" />
            </div>

            {/* Disponibilité */}
            <div className="about-avail">
              <div className="about-avail-dot" />
              <div className="about-avail-text">
                <strong>Disponible à Tours</strong>
                Accepte de nouveaux clients — 1 par secteur
              </div>
            </div>
          </div>

          {/* ── COL DROITE — Copy ── */}
          <div className="about-copy">
            <span className="about-eyebrow about-reveal">Derrière Kapta Media</span>

            <h2 className="about-name about-reveal">
              [Votre<br/>Prénom.]
            </h2>
            <p className="about-title about-reveal d1">
              Expert Google Maps & Production vidéo terrain · Tours
            </p>

            <p className="about-intro about-reveal d1">
              Kapta Media, ce n'est pas une agence de 15 personnes dans un open-space parisien.
              C'est <strong>une personne, à Tours, qui fait une chose — et qui la fait bien.</strong>
              <br /><br />
              J'ai construit la Méthode GVA™ après avoir observé le même schéma en boucle : des artisans excellents
              dans leur métier, invisibles sur Google Maps. Pas par manque de qualité.
              Par manque de visibilité. <strong>Ce problème-là, je sais le régler.</strong>
            </p>

            <div className="about-quote about-reveal d2">
              <p>
                "Je me déplace chez vous parce que c'est la seule façon d'obtenir
                ce qu'aucun algorithme ne peut fabriquer — la preuve que vous
                savez vraiment ce que vous faites."
              </p>
              <cite>— [Votre Prénom], fondateur Kapta Media</cite>
            </div>

            {/* Facts */}
            <div className="about-facts about-reveal d2">
              {facts.map(f => (
                <div key={f.val} className="about-fact">
                  <span className="about-fact-val">{f.val}</span>
                  <div className="about-fact-lbl" style={{ whiteSpace: "pre-line" }}>{f.lbl}</div>
                </div>
              ))}
            </div>

            {/* Pills expertise */}
            <div className="about-expertise about-reveal d3">
              {pills.map(p => (
                <span key={p} className="about-pill">
                  <span className="about-pill-dot" />
                  {p}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="about-cta-row about-reveal d3">
              <a href="#cta-final" className="about-cta-primary">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M12.8 10a1.2 1.2 0 0 1-1.2 1.2A12 12 0 0 1 1.2 1.4 1.2 1.2 0 0 1 2.4.2H4.6L5.8 3.2l-1.6.8a8.8 8.8 0 0 0 5.2 5.2l.8-1.6 3 1.2-.2.2z" fill="currentColor"/>
                </svg>
                Me parler directement
              </a>
              <a href="https://wa.me/33686018054" className="about-cta-secondary" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                WhatsApp direct
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/*
  ─────────────────────────────────────────────────────
  INTÉGRATION DANS KaptaMedia.jsx :

  1. Importer en haut du fichier :
     import AboutSection from "./AboutSection";

  2. Ajouter dans le return de KaptaMedia(), entre
     <Testimonials /> et <Offer /> :
     <AboutSection />

  3. Remplacer les placeholders :
     - "[Votre Prénom.]"  → votre vrai prénom
     - "[Votre prénom]"   → dans la citation
     - La photo : décommentez le <img> et supprimez le placeholder

  4. Optionnel — ajustez les `facts` (val/lbl) selon
     votre vraie expérience (années, clients, chantiers filmés…)
  ─────────────────────────────────────────────────────
*/
