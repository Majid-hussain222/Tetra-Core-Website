import React, { useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Feature icons - using lucide-react or your icon library
const FeatureIcon = ({ children, className = "" }) => (
  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// Constants
const FEATURES = [
  {
    id: "enterprise",
    icon: "🏢",
    title: "Enterprise Systems",
    description: "Scalable, secure solutions built for complex business operations and workflows.",
    highlights: ["Multi-tenant architecture", "Advanced security", "Cloud-native"],
  },
  {
    id: "dashboards",
    icon: "📊",
    title: "Custom Dashboards",
    description: "Real-time analytics and visualization platforms tailored to your KPIs.",
    highlights: ["Real-time data", "Custom metrics", "Interactive reports"],
  },
  {
    id: "saas",
    icon: "☁️",
    title: "SaaS Platforms",
    description: "End-to-end SaaS development from MVP to production-ready applications.",
    highlights: ["Subscription billing", "API-first design", "Multi-platform"],
  },
  {
    id: "automation",
    icon: "⚡",
    title: "Automation Tools",
    description: "Intelligent automation to streamline operations and reduce manual effort.",
    highlights: ["Workflow automation", "Integration APIs", "AI-powered"],
  },
  {
    id: "legacy",
    icon: "🔄",
    title: "Legacy Modernization",
    description: "Transform outdated systems into modern, maintainable applications.",
    highlights: ["Zero downtime", "Data migration", "Gradual transition"],
  },
  {
    id: "integration",
    icon: "🔗",
    title: "System Integration",
    description: "Seamlessly connect disparate systems and third-party services.",
    highlights: ["API development", "Middleware solutions", "Real-time sync"],
  },
];

const TECH_STACK = [
  { category: "Frontend", techs: ["React", "Vue", "Next.js", "TypeScript"] },
  { category: "Backend", techs: ["Node.js", "Python", "Java", ".NET"] },
  { category: "Cloud", techs: ["AWS", "Azure", "GCP", "Docker"] },
  { category: "Database", techs: ["PostgreSQL", "MongoDB", "Redis", "MySQL"] },
];

const BENEFITS = [
  { stat: "99.9%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
  { stat: "40%", label: "Cost Reduction", sublabel: "Through automation" },
  { stat: "3x", label: "Faster Delivery", sublabel: "Agile methodology" },
  { stat: "24/7", label: "Support", sublabel: "Dedicated team" },
];

// Feature Card Component
const FeatureCard = React.memo(({ feature, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10"
  >
    {/* Hover glow effect */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    <div className="relative">
      <FeatureIcon className="mb-6 group-hover:scale-110 transition-transform duration-300">
        <span className="text-3xl" role="img" aria-label={feature.title}>
          {feature.icon}
        </span>
      </FeatureIcon>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
        {feature.title}
      </h3>

      <p className="text-slate-400 leading-relaxed mb-6">
        {feature.description}
      </p>

      <ul className="space-y-2">
        {feature.highlights.map((highlight, idx) => (
          <li key={idx} className="flex items-center text-sm text-slate-500 group-hover:text-slate-400 transition-colors">
            <svg className="w-4 h-4 mr-2 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {highlight}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));

FeatureCard.displayName = "FeatureCard";

// Stat Card Component
const StatCard = React.memo(({ benefit, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center p-6"
  >
    <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
      {benefit.stat}
    </div>
    <div className="text-lg font-semibold text-white mb-1">
      {benefit.label}
    </div>
    <div className="text-sm text-slate-500">
      {benefit.sublabel}
    </div>
  </motion.div>
));

StatCard.displayName = "StatCard";

// Main Component
const SoftwareService = () => {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const handleGetQuote = useCallback(() => {
    navigate("/#contact");
    // Smooth scroll after navigation
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [navigate]);

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
      },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Custom Software Development
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Build Software That{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Scales With You
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              Enterprise-grade custom systems, dashboards, SaaS platforms, and automation tools 
              engineered for performance, security, and growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Get a Free Quote
              </motion.button>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-slate-700 text-white font-semibold hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
              >
                Explore Features
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {BENEFITS.map((benefit, index) => (
              <StatCard
                key={benefit.label}
                benefit={benefit}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Comprehensive Software Solutions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From concept to deployment, we deliver tailored software that drives business value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-lg text-slate-400">
              We use cutting-edge technologies to build robust, scalable solutions
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECH_STACK.map((stack, index) => (
              <motion.div
                key={stack.category}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50"
              >
                <h3 className="text-lg font-bold text-orange-400 mb-4">
                  {stack.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and create a custom solution 
            that exceeds your expectations.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Start Your Project Today
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default SoftwareService;