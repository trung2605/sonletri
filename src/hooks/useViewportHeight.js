import { useEffect, useState } from "react";

export default function useViewportHeight() {
  const [height, setHeight] = useState(() =>
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return height;
}
