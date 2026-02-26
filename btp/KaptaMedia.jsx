import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   GLOBAL CSS (injected once)
───────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Instrument+Serif:ital@0;1&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px;-webkit-text-size-adjust:100%}

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
  padding:14px 20px;display:flex;align-items:center;justify-content:space-between;gap:12px;
  background:var(--nav-bg);backdrop-filter:blur(20px);border-bottom:1px solid var(--line);
  transition:background var(--tr),border-color var(--tr);
}
.km-logo{font-weight:800;font-size:.95rem;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
.km-logo-dot{width:9px;height:9px;border-radius:50%;background:var(--fire);animation:throb 2.2s ease-in-out infinite}
@keyframes throb{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.5);opacity:.55}}
.km-nav-right{display:flex;align-items:center;gap:10px}
.km-theme-btn{
  width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--bg3);border:1px solid var(--line);color:var(--muted);
  cursor:pointer;font-family:inherit;transition:background var(--tr),color .2s,transform .15s;
}
.km-theme-btn:hover{color:var(--bone);background:var(--bg2)}
.km-theme-btn:active{transform:scale(.92)}
.km-nav-btn{
  background:var(--fire);color:#fff;font-weight:800;font-size:.78rem;
  letter-spacing:.03em;text-transform:uppercase;padding:10px 16px;border-radius:3px;
  transition:background .2s,transform .15s;cursor:pointer;border:none;font-family:inherit;display:inline-block;
}
.km-nav-btn:hover{background:var(--fire-l)}
.km-nav-btn:active{transform:scale(.97)}

/* LAYOUT */
.km-wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 20px}
.km-label{font-weight:700;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--fire);margin-bottom:12px;display:block}
.km-section{padding:90px 0}

/* HERO */
#hero{
  min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;
  padding:80px 0 64px;position:relative;overflow:hidden;
}
.hero-bg-word{
  position:absolute;top:50%;left:-2%;transform:translateY(-52%);
  font-weight:800;font-size:clamp(22vw,30vw,340px);line-height:.85;
  letter-spacing:-.05em;color:rgba(240,82,26,.05);pointer-events:none;user-select:none;white-space:nowrap;
  transition:color var(--tr);
}
.light .hero-bg-word{color:rgba(240,82,26,.07)}
.km-missed-call{
  position:absolute;top:100px;right:20px;
  background:var(--bg2);border:1px solid var(--line);border-radius:14px;
  padding:12px 16px;width:220px;display:flex;align-items:center;gap:10px;
  animation:callBounce 5s ease-in-out 1.2s infinite;
  box-shadow:0 20px 40px var(--shadow);transition:background var(--tr),border-color var(--tr);z-index:2;
}
@keyframes callBounce{
  0%{opacity:0;transform:translateY(-12px)}
  12%{opacity:1;transform:translateY(0)}
  80%{opacity:1;transform:translateY(0)}
  100%{opacity:0;transform:translateY(-12px)}
}
.mc-icon{width:36px;height:36px;border-radius:50%;background:rgba(240,82,26,.15);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.mc-text{font-size:.72rem;line-height:1.4}
.mc-text strong{display:block;font-weight:700;font-size:.78rem;color:var(--bone)}
.mc-text span{color:var(--muted)}
.hero-content{position:relative;z-index:2}
@media(min-width:900px){.hero-inner{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:end}}
.hero-h1{font-weight:800;font-size:clamp(2.6rem,8vw,5.5rem);line-height:1.02;letter-spacing:-.045em;margin-bottom:24px}
.hero-h1 .thin{font-weight:200;letter-spacing:-.02em}
.hero-h1 .fire{color:var(--fire)}
.hero-body{font-size:clamp(.92rem,2.2vw,1.05rem);font-weight:300;line-height:1.72;color:var(--muted);margin-bottom:32px;max-width:460px}
.hero-body strong{color:var(--bone);font-weight:500}
.hero-ctas{display:flex;flex-direction:column;gap:12px}
@media(min-width:500px){.hero-ctas{flex-direction:row;flex-wrap:wrap}}
.cta-main{
  display:inline-flex;align-items:center;justify-content:center;gap:10px;
  background:var(--fire);color:#fff;font-weight:800;font-size:.98rem;
  padding:17px 24px;border-radius:3px;transition:background .2s,transform .15s;
}
.cta-main:hover{background:var(--fire-l);box-shadow:0 8px 28px rgba(240,82,26,.3)}
.cta-main:active{transform:scale(.98)}
.cta-call{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  border:1px solid var(--line);color:var(--muted);font-weight:500;font-size:.9rem;
  padding:15px 20px;border-radius:3px;transition:border-color .2s,color .2s;
}
.cta-call:hover{border-color:var(--muted);color:var(--bone)}
.hero-proof{margin-top:36px;padding-top:28px;border-top:1px solid var(--line);display:flex;align-items:center;gap:14px;flex-wrap:wrap}
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
@media(min-width:900px){.hero-right{display:flex;flex-direction:column;gap:16px;padding-bottom:8px}}
.live-card{
  background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:20px;
  transition:background var(--tr),border-color var(--tr);
}
.lc-tag{font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--fire);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.lc-tag::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--fire);animation:throb 2s infinite;flex-shrink:0}
.lc-stat{font-weight:800;font-size:2.4rem;letter-spacing:-.05em;color:var(--bone);line-height:1;margin-bottom:4px}
.lc-desc{font-size:.8rem;color:var(--muted);line-height:1.5}

