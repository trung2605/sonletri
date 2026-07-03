import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { costStructure } from "../../data/report.js";
import photo from "../../assets/photos/airport-hall-1.jpg";

const colors = ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

export default function Slide05CostStructure({ index, total }) {
  return (
    <SlideShell index={index} total={total} bgImage={photo} bgOverlay="white">
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Cơ cấu chi phí hoạt động
      </motion.h2>
      <p className="mt-2 text-slate-600">Tỷ trọng các khoản mục trên tổng chi phí 5 tháng (tỷ đồng)</p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 h-96 rounded-2xl bg-white/70 backdrop-blur p-4 shadow-lg border border-white"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={costStructure}
            layout="vertical"
            margin={{ top: 10, right: 50, left: 10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" horizontal={false} />
            <XAxis type="number" stroke="#64748b" />
            <YAxis
              type="category"
              dataKey="name"
              width={220}
              stroke="#64748b"
              tick={{ fontSize: 12 }}
            />
            <Tooltip formatter={(v, n, p) => [`${v} tỷ đồng (${p.payload.pct}%)`, "Giá trị"]} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} animationDuration={1200} animationEasing="ease-out">
              {costStructure.map((c, i) => (
                <Cell key={c.name} fill={colors[i % colors.length]} />
              ))}
              <LabelList dataKey="pct" position="right" formatter={(v) => `${v}%`} className="fill-brand-900 text-xs font-semibold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-sm text-brand-800 bg-white/80 backdrop-blur rounded-xl p-4 border border-brand-100"
      >
        <strong>Chi phí thuê mặt bằng (47.0 tỷ, 60%)</strong> là khoản chi phí cố định lớn nhất,
        theo sau là <strong>lương và các khoản theo lương (17.0 tỷ, 21.7%)</strong> và{" "}
        <strong>thực phẩm, hàng hóa (10.2 tỷ, 13%)</strong>. Các khoản mục còn lại (công cụ dụng
        cụ, dịch vụ mua ngoài, đảm bảo văn phòng, vật tư tiêu hao...) mỗi mục chiếm dưới 2%.
      </motion.p>
    </SlideShell>
  );
}
