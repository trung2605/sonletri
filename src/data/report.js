// Số liệu Báo cáo KQKD 5 tháng đầu năm 2026 - Công ty CP Dịch vụ Nhà ga Quốc tế Đà Nẵng (AHTS)
// Nguồn: Báo cáo KQKD - T5.2026.xlsx, sheet "KQKD 2026" (đối chiếu, làm tròn 1 chữ số thập phân, đơn vị tỷ đồng)

export const overview = {
  revenue: { value: 158.7, planPct: 40.5, plan2026: 392.0 },
  cost: { value: 78.4, planPct: 40.0, plan2026: 195.9 },
  profitBeforeTax: { value: 79.3, planPct: 39.2, plan2026: 202.2 },
  profitAfterTax: { value: 62.0, margin: 39.1, plan2026: 161.8 },
  revenue2025: 336.4,
  growthPlan2026Pct: 16.6,
};

export const revenueBySegment = [
  { name: "Mặt bằng kinh doanh", value: 84.5, pct: 53.3, color: "#1d4ed8" },
  { name: "Dịch vụ phòng CIP", value: 69.3, pct: 43.7, color: "#3b82f6" },
  { name: "Nhà hàng", value: 4.5, pct: 2.8, color: "#93c5fd" },
  { name: "Sleep Pods & Lounge", value: 0.2, pct: 0.1, color: "#bfdbfe" },
  { name: "Khác", value: 0.1, pct: 0.1, color: "#dbeafe" },
];

export const monthlyTrend = [
  { month: "T1", revenue: 32.7, cost: 15.0, profit: 17.2 },
  { month: "T2", revenue: 31.4, cost: 16.1, profit: 15.3 },
  { month: "T3", revenue: 33.1, cost: 15.5, profit: 17.4 },
  { month: "T4", revenue: 30.4, cost: 16.4, profit: 13.9 },
  { month: "T5", revenue: 31.2, cost: 15.4, profit: 15.6 },
];

export const costStructure = [
  { name: "Thuê mặt bằng", value: 47.0, pct: 60.0 },
  { name: "Lương & khoản theo lương", value: 17.0, pct: 21.7 },
  { name: "Thực phẩm, hàng hóa", value: 10.2, pct: 13.0 },
  { name: "Công cụ dụng cụ", value: 1.3, pct: 1.6 },
  { name: "Dịch vụ mua ngoài", value: 0.7, pct: 1.0 },
  { name: "Đảm bảo hoạt động VP", value: 0.6, pct: 0.8 },
  { name: "Khác (VTTH, đối ngoại, đào tạo...)", value: 1.6, pct: 1.9 },
];

