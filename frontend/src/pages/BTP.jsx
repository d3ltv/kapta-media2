import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL CSS (injected once) - v2.1
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,800&family=Instrument+Serif:ital@0;1&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px;-webkit-text-size-adjust:100%}

/* Preloader */
.km-preloader{
  position:fixed;
  inset:0;
  background:#0C0C09;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:24px;
  z-index:99999;
  transition:opacity .5s ease-out,visibility .5s ease-out;
}
.km-preloader.hidden{
  opacity:0;
  visibility:hidden;
  pointer-events:none;
}
.km-preloader-logo{
  font-weight:800;
  font-size:2rem;
  letter-spacing:-.02em;
  color:#F2EDE0;
  display:flex;
  align-items:center;
  gap:12px;
  animation:fadeInScale 0.6s ease-out;
  font-family:'Bricolage Grotesque',sans-serif;
}
.km-preloader-dot{
  width:12px;
  height:12px;
  border-radius:50%;
  background:#F0521A;
  animation:throb 2s ease-in-out infinite;
}
.km-preloader-spinner{
  width:48px;
  height:48px;
  border:3px solid rgba(240,82,26,.15);
  border-top-color:#F0521A;
  border-radius:50%;
  animation:spin 0.8s linear infinite;
}
.km-preloader-text{
  font-size:0.85rem;
  color:#6A6660;
  letter-spacing:0.05em;
  animation:pulse 2s ease-in-out infinite;
  font-family:'Bricolage Grotesque',sans-serif;
}
@keyframes fadeInScale{
  from{opacity:0;transform:scale(0.9)}
  to{opacity:1;transform:scale(1)}
}
@keyframes pulse{
  0%,100%{opacity:0.5}
  50%{opacity:1}
}
@keyframes spin{to{transform:rotate(360deg)}}

.km-root{
  --bg:#0C0C09;--bg2:#131310;--bg3:#1C1C17;
  --bone:#F2EDE0;--muted:#6A6660;--line:rgba(242,237,224,.07);
  --fire:#F0521A;--fire-l:#FF6B30;--shadow:rgba(0,0,0,.4);
  --nav-bg:rgba(12,12,9,.92);
  --ff-h:'Bricolage Grotesque',sans-serif;
  --ff-s:'Instrument Serif',serif;
  --tr:.35s cubic-bezier(.4,0,.2,1);
  font-family:var(--ff-h);
  background:var(--bg);color:var(--bone);
  overflow-x:hidden;-webkit-font-smoothing:antialiased;
  transition:background var(--tr),color var(--tr);
  position:relative;
}
.km-root.light{
  --bg:#F4EFE3;--bg2:#EAE4D6;--bg3:#DDD7C8;
  --bone:#1A1815;--muted:#7A7065;--line:rgba(26,24,21,.09);
  --shadow:rgba(0,0,0,.1);--nav-bg:rgba(244,239,227,.93);
}
.km-root.dark::after{
  content:'';position:fixed;inset:0;pointer-events:none;z-index:998;opacity:.022;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size:128px 128px;
}
a{color:inherit;text-decoration:none;cursor:pointer}

/* NAV */
.km-nav{
  position:fixed;top:0;left:0;right:0;z-index:200;
  padding:12px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;
  background:var(--nav-bg);backdrop-filter:blur(20px);border-bottom:1px solid var(--line);
  transition:all .3s cubic-bezier(.4,0,.2,1);
  will-change:transform, background;
}
@media(min-width:640px){.km-nav{padding:14px 20px;gap:12px}}
.km-nav.scrolled{
  padding:8px 16px;
  box-shadow:0 4px 20px rgba(0,0,0,.1);
}
@media(min-width:640px){.km-nav.scrolled{padding:10px 20px}}
.km-logo{
  font-weight:800;font-size:.85rem;letter-spacing:-.02em;
  display:flex;align-items:center;gap:6px;
  transition:transform .2s cubic-bezier(.4,0,.2,1);
  flex-shrink:0;
}
@media(min-width:640px){.km-logo{font-size:.95rem;gap:8px}}
.km-logo:hover{
  transform:scale(1.02);
}
.km-logo-dot{
  width:9px;height:9px;border-radius:50%;background:var(--fire);
  animation:throb 2.2s ease-in-out infinite;
}
@keyframes throb{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.55}}
.km-nav-right{display:flex;align-items:center;gap:6px;flex-shrink:0}
@media(min-width:640px){.km-nav-right{gap:10px}}
.km-theme-btn{
  width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--bg3);border:1px solid var(--line);color:var(--muted);
  cursor:pointer;font-family:inherit;
  transition:all .2s cubic-bezier(.4,0,.2,1);
  flex-shrink:0;
}
@media(min-width:640px){.km-theme-btn{width:40px;height:40px}}
.km-theme-btn:hover{color:var(--bone);background:var(--bg2);transform:rotate(180deg)}
.km-theme-btn:active{transform:scale(.92) rotate(180deg)}
.km-nav-btn{
  background:var(--fire);color:#fff;font-weight:800;font-size:.68rem;
  letter-spacing:.02em;text-transform:uppercase;padding:8px 10px;border-radius:3px;
  transition:all .2s cubic-bezier(.4,0,.2,1);
  cursor:pointer;border:none;font-family:inherit;display:inline-block;
  position:relative;
  overflow:hidden;
  white-space:nowrap;
  flex-shrink:0;
}
@media(min-width:640px){.km-nav-btn{font-size:.78rem;padding:10px 16px}}
.km-nav-btn::before{
  content:'';
  position:absolute;
  top:50%;left:50%;
  width:0;height:0;
  border-radius:50%;
  background:rgba(255,255,255,.2);
  transform:translate(-50%,-50%);
  transition:width .4s,height .4s;
}
.km-nav-btn:hover::before{
  width:300px;
  height:300px;
}
.km-nav-btn:hover{background:var(--fire-l);transform:translateY(-2px);box-shadow:0 4px 12px rgba(240,82,26,.3)}
.km-nav-btn:active{transform:translateY(0)}

/* LAYOUT */
.km-wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 20px}
.km-label{font-weight:700;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--fire);margin-bottom:12px;display:block}
.km-section{padding:90px 0}

/* HERO */
#hero {
  min-height: 100svh;
  display: grid;
  grid-template-rows: 1fr auto;
  padding-top: 68px;
  position: relative;
  overflow: hidden;
  background: var(--bg);
  transition: background var(--tr);
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
  transition: color var(--tr);
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
  align-items: flex-start;
  max-width: 1200px;
}

@media(min-width: 900px) {
  .hero-main {
    padding: 0 60px 60px;
  }
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
  animation: heroPulse 2s ease-in-out infinite;
}
@keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.3)} }
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
  text-align: left;
}
.h1-ghost {
  display: block;
  font-size: clamp(1.6rem, 8vw, 3.5rem);
  font-weight: 200;
  letter-spacing: -.02em;
  color: var(--muted);
  margin-bottom: 6px;
  text-align: left;
}
.h1-main {
  display: block;
  font-size: clamp(3.8rem, 17vw, 8rem);
  color: var(--bone);
  line-height: .9;
  text-align: left;
}
.h1-accent {
  display: block;
  font-size: clamp(3.8rem, 17vw, 8rem);
  color: var(--fire);
  line-height: .9;
  position: relative;
  text-align: left;
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
  border: none;
  font-family: inherit;
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
  background: transparent;
  font-family: inherit;
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
  transition: background var(--tr), border-color var(--tr);
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
  transition: flex .4s cubic-bezier(.4,0,.2,1), background var(--tr);
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
  background: linear-gradient(to top, rgba(12,12,9,.85) 0%, transparent 60%);
  opacity: 1;
  transition: opacity .3s;
  pointer-events: none;
}

/* Label sur la photo */
.strip-label {
  position: absolute;
  bottom: 12px;
  left: 12px;
  right: 12px;
  color: #fff;
  font-size: .7rem;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  z-index: 3;
  text-align: left;
  text-shadow: 0 2px 8px rgba(0,0,0,.5);
}

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

/* Notification flottante - REMOVED */
/* Couche 1: Forme géométrique subtile pour le relief */
#hero::after{
  content:'';
  position:absolute;
  top:-20%;
  right:-15%;
  width:60%;
  height:120%;
  background:radial-gradient(ellipse at center, rgba(240,82,26,.04) 0%, transparent 70%);
  border-radius:50%;
  pointer-events:none;
  z-index:0;
  transition:background var(--tr);
}
.light #hero::after{
  background:radial-gradient(ellipse at center, rgba(240,82,26,.06) 0%, transparent 70%);
}
/* Couche 2: Grain texture avec animation subtile */
#hero::before{
  content:'';
  position:absolute;
  inset:0;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  background-size:64px 64px;
  opacity:.85;
  pointer-events:none;
  z-index:1;
  mix-blend-mode:soft-light;
  animation:grainMove 8s linear infinite;
}
@keyframes grainMove{
  0%{background-position:0 0}
  100%{background-position:64px 64px}
}

/* Hero Images - Orbiting circles */
.hero-images{
  display:none;
}
@media(max-width:899px){
  .hero-images{
    display:flex;
    gap:10px;
    overflow-x:scroll;
    overflow-y:hidden;
    padding:4px 0;
    margin-top:24px;
    scrollbar-width:none;
    pointer-events:auto;
    user-select:none;
    position:relative;
  }
  .hero-images::before,
  .hero-images::after{
    content:'';
    position:absolute;
    top:0;
    bottom:0;
    width:40px;
    pointer-events:none;
    z-index:1;
  }
  .hero-images::before{
    left:0;
    background:linear-gradient(to right, var(--bg), transparent);
  }
  .hero-images::after{
    right:0;
    background:linear-gradient(to left, var(--bg), transparent);
  }
  .hero-images::-webkit-scrollbar{
    display:none;
  }
  .hero-img{
    flex-shrink:0;
    width:60px;
    height:60px;
    border-radius:50%;
    overflow:hidden;
    border:1.5px solid var(--line);
    pointer-events:none;
  }
  .hero-img img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
    pointer-events:none;
    user-select:none;
    -webkit-user-drag:none;
  }
}
@media(min-width:900px){
  .hero-images{
    display:block;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%, -50%);
    width:800px;
    height:800px;
    pointer-events:none;
    z-index:0;
  }
  .hero-img{
    position:absolute;
    top:50%;
    left:50%;
    border-radius:50%;
    overflow:hidden;
    box-shadow:0 12px 40px rgba(0,0,0,.4);
    border:4px solid var(--bone);
    background:var(--bg3);
    transition:transform .3s;
    z-index:0;
  }
  .hero-img:hover{
    transform:translate(-50%, -50%) scale(1.1);
  }
  .hero-img img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
  }
  .hero-img-1{
    width:110px;
    height:110px;
    animation:orbit 20s linear infinite;
  }
  .hero-img-2{
    width:110px;
    height:110px;
    animation:orbit 20s linear infinite;
    animation-delay:-16s;
  }
  .hero-img-3{
    width:110px;
    height:110px;
    animation:orbit 20s linear infinite;
    animation-delay:-12s;
  }
  .hero-img-4{
    width:110px;
    height:110px;
    animation:orbit 20s linear infinite;
    animation-delay:-8s;
  }
  .hero-img-5{
    width:110px;
    height:110px;
    animation:orbit 20s linear infinite;
    animation-delay:-4s;
  }
  @keyframes orbit{
    from{transform:translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg)}
    to{transform:translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg)}
  }
}
.hero-img-badge{
  display:none;
}

