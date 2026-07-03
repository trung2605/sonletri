import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import Navbar from "../components/ui/Navbar.jsx";
import Breadcrumb from "../components/ui/Breadcrumb.jsx";
import { meta } from "../data/report.js";
import { REPORTS } from "../data/reports.js";

export default function Reports() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Breadcrumb items={[{ label: "Trang chủ", to: "/" }, { label: "Báo cáo" }]} />

      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-semibold tracking-wide uppercase mb-4">
            Báo cáo doanh nghiệp
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-brand-900 tracking-tight">
            Báo cáo của tôi
          </h1>
          <p className="mt-3 text-slate-500 max-w-xl">
            Danh sách các báo cáo tài chính và phân tích từ {meta.companyShort}. Chọn một báo cáo để bắt đầu.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/presentation?report=${report.id}`}
                className="group flex flex-col h-full rounded-2xl border border-brand-100 bg-white shadow-sm hover:shadow-xl hover:border-brand-300 transition-all overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={report.thumbnail}
                    alt={report.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-950/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur text-white text-xs font-semibold">
                    <BarChart3 size={14} />
                    <span>{report.stats?.[0]?.value || "0"} slide</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-semibold text-white drop-shadow line-clamp-2">
                      {report.name}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
                    {report.desc}
                  </p>

                  {/* Stats row */}
                  {report.stats && (
                    <div className="mt-4 flex gap-3 flex-wrap">
                      {report.stats.map((s) => (
                        <span
                          key={s.label}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-50 text-brand-700 text-[10px] font-semibold"
                        >
                          <span className="font-normal text-brand-500">{s.label}</span>
                          <span>{s.value}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-4 pt-3 border-t border-brand-100 flex items-center justify-between text-sm">
                    <span className="text-brand-600 font-medium group-hover:text-brand-700 transition-colors">
                      Mở báo cáo
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty state if no reports (shouldn't happen) */}
        {REPORTS.length === 0 && (
          <div className="mt-16 text-center text-slate-400">
            <p className="text-lg">Chưa có báo cáo nào.</p>
            <p className="text-sm mt-1">Các báo cáo sẽ xuất hiện tại đây.</p>
          </div>
        )}
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
