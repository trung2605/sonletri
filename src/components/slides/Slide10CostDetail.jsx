import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { costDetail } from "../../data/report.js";
import photo from "../../assets/photos/_DHP5591.jpg";

export default function Slide10CostDetail({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Diễn biến 3 khoản chi phí lớn nhất
      </motion.h2>
      <p className="mt-2 text-slate-500">Thuê mặt bằng, lương, thực phẩm theo tháng (tỷ đồng)</p>

      <div className="mt-4 grid lg:grid-cols-5 gap-6 flex-1 min-h-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={costDetail} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="rentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d4ed8" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="foodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip formatter={(v) => `${v} tỷ đồng`} />
              <Legend />
              <Area type="monotone" dataKey="rent" name="Thuê mặt bằng" stroke="#1d4ed8" fill="url(#rentGrad)" strokeWidth={2} animationDuration={1000}>
                <LabelList dataKey="rent" position="top" offset={10} style={{ fill: "#1d4ed8", fontSize: 12, fontWeight: 600 }} />
              </Area>
              <Area type="monotone" dataKey="salary" name="Lương" stroke="#f97316" fill="url(#salaryGrad)" strokeWidth={2} animationDuration={1000}>
                <LabelList dataKey="salary" position="bottom" offset={10} style={{ fill: "#f97316", fontSize: 12, fontWeight: 600 }} />
              </Area>
              <Area type="monotone" dataKey="food" name="Thực phẩm, hàng hóa" stroke="#22c55e" fill="url(#foodGrad)" strokeWidth={2} animationDuration={1000}>
                <LabelList dataKey="food" position="bottom" offset={-4} style={{ fill: "#16a34a", fontSize: 12, fontWeight: 600 }} />
              </Area>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group"
        >
          <img
            src={photo}
            alt="Vận hành sân bay"
            className="w-full h-full object-cover min-h-48 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-brand-900/10 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-xl font-bold">78.4 tỷ</p>
            <p className="text-xs text-brand-100">Tổng chi phí 5T/2026 · Đạt 40.0% KH năm</p>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-sm text-brand-700 bg-brand-50 rounded-xl p-4"
      >
        Chi phí thuê mặt bằng gần như đi ngang (~9.3-9.4 tỷ/tháng) do là chi phí cố định theo hợp
        đồng. Chi phí lương tăng đột biến trong tháng 4 (4.12 tỷ) — trùng thời điểm lợi nhuận sụt
        giảm, là yếu tố cần đối chiếu với kế hoạch nhân sự/thưởng của tháng.
      </motion.p>
    </SlideShell>
  );
}
