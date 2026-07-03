import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, User, BookOpen, Mail, MapPin } from "lucide-react";
import { meta, director } from "../data/report.js";
import { REPORTS } from "../data/reports.js";
import heroPhoto from "../assets/photos/airport-terminal-1.webp";
import directorPhoto from "../assets/photos/le-tri-son-portrait.webp";
import Navbar from "../components/ui/Navbar.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Hero: portal intro ── */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4"
            >
              {meta.companyShort} Portal
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold text-brand-900 leading-[1.05] tracking-tight"
            >
              Trang thông tin
              <br />
              báo cáo doanh nghiệp
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-500 text-lg max-w-md leading-relaxed"
            >
              Tổng hợp các báo cáo tài chính, phân tích số liệu kinh doanh và các
              ấn phẩm chuyên sâu từ {meta.companyShort}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/reports"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
              >
                Khám phá báo cáo
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-brand-200 text-brand-700 font-semibold hover:bg-brand-50 hover:-translate-y-0.5 active:scale-[0.98] transition-all"
              >
                Về tôi
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-200/50 aspect-4/3 md:-mr-6 md:mt-8"
          >
            <img src={heroPhoto} alt="Nhà ga quốc tế Đà Nẵng" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── Report gallery ── */}
      <section className="bg-brand-50/30 border-y border-brand-100">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-2"
          >
            <FileText size={18} className="text-brand-600" />
            <span className="uppercase text-xs font-semibold text-brand-700 tracking-wide">Báo cáo của tôi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-3xl md:text-4xl font-bold text-brand-900 tracking-tight"
          >
            Các báo cáo hiện có
          </motion.h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REPORTS.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  to={`/presentation?report=${report.id}`}
                  className="group flex flex-col h-full rounded-2xl border border-brand-100 bg-white shadow-sm hover:shadow-lg hover:border-brand-300 transition-all overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={report.thumbnail}
                      alt={report.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-sm font-semibold text-white drop-shadow line-clamp-2">
                        {report.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 flex-1">
                      {report.desc}
                    </p>
                    {report.stats && (
                      <div className="mt-3 flex gap-2 flex-wrap">
                        {report.stats.map((s) => (
                          <span
                            key={s.label}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-semibold"
                          >
                            <span className="font-normal text-brand-500">{s.label}</span>
                            <span>{s.value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 pt-2.5 border-t border-brand-100 flex items-center justify-between">
                      <span className="text-xs text-brand-600 font-medium group-hover:text-brand-700 transition-colors">
                        Mở báo cáo
                      </span>
                      <ArrowRight size={14} className="text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <Link
              to="/reports"
              className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium"
            >
              Xem tất cả báo cáo
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quick navigation ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { to: "/reports", icon: FileText, title: "Báo cáo", desc: "Khám phá các báo cáo tài chính và phân tích doanh nghiệp." },
            { to: "/blog", icon: BookOpen, title: "Blog", desc: "Ghi chú, cập nhật và bài viết chuyên sâu." },
            { to: "/about", icon: User, title: "Về tôi", desc: "Thông tin về tác giả và người quản lý trang." },
          ].map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                to={item.to}
                className="group flex items-start gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-brand-300 transition-all h-full"
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:bg-brand-100 transition-colors">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-brand-900 group-hover:text-brand-700 transition-colors">{item.title}</p>
                  <p className="mt-0.5 text-xs sm:text-sm text-slate-500">{item.desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Về tôi preview ── */}
      <section className="bg-brand-50/60 border-y border-brand-100">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 relative rounded-3xl overflow-hidden shadow-xl aspect-4/5"
          >
            <img
              src={directorPhoto}
              alt={director.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <p className="font-display text-lg font-bold drop-shadow">{director.name}</p>
              <p className="text-xs text-brand-100 drop-shadow">{director.title}</p>
            </div>
          </motion.div>

          <div className="md:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4"
            >
              Về tôi
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl font-bold text-brand-900 tracking-tight"
            >
              {director.name}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-1 text-brand-600 font-medium"
            >
              {director.title} &middot; {director.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-600 leading-relaxed max-w-prose line-clamp-3"
            >
              {director.bio}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/about"
                className="mt-5 group inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors"
              >
                Xem thêm về tôi
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4"
          >
            Liên hệ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl md:text-3xl font-bold text-brand-900"
          >
            Thông tin liên hệ
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col items-center gap-4 text-sm text-slate-500"
          >
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-brand-600 shrink-0" />
              <a href="mailto:sonletri@gmail.com" className="hover:text-brand-700 transition-colors">
                sonletri@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-brand-600 shrink-0" />
              <span>{meta.company}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-brand-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2026 {meta.company}</span>
          <a href="mailto:sonletri@gmail.com" className="hover:text-brand-400 transition-colors">sonletri@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
