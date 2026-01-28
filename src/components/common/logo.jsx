import { motion } from "framer-motion";
import logo from "/src/assets/images/logo.png";

export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      
      {/* Logo Image */}
      <motion.img
        src={logo}
        alt="Tetra Core Logo"
        className="h-10 md:h-12 w-auto object-contain"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        draggable="false"
      />

      {/* Brand Text */}
      <motion.div
        initial={{ x: -12, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        className="text-2xl md:text-3xl font-bold tracking-wide text-white leading-none"
      >
        <span className="text-orange-500">Tetra</span> Core
      </motion.div>

    </div>
  );
}
