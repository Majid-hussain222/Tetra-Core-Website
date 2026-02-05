import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { COMPANY_INFO } from "../../../utils/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <img
                src="/src/assets/images/logo.png"
                alt="Tetra Core Logo"
                className="w-16 h-16 object-contain drop-shadow-lg select-none -mt-1"
                draggable="false"
              />
              <h2 className="text-[26px] font-bold tracking-wide leading-tight">
                <span className="text-orange-500">Tetra</span>
                <span className="text-white"> Core</span>
              </h2>
            </div>

            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              {COMPANY_INFO.tagline}
            </p>

            <div className="flex gap-4">
              {[
                { icon: FaLinkedin, link: COMPANY_INFO.social.linkedin },
                { icon: FaTwitter, link: COMPANY_INFO.social.twitter },
                { icon: FaGithub, link: COMPANY_INFO.social.github },
              ].map(({ icon: Icon, link }, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-lg bg-slate-800/70 backdrop-blur flex items-center justify-center hover:bg-orange-500 transition-all duration-300"
                >
                  <Icon className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {["Home", "Services", "Portfolio", "About", "Careers", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="hover:text-orange-500 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-sm mb-4 text-slate-400">
              <li>{COMPANY_INFO.email}</li>
              <li>{COMPANY_INFO.phone}</li>
            </ul>

            <h4 className="text-white font-medium mb-2">Offices</h4>

            <p className="flex items-start gap-2 text-sm text-slate-400 mb-2">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span>
                <strong className="text-white">UK:</strong> Edinburgh
              </span>
            </p>

            <p className="flex items-start gap-2 text-sm text-slate-400">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span>
                <strong className="text-white">Pakistan:</strong> Lahore
              </span>
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {currentYear} {COMPANY_INFO.name}. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
