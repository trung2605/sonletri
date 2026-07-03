import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { bottlenecks } from "../../data/report.js";
import photo from "../../assets/photos/airport-lounge-1.jpg";

export default function Slide11BottlenecksA({ index, total }) {
  const items = bottlenecks.slice(0, 3);
  return (
    <SlideShell dark index={index} total={total} bgImage={photo}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold flex items-center gap-3"
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2 }}
        >
          <AlertTriangle className="text-amber-300" size={36} />
        </motion.span>
        Điểm nghẽn cần lưu ý (1/2)
      </motion.h2>
      <p className="mt-2 text-brand-200">Các rủi ro và bottleneck phát hiện từ số liệu 5 tháng</p>

      <div className="mt-10 space-y-5">
        {items.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{ x: 8, scale: 1.01 }}
            className="flex items-start gap-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-5 cursor-default"
          >
            <span className="w-9 h-9 rounded-full bg-amber-400/90 text-brand-950 font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-white text-lg">{b.title}</h3>
              <p className="text-sm text-brand-100 leading-relaxed mt-1">{b.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
}
