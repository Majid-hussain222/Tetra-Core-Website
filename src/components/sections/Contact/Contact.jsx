import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AnimatedSection from "../../common/animatedsection";
import Button from "../../common/button";
import { COMPANY_INFO } from "../../../utils/constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({
        loading: false,
        success: "Thank you. Our team will contact you shortly.",
        error: null,
      });

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: null,
        error: "Something went wrong. Please try again later.",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-[#0a1833] to-[#102b5c] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            Let’s discuss how Tetra Core can help you build secure, scalable,
            and high-performance digital solutions.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Contact Info */}
          <AnimatedSection>
            <div className="space-y-10">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-slate-300">{COMPANY_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-slate-300">{COMPANY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Offices</h4>
                  <p className="text-slate-300">Edinburgh, United Kingdom</p>
                  <p className="text-slate-300">Lahore, Pakistan</p>
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 space-y-6"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-lg bg-[#0a1833] border border-white/10 text-white focus:outline-none focus:border-orange-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-lg bg-[#0a1833] border border-white/10 text-white focus:outline-none focus:border-orange-500"
              />

              <input
                type="text"
                name="company"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-lg bg-[#0a1833] border border-white/10 text-white focus:outline-none focus:border-orange-500"
              />

              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 rounded-lg bg-[#0a1833] border border-white/10 text-white focus:outline-none focus:border-orange-500 resize-none"
              />

              <Button type="submit" className="w-full" disabled={status.loading}>
                {status.loading ? "Sending..." : "Send Message"}
              </Button>

              {status.success && (
                <p className="text-green-400 text-sm">{status.success}</p>
              )}
              {status.error && (
                <p className="text-red-400 text-sm">{status.error}</p>
              )}
            </motion.form>
          </AnimatedSection>

        </div>
      </div>
    </section>
  );
};

export default Contact;
