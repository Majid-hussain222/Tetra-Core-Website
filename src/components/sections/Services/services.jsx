import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaCloud,
  FaBrain,
  FaMobileAlt,
  FaPalette,
  FaCogs,
} from "react-icons/fa";
import AnimatedSection from "../../common/animatedsection";
import Card from "../../common/card";
import { SERVICES } from "../../../utils/constants";

const iconMap = {
  code: FaCode,
  cloud: FaCloud,
  brain: FaBrain,
  mobile: FaMobileAlt,
  palette: FaPalette,
  settings: FaCogs,
};

const Services = () => {
  return (
    <section
      id="services"
      className="py-32 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <AnimatedSection className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Our <span className="text-orange-500">Services</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to accelerate your
            digital transformation.
          </p>
        </AnimatedSection>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon];

            return (
              <AnimatedSection key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Card className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-md hover:shadow-2xl transition-all duration-300">

                    {/* Icon */}
                    <div className="w-14 h-14 bg-orange-500/90 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                      <IconComponent className="text-2xl text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Learn More */}
                    <motion.div
                      whileHover={{ x: 8 }}
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="inline-flex items-center text-orange-500 font-semibold cursor-pointer"
                    >
                      Learn More
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </motion.div>

                  </Card>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Enterprise Platforms */}
        <div className="mt-32">
          <AnimatedSection className="text-center mb-16">
            <h3 className="text-4xl font-extrabold text-slate-900 mb-4">
              Enterprise Platforms We Deliver
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Beyond development, we build complete digital platforms that run
              mission-critical business operations across multiple industries.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Call Center & CRM Systems",
                desc: "Omnichannel support platforms with customer management, analytics, and workflow automation.",
              },
              {
                title: "Dispatch & Logistics",
                desc: "Real-time job dispatching, fleet tracking, route optimization, and operational dashboards.",
              },
              {
                title: "eCommerce & Marketplaces",
                desc: "High-performance stores, payment systems, subscriptions, and order management.",
              },
              {
                title: "Healthcare & Medical",
                desc: "Appointment booking, patient portals, medical records, and healthcare automation.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow hover:shadow-xl"
              >
                <h4 className="text-lg font-semibold text-slate-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
