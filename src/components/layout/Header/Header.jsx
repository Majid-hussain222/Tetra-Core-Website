import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import Logo from "../../common/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 
        bg-gradient-to-r from-[#0a1833] to-[#102b5c]
        ${isScrolled ? "shadow-xl backdrop-blur-md" : "shadow-none"}
      `}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[80px] flex items-center">
        <div className="flex items-center justify-between w-full">

          {/* Logo */}
          <Logo />

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? "text-orange-500"
                        : "text-white/90 hover:text-orange-500"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white text-3xl"
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0a1833] border-t border-white/10">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="block px-6 py-4 text-white/90 hover:text-orange-500 border-b border-white/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Header;
