import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { bottlenecks, riskMatrix } from "../../data/report.js";

const riskColor = (impact, likelihood) => {
  const score = impact * likelihood;
  if (score >= 48) return "#dc2626";
  if (score >= 28) return "#f97316";
  return "#eab308";
};

export default function Slide12RiskMatrix({ index, total }) {
  const items = bottlenecks.slice(3);
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Điểm nghẽn cần lưu ý (2/2) & Ma trận rủi ro
      </motion.h2>
      <p className="mt-2 text-slate-500">Đánh giá theo mức độ ảnh hưởng và khả năng xảy ra</p>

      <div className="mt-6 grid lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-4">
          {items.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ x: 6 }}
              className="rounded-2xl border border-brand-100 bg-brand-50/50 p-5"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 4}
                </span>
                <h3 className="font-semibold text-brand-900">{b.title}</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{b.detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-brand-100 p-4 h-80"
        >
          <p className="text-xs text-slate-400 mb-1 text-center">Trục X: Khả năng xảy ra · Trục Y: Mức độ ảnh hưởng</p>
          <ResponsiveContainer width="100%" height="90%">
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
              <XAxis type="number" dataKey="likelihood" name="Khả năng xảy ra" domain={[0, 10]} stroke="#64748b" />
              <YAxis type="number" dataKey="impact" name="Mức độ ảnh hưởng" domain={[0, 10]} stroke="#64748b" />
              <ZAxis range={[200, 200]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(v, n) => [v, n]}
                labelFormatter={() => ""}
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="bg-white rounded-lg shadow-lg border border-brand-100 p-3 text-xs max-w-52">
                      {payload[0].payload.name}
                    </div>
                  ) : null
                }
              />
              <Scatter data={riskMatrix} animationDuration={900}>
                {riskMatrix.map((r) => (
                  <Cell key={r.name} fill={riskColor(r.impact, r.likelihood)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </SlideShell>
  );
}
