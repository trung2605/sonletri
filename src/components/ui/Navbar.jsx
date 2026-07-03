import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { meta } from "../../data/report.js";
import logo from "../../assets/photos/logo.webp";

const LINKS = [
  { to: "/", label: "Trang chủ", end: true },
  { to: "/reports", label: "Báo cáo" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "Về tôi" },
];

function linkClass({ isActive }) {
  return `relative py-1 text-sm transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-brand-600 after:transition-all ${
    isActive
      ? "text-brand-700 font-semibold after:w-full"
      : "text-slate-500 hover:text-brand-600 after:w-0 hover:after:w-full"
  }`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-brand-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="AHTS" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-display font-semibold text-brand-900">{meta.companyShort} Portal</span>
        </Link>

        <nav className="hidden md:flex gap-8">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-brand-700 hover:bg-brand-50 transition"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-brand-100 bg-white"
          >
            <div className="px-6 py-3 flex flex-col gap-1">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