/* TICKER */
.km-ticker{overflow:hidden;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:var(--bg2);padding:13px 0;transition:background var(--tr)}
.ticker-track{display:flex;white-space:nowrap;animation:tick 30s linear infinite}
.ticker-track:hover{animation-play-state:paused}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.ticker-item{display:inline-flex;align-items:center;gap:10px;padding:0 28px;font-weight:600;font-size:.8rem;letter-spacing:.02em;color:var(--muted)}
.ticker-item span{color:var(--fire);font-weight:800;font-size:.95rem}

/* QUESTION */
#question{background:var(--bg);transition:background var(--tr)}
@media(min-width:900px){.q-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}}
.q-giant{font-weight:800;font-size:clamp(1.9rem,5.5vw,4rem);line-height:1.06;letter-spacing:-.04em;margin-bottom:16px}
.q-sub{font-family:var(--ff-s);font-style:italic;font-size:clamp(.95rem,2.2vw,1.2rem);color:var(--muted);margin-bottom:40px;line-height:1.6}
.maps-caption{font-family:var(--ff-s);font-style:italic;font-size:clamp(.88rem,2vw,.98rem);color:var(--muted);line-height:1.7;margin-top:20px}
.maps-caption strong{color:var(--bone);font-style:normal}
.gmaps-mock{border-radius:10px;overflow:hidden;border:1px solid var(--line);background:var(--bg2);transition:background var(--tr),border-color var(--tr)}
.light .gmaps-mock{background:#E8E2D4}
.gmaps-header{background:var(--bg3);padding:12px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--line);transition:background var(--tr)}
.gmaps-search{background:var(--bg2);border-radius:4px;padding:9px 14px;flex:1;font-size:.8rem;color:var(--muted);display:flex;align-items:center;gap:8px;transition:background var(--tr)}
.gmaps-dot{width:8px;height:8px;border-radius:50%;background:#4285F4;flex-shrink:0}
.gmap-result{padding:16px;border-bottom:1px solid var(--line);display:flex;align-items:flex-start;gap:12px}
.gmap-result:last-child{border-bottom:none}
.gr-rank{font-weight:800;font-size:1.1rem;width:28px;flex-shrink:0;padding-top:2px;color:var(--muted)}
.gmap-result.competitor .gr-rank{color:#4285F4}
.gmap-result.you .gr-rank{color:var(--fire);animation:rankPulse 2.5s ease-in-out infinite}
@keyframes rankPulse{0%,100%{opacity:.25}50%{opacity:1}}
.gr-body{flex:1;min-width:0}
.gr-name{font-weight:700;font-size:.88rem;margin-bottom:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.gmap-result.competitor .gr-name{color:var(--bone)}
.gmap-result.you .gr-name{color:var(--muted);font-style:italic}
.gr-stars{display:flex;align-items:center;gap:4px;margin-bottom:3px}
.gr-star{color:#FBBC04;font-size:.72rem}
.gr-star.g{color:var(--bg3);transition:color var(--tr)}
.gr-rating{font-size:.7rem;color:var(--muted)}
.gr-tag{display:inline-block;font-size:.65rem;font-weight:700;background:rgba(66,133,244,.1);color:#8AB4F8;border-radius:3px;padding:2px 6px;margin-top:2px}
.gmap-result.you .gr-tag{background:rgba(240,82,26,.1);color:var(--fire)}

/* STRIP */
#strip{padding:80px 0;background:var(--fire);overflow:hidden;position:relative}
.strip-bg-num{position:absolute;right:-3%;top:50%;transform:translateY(-50%);font-weight:800;font-size:clamp(120px,28vw,300px);line-height:.8;color:rgba(12,12,9,.1);pointer-events:none;user-select:none}
.strip-inner{position:relative;z-index:1}
@media(min-width:900px){.strip-inner{display:grid;grid-template-columns:auto 1fr;gap:48px;align-items:center}}
.strip-stat{font-weight:800;font-size:clamp(4rem,14vw,9rem);line-height:.9;letter-spacing:-.05em;color:#0C0C09;margin-bottom:16px}
@media(min-width:900px){.strip-stat{margin-bottom:0}}
.strip-label{font-weight:400;font-size:clamp(1rem,2.5vw,1.25rem);color:rgba(12,12,9,.65);line-height:1.6}
.strip-label strong{color:#0C0C09;font-weight:700}

/* SOLUTION */
#solution{background:var(--bg2);padding:0;transition:background var(--tr)}
.pilier{padding:80px 20px;max-width:1120px;margin:0 auto;border-bottom:1px solid var(--line);transition:border-color var(--tr)}
@media(min-width:700px){.pilier{display:grid;grid-template-columns:90px 1fr;gap:32px;align-items:start}}
@media(min-width:900px){.pilier{grid-template-columns:120px 1fr}}
.pilier-num{font-weight:800;font-size:clamp(4rem,10vw,7rem);line-height:.85;letter-spacing:-.05em;color:var(--fire);opacity:.2;padding-top:4px;transition:opacity .4s;cursor:default}
.pilier:hover .pilier-num{opacity:1}
.pilier-kicker{font-weight:700;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;color:var(--fire);margin-bottom:14px;display:block}
.pilier-h{font-weight:800;font-size:clamp(1.5rem,4vw,2.6rem);line-height:1.06;letter-spacing:-.03em;margin-bottom:18px}
.pilier-p{font-size:clamp(.88rem,1.8vw,.98rem);font-weight:300;color:var(--muted);line-height:1.75;margin-bottom:22px}
.pilier-p strong{color:var(--bone);font-weight:500}
.pilier-items{list-style:none;display:flex;flex-direction:column;gap:10px}
.pilier-items li{display:flex;align-items:flex-start;gap:10px;font-size:.87rem;color:var(--muted);line-height:1.5}
.pilier-items li::before{content:'→';color:var(--fire);font-weight:700;flex-shrink:0}
.pilier-items li strong{color:var(--bone);font-weight:500}

/* DIFF */
#diff{padding:100px 0;background:var(--bg);transition:background var(--tr)}
.diff-h{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:12px}
.diff-h em{font-family:var(--ff-s);font-style:italic;font-weight:400;font-size:.82em;color:var(--muted)}
.diff-header-row,.diff-row{display:grid;grid-template-columns:1fr 1fr}
.diff-table-wrap{margin-top:48px;overflow-x:auto}
.diff-th{padding:13px 18px;font-weight:700;font-size:.7rem;letter-spacing:.1em;text-transform:uppercase}
.diff-th.them{color:var(--muted);border-right:1px solid var(--line)}
.diff-th.us{color:#0C0C09;background:var(--fire);border-radius:4px 4px 0 0}
.diff-row{border-bottom:1px solid var(--line)}
.diff-row:first-child{border-top:1px solid var(--line)}
.diff-cell{padding:18px;font-size:.88rem;line-height:1.5;display:flex;align-items:flex-start;gap:9px}
@media(min-width:640px){.diff-cell{padding:22px 24px}}
.diff-cell.them{color:var(--muted);border-right:1px solid var(--line)}
.diff-cell.them::before{content:'✗';color:rgba(240,82,26,.4);font-weight:800;flex-shrink:0}
.diff-cell.us{color:var(--bone);font-weight:500;background:rgba(240,82,26,.04)}
.diff-cell.us::before{content:'✓';color:var(--fire);font-weight:800;flex-shrink:0}

/* PROOF */
#proof{padding:100px 0;background:var(--bg2);transition:background var(--tr)}
@media(min-width:900px){.proof-layout{display:grid;grid-template-columns:1fr 380px;gap:64px;align-items:start}}
.proof-text-col h2{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:20px}
.proof-text-col p{font-size:.95rem;color:var(--muted);line-height:1.72;max-width:460px;margin-bottom:40px}
.proof-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:8px;overflow:hidden}
.pm-cell{background:var(--bg3);padding:24px 14px;text-align:center;transition:background var(--tr)}
.pm-val{font-weight:800;font-size:clamp(1.5rem,4vw,2.2rem);color:var(--fire);letter-spacing:-.04em;display:block;margin-bottom:6px}
.pm-label{font-size:.73rem;color:var(--muted);line-height:1.4}
.sms-phone{background:#111;border-radius:28px;border:5px solid #222;max-width:360px;margin:40px auto 0;overflow:hidden;box-shadow:0 40px 80px var(--shadow)}
@media(min-width:900px){.sms-phone{margin:0}}
.sms-topbar{background:#1A1A1A;padding:14px 18px;display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(255,255,255,.04)}
.sms-avatar{width:36px;height:36px;border-radius:50%;background:rgba(240,82,26,.15);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.8rem;color:var(--fire);flex-shrink:0}
.sms-name{font-weight:700;font-size:.85rem;color:#fff}
.sms-job{font-size:.7rem;color:#666;margin-top:1px}
.sms-body{padding:18px;display:flex;flex-direction:column;gap:12px;background:#0F0F0F;min-height:180px}
.bubble{max-width:88%;padding:11px 14px;border-radius:18px;font-size:.85rem;line-height:1.55;transition:opacity .3s,transform .3s}
.bubble.client{background:#2A2A2A;color:#E0E0E0;border-bottom-left-radius:4px;align-self:flex-start}
.bubble.kapta{background:var(--fire);color:#0C0C09;border-bottom-right-radius:4px;align-self:flex-end;font-weight:500}
.bubble-time{font-size:.62rem;color:#555;margin-top:4px}
.bubble.kapta .bubble-time{text-align:right;color:rgba(12,12,9,.5)}
.sms-nav{display:flex;border-top:1px solid rgba(255,255,255,.05);background:#1A1A1A}
.sms-tab{flex:1;padding:13px;text-align:center;font-weight:700;font-size:.7rem;color:#555;border:none;background:transparent;cursor:pointer;transition:color .2s,background .2s;font-family:inherit}
.sms-tab.active{color:var(--fire);background:rgba(240,82,26,.07)}

/* OFFER */
#offer{padding:100px 0;background:var(--bg);transition:background var(--tr)}
.offer-hook{font-family:var(--ff-s);font-style:italic;font-size:clamp(1.3rem,4vw,2.1rem);line-height:1.5;color:var(--bone);margin-bottom:10px}
.offer-hook strong{font-style:normal;font-family:var(--ff-h);font-weight:800;color:var(--fire)}
.offer-intro{font-size:.9rem;color:var(--muted);line-height:1.7;max-width:520px;margin-bottom:48px}
.offer-intro a{color:var(--fire);font-weight:600;text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(240,82,26,.3)}
.offer-intro a:hover{text-decoration-color:var(--fire)}
.gs-card{background:var(--bg2);border:1px solid rgba(240,82,26,.22);border-radius:12px;overflow:hidden;position:relative;transition:background var(--tr),border-color var(--tr)}
.gs-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--fire),var(--fire-l))}
.gs-header{padding:28px 24px 22px;border-bottom:1px solid var(--line)}
.gs-badge{display:inline-block;background:var(--fire);color:#fff;font-weight:800;font-size:.7rem;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:3px;margin-bottom:14px}
.gs-tag{font-size:.78rem;color:var(--muted);margin-bottom:8px}
.gs-tagline{font-weight:700;font-size:clamp(1.05rem,2.8vw,1.35rem);line-height:1.3;color:var(--bone);letter-spacing:-.02em}
.gs-stack{padding:0 24px 8px}
.gs-stack-title{font-weight:700;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);padding:22px 0 14px;border-bottom:1px solid var(--line)}
.gs-item{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:18px 0;border-bottom:1px solid var(--line)}
.gs-item.bonus{background:rgba(240,82,26,.03);margin:0 -24px;padding:18px 24px}
.gs-bonus-label{display:inline-block;font-size:.6rem;font-weight:800;letter-spacing:.14em;color:var(--fire);border:1px solid rgba(240,82,26,.3);border-radius:3px;padding:2px 6px;margin-bottom:6px}
.gs-item-body{flex:1;min-width:0}
.gs-item-name{font-weight:700;font-size:.9rem;color:var(--bone);margin-bottom:4px;line-height:1.3}
.gs-item-desc{font-size:.78rem;color:var(--muted);line-height:1.6}
.gs-item-price{font-weight:800;font-size:.88rem;color:var(--muted);white-space:nowrap;flex-shrink:0;text-decoration:line-through;opacity:.4}
.gs-totals{padding:0 24px}
.gs-total-row{display:flex;justify-content:space-between;padding:16px 0 6px}
.gs-total-label{font-size:.78rem;color:var(--muted)}
.gs-total-val{font-weight:700;font-size:1rem;color:var(--muted);text-decoration:line-through;opacity:.4}
.gs-price-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0 4px;border-top:1px solid rgba(240,82,26,.2)}
.gs-price-label{font-weight:800;font-size:.88rem;color:var(--bone)}
.gs-price-main{font-weight:800;font-size:2.4rem;letter-spacing:-.04em;color:var(--fire)}
.gs-roi{font-family:var(--ff-s);font-style:italic;font-size:.9rem;color:var(--muted);padding:14px 0 20px;line-height:1.6;border-bottom:1px solid var(--line)}
.gs-guarantee{margin:0 24px;padding:20px;background:rgba(240,82,26,.09);border:1px solid rgba(240,82,26,.18);border-radius:8px;margin-top:20px;display:flex;gap:14px;align-items:flex-start}
.gs-g-icon{width:42px;height:42px;border-radius:50%;background:var(--fire);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.gs-g-title{font-weight:800;font-size:.9rem;color:var(--bone);margin-bottom:5px}
.gs-g-text{font-size:.8rem;color:var(--muted);line-height:1.65}
.gs-cta{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--fire);color:#fff;font-weight:800;font-size:.98rem;padding:17px 24px;margin:22px 24px 10px;border-radius:3px;transition:background .2s,transform .15s;cursor:pointer;border:none;font-family:inherit;width:calc(100% - 48px);text-decoration:none}
.gs-cta:hover{background:var(--fire-l)}
.gs-cta:active{transform:scale(.98)}
.gs-scarcity{display:flex;align-items:center;gap:8px;padding:0 24px 22px;font-size:.76rem;color:var(--muted);line-height:1.5}
.gs-scarcity-dot{width:7px;height:7px;border-radius:50%;background:var(--fire);flex-shrink:0;animation:throb 2s infinite}
.sub-teaser{margin-top:40px;padding:24px;background:var(--bg2);border:1px solid var(--line);border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;transition:background var(--tr),border-color var(--tr)}
.st-text h4{font-weight:700;font-size:.95rem;margin-bottom:4px}
.st-text p{font-size:.82rem;color:var(--muted);line-height:1.5}
.st-link{display:inline-flex;align-items:center;gap:8px;background:var(--bg3);color:var(--bone);font-weight:700;font-size:.82rem;padding:11px 18px;border-radius:3px;white-space:nowrap;border:1px solid var(--line);transition:border-color .2s,background .2s;flex-shrink:0}
.st-link:hover{border-color:var(--muted);background:var(--bg2)}
.offer-legal{margin-top:32px;padding:18px 22px;background:var(--bg2);border-left:2px solid var(--fire);font-size:.78rem;color:var(--muted);line-height:1.7;transition:background var(--tr)}
.offer-legal strong{color:var(--bone)}

/* PROCESS */
#process{padding:100px 0;background:var(--bg2);transition:background var(--tr)}
@media(min-width:900px){.process-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}}
.section-h{font-weight:800;font-size:clamp(1.8rem,5vw,3.2rem);line-height:1.05;letter-spacing:-.04em;margin-bottom:14px}
.section-h em{font-family:var(--ff-s);font-style:italic;font-weight:400;font-size:.82em;color:var(--muted)}
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
.cta-alarm{font-family:var(--ff-s);font-style:italic;font-size:clamp(1.4rem,5vw,2.6rem);line-height:1.35;color:var(--bone);margin-bottom:14px}
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
.wa-bubble{background:var(--bg2);border:1px solid var(--line);border-radius:12px 12px 0 12px;padding:10px 14px;font-size:.75rem;color:var(--muted);max-width:200px;text-align:right;line-height:1.4;box-shadow:0 4px 20px var(--shadow);transition:opacity .6s,background var(--tr),border-color var(--tr)}
.wa-float-btn{width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .2s,box-shadow .2s;flex-shrink:0}
.wa-float-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,.5)}
.wa-float-btn:active{transform:scale(.95)}

/* REVEAL */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .6s cubic-bezier(.22,.68,0,1.2),transform .6s cubic-bezier(.22,.68,0,1.2)}
.reveal.in{opacity:1;transform:translateY(0)}
.reveal.d1{transition-delay:.1s}.reveal.d2{transition-delay:.2s}.reveal.d3{transition-delay:.3s}.reveal.d4{transition-delay:.4s}

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
  return (
    <nav className="km-nav">
      <div className="km-logo">
        <div className="km-logo-dot" />
        Kapta Media
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

function Hero() {
  const bgRef = useRef(null);
  useEffect(() => {
    const handler = () => {
      if (bgRef.current) bgRef.current.style.transform = `translateY(calc(-52% + ${window.scrollY * 0.18}px))`;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <section id="hero">
      <div className="hero-bg-word" ref={bgRef} aria-hidden="true">VISIBLE</div>
      <div className="km-missed-call" aria-hidden="true">
        <div className="mc-icon">
          <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
            <path d="M16.5 12.3a1.5 1.5 0 0 1-1.5 1.5A14 14 0 0 1 1.2 3a1.5 1.5 0 0 1 1.5-1.5H5.3L6.6 4.9l-2 1a11 11 0 0 0 6.5 6.5l1-2 3 1.3-.1.6z" fill="#F0521A"/>
          </svg>
        </div>
        <div className="mc-text">
          <strong>Appel manqué</strong>
          <span>Nouveau client — cherchait un plombier</span>
        </div>
      </div>
      <div className="km-wrap hero-content">
        <div className="hero-inner">
          <div className="hero-left">
            <h1 className="hero-h1">
              Quelqu'un vient<br/>
              <span className="thin">de décrocher</span><br/>
              <span className="fire">votre chantier.</span>
            </h1>
            <p className="hero-body">
              C'est votre concurrent. Il était premier sur Google Maps.<br/>
              <strong>Vous n'étiez pas dans les résultats.</strong><br/>
              Kapta Media règle ça — depuis Tours, en venant chez vous.
            </p>
            <div className="hero-ctas">
              <a href="#cta-final" className="cta-main"><ArrowIcon/>Voir si ma zone est libre</a>
              <a href="tel:+33686018054" className="cta-call"><PhoneIcon/>06 86 01 80 54</a>
            </div>
            <div className="hero-proof">
              <div className="proof-faces">
                {["MB","TL","FC","+"].map(l => <em key={l} className="proof-face">{l}</em>)}
              </div>
              <div className="proof-text">
                <strong>Artisans accompagnés à Tours</strong>
                Plombiers, électriciens, installateurs PAC
              </div>
            </div>
          </div>
          <div className="hero-right" aria-hidden="true">
            {[
              { delay:"d1", tag:"En ce moment sur Google Maps", stat:"88%", desc:"des internautes cliquent sur les 3 premières fiches. Sans regarder plus loin." },
              { delay:"d2", tag:"Votre concurrent — cette semaine", stat:"×4", desc:"plus d'appels reçus qu'une fiche non optimisée. Mesurable. Documenté. Réel." },
              { delay:"d3", tag:"Ce qu'on vous demande", stat:"90 min", desc:"de votre temps sur site. On s'occupe de 100% du reste." },
            ].map(c => (
              <div key={c.stat} className={`live-card reveal ${c.delay}`}>
                <div className="lc-tag">{c.tag}</div>
                <div className="lc-stat">{c.stat}</div>
                <div className="lc-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
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
        <>Zéro stock photo. Votre visage, vos mains, votre travail.</>,
        <>Aucune agence nationale ne peut envoyer quelqu'un chez vous. C'est notre barrière.</>,
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

  const switchTo = (idx) => {
    setActive(idx);
    setMsgs([]);
    setTimeout(() => { setMsgs(SMS_CONVOS[idx].msgs); setKey(k => k + 1); }, 50);
  };

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
              {[["×4","appels reçus en 3 mois"],["Top 3","position Maps sans délai garanti"],["12+","secteurs couverts"]].map(([v,l]) => (
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

function Offer() {
  return (
    <section id="offer" className="km-section">
      <div className="km-wrap">
        <span className="km-label">L'offre</span>
        <p className="offer-hook reveal">On vous demande <strong>90 minutes.</strong><br/>On vous livre une infrastructure qui aspire les appels de vos concurrents.</p>
        <p className="offer-intro reveal d1">
          Un déploiement unique. Des résultats durables.
          Et si vous voulez aller plus loin, <a href="#">découvrez l'abonnement mensuel →</a>
        </p>
        <div className="gs-card reveal d1">
          <div className="gs-header">
            <div className="gs-badge">Le Système Monopole Local BTP™</div>
            <div className="gs-tag">One Shot · 100% Done-For-You · Méthode GVA™</div>
            <div className="gs-tagline">On déploie l'infrastructure complète. Vous recevez les appels.</div>
          </div>
          <div className="gs-stack">
            <div className="gs-stack-title">Ce que vous recevez</div>
            {STACK_ITEMS.map(item => (
              <div key={item.name} className={`gs-item${item.bonus?" bonus":""}`}>
                <div className="gs-item-body">
                  {item.bonus && <div className="gs-bonus-label">BONUS</div>}
                  <div className="gs-item-name">{item.name}</div>
                  <div className="gs-item-desc">{item.desc}</div>
                </div>
                <div className="gs-item-price">{item.price}</div>
              </div>
            ))}
          </div>
          <div className="gs-totals">
            <div className="gs-total-row"><span className="gs-total-label">Valeur totale</span><span className="gs-total-val">3 343 €</span></div>
            <div className="gs-price-row"><span className="gs-price-label">Prix aujourd'hui</span><span className="gs-price-main">1 250 €</span></div>
            <p className="gs-roi">1 250€ c'est moins de 10% de la marge d'une salle de bain. Combien vous en avez raté ce mois-ci ?</p>
          </div>
          <div className="gs-guarantee">
            <div className="gs-g-icon"><ShieldIcon/></div>
            <div>
              <div className="gs-g-title">Garantie "Chantier Signé"</div>
              <div className="gs-g-text">Si dans les 90 jours suivant le déploiement vous n'avez pas signé au moins un nouveau chantier grâce à notre système — on continue à gérer votre fiche gratuitement jusqu'à ce que ce soit le cas. Sans débat.</div>
            </div>
          </div>
          <a href="#cta-final" className="gs-cta">Je veux déployer le système <ArrowIcon/></a>
          <p className="gs-scarcity"><span className="gs-scarcity-dot"/>1 seul créneau de tournage disponible cette semaine — le premier qui valide verrouille sa zone.</p>
        </div>
        <div className="sub-teaser reveal">
          <div className="st-text">
            <h4>Vous voulez dominer Google Maps durablement ?</h4>
            <p>Le One Shot pose les fondations. L'abonnement à 299€/mois les exploite au fil du temps. Découvrez ce qu'il inclut.</p>
          </div>
          <a href="#" className="st-link">Voir l'abonnement <ArrowIcon size={14}/></a>
        </div>
        <div className="offer-legal reveal">
          <strong>Note légale :</strong> Aucun classement précis garanti dans un délai défini — c'est impossible à promettre et illégal (Art. L.121-2 du Code de la consommation). Ce qu'on garantit : une progression documentée, tracée, et la garantie Chantier Signé ci-dessus. Si ça ne bouge pas, on vous le dit en face — pas dans un email automatique.
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
            <span className="km-label">Comment ça se passe</span>
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
  const [showBubble, setShowBubble] = useState(true);
  useEffect(() => { const t = setTimeout(() => setShowBubble(false), 10000); return () => clearTimeout(t); }, []);
  return (
    <div className="wa-float">
      {showBubble && (
        <div className="wa-bubble" style={{ opacity: showBubble ? 1 : 0 }}>
          Votre concurrent est peut-être déjà en train de nous écrire.
        </div>
      )}
      <a href="https://wa.me/33686018054?text=Bonjour%20je%20voudrais%20savoir%20si%20ma%20zone%20est%20disponible" className="wa-float-btn" target="_blank" rel="noopener noreferrer" aria-label="Contacter par WhatsApp">
        <WAIcon/>
      </a>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT
───────────────────────────────────────────── */
export default function KaptaMedia() {
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
    <div ref={rootRef} className={`km-root ${theme}`}>
      <Nav theme={theme} onToggle={toggleTheme}/>
      <Hero/>
      <Ticker/>
      <QuestionSection/>
      <Strip/>
      <Solution/>
      <Diff/>
      <Testimonials/>
      <Offer/>
      <Process/>
      <CtaFinal/>
      <Footer/>
      <WaFloat/>
    </div>
  );
}
