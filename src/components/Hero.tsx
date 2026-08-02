"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { profile } from "@/data/content";
import { Magnetic } from "./Magnetic";
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.18 + i * 0.09, duration: 0.7, ease },
  }),
};

const nameWords = profile.name.split(" ");

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });
  const rotateX = useTransform(sy, [-40, 40], [6, -6]);
  const rotateY = useTransform(sx, [-40, 40], [-7, 7]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgba(255,255,255,0.22), transparent 55%)`;

  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIndex((i) => (i + 1) % profile.roles.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  let letterIndex = 0;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.copy}>
        <motion.p
          className={styles.hello}
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Hello! I am
        </motion.p>

        <motion.h1
          className={styles.name}
          aria-label={profile.name}
          initial="hidden"
          animate="show"
        >
          {nameWords.map((word, wi) => (
            <span key={`${word}-${wi}`} className={styles.word}>
              {word.split("").map((char) => {
                const i = letterIndex++;
                return (
                  <motion.span
                    key={`${char}-${i}`}
                    className={styles.letter}
                    variants={{
                      hidden: { opacity: 0, y: 36, rotateX: 40 },
                      show: {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          delay: 0.25 + i * 0.035,
                          duration: 0.55,
                          ease,
                        },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
              {wi < nameWords.length - 1 ? (
                <span className={styles.space}>&nbsp;</span>
              ) : null}
            </span>
          ))}
        </motion.h1>

        <motion.div
          className={styles.roles}
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className={styles.roleStatic}>I build as a</span>
          <span className={styles.roleStage}>
            <AnimatePresence mode="wait">
              <motion.span
                key={profile.roles[roleIndex]}
                className={styles.role}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.4, ease }}
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          className={styles.bio}
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {profile.headline}
        </motion.p>

        <motion.div
          className={styles.actions}
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Magnetic strength={0.28}>
            <a
              className={styles.primary}
              href={profile.resumePath}
              target="_blank"
              rel="noreferrer"
              data-magnetic
            >
              Get my resume
            </a>
          </Magnetic>
          <Magnetic strength={0.28}>
            <a className={styles.secondary} href="#projects" data-magnetic>
              See projects
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className={styles.portrait}
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.95, ease }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className={styles.orb} aria-hidden />
        <div className={styles.ring} aria-hidden />
        <div className={styles.frame}>
          <Image
            src={profile.photo}
            alt={`${profile.name} portrait`}
            width={720}
            height={960}
            priority
            className={styles.image}
          />
          <motion.div className={styles.glare} style={{ background: glare }} />
        </div>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.55 }}
          whileHover={{ y: -4, scale: 1.03 }}
        >
          <span>PEC Chandigarh</span>
          <strong>B.E. · 2027</strong>
        </motion.div>
      </motion.div>

      <a href="#about" className={styles.scroll} aria-label="Scroll to about">
        <span />
      </a>
    </section>
  );
}
