import { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { monthlyTrend } from "../../data/report.js";
import photo from "../../assets/photos/airport-runway-1.jpg";

const series = [
  { key: "revenue", label: "Doanh thu", color: "#1d4ed8", labelPos: "top" },
  { key: "cost", label: "Chi phí", color: "#f97316", labelPos: "bottom" },
  { key: "profit", label: "Lợi nhuận trước thuế", color: "#22c55e", labelPos: "top" },
];

export default function Slide04Trend({ index, total }) {
  const [visible, setVisible] = useState(series.map((s) => s.key));

  const toggle = (key) =>
    setVisible((v) => (v.includes(key) ? v.filter((k) => k !== key) : [...v, key]));

  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Diễn biến doanh thu – chi phí – lợi nhuận
      </motion.h2>
      <p className="mt-2 text-slate-500">
        Theo tháng, T1 – T5/2026 (tỷ đồng) — bấm vào nhãn để ẩn/hiện đường
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {series.map((s) => (
          <button
            key={s.key}
            onClick={() => toggle(s.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
              visible.includes(s.key)
                ? "text-white shadow"
                : "text-slate-400 border-slate-200 bg-slate-50"
            }`}
            style={visible.includes(s.key) ? { backgroundColor: s.color, borderColor: s.color } : {}}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid lg:grid-cols-3 gap-6 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(v) => `${v} tỷ đồng`} />
              {series
                .filter((s) => visible.includes(s.key))
                .map((s) => (
                  <Line
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    name={s.label}
                    stroke={s.color}
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                    animationDuration={900}
                  >
                    <LabelList
                      dataKey={s.key}
                      position={s.labelPos}
                      offset={10}
                      formatter={(v) => v}
                      style={{ fill: s.color, fontSize: 12, fontWeight: 600 }}
                    />
                  </Line>
                ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-xl group min-h-56"
        >
          <img
            src={photo}
            alt="Đường băng sân bay"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 to-transparent" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-6 grid md:grid-cols-2 gap-4"
      >
        <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 text-orange-800 text-sm">
          <strong>Tháng 4 là điểm trũng:</strong> doanh thu thấp nhất (30.4 tỷ), chi phí cao
          nhất (16.4 tỷ), khiến lợi nhuận giảm mạnh còn 13.9 tỷ.
        </div>
        <div className="rounded-xl bg-brand-50 border border-brand-100 p-4 text-brand-800 text-sm">
          <strong>Tháng 5 phục hồi nhẹ</strong> (lợi nhuận 15.6 tỷ) nhưng vẫn chưa quay lại mức
          đỉnh của tháng 3 (17.4 tỷ).
        </div>
      </motion.div>
    </SlideShell>
  );
}
