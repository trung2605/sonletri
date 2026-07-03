import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { yoyComparison } from "../../data/report.js";
import photo from "../../assets/photos/airport-plane-1.webp";

export default function Slide04YoY({ index, total }) {
  const [mode, setMode] = useState("plan");

  const chartData = yoyComparison.map((d) => ({
    label: d.label,
    "TH 2025 (cả năm)": d.y2025,
    [mode === "plan" ? "Kế hoạch 2026" : "TH 2026 (5 tháng)"]:
      mode === "plan" ? d.plan2026 : d.th2026,
  }));

  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
      >
        So sánh với cùng kỳ 2025
      </motion.h2>
      <p className="mt-2 text-slate-500 text-sm sm:text-base">Đơn vị: tỷ đồng — chuyển góc nhìn để so sánh</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setMode("plan")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
            mode === "plan" ? "bg-brand-600 text-white border-brand-600 shadow" : "text-slate-400 border-slate-200"
          }`}
        >
          2025 vs Kế hoạch 2026
        </button>
        <button
          onClick={() => setMode("actual")}
          className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all ${
            mode === "actual" ? "bg-brand-600 text-white border-brand-600 shadow" : "text-slate-400 border-slate-200"
          }`}
        >
          2025 vs Thực hiện 5T/2026
        </button>
      </div>

      <div className="mt-4 grid lg:grid-cols-5 gap-6 flex-1 min-h-0">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-3 h-64 sm:h-72 lg:h-auto"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="label" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(v) => `${v} tỷ đồng`} />
              <Legend />
              <Bar dataKey="TH 2025 (cả năm)" fill="#93c5fd" radius={[6, 6, 0, 0]} animationDuration={900}>
                <LabelList
                  dataKey="TH 2025 (cả năm)"
                  position="top"
                  formatter={(v) => v.toFixed(1)}
                  className="fill-brand-700 text-xs font-semibold"
                />
              </Bar>
              <Bar
                dataKey={mode === "plan" ? "Kế hoạch 2026" : "TH 2026 (5 tháng)"}
                fill="#1d4ed8"
                radius={[6, 6, 0, 0]}
                animationDuration={900}
              >
                <LabelList
                  dataKey={mode === "plan" ? "Kế hoạch 2026" : "TH 2026 (5 tháng)"}
                  position="top"
                  formatter={(v) => v.toFixed(1)}
                  className="fill-brand-900 text-xs font-semibold"
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group min-h-40 sm:min-h-48"
        >
          <img
            src={photo}
            alt="Máy bay"
            className="w-full h-full object-cover min-h-40 sm:min-h-48 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-brand-900/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xl font-bold">+16.6%</p>
            <p className="text-xs text-brand-100">Mục tiêu tăng trưởng doanh thu 2026</p>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-sm text-brand-700 bg-brand-50 rounded-xl p-4"
      >
        Kế hoạch 2026 đặt mục tiêu tăng trưởng <strong>16.6%</strong> doanh thu so với năm 2025.
        Sau 5 tháng, tiến độ thực hiện các chỉ tiêu (~39-40%) bám sát tỷ lệ thời gian kỳ vọng
        (~41.7%), cho thấy khả năng hoàn thành kế hoạch năm khả thi nếu duy trì đà hiện tại.
      </motion.p>
    </SlideShell>
  );
}
