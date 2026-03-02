import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════════
   KAPTA MEDIA — V3
   Structure 2026 validée par recherche :
   Hero → Problème → Solution → Process → Équipe
   → Preuves → Offre → FAQ → CTA

   Hero : 1 accroche / 1 sous-titre / 1 CTA
════════════════════════════════════════════════════ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}

.km{
  --bg:#0C0C09;--bg2:#131310;--bg3:#1C1C17;
  --bone:#F0EBE0;--muted:#6B6760;--faint:#323230;--line:rgba(240,235,224,.07);
  --fire:#F0521A;--fire2:#FF6B35;
  --nav-h:64px;
  --ff:'Bricolage Grotesque',sans-serif;
  --ease:cubic-bezier(.4,0,.2,1);
  --tr:.3s var(--ease);
  font-family:var(--ff);
  background:var(--bg);color:var(--bone);
  overflow-x:hidden;-webkit-font-smoothing:antialiased;
}
.km.light{
  --bg:#F5F0E8;--bg2:#EDE8DE;--bg3:#E3DDD2;
  --bone:#1A1815;--muted:#7A7470;--faint:#D0CAC0;--line:rgba(26,24,21,.09);
}

a{color:inherit;text-decoration:none}
button{font-family:inherit;cursor:pointer;border:none;background:none}

/* ── Layout ── */
.w{width:100%;max-width:1060px;margin:0 auto;padding:0 20px}
section{padding:90px 0}
@media(max-width:700px){section{padding:64px 0}}

/* ── Label ── */
.label{
  display:inline-flex;align-items:center;gap:9px;
  font-size:.6rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;
  color:var(--fire);margin-bottom:18px;
}
.label::before{content:'';width:18px;height:2px;background:var(--fire)}

/* ════════════════════
   NAV
════════════════════ */
.nav{
  position:fixed;top:0;left:0;right:0;z-index:600;height:var(--nav-h);
  display:flex;align-items:center;justify-content:space-between;padding:0 20px;
  border-bottom:1px solid var(--line);
  background:rgba(12,12,9,.85);backdrop-filter:blur(18px);
  transition:background var(--tr),border-color var(--tr);
}
.light .nav{background:rgba(245,240,232,.9)}
.logo{font-weight:800;font-size:.88rem;display:flex;align-items:center;gap:7px}
.logo-icon{width:20px;height:20px;flex-shrink:0;animation:pulse 2.4s infinite}
.foot-icon{width:16px;height:16px;flex-shrink:0}
@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.15);opacity:.75}}
.nav-r{display:flex;align-items:center;gap:10px}
.theme-btn{
  width:36px;height:36px;border-radius:50%;
  border:1px solid var(--line);background:var(--bg3);color:var(--muted);
  display:flex;align-items:center;justify-content:center;
  transition:color .2s,border-color .2s,background var(--tr);
}
.theme-btn:hover{color:var(--bone)}
.nav-cta{
  background:var(--fire);color:#fff;font-weight:800;font-size:.7rem;
  letter-spacing:.06em;text-transform:uppercase;padding:10px 16px;border-radius:2px;
  transition:background .2s;
}
.nav-cta:hover{background:var(--fire2)}

/* ════════════════════
   HERO — épuré / 1 message
════════════════════ */
#hero{
  min-height:100svh;padding-top:var(--nav-h);
  display:flex;flex-direction:column;justify-content:center;
  position:relative;overflow:hidden;
}
@media(min-width:1024px){
  #hero{
    min-height:85vh;
    padding-top:calc(var(--nav-h) + 20px);
    padding-bottom:40px;
  }
}

/* Grille blueprint subtile */
.hero-bg{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(240,82,26,.035) 1px,transparent 1px),
    linear-gradient(90deg,rgba(240,82,26,.035) 1px,transparent 1px);
  background-size:72px 72px;
  mask-image:radial-gradient(ellipse 65% 65% at 50% 45%,black 0%,transparent 100%);
  -webkit-mask-image:radial-gradient(ellipse 65% 65% at 50% 45%,black 0%,transparent 100%);
}
.light .hero-bg{
  background-image:
    linear-gradient(rgba(240,82,26,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(240,82,26,.05) 1px,transparent 1px);
}

/* Gros texte de fond */
.hero-wordmark{
  position:absolute;bottom:-6%;left:-1%;
  font-weight:800;font-size:clamp(18vw,24vw,280px);
  letter-spacing:-.08em;line-height:.85;
  color:rgba(240,82,26,.028);pointer-events:none;user-select:none;z-index:0;
  transition:color var(--tr);
}
@media(min-width:1024px){
  .hero-wordmark{
    font-size:clamp(12vw,16vw,180px);
    bottom:-4%;
  }
}
.light .hero-wordmark{color:rgba(240,82,26,.05)}

/* Corps hero */
.hero-body{
  position:relative;z-index:2;
  padding:0 20px;max-width:1060px;margin:0 auto;width:100%;
}

/* Pill */
.hero-pill{
  display:inline-flex;align-items:center;gap:8px;
  background:rgba(240,82,26,.1);border:1px solid rgba(240,82,26,.2);
  border-radius:100px;padding:5px 14px 5px 9px;
  margin-bottom:32px;
}
.pill-dot{width:5px;height:5px;border-radius:50%;background:var(--fire);animation:pulse 2s infinite}
.pill-txt{font-size:.62rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:var(--fire)}

/* Headline — UNE seule chose */
.hero-h{
  font-weight:800;
  font-size:clamp(2.6rem,8vw,6rem);
  line-height:1.0;letter-spacing:-.045em;
  max-width:780px;margin-bottom:24px;
}
@media(min-width:1024px){
  .hero-h{
    font-size:clamp(3.2rem,6vw,4.8rem);
    margin-bottom:20px;
  }
}
.hero-h span{display:block}
.hero-h .hero-h-sub{
  font-size:.48em;font-weight:300;color:var(--muted);
  letter-spacing:.005em;margin-top:12px;line-height:1.4;
}
@media(min-width:1024px){
  .hero-h .hero-h-sub{
    margin-top:10px;
  }
}

/* Sous-titre */
.hero-sub{
  font-size:clamp(.95rem,2vw,1.12rem);color:var(--muted);
  line-height:1.7;max-width:460px;margin-bottom:40px;
  font-weight:400;
}
@media(min-width:1024px){
  .hero-sub{
    font-size:1rem;
    max-width:420px;
    margin-bottom:32px;
  }
}
.hero-sub strong{color:var(--bone);font-weight:600}

/* CTA unique */
.btn-primary{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--fire);color:#fff;
  font-weight:800;font-size:.95rem;padding:16px 26px;
  border-radius:2px;transition:background .2s,box-shadow .2s,transform .12s;
  border:none;font-family:var(--ff);
}
.btn-primary:hover{background:var(--fire2);box-shadow:0 10px 36px rgba(240,82,26,.26)}
.btn-primary:active{transform:scale(.97)}

/* Note sous le CTA */
.hero-note{
  margin-top:14px;font-size:.72rem;color:var(--muted);
  display:flex;align-items:center;gap:6px;
}
.hero-note::before{content:'↳';color:var(--fire)}

/* ════════════════════
   IMPACT VISUEL — Maps Split + Stats
════════════════════ */

/* ── Maps Split ── */
#maps-split{
  background:var(--bg);
  border-top:1px solid var(--line);
  transition:background var(--tr),border-color var(--tr);
}

.ms-header{
  text-align:center;padding:60px 20px 40px;
}
.ms-eyebrow{
  display:inline-block;font-size:.6rem;font-weight:800;letter-spacing:.2em;
  text-transform:uppercase;color:var(--muted);margin-bottom:16px;
}
.ms-title{
  font-weight:800;font-size:clamp(1.6rem,4vw,2.6rem);
  letter-spacing:-.04em;line-height:1.1;max-width:520px;margin:0 auto;
}
.ms-title span{color:var(--fire)}

/* Panneau split pleine largeur */
.ms-panels{
  display:grid;grid-template-columns:1fr 1fr;
  border-top:1px solid var(--line);
  transition:border-color var(--tr);
}

.ms-panel{
  padding:36px 28px 40px;
  position:relative;overflow:hidden;
  transition:background var(--tr);
}
.ms-panel.before{background:var(--bg2)}
.ms-panel.after{background:var(--bg3);border-left:1px solid var(--line)}
.light .ms-panel.after{background:var(--bg2)}

/* Étiquette panneau */
.ms-panel-label{
  display:inline-flex;align-items:center;gap:8px;
  font-size:.6rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;
  margin-bottom:24px;
}
.ms-panel.before .ms-panel-label{color:var(--muted)}
.ms-panel.after .ms-panel-label{color:var(--fire)}
.ms-label-dot{
  width:7px;height:7px;border-radius:50%;
}
.ms-panel.before .ms-label-dot{background:var(--muted)}
.ms-panel.after .ms-label-dot{background:var(--fire);animation:pulse 1.8s infinite}

/* Barre de recherche simulée */
.ms-searchbar{
  display:flex;align-items:center;gap:8px;
  background:var(--bg);border:1px solid var(--line);border-radius:24px;
  padding:8px 14px;margin-bottom:16px;
  transition:background var(--tr),border-color var(--tr);
}
.ms-panel.after .ms-searchbar{border-color:rgba(240,82,26,.2)}
.ms-search-ico{color:var(--muted);flex-shrink:0}
.ms-search-txt{font-size:.75rem;color:var(--muted);font-weight:500}

/* Résultats Maps */
.ms-results{display:flex;flex-direction:column;gap:6px}

.ms-result{
  display:flex;align-items:center;gap:10px;
  padding:10px 12px;border-radius:8px;border:1px solid transparent;
  transition:background .3s,border-color .3s,transform .3s;
  position:relative;
}
.ms-result.active{
  background:rgba(240,82,26,.06);border-color:rgba(240,82,26,.2);
}
.ms-result.you-before{
  opacity:.35;
  border-color:var(--line);
}
.ms-result.you-after{
  background:rgba(240,82,26,.1);border-color:rgba(240,82,26,.35);
  animation:youPulse 3s ease-in-out infinite;
}
@keyframes youPulse{0%,100%{box-shadow:0 0 0 0 rgba(240,82,26,0)}50%{box-shadow:0 0 0 6px rgba(240,82,26,.07)}}

