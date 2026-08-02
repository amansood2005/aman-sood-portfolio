"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import { ScrambleText } from "./ScrambleText";
import styles from "./Skills.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

export function Skills() {
  return (
    <section className={`section ${styles.skills}`} id="skills">
      <ScrambleText text="Skills" className="section-title" />
      <div className={styles.groups}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            className={styles.group}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: gi * 0.08, duration: 0.5, ease }}
          >
            <h3>{group.title}</h3>
            <div className={styles.tags}>
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  className={styles.tag}
                  initial={{ opacity: 0, scale: 0.85, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    delay: gi * 0.04 + si * 0.025,
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
