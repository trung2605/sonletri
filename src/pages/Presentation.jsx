import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronUp, ChevronDown, Menu, X } from "lucide-react";
import { SLIDE_REGISTRY } from "../data/slideRegistry.js";
import { REPORTS } from "../data/reports.js";

function SlideFallback() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
    </div>
  );
}

export default function Presentation() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get("report") || REPORTS[0].id;
  const report = REPORTS.find((r) => r.id === reportId) || REPORTS[0];

  const slides = report.slideIds
    .map((id) => SLIDE_REGISTRY.find((s) => s.id === id))
    .filter(Boolean);

  const TOTAL = slides.length;
  const slideTitles = slides.map((s) => s.title);

  const containerRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // ── Scroll tracking ──
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const wrappers = container.querySelectorAll(":scope > [data-slide-index]");
      const center = container.scrollTop + container.clientHeight / 2;
      let closest = 0;
      let closestDist = Infinity;
      wrappers.forEach((wrapper) => {
        const i = Number(wrapper.dataset.slideIndex);
        const top = wrapper.offsetTop;
        const bottom = top + wrapper.offsetHeight;
        const dist =
          center >= top && center < bottom
            ? 0
            : Math.min(Math.abs(center - top), Math.abs(center - bottom));
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      activeRef.current = closest;
      setActive(closest);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, [slides]);

  // ── Scroll to slide index ──
  const scrollToIndex = useCallback(
    (i) => {
      const container = containerRef.current;
      const clamped = Math.max(0, Math.min(TOTAL - 1, i));
      const wrapper = container?.querySelector(
        `:scope > [data-slide-index="${clamped}"]`
      );
      wrapper?.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    },
    [TOTAL]
  );

  // ── Jump via agenda (Slide02) ──
  const handleJump = useCallback(
    (agendaIdx) => {
      const target = report.agendaSlideIndices?.[agendaIdx];
      if (target !== undefined) scrollToIndex(target);
    },
    [scrollToIndex, report]
  );

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKeyDown = (e) => {
      if (menuOpen) return;
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(activeRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, scrollToIndex]);

  return (
    <div className="relative w-full h-screen bg-white">
      {/* ── Back to reports gallery ── */}
      <Link
        to="/reports"
        className="fixed top-3 left-3 sm:top-5 sm:left-5 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 font-medium text-xs sm:text-sm hover:bg-brand-50 transition"
      >
        <ArrowLeft size={14} className="sm:hidden" />
        <ArrowLeft size={16} className="hidden sm:block" />
        <span className="hidden sm:inline">Danh sách</span>
      </Link>

      {/* ── Slide counter + menu toggle ── */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-1.5 sm:gap-2">
        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 text-[11px] sm:text-xs font-semibold">
          {active + 1} / {TOTAL}
        </div>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Danh sách slide"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md flex items-center justify-center text-brand-700 hover:bg-brand-50 transition"
        >
          {menuOpen ? <X size={18} className="sm:hidden" /> : <Menu size={18} className="sm:hidden" />}
          {menuOpen ? <X size={20} className="hidden sm:block" /> : <Menu size={20} className="hidden sm:block" />}
        </button>
      </div>

      {/* ── Slide list drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-brand-950/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 sm:w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto pt-16 sm:pt-20 pb-6"
            >
              <p className="px-5 pb-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Danh sách slide
              </p>
              <div className="px-3 space-y-1">
                {slideTitles.map((title, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      active === i
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        active === i
                          ? "bg-brand-600 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Prev / Next buttons ── */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col gap-1.5 sm:gap-2">
        <button
          onClick={() => scrollToIndex(active - 1)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === 0}
          aria-label="Slide trước"
        >
          <ChevronUp size={16} className="sm:hidden" />
          <ChevronUp size={18} className="hidden sm:block" />
        </button>
        <button
          onClick={() => scrollToIndex(active + 1)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === TOTAL - 1}
          aria-label="Slide sau"
        >
          <ChevronDown size={16} className="sm:hidden" />
          <ChevronDown size={18} className="hidden sm:block" />
        </button>
      </div>

      {/* ── Scroll container ── */}
      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth"
      >
        {slides.map((slide, i) => (
          <div key={slide.id} data-slide-index={i} className="scroll-mt-16">
            <Suspense fallback={<SlideFallback />}>
              <slide.Component
                index={i + 1}
                total={TOTAL}
                {...(slide.isAgenda ? { onJump: handleJump } : {})}
              />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
