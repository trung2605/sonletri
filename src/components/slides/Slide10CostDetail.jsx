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
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { costDetail } from "../../data/report.js";

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 h-96"
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
            <Area type="monotone" dataKey="rent" name="Thuê mặt bằng" stroke="#1d4ed8" fill="url(#rentGrad)" strokeWidth={2} animationDuration={1000} />
            <Area type="monotone" dataKey="salary" name="Lương" stroke="#f97316" fill="url(#salaryGrad)" strokeWidth={2} animationDuration={1000} />
            <Area type="monotone" dataKey="food" name="Thực phẩm, hàng hóa" stroke="#22c55e" fill="url(#foodGrad)" strokeWidth={2} animationDuration={1000} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-sm text-brand-700 bg-brand-50 rounded-xl p-4"
      >
        Chi phí thuê mặt bằng gần như đi ngang (~9.3-9.4 tỷ/tháng) do là chi phí cố định theo hợp
        đồng. Chi phí lương tăng đột biến trong tháng 4 (4.12 tỷ) — trùng thời điểm lợi nhuận sụt
        giảm, là yếu tố cần đối chiếu với kế hoạch nhân sự/thưởng của tháng.
      </motion.p>
    </SlideShell>
  );
}
