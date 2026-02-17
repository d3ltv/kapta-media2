const fs = require("fs/promises");
const path = require("path");

const SITE_URL = "https://kaptamedia.fr";
const DEFAULT_IMAGE = `${SITE_URL}/logo2.webp`;

const pages = [
  {
    route: "/",
    title: "KAPTA Media - Visibilité Google Locale | Tours",
    description:
      "KAPTA Media - Optimisation Google Business Profile, vidéo pro et stratégie locale pour améliorer votre visibilité à Tours.",
    keywords:
      "google maps, référencement local, vidéo professionnelle, commerce Tours, fiche google business, optimisation locale, visibilité google, marketing local",
    type: "website",
  },
  {
    route: "/blog",
    title: "Blog Marketing Local & SEO | Kapta Media",
    description:
      "Découvrez nos conseils d'experts en marketing local, SEO et optimisation Google Business Profile. Articles pratiques pour booster votre visibilité locale.",
    keywords:
      "blog marketing local, SEO local, google business profile, conseils marketing, optimisation google maps, avis clients, référencement local",
    type: "website",
  },
  {
    route: "/blog/article1",
    title: "5 Raisons d'Optimiser Votre Fiche Google en 2026 | Kapta Media",
    description:
      "Découvrez pourquoi optimiser votre fiche Google est crucial en 2026. Les entreprises du top 3 reçoivent 126% de clics en plus. Guide complet avec statistiques et conseils.",
    keywords:
      "fiche google, google business profile, référencement local, SEO local, optimisation google maps, visibilité locale, google my business, avis google, top 3 google maps",
    type: "article",
    author: "Kapta Media",
    publishedTime: "2025-02-09T10:00:00+01:00",
    modifiedTime: "2025-02-09T10:00:00+01:00",
    section: "Google Maps",
  },
  {
    route: "/blog/article2",
    title: "Avis en Ligne : Pourquoi Sont-ils Essentiels ? | Kapta Media",
    description:
      "81% des clients lisent systématiquement les avis avant de décider. Découvrez pourquoi les avis Google sont cruciaux pour votre référencement local et comment les gérer efficacement.",
    keywords:
      "avis google, avis clients, e-réputation, gestion avis, référencement local, google reviews, avis en ligne, réputation en ligne, collecte avis",
    type: "article",
    author: "Kapta Media",
    publishedTime: "2025-02-06T10:00:00+01:00",
    modifiedTime: "2025-02-06T10:00:00+01:00",
    section: "Marketing Local",
  },
  {
    route: "/blog/article3",
    title: "Le Pouvoir des Photos et Vidéos sur Votre Fiche Google | Kapta Media",
    description:
      "Les fiches avec photos génèrent 35% de clics en plus. Découvrez comment les visuels transforment votre fiche Google en machine à clients. Guide complet avec statistiques.",
    keywords:
      "photos google, vidéo google business, visuels fiche google, photos professionnelles, vidéo entreprise, marketing visuel, contenu visuel, google maps photos",
    type: "article",
    author: "Kapta Media",
    publishedTime: "2025-02-03T10:00:00+01:00",
    modifiedTime: "2025-02-03T10:00:00+01:00",
    section: "Vidéo",
  },
  {
    route: "/blog/article4",
    title: "La Puissance du Copywriting pour Votre SEO Local | Kapta Media",
    description:
      "75% des internautes jugent votre crédibilité à la qualité de vos textes. Découvrez comment le copywriting améliore votre référencement local et vos conversions de 30%.",
    keywords:
      "copywriting, rédaction web, SEO local, contenu optimisé, rédaction persuasive, texte commercial, mots-clés locaux, conversion, référencement",
    type: "article",
    author: "Kapta Media",
    publishedTime: "2025-01-31T10:00:00+01:00",
    modifiedTime: "2025-01-31T10:00:00+01:00",
    section: "Conseils",
  },
  {
    route: "/blog/article5",
    title: "Comment Dépasser Vos Concurrents sur Google en 2026 | Kapta Media",
    description:
      "Découvrez les 5 clés pour dominer votre marché local en 2026. IA, recherche vocale, optimisation Google : tout ce qu'il faut savoir pour dépasser vos concurrents.",
    keywords:
      "dépasser concurrents, dominer google maps, stratégie SEO local, IA google, recherche vocale, google local services, analyse concurrence, leader local",
    type: "article",
    author: "Kapta Media",
    publishedTime: "2025-01-28T10:00:00+01:00",
    modifiedTime: "2025-01-28T10:00:00+01:00",
    section: "Conseils",
  },
  {
    route: "/blog/article6",
    title: "Votre Profil Google Business est-il Prêt pour 2026 ? | Kapta Media",
    description:
      "En 2026, un profil Google Business incomplet vous rend invisible. Analyse des données Birdeye et plan d'action concret pour renforcer votre visibilité locale.",
    keywords:
      "google business profile 2026, visibilité locale, référencement local, avis google, AI overviews, optimisation fiche google",
    type: "article",
    author: "",
    publishedTime: "2026-02-14T10:00:00+01:00",
    modifiedTime: "2026-02-14T10:00:00+01:00",
    section: "Google Maps",
  },
];

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const upsertTag = (html, regex, tag) => {
  if (regex.test(html)) {
    return html.replace(regex, tag);
  }
  return html.replace("</head>", `  ${tag}\n</head>`);
};

