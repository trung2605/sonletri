import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronUp, ChevronDown, Menu, X } from "lucide-react";

const Slide01Cover = lazy(() => import("../components/slides/Slide01Cover.jsx"));
const Slide02Agenda = lazy(() => import("../components/slides/Slide02Agenda.jsx"));
const Slide03Overview = lazy(() => import("../components/slides/Slide03Overview.jsx"));
const Slide04YoY = lazy(() => import("../components/slides/Slide04YoY.jsx"));
const Slide05RevenueMix = lazy(() => import("../components/slides/Slide05RevenueMix.jsx"));
const Slide06RevenueDeepDive = lazy(() => import("../components/slides/Slide06RevenueDeepDive.jsx"));
const Slide07Trend = lazy(() => import("../components/slides/Slide07Trend.jsx"));
const Slide08TrendDeepDive = lazy(() => import("../components/slides/Slide08TrendDeepDive.jsx"));
const Slide09CostStructure = lazy(() => import("../components/slides/Slide09CostStructure.jsx"));
const Slide10CostDetail = lazy(() => import("../components/slides/Slide10CostDetail.jsx"));
const Slide11BottlenecksA = lazy(() => import("../components/slides/Slide11BottlenecksA.jsx"));
const Slide12RiskMatrix = lazy(() => import("../components/slides/Slide12RiskMatrix.jsx"));
const Slide13Roadmap = lazy(() => import("../components/slides/Slide13Roadmap.jsx"));
const Slide14Dashboard = lazy(() => import("../components/slides/Slide14Dashboard.jsx"));
const Slide15ThankYou = lazy(() => import("../components/slides/Slide15ThankYou.jsx"));

const slides = [
  Slide01Cover,
  Slide02Agenda,
  Slide03Overview,
  Slide04YoY,
  Slide05RevenueMix,
  Slide06RevenueDeepDive,
  Slide07Trend,
  Slide08TrendDeepDive,
  Slide09CostStructure,
  Slide10CostDetail,
  Slide11BottlenecksA,
  Slide12RiskMatrix,
  Slide13Roadmap,
  Slide14Dashboard,
  Slide15ThankYou,
];

function SlideFallback() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
    </div>
  );
}

// Ánh xạ 7 mục agenda -> slide bắt đầu tương ứng (theo thứ tự agenda trong report.js)
const agendaTargets = [2, 3, 4, 6, 8, 10, 12];

const slideTitles = [
  "Trang bìa",
  "Nội dung báo cáo",
  "Tổng quan kết quả kinh doanh",
  "So sánh cùng kỳ 2025",
  "Cơ cấu doanh thu",
  "Phân tích chuyên sâu CIP & Mặt bằng",
  "Diễn biến theo tháng",
  "Truy nguyên nhân điểm trũng T4",
  "Cơ cấu chi phí",
  "Chi tiết 3 khoản chi lớn nhất",
  "Điểm nghẽn cần lưu ý (1/2)",
  "Điểm nghẽn & ma trận rủi ro (2/2)",
  "Lộ trình hành động",
  "Bảng điều khiển KPI",
  "Cảm ơn",
];

export default function Presentation() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("section");
    const onScroll = () => {
      const center = container.scrollTop + container.clientHeight / 2;
      for (let i = 0; i < sections.length; i++) {
        const top = sections[i].offsetTop;
        const bottom = top + sections[i].offsetHeight;
        if (center >= top && center < bottom) {
          setActive(i);
          break;
        }
      }
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToIndex = useCallback((i) => {
    const container = containerRef.current;
    const sections = container?.querySelectorAll("section");
    sections?.[i]?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const handleJump = useCallback(
    (agendaIdx) => scrollToIndex(agendaTargets[agendaIdx]),
    [scrollToIndex]
  );

  return (
    <div className="relative w-full h-screen bg-white">
      <Link
        to="/"
        className="fixed top-3 left-3 sm:top-5 sm:left-5 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 font-medium text-xs sm:text-sm hover:bg-brand-50 transition"
      >
        <ArrowLeft size={14} className="sm:hidden" />
        <ArrowLeft size={16} className="hidden sm:block" />
        <span className="hidden sm:inline">Trang chủ</span>
      </Link>

      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 flex items-center gap-1.5 sm:gap-2">
        <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 text-[11px] sm:text-xs font-semibold">
          {active + 1} / {slides.length}
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
                      active === i ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                        active === i ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-500"
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

      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col gap-1.5 sm:gap-2">
        <button
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === 0}
          aria-label="Slide trước"
        >
          <ChevronUp size={16} className="sm:hidden" />
          <ChevronUp size={18} className="hidden sm:block" />
        </button>
        <button
          onClick={() => scrollToIndex(Math.min(slides.length - 1, active + 1))}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === slides.length - 1}
          aria-label="Slide sau"
        >
          <ChevronDown size={16} className="sm:hidden" />
          <ChevronDown size={18} className="hidden sm:block" />
        </button>
      </div>

      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-auto scroll-smooth"
      >
        {slides.map((Slide, i) => (
          <Suspense key={i} fallback={<SlideFallback />}>
            <Slide
              index={i + 1}
              total={slides.length}
              onJump={Slide === Slide02Agenda ? handleJump : undefined}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