export const bottlenecks = [
  {
    title: "Doanh thu tài chính đạt thấp",
    detail:
      "Lãi tiền gửi, lãi cho vay 5 tháng chỉ đạt 13.7% kế hoạch năm, thấp hơn nhiều so với mốc kỳ vọng theo tiến độ thời gian (41.7%).",
    evidence: [
      "Lãi tiền gửi 5T2026: 1.15 tỷ / KH năm 9.38 tỷ (12.2%) — sheet KQKD 2026, dòng \"Lãi tiền gửi\"",
      "Lãi cho vay, chênh lệch tỷ giá 5T2026: 0.49 tỷ / KH năm 1.53 tỷ (32.0%)",
      "Tổng doanh thu tài chính 5T2026: 1.64 tỷ / KH năm 11.91 tỷ = 13.7%",
      "Riêng T3 lãi tiền gửi chỉ 78.7 triệu, T5 chỉ còn 1.06 triệu — sụt giảm mạnh liên tiếp",
    ],
  },
  {
    title: "Chi phí văn phòng tăng vọt",
    detail:
      "Chi phí đảm bảo hoạt động văn phòng mới đạt 18.6% kế hoạch năm nhưng riêng tháng 5 tăng gấp 3 lần so với tháng 1.",
    evidence: [
      "T1: 66.8 triệu → T5: 230.8 triệu (gấp 3.45 lần) — sheet KQKD 2026, dòng \"Đảm bảo hoạt động văn phòng\"",
      "Lũy kế 5 tháng: 623.1 triệu / KH năm 3.34 tỷ = 18.6%, thấp hơn tiến độ thời gian kỳ vọng",
      "Xu hướng tăng dần đều qua từng tháng (T1→T5: 66.8 → 51.1 → 93.2 → 181.3 → 230.8 triệu)",
    ],
  },
  {
    title: "Rủi ro tập trung doanh thu",
    detail:
      "Cơ cấu doanh thu phụ thuộc lớn vào 2 mảng CIP và mặt bằng kinh doanh, chiếm tới 97% tổng doanh thu.",
    evidence: [
      "CIP: 69.3 tỷ (43.7%) + Mặt bằng kinh doanh: 84.5 tỷ (53.3%) = 153.8/158.7 tỷ = 97.0%",
      "3 mảng còn lại (nhà hàng, sleep pods, khác) cộng lại chỉ 4.9 tỷ (3.0%)",
      "Không có mảng nào khác đạt trên 3% tỷ trọng để san sẻ rủi ro nếu CIP/MB biến động",
    ],
  },
  {
    title: "Đào tạo tuyển dụng chậm",
    detail:
      "Ngân sách đào tạo, tuyển dụng mới giải ngân 2.7% kế hoạch năm — chậm so với tiến độ.",
    evidence: [
      "Lũy kế 5T2026: 35.0 triệu / KH năm 1.30 tỷ = 2.7% — sheet KQKD 2026, dòng \"Đào tạo, tuyển dụng\"",
      "T2-T3 gần như không phát sinh (1.15 triệu và 1.15 triệu), thấp hơn nhiều so với cùng kỳ 2025",
      "Cùng kỳ 5T2025 khoản này đã đạt 131.1 triệu — cho thấy tốc độ giải ngân 2026 chậm hơn hẳn năm trước",
    ],
  },
  {
    title: "Lợi nhuận tháng 4 sụt giảm",
    detail:
      "Lợi nhuận trước thuế tháng 4 giảm gần 20% so với tháng 3 (17.4 tỷ → 13.9 tỷ), cần phân tích nguyên nhân cụ thể.",
    evidence: [
      "LNTT: T3 17.38 tỷ → T4 13.88 tỷ = -20.1% (sheet KQKD 2026, dòng \"LỢI NHUẬN TRƯỚC THUẾ\")",
      "Doanh thu T4 giảm còn 30.4 tỷ (thấp nhất 5 tháng), chi phí T4 tăng lên 16.4 tỷ (cao nhất 5 tháng)",
      "Chi phí lương T4 tăng đột biến lên 4.12 tỷ so với trung bình ~3.1 tỷ các tháng khác — yếu tố chính kéo lợi nhuận giảm",
    ],
  },
];

export const actions = [
  "Rà soát nguyên nhân sụt giảm lợi nhuận tháng 4 để có biện pháp ngăn ngừa lặp lại.",
  "Đánh giá lại chiến lược đầu tư tài chính để cải thiện doanh thu từ lãi tiền gửi và lãi cho vay.",
  "Xây dựng thêm nguồn doanh thu mới từ nhà hàng và dịch vụ khác để giảm rủi ro tập trung.",
  "Đẩy nhanh tiến độ giải ngân ngân sách đào tạo tuyển dụng theo kế hoạch.",
  "Theo dõi sát chi phí đảm bảo hoạt động văn phòng đang có xu hướng tăng nhanh.",
];

export const agenda = [
  { title: "Tổng quan kết quả kinh doanh", desc: "Doanh thu, chi phí, lợi nhuận 5 tháng" },
  { title: "So sánh cùng kỳ 2025", desc: "Tăng trưởng và tiến độ kế hoạch" },
  { title: "Cơ cấu doanh thu", desc: "Tỷ trọng theo mảng kinh doanh" },
  { title: "Diễn biến theo tháng", desc: "Xu hướng doanh thu - chi phí - lợi nhuận" },
  { title: "Cơ cấu chi phí", desc: "Phân tích các khoản mục chi phí" },
  { title: "Điểm nghẽn & rủi ro", desc: "Các vấn đề cần lưu ý từ số liệu" },
  { title: "Đề xuất hành động", desc: "Lộ trình khuyến nghị" },
];