.ms-result-pos{
  width:24px;height:24px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:.65rem;flex-shrink:0;
}
.ms-result.active .ms-result-pos,.ms-result.you-after .ms-result-pos{background:var(--fire);color:#fff}
.ms-result:not(.active):not(.you-after) .ms-result-pos{background:var(--faint);color:var(--muted)}

.ms-result-body{flex:1;min-width:0}
.ms-result-name{font-weight:700;font-size:.8rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px}
.ms-result.you-before .ms-result-name,.ms-result.you-before .ms-result-meta{color:var(--muted)}
.ms-result.you-after .ms-result-name{color:var(--fire)}
.ms-result-meta{font-size:.63rem;color:var(--muted);display:flex;align-items:center;gap:5px}
.ms-result-stars{color:#F5A623}

/* Badge YOU */
.you-badge{
  font-size:.56rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  padding:2px 7px;border-radius:100px;flex-shrink:0;
}
.ms-result.you-before .you-badge{background:var(--faint);color:var(--muted)}
.ms-result.you-after .you-badge{background:var(--fire);color:#fff}

/* Appel simulé */
.ms-call-sim{
  display:flex;align-items:center;gap:8px;margin-top:16px;
  padding:10px 12px;border-radius:8px;border:1px solid var(--line);
  font-size:.74rem;font-weight:600;color:var(--muted);
  transition:border-color var(--tr),background var(--tr);
}
.ms-panel.after .ms-call-sim{
  border-color:rgba(52,211,88,.35);background:rgba(52,211,88,.05);color:#34D358;
}
.call-ico{
  width:28px;height:28px;border-radius:50%;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
}
.ms-panel.before .call-ico{background:var(--faint)}
.ms-panel.after .call-ico{background:rgba(52,211,88,.2);animation:ringPulse 2s ease-in-out infinite}
@keyframes ringPulse{0%,100%{transform:scale(1)}40%{transform:scale(1.12)}}

/* Ligne séparatrice verticale avec label */
.ms-divider{
  display:none;
}
@media(min-width:640px){
  .ms-divider{
    display:flex;align-items:center;justify-content:center;
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
    z-index:10;
    width:40px;height:40px;border-radius:50%;
    background:var(--bg2);border:1px solid var(--line);
    font-size:.6rem;font-weight:800;color:var(--muted);
    letter-spacing:.05em;text-transform:uppercase;
    pointer-events:none;
  }
}

/* ── Stats row ── */
.stats-impact{
  display:grid;grid-template-columns:repeat(3,1fr);
  border-top:1px solid var(--line);
  transition:border-color var(--tr);
}
.si-cell{
  padding:36px 24px;text-align:center;
  border-right:1px solid var(--line);
  transition:border-color var(--tr),background var(--tr);
}
.si-cell:last-child{border-right:none}
.si-cell:hover{background:var(--bg2)}

.si-num{
  font-weight:800;font-size:clamp(2.8rem,6vw,4.5rem);
  letter-spacing:-.07em;line-height:1;
  color:var(--fire);display:block;margin-bottom:8px;
}
.si-unit{font-size:.55em;letter-spacing:-.02em;vertical-align:super;margin-right:2px}
.si-label{font-size:.78rem;color:var(--muted);line-height:1.55;font-weight:500}
.si-label strong{display:block;color:var(--bone);font-weight:700;font-size:.9rem;margin-bottom:2px}

/* Responsive panels */
@media(max-width:580px){
  .ms-panels{grid-template-columns:1fr}
  .ms-panel.after{border-left:none;border-top:1px solid var(--line)}
}

/* ════════════════════
   SOLUTION — onglets interactifs
════════════════════ */
#solution{background:var(--bg2);transition:background var(--tr)}

.sol-layout{
  display:flex;flex-direction:column;gap:0;
  border:1px solid var(--line);border-radius:12px;overflow:hidden;
  transition:border-color var(--tr);
}

/* Onglets */
.sol-tabs{
  display:grid;grid-template-columns:repeat(3,1fr);
  border-bottom:1px solid var(--line);
  transition:border-color var(--tr);
  position:relative;
}
/* Indicateur "Cliquez" mobile */
.sol-tabs::before{
  content:'👆 Cliquez pour explorer';
  position:absolute;
  top:-32px;
  left:50%;
  transform:translateX(-50%);
  font-size:.65rem;
  font-weight:700;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--fire);
  background:rgba(240,82,26,.08);
  padding:4px 12px;
  border-radius:100px;
  border:1px solid rgba(240,82,26,.15);
  animation:tapHint 2s ease-in-out infinite;
  pointer-events:none;
}
@keyframes tapHint{
  0%,100%{opacity:.6;transform:translateX(-50%) translateY(0)}
  50%{opacity:1;transform:translateX(-50%) translateY(-2px)}
}
@media(min-width:700px){
  .sol-tabs::before{
    content:'← Cliquez pour changer →';
    top:-28px;
  }
}
.sol-tab{
  padding:22px 20px;cursor:pointer;
  border-right:1px solid var(--line);
  background:var(--bg3);
  transition:background var(--tr),border-color var(--tr),transform .2s;
  position:relative;
}
.sol-tab:hover{
  background:var(--bg2);
  transform:translateY(-2px);
}
.sol-tab:last-child{border-right:none}
.sol-tab.active{background:var(--bg2)}
.sol-tab::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:2px;
  background:var(--fire);transform:scaleX(0);transform-origin:left;
  transition:transform .3s var(--ease);
}
.sol-tab.active::after{transform:scaleX(1)}
/* Icône chevron pour indiquer cliquable */
.sol-tab::before{
  content:'›';
  position:absolute;
  top:50%;
  right:8px;
  transform:translateY(-50%);
  font-size:1.4rem;
  font-weight:800;
  color:var(--muted);
  opacity:0;
  transition:opacity .2s,color .2s;
}
.sol-tab:hover::before{
  opacity:.4;
}
.sol-tab.active::before{
  content:'●';
  opacity:1;
  color:var(--fire);
  font-size:.8rem;
  right:10px;
}
@media(max-width:580px){
  .sol-tab::before{
    right:6px;
    font-size:1.1rem;
  }
  .sol-tab.active::before{
    font-size:.65rem;
    right:8px;
  }
}
.sol-tab-num{
  font-size:.58rem;font-weight:800;letter-spacing:.15em;
  text-transform:uppercase;color:var(--muted);margin-bottom:6px;
  transition:color .2s;
}
.sol-tab.active .sol-tab-num{color:var(--fire)}
.sol-tab-title{font-weight:800;font-size:.88rem;letter-spacing:-.02em;line-height:1.3;transition:color .2s}
.sol-tab:hover .sol-tab-title{color:var(--bone)}
@media(max-width:580px){
  .sol-tab-title{font-size:.75rem}
  .sol-tab{padding:16px 12px}
}

/* Panneau contenu */
.sol-panel{
  display:grid;grid-template-columns:1fr;gap:0;
  transition:background var(--tr);
}
@media(min-width:700px){
  .sol-panel{grid-template-columns:1fr 1fr}
}

.sol-panel-text{
  padding:40px 32px;
  border-right:1px solid var(--line);
  display:flex;flex-direction:column;justify-content:center;
  transition:border-color var(--tr);
}
@media(max-width:700px){
  .sol-panel-text{border-right:none;border-bottom:1px solid var(--line);padding:28px 22px}
}
.sol-panel-num{
  font-weight:800;font-size:4.5rem;letter-spacing:-.1em;line-height:1;
  color:rgba(240,82,26,.1);margin-bottom:16px;
  transition:color var(--tr);
}
.sol-panel-h{font-weight:800;font-size:1.2rem;letter-spacing:-.03em;margin-bottom:12px}
.sol-panel-p{font-size:.88rem;color:var(--muted);line-height:1.75}
.sol-panel-p strong{color:var(--bone);font-weight:600}
.sol-panel-result{
  margin-top:20px;display:inline-flex;align-items:center;gap:8px;
  background:rgba(240,82,26,.07);border:1px solid rgba(240,82,26,.15);
  border-radius:100px;padding:6px 14px;
  font-size:.7rem;font-weight:800;color:var(--fire);
}

/* Démo visuelle droite */
.sol-panel-demo{
  padding:32px 28px;
  display:flex;align-items:center;justify-content:center;
  background:var(--bg3);min-height:280px;
  transition:background var(--tr);
}
@media(max-width:700px){.sol-panel-demo{min-height:220px;padding:24px 20px}}

/* ─ démo 1 : Maps mini ─ */
.demo-maps{width:100%;max-width:280px}
.dm-bar{
  background:var(--bg2);border:1px solid var(--line);border-radius:8px;
  padding:8px 12px;margin-bottom:10px;
  display:flex;align-items:center;gap:7px;
  font-size:.7rem;color:var(--muted);font-weight:500;
  transition:background var(--tr),border-color var(--tr);
}
.dm-rows{display:flex;flex-direction:column;gap:5px}
.dm-row{
  display:flex;align-items:center;gap:8px;
  padding:9px 10px;border-radius:6px;border:1px solid transparent;
  transition:background .4s,border-color .4s;
}
.dm-row.top{
  background:rgba(240,82,26,.08);border-color:rgba(240,82,26,.22);
  animation:dmPop .5s var(--ease) both;
}
@keyframes dmPop{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.dm-pos{
  width:20px;height:20px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:.6rem;flex-shrink:0;
}
.dm-row.top .dm-pos{background:var(--fire);color:#fff}
.dm-row:not(.top) .dm-pos{background:var(--faint);color:var(--muted)}
.dm-name{font-weight:700;font-size:.74rem;flex:1}
.dm-row.top .dm-name{color:var(--fire)}
.dm-stars{font-size:.64rem;color:var(--muted)}

/* ─ démo 2 : vidéo confiance ─ */
.demo-video{width:100%;max-width:280px}
.dv-frame{
  background:var(--bg);border:1px solid var(--line);border-radius:10px;
  overflow:hidden;
  transition:background var(--tr),border-color var(--tr);
}
.dv-thumb{
  height:120px;background:var(--bg2);
  display:flex;align-items:center;justify-content:center;
  position:relative;overflow:hidden;
  transition:background var(--tr);
}
.dv-play{
  width:44px;height:44px;border-radius:50%;
  background:var(--fire);display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 20px rgba(240,82,26,.4);
  animation:playPulse 2.5s ease-in-out infinite;
}
@keyframes playPulse{0%,100%{box-shadow:0 4px 20px rgba(240,82,26,.4)}50%{box-shadow:0 4px 32px rgba(240,82,26,.65)}}
.dv-label{
  position:absolute;top:8px;left:8px;
  background:rgba(12,12,9,.7);backdrop-filter:blur(6px);
  border-radius:4px;padding:3px 8px;
  font-size:.58rem;font-weight:800;color:#fff;letter-spacing:.06em;text-transform:uppercase;
}
.dv-meta{padding:10px 12px;display:flex;flex-direction:column;gap:6px}
.dv-name{font-weight:700;font-size:.78rem}
.dv-trust{display:flex;align-items:center;gap:6px}
.dv-trust-bar{flex:1;height:4px;background:var(--faint);border-radius:2px;overflow:hidden}
.dv-trust-fill{height:100%;background:var(--fire);border-radius:2px;animation:fillBar 1.2s .4s var(--ease) both}
@keyframes fillBar{from{width:0}to{width:87%}}
.dv-trust-label{font-size:.6rem;color:var(--muted);white-space:nowrap}
.dv-trust-pct{font-size:.68rem;font-weight:800;color:var(--fire)}

/* ─ démo 3 : SMS auto ─ */
.demo-sms{width:100%;max-width:260px;display:flex;flex-direction:column;gap:7px}
.ds-bubble{
  padding:9px 12px;border-radius:14px;font-size:.74rem;line-height:1.5;max-width:88%;
  animation:bubbleIn .4s var(--ease) both;
}
@keyframes bubbleIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ds-bubble.missed{
  background:var(--faint);color:var(--muted);
  border-radius:14px 14px 14px 3px;align-self:flex-start;
}
.ds-bubble.auto{
  background:var(--fire);color:#fff;font-weight:500;
  border-radius:14px 14px 3px 14px;align-self:flex-end;
}
.ds-bubble.reply{
  background:var(--bg3);border:1px solid var(--line);
  border-radius:14px 14px 14px 3px;align-self:flex-start;
  transition:background var(--tr),border-color var(--tr);
}
.ds-time{font-size:.55rem;color:var(--muted);margin-top:2px;padding:0 4px}
.ds-tag{
  align-self:flex-end;font-size:.58rem;font-weight:800;
  letter-spacing:.08em;text-transform:uppercase;
  background:rgba(52,211,88,.1);color:#34D358;
  border-radius:100px;padding:3px 9px;margin-top:2px;
}

/* ════════════════════
   PROCESS
════════════════════ */
#process{background:var(--bg);transition:background var(--tr)}
.proc-layout{display:flex;flex-direction:column;gap:48px}
@media(min-width:860px){.proc-layout{display:grid;grid-template-columns:300px 1fr;gap:80px;align-items:start}}
@media(min-width:860px){.proc-sticky{position:sticky;top:84px}}

.proc-intro-h{font-weight:800;font-size:clamp(1.8rem,4.5vw,3rem);line-height:1.06;letter-spacing:-.045em;margin-bottom:14px}
.proc-intro-p{font-size:.88rem;color:var(--muted);line-height:1.74;max-width:260px}

/* Steps */
.steps{display:flex;flex-direction:column;gap:0;padding-left:48px;position:relative}
.steps::before{
  content:'';position:absolute;left:11px;top:14px;bottom:14px;width:1.5px;
  background:linear-gradient(to bottom,var(--fire) 0%,rgba(240,82,26,.04) 100%);
}
.step{margin-bottom:40px;position:relative}
.step:last-child{margin-bottom:0}
.step-num{
  position:absolute;left:-48px;top:1px;
  width:26px;height:26px;border-radius:50%;
  background:var(--fire);color:#fff;
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:.7rem;
}
.step-when{font-size:.6rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--fire);margin-bottom:5px;display:block}
.step-title{font-weight:800;font-size:.96rem;letter-spacing:-.02em;margin-bottom:6px}
.step-p{font-size:.83rem;color:var(--muted);line-height:1.7}
.step-p strong{color:var(--bone);font-weight:500}

/* ════════════════════
   ÉQUIPE — épuré, on-brand
════════════════════ */
#equipe{background:var(--bg2);transition:background var(--tr)}

.eq-wrap{display:flex;flex-direction:column;gap:32px}
@media(min-width:860px){.eq-wrap{flex-direction:row;align-items:stretch;gap:0}}

/* Carte fondateur */
.eq-card{
  background:var(--bg3);border:1px solid var(--line);border-radius:4px;
  overflow:hidden;
  display:flex;flex-direction:column;
  transition:background var(--tr),border-color var(--tr);
  flex:1;
}

/* Monogramme photo */
.eq-mono{
  aspect-ratio:4/3;position:relative;overflow:hidden;
  background:var(--bg);
  display:flex;align-items:center;justify-content:center;
}
@media(min-width:860px){.eq-mono{aspect-ratio:unset;min-height:260px}}
.eq-mono-bg{
  position:absolute;inset:0;
  background-image:
    linear-gradient(rgba(240,82,26,.03) 1px,transparent 1px),
    linear-gradient(90deg,rgba(240,82,26,.03) 1px,transparent 1px);
  background-size:40px 40px;
}
.eq-mono-letter{
  font-size:clamp(6rem,18vw,9rem);font-weight:800;letter-spacing:-.1em;
  color:rgba(240,82,26,.08);position:relative;z-index:1;line-height:1;
  user-select:none;
}
.eq-mono-tag{
  position:absolute;bottom:16px;left:16px;right:16px;
  background:rgba(12,12,9,.82);backdrop-filter:blur(10px);
  border:1px solid rgba(240,235,224,.08);border-radius:3px;
  padding:11px 14px;display:flex;align-items:center;justify-content:space-between;
}
.light .eq-mono-tag{background:rgba(245,240,232,.88);border-color:rgba(26,24,21,.1)}
.emt-name{font-weight:800;font-size:.88rem;line-height:1.2}
.emt-role{font-size:.64rem;color:var(--muted);margin-top:2px;font-weight:500}
.emt-city{font-size:.58rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--fire)}

/* Corps texte */
.eq-body{padding:24px 22px 28px;flex:1;display:flex;flex-direction:column;gap:16px}
.eq-headline{font-weight:800;font-size:1.05rem;letter-spacing:-.03em;line-height:1.3}
.eq-bio{font-size:.86rem;color:var(--muted);line-height:1.78}
.eq-bio strong{color:var(--bone);font-weight:600}

/* Séparateur réseau */
.eq-sep{height:1px;background:var(--line);margin:0 22px;transition:background var(--tr)}

.eq-network{padding:20px 22px 24px;display:flex;flex-direction:column;gap:10px}
.eq-net-label{font-size:.58rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}
.eq-net-text{font-size:.82rem;color:var(--muted);line-height:1.65}
.eq-net-text strong{color:var(--bone);font-weight:600}
.eq-faces{display:flex;align-items:center;margin-top:6px}
.eq-face{
  width:32px;height:32px;border-radius:50%;
  background:var(--bg3);border:2px solid var(--bg2);
  display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:.66rem;color:var(--muted);
  margin-left:-9px;transition:background var(--tr),border-color var(--tr);
}
.eq-face:first-child{margin-left:0}
.eq-face-count{margin-left:12px;font-size:.75rem;color:var(--muted);font-weight:600}

/* Divider vertical desktop */
@media(min-width:860px){
  .eq-card{border-right:none;border-radius:4px 0 0 4px}
  .eq-card + .eq-side{border-radius:0 4px 4px 0}
}

/* Côté droit desktop — phrase clé */
.eq-side{
  width:100%;
  background:var(--bg);border:1px solid var(--line);border-radius:4px;
  padding:36px 32px;display:flex;flex-direction:column;justify-content:center;gap:24px;
  transition:background var(--tr),border-color var(--tr);
}
@media(min-width:860px){.eq-side{width:380px;flex-shrink:0;border-left:none}}

.eq-side-label{font-size:.58rem;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:var(--fire);display:flex;align-items:center;gap:8px}
.eq-side-label::before{content:'';width:16px;height:2px;background:var(--fire)}
.eq-side-h{font-weight:800;font-size:clamp(1.4rem,3.5vw,2rem);letter-spacing:-.04em;line-height:1.2}
.eq-side-p{font-size:.88rem;color:var(--muted);line-height:1.78}
.eq-side-p strong{color:var(--bone);font-weight:600}

.eq-pills{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.eq-pill{
  font-size:.64rem;font-weight:700;letter-spacing:.06em;
  padding:5px 12px;border-radius:100px;
  background:rgba(240,82,26,.07);color:var(--fire);
  border:1px solid rgba(240,82,26,.15);
}


/* ════════════════════
   PREUVES — iPhone auto-cycle
════════════════════ */
#proof{background:var(--bg);transition:background var(--tr)}

.proof-wrap{
  display:flex;flex-direction:column;align-items:center;gap:0;
}
@media(min-width:860px){
  .proof-wrap{flex-direction:row;align-items:center;gap:72px}
}

.proof-text{flex:1;max-width:440px}
.proof-intro-h{font-weight:800;font-size:clamp(1.9rem,4.5vw,3rem);line-height:1.06;letter-spacing:-.045em;margin-bottom:14px}
.proof-intro-p{font-size:.9rem;color:var(--muted);line-height:1.78;margin-bottom:32px}
.proof-intro-p strong{color:var(--bone);font-weight:600}

/* Indicateurs de conversation */
.proof-dots{display:flex;gap:8px;margin-top:24px}
.pdot{
  height:3px;border-radius:2px;flex:1;background:var(--faint);overflow:hidden;
  transition:background var(--tr);
}
.pdot-fill{
  height:100%;background:var(--fire);border-radius:2px;
  width:0%;transition:width linear;
}
.pdot.done .pdot-fill{width:100%}
.pdot.active .pdot-fill{width:0%}

/* Nom actif */
.proof-active-name{
  font-size:.76rem;font-weight:700;color:var(--bone);margin-top:10px;
  display:flex;align-items:center;gap:7px;
}
.proof-active-meta{font-size:.68rem;color:var(--muted);font-weight:400}

/* iPhone centré */
.proof-phone-wrap{
  flex-shrink:0;width:100%;max-width:320px;margin:40px auto 0;
}
@media(min-width:860px){.proof-phone-wrap{margin:0}}

.iphone{
  background:#0A0A0A;border-radius:42px;
  border:5.5px solid #1E1E1E;overflow:hidden;
  width:100%;
  height:580px;
  display:flex;
  flex-direction:column;
  box-shadow:0 32px 80px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.04);
}
.iphone-notch{
  height:28px;background:#0A0A0A;
  display:flex;align-items:center;justify-content:center;
}
.iphone-notch-pill{
  width:80px;height:5px;border-radius:3px;background:#1A1A1A;
}
.iphone-bar{
  background:#111;padding:11px 15px 10px;
  display:flex;align-items:center;gap:9px;
  border-bottom:1px solid rgba(255,255,255,.04);
}
.iphone-av{
  width:32px;height:32px;border-radius:50%;
  background:rgba(240,82,26,.14);display:flex;align-items:center;justify-content:center;
  font-weight:800;font-size:.7rem;color:var(--fire);flex-shrink:0;
}
.iphone-meta{flex:1}
.iphone-name{color:#fff;font-size:.76rem;font-weight:700;line-height:1.2}
.iphone-status{font-size:.58rem;color:#3A3;display:flex;align-items:center;gap:4px;margin-top:1px}
.iph-online{width:4px;height:4px;border-radius:50%;background:#3A3}
.iphone-msgs{
  padding:14px 12px 16px;
  height:320px;
  background:#0F0F0F;display:flex;flex-direction:column;gap:7px;overflow:hidden;
}
.bubble{max-width:82%;padding:9px 12px;border-radius:16px;font-size:.76rem;line-height:1.55}
.bubble.them{background:#1E1E1E;color:#C8C8C8;border-bottom-left-radius:3px;align-self:flex-start}
.bubble.us{background:var(--fire);color:#fff;border-bottom-right-radius:3px;align-self:flex-end;font-weight:500}
.btime{font-size:.54rem;color:#444;margin-top:2px}
.btime.us{text-align:right;color:rgba(255,255,255,.35)}

/* Barre de progression en bas du téléphone */
.iphone-progress{
  background:#111;padding:10px 14px 14px;
  display:flex;flex-direction:column;gap:6px;
}
.iphone-progress-bar{
  height:2px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden;
}
.iphone-progress-fill{
  height:100%;background:var(--fire);border-radius:1px;
  transition:width linear;
}
.iphone-progress-meta{
  display:flex;align-items:center;justify-content:space-between;
}
.ipm-name{font-size:.58rem;font-weight:700;color:rgba(255,255,255,.4)}
.ipm-next{font-size:.55rem;color:rgba(255,255,255,.2)}

/* ════════════════════
   OFFRE — mobile-first, visuelle
════════════════════ */
#offre{background:var(--bg2);transition:background var(--tr)}

.offre-intro{max-width:500px;margin-bottom:40px}
.offre-intro-h{font-weight:800;font-size:clamp(1.9rem,4.5vw,3rem);line-height:1.06;letter-spacing:-.045em;margin-bottom:10px}
.offre-intro-p{font-size:.9rem;color:var(--muted);line-height:1.72}

/* Layout principal */
.offre-layout{
  display:flex;flex-direction:column;gap:12px;
}
@media(min-width:760px){
  .offre-layout{
    display:grid;
    grid-template-columns:1fr 340px;
    grid-template-rows:auto auto;
    gap:12px;
    align-items:start;
  }
}

/* Bloc prix — hero de l'offre */
.offre-prix{
  background:var(--bg3);border:1px solid rgba(240,82,26,.2);border-radius:6px;
  padding:28px 24px;display:flex;flex-direction:column;gap:6px;
  position:relative;overflow:hidden;
}
.offre-prix::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--fire),var(--fire2));
}
.offre-badge{
  display:inline-block;background:var(--fire);color:#fff;
  font-size:.58rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;
  padding:3px 10px;border-radius:2px;margin-bottom:10px;align-self:flex-start;
}
.offre-nom{font-weight:800;font-size:1.1rem;letter-spacing:-.03em;margin-bottom:2px}
.offre-soustitre{font-size:.76rem;color:var(--muted);line-height:1.5;margin-bottom:16px}
.offre-prix-row{display:flex;align-items:flex-end;gap:14px}
.offre-was{font-size:.8rem;color:var(--muted);text-decoration:line-through}
.offre-montant{font-weight:800;font-size:clamp(2.6rem,7vw,3.8rem);letter-spacing:-.07em;color:var(--fire);line-height:1}
.offre-ht{font-size:.72rem;color:var(--muted);padding-bottom:6px}

/* Méta-effort */
.offre-effort{
  display:flex;flex-wrap:wrap;gap:8px;margin-top:12px;padding-top:16px;
  border-top:1px solid var(--line);
}
.oe-chip{
  display:flex;align-items:center;gap:6px;
  background:rgba(240,82,26,.07);border:1px solid rgba(240,82,26,.12);
  border-radius:100px;padding:5px 11px;
  font-size:.7rem;font-weight:700;color:var(--fire);
}
.oe-chip svg{opacity:.7}

/* Éléments inclus */
.offre-items{
  background:var(--bg3);border:1px solid var(--line);border-radius:6px;
  overflow:hidden;
  transition:background var(--tr),border-color var(--tr);
}
.oi-header{
  padding:14px 18px;border-bottom:1px solid var(--line);
  font-size:.6rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);
  transition:border-color var(--tr);
}
.oi-row{
  display:flex;align-items:flex-start;gap:12px;
  padding:16px 18px;border-bottom:1px solid var(--line);
  transition:border-color var(--tr);
}
.oi-row:last-child{border-bottom:none}
.oi-check{
  width:20px;height:20px;border-radius:50%;flex-shrink:0;margin-top:1px;
  display:flex;align-items:center;justify-content:center;
}
.oi-check.core{background:var(--fire)}
.oi-check.bonus{background:rgba(240,82,26,.12);border:1px solid rgba(240,82,26,.2)}
.oi-check.bonus svg{color:var(--fire)}
.oi-body{flex:1;min-width:0}
.oi-name{font-weight:700;font-size:.85rem;letter-spacing:-.02em;margin-bottom:2px}
.oi-desc{font-size:.76rem;color:var(--muted);line-height:1.55}
.oi-val{font-size:.7rem;color:var(--muted);text-decoration:line-through;opacity:.4;white-space:nowrap;flex-shrink:0;padding-top:2px}
.oi-bonus-tag{
  display:inline-block;font-size:.55rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;
  background:rgba(106,102,96,.1);color:var(--muted);border-radius:2px;
  padding:1px 6px;margin-left:6px;vertical-align:middle;
}

/* Garantie */
.offre-garantie{
  background:var(--bg);border:1px solid rgba(240,82,26,.18);border-radius:6px;
  padding:22px 20px;display:flex;gap:14px;align-items:flex-start;
  transition:background var(--tr),border-color var(--tr);
}
@media(min-width:760px){
  .offre-garantie{grid-column:1/3}
}
.og-ico{
  width:38px;height:38px;border-radius:50%;background:var(--fire);
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
}
.og-content{}
.og-titre{font-weight:800;font-size:.92rem;letter-spacing:-.02em;margin-bottom:5px}
.og-txt{font-size:.82rem;color:var(--muted);line-height:1.7}
.og-txt strong{color:var(--bone);font-weight:600}

/* CTA */
.offre-cta-wrap{
  padding-top:16px;
}
@media(min-width:760px){
  .offre-cta-wrap{grid-column:1/3}
}
.offre-cta-btn{
  display:flex;align-items:center;justify-content:center;gap:9px;
  width:100%;background:var(--fire);color:#fff;
  font-weight:800;font-size:.95rem;padding:17px;border-radius:4px;
  border:none;font-family:var(--ff);
  transition:background .2s,transform .12s;cursor:pointer;
}
.offre-cta-btn:hover{background:var(--fire2)}
.offre-cta-btn:active{transform:scale(.98)}
.offre-legal{margin-top:10px;font-size:.64rem;color:var(--muted);text-align:center;line-height:1.7}

/* ════════════════════
   FAQ — scroll horizontal mobile / grille desktop
════════════════════ */
#faq{background:var(--bg2);transition:background var(--tr)}

.faq-header{
  max-width:540px;margin-bottom:36px;
  display:flex;flex-direction:column;gap:10px;
}
@media(min-width:640px){.faq-header{margin-bottom:48px}}
.faq-intro-h{font-weight:800;font-size:clamp(1.9rem,4.5vw,3rem);line-height:1.06;letter-spacing:-.045em}
.faq-intro-p{font-size:.9rem;color:var(--muted);line-height:1.7}

/* ── Scroll hint mobile ── */
.faq-hint{
  display:flex;align-items:center;gap:7px;
  font-size:.64rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
  color:var(--muted);
}
.faq-hint-arrow{
  display:flex;gap:3px;
}
.faq-hint-arrow span{
  width:14px;height:2px;border-radius:1px;background:var(--faint);display:block;
}
.faq-hint-arrow span:first-child{background:var(--fire)}
@media(min-width:640px){.faq-hint{display:none}}

/* ── Wrapper scroll mobile ── */
.faq-scroll-wrap{
  /* Mobile : scroll horizontal */
  display:flex;
  overflow-x:auto;
  gap:10px;
  padding-bottom:16px;
  scroll-snap-type:x mandatory;
  -webkit-overflow-scrolling:touch;
  /* Masquer scrollbar */
  scrollbar-width:none;
  margin:0 -20px;
  padding-left:20px;
  padding-right:20px;
}
.faq-scroll-wrap::-webkit-scrollbar{display:none}

/* Desktop : grille 2 colonnes */
@media(min-width:640px){
  .faq-scroll-wrap{
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:2px;
    overflow-x:unset;
    margin:0;
    padding:0;
    scroll-snap-type:unset;
  }
}

/* ── Carte ── */
.faq-card{
  background:var(--bg3);padding:28px 24px 32px;
  border:1px solid var(--line);
  position:relative;overflow:hidden;
  transition:background var(--tr),border-color var(--tr);
  display:flex;flex-direction:column;gap:12px;
  /* Mobile : largeur fixe + snap */
  flex:0 0 82vw;
  max-width:340px;
  scroll-snap-align:start;
}
@media(min-width:640px){
  .faq-card{flex:unset;max-width:unset;scroll-snap-align:unset}
  .faq-card:hover{background:var(--bg)}
}

/* Numéro décoratif */
.faq-card-num{
  position:absolute;top:-10px;right:14px;
  font-weight:800;font-size:5rem;letter-spacing:-.1em;line-height:1;
  color:rgba(240,82,26,.055);user-select:none;pointer-events:none;
}
@media(min-width:640px){
  .faq-card:hover .faq-card-num{color:rgba(240,82,26,.12)}
}

/* Trait top */
.faq-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:var(--fire);
}
/* Mobile : visible de base pour la carte active visuelle */
@media(max-width:639px){
  .faq-card::before{transform:scaleX(1);transform-origin:left}
}
@media(min-width:640px){
  .faq-card::before{transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease)}
  .faq-card:hover::before{transform:scaleX(1)}
}

.faq-card-q{
  font-weight:800;font-size:.93rem;letter-spacing:-.025em;
  line-height:1.35;color:var(--bone);position:relative;z-index:1;
  padding-right:36px;
}
.faq-card-a{
  font-size:.83rem;color:var(--muted);line-height:1.78;
  position:relative;z-index:1;
}
.faq-card-a strong{color:var(--bone);font-weight:600}

/* ── Indicateurs de pagination mobile ── */
.faq-dots-nav{
  display:flex;justify-content:center;gap:6px;margin-top:16px;
}
@media(min-width:640px){.faq-dots-nav{display:none}}
.faq-dot{
  width:6px;height:6px;border-radius:50%;background:var(--faint);
  transition:background .2s,transform .2s;
}
.faq-dot.on{background:var(--fire);transform:scale(1.3)}

/* Bloc CTA bas */
.faq-cta-block{
  margin-top:28px;padding:22px 24px;
  background:var(--bg3);border:1px solid var(--line);border-radius:4px;
  display:flex;flex-direction:column;gap:10px;align-items:flex-start;
  transition:background var(--tr),border-color var(--tr);
}
@media(min-width:640px){
  .faq-cta-block{flex-direction:row;align-items:center;justify-content:space-between;margin-top:32px}
}
.faq-cta-text{font-size:.88rem;color:var(--muted);line-height:1.6}
.faq-cta-text strong{color:var(--bone);font-weight:600}
.faq-cta-btn{
  flex-shrink:0;display:inline-flex;align-items:center;gap:8px;
  background:var(--fire);color:#fff;
  font-weight:800;font-size:.8rem;padding:12px 18px;border-radius:2px;
  transition:background .2s;white-space:nowrap;
}
.faq-cta-btn:hover{background:var(--fire2)}

/* ════════════════════
   CTA FINAL
════════════════════ */
#cta{background:var(--bg2);transition:background var(--tr)}
.cta-layout{display:flex;flex-direction:column;gap:48px}
@media(min-width:860px){.cta-layout{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:start}}

.cta-h{font-weight:800;font-size:clamp(2rem,5.5vw,3.8rem);line-height:1.0;letter-spacing:-.05em;margin-bottom:16px}
.cta-h span{color:var(--fire)}
.cta-sub{font-size:.9rem;color:var(--muted);line-height:1.74;max-width:380px;margin-bottom:28px}

.phone-block{padding:20px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);margin-bottom:20px;transition:border-color var(--tr)}
.phone-lbl{font-size:.6rem;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}
.phone-link{
  display:flex;align-items:center;gap:11px;
  font-weight:800;font-size:clamp(2rem,7vw,3.2rem);letter-spacing:-.05em;
  transition:color .2s;
}
.phone-link:hover{color:var(--fire)}
.phone-ico{width:36px;height:36px;border-radius:50%;background:rgba(240,82,26,.1);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.wa-link{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:.78rem;color:var(--muted);transition:color .2s;width:fit-content}
.wa-link:hover{color:#25D366}

.or-sep{display:flex;align-items:center;gap:12px;margin:4px 0 18px}
.or-sep::before,.or-sep::after{content:'';flex:1;height:1px;background:var(--line)}
.or-sep span{font-size:.6rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}

/* Form */
.form-box{background:var(--bg3);border:1px solid var(--line);border-radius:8px;padding:22px;transition:background var(--tr),border-color var(--tr)}
.form-box-h{font-weight:800;font-size:.96rem;letter-spacing:-.02em;margin-bottom:3px}
.form-box-h span{color:var(--fire)}
.form-box-sub{font-size:.74rem;color:var(--muted);margin-bottom:18px;line-height:1.4}
.fg{margin-bottom:9px}
.fg label{display:block;font-size:.6rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:4px}
.fg input,.fg select{
  width:100%;background:var(--bg2);border:1px solid var(--line);border-radius:3px;
  padding:11px 13px;color:var(--bone);font-family:var(--ff);font-size:.88rem;
  outline:none;transition:border-color .2s,background var(--tr);-webkit-appearance:none;
}
.fg input:focus,.fg select:focus{border-color:rgba(240,82,26,.5)}
.fg input::placeholder{color:var(--muted)}
.fg select option{background:var(--bg2);color:var(--bone)}
.form-submit{
  width:100%;background:var(--fire);color:#fff;
  font-weight:800;font-size:.9rem;padding:15px;border-radius:2px;
  display:flex;align-items:center;justify-content:center;gap:8px;
  border:none;font-family:var(--ff);margin-top:4px;
  transition:background .2s,transform .12s;cursor:pointer;
}
.form-submit:hover{background:var(--fire2)}
.form-submit:active{transform:scale(.98)}
.form-submit:disabled{background:rgba(240,82,26,.3);cursor:default;transform:none}
.form-note-txt{margin-top:7px;font-size:.64rem;color:var(--muted);text-align:center;line-height:1.5}

/* ════════════════════
   FOOTER
════════════════════ */
footer{
  background:var(--bg);border-top:1px solid var(--line);
  padding:22px 20px;transition:background var(--tr),border-color var(--tr);
}
.foot-inner{max-width:1060px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between}
.foot-logo{font-weight:800;font-size:.84rem;display:flex;align-items:center;gap:7px}
.foot-copy{font-size:.68rem;color:var(--muted)}
.foot-links{display:flex;gap:14px}
.foot-links a{font-size:.68rem;color:var(--muted);transition:color .2s}
.foot-links a:hover{color:var(--bone)}

/* ════════════════════
   WA FLOAT
════════════════════ */
.wa-float{position:fixed;bottom:18px;right:14px;z-index:700;display:flex;flex-direction:column;align-items:flex-end;gap:7px}
.wa-bubble-f{
  background:var(--bg2);border:1px solid var(--line);border-radius:9px 9px 0 9px;
  padding:8px 12px;font-size:.68rem;color:var(--muted);max-width:170px;
  text-align:right;line-height:1.4;box-shadow:0 4px 16px rgba(0,0,0,.3);
  transition:opacity .5s,background var(--tr);
}
.wa-circle{
  width:48px;height:48px;border-radius:50%;background:#25D366;
  display:flex;align-items:center;justify-content:center;
  box-shadow:0 4px 18px rgba(37,211,102,.35);transition:transform .2s;
}
.wa-circle:hover{transform:scale(1.09)}

/* ════════════════════
   REVEAL
════════════════════ */
.r{opacity:0;transform:translateY(22px);transition:opacity .65s var(--ease),transform .65s var(--ease)}
.r.in{opacity:1;transform:none}
.r.d1{transition-delay:.08s}.r.d2{transition-delay:.16s}.r.d3{transition-delay:.24s}
.r.sr{transform:translateX(24px)}.r.sl{transform:translateX(-24px)}
.r.sc{transform:scale(.96);opacity:0}
.r.sr.in,.r.sl.in,.r.sc.in{transform:none;opacity:1}
`;

/* ─────────────────
   DATA
───────────────── */
const CONVOS = [
  {init:"JP",name:"Jean-Pierre M.",job:"Plombier · Tours Nord",msgs:[
    {who:"them",text:"Honnêtement j'étais sceptique. Promesses depuis des années, personne livrait.",time:"J−45"},
    {who:"us",text:"On vous montre exactement où vous en êtes avant de commencer. Zéro engagement.",time:"Lu ✓✓"},
    {who:"them",text:"3 semaines plus tard, mes appels ont doublé. Sans changer quoi que ce soit de mon côté.",time:"J−20"},
  ]},
  {init:"RC",name:"Romain C.",job:"Serrurier · Joué-lès-Tours",msgs:[
    {who:"them",text:"Ce qui m'a convaincu : la garantie. S'il ne signe rien en 90 jours, il bosse gratis.",time:"J−38"},
    {who:"us",text:"C'est ça. Notre risque, pas le vôtre.",time:"Lu ✓✓"},
    {who:"them",text:"3 nouveaux clients ce mois-ci. Aucun effort supplémentaire. Juste le téléphone qui sonne.",time:"J−10"},
  ]},
  {init:"FD",name:"Fabrice D.",job:"Électricien · Saint-Cyr",msgs:[
    {who:"them",text:"Les clients appellent en disant qu'ils ont vu ma vidéo et que je 'travaille proprement'.",time:"J−55"},
    {who:"us",text:"Exactement le but — supprimer la peur du charlatan avant même l'appel.",time:"Lu ✓✓"},
    {who:"them",text:"Je comprends pas comment j'ai bossé sans ça pendant 12 ans.",time:"J−30"},
  ]},
];

const FAQS = [
  {q:"14 jours c'est réaliste ou du marketing ?",
   a:<>14 jours = déploiement complet (fiche reconfigurée, vidéos en ligne, SMS actif). <strong>Les résultats Maps arrivent entre J+14 et J+45</strong> selon votre secteur. On vous tient informé étape par étape.</>},
  {q:"Je n'ai que 90 minutes. Comment ça se passe ?",
   a:<>On vient chez vous — atelier, chantier ou camion. On s'adapte. <strong>Montage, mise en ligne, optimisation, avis : on gère tout.</strong> Vous continuez à travailler normalement.</>},
  {q:"Qu'est-ce que veut dire 'Chantier Signé garanti' ?",
   a:<>Pas un nouveau chantier dans les 90 jours ? <strong>Je gère votre fiche gratuitement jusqu'à ce que ça arrive.</strong> Pas de débat, pas de clause cachée.</>},
  {q:"Et si mon concurrent signe avant moi ?",
   a:<><strong>1 seul partenaire par métier et par secteur.</strong> Si un autre plombier de votre zone signe avant vous — c'est terminé. Ce n'est pas un argument de vente. C'est une contrainte opérationnelle réelle.</>},
  {q:"Pourquoi 1 250 € et pas moins ?",
   a:<>Parce qu'on fait le travail nous-mêmes — 90 min de tournage, montage pro, déploiement complet. <strong>Un seul chantier supplémentaire couvre l'investissement.</strong></>},
];

const STACK = [
  {num:"1",name:"Infrastructure GMB « Urgence Locale »",desc:<>Fiche reconfigurée pour les mots-clés de détresse. <strong>L'algorithme Maps favorise les fiches qui répondent à l'intention exacte de la recherche.</strong></>,val:"997 €"},
  {num:"2",name:"Tournage « Intervention Propre »",desc:<>90 min sur site. La vidéo supprime la peur du charlatan avant même l'appel. <strong>Vous n'expliquez plus. Le client vous voit déjà travailler.</strong></>,val:"1 500 €"},
  {num:"B1",name:"Missed Call Text Back",desc:<>SMS auto si vous manquez un appel. <strong>20% des appels manqués récupérés en moyenne.</strong></>,val:"497 €",bonus:true},
  {num:"B2",name:"Script « Avis Immédiat »",desc:<>SMS auto 20 min après intervention. <strong>Vous captez le soulagement client quand il est encore chaud.</strong></>,val:"349 €",bonus:true},
];

/* ─────────────────
   ICONS
───────────────── */
const Arr = ({s=14})=><svg width={s} height={s} viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const Phone = ({s=14})=><svg width={s} height={s} viewBox="0 0 14 14" fill="none"><path d="M12.8 10a1.2 1.2 0 0 1-1.2 1.2A12 12 0 0 1 1.2 1.4 1.2 1.2 0 0 1 2.4.2H4.6L5.8 3.2l-1.6.8a8.8 8.8 0 0 0 5.2 5.2l.8-1.6 3 1.2-.2.2z" fill="currentColor"/></svg>;
const Shield = ()=><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5v4c0 4.5 2.5 8.7 6 10 3.5-1.3 6-5.5 6-10V5L10 2z" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/><path d="M7 10l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const Plus = ()=><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>;
const Sun = ()=><svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.1 3.1l1.4 1.4M13.5 13.5l1.4 1.4M3.1 14.9l1.4-1.4M13.5 4.5l1.4-1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const Moon = ()=><svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M15.5 12.4A7 7 0 0 1 5.6 2.5a7 7 0 1 0 9.9 9.9z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>;
const WA = ()=><svg width="23" height="23" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;

/* ─────────────────
   HOOKS
───────────────── */
function useReveal(ref) {
  useEffect(() => {
    if (!ref?.current) return;
    const els = ref.current.querySelectorAll(".r");
    const io = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }}),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

/* ─────────────────
   COMPOSANTS
───────────────── */
function Nav({ theme, toggle }) {
  return (
    <nav className="nav">
      <div className="logo">
        <img src="/logo-kapta-btp.png" alt="Kapta Media" className="logo-icon" width="24" height="24" />
        Kapta Media
      </div>
      <div className="nav-r">
        <button className="theme-btn" onClick={toggle} aria-label="Thème">{theme==="dark"?<Sun/>:<Moon/>}</button>
        <a href="#cta" className="nav-cta">Audit gratuit</a>
      </div>
    </nav>
  );
}

/* HERO — une seule accroche, un seul CTA */
function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" aria-hidden="true"/>
      <div className="hero-wordmark" aria-hidden="true">MAPS</div>

      <div className="hero-body">
        {/* Pill */}
        <div className="hero-pill r">
          <div className="pill-dot"/>
          <span className="pill-txt">Tours · Artisans d'urgence</span>
        </div>

        {/* L'accroche — une seule idée claire */}
        <h1 className="hero-h">
          <span className="r d1">Votre prochain client</span>
          <span className="r d2">est sur Google.</span>
          <span className="hero-h-sub r d3">
            On s'assure que c'est vous qu'il trouve.
          </span>
        </h1>

        {/* Sous-titre — une phrase, une promesse */}
        <p className="hero-sub r d2">
          Plombiers, électriciens, serruriers, couvreurs.
          <br/>
          Vous nous donnez <strong>90 minutes</strong>. On positionne votre entreprise en tête des résultats locaux. Pour de bon.
        </p>

        {/* UN seul CTA */}
        <div className="r d3">
          <a href="#cta" className="btn-primary">
            Vérifier si ma zone est disponible <Arr s={15}/>
          </a>
          <p className="hero-note">Audit gratuit · Sans engagement · Tours et agglomération</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   IMPACT VISUEL — Maps Split + Stats
   Remplace le ticker et la section problème
═══════════════════════════════════ */
const BEFORE_RESULTS = [
  {pos:"1",name:"Martin Plomberie 37",stars:"4.8",n:"62",active:true},
  {pos:"2",name:"Dépannage Rapid Tours",stars:"4.5",n:"41",active:false},
  {pos:"3",name:"Pro Fuite Tours",stars:"4.7",n:"28",active:false},
  {pos:"5",name:"Votre entreprise",stars:"3.9",n:"4",you:true,youType:"before"},
];
const AFTER_RESULTS = [
  {pos:"1",name:"Votre entreprise",stars:"4.9",n:"37",you:true,youType:"after"},
  {pos:"2",name:"Martin Plomberie 37",stars:"4.8",n:"62",active:false},
  {pos:"3",name:"Dépannage Rapid Tours",stars:"4.5",n:"41",active:false},
];

function MapsResult({r}){
  const cls = r.youType==="after"
    ? "ms-result you-after"
    : r.youType==="before"
    ? "ms-result you-before"
    : r.active
    ? "ms-result active"
    : "ms-result";
  return (
    <div className={cls}>
      <div className="ms-result-pos">{r.pos}</div>
      <div className="ms-result-body">
        <div className="ms-result-name">{r.name}</div>
        <div className="ms-result-meta">
          <span className="ms-result-stars">★</span>
          {r.stars} ({r.n} avis)
        </div>
      </div>
      {r.you && (
        <span className="you-badge">Vous</span>
      )}
    </div>
  );
}

function SearchIco(){
  return (
    <svg className="ms-search-ico" width="13" height="13" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function PhoneIco({color="#fff"}){
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12.8 10a1.2 1.2 0 0 1-1.2 1.2A12 12 0 0 1 1.2 1.4 1.2 1.2 0 0 1 2.4.2H4.6L5.8 3.2l-1.6.8a8.8 8.8 0 0 0 5.2 5.2l.8-1.6 3 1.2-.2.2z" fill={color}/>
    </svg>
  );
}

function MapsSplit(){
  const [animated, setAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    const io = new IntersectionObserver(
      ([e])=>{ if(e.isIntersecting){ setAnimated(true); io.disconnect(); }},
      {threshold:0.3}
    );
    if(ref.current) io.observe(ref.current);
    return ()=>io.disconnect();
  },[]);

  return (
    <section id="maps-split" ref={ref}>
      {/* Header */}
      <div className="ms-header">
        <div className="ms-eyebrow r">En ce moment à Tours</div>
        <h2 className="ms-title r d1">
          Quelqu'un cherche votre métier.
          <br/>Il appelle le <span>premier</span> qu'il trouve.
        </h2>
      </div>

      {/* Split panels */}
      <div className="ms-panels" style={{position:"relative"}}>

        {/* Avant */}
        <div className={`ms-panel before r sl${animated?" in":""}`}>
          <div className="ms-panel-label">
            <div className="ms-label-dot"/>
            Aujourd'hui — sans Kapta Media
          </div>
          <div className="ms-searchbar">
            <SearchIco/>
            <span className="ms-search-txt">plombier tours urgence</span>
          </div>
          <div className="ms-results">
            {BEFORE_RESULTS.map((r,i)=><MapsResult key={i} r={r}/>)}
          </div>
          <div className="ms-call-sim" style={{marginTop:16}}>
            <div className="call-ico">
              <PhoneIco color="var(--muted)"/>
            </div>
            Votre téléphone ne sonne pas.
          </div>
        </div>

        {/* Divider */}
        <div className="ms-divider" style={{position:"absolute"}}>→</div>

        {/* Après */}
        <div className={`ms-panel after r sr${animated?" in":""}`}>
          <div className="ms-panel-label">
            <div className="ms-label-dot"/>
            Après Kapta Media
          </div>
          <div className="ms-searchbar">
            <SearchIco/>
            <span className="ms-search-txt">plombier tours urgence</span>
          </div>
          <div className="ms-results">
            {AFTER_RESULTS.map((r,i)=><MapsResult key={i} r={r}/>)}
          </div>
          <div className="ms-call-sim" style={{marginTop:16}}>
            <div className="call-ico">
              <PhoneIco color="#34D358"/>
            </div>
            Votre téléphone sonne. Vous décrochez.
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-impact">
        {[
          {n:"88",unit:"%",label:<><strong>des appels d'urgence</strong>vont aux 3 premiers résultats</>},
          {n:"90",unit:" min",label:<><strong>de votre temps</strong>c'est tout ce qu'on vous demande</>},
          {n:"14",unit:" j",label:<><strong>pour être en ligne</strong>et visible sur votre secteur</>},
        ].map(({n,unit,label},i)=>(
          <div key={i} className="si-cell r">
            <span className="si-num">
              {n}<span className="si-unit">{unit}</span>
            </span>
            <div className="si-label">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Suppression de Ticker et Probleme — remplacés par MapsSplit */

/* SOLUTION — onglets interactifs */
const SOL_TABS = [
  {
    num:"01", title:"Top 3 Google Maps",
    h:"Votre fiche. En tête.",
    p:<>Quand quelqu'un cherche en urgence, il appelle le premier résultat. <strong>On reconfigure votre fiche pour que l'algorithme Maps vous place avant tout le monde</strong> sur votre secteur à Tours.</>,
    result:"Position #1 sur votre zone",
    demo:"maps",
  },
  {
    num:"02", title:"La vidéo qui rassure",
    h:"La peur du charlatan, supprimée.",
    p:<>90 minutes de tournage chez vous — atelier, camion, chantier. <strong>Le client vous voit travailler avant même d'appuyer sur appel.</strong> Il n'a plus de raison d'hésiter.</>,
    result:"87 % de taux de confiance",
    demo:"video",
  },
  {
    num:"03", title:"Zéro appel perdu",
    h:"Absent. Pas inaccessible.",
    p:<>Vous êtes en intervention — votre téléphone ne répond pas. <strong>Un SMS part automatiquement en 30 secondes.</strong> Le client sait que vous êtes professionnel. Il attend. Il rappelle.</>,
    result:"20 % des appels manqués récupérés",
    demo:"sms",
  },
];

function DemoMaps(){
  return (
    <div className="demo-maps">
      <div className="dm-bar">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6"/><path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        plombier tours urgence
      </div>
      <div className="dm-rows">
        {[
          {pos:"1",name:"Votre entreprise",stars:"4.9 (37)",top:true},
          {pos:"2",name:"Martin Plomberie 37",stars:"4.8 (62)",top:false},
          {pos:"3",name:"Dépannage Rapid",stars:"4.5 (41)",top:false},
        ].map((r,i)=>(
          <div key={i} className={`dm-row${r.top?" top":""}`} style={r.top?{animationDelay:`${i*.1}s`}:{}}>
            <div className="dm-pos">{r.pos}</div>
            <div style={{flex:1}}>
              <div className="dm-name">{r.name}</div>
              <div className="dm-stars">★ {r.stars}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemoVideo(){
  return (
    <div className="demo-video">
      <div className="dv-frame">
        <div className="dv-thumb">
          <div className="dv-label">Intervention · Tours</div>
          <div className="dv-play">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 3l9 5-9 5V3z" fill="white"/></svg>
          </div>
        </div>
        <div className="dv-meta">
          <div className="dv-name">Votre entreprise — Plombier Tours</div>
          <div className="dv-trust">
            <div className="dv-trust-bar"><div className="dv-trust-fill"/></div>
            <div className="dv-trust-pct">87%</div>
            <div className="dv-trust-label">confiance client</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DemoSms(){
  const msgs = [
    {type:"missed", text:"Appel entrant · 14h32 · Sans réponse", delay:.1},
    {type:"auto",   text:"Bonjour, je suis en intervention. Je vous rappelle dès que possible. — [Votre prénom]", delay:.5},
    {type:"reply",  text:"Ok merci ! Attendrai votre appel 👍", delay:1.0},
  ];
  return (
    <div className="demo-sms">
      {msgs.map((m,i)=>(
        <div key={i}>
          <div className={`ds-bubble ${m.type}`} style={{animationDelay:`${m.delay}s`}}>{m.text}</div>
        </div>
      ))}
      <div className="ds-tag">Appel récupéré ✓</div>
    </div>
  );
}

function Solution(){
  const [active,setActive] = useState(0);
  const t = SOL_TABS[active];
  return (
    <section id="solution">
      <div className="w">
        <div className="r" style={{marginBottom:48}}>
          <span className="label" style={{display:"inline-flex",marginBottom:14}}>La solution</span>
          <h2 style={{fontWeight:800,fontSize:"clamp(1.9rem,4.5vw,3rem)",letterSpacing:"-.045em",lineHeight:1.06,maxWidth:500}}>
            Trois leviers. Un seul résultat.
          </h2>
          <p style={{fontSize:".88rem",color:"var(--muted)",lineHeight:1.7,marginTop:12,maxWidth:480}}>
            Explorez chaque levier ci-dessous pour comprendre comment on transforme votre visibilité.
          </p>
        </div>
        <div className="sol-layout r d1">
          {/* Onglets */}
          <div className="sol-tabs">
            {SOL_TABS.map((t,i)=>(
              <div key={i} className={`sol-tab${active===i?" active":""}`} onClick={()=>setActive(i)}>
                <div className="sol-tab-num">{t.num}</div>
                <div className="sol-tab-title">{t.title}</div>
              </div>
            ))}
          </div>
          {/* Panneau */}
          <div className="sol-panel">
            <div className="sol-panel-text">
              <div className="sol-panel-num">{t.num}</div>
              <div className="sol-panel-h">{t.h}</div>
              <p className="sol-panel-p">{t.p}</p>
              <div className="sol-panel-result">↗ {t.result}</div>
            </div>
            <div className="sol-panel-demo">
              {t.demo==="maps" && <DemoMaps key={active}/>}
              {t.demo==="video" && <DemoVideo key={active}/>}
              {t.demo==="sms" && <DemoSms key={active}/>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* PROCESS */
function Process() {
  return (
    <section id="process">
      <div className="w">
        <div className="proc-layout">
          <div className="proc-sticky">
            <span className="label r">Le process</span>
            <h2 className="proc-intro-h r d1">
              3 étapes. Vous bossez. On installe.
            </h2>
            <p className="proc-intro-p r d2">
              Pas de formation. Pas de logiciel à comprendre. Vous continuez à faire votre métier. On fait le nôtre.
            </p>
          </div>

          <div className="steps">
            {[
              {when:"Gratuit · Avant tout",title:"Audit de votre position",p:<><strong>On analyse votre fiche Maps, vos concurrents et les mots-clés de votre secteur à Tours.</strong> On vous dit exactement combien d'appels vous perdez — sans engagement.</>},
              {when:"Jours 1 à 5 · 90 min sur site",title:"Tournage chez vous",p:<><strong>On vient à votre atelier, sur un chantier ou dans votre camion.</strong> 90 minutes. On s'adapte à votre emploi du temps. On repart avec 6 mois de contenu.</>},
              {when:"Jours 5 à 14 · On gère tout",title:"Déploiement complet",p:<>Fiche Maps reconfigurée, vidéos publiées, Missed Call actif, système d'avis en place. <strong>Votre téléphone commence à sonner différemment.</strong></>},
            ].map((s,i)=>(
              <div key={i} className={`step r d${i}`}>
                <div className="step-num">{i+1}</div>
                <span className="step-when">{s.when}</span>
                <div className="step-title">{s.title}</div>
                <p className="step-p">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ÉQUIPE */
function Equipe() {
  return (
    <section id="equipe">
      <div className="w">
        <span className="label r" style={{display:"inline-flex",marginBottom:20}}>Qui sommes-nous</span>
        <div className="eq-wrap">

          {/* Carte fondateur */}
          <div className="eq-card r sl">
            <div className="eq-mono">
              <div className="eq-mono-bg"/>
              <div className="eq-mono-letter">KB</div>
              <div className="eq-mono-tag">
                <div>
                  <div className="emt-name">Karim Benali</div>
                  <div className="emt-role">Fondateur · Kapta Media</div>
                </div>
                <div className="emt-city">Tours</div>
              </div>
            </div>

            <div className="eq-body">
              <div className="eq-headline">8 ans avec des artisans. Un problème récurrent.</div>
              <p className="eq-bio">
                Des pros sérieux, qui travaillent bien, et qui perdent des chantiers parce qu'on ne les trouve pas en ligne. <strong>Pas parce qu'ils sont mauvais. Parce qu'ils sont invisibles.</strong>
              </p>
              <div className="eq-pills">
                {["Google Maps","Vidéo terrain","SMS auto","Tours & agglo"].map(p=>(
                  <span key={p} className="eq-pill">{p}</span>
                ))}
              </div>
            </div>

            <div className="eq-sep"/>
            <div className="eq-network">
              <div className="eq-net-label">Le réseau</div>
              <p className="eq-net-text">
                Je travaille avec <strong>4 freelances sélectionnés</strong> — vidéo, montage, dev. Tous basés en Indre-et-Loire. Jamais sous-traité à l'étranger.
              </p>
              <div className="eq-faces">
                {["V","M","T","A"].map((l,i)=>(
                  <div key={i} className="eq-face">{l}</div>
                ))}
                <span className="eq-face-count">4 spécialistes locaux</span>
              </div>
            </div>
          </div>

          {/* Phrase clé côté droit */}
          <div className="eq-side r sr">
            <div className="eq-side-label">La promesse</div>
            <h2 className="eq-side-h">Une seule personne responsable de votre résultat.</h2>
            <p className="eq-side-p">
              Pas de chef de projet qui passe le dossier à un stagiaire. Pas de ticket de support.
              <br/><br/>
              <strong>Quand quelque chose ne va pas, c'est moi qui décroche.</strong>
            </p>
            <p className="eq-side-p" style={{marginTop:0}}>
              Kapta Media n'accepte qu'un seul client par métier et par secteur. Pas pour créer de la rareté artificielle — parce que je ne peux pas faire ce travail correctement autrement.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* PREUVES — iPhone auto-cycle */
const CYCLE_DURATION = 6000; // ms par conversation

function Proof() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [msgs, setMsgs] = useState([]);
  const [msgKey, setMsgKey] = useState(0);
  const timerRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const showConvo = (idx) => {
    setActive(idx);
    setMsgs([]);
    setProgress(0);
    setTimeout(() => {
      setMsgs(CONVOS[idx].msgs);
      setMsgKey(k => k + 1);
    }, 50);
  };

  // Progress bar via rAF
  const startProgress = (idx) => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
    startRef.current = performance.now();
    const tick = (now) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / CYCLE_DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timerRef.current = setTimeout(() => {
          const next = (idx + 1) % CONVOS.length;
          showConvo(next);
          startProgress(next);
        }, 200);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    showConvo(0);
    startProgress(0);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timerRef.current);
    };
  }, []);

  const c = CONVOS[active];
  const nextIdx = (active + 1) % CONVOS.length;

  return (
    <section id="proof">
      <div className="w">
        <div className="proof-wrap">

          {/* Texte gauche */}
          <div className="proof-text r sl">
            <span className="label" style={{display:"inline-flex",marginBottom:14}}>Ce qu'ils disent</span>
            <h2 className="proof-intro-h">Les vraies conversations.</h2>
            <p className="proof-intro-p">
              Pas de témoignages formatés. Pas de photos souriantes.
              <br/>
              <strong>Ce que les artisans ont dit après le déploiement.</strong>
            </p>

            {/* Indicateurs / dots */}
            <div className="proof-dots">
              {CONVOS.map((co, i) => (
                <div
                  key={i}
                  className={`pdot${i < active ? " done" : i === active ? " active" : ""}`}
                  onClick={() => { showConvo(i); startProgress(i); }}
                  style={{cursor:"pointer"}}
                >
                  <div
                    className="pdot-fill"
                    style={i === active
                      ? {width: `${progress}%`, transition: "none"}
                      : i < active
                      ? {width: "100%", transition: "none"}
                      : {width: "0%"}
                    }
                  />
                </div>
              ))}
            </div>

            {/* Nom actif */}
            <div className="proof-active-name">
              {c.init} — {c.name}
              <span className="proof-active-meta">· {c.job}</span>
            </div>
          </div>

          {/* iPhone */}
          <div className="proof-phone-wrap r d1">
            <div className="iphone">
              <div className="iphone-notch"><div className="iphone-notch-pill"/></div>
              <div className="iphone-bar">
                <div className="iphone-av">{c.init}</div>
                <div className="iphone-meta">
                  <div className="iphone-name">{c.name}</div>
                  <div className="iphone-status"><div className="iph-online"/>En ligne</div>
                </div>
              </div>
              <div className="iphone-msgs" key={msgKey}>
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`bubble ${m.who === "them" ? "them" : "us"}`}
                    ref={el => {
                      if (el) requestAnimationFrame(() => requestAnimationFrame(() => {
                        el.style.opacity = "1";
                        el.style.transform = "none";
                      }));
                    }}
                    style={{
                      opacity: 0,
                      transform: "translateY(8px)",
                      transition: `opacity .38s ${i * .18}s, transform .38s ${i * .18}s`
                    }}
                  >
                    {m.text}
                    <div className={`btime${m.who === "us" ? " us" : ""}`}>{m.time}</div>
                  </div>
                ))}
              </div>
              {/* Barre de progression */}
              <div className="iphone-progress">
                <div className="iphone-progress-bar">
                  <div
                    className="iphone-progress-fill"
                    style={{width:`${progress}%`, transition:"none"}}
                  />
                </div>
                <div className="iphone-progress-meta">
                  <span className="ipm-name">{c.job}</span>
                  <span className="ipm-next">Suivant : {CONVOS[nextIdx].name.split(" ")[0]} →</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* OFFRE — visuelle, mobile-first */
function Offre() {
  return (
    <section id="offre">
      <div className="w">
        <div className="offre-intro r">
          <span className="label" style={{display:"inline-flex",marginBottom:14}}>L'offre</span>
          <h2 className="offre-intro-h">Ce que vous recevez.</h2>
          <p className="offre-intro-p">Un déploiement unique. Un système autonome. Aucun abonnement.</p>
        </div>

        <div className="offre-layout">

          {/* Bloc prix */}
          <div className="offre-prix r">
            <span className="offre-badge">Système Intercepteur d'Urgences™</span>
            <div className="offre-nom">Méthode GVA</div>
            <div className="offre-soustitre">Google · Vidéo · Avis — Done-For-You · Tours & agglomération</div>
            <div className="offre-prix-row">
              <span className="offre-was">3 343 €</span>
              <span className="offre-montant">1 250</span>
              <span className="offre-ht">€ HT</span>
            </div>
            <div className="offre-effort">
              {[
                {ico:<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M7 4v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>, txt:"90 min de votre temps"},
                {ico:<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M5 3V2M9 3V2M2 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>, txt:"Déployé en 14 jours"},
                {ico:<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M12 7A5 5 0 1 1 2 7a5 5 0 0 1 10 0z" stroke="currentColor" strokeWidth="1.4"/><path d="M5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, txt:"100% géré par nous"},
                {ico:<svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, txt:"Un seul paiement"},
              ].map((c,i)=>(
                <span key={i} className="oe-chip">{c.ico}{c.txt}</span>
              ))}
            </div>
          </div>

          {/* Ce qui est inclus */}
          <div className="offre-items r d1">
            <div className="oi-header">Ce qui est inclus</div>
            {STACK.map((s,i)=>(
              <div key={i} className="oi-row">
                <div className={`oi-check ${s.bonus?"bonus":"core"}`}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="oi-body">
                  <div className="oi-name">
                    {s.name}
                    {s.bonus && <span className="oi-bonus-tag">Bonus</span>}
                  </div>
                  <div className="oi-desc">{s.desc}</div>
                </div>
                <div className="oi-val">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Garantie */}
          <div className="offre-garantie r d2">
            <div className="og-ico"><Shield/></div>
            <div className="og-content">
              <div className="og-titre">Garantie « Chantier Signé »</div>
              <p className="og-txt">
                Pas un nouveau chantier dans les 90 jours ? <strong>Je continue gratuitement jusqu'à ce que ça arrive.</strong> Pas de débat. C'est mon risque, pas le vôtre.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="offre-cta-wrap r d2">
            <a href="#cta" className="offre-cta-btn">
              Démarrer l'audit gratuit <Arr s={13}/>
            </a>
            <p className="offre-legal">1 partenaire par métier · par secteur · Premier contacté, premier servi.</p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* FAQ — scroll horizontal mobile */
function Faq() {
  const [activeDot, setActiveDot] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.scrollWidth / FAQS.length;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveDot(Math.min(idx, FAQS.length - 1));
    };
    el.addEventListener("scroll", onScroll, {passive:true});
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="faq">
      <div className="w">

        <div className="faq-header r">
          <span className="label" style={{display:"inline-flex",marginBottom:4}}>FAQ</span>
          <h2 className="faq-intro-h">Les questions qu'on nous pose.</h2>
          <p className="faq-intro-p">Directement. Sans langue de bois.</p>
          <div className="faq-hint">
            <div className="faq-hint-arrow">
              <span/><span/><span/>
            </div>
            Glissez pour voir la suite
          </div>
        </div>

        <div className="faq-scroll-wrap r d1" ref={scrollRef}>
          {FAQS.map((f,i)=>(
            <div key={i} className="faq-card">
              <div className="faq-card-num" aria-hidden="true">
                {String(i+1).padStart(2,"0")}
              </div>
              <div className="faq-card-q">{f.q}</div>
              <div className="faq-card-a">{f.a}</div>
            </div>
          ))}
        </div>

        {/* Dots pagination mobile */}
        <div className="faq-dots-nav">
          {FAQS.map((_,i)=>(
            <div
              key={i}
              className={`faq-dot${activeDot===i?" on":""}`}
              onClick={()=>{
                const el = scrollRef.current;
                if(!el) return;
                const cardW = el.scrollWidth / FAQS.length;
                el.scrollTo({left: cardW * i, behavior:"smooth"});
              }}
            />
          ))}
        </div>

        <div className="faq-cta-block r">
          <p className="faq-cta-text">
            <strong>Une question qui n'est pas là ?</strong> On vous répond en moins de 24h.
          </p>
          <a href="#cta" className="faq-cta-btn">
            Poser une question <Arr s={12}/>
          </a>
        </div>

      </div>
    </section>
  );
}

/* CTA FINAL */
function Cta() {
  const [done,setDone] = useState(false);
  const [form,setForm] = useState({prenom:"",metier:"",tel:""});
  return (
    <section id="cta">
      <div className="w">
        <div className="cta-layout">
          <div>
            <span className="label r">Maintenant</span>
            <h2 className="cta-h r d1">
              Dans 14 jours, votre téléphone <span>sonnera différemment.</span>
            </h2>
            <p className="cta-sub r d1">Audit gratuit. On analyse votre position et on vous dit exactement ce que vous perdez. Zéro engagement.</p>

            <div className="phone-block r d2">
              <div className="phone-lbl">Le plus direct — appelez</div>
              <a href="tel:+33686018054" className="phone-link">
                <div className="phone-ico"><Phone s={16}/></div>
                06 86 01 80 54
              </a>
              <a href="https://wa.me/33686018054" className="wa-link" target="_blank" rel="noopener noreferrer">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                WhatsApp · Réponse rapide
              </a>
            </div>
            <div className="or-sep r d2"><span>ou formulaire</span></div>
          </div>

          <div className="form-box r d1 sc">
            <div className="form-box-h">Audit gratuit · <span>Réponse 48h</span></div>
            <div className="form-box-sub">On vous dit où vous en êtes — sans engagement.</div>
            {[
              {id:"prenom",label:"Prénom",ph:"Pascal",type:"text"},
              {id:"tel",label:"Téléphone",ph:"06 XX XX XX XX",type:"tel"},
            ].map(f=>(
              <div key={f.id} className="fg">
                <label>{f.label}</label>
                <input type={f.type} placeholder={f.ph} value={form[f.id]} onChange={e=>setForm({...form,[f.id]:e.target.value})}/>
              </div>
            ))}
            <div className="fg">
              <label>Votre métier</label>
              <select value={form.metier} onChange={e=>setForm({...form,metier:e.target.value})}>
                <option value="" disabled>Choisissez</option>
                {["Plombier / Chauffagiste","Électricien","Serrurier","Couvreur","Autre artisan d'urgence"].map(m=><option key={m}>{m}</option>)}
              </select>
            </div>
            <button className="form-submit" disabled={done}
              onClick={()=>{
                if(!form.prenom||!form.metier||!form.tel){alert("Merci de remplir tous les champs.");return;}
                setDone(true);
              }}>
              {done?"✓ Reçu — on revient vers vous sous 48h":<>Vérifier si ma zone est libre <Arr s={13}/></>}
            </button>
            <p className="form-note-txt">Sans engagement · Tours uniquement · Données confidentielles</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WAFloat() {
  const [bubble,setBubble] = useState(true);
  useEffect(()=>{const t=setTimeout(()=>setBubble(false),9000);return()=>clearTimeout(t);},[]);
  return (
    <div className="wa-float">
      {bubble&&<div className="wa-bubble-f">Audit gratuit · Réponse sous 48h</div>}
      <a href="https://wa.me/33686018054" className="wa-circle" target="_blank" rel="noopener noreferrer"><WA/></a>
    </div>
  );
}

/* ROOT */
export default function KaptaV9() {
  const [theme,setTheme] = useState(()=>{
    try{return localStorage.getItem("km-t")||(matchMedia("(prefers-color-scheme:light)").matches?"light":"dark")}
    catch{return"dark"}
  });
  const root = useRef(null);
  useReveal(root);

  useEffect(()=>{
    const id="km-v3-css";
    if(!document.getElementById(id)){
      const s=document.createElement("style");s.id=id;s.textContent=CSS;
      document.head.appendChild(s);
    }
  },[]);

  const toggle = () => setTheme(t=>{
    const n=t==="dark"?"light":"dark";
    try{localStorage.setItem("km-t",n)}catch{}
    return n;
  });

  return (
    <div ref={root} className={`km ${theme}`}>
      <Nav theme={theme} toggle={toggle}/>
      <Hero/>
      <MapsSplit/>
      <Solution/>
      <Process/>
      <Equipe/>    {/* ← humanise AVANT de montrer l'offre */}
      <Proof/>
      <Offre/>     {/* ← arrive ici, une fois la valeur et la confiance établies */}
      <Faq/>
      <Cta/>
      <footer>
        <div className="foot-inner">
          <div className="foot-logo">
            <svg className="foot-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.5 8.5L20 7L15 12L21 14L14.5 15.5L16 22L12 17L8 22L9.5 15.5L3 14L9 12L4 7L10.5 8.5L12 2Z" fill="#FF5722"/>
            </svg>
            Kapta Media
          </div>
          <p className="foot-copy">© 2026 Kapta Media · Tours, Indre-et-Loire</p>
          <div className="foot-links">
            <a href="#">Mentions légales</a>
            <a href="#">Confidentialité</a>
            <a href="#cta">Contact</a>
          </div>
        </div>
      </footer>
      <WAFloat/>
    </div>
  );
}
