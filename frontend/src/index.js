import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";
import App from "@/App";

const Blog = lazy(() => import("@/pages/Blog"));
const BTP = lazy(() => import("@/pages/BTP"));
const Plombier = lazy(() => import("@/pages/Plombier"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Article1 = lazy(() => import("@/pages/blog/Article1"));
const Article2 = lazy(() => import("@/pages/blog/Article2"));
const Article3 = lazy(() => import("@/pages/blog/Article3"));
const Article4 = lazy(() => import("@/pages/blog/Article4"));
const Article5 = lazy(() => import("@/pages/blog/Article5"));
const Article6 = lazy(() => import("@/pages/blog/Article6"));
const Article7 = lazy(() => import("@/pages/blog/Article7"));
const Article8 = lazy(() => import("@/pages/blog/Article8"));
const Article9 = lazy(() => import("@/pages/blog/Article9"));
const Article10 = lazy(() => import("@/pages/blog/Article10"));
const Article11 = lazy(() => import("@/pages/blog/Article11"));
const Article12 = lazy(() => import("@/pages/blog/Article12"));

const RouteLoader = () => (
  <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
    <div
      className="w-8 h-8 rounded-full border-2 border-[#1c3ff9]/20 border-t-[#1c3ff9] animate-spin"
      aria-label="Chargement de la page"
    />
  </div>
);

const rootElement = document.getElementById("root");

// Utiliser hydrateRoot si le contenu est pré-rendu, sinon createRoot
const hasPrerenderedContent = rootElement.hasChildNodes();

if (hasPrerenderedContent) {
  // Hydratation pour le contenu pré-rendu par react-snap
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/btp" element={<BTP />} />
            <Route path="/plombier" element={<Plombier />} />
            <Route path="/blog/article1" element={<Article1 />} />
            <Route path="/blog/article2" element={<Article2 />} />
            <Route path="/blog/article3" element={<Article3 />} />
            <Route path="/blog/article4" element={<Article4 />} />
            <Route path="/blog/article5" element={<Article5 />} />
            <Route path="/blog/article6" element={<Article6 />} />
            <Route path="/blog/article7" element={<Article7 />} />
            <Route path="/blog/article8" element={<Article8 />} />
            <Route path="/blog/article9" element={<Article9 />} />
            <Route path="/blog/article10" element={<Article10 />} />
            <Route path="/blog/article11" element={<Article11 />} />
            <Route path="/blog/article12" element={<Article12 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  // Rendu client classique
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/btp" element={<BTP />} />
            <Route path="/plombier" element={<Plombier />} />
            <Route path="/blog/article1" element={<Article1 />} />
            <Route path="/blog/article2" element={<Article2 />} />
            <Route path="/blog/article3" element={<Article3 />} />
            <Route path="/blog/article4" element={<Article4 />} />
            <Route path="/blog/article5" element={<Article5 />} />
            <Route path="/blog/article6" element={<Article6 />} />
            <Route path="/blog/article7" element={<Article7 />} />
            <Route path="/blog/article8" element={<Article8 />} />
            <Route path="/blog/article9" element={<Article9 />} />
            <Route path="/blog/article10" element={<Article10 />} />
            <Route path="/blog/article11" element={<Article11 />} />
            <Route path="/blog/article12" element={<Article12 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  );
}
