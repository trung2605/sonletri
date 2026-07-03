import { motion } from "framer-motion";
import SlideShell from "../ui/SlideShell.jsx";
import { meta } from "../../data/report.js";
import photo from "../../assets/photos/airport-terminal-1.jpg";

const particles = Array.from({ length: 14 });

export default function Slide08ThankYou({ index, total }) {
  return (
    <SlideShell dark index={index} total={total} bgImage={photo} className="justify-center items-center text-center ">
      {particles.map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/40 pointer-events-none"
          style={{ left: `${(i * 71) % 100}%`, top: `${(i * 53) % 100}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <div className="flex-1 flex flex-col justify-center items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl font-bold px-4"
        >
          Trân trọng cảm ơn
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-brand-100 px-4 text-center"
        >
          {meta.department}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-1 text-brand-200/80"
        >
          {meta.company}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-10 h-px w-40 bg-white/30"
        />
      </div>
    </SlideShell>
  );
}
