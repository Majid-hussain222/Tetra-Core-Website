import React, { useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../../common/button";

/* ================== CONFIG ================== */
const ANIMATION = {
  blobA: { duration: 32, rotate: [0, 180, 360], scale: [1, 1.25, 1] },
  blobB: { duration: 26, rotate: [360, 180, 0], scale: [1.2, 1, 1.2] },
  scroll: { duration: 2.5, y: [0, 14, 0] },
};

const STATS = [
  { value: "50+", label: "Projects Delivered", aria: "Over fifty projects delivered" },
  { value: "98%", label: "Client Satisfaction", aria: "Ninety eight percent client satisfaction" },
  { value: "24/7", label: "Global Support", aria: "Support available twenty four seven" },
];

/* ================== HELPERS ================== */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  el && el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ================== STAT CARD ================== */
const Stat = React.memo(({ stat, i, reduced }) => (
  <motion.div
    initial={reduced ? {} : { opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.8 + i * 0.1, ease: "easeOut" }}
    className="text-center"
    aria-label={stat.aria}
    role="group"
  >
    <p className="text-4xl sm:text-5xl font-extrabold text-orange-400 drop-shadow-md tabular-nums">
      {stat.value}
    </p>
    <p className="mt-3 text-slate-400 text-xs sm:text-sm tracking-widest uppercase">
      {stat.label}
    </p>
  </motion.div>
));

Stat.displayName = "Stat";

/* ================== HERO ================== */
const Hero = () => {
  const reduced = useReducedMotion();

  const goContact = useCallback(() => scrollTo("contact"), []);
  const goServices = useCallback(() => scrollTo("services"), []);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 60 },
      show: { opacity: 1, y: 0 },
    }),
    []
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
      bg-gradient-to-br from-[#020617] via-[#081b3a] to-[#0f2a5f]"
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:44px_44px] opacity-20 pointer-events-none" />

      {/* Brand glows */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-orange-500/15 rounded-full blur-[160px]" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-120px] left-1/3 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[160px]" />

      {/* Floating blobs */}
      <motion.div
        animate={reduced ? {} : ANIMATION.blobA}
        transition={reduced ? {} : { duration: ANIMATION.blobA.duration, repeat: Infinity, ease: "linear" }}
        className="absolute top-24 left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={reduced ? {} : ANIMATION.blobB}
        transition={reduced ? {} : { duration: ANIMATION.blobB.duration, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-24 right-24 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"
      />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white"
        >
          Transforming Ideas Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
            Digital Excellence
          </span>
        </motion.h1>

        <motion.p
          initial={reduced ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          className="mt-8 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
        >
          Enterprise-grade software solutions engineered for performance,
          security, and global scale.
        </motion.p>

        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Button onClick={goContact}>Get Started</Button>
          <Button variant="outline" onClick={goServices}>Our Services</Button>
        </motion.div>

        {/* STATS */}
        <div className="mt-24 grid grid-cols-3 gap-10 max-w-3xl mx-auto">
          {STATS.map((s, i) => (
            <Stat key={s.label} stat={s} i={i} reduced={reduced} />
          ))}
        </div>
      </div>

      {/* Scroll */}
      <motion.div
        animate={reduced ? {} : { y: ANIMATION.scroll.y }}
        transition={reduced ? {} : { duration: ANIMATION.scroll.duration, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-12 border border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
