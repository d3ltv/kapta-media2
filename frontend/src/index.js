import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";
import App from "@/App";

const Blog = lazy(() => import("@/pages/Blog"));
const Article1 = lazy(() => import("@/pages/blog/Article1"));
const Article2 = lazy(() => import("@/pages/blog/Article2"));
const Article3 = lazy(() => import("@/pages/blog/Article3"));
const Article4 = lazy(() => import("@/pages/blog/Article4"));
const Article5 = lazy(() => import("@/pages/blog/Article5"));
const Article6 = lazy(() => import("@/pages/blog/Article6"));

const RouteLoader = () => (
  <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center">
    <div
      className="w-8 h-8 rounded-full border-2 border-[#1c3ff9]/20 border-t-[#1c3ff9] animate-spin"
      aria-label="Chargement de la page"
    />
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/article1" element={<Article1 />} />
          <Route path="/blog/article2" element={<Article2 />} />
          <Route path="/blog/article3" element={<Article3 />} />
          <Route path="/blog/article4" element={<Article4 />} />
          <Route path="/blog/article5" element={<Article5 />} />
          <Route path="/blog/article6" element={<Article6 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
