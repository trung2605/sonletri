import { motion } from "framer-motion";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceArea,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { monthlyTrend, costDetail } from "../../data/report.js";
import photo from "../../assets/photos/Screen Shot 2567-11-04 at 15.24.36 1.webp";

const merged = monthlyTrend.map((m, i) => ({
  month: m.month,
  profit: m.profit,
  salary: costDetail[i].salary,
}));

export default function Slide08TrendDeepDive({ index, total }) {
  return (
    <SlideShell dark index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold"
      >
        Truy nguyên nhân điểm trũng tháng 4
      </motion.h2>
      <p className="mt-2 text-brand-200 text-sm sm:text-base">
        Đối chiếu lợi nhuận trước thuế với chi phí lương — tỷ đồng
      </p>

      <div className="mt-4 grid lg:grid-cols-5 gap-4 lg:gap-6 flex-1 min-h-0">
        <div className="lg:col-span-3 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-56 sm:h-64 lg:h-auto lg:flex-1 lg:min-h-0"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={merged} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
                <XAxis dataKey="month" stroke="#bfdbfe" />
                <YAxis stroke="#bfdbfe" />
                <Tooltip
                  contentStyle={{ background: "#1e3a8a", border: "none", borderRadius: 8, color: "#fff" }}
                  formatter={(v) => `${v} tỷ đồng`}
                />
                <Legend />
                <ReferenceArea x1="T3" x2="T4" fill="#f97316" fillOpacity={0.15} />
                <Bar dataKey="salary" name="Chi phí lương" fill="#f97316" radius={[6, 6, 0, 0]} animationDuration={1000}>
                  <LabelList dataKey="salary" position="top" style={{ fill: "#fed7aa", fontSize: 12, fontWeight: 600 }} />
                </Bar>
                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Lợi nhuận trước thuế"
                  stroke="#93c5fd"
                  strokeWidth={3}
                  dot={{ r: 5, fill: "#fff" }}
                  animationDuration={1200}
                >
                  <LabelList dataKey="profit" position="bottom" offset={12} style={{ fill: "#fff", fontSize: 12, fontWeight: 600 }} />
                </Line>
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 shrink-0"
          >
            {[
              { label: "Chi phí lương T4", value: "4.12 tỷ", desc: "Cao nhất 5 tháng, TB ~3.15 tỷ" },
              { label: "Chênh lệch so T3", value: "+1.06 tỷ", desc: "Lương T4 tăng đột biến so với T3 (3.06 tỷ)" },
              { label: "LNTT cùng kỳ", value: "-3.5 tỷ", desc: "Lợi nhuận T4 giảm gần đúng bằng mức tăng lương" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl bg-white/10 border border-white/20 backdrop-blur p-3 sm:p-4"
              >
                <p className="text-xs text-brand-200">{s.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-orange-300">{s.value}</p>
                <p className="text-xs text-brand-100 mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group min-h-40 lg:min-h-64"
        >
          <img
            src={photo}
            alt="Phân tích số liệu"
            className="w-full h-full object-cover min-h-40 lg:min-h-64 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/70 via-brand-900/20 to-transparent" />
          <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 text-white">
            <p className="text-base sm:text-lg font-bold">Điểm trũng T4</p>
            <p className="text-xs text-brand-100 mt-1">
              Doanh thu thấp nhất + Chi phí cao nhất → LNTT -20.1%
            </p>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-xs sm:text-sm text-brand-100 bg-white/10 border border-white/20 backdrop-blur rounded-xl p-3 sm:p-4"
      >
        Mức tăng chi phí lương tháng 4 (+1.06 tỷ so với tháng 3) gần khớp với mức sụt giảm lợi
        nhuận trước thuế cùng kỳ (-3.5 tỷ, trong đó doanh thu giảm góp thêm ~2.7 tỷ) — cho thấy
        biến động lương là một trong các nguyên nhân trực tiếp, cần đối chiếu với kế hoạch nhân
        sự/thưởng của tháng để xác nhận có phải chi phí một lần hay xu hướng lặp lại.
      </motion.p>
    </SlideShell>
  );
}