const upsertMetaByName = (html, name, content) =>
  upsertTag(
    html,
    new RegExp(`<meta\\s+[^>]*name=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i"),
    `<meta name="${name}" content="${escapeAttr(content)}" />`
  );

const upsertMetaByProperty = (html, property, content) =>
  upsertTag(
    html,
    new RegExp(
      `<meta\\s+[^>]*property=["']${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`,
      "i"
    ),
    `<meta property="${property}" content="${escapeAttr(content)}" />`
  );

const removeMetaByProperty = (html, property) =>
  html.replace(
    new RegExp(
      `\\s*<meta\\s+[^>]*property=["']${property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>\\s*`,
      "gi"
    ),
    "\n"
  );

const removeMetaByName = (html, name) =>
  html.replace(
    new RegExp(
      `\\s*<meta\\s+[^>]*name=["']${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>\\s*`,
      "gi"
    ),
    "\n"
  );

const makeUrl = (route) => (route === "/" ? `${SITE_URL}/` : `${SITE_URL}${route}`);

const applySeoToHtml = (baseHtml, page) => {
  let html = baseHtml;
  const url = makeUrl(page.route);

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(page.title)}</title>`);
  html = upsertMetaByName(html, "description", page.description);
  html = upsertMetaByName(html, "keywords", page.keywords);

  html = upsertTag(
    html,
    /<link\s+rel=["']canonical["'][^>]*>/i,
    `<link rel="canonical" href="${escapeAttr(url)}" />`
  );

  html = upsertMetaByProperty(html, "og:type", page.type);
  html = upsertMetaByProperty(html, "og:url", url);
  html = upsertMetaByProperty(html, "og:title", page.title);
  html = upsertMetaByProperty(html, "og:description", page.description);
  html = upsertMetaByProperty(html, "og:image", DEFAULT_IMAGE);

  html = upsertMetaByName(html, "twitter:card", "summary_large_image");
  html = upsertMetaByName(html, "twitter:url", url);
  html = upsertMetaByName(html, "twitter:title", page.title);
  html = upsertMetaByName(html, "twitter:description", page.description);
  html = upsertMetaByName(html, "twitter:image", DEFAULT_IMAGE);

  if (page.type === "article") {
    html = upsertMetaByProperty(html, "article:published_time", page.publishedTime);
    html = upsertMetaByProperty(html, "article:modified_time", page.modifiedTime);
    html = upsertMetaByProperty(html, "article:section", page.section);
    if (page.author) {
      html = upsertMetaByProperty(html, "article:author", page.author);
    } else {
      html = removeMetaByProperty(html, "article:author");
      html = removeMetaByName(html, "author");
    }
  } else {
    html = removeMetaByProperty(html, "article:published_time");
    html = removeMetaByProperty(html, "article:modified_time");
    html = removeMetaByProperty(html, "article:section");
    html = removeMetaByProperty(html, "article:author");
  }

  return html;
};

const getOutputPath = (buildDir, route) => {
  if (route === "/") return path.join(buildDir, "index.html");
  const routeParts = route.split("/").filter(Boolean);
  return path.join(buildDir, ...routeParts, "index.html");
};

const run = async () => {
  const buildDir = path.join(__dirname, "..", "build");
  const indexPath = path.join(buildDir, "index.html");
  const baseHtml = await fs.readFile(indexPath, "utf8");

  for (const page of pages) {
    const outputPath = getOutputPath(buildDir, page.route);
    const seoHtml = applySeoToHtml(baseHtml, page);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, seoHtml, "utf8");
  }

  console.log(`[seo-prerender] Generated ${pages.length} static SEO pages.`);
};

run().catch((error) => {
  console.error("[seo-prerender] Failed:", error);
  process.exit(1);
});
