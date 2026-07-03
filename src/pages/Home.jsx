import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, TrendingUp, Briefcase, Award, CalendarClock } from "lucide-react";
import { meta, director } from "../data/report.js";
import heroPhoto from "../assets/photos/airport-terminal-1.webp";
import lounge from "../assets/photos/business-lounge-1.webp";
import hall from "../assets/photos/airport-hall-1.webp";
import directorPhoto from "../assets/photos/le-tri-son-portrait.webp";
import logo from "../assets/photos/logo.webp";
import Tilt3DCard from "../components/ui/Tilt3DCard.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={logo} alt="AHTS" className="w-9 h-9 rounded-lg object-cover" />
          <span className="font-display font-semibold text-brand-900">{meta.companyShort} Portal</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm text-slate-500">
          <a href="#bao-cao" className="relative py-1 hover:text-brand-600 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-brand-600 hover:after:w-full after:transition-all">Báo cáo</a>
          <a href="#du-an" className="relative py-1 hover:text-brand-600 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-brand-600 hover:after:w-full after:transition-all">Dự án</a>
          <a href="#ve-toi" className="relative py-1 hover:text-brand-600 transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-brand-600 hover:after:w-full after:transition-all">Về tôi</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6">
        {/* ── Hero — offset asymmetric grid, not centered ── */}
        <section id="bao-cao" className="grid md:grid-cols-12 gap-10 items-center py-16 md:py-24">
          <div className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4"
            >
              Portfolio &middot; Báo cáo doanh nghiệp
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold text-brand-900 leading-[1.05] tracking-tight"
            >
              Báo cáo kết quả
              <br />
              kinh doanh
              <br />
              <span className="text-brand-500">5 tháng đầu 2026</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-slate-500 text-lg max-w-md leading-relaxed"
            >
              {meta.company} — phân tích số liệu tài chính, cơ cấu doanh thu, chi phí và các
              khuyến nghị hành động cho kỳ {meta.period}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex gap-4"
            >
              <Link
                to="/presentation"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 text-white font-semibold shadow-lg shadow-brand-200 hover:bg-brand-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
              >
                Mở bài thuyết trình
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Image bleeds slightly off the grid + overlap for depth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="md:col-span-5 relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-200/50 aspect-[4/3] md:-mr-6 md:mt-8"
          >
            <img src={heroPhoto} alt="Nhà ga quốc tế Đà Nẵng" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/60 via-transparent to-transparent" />
          </motion.div>
        </section>

        {/* ── Featured segments — zig-zag, unequal weight instead of 2 equal cards ── */}
        <section id="du-an" className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className="md:col-span-3 relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-72 group"
            >
              <img src={hall} alt="Mặt bằng kinh doanh" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-display font-bold text-xl">Mặt bằng kinh doanh</p>
                <p className="text-sm text-brand-100 mt-1">53.3% tổng doanh thu 5 tháng — mảng chủ lực số một</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              whileHover={{ y: -6 }}
              className="md:col-span-2 relative rounded-2xl overflow-hidden shadow-lg h-64 md:h-72 group"
            >
              <img src={lounge} alt="Dịch vụ phòng CIP" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-display font-bold text-xl">Dịch vụ phòng CIP</p>
                <p className="text-sm text-brand-100 mt-1">43.7% tổng doanh thu</p>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Key stats — one stat given visual weight, not 3 equal boxes ── */}
        <section className="grid md:grid-cols-5 gap-5 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="md:col-span-2 rounded-2xl bg-brand-900 p-7 shadow-xl shadow-brand-200/40 flex flex-col justify-between"
          >
            <TrendingUp className="text-brand-300 mb-6" size={28} />
            <div>
              <p className="font-display text-4xl font-bold text-white">158.7 tỷ</p>
              <p className="mt-2 text-sm text-brand-200 leading-relaxed">
                Tổng doanh thu 5 tháng, đạt 40.5% kế hoạch năm 2026
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-3 grid grid-cols-2 gap-5">
            {[
              {
                icon: BarChart3,
                title: "97%",
                desc: "Doanh thu tập trung ở 2 mảng CIP và mặt bằng kinh doanh",
              },
              {
                icon: Building2,
                title: "62.0 tỷ",
                desc: "Lợi nhuận sau thuế, biên lợi nhuận 39.1%",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-brand-50/70 p-6 hover:bg-brand-50 transition-colors"
              >
                <card.icon className="text-brand-600 mb-4" size={24} />
                <p className="font-display text-2xl font-bold text-brand-900">{card.title}</p>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <section id="ve-toi" className="bg-brand-50/60 border-y border-brand-100">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2"
          >
            <Tilt3DCard className="relative rounded-3xl shadow-2xl aspect-[4/5]">
              <div className="w-full h-full rounded-3xl overflow-hidden">
                <img
                  src={directorPhoto}
                  alt={director.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-transparent to-transparent" />
              </div>
              <div
                style={{ transform: "translateZ(40px)" }}
                className="absolute bottom-5 left-5 right-5 text-white"
              >
                <p className="font-display text-xl font-bold drop-shadow">{director.name}</p>
                <p className="text-sm text-brand-100 drop-shadow">{director.title}</p>
              </div>
            </Tilt3DCard>
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              {[
                { icon: Award, value: `${director.experienceYears}+`, label: "năm kinh nghiệm hàng không" },
                { icon: Briefcase, value: director.joined, label: "năm gia nhập AHT" },
                { icon: CalendarClock, value: director.since, label: "nhậm chức Giám đốc" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-xl bg-white border border-brand-100 p-4 text-center shadow-sm"
                >
                  <s.icon className="mx-auto text-brand-600 mb-1.5" size={20} />
                  <p className="font-display text-lg font-bold text-brand-900">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-slate-600 leading-relaxed max-w-prose"
            >
              {director.bio}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-3 text-slate-600 leading-relaxed max-w-prose"
            >
              {director.vision}
            </motion.p>
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2026 {meta.company}</span>
          <span>{meta.department}</span>
        </div>
      </footer>
    </div>
  );
}
