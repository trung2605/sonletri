import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/ui/Navbar.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import { meta } from "../data/report.js";
import { posts } from "../data/blog.js";

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Blog", to: "/blog" },
          { label: post?.title || "Bài viết" },
        ]}
      />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          <ArrowLeft size={16} />
          Về Blog
        </Link>

        {post ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <span className="inline-block px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide">
              {post.tag}
            </span>
            <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold text-brand-900 tracking-tight">
              {post.title}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{post.date}</p>
            <p className="mt-6 text-slate-600 leading-relaxed">{post.excerpt}</p>
          </motion.article>
        ) : (
          <div className="mt-10 text-center text-slate-500">Không tìm thấy bài viết này.</div>
        )}
      </main>

      <footer className="border-t border-brand-100 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2026 {meta.company}</span>
          <span>{meta.department}</span>
        </div>
      </footer>
    </div>
  );
}
