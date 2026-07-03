import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";
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
import photo from "../../assets/photos/Copy of DSC09840.webp";

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
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
      >
        Điểm nghẽn cần lưu ý (2/2) & Ma trận rủi ro
      </motion.h2>
      <p className="mt-2 text-slate-500 text-sm sm:text-base">Phân tích chi tiết và mức độ ưu tiên xử lý</p>

      <div className="mt-4 grid lg:grid-cols-2 gap-4 lg:gap-6 flex-1 min-h-0">
        {/* ── Left: Bottleneck cards ── */}
        <div className="flex flex-col gap-4">
          {items.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className="rounded-2xl border border-brand-100 bg-white shadow-sm overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start gap-2.5 sm:gap-3 px-4 sm:px-5 pt-4 pb-3">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-brand-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0">
                  {i + 4}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-brand-900 text-sm sm:text-base">{b.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">{b.detail}</p>
                </div>
              </div>

              {/* Evidence inline */}
              <div className="px-4 sm:px-5 pb-4">
                <div className="rounded-xl bg-brand-50/80 border border-brand-100 p-3 sm:p-3.5">
                  <p className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-brand-600 uppercase tracking-wide mb-2">
                    <FileSearch size={13} />
                    Số liệu chứng minh
                  </p>
                  <ul className="space-y-1.5">
                    {b.evidence.map((e) => (
                      <li key={e} className="text-[11px] sm:text-xs text-slate-600 flex gap-2 leading-relaxed">
                        <span className="text-brand-400 shrink-0 mt-0.5">•</span>
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}

            <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-2xl overflow-hidden shadow-md relative group h-40 sm:h-56 lg:h-64"
          >
            <img
              src={photo}
              alt="Kiểm soát rủi ro"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brand-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
              Giám sát rủi ro định kỳ · Cập nhật ma trận hàng tháng
            </div>
          </motion.div>
        </div>

        {/* ── Right: Scatter chart + Image ── */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-brand-100 bg-white p-3 sm:p-4 shadow-sm flex-1 min-h-64 lg:min-h-0"
          >
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide text-center mb-1">
              Ma trận rủi ro
            </p>
            <p className="text-[10px] text-slate-400 mb-1 text-center">Mức ảnh hưởng × Khả năng xảy ra</p>
            <ResponsiveContainer width="100%" height="85%">
              <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dbeafe" />
                <XAxis type="number" dataKey="likelihood" name="Khả năng xảy ra" domain={[0, 10]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis type="number" dataKey="impact" name="Mức độ ảnh hưởng" domain={[0, 10]} stroke="#64748b" tick={{ fontSize: 11 }} />
                <ZAxis range={[200, 200]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(v, n) => [v, n]}
                  labelFormatter={() => ""}
                  content={({ active, payload }) =>
                    active && payload?.length ? (
                      <div className="bg-white rounded-lg shadow-lg border border-brand-100 p-3 text-xs max-w-52">
                        <p className="font-bold text-brand-900">{payload[0].payload.name}</p>
                        <p className="text-slate-500 mt-0.5">Ảnh hưởng: {payload[0].payload.impact}/10 · Khả năng: {payload[0].payload.likelihood}/10</p>
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

            {/* Legend inline */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Nguy cơ cao</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Trung bình</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Thấp</span>
            </div>
          </motion.div>

        
        </div>
      </div>
    </SlideShell>
  );
}
