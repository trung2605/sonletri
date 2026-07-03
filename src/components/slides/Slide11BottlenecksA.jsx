import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileSearch, ChevronDown } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { bottlenecks } from "../../data/report.js";
import photo from "../../assets/photos/airport-lounge-1.jpg";

export default function Slide11BottlenecksA({ index, total }) {
  const items = bottlenecks.slice(0, 3);
  const [open, setOpen] = useState(null);

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
      <p className="mt-2 text-brand-200">
        Bấm vào từng mục để xem số liệu chứng minh chi tiết
      </p>

      <div className="mt-8 space-y-4">
        {items.map((b, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur overflow-hidden"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-amber-400/90 text-brand-950 font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">{b.title}</h3>
                  <p className="text-sm text-brand-100 leading-relaxed mt-1">{b.detail}</p>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="flex-shrink-0 mt-1 text-brand-200"
                >
                  <ChevronDown size={20} />
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
                    <div className="px-5 pb-5 pl-[3.75rem]">
                      <div className="rounded-xl bg-brand-950/40 border border-white/10 p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wide mb-2">
                          <FileSearch size={14} />
                          Số liệu chứng minh
                        </p>
                        <ul className="space-y-1.5">
                          {b.evidence.map((e) => (
                            <li key={e} className="text-sm text-brand-100 flex gap-2">
                              <span className="text-amber-300 flex-shrink-0">•</span>
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
    </SlideShell>
  );
}
