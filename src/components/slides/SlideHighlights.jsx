import { motion } from "framer-motion";
import { BarChart3, Building2, TrendingUp } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import hall from "../../assets/photos/airport-hall-1.webp";
import lounge from "../../assets/photos/business-lounge-1.webp";

export default function SlideHighlights({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
      >
        Điểm nhấn kết quả kinh doanh
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mt-2 text-slate-500"
      >
        5 tháng đầu năm 2026 — tổng quan nhanh
      </motion.p>

      <div className="mt-5 md:mt-6 grid md:grid-cols-5 gap-4 flex-1">
        {/* ── Featured segments — 2 image cards ── */}
        <div className="md:col-span-3 grid gap-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 group"
          >
            <img
              src={hall}
              alt="Mặt bằng kinh doanh"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display font-bold text-lg sm:text-xl">Mặt bằng kinh doanh</p>
              <p className="text-xs sm:text-sm text-brand-100 mt-0.5">53.3% tổng doanh thu 5 tháng — mảng chủ lực số một</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ y: -4 }}
            className="relative rounded-2xl overflow-hidden shadow-lg h-40 sm:h-48 group"
          >
            <img
              src={lounge}
              alt="Dịch vụ phòng CIP"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/85 via-brand-950/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="font-display font-bold text-lg sm:text-xl">Dịch vụ phòng CIP</p>
              <p className="text-xs sm:text-sm text-brand-100 mt-0.5">43.7% tổng doanh thu</p>
            </div>
          </motion.div>
        </div>

        {/* ── Key stats ── */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="flex-1 rounded-2xl bg-brand-900 p-5 sm:p-6 shadow-lg flex flex-col justify-between min-h-0"
          >
            <TrendingUp className="text-brand-300 shrink-0" size={24} />
            <div className="mt-auto">
              <p className="font-display text-2xl sm:text-3xl font-bold text-white">158.7 tỷ</p>
              <p className="mt-1.5 text-xs sm:text-sm text-brand-200 leading-relaxed">
                Tổng doanh thu 5 tháng, đạt 40.5% kế hoạch năm 2026
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 flex-1">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08 }}
                whileHover={{ y: -3 }}
                className="rounded-2xl bg-brand-50/70 p-4 sm:p-5 hover:bg-brand-50 transition-colors flex flex-col justify-between"
              >
                <card.icon className="text-brand-600 shrink-0" size={20} />
                <div className="mt-auto">
                  <p className="font-display text-xl sm:text-2xl font-bold text-brand-900">{card.title}</p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}
