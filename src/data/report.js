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
    plan2026: 157.7,
    y2025: 139.6,
    note: "Gần đạt tiến độ tuyến tính (41.7%), là mảng dịch vụ cao cấp chủ lực phục vụ khách thương gia và VIP.",
    monthly: [14.76, 13.60, 14.30, 13.19, 13.47],
  },
  mb: {
    name: "Mặt bằng kinh doanh",
    value: 84.5,
    pct: 53.3,
    planPct: 39.3,
    plan2026: 214.9,
    y2025: 196.0,
    note: "Vượt tiến độ tuyến tính, đóng góp lớn nhất nhờ giá thuê ổn định và tỷ lệ lấp đầy cao.",
    monthly: [17.61, 16.81, 17.74, 16.01, 16.35],
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

// ── Lộ trình hành động đề xuất ──
// Nguồn số liệu: Báo cáo KQKD - T5.2026.xlsx, sheet "KQKD 2026"
// Cấu trúc cột: C24=KH 2026, C25=TH 2026 (lũy kế 5T), C26-C30=T01-T05/2026
// Các dòng tham chiếu: R7=CIP, R8=Sleep Pods, R9=MB, R10=Nhà hàng, R13=Tổng DT,
//   R22=VP, R23=Lương, R24=Đào tạo, R26=Thuê MB, R28=Thực phẩm, R30=Tổng CP,
//   R34=Lãi tiền gửi, R36=Lãi cho vay, R39=Tổng DTTC, R49=LNTT, R51=LNST
export const roadmap = [
  {
    quarter: "Ngay trong T6/2026",
    title: "Rà soát nguyên nhân sụt giảm lợi nhuận tháng 4",
    detail: "Lợi nhuận trước thuế T4 giảm -20.1% so với T3 (17.4→13.9 tỷ). Chi phí T4 cao nhất 5 tháng (16.4 tỷ), doanh thu thấp nhất (30.4 tỷ). Cần phân tích gốc rễ và lập cơ chế cảnh báo sớm.",
    steps: [
      "Đối chiếu bảng lương T4 (4.12 tỷ, +34.6% vs T3: 3.06 tỷ) với kế hoạch nhân sự — xác định là chi phí thường xuyên hay đột xuất (thưởng, OT, tuyển mới, tăng lương định kỳ).",
      "Phân tích chi tiết từng tiểu mục trong 16.4 tỷ chi phí T4: thuê MB, lương, thực phẩm, CCDC, dịch vụ ngoài, VP — tách yếu tố một lần và yếu tố cơ cấu.",
      "Rà soát doanh thu T4 theo tuần: kiểm tra biến động lượng khách CIP, tỷ lệ lấp đầy mặt bằng, doanh thu nhà hàng — đối chiếu với lịch bay và mùa vụ.",
      "Lập báo cáo so sánh T4/2026 vs T4/2025 (số liệu từ sheet KQKD 2025) để tách yếu tố mùa vụ khỏi yếu tố bất thường nội tại.",
      "Đề xuất cơ chế: (a) trần chi phí lương/tháng gắn với doanh thu, (b) cảnh báo tự động khi chi phí vượt 10% trung bình 3 tháng gần nhất, (c) họp giao ban tài chính trước ngày 5 hàng tháng.",
    ],
    outcome: "Báo cáo nguyên nhân gốc rễ gửi Ban Giám đốc trước 15/06 + 3 biện pháp phòng ngừa áp dụng từ T7.",
    sources: [
      "LNTT T3→T4: sheet \"KQKD 2026\", R49 (LỢI NHUẬN TRƯỚC THUẾ), C28=17.38 tỷ → C29=13.88 tỷ (-20.1%)",
      "Tổng doanh thu T4: R13 (TỔNG DOANH THU), C29=30.37 tỷ — thấp nhất 5 tháng",
      "Tổng chi phí T4: R30 (TỔNG CHI PHÍ), C29=16.36 tỷ — cao nhất 5 tháng",
      "Lương T3→T4: R23 (Lương và các khoản theo lương), C28=3.06 tỷ → C29=4.12 tỷ (+34.6%), trung bình các tháng khác ~3.1-3.6 tỷ",
      "Thuê MB T4: R26, C29=9.42 tỷ; Thực phẩm T4: R28, C29=2.00 tỷ; CCDC T4: R27, C29=0.20 tỷ",
      "Doanh thu CIP T4: R7, C29=13.19 tỷ; MB T4: R9, C29=16.01 tỷ; Nhà hàng T4: R10, C29=1.11 tỷ",
    ],
    color: "#dc2626",
  },
  {
    quarter: "Q3/2026 (T7–T9)",
    title: "Tái cấu trúc chiến lược đầu tư tài chính",
    detail: "Tổng doanh thu tài chính 5T chỉ đạt 1.64/11.91 tỷ KH năm (13.7%). Riêng T5 lãi tiền gửi còn 1.06 triệu đồng — dòng tiền nhàn rỗi chưa được khai thác hiệu quả.",
    steps: [
      "Đánh giá toàn bộ danh mục tiền gửi: kỳ hạn, lãi suất từng ngân hàng, số dư bình quân — lãi tiền gửi 5T mới đạt 1.15/9.38 tỷ (12.2%), cần chuyển sang kỳ hạn dài hơn với lãi suất cao hơn.",
      "Làm việc với ít nhất 3 ngân hàng thương mại để đàm phán lãi suất ưu đãi cho số dư tiền gửi lớn và ổn định của AHTS — mục tiêu tăng lãi suất bình quân thêm 1–1.5 điểm %.",
      "Rà soát các khoản cho vay: 5T đạt 0.49/1.53 tỷ (32.0%) — đánh giá khả năng thu hồi, điều chỉnh lãi suất cho vay nội bộ, cân nhắc thu hồi sớm nếu lãi thấp hơn lãi tiền gửi.",
      "Xây dựng kế hoạch dòng tiền 6 tháng cuối năm: dự báo thu/chi theo tuần để tối ưu thời điểm gửi/rút, tránh tình trạng tiền nhàn rỗi không sinh lãi như T5.",
      "Đề xuất chính sách: duy trì số dư tối thiểu đủ thanh khoản 1 tháng hoạt động, phần còn lại gửi kỳ hạn 3–6 tháng để tối ưu lãi suất.",
    ],
    outcome: "Tăng doanh thu tài chính từ 13.7% lên ≥55% KH năm vào cuối Q3, tương đương khoảng 4.9 tỷ bổ sung.",
    sources: [
      "Tổng DTTC 5T: R39 (Tổng DT tài chính), C25=1.64 tỷ / KH năm C24=11.91 tỷ → 13.7%",
      "Lãi tiền gửi 5T: R34, C25=1.15 tỷ / KH năm C24=9.38 tỷ → 12.2%",
      "Diễn biến lãi TG theo tháng: R34, C26=476.5tr → C27=419.1tr → C28=78.7tr → C29=171.5tr → C30=1.06tr (sụt giảm liên tục)",
      "Lãi cho vay 5T: R36, C25=0.49 tỷ / KH năm C24=1.53 tỷ → 32.0%",
      "Tổng LNTT 5T: R49, C25=79.29 tỷ — dòng tiền nhàn rỗi lớn, đối chiếu số dư tiền gửi bình quân trên sổ phụ ngân hàng",
    ],
    color: "#f97316",
  },
  {
    quarter: "Q3–Q4/2026 (T7–T12)",
    title: "Đa dạng hóa nguồn doanh thu ngoài CIP & Mặt bằng",
    detail: "CIP (43.7%) + Mặt bằng (53.3%) = 97.0% tổng doanh thu. Chỉ một cú sốc vào một trong hai mảng, AHTS sẽ chịu ảnh hưởng nghiêm trọng. Cần phát triển các mảng còn lại đang ở mức rất thấp.",
    steps: [
      "Nhà hàng (hiện 4.5 tỷ, 2.8%): (a) thiết kế menu riêng cho khách CIP hạng thương gia, (b) chương trình khuyến mãi giờ thấp điểm (combo cà phê + bánh), (c) gói combo CIP + suất ăn với giá ưu đãi, (d) cải tạo không gian và biển hiệu để tăng nhận diện.",
      "Sleep Pods & Lounge (hiện 0.2 tỷ, 0.1%): (a) khảo sát nhu cầu thực tế của khách quá cảnh/chậm chuyến trong 2 tuần, (b) lắp đặt thêm 2–4 pod tại khu vực gần cổng ra máy bay, (c) xây dựng bảng giá linh hoạt theo giờ (nghỉ ngắn 1–2h, nghỉ dài 4–8h), (d) tích hợp đặt chỗ qua app/website AHTS và QR code tại quầy.",
      "Dịch vụ mới tiềm năng: (a) nghiên cứu gói đón tiễn VIP (fast-track, xe điện, nhân viên hỗ trợ), (b) phòng họp nhanh 30–60 phút cho khách thương gia, (c) quảng cáo trong khu vực CIP lounge (màn hình, bàn, ấn phẩm), (d) cho thuê không gian lounge ngoài giờ cao điểm để tổ chức sự kiện/hội thảo nhỏ.",
      "Đặt KPI cụ thể cho từng mảng nhỏ: nhà hàng → 6–7 tỷ (từ 4.5), Sleep Pods → 1–2 tỷ (từ 0.2), dịch vụ mới → 2–3 tỷ. Mục tiêu tổng: nâng tỷ trọng nhóm ngoài CIP+MB từ 3.0% lên 5–7%.",
    ],
    outcome: "Giảm rủi ro tập trung từ 97% CIP+MB xuống dưới 92%, tăng thêm 8–12 tỷ doanh thu từ các mảng phụ vào cuối năm.",
    sources: [
      "CIP 5T: R7, C25=69.32 tỷ (43.96% KH năm) — tỷ trọng trong tổng DT: 69.32/158.70 = 43.7%",
      "Mặt bằng KD 5T: R9, C25=84.52 tỷ (39.32% KH năm) — tỷ trọng: 84.52/158.70 = 53.3%",
      "Nhà hàng 5T: R10, C25=4.50 tỷ (24.14% KH năm) — tỷ trọng: 4.50/158.70 = 2.8%",
      "Sleep Pods 5T: R8, C25=0.23 tỷ (28.93% KH năm) — tỷ trọng: 0.23/158.70 = 0.1%",
      "Tổng doanh thu 5T: R13, C25=158.70 tỷ — CIP+MB = 153.84/158.70 = 97.0%",
      "KH năm từng mảng: CIP=R7 C24=157.68 tỷ, MB=R9 C24=214.94 tỷ, Nhà hàng=R10 C24=18.62 tỷ, Sleep Pods=R8 C24=0.78 tỷ",
      "Doanh thu khác 5T: R11, C25=0.14 tỷ — bao gồm thu khác từ hoạt động kinh doanh phụ trợ",
    ],
    color: "#16a34a",
  },
  {
    quarter: "Song song cả năm 2026",
    title: "Đẩy nhanh giải ngân đào tạo & tuyển dụng",
    detail: "Ngân sách đào tạo tuyển dụng 5T mới giải ngân 35.0/1,304 triệu (2.7%), quá thấp so với tiến độ thời gian (41.7%). Cùng kỳ 2025 đã đạt 131.1 triệu, gấp 3.7 lần hiện tại. Đội ngũ thiếu đào tạo sẽ ảnh hưởng chất lượng dịch vụ.",
    steps: [
      "Lập danh sách khóa đào tạo ưu tiên T7–T12: (a) kỹ năng phục vụ khách VIP & xử lý tình huống, (b) ngoại ngữ (tiếng Anh, Hàn, Trung) cho nhân viên CIP lounge & nhà hàng, (c) an toàn hàng không & sơ tán khẩn cấp (bắt buộc), (d) quản lý cấp trung: kỹ năng giám sát, lập kế hoạch, đánh giá nhân viên.",
      "Rà soát quy trình phê duyệt đề xuất đào tạo: xác định điểm nghẽn khiến 5T chỉ giải ngân được 2.7% — do thiếu đề xuất, chậm phê duyệt, hay thiếu nhà cung cấp đào tạo phù hợp?",
      "Đặt lịch đào tạo theo tháng: tháng 7 (khai giảng 2 lớp kỹ năng + 1 lớp ngoại ngữ), tháng 8–9 (an toàn hàng không + quản lý cấp trung), tháng 10–12 (đào tạo nâng cao + tổng kết). KPI: đạt ≥30% KH năm vào cuối Q3, ≥65% vào cuối Q4.",
      "Tuyển dụng: (a) ưu tiên vị trí nhân viên nhà hàng, lễ tân CIP Lounge — nơi đang thiếu người, (b) hợp tác với các trường du lịch/khách sạn tại Đà Nẵng (ĐH Duy Tân, CĐ Du lịch) để có nguồn thực tập sinh và ứng viên ổn định, (c) xây dựng chương trình Onboarding chuẩn hóa rút ngắn thời gian làm quen việc.",
    ],
    outcome: "Giải ngân đào tạo tuyển dụng đạt ≥65% KH năm, hoàn thành ít nhất 6 lớp đào tạo, tuyển đủ nhân sự cho vị trí khuyết.",
    sources: [
      "Đào tạo 5T: R24 (Đào tạo, tuyển dụng), C25=34.98 triệu / KH năm C24=1,304.31 triệu → 2.68%",
      "Diễn biến theo tháng: C26=8.54tr → C27=1.15tr → C28=1.15tr → C29=19.05tr → C30=5.09tr — T2-T3 gần như không phát sinh",
      "Cùng kỳ 5T2025: ~131.1 triệu (gấp 3.7 lần 2026) — số liệu từ báo cáo KQKD 2025 (file riêng), dòng \"Đào tạo, tuyển dụng\"",
      "Tổng chi phí lương 5T: R23, C25=17.02 tỷ / KH C24=41.87 tỷ (40.7%) — quỹ lương lớn nhưng chưa đầu tư tương xứng cho đào tạo",
      "KH năm toàn bộ chi phí HĐ: R30, C24=195.88 tỷ — ngân sách đào tạo 1.30 tỷ chỉ chiếm 0.67% tổng chi phí",
    ],
    color: "#7c3aed",
  },
  {
    quarter: "Liên tục – định kỳ hàng tháng",
    title: "Giám sát & kiểm soát chi phí văn phòng",
    detail: "Chi phí đảm bảo hoạt động văn phòng có xu hướng tăng dần đều và đột biến: T1: 66.8 triệu → T5: 230.8 triệu (gấp 3.45 lần). Dù lũy kế 5T mới đạt 18.6% KH năm, đà tăng này nếu tiếp diễn sẽ vượt kế hoạch 3.34 tỷ.",
    steps: [
      "Thiết lập dashboard theo dõi chi phí văn phòng theo tuần trên Google Sheets/Power BI, chia sẻ với Kế toán trưởng & Ban Giám đốc. Ngưỡng cảnh báo vàng: >120 triệu/tháng, đỏ: >160 triệu/tháng.",
      "Phân tích chi tiết các tiểu mục trong 'đảm bảo HĐVP': (a) văn phòng phẩm & in ấn, (b) điện – nước – internet – viễn thông, (c) bảo trì – sửa chữa thiết bị văn phòng, (d) chi phí tiếp khách – hội họp, (e) chi phí khác. Xác định mục nào tăng mạnh nhất để có biện pháp cụ thể.",
      "Yêu cầu bộ phận phụ trách giải trình bằng văn bản về mức tăng đột biến T5 (230.8 triệu) — đối chiếu với kế hoạch và dự toán được duyệt từ đầu năm.",
      "Áp dụng quy trình phê duyệt 2 cấp: (a) mọi khoản chi VP trên 30 triệu/lần cần Kế toán trưởng phê duyệt, (b) trên 80 triệu cần thêm Giám đốc phê duyệt, (c) tổng chi VP tháng vượt 150 triệu phải có giải trình trong báo cáo tài chính tháng.",
      "Định kỳ ngày 5 hàng tháng: báo cáo xu hướng chi phí văn phòng (biểu đồ 6 tháng gần nhất) lên Ban Giám đốc, kèm nhận xét và đề xuất điều chỉnh nếu có bất thường.",
    ],
    outcome: "Duy trì chi phí văn phòng ổn định ở mức ≤120 triệu/tháng, tổng cả năm không vượt 3.34 tỷ KH. Ngăn chặn lặp lại đột biến kiểu T5.",
    sources: [
      "VP 5T: R22 (Đảm bảo hoạt động văn phòng), C25=623.13 triệu / KH năm C24=3,342.56 triệu → 18.6%",
      "Xu hướng tháng: C26=66.81tr → C27=51.08tr → C28=93.16tr → C29=181.25tr → C30=230.83tr (tăng 3.45 lần từ T1→T5)",
      "Mức tăng từng bước: T1→T2 giảm nhẹ, T2→T3 +82.4%, T3→T4 +94.5%, T4→T5 +27.3% — T4-T5 là điểm đột biến",
      "Đối chiếu chi phí VP cùng kỳ 2025: cần kiểm tra từ báo cáo KQKD 2025 (file riêng) để xác định đây là xu hướng mới hay lặp lại",
      "Tổng chi phí hoạt động 5T: R30, C25=78.36 tỷ — chi phí VP 623 triệu chỉ chiếm 0.8% nhưng tốc độ tăng đáng báo động",
      "Các khoản mục liên quan: R21 (Đối ngoại, tiếp khách), R25 (Văn hóa) — cần đối chiếu nếu có sự chuyển dịch giữa các mục",
    ],
    color: "#0891b2",
  },
];

export const kpiDashboard = [
  { label: "Doanh thu / kế hoạch năm", value: 40.5, target: 41.7, unit: "%" },
  { label: "Chi phí / kế hoạch năm", value: 40.0, target: 41.7, unit: "%" },
  { label: "LN trước thuế / kế hoạch năm", value: 39.2, target: 41.7, unit: "%" },
  { label: "Biên lợi nhuận sau thuế", value: 39.1, target: 38.0, unit: "%" },
];

// Mở rộng KPI Dashboard — so sánh chi tiết tất cả chỉ tiêu chính
// Nguồn: sheet "KQKD 2026", C25 (TH 5T) vs C24 (KH năm), có đối chiếu Excel
export const kpiDetailTable = [
  { label: "Tổng doanh thu",       th5T: 158.70, unit: "tỷ", khPct: 40.5, target: 41.7, status: "on-track",  excelCell: "R13, C25 / C24" },
  { label: "Tổng chi phí",         th5T:  78.36, unit: "tỷ", khPct: 40.0, target: 41.7, status: "on-track",  excelCell: "R30, C25 / C24" },
  { label: "LN trước thuế",        th5T:  79.29, unit: "tỷ", khPct: 39.2, target: 41.7, status: "on-track",  excelCell: "R49, C25 / C24" },
  { label: "LN sau thuế",          th5T:  61.99, unit: "tỷ", khPct: 38.3, target: 41.7, status: "on-track",  excelCell: "R51, C25 / C24" },
  { label: "Doanh thu tài chính",  th5T:   1.64, unit: "tỷ", khPct: 13.7, target: 41.7, status: "critical", excelCell: "R39, C25 / C24" },
  { label: "Đào tạo, tuyển dụng",  th5T:   0.035, unit: "tỷ", khPct:  2.7, target: 41.7, status: "critical", excelCell: "R24, C25 / C24" },
  { label: "Chi phí văn phòng",    th5T:   0.623, unit: "tỷ", khPct: 18.6, target: 41.7, status: "watch",    excelCell: "R22, C25 / C24" },
];

// Cảnh báo KPI → liên kết đến lộ trình hành động
export const kpiAlerts = [
  {
    label: "Doanh thu tài chính chỉ đạt 13.7%",
    detail: "1.64/11.91 tỷ — lãi tiền gửi T5 còn 1.06 triệu đồng",
    action: "Tái cấu trúc danh mục đầu tư tài chính (Q3/2026)",
    phase: 1,
    status: "critical",
  },
  {
    label: "Đào tạo & tuyển dụng mới giải ngân 2.7%",
    detail: "35.0/1,304 triệu — T2-T3 gần như không phát sinh",
    action: "Đẩy nhanh giải ngân đào tạo (song song cả năm)",
    phase: 3,
    status: "critical",
  },
  {
    label: "Chi phí văn phòng T5 đột biến 230.8 triệu",
    detail: "Gấp 3.45 lần T1 (66.8 triệu), xu hướng tăng dần đều",
    action: "Giám sát & kiểm soát chi phí văn phòng (định kỳ hàng tháng)",
    phase: 4,
    status: "watch",
  },
];

export const meta = {
  company: "Công ty Cổ phần Dịch vụ Nhà ga Quốc tế Đà Nẵng",
  companyShort: "AHTS",
  period: "Tháng 1 - Tháng 5 năm 2026",
  department: "Phòng Kế hoạch Kinh doanh Tài chính Kế toán",
};

export const director = {
  name: "Lê Trí Sơn",
  title: "Giám đốc AHTS",
  subtitle: "Kiêm nhiệm Trưởng phòng Điều hành AHT",
  since: "01/07/2026",
  joined: 2019,
  experienceYears: 30,
  bio: "Với gần 30 năm kinh nghiệm trong lĩnh vực hàng không và quản lý khai thác, Anh Lê Trí Sơn đã có nhiều đóng góp quan trọng cho ngành hàng không cũng như cho sự phát triển của AHT kể từ khi gia nhập Công ty vào năm 2019.",
  vision:
    "Trên cương vị mới, Ban Điều hành tin tưởng Anh Lê Trí Sơn sẽ tiếp tục phát huy năng lực, kinh nghiệm và bản lĩnh lãnh đạo, cùng tập thể AHTS xây dựng và phát triển hệ sinh thái dịch vụ của AHT ngày càng chuyên nghiệp, hiệu quả; hoàn thành xuất sắc các mục tiêu được giao và đóng góp tích cực vào sự phát triển bền vững của Công ty.",
};
