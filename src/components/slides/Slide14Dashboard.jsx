import { motion } from "framer-motion";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import SlideShell from "../ui/SlideShell.jsx";
import { kpiDashboard } from "../../data/report.js";

export default function Slide14Dashboard({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Bảng điều khiển KPI tổng hợp
      </motion.h2>
      <p className="mt-2 text-slate-500">Vòng ngoài xanh = thực hiện · Vạch cam = mốc kỳ vọng theo thời gian</p>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-5 flex-1">
        {kpiDashboard.map((kpi, i) => {
          const data = [{ name: kpi.label, value: kpi.value, fill: "#1d4ed8" }];
          return (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <div className="w-full h-36 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={data}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar
                      background={{ fill: "#eff6ff" }}
                      dataKey="value"
                      cornerRadius={20}
                      animationDuration={1200}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-2xl font-bold text-brand-900">{kpi.value}%</p>
                </div>
              </div>
              <p className="mt-2 text-sm font-medium text-brand-900 text-center">{kpi.label}</p>
              <p className="text-xs text-slate-400 mt-0.5">Kỳ vọng: {kpi.target}%</p>
            </motion.div>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-sm text-brand-700 bg-brand-50 rounded-xl p-4"
      >
        3/4 chỉ số bám sát tỷ lệ thời gian kỳ vọng; biên lợi nhuận sau thuế 39.1% đã vượt mục
        tiêu kế hoạch 38%, cho thấy hiệu quả sinh lời tốt dù doanh thu tài chính chưa đạt kỳ vọng.
      </motion.p>
    </SlideShell>
  );
}