.km-missed-call{display:none}
.hero-content{position:relative;z-index:2;width:100%;text-align:center}
.hero-inner{display:flex;flex-direction:column;align-items:center;text-align:center;max-width:900px;margin:0 auto}
.hero-left{display:flex;flex-direction:column;align-items:center}
.hero-h1{font-weight:800;font-size:clamp(2.5rem,10vw,5rem);line-height:1;letter-spacing:-.055em;margin-bottom:24px;margin-top:16px;position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:0}
@media(min-width:900px){.hero-h1{font-size:clamp(4rem,8vw,6.5rem);margin-top:60px;margin-bottom:48px}}
.hero-h1-badge{display:inline-block;background:rgba(240,82,26,.15);color:var(--fire);font-size:.5rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:7px 16px;border-radius:20px;margin-bottom:20px;border:1px solid rgba(240,82,26,.3)}
@media(min-width:900px){.hero-h1-badge{font-size:.55rem;padding:8px 18px;margin-bottom:20px}}
.hero-h1-sub{font-weight:700;font-size:0.36em;letter-spacing:-.01em;opacity:.85;display:block;margin-top:8px}
@media(min-width:900px){.hero-h1-sub{margin-top:6px;font-size:0.32em}}
.hero-h1 .thin{font-weight:200;letter-spacing:-.02em;opacity:.85}
.hero-h1 .fire{color:var(--fire);text-shadow:0 0 40px rgba(240,82,26,.3)}
.hero-body{font-size:clamp(1rem,2.6vw,1.15rem);font-weight:400;line-height:1.65;color:var(--muted);margin-bottom:32px;max-width:100%;padding:0 10px}
@media(min-width:640px){.hero-body{max-width:480px;padding:0}}
@media(min-width:900px){.hero-body{max-width:540px;line-height:1.75;margin-bottom:40px}}
.hero-body strong{color:var(--bone);font-weight:600}
.hero-ctas{display:flex;flex-direction:column;gap:12px;position:relative;z-index:10;width:100%;max-width:400px;margin:0 auto}
@media(min-width:500px){.hero-ctas{flex-direction:row;flex-wrap:wrap;gap:16px;max-width:none}}
@media(min-width:900px){.hero-ctas{justify-content:center}}
.cta-main{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  background:var(--fire);color:#fff;font-weight:800;font-size:1rem;
  padding:16px 28px;border-radius:6px;transition:background .2s,transform .15s,box-shadow .2s;
  box-shadow:0 4px 20px rgba(240,82,26,.4);
  position:relative;
  z-index:10;
  width:100%;
}
@media(min-width:500px){.cta-main{width:auto}}
@media(min-width:900px){.cta-main{font-size:1.05rem;padding:20px 32px}}
.cta-main:hover{background:var(--fire-l);box-shadow:0 12px 40px rgba(240,82,26,.5);transform:translateY(-2px)}
.cta-main:active{transform:scale(.98) translateY(0)}
.cta-call{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border:2px solid rgba(0,0,0,.12);color:#1A1815;font-weight:600;font-size:.95rem;
  padding:16px 24px;border-radius:6px;transition:border-color .2s,color .2s,background .2s;
  background:#FAFAF8;
  position:relative;
  z-index:10;
  width:100%;
}
@media(min-width:500px){.cta-call{width:auto}}
.dark .cta-call{background:var(--bg2);border-color:var(--line);color:var(--bone)}
.cta-call:hover{border-color:var(--fire);color:var(--fire);background:#FFFFFF}
.dark .cta-call:hover{background:var(--bg3)}
.hero-proof{margin-top:40px;padding-top:32px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;max-width:400px;margin-left:auto;margin-right:auto}
@media(min-width:640px){.hero-proof{max-width:none}}
.proof-faces{display:flex}
.proof-face{
  width:32px;height:32px;border-radius:50%;border:2px solid var(--bg);background:var(--bg3);
  display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:700;
  font-size:.68rem;color:var(--fire);margin-left:-8px;transition:background var(--tr),border-color var(--tr);
}
.proof-face:first-child{margin-left:0}
.proof-text{font-size:.78rem;color:var(--muted);line-height:1.5}
.proof-text strong{color:var(--bone);display:block;font-weight:600}
.hero-right{display:none}
.live-card{
  background:#FAFAF8;border:1px solid rgba(0,0,0,.12);border-radius:12px;padding:24px;
  transition:background var(--tr),border-color var(--tr),transform .3s;
  box-shadow:0 4px 20px rgba(0,0,0,.12);
  position:relative;
  z-index:2;
}
.live-card:hover{transform:translateY(-4px);border-color:rgba(240,82,26,.3);box-shadow:0 8px 30px rgba(0,0,0,.15)}
.lc-tag{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fire);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.lc-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--fire);animation:throb 2s infinite;flex-shrink:0}
.lc-stat{font-weight:800;font-size:2.8rem;letter-spacing:-.05em;color:var(--fire);line-height:1;margin-bottom:6px;text-shadow:0 0 30px rgba(240,82,26,.2)}
.lc-desc{font-size:.8rem;color:#4A4540;line-height:1.5}

/* TICKER */
.km-ticker{overflow:hidden;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg2);padding:13px 0;transition:background var(--tr)}
.ticker-track{display:flex;white-space:nowrap;animation:tick 30s linear infinite}
.ticker-track:hover{animation-play-state:paused}
@keyframes tick{0%{transform:translateX(-50%)}100%{transform:translateX(0)}}
.ticker-item{display:inline-flex;align-items:center;gap:10px;padding:0 28px;font-weight:600;font-size:.8rem;letter-spacing:.02em;color:var(--muted)}
.ticker-item span{color:var(--fire);font-weight:800;font-size:.95rem}

