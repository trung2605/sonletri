import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { yoyComparison } from "../../data/report.js";

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
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        So sánh với cùng kỳ 2025
      </motion.h2>
      <p className="mt-2 text-slate-500">Đơn vị: tỷ đồng — chuyển góc nhìn để so sánh</p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setMode("plan")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            mode === "plan" ? "bg-brand-600 text-white border-brand-600 shadow" : "text-slate-400 border-slate-200"
          }`}
        >
          2025 vs Kế hoạch 2026
        </button>
        <button
          onClick={() => setMode("actual")}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            mode === "actual" ? "bg-brand-600 text-white border-brand-600 shadow" : "text-slate-400 border-slate-200"
          }`}
        >
          2025 vs Thực hiện 5T/2026
        </button>
      </div>

      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 h-96"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
            <XAxis dataKey="label" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip formatter={(v) => `${v} tỷ đồng`} />
            <Legend />
            <Bar dataKey="TH 2025 (cả năm)" fill="#93c5fd" radius={[6, 6, 0, 0]} animationDuration={900} />
            <Bar
              dataKey={mode === "plan" ? "Kế hoạch 2026" : "TH 2026 (5 tháng)"}
              fill="#1d4ed8"
              radius={[6, 6, 0, 0]}
              animationDuration={900}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

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
