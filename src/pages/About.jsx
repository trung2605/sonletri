import { motion } from "framer-motion";
import { Award, Briefcase, CalendarClock } from "lucide-react";
import Navbar from "../components/ui/Navbar.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import Tilt3DCard from "../components/ui/Tilt3DCard.jsx";
import { meta, director } from "../data/report.js";
import directorPhoto from "../assets/photos/le-tri-son-portrait.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Về tôi" }]} />

      <main className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-5 gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 md:sticky md:top-24"
        >
          <Tilt3DCard className="relative rounded-3xl shadow-2xl aspect-[4/5]">
            <div className="w-full h-full rounded-3xl overflow-hidden">
              <img
                src={directorPhoto}
                alt={director.name}
                loading="lazy"
                decoding="async"
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
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4"
          >
            Về tôi
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl md:text-4xl font-bold text-brand-900 tracking-tight"
          >
            {director.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-1 text-brand-600 font-medium"
          >
            {director.title} &middot; {director.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, scale: 1 }}
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-slate-600 leading-relaxed max-w-prose"
          >
            {director.bio}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-3 text-slate-600 leading-relaxed max-w-prose"
          >
            {director.vision}
          </motion.p>
        </div>
      </main>

      <footer className="border-t border-brand-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-400">
          <span>© 2026 {meta.company}</span>
          <a href="mailto:sonletri@gmail.com" className="hover:text-brand-400 transition-colors">sonletri@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
