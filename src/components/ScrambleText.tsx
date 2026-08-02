"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

type Props = {
  text: string;
  className?: string;
};

export function ScrambleText({ text, className }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = Math.max(18, text.length * 2);
    const id = window.setInterval(() => {
      frame += 1;
      const progress = frame / total;
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / text.length < progress) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join(""),
      );
      if (frame >= total) {
        setDisplay(text);
        window.clearInterval(id);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <h2 ref={ref} className={className}>
      {display}
    </h2>
  );
}
