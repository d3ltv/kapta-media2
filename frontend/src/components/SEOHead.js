import { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  url = 'https://www.kaptamedia.fr',
  image = 'https://www.kaptamedia.fr/logo2.webp',
  publishedTime,
  modifiedTime,
  category,
  author = 'Kapta Media',
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  googlebot = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
}) => {
  useEffect(() => {
    const isArticlePage = Boolean(publishedTime);

    if (title) {
      document.title = title;
    }

    const setMetaTag = (name, content, property = false) => {
      const attribute = property ? 'property' : 'name';
      const selector = `meta[${attribute}="${name}"]`;
      let element = document.querySelector(selector);

      if (!content) {
        if (element) element.remove();
        return;
      }

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('author', author);

    setMetaTag('og:type', isArticlePage ? 'article' : 'website', true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:image:secure_url', image, true);
    setMetaTag('og:image:alt', title, true);
    setMetaTag('og:site_name', 'Kapta Media', true);
    setMetaTag('og:locale', 'fr_FR', true);

    setMetaTag('article:published_time', isArticlePage ? publishedTime : null, true);
    setMetaTag('article:modified_time', isArticlePage ? (modifiedTime || publishedTime) : null, true);
    setMetaTag('article:section', isArticlePage ? category : null, true);
    setMetaTag('article:author', isArticlePage ? author : null, true);
    setMetaTag('article:publisher', isArticlePage ? 'https://www.kaptamedia.fr' : null, true);

    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:url', url);
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);
    setMetaTag('twitter:image:alt', title);
    setMetaTag('twitter:creator', '@kaptamedia');
    setMetaTag('twitter:site', '@kaptamedia');

    setMetaTag('robots', robots);
    setMetaTag('googlebot', googlebot);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    const scriptId = 'seo-article-jsonld';
    let script = document.getElementById(scriptId);

    if (isArticlePage) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "image": image,
        "url": url,
        "inLanguage": "fr-FR",
        "articleSection": category || "Blog",
        "keywords": keywords || "",
        "author": {
          "@type": "Organization",
          "name": author
        },
          "publisher": {
            "@type": "Organization",
            "name": "Kapta Media",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.kaptamedia.fr/logo2.webp"
            }
          },
        "datePublished": publishedTime,
        "dateModified": modifiedTime || publishedTime,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      };

      if (!script) {
        script = document.createElement('script');
        script.setAttribute('id', scriptId);
        script.setAttribute('type', 'application/ld+json');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else if (script) {
      script.remove();
    }
  }, [title, description, keywords, url, image, publishedTime, modifiedTime, category, author, robots, googlebot]);

  return null;
};

export default SEOHead;
