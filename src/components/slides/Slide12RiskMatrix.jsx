import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch, ChevronDown } from "lucide-react";
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
  const [open, setOpen] = useState(null);

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
      <p className="mt-2 text-slate-500">Bấm vào từng mục để xem số liệu chứng minh</p>

      <div className="mt-6 grid lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-3">
          {items.map((b, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-2xl border border-brand-100 bg-brand-50/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-start gap-3 p-5 text-left hover:bg-brand-50 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {i + 4}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-900">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1">{b.detail}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="shrink-0 mt-1 text-brand-400"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 pl-14">
                        <div className="rounded-xl bg-white border border-brand-100 p-4">
                          <p className="flex items-center gap-2 text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">
                            <FileSearch size={14} />
                            Số liệu chứng minh
                          </p>
                          <ul className="space-y-1.5">
                            {b.evidence.map((e) => (
                              <li key={e} className="text-sm text-slate-600 flex gap-2">
                                <span className="text-brand-400 shrink-0">•</span>
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
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
