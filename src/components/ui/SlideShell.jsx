import { motion } from "framer-motion";

export default function SlideShell({
  children,
  dark = false,
  className = "",
  index,
  total,
  bgImage,
  bgOverlay = "brand",
}) {
  return (
    <section
      className={`relative w-full min-h-screen snap-start flex flex-col overflow-hidden ${
        dark && !bgImage
          ? "bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700 text-white"
          : "bg-white text-slate-900"
      } ${className}`}
    >
      {bgImage && (
        <>
          <motion.img
            src={bgImage}
            alt=""
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 ${
              bgOverlay === "brand"
                ? "bg-gradient-to-br from-brand-950/90 via-brand-900/85 to-brand-700/70"
                : "bg-white/85"
            }`}
          />
        </>
      )}

      {/* decor blobs */}
      <div
        className={`pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl ${
          dark || bgImage ? "bg-brand-400/20" : "bg-brand-200/60"
        }`}
      />
      <div
        className={`pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full blur-3xl ${
          dark || bgImage ? "bg-brand-500/10" : "bg-brand-100/70"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`relative z-10 flex-1 flex flex-col px-8 md:px-20 py-14 ${
          dark || bgImage ? "text-white" : ""
        }`}
      >
        {children}
      </motion.div>
    </section>
  );
}
