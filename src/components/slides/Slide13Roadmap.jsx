import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, ChevronRight } from "lucide-react";
import SlideShell from "../ui/SlideShell.jsx";
import { roadmap } from "../../data/report.js";

const COLORS = ["#dc2626", "#f97316", "#16a34a", "#7c3aed", "#0891b2"];

// 5 nodes evenly spread horizontally, y oscillates for wave
const NODES = [
  { x: 80, y: 80 },
  { x: 280, y: 25 },
  { x: 500, y: 125 },
  { x: 720, y: 25 },
  { x: 920, y: 80 },
];

const WAVE_D =
  `M${NODES[0].x},${NODES[0].y} ` +
  NODES.slice(0, -1)
    .map((p, i) => {
      const n = NODES[i + 1];
      const dx = (n.x - p.x) / 3;
      return `C${p.x + dx},${p.y} ${n.x - dx},${n.y} ${n.x},${n.y}`;
    })
    .join(" ");

function HorizontalWave({ active, onSelect }) {
  return (
    <svg
      viewBox="0 0 1000 160"
      className="w-full h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="hwg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="25%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#16a34a" />
          <stop offset="75%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <filter id="hwGlow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Shadow wave */}
      <path
        d={WAVE_D}
        stroke="url(#hwg)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.08"
      />

      {/* Main wave path */}
      <motion.path
        d={WAVE_D}
        stroke="url(#hwg)"
        strokeWidth="3"
        strokeLinecap="round"
        filter="url(#hwGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        pathLength={1}
      />

      {/* Nodes */}
      {NODES.map((n, i) => {
        const isActive = active === i;
        return (
          <g
            key={i}
            className="cursor-pointer"
            onClick={() => onSelect(i)}
            style={{ pointerEvents: "auto" }}
          >
            {/* Ripple for active */}
            {isActive && (
              <circle cx={n.x} cy={n.y} r="18" fill="none" stroke={COLORS[i]} strokeWidth="1.5" opacity="0.25">
                <animate attributeName="r" from="18" to="32" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.25" to="0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Outer ring */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={isActive ? 16 : 12}
              fill="#fff"
              stroke={COLORS[i]}
              strokeWidth={isActive ? 3 : 2}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 400 }}
            />

            {/* Inner dot */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={isActive ? 5 : 3.5}
              fill={COLORS[i]}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.12, type: "spring", stiffness: 400 }}
            />

            {/* Step number */}
            <text
              x={n.x}
              y={n.y - 22}
              textAnchor="middle"
              className="select-none"
              style={{
                fill: isActive ? COLORS[i] : "#64748b",
                fontSize: isActive ? 13 : 11,
                fontWeight: 700,
                fontFamily: "inherit",
              }}
            >
              {i + 1}
            </text>

            {/* Phase short label */}
            <text
              x={n.x}
              y={n.y + 30}
              textAnchor="middle"
              className="select-none"
              style={{
                fill: isActive ? "#1e293b" : "#94a3b8",
                fontSize: isActive ? 12 : 10,
                fontWeight: isActive ? 700 : 500,
                fontFamily: "inherit",
              }}
            >
              {roadmap[i].quarter.length > 18
                ? roadmap[i].quarter.slice(0, 18) + "…"
                : roadmap[i].quarter}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function Slide13Roadmap({ index, total }) {
  const [active, setActive] = useState(0);
  const item = roadmap[active];

  return (
    <SlideShell index={index} total={total}>
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-brand-900"
      >
        Lộ trình hành động đề xuất
      </motion.h2>
      <p className="mt-1 text-sm text-slate-500">
        Bấm vào từng nút trên đường process để xem chi tiết —{" "}
        <span className="font-semibold" style={{ color: COLORS[active] }}>
          Đang xem: {item.title}
        </span>
      </p>

      {/* ── Horizontal wave process ── */}
      <div className="relative mt-4 max-w-4xl mx-auto w-full">
        <HorizontalWave active={active} onSelect={setActive} />
      </div>

      {/* ── Detail panel ── */}
      <div className="mt-3 max-w-5xl mx-auto w-full flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-brand-100 bg-white shadow-sm overflow-hidden"
          >
            {/* Top accent bar */}
            <div className="h-1.5 w-full" style={{ backgroundColor: COLORS[active] }} />

            <div className="p-5 md:p-6">
              {/* Title row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: COLORS[active] + "14", color: COLORS[active] }}
                >
                  {item.quarter}
                </span>
                <ChevronRight size={14} className="text-slate-300" />
                <h3 className="font-bold text-brand-900 text-lg">{item.title}</h3>
              </div>

              <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.detail}</p>

              {/* Two-column: steps + outcome */}
              <div className="mt-5 grid md:grid-cols-5 gap-5">
                {/* Steps - 3 cols */}
                <div className="md:col-span-3 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                    Các bước triển khai cụ thể
                  </p>
                  <ul className="space-y-2.5">
                    {item.steps.map((step, si) => (
                      <li key={si} className="flex gap-2.5 text-sm text-slate-700">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                          style={{ backgroundColor: COLORS[active] + "14", color: COLORS[active] }}
                        >
                          {si + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome - 2 cols */}
                <div className="md:col-span-2">
                  <div
                    className="rounded-xl p-4 border h-full"
                    style={{ backgroundColor: COLORS[active] + "07", borderColor: COLORS[active] + "1e" }}
                  >
                    <p
                      className="text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5"
                      style={{ color: COLORS[active] }}
                    >
                      <Target size={13} />
                      Kết quả kỳ vọng
                    </p>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium">
                      {item.outcome}
                    </p>

                    {/* Progress dots indicator */}
                    <div className="mt-4 flex items-center gap-1.5">
                      {roadmap.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActive(i)}
                          className="w-2 h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: i === active ? COLORS[i] : "#cbd5e1",
                            transform: i === active ? "scale(1.4)" : "scale(1)",
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
    </SlideShell>
  );
}
