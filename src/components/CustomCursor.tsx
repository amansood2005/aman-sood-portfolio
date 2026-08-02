"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./CustomCursor.module.css";

type Trail = { id: number; x: number; y: number };

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trail, setTrail] = useState<Trail[]>([]);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");
    setVisible(true);
    let last = 0;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      if (now - last > 28) {
        last = now;
        const id = now;
        setTrail((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
        window.setTimeout(() => {
          setTrail((prev) => prev.filter((t) => t.id !== id));
        }, 320);
      }
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest("a, button, [data-magnetic]");
      setHovering(Boolean(interactive));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!visible) return null;

  return (
    <>
      {trail.map((t, i) => (
        <span
          key={t.id}
          className={styles.trail}
          style={{
            left: t.x,
            top: t.y,
            opacity: (i + 1) / (trail.length + 2),
            transform: `translate(-50%, -50%) scale(${0.35 + i * 0.05})`,
          }}
          aria-hidden
        />
      ))}
      <motion.div
        className={`${styles.cursor} ${hovering ? styles.hover : ""}`}
        style={{ translateX: sx, translateY: sy }}
        aria-hidden
      />
    </>
  );
}