export const yoyComparison = [
  { label: "Doanh thu", y2025: 336.4, plan2026: 392.0, th2026: 158.7 },
  { label: "Chi phí", y2025: 168.5, plan2026: 195.9, th2026: 78.4 },
  { label: "LN trước thuế", y2025: 193.1, plan2026: 202.2, th2026: 79.3 },
  { label: "LN sau thuế", y2025: 154.6, plan2026: 161.8, th2026: 62.0 },
];

export const revenueDetail = {
  cip: {
    name: "Dịch vụ phòng CIP",
    value: 69.3,
    pct: 43.7,
    planPct: 44.0,
    note: "Gần đạt tiến độ tuyến tính (41.7%), là mảng dịch vụ cao cấp chủ lực phục vụ khách thương gia và VIP.",
  },
  mb: {
    name: "Mặt bằng kinh doanh",
    value: 84.5,
    pct: 53.3,
    planPct: 39.3,
    note: "Vượt tiến độ tuyến tính, đóng góp lớn nhất nhờ giá thuê ổn định và tỷ lệ lấp đầy cao.",
  },
};

export const costDetail = [
  { month: "T1", rent: 9.33, salary: 3.10, food: 1.97 },
  { month: "T2", rent: 9.38, salary: 3.62, food: 2.04 },
  { month: "T3", rent: 9.42, salary: 3.06, food: 2.11 },
  { month: "T4", rent: 9.42, salary: 4.12, food: 2.00 },
  { month: "T5", rent: 9.43, salary: 3.12, food: 2.06 },
];

export const riskMatrix = [
  { name: "Rủi ro tập trung doanh thu (97% CIP+MB)", impact: 9, likelihood: 8 },
  { name: "Doanh thu tài chính thấp (13.7% KH)", impact: 5, likelihood: 8 },
  { name: "Chi phí văn phòng tăng vọt T5", impact: 4, likelihood: 7 },
  { name: "Đào tạo tuyển dụng chậm giải ngân", impact: 3, likelihood: 6 },
  { name: "Lợi nhuận T4 sụt giảm", impact: 6, likelihood: 5 },
];

export const roadmap = [
  {
    quarter: "Ngay trong T6/2026",
    title: "Rà soát nguyên nhân sụt giảm lợi nhuận tháng 4",
    detail: "Phân tích chi tiết theo từng khoản mục để có biện pháp ngăn ngừa lặp lại.",
  },
  {
    quarter: "Q3/2026",
    title: "Tái cấu trúc chiến lược đầu tư tài chính",
    detail: "Cải thiện doanh thu từ lãi tiền gửi và lãi cho vay, hiện chỉ đạt 13.7% kế hoạch năm.",
  },
  {
    quarter: "Q3-Q4/2026",
    title: "Đa dạng hóa nguồn doanh thu",
    detail: "Phát triển nhà hàng, Sleep Pods, Lounge để giảm phụ thuộc vào CIP và mặt bằng kinh doanh.",
  },
  {
    quarter: "Song song cả năm",
    title: "Đẩy nhanh giải ngân đào tạo tuyển dụng",
    detail: "Bám sát tiến độ kế hoạch, hiện mới đạt 2.7% ngân sách năm.",
  },
  {
    quarter: "Liên tục",
    title: "Giám sát chi phí đảm bảo hoạt động văn phòng",
    detail: "Theo dõi sát xu hướng tăng nhanh, tháng 5 gấp 3 lần tháng 1.",
  },
];

export const kpiDashboard = [
  { label: "Doanh thu / kế hoạch năm", value: 40.5, target: 41.7, unit: "%" },
  { label: "Chi phí / kế hoạch năm", value: 40.0, target: 41.7, unit: "%" },
  { label: "LN trước thuế / kế hoạch năm", value: 39.2, target: 41.7, unit: "%" },
  { label: "Biên lợi nhuận sau thuế", value: 39.1, target: 38.0, unit: "%" },
];

export const meta = {
  company: "Công ty Cổ phần Dịch vụ Nhà ga Quốc tế Đà Nẵng",
  companyShort: "AHTS",
  period: "Tháng 1 - Tháng 5 năm 2026",
  department: "Phòng Kế hoạch Kinh doanh Tài chính Kế toán",
};
