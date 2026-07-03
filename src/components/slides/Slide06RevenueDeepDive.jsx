import { motion } from "framer-motion";
import SlideShell from "../ui/SlideShell.jsx";
import { revenueDetail } from "../../data/report.js";
import photo from "../../assets/photos/airport-window-1.jpg";

function ProgressRow({ label, value, target, note, delay }) {
  const actualPct = Math.min(100, (value / target) * (target / 100) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-baseline justify-between">
        <p className="font-semibold text-brand-900">{label}</p>
        <p className="text-sm text-slate-500">
          Tiến độ tuyến tính kỳ vọng: <strong>{target}%</strong>
        </p>
      </div>
      <div className="mt-3 h-3 w-full bg-brand-50 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-700 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
        />
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-orange-500"
          style={{ left: `${target}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-slate-600">{note}</p>
    </motion.div>
  );
}

export default function Slide06RevenueDeepDive({ index, total }) {
  const { cip, mb } = revenueDetail;
  return (
    <SlideShell index={index} total={total} bgImage={photo} bgOverlay="white">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Phân tích chuyên sâu 2 mảng chủ lực
      </motion.h2>
      <p className="mt-2 text-slate-600">
        Vạch cam = tiến độ tuyến tính kỳ vọng theo thời gian (41.7%)
      </p>

      <div className="mt-8 space-y-5 max-w-3xl">
        <ProgressRow
          label={`${cip.name} — ${cip.value} tỷ đồng (${cip.pct}%)`}
          value={cip.pct}
          target={cip.planPct}
          note={cip.note}
          delay={0}
        />
        <ProgressRow
          label={`${mb.name} — ${mb.value} tỷ đồng (${mb.pct}%)`}
          value={mb.pct}
          target={mb.planPct}
          note={mb.note}
          delay={0.15}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-brand-800 bg-white/90 backdrop-blur rounded-xl p-4 border border-brand-100 max-w-3xl"
      >
        Mặt bằng kinh doanh đang tăng trưởng nhanh hơn tỷ trọng dự kiến, trong khi CIP giữ vai
        trò ổn định. Cả hai cùng chiếm 97% doanh thu — cần chiến lược mở rộng thêm nguồn thu để
        cân bằng rủi ro tập trung.
      </motion.p>
    </SlideShell>
  );
}
