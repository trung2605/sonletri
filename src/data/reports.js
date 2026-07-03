import terminalPhoto from "../assets/photos/airport-terminal-1.webp";

/**
 * Report deck definitions.
 *
 * Each report:
 *   id         — unique key, used as URL search param (?report=xxx)
 *   name       — human-readable title
 *   desc       — short description for gallery card
 *   thumbnail  — image import for card
 *   stats      — key stats shown on gallery card
 *   slideIds   — ordered array of slide IDs (must match SLIDE_REGISTRY ids)
 *   agendaSlideIndices — maps agenda items (index 0..N) to slide positions in slideIds
 *
 * To add a new report deck:
 *   1. Define slides in slideRegistry.js (or reuse existing ones)
 *   2. Add an entry here with the desired slideIds order
 *   3. It automatically appears in the gallery at /reports
 */
export const REPORTS = [
  {
    id: "2026-q1-5m",
    name: "Báo cáo KQKD 5 tháng đầu năm 2026",
    desc: "Phân tích toàn diện kết quả kinh doanh của Công ty CP Dịch vụ Nhà ga Quốc tế Đà Nẵng — doanh thu, chi phí, lợi nhuận và các khuyến nghị hành động.",
    thumbnail: terminalPhoto,
    stats: [
      { label: "Slide", value: "16" },
      { label: "Doanh thu", value: "158.7 tỷ" },
      { label: "Lợi nhuận", value: "62.0 tỷ" },
    ],
    slideIds: [
      "cover",
      "agenda",
      "overview",
      "highlights",
      "yoy",
      "revenue-mix",
      "revenue-deepdive",
      "trend",
      "trend-deepdive",
      "cost-structure",
      "cost-detail",
      "bottlenecks-1",
      "bottlenecks-2",
      "roadmap",
      "dashboard",
      "thankyou",
    ],
    // 7 agenda items -> tương ứng slide positions trong slideIds (0-based)
    agendaSlideIndices: [2, 4, 5, 7, 9, 11, 13],
  },
];
