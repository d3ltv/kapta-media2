import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";

const App = lazy(() => import("@/App"));
const Blog = lazy(() => import("@/pages/Blog"));
const Article1 = lazy(() => import("@/pages/blog/Article1"));
const Article2 = lazy(() => import("@/pages/blog/Article2"));
const Article3 = lazy(() => import("@/pages/blog/Article3"));
const Article4 = lazy(() => import("@/pages/blog/Article4"));
const Article5 = lazy(() => import("@/pages/blog/Article5"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/article1" element={<Article1 />} />
          <Route path="/blog/article2" element={<Article2 />} />
          <Route path="/blog/article3" element={<Article3 />} />
          <Route path="/blog/article4" element={<Article4 />} />
          <Route path="/blog/article5" element={<Article5 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
);
