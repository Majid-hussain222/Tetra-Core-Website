import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaMapMarkerAlt } from 'react-icons/fa';
import { COMPANY_INFO } from '../../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/src/assets/images/logo.png"
                alt="Tetra Core"
                className="h-10 w-auto object-contain"
                draggable="false"
              />
              <div className="text-2xl font-bold tracking-wide">
                <span className="text-orange-500">Tetra</span>
                <span className="text-white"> Core</span>
              </div>
            </div>

            <p className="text-slate-400 mb-4">
              {COMPANY_INFO.tagline}
            </p>

            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>

              <a
                href={COMPANY_INFO.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>

              <a
                href={COMPANY_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'Portfolio', 'About', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="hover:text-orange-500 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Offices */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>

            <ul className="space-y-2 text-sm mb-4">
              <li>{COMPANY_INFO.email}</li>
              <li>{COMPANY_INFO.phone}</li>
            </ul>

            <h4 className="text-white font-semibold mb-2">Offices</h4>

            <p className="flex items-start gap-2 text-sm mb-2">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span><strong>UK:</strong> Edinburgh</span>
            </p>

            <p className="flex items-start gap-2 text-sm">
              <FaMapMarkerAlt className="text-orange-500 mt-1" />
              <span><strong>Pakistan:</strong> Lahore</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
