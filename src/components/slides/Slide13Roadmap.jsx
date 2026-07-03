import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { roadmap } from "../../data/report.js";

export default function Slide13Roadmap({ index, total }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-brand-900"
      >
        Lộ trình hành động đề xuất
      </motion.h2>
      <p className="mt-2 text-slate-500">Ưu tiên triển khai theo thời gian</p>

      <div className="mt-10 relative max-w-3xl">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
          className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-brand-200"
        />
        <div className="space-y-8">
          {roadmap.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-11"
            >
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.2 }}
                className="absolute left-0 top-0 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white shadow-md"
              >
                <Flag size={14} />
              </motion.span>
              <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">
                {r.quarter}
              </p>
              <motion.div
                whileHover={{ x: 4 }}
                className="mt-1 rounded-xl border border-brand-100 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-brand-900">{r.title}</p>
                <p className="text-sm text-slate-500 mt-1">{r.detail}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}
