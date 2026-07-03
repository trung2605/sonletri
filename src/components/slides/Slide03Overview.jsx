import { motion } from "framer-motion";
import SlideShell from "../ui/SlideShell.jsx";
import StatCard from "../ui/StatCard.jsx";
import { overview } from "../../data/report.js";
import photo from "../../assets/photos/airport-window-1.webp";

export default function Slide02Overview({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <div className="grid lg:grid-cols-5 gap-10 flex-1">
        <div className="lg:col-span-3">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
          >
            Tổng quan kết quả kinh doanh của AHTS
          </motion.h2>
          <p className="mt-2 text-slate-500">5 tháng đầu năm 2026 (T1 – T5)</p>

          <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 sm:gap-5">
            <StatCard
              label="Tổng doanh thu"
              value={overview.revenue.value}
              unit="tỷ đồng"
              sub={`Đạt ${overview.revenue.planPct}% kế hoạch năm ${overview.revenue.plan2026} tỷ`}
              delay={0}
            />
            <StatCard
              label="Tổng chi phí"
              value={overview.cost.value}
              unit="tỷ đồng"
              sub={`Đạt ${overview.cost.planPct}% kế hoạch năm ${overview.cost.plan2026} tỷ`}
              delay={0.1}
            />
            <StatCard
              label="Lợi nhuận trước thuế"
              value={overview.profitBeforeTax.value}
              unit="tỷ đồng"
              sub={`Đạt ${overview.profitBeforeTax.planPct}% kế hoạch năm`}
              delay={0.2}
            />
            <StatCard
              label="Lợi nhuận sau thuế"
              value={overview.profitAfterTax.value}
              unit="tỷ đồng"
              sub={`Biên lợi nhuận ${overview.profitAfterTax.margin}%`}
              delay={0.3}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 rounded-2xl bg-brand-50 border border-brand-100 p-6"
          >
            <p className="text-brand-900 font-semibold">So sánh với cùng kỳ 2025</p>
            <p className="mt-2 text-slate-600 leading-relaxed text-sm">
              Tổng doanh thu cả năm 2025 đạt{" "}
              <span className="font-semibold text-brand-700">{overview.revenue2025} tỷ đồng</span>.
              Kế hoạch 2026 đặt mục tiêu tăng trưởng{" "}
              <span className="font-semibold text-brand-700">{overview.growthPlan2026Pct}%</span>.
              Sau 5 tháng, tiến độ doanh thu (40.5%) và LNTT (39.2%) bám sát tỷ lệ thời gian kỳ
              vọng (~41.7%), cho thấy hoạt động ổn định nhưng cần cải thiện nhẹ để về đích.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group min-h-56"
        >
          <img
            src={photo}
            alt="Nhà ga sân bay"
            className="w-full h-full object-cover min-h-56 lg:min-h-64 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-900/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-2xl font-bold">
              +{overview.growthPlan2026Pct}%
            </p>
            <p className="text-sm text-brand-100">Mục tiêu tăng trưởng doanh thu 2026</p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
