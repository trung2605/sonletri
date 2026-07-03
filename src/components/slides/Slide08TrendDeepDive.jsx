import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { monthlyTrend } from "../../data/report.js";

export default function Slide08TrendDeepDive({ index, total }) {
  return (
    <SlideShell dark index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold"
      >
        Điểm trũng tháng 4 — phân tích chi tiết
      </motion.h2>
      <p className="mt-2 text-brand-200">Lợi nhuận trước thuế theo tháng (tỷ đồng)</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 h-80"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
            <XAxis dataKey="month" stroke="#bfdbfe" />
            <YAxis stroke="#bfdbfe" />
            <Tooltip
              contentStyle={{ background: "#1e3a8a", border: "none", borderRadius: 8, color: "#fff" }}
              formatter={(v) => `${v} tỷ đồng`}
            />
            <ReferenceArea x1="T3" x2="T4" fill="#f97316" fillOpacity={0.15} />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#93c5fd"
              strokeWidth={3}
              fill="url(#profitGrad)"
              animationDuration={1200}
              dot={{ r: 5, fill: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {[
          { label: "T3 → T4", value: "-20.1%", desc: "Sụt giảm lợi nhuận trước thuế" },
          { label: "Doanh thu T4", value: "30.4 tỷ", desc: "Thấp nhất trong 5 tháng" },
          { label: "Chi phí T4", value: "16.4 tỷ", desc: "Cao nhất trong 5 tháng" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-xl bg-white/10 border border-white/20 backdrop-blur p-4"
          >
            <p className="text-xs text-brand-200">{s.label}</p>
            <p className="text-2xl font-bold text-orange-300">{s.value}</p>
            <p className="text-xs text-brand-100 mt-1">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
