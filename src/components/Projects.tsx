"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { projects } from "@/data/content";
import { ScrambleText } from "./ScrambleText";
import { Magnetic } from "./Magnetic";
import styles from "./Projects.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20 });
  const sy = useSpring(my, { stiffness: 150, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(320px circle at ${sx}px ${sy}px, var(--accent-soft), transparent 55%)`;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      ref={ref}
      className={`${styles.item} ${index % 2 ? styles.flip : ""}`}
      initial={{
        opacity: 0,
        y: 72,
        clipPath: "inset(8% 6% 8% 6% round 28px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0% round 0px)",
      }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.85, ease }}
      onMouseMove={onMove}
    >
      <motion.div
        className={`${styles.visual} ${styles[project.accent]}`}
        whileHover={{ scale: 1.03, rotate: index % 2 ? -0.6 : 0.6 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <motion.div className={styles.spotlight} style={{ background: glow }} />
        <div className={styles.shimmer} aria-hidden />
        <div className={styles.visualInner}>
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <p className={styles.visualTitle}>{project.name}</p>
          <p className={styles.visualSub}>{project.subtitle}</p>
        </div>
      </motion.div>

      <div className={styles.body}>
        <h3>{project.name}</h3>
        <div className={styles.tech}>
          <span className={styles.made}>Made with:</span>
          {project.tech.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i, duration: 0.35 }}
              whileHover={{ y: -3, color: "var(--accent)" }}
            >
              {t}
            </motion.span>
          ))}
        </div>
        <p>{project.description}</p>
        <div className={styles.actions}>
          {project.live && (
            <Magnetic strength={0.35}>
              <a href={project.live} target="_blank" rel="noreferrer" data-magnetic>
                Live
              </a>
            </Magnetic>
          )}
          {project.code && (
            <Magnetic strength={0.35}>
              <a href={project.code} target="_blank" rel="noreferrer" data-magnetic>
                Code
              </a>
            </Magnetic>
          )}
          {!project.live && !project.code && (
            <span className={styles.soon}>Case study soon</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section className={`section ${styles.projects}`} id="projects">
      <ScrambleText text="Projects" className="section-title" />
      <div className={styles.list}>
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
