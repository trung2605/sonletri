import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { agenda } from "../../data/report.js";

export default function Slide02Agenda({ index, total, onJump }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Nội dung báo cáo
      </motion.h2>
      <p className="mt-2 text-slate-500">Bấm vào mục để đi thẳng đến phần tương ứng</p>

      <div className="mt-10 grid md:grid-cols-2 gap-4 flex-1">
        {agenda.map((item, i) => (
          <motion.button
            key={item.title}
            onClick={() => onJump?.(i)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.02, x: 6 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center gap-5 rounded-2xl border border-brand-100 bg-white p-5 text-left shadow-sm hover:shadow-lg hover:border-brand-300 transition-all overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-brand-50 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 flex-shrink-0 w-11 h-11 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center text-lg group-hover:bg-brand-700 transition-colors">
              {i + 1}
            </span>
            <div className="relative z-10 flex-1">
              <p className="font-semibold text-brand-900">{item.title}</p>
              <p className="text-sm text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <ArrowUpRight
              className="relative z-10 text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0"
              size={20}
            />
          </motion.button>
        ))}
      </div>
    </SlideShell>
  );
}
