import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { revenueBySegment } from "../../data/report.js";
import photo from "../../assets/photos/business-lounge-1.jpg";

export default function Slide03RevenueMix({ index, total }) {
  const [active, setActive] = useState(null);

  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Cơ cấu doanh thu theo mảng kinh doanh
      </motion.h2>
      <p className="mt-2 text-slate-500">Tỷ trọng doanh thu 5 tháng đầu năm 2026 — di chuột vào biểu đồ để xem chi tiết</p>

      <div className="mt-8 grid md:grid-cols-3 gap-8 items-center flex-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-80 relative"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={revenueBySegment}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                animationDuration={900}
                onMouseEnter={(_, i) => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {revenueBySegment.map((seg, i) => (
                  <Cell
                    key={seg.name}
                    fill={seg.color}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      filter: active === i ? "brightness(1.15) drop-shadow(0 0 8px rgba(37,99,235,.5))" : "none",
                      transform: active === i ? "scale(1.04)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "all .25s ease",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, n, p) => [`${v} tỷ đồng (${p.payload.pct}%)`, p.payload.name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-brand-900"
              >
                {active !== null ? `${revenueBySegment[active].pct}%` : "158.7"}
              </motion.p>
              <p className="text-xs text-slate-400">
                {active !== null ? revenueBySegment[active].name : "tỷ đồng tổng cộng"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-2.5">
          {revenueBySegment.map((seg, i) => (
            <motion.div
              key={seg.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ x: 4 }}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 cursor-default transition-colors ${
                active === i ? "border-brand-300 bg-brand-50" : "border-brand-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-slate-700 font-medium text-sm">{seg.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-brand-900">{seg.value} tỷ</span>
                <span className="text-slate-400 text-xs ml-2">{seg.pct}%</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden shadow-xl h-80 group"
        >
          <img
            src={photo}
            alt="Phòng chờ CIP"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-lg font-bold">CIP & Mặt bằng</p>
            <p className="text-sm text-brand-100">chiếm 97% tổng doanh thu</p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
