import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/index.css";
import App from "@/App";
import Blog from "@/pages/Blog";
import Article1 from "@/pages/blog/Article1";
import Article2 from "@/pages/blog/Article2";
import Article3 from "@/pages/blog/Article3";
import Article4 from "@/pages/blog/Article4";
import Article5 from "@/pages/blog/Article5";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/article1" element={<Article1 />} />
        <Route path="/blog/article2" element={<Article2 />} />
        <Route path="/blog/article3" element={<Article3 />} />
        <Route path="/blog/article4" element={<Article4 />} />
        <Route path="/blog/article5" element={<Article5 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

