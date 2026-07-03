import { motion } from "framer-motion";
import SlideShell from "../ui/SlideShell.jsx";
import { meta } from "../../data/report.js";
import cover from "../../assets/photos/airport-terminal-1.jpg";
import logo from "../../assets/photos/logo.jpg";

export default function Slide01Cover({ index, total }) {
  return (
    <SlideShell index={index} total={total} bgImage={cover} className="justify-center items-center text-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-4 px-5 py-2 rounded-full bg-white/10 border border-white/20"
        >
          <img src={logo} alt="AHTS logo" className="h-full w-16 border border-white/20 rounded-full" />
          <span className="text-brand-100 text-sm tracking-widest uppercase">{meta.companyShort} &middot; Báo cáo tài chính</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          Báo cáo kết quả kinh doanh
          <br />
          <motion.span
            initial={{ backgroundPosition: "200% 0" }}
            animate={{ backgroundPosition: "0% 0" }}
            transition={{ duration: 1.6, delay: 0.4 }}
            className="bg-linear-to-r from-brand-200 via-white to-brand-200 bg-clip-text text-transparent bg-[length:200%_auto]"
          >
            5 tháng đầu năm 2026
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-lg md:text-xl text-brand-100 max-w-2xl"
        >
          {meta.company}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-2 text-sm md:text-base text-brand-200/80"
        >
          Kỳ báo cáo: {meta.period}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { delay: 0.9, duration: 0.6 }, y: { delay: 1.2, duration: 1.8, repeat: Infinity } }}
          className="mt-16 flex flex-col items-center gap-2 text-brand-200/70 text-xs tracking-widest uppercase"
        >
          Cuộn xuống
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v14m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>
    </SlideShell>
  );
}
