import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { revenueDetail } from "../../data/report.js";
import photo from "../../assets/photos/airport-window-1.webp";

const months = ["T1", "T2", "T3", "T4", "T5"];

function SegmentCard({ data, target, delay }) {
  const chartData = data.monthly.map((v, i) => ({ month: months[i], value: v }));
  const yoyGrowthPct = (((data.value - data.y2025 * (5 / 12)) / (data.y2025 * (5 / 12))) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="rounded-2xl border border-brand-100 bg-white p-4 sm:p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-brand-900 text-base sm:text-lg">{data.name}</p>
          <p className="text-xl sm:text-2xl font-bold text-brand-700 mt-0.5">
            {data.value} tỷ <span className="text-xs sm:text-sm font-medium text-slate-400">({data.pct}%)</span>
          </p>
        </div>
        <div className="w-24 sm:w-28 h-12 sm:h-14 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1d4ed8"
                strokeWidth={2}
                dot={{ r: 2.5 }}
                animationDuration={900}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-3 h-3 w-full bg-brand-50 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-linear-to-r from-brand-500 to-brand-700 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${data.pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
        />
        <div className="absolute top-0 bottom-0 w-0.5 bg-orange-500" style={{ left: `${target}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-slate-400">Tiến độ tuyến tính kỳ vọng: {target}%</p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-brand-50 py-2">
          <p className="text-sm font-bold text-brand-900">{data.plan2026} tỷ</p>
          <p className="text-[11px] text-slate-500">KH năm 2026</p>
        </div>
        <div className="rounded-lg bg-brand-50 py-2">
          <p className="text-sm font-bold text-brand-900">{data.y2025} tỷ</p>
          <p className="text-[11px] text-slate-500">TH cả năm 2025</p>
        </div>
        <div className="rounded-lg bg-brand-50 py-2">
          <p className={`text-sm font-bold ${yoyGrowthPct >= 0 ? "text-green-600" : "text-red-600"}`}>
            {yoyGrowthPct >= 0 ? "+" : ""}{yoyGrowthPct}%
          </p>
          <p className="text-[11px] text-slate-500">So với cùng kỳ 2025</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600">{data.note}</p>
    </motion.div>
  );
}

export default function Slide06RevenueDeepDive({ index, total }) {
  const { cip, mb } = revenueDetail;
  return (
    <SlideShell index={index} total={total} bgImage={photo} bgOverlay="white">
      <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
        >
          Phân tích chuyên sâu 2 mảng chủ lực
        </motion.h2>
        <p className="mt-2 text-slate-600 text-sm sm:text-base">
          Vạch cam = tiến độ tuyến tính kỳ vọng theo thời gian (41.7%) &middot; Đường nhỏ = xu hướng theo tháng
        </p>

        <div className="mt-6 sm:mt-8 grid md:grid-cols-2 gap-4 sm:gap-5">
          <SegmentCard data={cip} target={cip.planPct} delay={0} />
          <SegmentCard data={mb} target={mb.planPct} delay={0.15} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-brand-800 bg-white/90 backdrop-blur rounded-xl p-4 border border-brand-100"
        >
          Mặt bằng kinh doanh đang tăng trưởng nhanh hơn tỷ trọng dự kiến, trong khi CIP giữ vai
          trò ổn định với biến động tháng nhỏ (13.2–14.8 tỷ/tháng). Cả hai cùng chiếm 97% doanh
          thu — cần chiến lược mở rộng thêm nguồn thu để cân bằng rủi ro tập trung.
        </motion.p>
      </div>
    </SlideShell>
  );
}
