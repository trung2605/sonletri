import { Link } from "react-router-dom";
import { ChevronRight, House } from "lucide-react";

/**
 * Breadcrumb navigation.
 *
 * items: array of { label, to? } — last item is current page (no link).
 * Example: [{ label: "Trang chủ", to: "/" }, { label: "Báo cáo" }]
 */
export default function Breadcrumb({ items = [] }) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 pt-5 pb-0">
      <ol className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.label + i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} className="text-slate-300 shrink-0" />}
              {isLast ? (
                <span className="text-brand-700 font-medium truncate max-w-40 sm:max-w-60">
                  {item.label}
                </span>
              ) : item.to ? (
                <Link
                  to={item.to}
                  className="hover:text-brand-600 transition-colors truncate max-w-32 sm:max-w-48 flex items-center gap-1"
                >
                  {i === 0 && <House size={12} className="shrink-0" />}
                  {item.label}
                </Link>
              ) : (
                <span className="truncate max-w-40">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
