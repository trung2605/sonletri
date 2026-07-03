import { lazy } from "react";

/**
 * Registry of all available slides.
 * Add a new slide here, then reference its `id` in a report's `slideIds` array.
 *
 * Fields:
 *   id        — unique key used in report definitions
 *   Component — React.lazy(() => import("…"))
 *   title     — shown in slide menu / counter
 *   isAgenda  — true if the slide receives an `onJump` prop (Slide02Agenda)
 */
export const SLIDE_REGISTRY = [
  {
    id: "cover",
    Component: lazy(() => import("../components/slides/Slide01Cover.jsx")),
    title: "Trang bìa",
  },
  {
    id: "agenda",
    Component: lazy(() => import("../components/slides/Slide02Agenda.jsx")),
    title: "Nội dung báo cáo",
    isAgenda: true,
  },
  {
    id: "overview",
    Component: lazy(() => import("../components/slides/Slide03Overview.jsx")),
    title: "Tổng quan kết quả kinh doanh",
  },
  {
    id: "highlights",
    Component: lazy(() => import("../components/slides/SlideHighlights.jsx")),
    title: "Điểm nhấn KQKD",
  },
  {
    id: "yoy",
    Component: lazy(() => import("../components/slides/Slide04YoY.jsx")),
    title: "So sánh cùng kỳ 2025",
  },
  {
    id: "revenue-mix",
    Component: lazy(() => import("../components/slides/Slide05RevenueMix.jsx")),
    title: "Cơ cấu doanh thu",
  },
  {
    id: "revenue-deepdive",
    Component: lazy(() => import("../components/slides/Slide06RevenueDeepDive.jsx")),
    title: "Phân tích chuyên sâu CIP & Mặt bằng",
  },
  {
    id: "trend",
    Component: lazy(() => import("../components/slides/Slide07Trend.jsx")),
    title: "Diễn biến theo tháng",
  },
  {
    id: "trend-deepdive",
    Component: lazy(() => import("../components/slides/Slide08TrendDeepDive.jsx")),
    title: "Truy nguyên nhân điểm trũng T4",
  },
  {
    id: "cost-structure",
    Component: lazy(() => import("../components/slides/Slide09CostStructure.jsx")),
    title: "Cơ cấu chi phí",
  },
  {
    id: "cost-detail",
    Component: lazy(() => import("../components/slides/Slide10CostDetail.jsx")),
    title: "Chi tiết 3 khoản chi lớn nhất",
  },
  {
    id: "bottlenecks-1",
    Component: lazy(() => import("../components/slides/Slide11BottlenecksA.jsx")),
    title: "Điểm nghẽn cần lưu ý (1/2)",
  },
  {
    id: "bottlenecks-2",
    Component: lazy(() => import("../components/slides/Slide12RiskMatrix.jsx")),
    title: "Điểm nghẽn & ma trận rủi ro (2/2)",
  },
  {
    id: "roadmap",
    Component: lazy(() => import("../components/slides/Slide13Roadmap.jsx")),
    title: "Lộ trình hành động",
  },
  {
    id: "dashboard",
    Component: lazy(() => import("../components/slides/Slide14Dashboard.jsx")),
    title: "Bảng điều khiển KPI",
  },
  {
    id: "thankyou",
    Component: lazy(() => import("../components/slides/Slide15ThankYou.jsx")),
    title: "Cảm ơn",
  },
];
