import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { agenda } from "../../data/report.js";
import photo from "../../assets/photos/_DHP5494 copy.webp";

export default function Slide02Agenda({ index, total, onJump }) {
  return (
    <SlideShell index={index} total={total}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="absolute left-0 top-0 bottom-0 w-2 bg-linear-to-b from-brand-600 via-brand-500 to-brand-300"
      />
      <div className="grid lg:grid-cols-5 gap-8 flex-1">
        <div className="lg:col-span-3 flex flex-col">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-900"
          >
            Nội dung báo cáo
          </motion.h2>
          <p className="mt-2 text-slate-500">Bấm vào mục để đi thẳng đến phần tương ứng</p>

          <div className="mt-8 grid grid-cols-1 gap-4 flex-1">
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
                className="group relative flex items-center gap-5 rounded-2xl border border-brand-100 bg-white p-4 text-left shadow-sm hover:shadow-lg hover:border-brand-300 transition-all overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-brand-50 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 shrink-0 w-10 h-10 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center text-base group-hover:bg-brand-700 transition-colors">
                  {i + 1}
                </span>
                <div className="relative z-10 flex-1">
                  <p className="font-semibold text-brand-900 text-sm">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
                <ArrowUpRight
                  className="relative z-10 text-brand-300 group-hover:text-brand-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0"
                  size={18}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-xl group"
        >
          <img
            src={photo}
            alt="Nhà ga sân bay"
            className="w-full h-full object-cover min-h-64 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-brand-950/60 via-brand-900/5 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-white">
            <p className="text-lg font-bold">AHTS</p>
            <p className="text-xs text-brand-100 mt-0.5">
              Dịch vụ Nhà ga Quốc tế Đà Nẵng · Báo cáo KQKD 5 tháng đầu năm 2026
            </p>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
