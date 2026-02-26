import { useState, useEffect, useRef } from "react";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Instrument+Serif:ital@0;1&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .km { 
    --bg: #0C0C09; --bg2: #131310; --bg3: #1C1C17;
    --bone: #F2EDE0; --muted: #6A6660; --line: rgba(242,237,224,.08);
    --fire: #F0521A; --fire-l: #FF6B30;
    --ff: 'Bricolage Grotesque', sans-serif;
    --ffs: 'Instrument Serif', serif;
    font-family: var(--ff);
    background: var(--bg);
    color: var(--bone);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }
  .km.light {
    --bg: #F3EDE1; --bg2: #EAE3D5; --bg3: #DDD6C6;
    --bone: #18160F; --muted: #7A7062; --line: rgba(24,22,15,.08);
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 15px 22px;
    display: flex; align-items: center; justify-content: space-between;
    background: var(--bg); border-bottom: 1px solid var(--line);
    transition: background .3s;
  }
  .logo {
    display: flex; align-items: center; gap: 9px;
    font-weight: 800; font-size: .92rem; letter-spacing: -.02em;
  }
  .logo-icon {
    width: 28px; height: 28px;
    display: flex; align-items: center; justify-content: center;
  }
  .logo-icon svg { color: var(--fire); }
  .logo em { font-family: var(--ffs); font-style: italic; font-weight: 400; color: var(--muted); }
  .nav-r { display: flex; align-items: center; gap: 10px; }
  .theme-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: var(--bg2); border: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    color: var(--muted); cursor: pointer; transition: color .2s, background .2s;
  }
  .theme-btn:hover { color: var(--bone); background: var(--bg3); }
  .nav-cta {
    background: var(--fire); color: #fff;
    font-weight: 800; font-size: .75rem; letter-spacing: .06em; text-transform: uppercase;
    padding: 10px 18px; border-radius: 3px;
    cursor: pointer; transition: background .2s;
    text-decoration: none;
  }
  .nav-cta:hover { background: var(--fire-l); }

  /* HERO */
  .hero {
    min-height: 100svh;
    display: grid;
    grid-template-rows: 1fr auto;
    padding-top: 68px;
    position: relative;
    overflow: hidden;
  }

  /* BG number — watermark */
  .hero-watermark {
    position: absolute;
    right: -2%;
    top: 54%;
    transform: translateY(-50%);
    font-weight: 800;
    font-size: clamp(200px, 40vw, 480px);
    line-height: .8;
    letter-spacing: -.06em;
    color: rgba(240,82,26,.04);
    pointer-events: none;
    user-select: none;
    transition: color .3s;
  }
  .light .hero-watermark { color: rgba(240,82,26,.06); }

  /* MAIN AREA */
  .hero-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 22px 36px;
    position: relative;
    z-index: 2;
  }

  /* Eyebrow pill */
  .hero-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(240,82,26,.1);
    border: 1px solid rgba(240,82,26,.2);
    border-radius: 100px;
    padding: 6px 14px 6px 8px;
    margin-bottom: 22px;
    width: fit-content;
  }
  .hero-pill-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--fire);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
  .hero-pill span {
    font-size: .7rem; font-weight: 700; letter-spacing: .12em;
    text-transform: uppercase; color: var(--fire);
  }

  /* HEADLINE — the money shot */
  .hero-h1 {
    font-weight: 800;
    line-height: .92;
    letter-spacing: -.055em;
    margin-bottom: 28px;
  }
  .h1-ghost {
    display: block;
    font-size: clamp(1.6rem, 8vw, 3.5rem);
    font-weight: 200;
    letter-spacing: -.02em;
    color: var(--muted);
    margin-bottom: 6px;
  }
  .h1-main {
    display: block;
    font-size: clamp(3.8rem, 17vw, 8rem);
    color: var(--bone);
    line-height: .9;
  }
  .h1-accent {
    display: block;
    font-size: clamp(3.8rem, 17vw, 8rem);
    color: var(--fire);
    line-height: .9;
    position: relative;
  }
  /* Underline trait orange sous "chantier." */
  .h1-accent::after {
    content: '';
    position: absolute;
    bottom: -6px; left: 0;
    width: 52px; height: 4px;
    background: var(--fire);
    border-radius: 2px;
  }

  /* Body copy */
  .hero-body {
    font-size: clamp(.9rem, 3.5vw, 1rem);
    font-weight: 300;
    color: var(--muted);
    line-height: 1.72;
    max-width: 380px;
    margin-bottom: 32px;
  }
  .hero-body strong { color: var(--bone); font-weight: 500; }

  /* CTA BLOCK */
  .hero-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 9px;
    background: var(--fire); color: #fff;
    font-weight: 800; font-size: .92rem;
    padding: 15px 22px;
    border-radius: 3px;
    cursor: pointer; text-decoration: none;
    transition: background .2s, box-shadow .2s;
    white-space: nowrap;
  }
  .btn-primary:hover {
    background: var(--fire-l);
    box-shadow: 0 8px 28px rgba(240,82,26,.3);
  }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid var(--line);
    color: var(--muted); font-weight: 600; font-size: .85rem;
    padding: 13px 18px; border-radius: 3px;
    cursor: pointer; text-decoration: none;
    transition: border-color .2s, color .2s;
    white-space: nowrap;
  }
  .btn-ghost:hover { border-color: rgba(242,237,224,.25); color: var(--bone); }

  /* SOCIAL PROOF */
  .hero-proof {
    display: flex; align-items: center; gap: 12px;
    padding-top: 24px;
    border-top: 1px solid var(--line);
  }
  .proof-avatars { display: flex; }
  .avatar {
    width: 32px; height: 32px; border-radius: 50%;
    border: 2px solid var(--bg);
    background: var(--bg3);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: .62rem; color: var(--fire);
    margin-left: -8px; font-style: normal;
    transition: background .3s, border-color .3s;
  }
  .avatar:first-child { margin-left: 0; }
  .proof-copy { font-size: .75rem; color: var(--muted); line-height: 1.45; }
  .proof-copy strong { display: block; color: var(--bone); font-weight: 700; font-size: .8rem; }

  /* PHOTO STRIP — bottom */
  .hero-strip {
    display: flex;
    gap: 0;
    height: 140px;
    overflow: hidden;
    position: relative;
    z-index: 2;
    border-top: 1px solid var(--line);
  }

  .strip-photo {
    flex: 1;
    background: var(--bg3);
    overflow: hidden;
    position: relative;
    transition: flex .4s cubic-bezier(.4,0,.2,1);
    border-right: 1px solid var(--line);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .strip-photo:last-child { border-right: none; }
  .strip-photo:hover { flex: 2.2; }
  .strip-photo img { width: 100%; height: 100%; object-fit: cover; }
  
  /* Placeholder pour les images */
  .strip-ph {
    width: 100%; height: 100%;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px;
    color: var(--muted); font-size: .6rem; letter-spacing: .08em;
    text-transform: uppercase; font-weight: 600;
    opacity: .5;
  }
  
  /* Overlay sur la photo au hover */
  .strip-photo::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(12,12,9,.5) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .3s;
  }
  .strip-photo:hover::after { opacity: 1; }

  /* Stat badge sur la 1ère photo */
  .strip-badge {
    position: absolute; top: 10px; left: 10px;
    background: var(--fire);
    color: #fff;
    border-radius: 5px;
    padding: 7px 10px;
    z-index: 2;
    line-height: 1;
  }
  .strip-badge-val { font-weight: 800; font-size: 1.1rem; letter-spacing: -.03em; display: block; }
  .strip-badge-lbl { font-size: .55rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; opacity: .82; }

  /* Notification flottante */
  .notif {
    position: absolute;
    top: 80px; right: 16px;
    background: var(--bg2);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 10px 14px;
    display: flex; align-items: center; gap: 10px;
    width: 200px;
    box-shadow: 0 16px 40px rgba(0,0,0,.35);
    z-index: 10;
    animation: notifIn 5s ease-in-out 1.2s infinite;
    transition: background .3s, border-color .3s;
  }
  @keyframes notifIn {
    0%   { opacity:0; transform:translateY(-8px); }
    12%  { opacity:1; transform:translateY(0); }
    78%  { opacity:1; transform:translateY(0); }
    100% { opacity:0; transform:translateY(-8px); }
  }
  .notif-icon {
    width: 32px; height: 32px; border-radius: 50%;
    background: rgba(240,82,26,.12);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .notif-txt { font-size: .68rem; line-height: 1.35; }
  .notif-txt strong { display: block; font-weight: 700; color: var(--bone); font-size: .73rem; }
  .notif-txt span { color: var(--muted); }

  /* TICKER */
  .ticker {
    overflow: hidden;
    border-top: 1px solid var(--line);
    background: var(--bg2);
    padding: 11px 0;
    transition: background .3s, border-color .3s;
  }
  .ticker-inner {
    display: flex; white-space: nowrap;
    animation: scrollLeft 28s linear infinite;
  }
  .ticker-inner:hover { animation-play-state: paused; }
  @keyframes scrollLeft { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
  .tick-item {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 0 24px; font-size: .78rem; font-weight: 600;
    color: var(--muted); letter-spacing: .01em;
  }
  .tick-item b { color: var(--fire); font-weight: 800; }

  /* WA float */
  .wa {
    position: fixed; bottom: 20px; right: 16px; z-index: 200;
  }
  .wa-btn {
    width: 52px; height: 52px; border-radius: 50%;
    background: #25D366;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(37,211,102,.4);
    cursor: pointer; transition: transform .2s;
  }
  .wa-btn:hover { transform: scale(1.08); }
`;

const PHOTOS = [
  { label: "Chantier 1", color: "#1E1E18" },
  { label: "Plombier", color: "#1A1915" },
  { label: "Électricité", color: "#1C1C16" },
  { label: "Tournage", color: "#191912" },
  { label: "Cuisine", color: "#1B1B14" },
];

export default function HeroPreview() {
  const [theme, setTheme] = useState("dark");

  return (
    <>
      <style>{css}</style>

      <div className={`km ${theme}`}>

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="logo">
            <div className="logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.5 7.5H22l-6.5 4.7 2.5 7.5L12 17.2 5.5 21.7l2.5-7.5L1.5 9.5H9.5z" fill="currentColor"/>
              </svg>
            </div>
            KAPTA <em>&nbsp;média</em>
          </div>
          <div className="nav-r">
            <button className="theme-btn" onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}>
              {theme === "dark"
                ? <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M15.5 12.4A7 7 0 0 1 5.6 2.5a7 7 0 1 0 9.9 9.9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
                : <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              }
            </button>
            <a href="#" className="nav-cta">Audit gratuit</a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero">

          {/* Watermark */}
          <div className="hero-watermark" aria-hidden="true">1er</div>

          {/* Notif flottante */}
          <div className="notif" aria-hidden="true">
            <div className="notif-icon">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d="M16.5 12.3a1.5 1.5 0 0 1-1.5 1.5A14 14 0 0 1 1.2 3a1.5 1.5 0 0 1 1.5-1.5H5.3L6.6 4.9l-2 1a11 11 0 0 0 6.5 6.5l1-2 3 1.3-.1.6z" fill="#F0521A"/>
              </svg>
            </div>
            <div className="notif-txt">
              <strong>Appel manqué</strong>
              <span>Client — cherchait un plombier</span>
            </div>
          </div>

          {/* Main copy */}
          <div className="hero-main">

            {/* Pill */}
            <div className="hero-pill">
              <div className="hero-pill-dot"/>
              <span>Tours · SEO Local · Vidéo terrain</span>
            </div>

            {/* Headline */}
            <h1 className="hero-h1">
              <span className="h1-ghost">Quelqu'un vient de décrocher</span>
              <span className="h1-main">votre</span>
              <span className="h1-accent">chantier.</span>
            </h1>

            {/* Body */}
            <p className="hero-body">
              C'est votre concurrent. Il était premier sur Google Maps.<br/>
              <strong>Vous n'étiez pas dans les résultats.</strong><br/>
              Kapta Media règle ça — en venant filmer chez vous.
            </p>

            {/* CTAs */}
            <div className="hero-actions">
              <a href="#" className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Voir si ma zone est libre
              </a>
              <a href="tel:+33686018054" className="btn-ghost">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M12.8 10a1.2 1.2 0 0 1-1.2 1.2A12 12 0 0 1 1.2 1.4 1.2 1.2 0 0 1 2.4.2H4.6L5.8 3.2l-1.6.8a8.8 8.8 0 0 0 5.2 5.2l.8-1.6 3 1.2-.2.2z" fill="currentColor"/></svg>
                J'appelle
              </a>
            </div>

            {/* Proof */}
            <div className="hero-proof">
              <div className="proof-avatars">
                {["MB","TL","AD","+"].map(l => <em key={l} className="avatar">{l}</em>)}
              </div>
              <div className="proof-copy">
                <strong>Artisans accompagnés à Tours</strong>
                Plombiers · Électriciens · Installateurs PAC
              </div>
            </div>
          </div>

          {/* Photo strip — hover to expand */}
          <div className="hero-strip">
            {PHOTOS.map((p, i) => (
              <div key={i} className="strip-photo" style={{ background: p.color }}>
                {i === 0 && (
                  <div className="strip-badge">
                    <span className="strip-badge-val">88%</span>
                    <span className="strip-badge-lbl">appellent le 1er</span>
                  </div>
                )}
                <div className="strip-ph">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {p.label}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* TICKER */}
        <div className="ticker">
          <div className="ticker-inner">
            {[
              <><b>97%</b> des clients cherchent sur Google avant d'appeler &nbsp;·</>,
              <><b>88%</b> cliquent sur les 3 premiers résultats seulement &nbsp;·</>,
              <>Vous êtes <b>en quelle position</b> ce soir ? &nbsp;·</>,
              <><b>Tours</b> · Joué-lès-Tours · Saint-Cyr · Fondettes &nbsp;·</>,
              <><b>1 seul</b> partenaire par métier et par secteur &nbsp;·</>,
              <><b>97%</b> des clients cherchent sur Google avant d'appeler &nbsp;·</>,
              <><b>88%</b> cliquent sur les 3 premiers résultats seulement &nbsp;·</>,
              <>Vous êtes <b>en quelle position</b> ce soir ? &nbsp;·</>,
              <><b>Tours</b> · Joué-lès-Tours · Saint-Cyr · Fondettes &nbsp;·</>,
              <><b>1 seul</b> partenaire par métier et par secteur &nbsp;·</>,
            ].map((t, i) => <div key={i} className="tick-item">{t}</div>)}
          </div>
        </div>

        {/* WA Float */}
        <div className="wa">
          <a href="https://wa.me/33686018054" className="wa-btn" target="_blank" rel="noopener noreferrer">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </div>

      </div>
    </>
  );
}