/* QUESTION */
#question{background:var(--bg);transition:background var(--tr)}
@media(min-width:900px){.q-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}}
.q-giant{font-weight:800;font-size:clamp(1.75rem,5.5vw,4rem);line-height:1.1;letter-spacing:-.04em;margin-bottom:16px}
.q-sub{font-family:var(--ff-h);font-style:normal;font-size:clamp(.95rem,2.2vw,1.2rem);font-weight:500;color:var(--muted);margin-bottom:40px;line-height:1.6}
.maps-caption{font-family:var(--ff-h);font-style:normal;font-size:clamp(.88rem,2vw,.98rem);font-weight:500;color:var(--muted);line-height:1.7;margin-top:20px}
.maps-caption strong{color:var(--bone);font-style:normal}
.gmaps-mock{border-radius:10px;overflow:hidden;border:1px solid rgba(0,0,0,.1);background:#FFFFFF;transition:background var(--tr),border-color var(--tr)}
.dark .gmaps-mock{background:#1A1815;border-color:rgba(242,237,224,.15)}
.gmaps-header{background:#E8E8E8;padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid rgba(0,0,0,.12);transition:background var(--tr),border-color var(--tr)}
.dark .gmaps-header{background:#0C0C09;border-bottom-color:rgba(242,237,224,.07)}
.gmaps-search{background:#F5F5F5;border-radius:4px;padding:9px 14px;flex:1;font-size:.8rem;color:#666;display:flex;align-items:center;gap:8px;transition:background var(--tr),color var(--tr);border:1px solid rgba(0,0,0,.06)}
.dark .gmaps-search{background:#131310;color:#6A6660;border-color:rgba(242,237,224,.07)}
.gmaps-dot{width:8px;height:8px;border-radius:50%;background:#4285F4;flex-shrink:0}
.gmap-result{padding:16px;border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:flex-start;gap:12px;transition:border-color var(--tr)}
.dark .gmap-result{border-bottom-color:rgba(242,237,224,.07)}
.gmap-result:last-child{border-bottom:none}
.gr-rank{font-weight:800;font-size:1.1rem;width:28px;flex-shrink:0;padding-top:2px;color:#999;transition:color var(--tr)}
.dark .gr-rank{color:var(--muted)}
.gmap-result.competitor .gr-rank{color:#4285F4}
.gmap-result.you .gr-rank{color:var(--fire);animation:rankPulse 2.5s ease-in-out infinite}
@keyframes rankPulse{0%,100%{opacity:.25}50%{opacity:1}}
.gr-body{flex:1;min-width:0}
.gr-name{font-weight:700;font-size:.88rem;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#1A1815;transition:color var(--tr)}
.dark .gr-name{color:var(--bone)}
.gmap-result.competitor .gr-name{color:#1A1815}
.dark .gmap-result.competitor .gr-name{color:var(--bone)}
.gmap-result.you .gr-name{color:#999;font-style:normal;opacity:.7}
.dark .gmap-result.you .gr-name{color:var(--muted)}
.gr-stars{display:flex;align-items:center;gap:4px;margin-bottom:3px}
.gr-star{color:#FBBC04;font-size:.72rem}
.gr-star.g{color:#E8E8E8;transition:color var(--tr)}
.dark .gr-star.g{color:var(--bg3)}
.gr-rating{font-size:.7rem;color:#999;transition:color var(--tr)}
.dark .gr-rating{color:var(--muted)}
.gr-tag{display:inline-block;font-size:.65rem;font-weight:700;background:rgba(66,133,244,.1);color:#4285F4;border-radius:3px;padding:2px 6px;margin-top:2px;transition:background var(--tr),color var(--tr)}
.dark .gr-tag{color:#8AB4F8}
.gmap-result.you .gr-tag{background:rgba(240,82,26,.1);color:var(--fire)}

/* STRIP */
#strip{padding:80px 0;background:var(--fire);overflow:hidden;position:relative}
.strip-bg-num{position:absolute;right:5%;top:50%;transform:translateY(-50%);font-weight:800;font-size:clamp(180px,35vw,320px);line-height:.8;color:rgba(12,12,9,.06);pointer-events:none;user-select:none;z-index:0}
.strip-inner{position:relative;z-index:1}
@media(min-width:900px){.strip-inner{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center}}
.strip-stat{font-weight:800;font-size:clamp(4rem,14vw,9rem);line-height:.9;letter-spacing:-.05em;color:#0C0C09;margin-bottom:16px}
@media(min-width:900px){.strip-stat{margin-bottom:0}}
.strip-label{font-weight:400;font-size:clamp(1rem,2.5vw,1.25rem);color:rgba(12,12,9,.75);line-height:1.6}
.strip-label strong{color:#0C0C09;font-weight:600}

/* SOLUTION */
#solution{background:var(--bg);padding:60px 20px;transition:background var(--tr)}
@media(min-width:700px){#solution{padding:80px 20px}}
.pilier{padding:28px 20px;max-width:1120px;margin:0 auto 24px;background:#FAFAF8;border-radius:12px;border:1px solid rgba(0,0,0,.12);transition:all .4s;box-shadow:0 4px 20px rgba(0,0,0,.1);position:relative;overflow:hidden}
@media(min-width:700px){.pilier{padding:40px;border-radius:16px;margin-bottom:32px}}
.dark .pilier{background:var(--bg2);border-color:var(--line)}
.pilier::before{content:'';position:absolute;top:0;right:0;width:200px;height:200px;background:radial-gradient(circle,rgba(240,82,26,.08) 0%,transparent 70%);pointer-events:none;opacity:0;transition:opacity .4s}
.pilier:hover::before{opacity:1}
.pilier:hover{transform:translateY(-4px);border-color:rgba(240,82,26,.3);box-shadow:0 8px 30px rgba(0,0,0,.15)}
.pilier:last-child{margin-bottom:0}
@media(min-width:700px){.pilier{display:grid;grid-template-columns:120px 1fr;gap:48px;align-items:center}}
.pilier-num{font-weight:800;font-size:2.5rem;line-height:.85;letter-spacing:-.05em;color:rgba(240,82,26,.25);padding-top:4px;transition:all .4s;cursor:default;margin-bottom:16px}
@media(min-width:700px){.pilier-num{font-size:clamp(4rem,10vw,6rem);margin-bottom:0;padding-top:0}}
.pilier:hover .pilier-num{color:rgba(240,82,26,.6)}
.pilier-body{display:flex;flex-direction:column}
.pilier-kicker{font-weight:700;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--fire);margin-bottom:12px;display:inline-block;background:rgba(240,82,26,.1);padding:5px 10px;border-radius:4px;align-self:flex-start}
@media(min-width:700px){.pilier-kicker{font-size:.7rem;padding:6px 12px;margin-bottom:16px}}
.pilier-stat-badge{display:inline-flex;flex-direction:column;align-items:flex-start;background:linear-gradient(135deg,rgba(240,82,26,.15) 0%,rgba(255,107,48,.1) 100%);border:2px solid var(--fire);border-radius:10px;padding:10px 14px;margin-bottom:16px;position:relative;align-self:flex-start}
@media(min-width:700px){.pilier-stat-badge{border-radius:12px;padding:12px 18px;margin-bottom:20px}}
.pilier-stat-badge::after{content:'';position:absolute;bottom:-6px;left:16px;width:50px;height:2px;background:var(--fire);border-radius:2px;opacity:.6}
@media(min-width:700px){.pilier-stat-badge::after{bottom:-8px;left:20px;width:60px;height:3px}}
.psb-value{font-weight:900;font-size:1.8rem;line-height:1;color:var(--fire);letter-spacing:-.03em;text-shadow:0 2px 8px rgba(240,82,26,.3)}
@media(min-width:700px){.psb-value{font-size:2.2rem}}
.psb-label{font-size:.7rem;color:#6A6660;margin-top:3px;font-weight:500;line-height:1.3;max-width:200px}
@media(min-width:700px){.psb-label{font-size:.75rem;max-width:none}}
.pilier-h{font-weight:800;font-size:1.35rem;line-height:1.2;letter-spacing:-.03em;margin-bottom:16px;color:#1A1815;position:relative;display:inline-block}
@media(min-width:700px){.pilier-h{font-size:clamp(1.6rem,4vw,2.4rem);line-height:1.15;margin-bottom:20px}}
.dark .pilier-h{color:var(--bone)}
.pilier-h::after{content:'';position:absolute;bottom:-3px;left:0;width:100%;height:6px;background:linear-gradient(90deg,rgba(240,82,26,.25) 0%,transparent 100%);border-radius:4px;z-index:-1}
@media(min-width:700px){.pilier-h::after{bottom:-4px;height:8px}}
.pilier-p{font-size:.85rem;font-weight:400;color:#6A6660;line-height:1.65;margin-bottom:20px;max-width:680px;display:none}
@media(min-width:700px){.pilier-p{display:block;font-size:clamp(.9rem,1.8vw,1rem);line-height:1.75;margin-bottom:28px}}
.pilier-p strong{color:#1A1815;font-weight:600;background:linear-gradient(180deg,transparent 60%,rgba(240,82,26,.15) 60%);padding:0 4px;border-radius:2px}
.dark .pilier-p strong{color:var(--bone)}
.pilier-items{list-style:none;display:grid;gap:10px}
@media(min-width:640px){.pilier-items{grid-template-columns:repeat(2,1fr);gap:14px}}
@media(min-width:700px){.pilier-items{gap:16px}}
.pilier-items li{display:flex;align-items:flex-start;gap:10px;font-size:.82rem;color:#5A5550;line-height:1.5;background:rgba(240,82,26,.06);padding:10px 12px;border-radius:6px;border-left:3px solid var(--fire);transition:all .3s}
@media(min-width:700px){.pilier-items li{gap:12px;font-size:.88rem;line-height:1.6;padding:12px 16px;border-radius:8px}}
.dark .pilier-items li{color:var(--muted);background:rgba(240,82,26,.04)}
.pilier-items li:hover{background:rgba(240,82,26,.1);transform:translateX(4px)}
.pilier-items li::before{content:'✓';color:var(--fire);font-weight:800;flex-shrink:0;font-size:.9rem}
@media(min-width:700px){.pilier-items li::before{font-size:1rem}}
.pilier-items li strong{color:#1A1815;font-weight:600}
.dark .pilier-items li strong{color:var(--bone)}

/* DIFF */
#diff{padding:100px 0;background:var(--bg);transition:background var(--tr)}
.diff-h{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:12px}
.diff-h em{font-family:var(--ff-h);font-style:normal;font-weight:500;font-size:.82em;color:var(--muted)}
.diff-header-row,.diff-row{display:grid;grid-template-columns:1fr 1fr}
.diff-table-wrap{margin-top:48px;overflow-x:auto;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.diff-th{padding:16px 20px;font-weight:700;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase}
@media(max-width:640px){.diff-th{padding:12px 14px;font-size:.65rem}}
.diff-th.them{color:#666;background:#F5F5F5;border-right:1px solid rgba(0,0,0,.08);transition:background var(--tr),color var(--tr),border-color var(--tr)}
.dark .diff-th.them{color:var(--muted);background:var(--bg2);border-right-color:var(--line)}
.diff-th.us{color:#FFFFFF;background:linear-gradient(135deg,#FF6B30 0%,#F0521A 100%);font-weight:800;box-shadow:0 2px 8px rgba(240,82,26,.25)}
.diff-row{border-bottom:1px solid var(--line);transition:background var(--tr),border-color var(--tr)}
.diff-row:hover{background:var(--bg2)}
.diff-cell{padding:20px 22px;font-size:.9rem;line-height:1.6;display:flex;align-items:flex-start;gap:10px;transition:background var(--tr)}
@media(max-width:640px){.diff-cell{padding:16px 14px;font-size:.82rem;gap:8px}}
.diff-cell.them{color:var(--muted);background:#FAFAFA;border-right:1px solid rgba(0,0,0,.08);transition:background var(--tr),color var(--tr),border-color var(--tr)}
.dark .diff-cell.them{background:var(--bg2);color:var(--muted);border-right-color:var(--line)}
.diff-cell.them::before{content:'✗';color:#E74C3C;font-weight:800;flex-shrink:0;font-size:1.1rem}
@media(max-width:640px){.diff-cell.them::before{font-size:.95rem}}
.diff-cell.us{color:var(--bone);font-weight:500;background:rgba(240,82,26,.06);transition:background var(--tr)}
.diff-row:hover .diff-cell.us{background:rgba(240,82,26,.1)}
.diff-cell.us::before{content:'✓';color:var(--fire);font-weight:800;flex-shrink:0;font-size:1.1rem}
@media(max-width:640px){.diff-cell.us::before{font-size:.95rem}}

/* PROOF */
#proof{padding:100px 0;background:var(--bg2);transition:background var(--tr)}
@media(min-width:900px){.proof-layout{display:grid;grid-template-columns:1fr 380px;gap:64px;align-items:start}}
.proof-text-col h2{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:20px}
.proof-text-col p{font-size:.95rem;color:var(--muted);line-height:1.72;max-width:460px;margin-bottom:40px}
.proof-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:8px;overflow:hidden}
.pm-cell{background:var(--bg3);padding:24px 14px;text-align:center;transition:background var(--tr)}
.pm-val{font-weight:800;font-size:clamp(1.5rem,4vw,2.2rem);color:var(--fire);letter-spacing:-.04em;display:block;margin-bottom:6px}
.pm-label{font-size:.73rem;color:var(--muted);line-height:1.4}
.sms-phone{background:#111;border-radius:28px;border:5px solid #222;max-width:360px;margin:40px auto 0;overflow:hidden;box-shadow:0 40px 80px var(--shadow);background:#111}
@media(min-width:900px){.sms-phone{margin:0}}
.sms-topbar{background:#1A1A1A;padding:14px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.04)}
.sms-avatar{width:36px;height:36px;border-radius:50%;background:rgba(240,82,26,.15);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.8rem;color:var(--fire);flex-shrink:0}
.sms-name{font-weight:700;font-size:.85rem;color:#fff}
.sms-job{font-size:.7rem;color:#666;margin-top:1px}
.sms-body{padding:18px;display:flex;flex-direction:column;gap:12px;background:#0F0F0F;min-height:280px;max-height:280px;overflow-y:auto}
@media(min-width:900px){.sms-body{min-height:400px;max-height:400px}}
.sms-body::-webkit-scrollbar{width:4px}
.sms-body::-webkit-scrollbar-track{background:rgba(255,255,255,.05)}
.sms-body::-webkit-scrollbar-thumb{background:rgba(240,82,26,.4);border-radius:2px}
.sms-body::-webkit-scrollbar-thumb:hover{background:rgba(240,82,26,.6)}
.bubble{max-width:88%;padding:11px 14px;border-radius:18px;font-size:.85rem;line-height:1.55;transition:opacity .3s,transform .3s}
.bubble.client{background:#2A2A2A;color:#E0E0E0;border-bottom-left-radius:4px;align-self:flex-start}
.bubble.kapta{background:var(--fire);color:#0C0C09;border-bottom-right-radius:4px;align-self:flex-end;font-weight:500}
.bubble-time{font-size:.62rem;color:#555;margin-top:4px}
.bubble.kapta .bubble-time{text-align:right;color:rgba(12,12,9,.5)}
.sms-nav{border-top:1px solid rgba(255,255,255,.05);background:#1A1A1A;position:relative}
.sms-progress-bar{position:absolute;top:0;left:0;right:0;height:3px;background:rgba(255,255,255,.05);overflow:hidden}
.sms-progress-fill{height:100%;background:var(--fire);transition:width .05s linear;box-shadow:0 0 8px rgba(240,82,26,.6)}
.sms-nav-tabs{display:flex}
.sms-tab{flex:1;padding:13px;text-align:center;font-weight:700;font-size:.7rem;color:#555;border:none;background:transparent;cursor:pointer;transition:color .2s,background .2s;font-family:inherit}
.sms-tab.active{color:var(--fire);background:rgba(240,82,26,.07)}

/* OFFER */
#offer{padding:100px 0;background:var(--bg);transition:background var(--tr)}
.offer-hook{font-family:var(--ff-h);font-style:normal;font-size:clamp(1.3rem,4vw,2.1rem);font-weight:600;line-height:1.5;color:var(--bone);margin-bottom:40px;text-align:center}
.offer-hook strong{font-style:normal;font-family:var(--ff-h);font-weight:800;color:var(--fire)}

/* Simple visual scroll/grid */
.offer-simple-scroll{display:flex;gap:16px;overflow-x:auto;overflow-y:hidden;padding-bottom:16px;margin-bottom:32px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch}
.offer-simple-scroll::-webkit-scrollbar{height:6px}
.offer-simple-scroll::-webkit-scrollbar-track{background:var(--bg2);border-radius:3px}
.offer-simple-scroll::-webkit-scrollbar-thumb{background:rgba(240,82,26,.3);border-radius:3px}
.offer-simple-scroll::-webkit-scrollbar-thumb:hover{background:rgba(240,82,26,.5)}
@media(min-width:900px){.offer-simple-scroll{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;overflow:visible;padding-bottom:0}}
.offer-simple-card{background:var(--bg2);border:2px solid var(--line);border-radius:12px;padding:28px 20px;text-align:center;transition:all .3s;position:relative;overflow:hidden;min-width:260px;scroll-snap-align:start;flex-shrink:0}
@media(min-width:900px){.offer-simple-card{min-width:auto}}
.offer-simple-card::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:var(--fire);transform:scaleX(0);transition:transform .3s;transform-origin:left}
.offer-simple-card:hover{border-color:var(--fire);transform:translateY(-4px)}
.offer-simple-card:hover::before{transform:scaleX(1)}
.osc-icon{font-size:2.5rem;margin-bottom:12px;line-height:1}
.osc-title{font-weight:800;font-size:1rem;color:var(--bone);margin-bottom:6px;letter-spacing:-.02em}
.osc-desc{font-size:.82rem;color:var(--muted);line-height:1.4}

/* Secret note */
.offer-secret-note{background:rgba(240,82,26,.08);border:1px solid rgba(240,82,26,.2);border-radius:12px;padding:20px;margin-bottom:32px;display:flex;gap:16px;align-items:flex-start}
.osn-icon{font-size:2rem;flex-shrink:0;line-height:1}
.osn-text{font-size:.88rem;color:var(--bone);line-height:1.7}
.osn-text strong{color:var(--fire);font-weight:700}

/* Price box */
.offer-price-box{background:var(--bg2);border:3px solid var(--fire);border-radius:16px;padding:40px;display:grid;gap:32px;margin-bottom:32px}
@media(min-width:768px){.offer-price-box{grid-template-columns:1fr 1fr;align-items:center}}
.opb-left{text-align:center}
@media(min-width:768px){.opb-left{text-align:left;border-right:1px solid var(--line);padding-right:32px}}
.opb-label{font-size:.8rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:12px}
.opb-price{font-size:clamp(3rem,8vw,4.5rem);font-weight:800;color:var(--fire);line-height:1;letter-spacing:-.04em;margin-bottom:8px}
.opb-sub{font-size:.9rem;color:var(--muted);line-height:1.5}
.opb-guarantee{display:flex;gap:16px;align-items:flex-start}
.opb-g-icon{width:48px;height:48px;border-radius:50%;background:var(--fire);color:#fff;font-size:1.8rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:800}
.opb-g-title{font-weight:800;font-size:1rem;color:var(--bone);margin-bottom:6px}
.opb-g-text{font-size:.85rem;color:var(--muted);line-height:1.6}

/* CTA row */
.offer-cta-row{display:flex;flex-direction:column;gap:16px;align-items:center;margin-bottom:48px}
@media(min-width:640px){.offer-cta-row{flex-direction:row;justify-content:center}}
.offer-cta-main{display:inline-flex;align-items:center;justify-content:center;gap:10px;background:var(--fire);color:#fff;font-weight:800;font-size:1.1rem;padding:20px 40px;border-radius:8px;transition:all .2s;text-decoration:none;box-shadow:0 8px 24px rgba(240,82,26,.3)}
.offer-cta-main:hover{background:var(--fire-l);transform:translateY(-2px);box-shadow:0 12px 32px rgba(240,82,26,.4)}
.offer-scarcity{font-size:.9rem;color:var(--fire);font-weight:700;display:flex;align-items:center;gap:8px}

/* PROCESS */
#process{padding:100px 0;background:var(--bg2);transition:background var(--tr)}
@media(min-width:900px){.process-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}}
.section-h{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:14px}
.section-h em{font-family:var(--ff-h);font-style:normal;font-weight:500;font-size:.82em;color:var(--muted)}
.sticky-col{position:relative}
@media(min-width:900px){.sticky-col{position:sticky;top:100px}}
.section-sub{font-size:.92rem;color:var(--muted);line-height:1.7;margin-top:14px}
.timeline{margin-top:48px;position:relative;padding-left:52px}
@media(min-width:900px){.timeline{margin-top:0}}
.timeline::before{content:'';position:absolute;left:16px;top:8px;bottom:8px;width:1px;background:linear-gradient(to bottom,var(--fire),rgba(240,82,26,.05))}
.tl-step{margin-bottom:44px;position:relative}
.tl-step:last-child{margin-bottom:0}
.tl-n{position:absolute;left:-52px;top:0;width:34px;height:34px;border-radius:50%;background:var(--fire);color:#fff;font-weight:800;font-size:.78rem;display:flex;align-items:center;justify-content:center}
.tl-h{font-weight:800;font-size:.98rem;letter-spacing:-.02em;margin-bottom:6px;line-height:1.25}
.tl-p{font-size:.85rem;color:var(--muted);line-height:1.65}
.tl-p strong{color:var(--bone);font-weight:500}

/* CTA FINAL */
#cta-final{padding:80px 0 0;background:var(--bg);transition:background var(--tr)}
@media(min-width:900px){.cta-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}}
.cta-alarm{font-family:var(--ff-h);font-style:normal;font-size:clamp(1.4rem,5vw,2.6rem);font-weight:600;line-height:1.35;color:var(--bone);margin-bottom:14px}
.cta-alarm em{color:var(--fire);font-style:normal;font-family:var(--ff-h);font-weight:800}
.cta-sub{font-size:.9rem;color:var(--muted);line-height:1.7;max-width:400px;margin-bottom:32px}
.phone-block{padding:28px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-bottom:28px}
.phone-lbl{font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin-bottom:10px}
.phone-num{display:flex;align-items:center;gap:14px;font-weight:800;font-size:clamp(2.2rem,8vw,3.8rem);letter-spacing:-.05em;color:var(--bone);transition:color .2s}
.phone-num:hover{color:var(--fire)}
.wa-inline{display:inline-flex;align-items:center;gap:8px;margin-top:12px;font-size:.82rem;color:var(--muted);transition:color .2s}
.wa-inline:hover{color:#25D366}
.or-div{display:flex;align-items:center;gap:14px;margin:8px 0 24px}
.or-div::before,.or-div::after{content:'';flex:1;height:1px;background:var(--line)}
.or-div span{font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.km-form{background:var(--bg2);border:1px solid var(--line);border-radius:8px;padding:26px;transition:background var(--tr),border-color var(--tr)}
.km-form-title{font-weight:800;font-size:1.05rem;letter-spacing:-.02em;margin-bottom:22px}
.km-fg{margin-bottom:12px}
.km-fg label{display:block;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:6px}
.km-fg input,.km-fg select{width:100%;background:var(--bg3);border:1px solid var(--line);border-radius:4px;padding:13px 14px;color:var(--bone);font-family:var(--ff-h);font-size:.92rem;outline:none;transition:border-color .2s,background var(--tr);-webkit-appearance:none}
.km-fg input:focus,.km-fg select:focus{border-color:var(--fire)}
.km-fg input::placeholder{color:var(--muted)}
.km-fg select option{background:var(--bg3);color:var(--bone)}
.km-submit{width:100%;background:var(--fire);color:#fff;font-weight:800;font-size:.98rem;padding:17px;border-radius:3px;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:10px;transition:background .2s,transform .15s;cursor:pointer;border:none;font-family:inherit}
.km-submit:hover{background:var(--fire-l)}
.km-submit:active{transform:scale(.98)}
.km-submit:disabled{background:#2D6A3F;cursor:default;transform:none}
.km-privacy{margin-top:10px;font-size:.7rem;color:var(--muted);text-align:center;line-height:1.5}
.scarcity-bar{margin-top:48px;background:var(--fire);padding:22px 20px;display:flex;align-items:flex-start;gap:14px}
.sc-dot{width:26px;height:26px;border-radius:50%;background:rgba(0,0,0,.12);flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:2px}
.scarcity-bar p{font-weight:700;font-size:.9rem;color:#0C0C09;line-height:1.5}
.scarcity-bar span{font-weight:400;font-size:.8rem;color:rgba(12,12,9,.6);display:block;margin-top:3px}

/* ABOUT */
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

.about-photo-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Mobile header - visible uniquement sur mobile */
.about-mobile-header {
  display: block;
  margin-bottom: 20px;
}

@media (min-width: 860px) {
  .about-mobile-header {
    display: none;
  }
}

.about-eyebrow-mobile {
  font-weight: 700;
  font-size: .68rem;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: var(--fire);
  display: block;
  margin-bottom: 12px;
}

.about-name-mobile {
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 1.02;
  letter-spacing: -.045em;
  margin: 0;
}

/* Desktop: cacher le header mobile, afficher dans copy */
@media (min-width: 860px) {
  .about-eyebrow {
    display: block;
  }
  .about-name {
    display: block;
  }
}

/* Mobile: cacher les titres dans copy column */
@media (max-width: 859px) {
  .about-eyebrow {
    display: none;
  }
  .about-name {
    display: none;
  }
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

.about-photo-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--fire), var(--fire-l));
}

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
  animation: onAirPulse 2s ease-in-out infinite;
}

@keyframes onAirPulse {
  0%, 100% { 
    box-shadow: 0 0 0 3px rgba(46, 204, 113, .15);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 0 8px rgba(46, 204, 113, .05);
    transform: scale(1.1);
  }
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
  font-family: var(--ff-h);
  font-style: normal;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  color: var(--fire);
  margin-bottom: 32px;
  line-height: 1.4;
  font-weight: 600;
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

.about-quote {
  position: relative;
  padding: 24px 24px 24px 28px;
  margin-bottom: 36px;
  border-left: 2px solid var(--fire);
  background: rgba(240, 82, 26, .04);
  border-radius: 0 6px 6px 0;
}

.about-quote p {
  font-family: var(--ff-h);
  font-style: normal;
  font-size: clamp(.95rem, 2.2vw, 1.1rem);
  line-height: 1.65;
  color: var(--bone);
  font-weight: 500;
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

@media(max-width:640px){
  .about-name{
    font-size: 2.2rem;
  }
  .about-quote{
    padding: 18px 18px 18px 20px;
  }
  .about-quote p{
    font-size: .92rem;
  }
}

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

.about-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .65s cubic-bezier(.22,.68,0,1.2), transform .65s cubic-bezier(.22,.68,0,1.2);
}
.about-reveal.in { opacity: 1; transform: translateY(0); }
.about-reveal.d1 { transition-delay: .1s; }
.about-reveal.d2 { transition-delay: .2s; }
.about-reveal.d3 { transition-delay: .3s; }

/* FOOTER */
.km-footer{background:var(--bg2);padding:32px 20px;border-top:1px solid var(--line);transition:background var(--tr),border-color var(--tr)}
.footer-inner{max-width:1120px;margin:0 auto;display:flex;flex-wrap:wrap;gap:16px;justify-content:space-between;align-items:center}
.footer-logo{font-weight:800;font-size:.9rem;display:flex;align-items:center;gap:7px}
.fl-dot{width:7px;height:7px;border-radius:50%;background:var(--fire)}
.footer-copy{font-size:.75rem;color:var(--muted)}
.footer-links{display:flex;gap:20px;flex-wrap:wrap}
.footer-links a{font-size:.75rem;color:var(--muted);transition:color .2s}
.footer-links a:hover{color:var(--bone)}

/* WA FLOAT */
.wa-float{position:fixed;bottom:24px;right:20px;z-index:300;display:flex;flex-direction:column;align-items:flex-end;gap:10px}
.wa-bubble{display:none}
.wa-bubble{background:#FAFAF8;border:1px solid rgba(0,0,0,.12);border-radius:12px 12px 0 12px;padding:10px 14px;font-size:.75rem;color:#1A1815;max-width:220px;text-align:right;line-height:1.5;box-shadow:0 4px 20px rgba(0,0,0,.15);transition:opacity .6s;word-wrap:break-word;position:relative}
.wa-bubble-close{position:absolute;top:4px;right:4px;width:18px;height:18px;border:none;background:rgba(0,0,0,.05);color:#666;border-radius:50%;font-size:14px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;padding:0}
.wa-bubble-close:hover{background:rgba(0,0,0,.1);color:#000;transform:scale(1.1)}
.wa-bubble.typing{padding:14px 18px}
.wa-typing-dots{display:flex;gap:4px;justify-content:flex-end}
.wa-typing-dots span{width:6px;height:6px;border-radius:50%;background:var(--muted);opacity:.4;animation:typingDot 1.4s infinite}
.wa-typing-dots span:nth-child(2){animation-delay:.2s}
.wa-typing-dots span:nth-child(3){animation-delay:.4s}
@keyframes typingDot{0%,60%,100%{opacity:.4;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}
.wa-bubble-text{animation:fadeInText 0.8s ease-out forwards}
@keyframes fadeInText{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
.wa-float-btn{width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .2s,box-shadow .2s;flex-shrink:0}
.wa-float-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,.5)}
.wa-float-btn:active{transform:scale(.95)}

/* REVEAL - Optimized */
.reveal{
  opacity:0;
  transform:translateY(20px);
  transition:opacity .5s cubic-bezier(.4,0,.2,1), transform .5s cubic-bezier(.4,0,.2,1);
  will-change:opacity, transform;
}
.reveal.in{
  opacity:1;
  transform:translateY(0);
  will-change:auto;
}
.reveal.d1{transition-delay:.08s}
.reveal.d2{transition-delay:.16s}
.reveal.d3{transition-delay:.24s}
.reveal.d4{transition-delay:.32s}

/* Call Modal */
.call-modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.7);
  backdrop-filter:blur(8px);
  z-index:9999;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:20px;
  opacity:0;
  visibility:hidden;
  transition:opacity .3s,visibility .3s;
}
.call-modal-overlay.active{
  opacity:1;
  visibility:visible;
}
.call-modal{
  background:var(--bg2);
  border:2px solid var(--fire);
  border-radius:16px;
  padding:40px 32px;
  max-width:420px;
  width:100%;
  position:relative;
  transform:scale(.9);
  transition:transform .3s cubic-bezier(.4,0,.2,1);
  box-shadow:0 20px 60px rgba(0,0,0,.4);
}
.call-modal-overlay.active .call-modal{
  transform:scale(1);
}
.call-modal-close{
  position:absolute;
  top:16px;
  right:16px;
  width:32px;
  height:32px;
  border-radius:50%;
  background:var(--bg3);
  border:1px solid var(--line);
  color:var(--muted);
  display:flex;
  align-items:center;
  justify-content:center;
  cursor:pointer;
  transition:all .2s;
  font-size:20px;
  line-height:1;
}
.call-modal-close:hover{
  background:var(--fire);
  color:#fff;
  border-color:var(--fire);
  transform:rotate(90deg);
}
.call-modal-icon{
  width:64px;
  height:64px;
  border-radius:50%;
  background:rgba(240,82,26,.15);
  display:flex;
  align-items:center;
  justify-content:center;
  margin:0 auto 24px;
}
.call-modal-icon svg{
  width:32px;
  height:32px;
  color:var(--fire);
}
.call-modal-title{
  font-weight:800;
  font-size:1.4rem;
  letter-spacing:-.02em;
  text-align:center;
  margin-bottom:8px;
  color:var(--bone);
}
.call-modal-phone{
  font-weight:800;
  font-size:2rem;
  letter-spacing:-.03em;
  text-align:center;
  color:var(--fire);
  margin-bottom:8px;
}
.call-modal-subtitle{
  font-size:.88rem;
  color:var(--muted);
  text-align:center;
  margin-bottom:32px;
  line-height:1.6;
}
.call-modal-actions{
  display:flex;
  flex-direction:column;
  gap:12px;
}
.call-modal-btn{
  width:100%;
  padding:16px 24px;
  border-radius:8px;
  font-weight:700;
  font-size:.95rem;
  text-align:center;
  cursor:pointer;
  transition:all .2s;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  text-decoration:none;
  font-family:inherit;
  border:none;
}
.call-modal-btn-primary{
  background:var(--fire);
  color:#fff;
  box-shadow:0 4px 16px rgba(240,82,26,.3);
}
.call-modal-btn-primary:hover{
  background:var(--fire-l);
  transform:translateY(-2px);
  box-shadow:0 6px 24px rgba(240,82,26,.4);
}
.call-modal-btn-primary:active{
  transform:translateY(0);
}
.call-modal-btn-secondary{
  background:var(--bg3);
  color:var(--muted);
  border:1px solid var(--line);
}
.call-modal-btn-secondary:hover{
  background:var(--bg2);
  color:var(--bone);
  border-color:var(--muted);
}

/* Smooth scroll */
html{
  scroll-behavior:smooth;
  scroll-padding-top:80px;
}

/* Performance optimizations */
*{
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar{width:10px}
::-webkit-scrollbar-track{background:var(--bg);border-left:1px solid var(--line)}
::-webkit-scrollbar-thumb{background:rgba(240,82,26,.25);border-radius:2px;border:2px solid var(--bg)}
::-webkit-scrollbar-thumb:hover{background:rgba(240,82,26,.4)}

img{
  content-visibility:auto;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after{
    animation-duration:.01ms !important;
    animation-iteration-count:1 !important;
    transition-duration:.01ms !important;
    scroll-behavior:auto !important;
  }
}

@media(max-width:480px){
  .km-missed-call{width:190px;top:84px}
  .proof-metrics{grid-template-columns:1fr 1fr}
  .pm-cell:last-child{grid-column:1/-1}
  .gs-item{flex-direction:column;gap:8px}
}
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TICKER_ITEMS = [
  ["97%", " des clients cherchent sur Google avant d'appeler"],
  ["88%", " cliquent sur les 3 premiers résultats seulement"],
  [null, "Vous êtes "], ["en quelle position", " ce soir ?"],
  ["Tours", " · Joué-lès-Tours · Saint-Cyr · Fondettes"],
  ["1 seul", " partenaire par métier et par secteur"],
];

const SMS_CONVOS = [
  { init:"MB", name:"Mathieu B.", job:"Plombier-chauffagiste · Joué-lès-Tours", msgs:[
    {c:"client", text:"J'avais 2-3 appels par semaine depuis Google. Maintenant j'en ai entre 10 et 15. J'ai dû refuser des chantiers.", time:"Il y a 3 semaines"},
    {c:"kapta", text:"C'est pour ça qu'on est là.", time:"Vu ✓✓"},
    {c:"client", text:"La vidéo filmée sur mon chantier c'est ce qui a tout changé. Les clients appellent en me disant « j'ai vu comment vous travaillez ».", time:"Il y a 3 semaines"},
  ]},
  { init:"TL", name:"Thomas L.", job:"Électricien · Saint-Cyr-sur-Loire", msgs:[
    {c:"client", text:"Mon concurrent m'a demandé ce que j'avais fait pour avoir autant d'appels. J'ai rien dit.", time:"Il y a 5 semaines"},
    {c:"kapta", text:"On apprécie votre discrétion.", time:"Vu ✓✓"},
    {c:"client", text:"Honnêtement j'étais sceptique. « Encore une agence qui promet » — je me disais. Mais là les appels sont réels et je les compte.", time:"Il y a 5 semaines"},
  ]},
  { init:"AD", name:"Audrey D.", job:"Cuisiniste · Tours Centre", msgs:[
    {c:"client", text:"Mon showroom apparaît maintenant quand quelqu'un cherche 'cuisiniste Tours'. Avant j'étais invisible.", time:"Il y a 7 semaines"},
    {c:"kapta", text:"Normal. Avant, votre fiche n'avait pas bougé depuis 14 mois.", time:"Vu ✓✓"},
    {c:"client", text:"Ce qui me plaît c'est que vous m'envoyez une page par mois. Je comprends ce qui se passe. C'est la première fois.", time:"Il y a 7 semaines"},
  ]},
];

const STACK_ITEMS = [
  { name:"L'Infrastructure GMB \"Dominateur Local\"", desc:"Configuration complète de votre fiche Google Maps. NAP, citations, Schema Markup, audit concurrentiel sur votre zone. 100% Done-For-You.", price:"997 €", bonus:false },
  { name:"Tournage \"Trust-Builder\" sur site", desc:"90 minutes chez vous. On filme votre vrai travail, on monte 10–15 clips courts orientés conversion. Vos futurs clients voient qui vous êtes avant d'appeler.", price:"1 500 €", bonus:false },
  { name:"Récolteur d'Avis Automatique", desc:"Les scripts SMS exacts à copier-coller pour demander des avis à vos clients. Ceux qui mentionnent votre service et votre ville — les seuls que Google valorise vraiment.", price:"497 €", bonus:true },
  { name:"Script \"Fermeture Inbound\"", desc:"Comment répondre au téléphone quand un client chaud appelle depuis Google Maps. Pour ne plus perdre des devis à cause d'une mauvaise première phrase.", price:"349 €", bonus:true },
];

const DIFF_ROWS = [
  ["Gestion à distance depuis Paris ou Lyon", "Déplacement physique chez vous, à Tours"],
  ["Photos de banque d'images génériques", "Vidéos tournées dans votre établissement"],
  ["Rapport PDF de 50 pages illisible", "Une page. Ce mois-ci. Vos chiffres."],
  ["« Top 3 en 14 jours » — promesse illégale", "Progression documentée, mois par mois"],
  ["Le même service pour tous les métiers", "1 partenaire par métier et par secteur. Point."],
  ["Contrat annuel impossible à quitter", "Libre après 3 mois. On mérite votre confiance."],
];

const STEPS = [
  { h:"Audit gratuit de votre fiche — sous 48h", p:<>On analyse votre position actuelle et celle de vos concurrents dans votre secteur précis. On vous dit où vous en êtes. <strong>Sans engagement, sans baratin.</strong></> },
  { h:"Tournage sur site — 90 minutes", p:<>On vient chez vous. On s'adapte à votre planning, pas l'inverse. <strong>Vous continuez à travailler — on vous filme en train de le faire.</strong></> },
  { h:"Mise en ligne et optimisation", p:<>Votre fiche est reconfigurée, les vidéos publiées, les signaux envoyés à Google. <strong>Votre point de départ est documenté — vous saurez toujours d'où vous êtes partis.</strong></> },
  { h:"Rapport mensuel — une page", p:<>Positions, tendances, ajustements. Lisible en 2 minutes. <strong>Pas un rapport de consultant.</strong></> },
  { h:"Votre téléphone sonne", p:<>De vrais clients. Dans votre secteur. Pour les chantiers que vous voulez. <strong>C'est pour ça qu'on fait ce travail.</strong></> },
];

/* ─────────────────────────────────────────────
   HOOK — Scroll Reveal
───────────────────────────────────────────── */
function useReveal(rootRef) {
  useEffect(() => {
    const target = rootRef?.current ?? document;
    const els = target.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [rootRef]);
}

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M15.5 12.4A7 7 0 0 1 5.6 2.5a7 7 0 1 0 9.9 9.9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);
const ArrowIcon = ({size=16}) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const PhoneIcon = ({size=14}) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M12.8 10a1.2 1.2 0 0 1-1.2 1.2A12 12 0 0 1 1.2 1.4 1.2 1.2 0 0 1 2.4.2H4.6L5.8 3.2l-1.6.8a8.8 8.8 0 0 0 5.2 5.2l.8-1.6 3 1.2-.2.2z" fill="currentColor"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L4 5v4c0 4.5 2.5 8.7 6 10 3.5-1.3 6-5.5 6-10V5L10 2z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const WAIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function Nav({ theme, onToggle }) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);
  
  return (
    <nav className={`km-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="km-logo">
        <img 
          src="/logo-kapta-btp.png" 
          alt="Kapta Media BTP" 
          width="32" 
          height="32"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{ 
            width: window.innerWidth < 640 ? '24px' : '32px', 
            height: 'auto', 
            marginRight: '3px',
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            WebkitTouchCallout: 'none'
          }}
        />
        <span style={{ 
          fontWeight: 900, 
          color: theme === 'dark' ? '#F2EDE0' : '#000', 
          letterSpacing: '0.02em',
          fontSize: window.innerWidth < 640 ? '1rem' : '1.3rem'
        }}>KAPTA</span>
        <span style={{ 
          fontStyle: 'italic', 
          fontWeight: 700,
          fontSize: window.innerWidth < 640 ? '.95rem' : '1.2rem',
          marginLeft: '0px',
          background: 'linear-gradient(135deg, #FF6B30 0%, #F0521A 70%, #FF8C5A 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 6px rgba(255, 107, 48, 0.35))',
          transform: 'skewX(-5deg)',
          display: 'inline-block',
          letterSpacing: '0.01em'
        }}>média</span>
      </div>
      <div className="km-nav-right">
        <button className="km-theme-btn" onClick={onToggle} aria-label="Changer de thème">
          {theme === "dark" ? <MoonIcon /> : <SunIcon />}
        </button>
        <a href="#cta-final" className="km-nav-btn">Audit gratuit</a>
      </div>
    </nav>
  );
}

function LiveCard({ delay, tag, stat, desc, isNumber }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!isNumber || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Parse the target number
            let target = 0;
            let suffix = '';
            
            if (stat === '88%') {
              target = 88;
              suffix = '%';
            } else if (stat === '×4') {
              target = 4;
              suffix = '×';
            } else if (stat === '90 min') {
              target = 90;
              suffix = ' min';
            }

            // Animate from 0 to target
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;
            
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                setCount(target);
                clearInterval(timer);
              } else {
                setCount(Math.floor(current));
              }
            }, stepDuration);

            return () => clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [stat, isNumber, hasAnimated]);

  const displayStat = () => {
    if (!isNumber) return stat;
    
    if (stat === '88%') {
      return `${count}%`;
    } else if (stat === '×4') {
      return count === 0 ? '×0' : `×${count}`;
    } else if (stat === '90 min') {
      return `${count} min`;
    }
    return stat;
  };

  return (
    <div ref={cardRef} className={`live-card reveal ${delay}`}>
      <div className="lc-tag">{tag}</div>
      <div className="lc-stat">{displayStat()}</div>
      <div className="lc-desc">{desc}</div>
    </div>
  );
}

function Hero() {
  const PHOTOS = [
    { label: "Chantier 1", src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=300&fit=crop&q=75&auto=format" },
    { label: "Plombier", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop&q=75&auto=format" },
    { label: "Électricité", src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=300&fit=crop&q=75&auto=format" },
    { label: "Tournage", src: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=300&h=300&fit=crop&q=75&auto=format" },
    { label: "Cuisine", src: "https://images.unsplash.com/photo-1534398079543-7ae6d016b86a?w=300&h=300&fit=crop&q=75&auto=format" },
  ];

  return (
    <section id="hero">
      {/* Watermark */}
      <div className="hero-watermark" aria-hidden="true">1er</div>

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
          <a href="#cta-final" className="btn-primary">
            <ArrowIcon size={14}/>
            Voir si ma zone est libre
          </a>
          <button onClick={() => document.getElementById('call-modal').classList.add('active')} className="btn-ghost">
            <PhoneIcon size={13}/>
            J'appelle
          </button>
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
          <div key={i} className="strip-photo">
            {i === 0 && (
              <div className="strip-badge">
                <span className="strip-badge-val">88%</span>
                <span className="strip-badge-lbl">appellent le 1er</span>
              </div>
            )}
            <img 
              src={p.src} 
              alt={p.label}
              loading="lazy"
              decoding="async"
            />
            <div className="strip-label">{p.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Ticker() {
  const items = [
    <><span>97%</span> des clients cherchent sur Google avant d'appeler &nbsp;·</>,
    <><span>88%</span> cliquent sur les 3 premiers résultats seulement &nbsp;·</>,
    <>Vous êtes <span>en quelle position</span> ce soir ? &nbsp;·</>,
    <><span>Tours</span> · Joué-lès-Tours · Saint-Cyr · Fondettes &nbsp;·</>,
    <><span>1 seul</span> partenaire par métier et par secteur &nbsp;·</>,
  ];
  return (
    <div className="km-ticker" aria-hidden="true">
      <div className="ticker-track">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="ticker-item">{item}</div>
        ))}
      </div>
    </div>
  );
}

function QuestionSection() {
  return (
    <section id="question" className="km-section">
      <div className="km-wrap">
        <div className="q-layout">
          <div>
            <span className="km-label">Le moment d'honnêteté</span>
            <h2 className="q-giant reveal">Tapez votre métier sur Google Maps.<br/>Vous êtes où ?</h2>
            <p className="q-sub reveal d1">Si vous n'êtes pas dans les 3 premiers résultats, vos futurs clients ne vous verront jamais.</p>
            <p className="maps-caption reveal d2">
              Ce n'est pas un problème de réputation.<br/>
              <strong>C'est un problème de visibilité. Et ça, c'est réparable.</strong>
            </p>
          </div>
          <div className="reveal d1">
            <div className="gmaps-mock" aria-label="Illustration résultat Google Maps">
              <div className="gmaps-header">
                <div className="gmaps-search">
                  <div className="gmaps-dot"/>
                  plombier Tours · résultats de la carte
                </div>
              </div>
              {[
                { cls:"competitor", rank:"1", name:"Martin Plomberie · Tours Nord", stars:5, rating:"4.9 · 47 avis", tag:"Disponible cette semaine" },
                { cls:"competitor", rank:"2", name:"Dupont Chauffage & Plomberie", stars:4, rating:"4.6 · 31 avis", tag:"Vidéo du chantier" },
                { cls:"you", rank:"?", name:"Votre entreprise — introuvable", stars:0, rating:"Fiche non optimisée", tag:"Aucune vidéo · Aucun post récent" },
              ].map(r => (
                <div key={r.rank} className={`gmap-result ${r.cls}`}>
                  <div className="gr-rank">{r.rank}</div>
                  <div className="gr-body">
                    <div className="gr-name">{r.name}</div>
                    <div className="gr-stars">
                      {[1,2,3,4,5].map(i => <span key={i} className={`gr-star${i > r.stars ? " g" : ""}`}>★</span>)}
                      <span className="gr-rating">{r.rating}</span>
                    </div>
                    <div className="gr-tag">{r.tag}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  return (
    <div id="strip">
      <div className="strip-bg-num" aria-hidden="true">88</div>
      <div className="km-wrap strip-inner">
        <div className="strip-stat reveal">88%</div>
        <p className="strip-label reveal d1">
          des gens qui cherchent un artisan sur Google <strong>appellent l'un des 3 premiers résultats — sans regarder plus loin.</strong>
          <br/><br/>Combien de fois c'était vous cette semaine ?
        </p>
      </div>
    </div>
  );
}

function Solution() {
  const piliers = [
    {
      num:"01", kicker:"Ce que personne d'autre ne peut faire",
      h: <>On vient chez vous.<br/>Ça vous prend 90 minutes.</>,
      p: <>Pas depuis un bureau à Paris. Pas avec des photos de banque d'images d'un plombier en tenue trop propre. <strong>On se déplace dans votre atelier, sur votre chantier, dans votre showroom.</strong> On filme votre vrai travail pendant que vous continuez à bosser. C'est tout ce qu'on vous demande. Le reste — montage, publication, distribution — c'est notre affaire.</>,
      items: [
        <><strong>90 minutes de votre temps</strong> sur site, on gère tout le reste</>,
        <>On en sort 10 à 15 clips courts publiés sur les 6 mois suivants</>,
        <>Vos vraies images, pas des photos génériques trouvées sur internet</>,
        <><strong>+73% de clics</strong> sur les fiches avec vidéo vs celles sans vidéo</>,
      ]
    },
    {
      num:"02", kicker:"Pendant ce temps, vous travaillez",
      h: <>On gère votre fiche.<br/>Chaque semaine. Sans vous déranger.</>,
      p: <>Google favorise les fiches actives. Une fiche qui n'a pas bougé depuis 6 mois descend dans les résultats. C'est la mécanique de notre <strong>Méthode GVA™ (Google · Vidéo · Avis)</strong> : les trois piliers s'alimentent mutuellement. Sans vidéo, la fiche est invisible. Sans avis, la vidéo ne convertit pas. Sans suivi continu, les deux s'effondrent. On gère les trois. Vous, vous répondez aux appels.</>,
      items: [
        <>Publications hebdomadaires sur votre fiche Google</>,
        <>Réponse professionnelle à chaque avis client (bons et mauvais)</>,
        <>Suivi de votre classement face à vos concurrents nommément</>,
        <>Rapport mensuel d'une page — vous savez exactement où vous en êtes</>,
      ]
    }
  ];
  return (
    <section id="solution">
      {piliers.map(p => (
        <div key={p.num} className="pilier reveal">
          <div className="pilier-num" aria-hidden="true">{p.num}</div>
          <div className="pilier-body">
            <span className="pilier-kicker">{p.kicker}</span>
            {p.stat && (
              <div className="pilier-stat-badge">
                <span className="psb-value">{p.stat.value}</span>
                <span className="psb-label">{p.stat.label}</span>
              </div>
            )}
            <h3 className="pilier-h">{p.h}</h3>
            <p className="pilier-p">{p.p}</p>
            <ul className="pilier-items">
              {p.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}

function Diff() {
  return (
    <section id="diff" className="km-section">
      <div className="km-wrap">
        <span className="km-label reveal">Ce qui change tout</span>
        <h2 className="diff-h reveal">Kapta n'est pas<br/>une agence comme les autres.<br/><em>On n'a pas peur de le dire.</em></h2>
        <div className="diff-table-wrap reveal">
          <div className="diff-header-row">
            <div className="diff-th them">Ce que font les autres</div>
            <div className="diff-th us">Kapta Media</div>
          </div>
          {DIFF_ROWS.map(([them, us]) => (
            <div key={them} className="diff-row">
              <div className="diff-cell them">{them}</div>
              <div className="diff-cell us">{us}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const [msgs, setMsgs] = useState(SMS_CONVOS[0].msgs);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0);

  const switchTo = (idx) => {
    setActive(idx);
    setMsgs([]);
    setProgress(0);
    setTimeout(() => { setMsgs(SMS_CONVOS[idx].msgs); setKey(k => k + 1); }, 50);
  };

  // Auto-switch every 8 seconds with progress bar
  useEffect(() => {
    const duration = 8000; // 8 seconds
    const interval = 50; // Update every 50ms
    const increment = (interval / duration) * 100;
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    const switchTimer = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % SMS_CONVOS.length;
        setMsgs([]);
        setTimeout(() => { setMsgs(SMS_CONVOS[next].msgs); setKey(k => k + 1); }, 50);
        return next;
      });
      setProgress(0);
    }, duration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(switchTimer);
    };
  }, []);

  const convo = SMS_CONVOS[active];
  return (
    <section id="proof" className="km-section">
      <div className="km-wrap">
        <div className="proof-layout">
          <div className="proof-text-col">
            <span className="km-label">Ce qu'ils disent — sans filtre</span>
            <h2 className="reveal">Des artisans tourangeaux.<br/>Des mots vrais.</h2>
            <p className="reveal d1">On ne met pas de témoignages en étoiles sur fond blanc. On vous montre les vraies conversations.</p>
            <div className="proof-metrics reveal d2">
              {[["×4","appels reçus en 3 mois"],["90j","suivi & optimisation"],["12+","secteurs couverts"]].map(([v,l]) => (
                <div key={v} className="pm-cell"><span className="pm-val">{v}</span><div className="pm-label">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="sms-phone reveal d1">
            <div className="sms-topbar">
              <div className="sms-avatar">{convo.init}</div>
              <div><div className="sms-name">{convo.name}</div><div className="sms-job">{convo.job}</div></div>
            </div>
            <div className="sms-body" key={key}>
              {msgs.map((m, i) => (
                <div key={i} className={`bubble ${m.c}`} style={{ opacity: 0, transform:"translateY(8px)", transition:`opacity .3s ${i*0.12}s, transform .3s ${i*0.12}s`, animation:`none` }}
                  ref={el => { if (el) requestAnimationFrame(() => requestAnimationFrame(() => { el.style.opacity="1"; el.style.transform="translateY(0)"; })); }}>
                  {m.text}
                  <div className="bubble-time">{m.time}</div>
                </div>
              ))}
            </div>
            <div className="sms-nav">
              <div className="sms-progress-bar">
                <div className="sms-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              {SMS_CONVOS.map((c, i) => (
                <button key={i} className={`sms-tab${active===i?" active":""}`} onClick={() => switchTo(i)}>{c.name.split(" ")[0]} {c.name.split(" ")[1]}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef(null);

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

          {/* Photo column */}
          <div className="about-photo-col about-reveal">
            {/* Mobile: Titre avant la photo */}
            <div className="about-mobile-header">
              <span className="about-eyebrow-mobile">Qui sommes-nous</span>
              <h2 className="about-name-mobile">Charly S.</h2>
            </div>

            <div className="about-photo-wrap">
              <div className="about-photo-placeholder">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="18" r="9" stroke="currentColor" strokeWidth="2"/>
                  <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Votre photo ici
              </div>
              <div className="about-photo-accent" />
            </div>

            <div className="about-avail">
              <div className="about-avail-dot" />
              <div className="about-avail-text">
                <strong>Disponible à Tours</strong>
                Accepte de nouveaux clients — 1 par secteur
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="about-copy">
            <span className="about-eyebrow about-reveal">Derrière Kapta Media</span>

            <h2 className="about-name about-reveal">
              Charly S.
            </h2>
            <p className="about-title about-reveal d1">
              Expert Google Maps & Production vidéo terrain · Tours
            </p>

            <p className="about-intro about-reveal d1">
              Kapta Media, ce n'est pas une agence classique avec des bureaux et des commerciaux.
              C'est <strong>un entrepreneur entouré de freelances spécialisés — vidéaste, rédacteur SEO, développeur.</strong> Chacun expert dans son domaine.
              <br /><br />
              On a construit la Méthode GVA™ après avoir observé le même schéma en boucle : des artisans excellents
              dans leur métier, invisibles sur Google Maps. Pas par manque de qualité.
              Par manque de visibilité. <strong>Ce problème-là, on sait le régler.</strong>
            </p>

            <div className="about-quote about-reveal d2">
              <p>
                On se déplace chez vous parce que c'est la seule façon d'obtenir
                ce qu'aucun algorithme ne peut fabriquer — la preuve que vous
                savez vraiment ce que vous faites.
              </p>
              <cite>— Charly D. Silva, fondateur Kapta Media</cite>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="offer" className="km-section">
      <div className="km-wrap">
        <span className="km-label">L'offre</span>
        <p className="offer-hook reveal">On vous demande <strong>90 minutes.</strong><br/>On vous livre une infrastructure qui aspire les appels de vos concurrents.</p>
        
        <div className="offer-simple-scroll reveal d1">
          <div className="offer-simple-card">
            <div className="osc-icon">📹</div>
            <div className="osc-title">On filme chez vous</div>
            <div className="osc-desc">90 minutes sur votre chantier</div>
          </div>
          <div className="offer-simple-card">
            <div className="osc-icon">🎬</div>
            <div className="osc-title">On monte les vidéos</div>
            <div className="osc-desc">10-15 clips pour Google Maps</div>
          </div>
          <div className="offer-simple-card">
            <div className="osc-icon">🔧</div>
            <div className="osc-title">On optimise tout</div>
            <div className="osc-desc">Fiche Google + notre recette secrète</div>
          </div>
          <div className="offer-simple-card">
            <div className="osc-icon">📞</div>
            <div className="osc-title">Vous recevez les appels</div>
            <div className="osc-desc">De vrais clients, prêts à payer</div>
          </div>
        </div>

        <div className="offer-secret-note reveal d2">
          <div className="osn-icon">🤫</div>
          <div className="osn-text">
            <strong>Notre recette secrète ?</strong> C'est ce qui fait qu'on ne peut pas prendre tout le monde. 
            Un seul partenaire par métier et par zone. Si on vous dit comment ça marche en détail, 
            vos concurrents pourraient copier. Et ça, on préfère éviter.
          </div>
        </div>

        <div className="offer-price-box reveal d3">
          <div className="opb-left">
            <div className="opb-label">Prix tout compris</div>
            <div className="opb-price">1 250 €</div>
            <div className="opb-sub">Paiement unique · Pas d'abonnement obligatoire</div>
          </div>
          <div className="opb-right">
            <div className="opb-guarantee">
              <div className="opb-g-icon">✓</div>
              <div>
                <div className="opb-g-title">Garantie Chantier Signé</div>
                <div className="opb-g-text">Pas de nouveau chantier en 90 jours ? On continue gratuitement.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="offer-cta-row reveal d4">
          <a href="#cta-final" className="offer-cta-main">Je veux déployer le système <ArrowIcon/></a>
          <div className="offer-scarcity">🔥 1 seul créneau cette semaine</div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="km-section">
      <div className="km-wrap">
        <div className="process-layout">
          <div className="sticky-col">
            <span className="km-label">Parlons peu, parlons bien</span>
            <h2 className="section-h reveal">5 étapes.<br/>Zéro prise de tête.<br/><em>Vous n'avez pas à devenir expert en Google.</em></h2>
            <p className="section-sub reveal d1">On gère. Vous bossez. C'est la répartition des rôles.</p>
          </div>
          <div className="timeline">
            {STEPS.map((s, i) => (
              <div key={i} className={`tl-step reveal d${Math.min(i,4)}`}>
                <div className="tl-n">{i+1}</div>
                <div className="tl-content">
                  <div className="tl-h">{s.h}</div>
                  <p className="tl-p">{s.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ prenom:"", metier:"", tel:"" });

  const handleSubmit = () => {
    if (!form.prenom || !form.metier || !form.tel) { alert("Merci de remplir tous les champs."); return; }
    setSubmitted(true);
  };

  return (
    <section id="cta-final" style={{ padding:"80px 0 0", background:"var(--bg)", transition:"background var(--tr)" }}>
      <div className="km-wrap">
        <div className="cta-layout">
          <div>
            <span className="km-label">Dernière chose</span>
            <p className="cta-alarm reveal">
              Votre concurrent vient peut-être<br/>de recevoir<br/><em>cet audit gratuit.</em>
            </p>
            <p className="cta-sub reveal d1">On n'accepte qu'un seul partenaire par métier et par secteur géographique. Une fois votre zone attribuée, c'est fermé. On vous le dit immédiatement si c'est déjà le cas.</p>
            <div className="phone-block reveal d1">
              <div className="phone-lbl">Appel direct — le plus rapide</div>
              <a href="tel:+33686018054" className="phone-num">
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <circle cx="15" cy="15" r="15" fill="rgba(240,82,26,.15)"/>
                  <path d="M21 18.4a1.6 1.6 0 0 1-1.6 1.6A15 15 0 0 1 8 7.6 1.6 1.6 0 0 1 9.6 6h2.6l1.2 2.8-1.8.9a10.4 10.4 0 0 0 5.9 5.9l.9-1.8 2.8 1.2-.2.4z" fill="#F0521A"/>
                </svg>
                06 86 01 80 54
              </a>
              <a href="https://wa.me/33686018054?text=Bonjour%20je%20voudrais%20savoir%20si%20ma%20zone%20est%20disponible" className="wa-inline" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                Ou par WhatsApp · Réponse rapide
              </a>
            </div>
            <div className="or-div reveal d2"><span>Ou remplissez le formulaire</span></div>
          </div>
          <div className="km-form reveal d1">
            <div className="km-form-title">Audit gratuit de votre fiche Google Maps</div>
            <div className="km-fg">
              <label>Prénom</label>
              <input type="text" placeholder="Pascal" value={form.prenom} onChange={e=>setForm({...form,prenom:e.target.value})} autoComplete="given-name"/>
            </div>
            <div className="km-fg">
              <label>Votre activité</label>
              <select value={form.metier} onChange={e=>setForm({...form,metier:e.target.value})}>
                <option value="" disabled>Choisissez</option>
                {["Plombier-chauffagiste","Électricien","Installateur pompe à chaleur","Cuisiniste","Pisciniste","Aménagement intérieur / showroom","Autre artisan du bâtiment"].map(m=><option key={m}>{m}</option>)}
              </select>
            </div>
            <div className="km-fg">
              <label>Téléphone</label>
              <input type="tel" placeholder="06 XX XX XX XX" value={form.tel} onChange={e=>setForm({...form,tel:e.target.value})} autoComplete="tel"/>
            </div>
            <button className="km-submit" onClick={handleSubmit} disabled={submitted}>
              {submitted ? "✓ Demande reçue — réponse sous 48h" : <>Vérifier si ma zone est encore libre <ArrowIcon size={15}/></>}
            </button>
            <p className="km-privacy">Sans engagement · Réponse sous 48h · Données confidentielles</p>
          </div>
        </div>
      </div>
      <div className="scarcity-bar">
        <div className="sc-dot">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.5 3.1 3.5.5-2.5 2.4.6 3.5L6 8.8l-3.1 1.7.6-3.5L1 4.6l3.5-.5L6 1z" fill="rgba(12,12,9,.65)"/></svg>
        </div>
        <p>1 seul partenaire par métier et par secteur géographique.
        <span>Plombier Joué-lès-Tours, électricien Saint-Cyr, cuisiniste Tours — chaque zone est unique. Si la vôtre est prise, on vous le dit en 24h.</span></p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="km-footer">
      <div className="footer-inner">
        <div className="footer-logo"><div className="fl-dot"/>&nbsp;Kapta Media</div>
        <p className="footer-copy">© 2026 Kapta Media · Tours, Indre-et-Loire</p>
        <div className="footer-links">
          <a href="#">Mentions légales</a>
          <a href="#">Confidentialité</a>
          <a href="#">Nos offres</a>
          <a href="#cta-final">Contact</a>
        </div>
      </div>
    </footer>
  );
}

function WaFloat() {
  const [showBubble, setShowBubble] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    // Afficher la bulle avec animation typing après 30 secondes
    const showTimer = setTimeout(() => {
      setShowBubble(true);
      setIsTyping(true);
    }, 30000);
    
    // Afficher le message après 2 secondes de typing
    const messageTimer = setTimeout(() => {
      setIsTyping(false);
      setShowMessage(true);
    }, 32000);
    
    // Masquer la bulle après 15 secondes au total
    const hideTimer = setTimeout(() => {
      setShowBubble(false);
      setShowMessage(false);
    }, 47000);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(messageTimer);
      clearTimeout(hideTimer);
    };
  }, []);
  
  const closeBubble = () => {
    setShowBubble(false);
    setShowMessage(false);
    setIsTyping(false);
  };
  
  return (
    <div className="wa-float">
      {showBubble && (
        <div className={`wa-bubble ${isTyping ? 'typing' : ''}`} style={{ opacity: showBubble ? 1 : 0 }}>
          {showMessage && (
            <button 
              onClick={closeBubble}
              className="wa-bubble-close"
              aria-label="Fermer"
            >
              ×
            </button>
          )}
          {isTyping ? (
            <div className="wa-typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : showMessage ? (
            <div className="wa-bubble-text">
              Votre concurrent est peut-être déjà en train de nous écrire.
            </div>
          ) : null}
        </div>
      )}
      <a href="https://wa.me/33686018054?text=Salut%20Charly%2C%20je%20veux%20savoir%20si%20ma%20zone%20est%20encore%20dispo" className="wa-float-btn" target="_blank" rel="noopener noreferrer" aria-label="Contacter par WhatsApp">
        <WAIcon/>
      </a>
    </div>
  );
}

function CallModal() {
  const closeModal = () => {
    document.getElementById('call-modal').classList.remove('active');
  };

  return (
    <div id="call-modal" className="call-modal-overlay" onClick={closeModal}>
      <div className="call-modal" onClick={(e) => e.stopPropagation()}>
        <button className="call-modal-close" onClick={closeModal} aria-label="Fermer">×</button>
        
        <div className="call-modal-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h3 className="call-modal-title">Appeler Charly ?</h3>
        <div className="call-modal-phone">06 86 01 80 54</div>
        <p className="call-modal-subtitle">
          Disponible maintenant · Réponse rapide · Sans engagement
        </p>

        <div className="call-modal-actions">
          <a href="tel:+33686018054" className="call-modal-btn call-modal-btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Appeler maintenant
          </a>
          <button onClick={closeModal} className="call-modal-btn call-modal-btn-secondary">
            Pas maintenant
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function KaptaMedia() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("km-theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"); }
    catch { return "dark"; }
  });

  const rootRef = useRef(null);
  useReveal(rootRef);

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const next = t === "dark" ? "light" : "dark";
      try { localStorage.setItem("km-theme", next); } catch {}
      return next;
    });
  }, []);

  // Inject CSS once
  useEffect(() => {
    const id = "kapta-media-styles";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    
    // Add favicon - BTP specific
    const existingFavicon = document.querySelector('link[rel="icon"]');
    if (!existingFavicon) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.type = "image/png";
      favicon.href = "/logo-kapta-btp.png";
      document.head.appendChild(favicon);
      
      const appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      appleTouchIcon.href = "/logo-kapta-btp.png";
      document.head.appendChild(appleTouchIcon);
    }
    
    // SEO Meta Tags
    document.title = "Kapta Media BTP — Visibilité Google Maps pour Artisans à Tours";
    
    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDesc.name = "description";
    metaDesc.content = "Optimisation Google Maps pour artisans BTP à Tours. Vidéo pro + fiche Google optimisée. Résultats visibles en 14 jours. Devenez N°1 dans votre zone.";
    if (!metaDesc.parentNode) document.head.appendChild(metaDesc);
    
    // Meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "SEO local Tours, Google Maps BTP, visibilité artisan, plombier Tours, électricien Tours, maçon Tours, vidéo professionnelle, fiche Google optimisée";
    if (!metaKeywords.parentNode) document.head.appendChild(metaKeywords);
    
    // Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "Kapta Media BTP — Devenez N°1 sur Google Maps à Tours";
    if (!ogTitle.parentNode) document.head.appendChild(ogTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    ogDesc.content = "Votre concurrent est premier sur Google Maps. On règle ça avec une vidéo pro + une fiche optimisée. Résultats en 14 jours.";
    if (!ogDesc.parentNode) document.head.appendChild(ogDesc);
    
    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = "website";
    if (!ogType.parentNode) document.head.appendChild(ogType);
    
    const ogUrl = document.querySelector('meta[property="og:url"]') || document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    ogUrl.content = "https://kaptamedia.fr/btp";
    if (!ogUrl.parentNode) document.head.appendChild(ogUrl);
    
    const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
    ogImage.setAttribute('property', 'og:image');
    ogImage.content = "https://kaptamedia.fr/logo-kapta-btp.png";
    if (!ogImage.parentNode) document.head.appendChild(ogImage);
    
    // Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]') || document.createElement('meta');
    twitterCard.name = "twitter:card";
    twitterCard.content = "summary_large_image";
    if (!twitterCard.parentNode) document.head.appendChild(twitterCard);
    
    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]') || document.createElement('link');
    canonical.rel = "canonical";
    canonical.href = "https://kaptamedia.fr/btp";
    if (!canonical.parentNode) document.head.appendChild(canonical);
    
    // Language
    document.documentElement.lang = "fr";
    
    // Viewport (should already exist but ensure it's correct)
    const viewport = document.querySelector('meta[name="viewport"]') || document.createElement('meta');
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=5.0";
    if (!viewport.parentNode) document.head.appendChild(viewport);
    
    // Structured Data (JSON-LD)
    const existingSchema = document.querySelector('script[type="application/ld+json"]');
    if (!existingSchema) {
      const schema = document.createElement('script');
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Kapta Media",
        "description": "Agence de marketing local et optimisation Google Maps pour artisans BTP à Tours",
        "url": "https://kaptamedia.fr/btp",
        "telephone": "+33686018054",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Tours",
          "addressRegion": "Centre-Val de Loire",
          "addressCountry": "FR"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "47.3941",
          "longitude": "0.6848"
        },
        "areaServed": {
          "@type": "City",
          "name": "Tours"
        },
        "priceRange": "€€",
        "openingHours": "Mo-Fr 09:00-18:00",
        "sameAs": [
          "https://wa.me/33686018054"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "47"
        },
        "offers": {
          "@type": "Offer",
          "name": "Optimisation Google Maps pour Artisans BTP",
          "description": "Vidéo professionnelle + Fiche Google optimisée + Suivi mensuel",
          "price": "497",
          "priceCurrency": "EUR"
        }
      });
      document.head.appendChild(schema);
    }
    
    // Hide preloader after initial load
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Re-observe reveals on theme change (DOM is same, just re-trigger)
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal:not(.in)") ?? [];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [theme]);

  return (
    <>
      {/* Preloader */}
      <div 
        className={`km-preloader ${!loading ? 'hidden' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0C0C09',
          zIndex: 99999,
          display: loading ? 'flex' : 'none'
        }}
      >
        <div className="km-preloader-logo">
          <img 
            src="/logo-kapta-btp.png" 
            alt="Kapta Media BTP" 
            width="120" 
            height="120"
            style={{ width: '80px', height: 'auto' }}
          />
        </div>
        <div className="km-preloader-spinner" />
        <div className="km-preloader-text">Chargement...</div>
      </div>
      
      <div ref={rootRef} className={`km-root ${theme}`} style={{ display: loading ? 'none' : 'block' }}>
        <Nav theme={theme} onToggle={toggleTheme}/>
        <Hero/>
        <Ticker/>
        <QuestionSection/>
        <Strip/>
        <Solution/>
        <Diff/>
        <Testimonials/>
        <AboutSection/>
        <Offer/>
        <Process/>
        <CtaFinal/>
        <Footer/>
        <WaFloat/>
        <CallModal/>
      </div>
    </>
  );
}
