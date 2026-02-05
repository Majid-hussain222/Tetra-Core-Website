import React, { useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Feature icons component
const FeatureIcon = ({ children, className = "" }) => (
  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/20 flex items-center justify-center ${className}`}>
    {children}
  </div>
);

// Constants
const CLOUD_PROVIDERS = [
  {
    name: "AWS",
    logo: "☁️",
    description: "Amazon Web Services",
    capabilities: ["EC2", "S3", "Lambda", "RDS"],
  },
  {
    name: "Azure",
    logo: "🔷",
    description: "Microsoft Azure",
    capabilities: ["VMs", "Blob Storage", "Functions", "SQL"],
  },
  {
    name: "GCP",
    logo: "🌐",
    description: "Google Cloud Platform",
    capabilities: ["Compute Engine", "Cloud Storage", "Cloud Functions", "BigQuery"],
  },
];

const CORE_SERVICES = [
  {
    id: "migration",
    icon: "🚀",
    title: "Cloud Migration",
    description: "Seamless transition from on-premise to cloud with zero downtime and data integrity.",
    features: [
      "Assessment & planning",
      "Phased migration strategy",
      "Data transfer optimization",
      "Post-migration validation",
    ],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "availability",
    icon: "⚡",
    title: "High Availability",
    description: "99.99% uptime with auto-scaling, load balancing, and redundant architecture.",
    features: [
      "Multi-region deployment",
      "Auto-scaling policies",
      "Load balancing",
      "Health monitoring",
    ],
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "disaster",
    icon: "🛡️",
    title: "Disaster Recovery",
    description: "Business continuity with automated backups, failover systems, and recovery plans.",
    features: [
      "Automated backups",
      "Instant failover",
      "RTO/RPO optimization",
      "Recovery testing",
    ],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "devops",
    icon: "🔄",
    title: "DevOps & CI/CD",
    description: "Automated deployment pipelines for faster, reliable software delivery.",
    features: [
      "Infrastructure as Code",
      "Automated testing",
      "Continuous deployment",
      "Container orchestration",
    ],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "security",
    icon: "🔒",
    title: "Cloud Security",
    description: "Enterprise-grade security with compliance, encryption, and access control.",
    features: [
      "Identity & access management",
      "Data encryption at rest/transit",
      "Compliance certifications",
      "Security monitoring",
    ],
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/30",
  },
  {
    id: "optimization",
    icon: "📊",
    title: "Cost Optimization",
    description: "Maximize ROI with resource optimization, right-sizing, and cost monitoring.",
    features: [
      "Resource right-sizing",
      "Reserved instances",
      "Cost analytics",
      "Budget alerts",
    ],
    color: "from-yellow-500/20 to-yellow-600/10",
    borderColor: "border-yellow-500/30",
  },
];

const ARCHITECTURE_PATTERNS = [
  {
    pattern: "Microservices",
    description: "Containerized services with Kubernetes orchestration",
    technologies: ["Docker", "Kubernetes", "Service Mesh", "API Gateway"],
  },
  {
    pattern: "Serverless",
    description: "Event-driven architecture with auto-scaling functions",
    technologies: ["Lambda", "Cloud Functions", "Event Grid", "DynamoDB"],
  },
  {
    pattern: "Hybrid Cloud",
    description: "Seamless integration between on-premise and cloud",
    technologies: ["VPN", "Direct Connect", "Hybrid Identity", "Data Sync"],
  },
  {
    pattern: "Multi-Cloud",
    description: "Vendor-agnostic solutions across cloud providers",
    technologies: ["Terraform", "Ansible", "Multi-region", "Failover"],
  },
];

const BENEFITS = [
  { stat: "99.99%", label: "Uptime SLA", sublabel: "Enterprise reliability" },
  { stat: "50%", label: "Cost Savings", sublabel: "Infrastructure optimization" },
  { stat: "10x", label: "Faster Scaling", sublabel: "Auto-scaling enabled" },
  { stat: "24/7", label: "Monitoring", sublabel: "Proactive support" },
];

const KEY_CAPABILITIES = [
  { icon: "🔐", title: "Security First", desc: "End-to-end encryption & compliance" },
  { icon: "📈", title: "Auto Scaling", desc: "Dynamic resource allocation" },
  { icon: "🌍", title: "Global CDN", desc: "Low latency worldwide" },
  { icon: "💰", title: "Cost Control", desc: "Real-time budget tracking" },
  { icon: "🔍", title: "Observability", desc: "Comprehensive monitoring & logging" },
  { icon: "⚙️", title: "Automation", desc: "Infrastructure as Code (IaC)" },
];

// Service Card Component
const ServiceCard = React.memo(({ service, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className={`group relative p-8 rounded-2xl bg-gradient-to-br ${service.color} border ${service.borderColor} hover:shadow-xl transition-all duration-300`}
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

      <ul className="space-y-3">
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
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

// Cloud Provider Card
const ProviderCard = React.memo(({ provider, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="p-8 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:border-orange-500/50 transition-all duration-300 text-center group"
  >
    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {provider.logo}
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{provider.name}</h3>
    <p className="text-slate-500 text-sm mb-6">{provider.description}</p>
    <div className="flex flex-wrap justify-center gap-2">
      {provider.capabilities.map((cap) => (
        <span
          key={cap}
          className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
        >
          {cap}
        </span>
      ))}
    </div>
  </motion.div>
));

ProviderCard.displayName = "ProviderCard";

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
const CloudService = () => {
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
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Cloud Infrastructure & DevOps
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Cloud Solutions for{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Scalable Growth
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              Secure, scalable cloud infrastructure on AWS, Azure, and Google Cloud. 
              Built for performance, optimized for costs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Get a Cloud Assessment
              </motion.button>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-slate-700 text-white font-semibold hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
              >
                Explore Services
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

      {/* CLOUD PROVIDERS */}
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
              Multi-Cloud Expertise
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Deploy on your preferred platform or leverage multi-cloud strategies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {CLOUD_PROVIDERS.map((provider, index) => (
              <ProviderCard
                key={provider.name}
                provider={provider}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
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
              Comprehensive Cloud Services
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              End-to-end cloud solutions from migration to ongoing optimization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_SERVICES.map((service, index) => (
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

      {/* KEY CAPABILITIES */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Built-in Capabilities
            </h2>
            <p className="text-lg text-slate-400">
              Everything you need for production-ready cloud infrastructure
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_CAPABILITIES.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-4xl flex-shrink-0">{capability.icon}</div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{capability.title}</h3>
                  <p className="text-sm text-slate-500">{capability.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE PATTERNS */}
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
              Modern Architecture Patterns
            </h2>
            <p className="text-lg text-slate-400">
              Industry best practices for scalable, resilient systems
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ARCHITECTURE_PATTERNS.map((pattern, index) => (
              <motion.div
                key={pattern.pattern}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50"
              >
                <h3 className="text-2xl font-bold text-orange-400 mb-3">
                  {pattern.pattern}
                </h3>
                <p className="text-slate-400 mb-6">{pattern.description}</p>
                <div className="flex flex-wrap gap-2">
                  {pattern.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50"
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

      {/* CTA SECTION */}
      <section className="py-24 px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Migrate to the Cloud?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Get a free cloud assessment and customized migration strategy 
            tailored to your business needs.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Schedule Free Assessment
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default CloudService;