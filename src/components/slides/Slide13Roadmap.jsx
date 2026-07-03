import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ChevronRight } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { roadmap } from "../../data/report.js";

const BLUE = "#1d4ed8";

function HorizontalStepper({ active, onSelect }) {
  return (
    <div className="relative flex items-center justify-between max-w-3xl mx-auto">
      {/* Connecting line */}
      <div className="absolute top-5 left-[30px] right-[30px] h-0.5 bg-brand-200 rounded-full" />

      {/* Progress fill */}
      <motion.div
        className="absolute top-5 left-[30px] h-0.5 bg-brand-600 rounded-full"
        initial={{ width: "0%" }}
        whileInView={{ width: `${(active / (roadmap.length - 1)) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ maxWidth: `calc(100% - 60px)` }}
      />

      {roadmap.map((_, i) => {
        const isActive = active === i;
        const isDone = i < active;
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="relative z-10 flex flex-col items-center gap-1.5 group focus:outline-none"
          >
            {/* Node circle */}
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 400 }}
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                transition-all duration-300 border-2
                ${isActive
                  ? "bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-200 scale-110"
                  : isDone
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-slate-400 border-slate-200 group-hover:border-brand-300"
                }
              `}
            >
              {i + 1}
            </motion.span>

            {/* Label */}
            <span
              className={`text-[11px] font-semibold text-center leading-tight transition-colors duration-300 ${
                isActive ? "text-brand-700" : isDone ? "text-brand-600" : "text-slate-400"
              }`}
            >
              {roadmap[i].quarter}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <motion.span
                layoutId="activeDot"
                className="w-1.5 h-1.5 rounded-full bg-brand-500"
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function Slide13Roadmap({ index, total }) {
  const [active, setActive] = useState(0);
  const item = roadmap[active];

  return (
    <SlideShell index={index} total={total}>
      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold text-brand-900"
        >
          Lộ trình hành động đề xuất
        </motion.h2>
        <p className="mt-1 text-sm text-slate-500">
          Bấm vào từng nút để xem chi tiết —{" "}
          <span className="font-semibold text-brand-700">{item.title}</span>
        </p>

        {/* ── Horizontal stepper ── */}
        <div className="mt-5 mb-2">
          <HorizontalStepper active={active} onSelect={setActive} />
        </div>

        {/* ── Detail panel ── */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-brand-100 bg-white shadow-sm overflow-hidden"
            >
              {/* Blue accent bar */}
              <div className="h-1 bg-brand-500 w-full" />

              <div className="p-5">
                {/* Title row */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">
                    {item.quarter}
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                  <h3 className="font-bold text-brand-900">{item.title}</h3>
                </div>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{item.detail}</p>

                {/* Two-column: steps + outcome */}
                <div className="mt-4 grid md:grid-cols-5 gap-4">
                  {/* Steps — 3 cols */}
                  <div className="md:col-span-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">
                      Các bước triển khai cụ thể
                    </p>
                    <ul className="space-y-2">
                      {item.steps.map((step, si) => (
                        <li key={si} className="flex gap-2.5 text-sm text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                            {si + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome — 2 cols */}
                  <div className="md:col-span-2">
                    <div className="rounded-xl bg-brand-50/70 border border-brand-100 p-4 h-full">
                      <p className="text-[11px] font-bold text-brand-600 uppercase tracking-wide flex items-center gap-1.5">
                        <Target size={13} />
                        Kết quả kỳ vọng
                      </p>
                      <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium">
                        {item.outcome}
                      </p>

                      {/* Phase dots */}
                      <div className="mt-4 flex items-center gap-1.5">
                        {roadmap.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                              backgroundColor: i === active ? BLUE : "#cbd5e1",
                              transform: i === active ? "scale(1.5)" : "scale(1)",
                            }}
                          />
                        ))}
                        <span className="ml-2 text-[11px] text-slate-400">
                          {active + 1}/{roadmap.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SlideShell>
  );
}
