import React from "react";
import { motion } from "framer-motion";
import Button from "../../common/button";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1833] via-[#102b5c] to-[#0a1833] overflow-hidden"
    >
      {/* Soft glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),transparent_40%)]"></div>

      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-24 left-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-24 right-24 w-[28rem] h-[28rem] bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-white"
        >
          Transforming Ideas Into <br />
          <span className="text-orange-500">Digital Excellence</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-8 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto"
        >
          Enterprise-grade software solutions powered by innovation, built for
          the future.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
        >
          <Button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
            Get Started
          </Button>

          <Button
            variant="outline"
            onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
          >
            Our Services
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 grid grid-cols-3 gap-10 max-w-3xl mx-auto"
        >
          {[
            { number: "50+", label: "Projects Delivered" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-extrabold text-orange-500">
                {stat.number}
              </div>
              <div className="mt-3 text-slate-400 text-sm tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-7 h-12 border border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
