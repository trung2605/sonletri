import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "../components/ui/Navbar.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import { meta } from "../data/report.js";
import { posts } from "../data/blog.js";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Blog" }]} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl font-bold text-brand-900 tracking-tight"
        >
          Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-slate-500 max-w-xl"
        >
          Ghi chú, cập nhật và phân tích từ {meta.companyShort}.
        </motion.p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-col h-full rounded-2xl border border-brand-100 bg-white p-6 shadow-sm hover:shadow-lg hover:border-brand-300 transition-all"
              >
                <span className="inline-block w-fit px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wide">
                  {post.tag}
                </span>
                <p className="mt-4 font-display text-lg font-bold text-brand-900">{post.title}</p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>{post.date}</span>
                  <ArrowRight size={16} className="text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="border-t border-brand-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2026 {meta.company}</span>
          <span>{meta.department}</span>
        </div>
      </footer>
    </div>
  );
}
