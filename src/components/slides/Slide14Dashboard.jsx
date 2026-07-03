import { motion } from "framer-motion";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle, TrendingUp, Minus, Target } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { kpiDashboard, kpiDetailTable, monthlyTrend } from "../../data/report.js";
import loungePhoto from "../../assets/photos/business-lounge-1.webp";

// ── helpers ──
const STATUS = {
  "on-track": { dot: "#16a34a", bg: "#f0fdf4", text: "#15803d", bar: "#22c55e", label: "Đúng tiến độ" },
  watch:      { dot: "#f59e0b", bg: "#fffbeb", text: "#b45309", bar: "#f59e0b", label: "Cần giám sát" },
  critical:   { dot: "#dc2626", bg: "#fef2f2", text: "#b91c1c", bar: "#ef4444", label: "Nguy cơ" },
};

// ── Gauge card (compact) ──
function GaugeCard({ kpi, delay }) {
  const data = [{ name: kpi.label, value: kpi.value, fill: "#1d4ed8" }];
  const above = kpi.value >= kpi.target;
  const gap = Math.abs(kpi.value - kpi.target).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="rounded-xl border border-brand-100 bg-white p-2 sm:p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
    >
      <div className="w-full h-16 sm:h-20 md:h-24 relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart innerRadius="75%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: "#eff6ff" }} dataKey="value" cornerRadius={20} animationDuration={1000} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-sm sm:text-lg md:text-xl font-bold text-brand-900">{kpi.value}%</p>
          <p className={`hidden sm:flex text-[9px] md:text-[10px] mt-0.5 items-center gap-0.5 ${above ? "text-emerald-600" : "text-amber-600"}`}>
            {above ? <TrendingUp size={10} /> : <Minus size={10} />}
            {above ? "+" : "-"}{gap}% vs KH
          </p>
        </div>
      </div>
      <p className="mt-1 text-[10px] sm:text-xs font-semibold text-brand-900 text-center leading-tight">{kpi.label}</p>
    </motion.div>
  );
}

// ── Mini trend bar chart ──
function MiniTrendChart() {
  return (
    <div className="h-full flex flex-col">
      <p className="text-[9px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide mb-1 sm:mb-2 shrink-0">
        <span className="hidden sm:inline">Diễn biến DT – CP – LN theo tháng (tỷ đồng)</span>
        <span className="sm:hidden">DT – CP – LN theo tháng</span>
      </p>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyTrend} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }}
              formatter={(v) => `${v} tỷ`}
            />
            <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" radius={[3, 3, 0, 0]} animationDuration={800} />
            <Bar dataKey="cost" name="Chi phí" fill="#f97316" radius={[3, 3, 0, 0]} animationDuration={900} />
            <Bar dataKey="profit" name="LN trước thuế" fill="#22c55e" radius={[3, 3, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── Detail table row ──
function KpiRow({ item, delay }) {
  const s = STATUS[item.status];
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="flex items-center gap-1.5 sm:gap-2.5 py-1 border-b border-slate-100 last:border-0"
    >
      {/* Status dot */}
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.dot }} />

      {/* Label */}
      <p className="text-[11px] sm:text-xs text-slate-700 w-20 sm:w-32 shrink-0 truncate">{item.label}</p>

      {/* Value + unit */}
      <p className="text-[11px] sm:text-xs font-bold text-brand-900 w-11 sm:w-14 text-right shrink-0">
        {item.th5T}
        <span className="text-[9px] sm:text-[10px] font-normal text-slate-400 ml-0.5">{item.unit}</span>
      </p>

      {/* Progress bar */}
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden min-w-6">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(item.khPct, 100)}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.6, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: s.bar }}
        />
      </div>

      {/* %KH */}
      <p className="text-[11px] sm:text-xs font-semibold w-7 sm:w-9 text-right shrink-0" style={{ color: s.text }}>
        {item.khPct}%
      </p>

      {/* Status badge (compact) — hidden on mobile to save space */}
      <span
        className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded-full w-20 text-center shrink-0"
        style={{ backgroundColor: s.bg, color: s.text }}
      >
        {s.label}
      </span>
    </motion.div>
  );
}

// ═══════════════════════════════════════════
export default function Slide14Dashboard({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        {/* ── Title ── */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-900"
        >
          Bảng điều khiển KPI tổng hợp
        </motion.h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Đánh giá tiến độ 5 tháng đầu năm —{" "}
          <span className="font-semibold text-brand-700">4 chỉ tiêu chính bám sát kế hoạch, 3 chỉ tiêu cần lưu ý</span>
        </p>

        {/* ── 4 KPI Gauges ── */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-3 shrink-0">
          {kpiDashboard.map((kpi, i) => (
            <GaugeCard key={kpi.label} kpi={kpi} delay={i * 0.08} />
          ))}
        </div>

        {/* ── Middle: Chart (left) + Image (right) ── */}
        <div className="mt-3 grid grid-cols-5 gap-3 sm:gap-4 min-h-0 h-40 sm:h-44">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="col-span-3 rounded-xl border border-brand-100 bg-white p-2 sm:p-4 shadow-sm"
          >
            <MiniTrendChart />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="col-span-2 relative rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={loungePhoto}
              alt="Business lounge"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-brand-900/20 to-transparent" />
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 text-white">
              <p className="text-xs sm:text-base font-bold flex items-center gap-1 sm:gap-1.5">
                <Target size={12} className="text-brand-300 shrink-0" />
                Mục tiêu 2026
              </p>
              <p className="hidden sm:block text-[11px] text-brand-100 mt-1 leading-relaxed">
                Doanh thu 392 tỷ · LNTT 202 tỷ · Biên LNST ≥38% · Tăng trưởng +16.6% so với 2025
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Detail table ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-3 rounded-xl border border-brand-100 bg-white p-3 sm:p-4 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2 flex-wrap gap-1.5">
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wide">
              So sánh thực hiện 5T vs Kế hoạch năm
            </p>
            <span className="hidden md:flex text-[10px] text-slate-400 items-center gap-2">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Đúng tiến độ</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Cần giám sát</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Nguy cơ</span>
            </span>
          </div>
          {kpiDetailTable.map((item, i) => (
            <KpiRow key={item.label} item={item} delay={0.45 + i * 0.06} />
          ))}

          {/* Bottom note linking to roadmap */}
          <div className="mt-2 pt-2 border-t border-brand-100 flex items-start gap-2 text-[10px] sm:text-[11px] text-slate-500">
            <AlertTriangle size={12} className="text-amber-500 shrink-0 mt-0.5" />
            <span>
              <strong className="text-red-600">2 chỉ tiêu nguy cơ</strong> (Doanh thu tài chính 13.7%, Đào tạo 2.7%) và{" "}
              <strong className="text-amber-600">1 chỉ tiêu cần giám sát</strong> (Chi phí VP 18.6%) — giải pháp chi tiết tại{" "}
              <span className="font-semibold text-brand-700">Slide 13: Lộ trình hành động</span>
            </span>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
