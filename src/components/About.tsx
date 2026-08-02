"use client";

import { motion } from "framer-motion";
import { about, education, experience } from "@/data/content";
import { ScrambleText } from "./ScrambleText";
import { Counter } from "./Counter";
import styles from "./About.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  return (
    <section className={`section ${styles.about}`} id="about">
      <div className={styles.titleRow}>
        <ScrambleText text="About My" className="section-title" />
      </div>

      <div className={styles.stats}>
        <Counter value={3} suffix="+" label="Shipped projects" className={styles.stat} />
        <Counter value={1000} suffix="+" label="Telemetry records" className={styles.stat} />
        <Counter value={4} label="Years at PEC" className={styles.stat} />
      </div>

      <div className={styles.grid}>
        {about.map((item, i) => (
          <motion.article
            key={item.title}
            className={styles.card}
            initial={{ opacity: 0, x: -48, rotate: -1 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: i * 0.12, duration: 0.6, ease }}
            whileHover={{ y: -8, scale: 1.015 }}
          >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </motion.article>
        ))}
      </div>

      <div className={styles.meta}>
        <motion.div
          className={styles.metaCard}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          whileHover={{ y: -4 }}
        >
          <p className={styles.label}>Education</p>
          <h3>{education.school}</h3>
          <p>
            {education.degree} · {education.dates}
          </p>
          <p className={styles.notes}>{education.notes}</p>
        </motion.div>
        <motion.div
          className={styles.metaCard}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.55, ease }}
          whileHover={{ y: -4 }}
        >
          <p className={styles.label}>Experience</p>
          <h3>
            {experience.role} — {experience.company}
          </h3>
          <p>{experience.dates}</p>
          <ul>
            {experience.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
