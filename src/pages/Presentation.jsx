import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import Slide01Cover from "../components/slides/Slide01Cover.jsx";
import Slide02Agenda from "../components/slides/Slide02Agenda.jsx";
import Slide03Overview from "../components/slides/Slide03Overview.jsx";
import Slide04YoY from "../components/slides/Slide04YoY.jsx";
import Slide05RevenueMix from "../components/slides/Slide05RevenueMix.jsx";
import Slide06RevenueDeepDive from "../components/slides/Slide06RevenueDeepDive.jsx";
import Slide07Trend from "../components/slides/Slide07Trend.jsx";
import Slide08TrendDeepDive from "../components/slides/Slide08TrendDeepDive.jsx";
import Slide09CostStructure from "../components/slides/Slide09CostStructure.jsx";
import Slide10CostDetail from "../components/slides/Slide10CostDetail.jsx";
import Slide11BottlenecksA from "../components/slides/Slide11BottlenecksA.jsx";
import Slide12RiskMatrix from "../components/slides/Slide12RiskMatrix.jsx";
import Slide13Roadmap from "../components/slides/Slide13Roadmap.jsx";
import Slide14Dashboard from "../components/slides/Slide14Dashboard.jsx";
import Slide15ThankYou from "../components/slides/Slide15ThankYou.jsx";

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

// Ánh xạ 7 mục agenda -> slide bắt đầu tương ứng (theo thứ tự agenda trong report.js)
const agendaTargets = [2, 3, 4, 6, 8, 10, 12];

export default function Presentation() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { root: container, threshold: 0.6 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToIndex = useCallback((i) => {
    const container = containerRef.current;
    const sections = container?.querySelectorAll("section");
    sections?.[i]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleJump = useCallback(
    (agendaIdx) => scrollToIndex(agendaTargets[agendaIdx]),
    [scrollToIndex]
  );

  return (
    <div className="relative w-full h-screen bg-white">
      <Link
        to="/"
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 font-medium text-sm hover:bg-brand-50 transition"
      >
        <ArrowLeft size={16} />
        Trang chủ
      </Link>

      <div className="fixed top-1/2 right-5 -translate-y-1/2 z-50 flex flex-col gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            aria-label={`Đến slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              active === i ? "bg-brand-600 scale-150" : "bg-brand-200 hover:bg-brand-400"
            }`}
          />
        ))}
      </div>

      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
        <button
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === 0}
          aria-label="Slide trước"
        >
          <ChevronUp size={18} />
        </button>
        <button
          onClick={() => scrollToIndex(Math.min(slides.length - 1, active + 1))}
          className="w-10 h-10 rounded-full bg-white shadow-md border border-brand-100 flex items-center justify-center text-brand-700 hover:bg-brand-50 disabled:opacity-30"
          disabled={active === slides.length - 1}
          aria-label="Slide sau"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      <div className="fixed top-5 right-5 z-50 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-brand-100 shadow-md text-brand-700 text-xs font-semibold">
        {active + 1} / {slides.length}
      </div>

      <div
        ref={containerRef}
        className="w-full h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      >
        {slides.map((Slide, i) => (
          <Slide
            key={i}
            index={i + 1}
            total={slides.length}
            onJump={Slide === Slide02Agenda ? handleJump : undefined}
          />
        ))}
      </div>
    </div>
  );
}
