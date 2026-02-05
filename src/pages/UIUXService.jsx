import React, { useCallback, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Feature icons component
const FeatureIcon = ({ children, className = "" }) => (
  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// Constants
const DESIGN_SERVICES = [
  {
    id: "research",
    icon: "🔍",
    title: "User Research & Strategy",
    description: "Deep dive into user behavior, needs, and pain points to inform design decisions.",
    features: [
      "User interviews & surveys",
      "Competitive analysis",
      "User personas & journey maps",
      "Usability testing",
    ],
    deliverables: ["Research report", "User personas", "Journey maps"],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "wireframing",
    icon: "📐",
    title: "Wireframing & Information Architecture",
    description: "Structure content and functionality with low-fidelity wireframes and sitemaps.",
    features: [
      "Low & high-fidelity wireframes",
      "Information architecture",
      "User flow diagrams",
      "Content strategy",
    ],
    deliverables: ["Wireframe sets", "Site maps", "Flow diagrams"],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "prototyping",
    icon: "⚡",
    title: "Interactive Prototyping",
    description: "Bring designs to life with clickable, high-fidelity prototypes for testing and validation.",
    features: [
      "Interactive prototypes",
      "Micro-interactions",
      "Animation design",
      "A/B testing variants",
    ],
    deliverables: ["Figma prototypes", "Interaction specs", "Animation guides"],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "ui-design",
    icon: "🎨",
    title: "Visual UI Design",
    description: "Beautiful, on-brand interfaces that delight users and drive engagement.",
    features: [
      "Custom UI design",
      "Responsive layouts",
      "Dark mode design",
      "Accessibility (WCAG 2.1)",
    ],
    deliverables: ["UI screens", "Design assets", "Style guide"],
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/30",
  },
  {
    id: "design-system",
    icon: "🧩",
    title: "Design Systems",
    description: "Scalable component libraries and design tokens for consistent brand experiences.",
    features: [
      "Component library",
      "Design tokens",
      "Pattern library",
      "Documentation",
    ],
    deliverables: ["Component library", "Design guidelines", "Token library"],
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "branding",
    icon: "✨",
    title: "Branding & Identity",
    description: "Create memorable brand identities with logos, color systems, and typography.",
    features: [
      "Logo design",
      "Brand guidelines",
      "Color & typography",
      "Marketing materials",
    ],
    deliverables: ["Brand book", "Logo suite", "Asset library"],
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/30",
  },
];

const DESIGN_PRINCIPLES = [
  {
    principle: "User-Centered",
    icon: "👤",
    description: "Every decision is backed by user research and testing",
  },
  {
    principle: "Accessible",
    icon: "♿",
    description: "WCAG 2.1 AA compliant designs for inclusive experiences",
  },
  {
    principle: "Data-Driven",
    icon: "📊",
    description: "Analytics and metrics guide design iterations",
  },
  {
    principle: "Scalable",
    icon: "📈",
    description: "Design systems that grow with your product",
  },
];

const DESIGN_TOOLS = [
  { name: "Figma", icon: "🎨", category: "Design" },
  { name: "Adobe XD", icon: "🔷", category: "Design" },
  { name: "Sketch", icon: "💎", category: "Design" },
  { name: "Framer", icon: "⚡", category: "Prototyping" },
  { name: "Principle", icon: "🎬", category: "Animation" },
  { name: "Maze", icon: "🧪", category: "Testing" },
  { name: "Hotjar", icon: "🔥", category: "Analytics" },
  { name: "Optimal Workshop", icon: "🗺️", category: "Research" },
];

const EXPERTISE_AREAS = [
  {
    area: "Web Applications",
    icon: "💻",
    description: "SaaS platforms, dashboards, admin panels",
    examples: ["Analytics dashboards", "CRM systems", "Project management tools"],
  },
  {
    area: "Mobile Apps",
    icon: "📱",
    description: "iOS & Android native and cross-platform",
    examples: ["E-commerce apps", "Social platforms", "Productivity tools"],
  },
  {
    area: "E-Commerce",
    icon: "🛒",
    description: "Shopping experiences that convert",
    examples: ["Product catalogs", "Checkout flows", "Personalization"],
  },
  {
    area: "Enterprise Software",
    icon: "🏢",
    description: "Complex workflows simplified",
    examples: ["ERP systems", "Workflow automation", "Data visualization"],
  },
];

const UX_PROCESS = [
  {
    phase: "01",
    name: "Discover",
    activities: ["User research", "Stakeholder interviews", "Competitive analysis", "Define goals"],
    duration: "1-2 weeks",
  },
  {
    phase: "02",
    name: "Define",
    activities: ["User personas", "Journey mapping", "Problem statements", "Feature prioritization"],
    duration: "1 week",
  },
  {
    phase: "03",
    name: "Design",
    activities: ["Wireframes", "Visual design", "Prototyping", "Design system"],
    duration: "3-4 weeks",
  },
  {
    phase: "04",
    name: "Deliver",
    activities: ["Usability testing", "Developer handoff", "Documentation", "Support"],
    duration: "1-2 weeks",
  },
];

const BENEFITS = [
  { stat: "40%", label: "Higher Conversion", sublabel: "With optimized UX" },
  { stat: "2x", label: "User Engagement", sublabel: "Through better design" },
  { stat: "60%", label: "Less Dev Time", sublabel: "With design systems" },
  { stat: "99%", label: "Client Satisfaction", sublabel: "Iterative process" },
];

const CASE_STUDIES = [
  {
    title: "E-Commerce Platform Redesign",
    client: "RetailCo",
    challenge: "Poor conversion rates and high cart abandonment",
    solution: "Simplified checkout flow and improved product discovery",
    results: ["35% increase in conversions", "50% reduction in cart abandonment", "4.8/5 user rating"],
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "SaaS Dashboard Overhaul",
    client: "DataTech",
    challenge: "Complex interface causing user confusion",
    solution: "Redesigned information architecture with intuitive navigation",
    results: ["70% reduction in support tickets", "3x faster task completion", "92% user satisfaction"],
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    title: "Mobile Banking App",
    client: "FinanceFirst",
    challenge: "Low adoption rates among younger users",
    solution: "Modern UI with gamification and personalization",
    results: ["200% increase in new users", "80% daily active users", "App Store featured"],
    color: "from-green-500/10 to-green-600/5",
  },
];

// Service Card Component
const ServiceCard = React.memo(({ service, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} hover:shadow-2xl transition-all duration-300`}
  >
    <div className="relative">
      <FeatureIcon className="mb-6 group-hover:scale-110 transition-transform duration-300">
        <span className="text-4xl" role="img" aria-label={service.title}>
          {service.icon}
        </span>
      </FeatureIcon>

      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
        {service.title}
      </h3>

      <p className="text-slate-400 leading-relaxed mb-6">
        {service.description}
      </p>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          What We Do
        </h4>
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-sm text-slate-400">
              <svg className="w-5 h-5 mr-3 mt-0.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Deliverables
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.deliverables.map((deliverable) => (
            <span
              key={deliverable}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {deliverable}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

// Case Study Card
const CaseStudyCard = React.memo(({ caseStudy, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`p-8 rounded-2xl bg-gradient-to-br ${caseStudy.color} border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300`}
  >
    <div className="text-sm text-orange-400 font-semibold uppercase tracking-wider mb-2">
      {caseStudy.client}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">
      {caseStudy.title}
    </h3>
    
    <div className="space-y-4 mb-6">
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Challenge</div>
        <p className="text-slate-400">{caseStudy.challenge}</p>
      </div>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Solution</div>
        <p className="text-slate-400">{caseStudy.solution}</p>
      </div>
    </div>

    <div>
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Results</div>
      <ul className="space-y-2">
        {caseStudy.results.map((result, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-300">
            <svg className="w-5 h-5 mr-2 mt-0.5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {result}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));

CaseStudyCard.displayName = "CaseStudyCard";

// Stat Card
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
const UIUXService = () => {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const handleGetQuote = useCallback(() => {
    navigate("/#contact");
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 45, 0],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.3, 1, 1.3],
              rotate: [45, 0, 45],
              opacity: [0.5, 0.3, 0.5]
            }}
            transition={{ duration: 18, repeat: Infinity }}
            className="absolute bottom-20 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              UI/UX Design Services
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Design Experiences That{" "}
              <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-orange-600 bg-clip-text text-transparent">
                Users Remember
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              From user research to interactive prototypes, we craft intuitive interfaces 
              and design systems that drive engagement and conversions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Start Your Design Project
              </motion.button>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-slate-700 text-white font-semibold hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
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

      {/* DESIGN PRINCIPLES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Design Philosophy
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Principles that guide every design decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DESIGN_PRINCIPLES.map((principle, index) => (
              <motion.div
                key={principle.principle}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {principle.principle}
                </h3>
                <p className="text-slate-400 text-sm">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN SERVICES */}
      <section id="services" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Comprehensive Design Services
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              End-to-end design solutions from research to delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESIGN_SERVICES.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* UX PROCESS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Design Process
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A proven four-phase approach to creating exceptional user experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {UX_PROCESS.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-extrabold text-orange-500/20 mb-4">
                  {phase.phase}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {phase.name}
                </h3>
                <div className="text-xs text-orange-400 font-semibold mb-4 uppercase tracking-wider">
                  {phase.duration}
                </div>
                <ul className="space-y-2">
                  {phase.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-400">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {activity}
                    </li>
                  ))}
                </ul>
                {index < UX_PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERTISE AREAS */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Areas of Expertise
            </h2>
            <p className="text-lg text-slate-400">
              Specialized design solutions for different platforms and industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {EXPERTISE_AREAS.map((area, index) => (
              <motion.div
                key={area.area}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {area.area}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {area.description}
                </p>
                <ul className="space-y-1">
                  {area.examples.map((example, idx) => (
                    <li key={idx} className="text-xs text-slate-500">
                      • {example}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real results from our design transformations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.title}
                caseStudy={caseStudy}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN TOOLS */}
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
              Professional Design Tools
            </h2>
            <p className="text-lg text-slate-400">
              Industry-leading software for world-class design
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {DESIGN_TOOLS.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 flex items-center gap-3"
              >
                <span className="text-2xl">{tool.icon}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{tool.name}</div>
                  <div className="text-xs text-slate-500">{tool.category}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-transparent border border-orange-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Transform Your User Experience?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create beautiful, intuitive designs that your users will love 
            and that drive real business results.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Schedule Design Consultation
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default UIUXService;