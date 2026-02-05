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
const MOBILE_PLATFORMS = [
  {
    name: "iOS",
    icon: "📱",
    description: "Native & Cross-Platform",
    technologies: ["Swift", "SwiftUI", "React Native", "Flutter"],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    name: "Android",
    icon: "🤖",
    description: "Native & Cross-Platform",
    technologies: ["Kotlin", "Jetpack Compose", "React Native", "Flutter"],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    name: "Cross-Platform",
    icon: "🔄",
    description: "Write Once, Deploy Everywhere",
    technologies: ["React Native", "Flutter", "Expo", "Progressive Web Apps"],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
];

const APP_SERVICES = [
  {
    id: "native",
    icon: "⚡",
    title: "Native App Development",
    description: "High-performance native apps built with platform-specific languages for optimal user experience.",
    features: [
      "Platform-optimized UI/UX",
      "Full device API access",
      "Maximum performance",
      "App Store guidelines compliance",
    ],
    platforms: ["iOS (Swift/SwiftUI)", "Android (Kotlin/Jetpack)"],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "cross-platform",
    icon: "🌐",
    title: "Cross-Platform Development",
    description: "Build once, deploy everywhere with React Native and Flutter for faster time-to-market.",
    features: [
      "Single codebase for iOS & Android",
      "Faster development cycle",
      "Cost-effective solution",
      "Native-like performance",
    ],
    platforms: ["React Native", "Flutter", "Expo"],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "ui-ux",
    icon: "🎨",
    title: "UI/UX Design",
    description: "Intuitive, beautiful interfaces designed for engagement and conversion.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Design system creation",
      "Usability testing",
    ],
    platforms: ["Figma", "Adobe XD", "Sketch"],
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/30",
  },
  {
    id: "backend",
    icon: "🔧",
    title: "Backend & APIs",
    description: "Robust server infrastructure with RESTful APIs and real-time capabilities.",
    features: [
      "RESTful API development",
      "Real-time sync (WebSockets)",
      "Database design & optimization",
      "Cloud infrastructure setup",
    ],
    platforms: ["Node.js", "Firebase", "AWS", "MongoDB"],
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "testing",
    icon: "✅",
    title: "Quality Assurance",
    description: "Comprehensive testing to ensure bug-free, reliable app performance.",
    features: [
      "Automated testing",
      "Manual QA testing",
      "Performance testing",
      "Security audits",
    ],
    platforms: ["Jest", "Detox", "Appium", "Firebase Test Lab"],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "deployment",
    icon: "🚀",
    title: "Deployment & Maintenance",
    description: "Seamless app store deployment and ongoing support to keep your app running smoothly.",
    features: [
      "App Store submission",
      "Play Store optimization",
      "Continuous updates",
      "Performance monitoring",
    ],
    platforms: ["App Store Connect", "Google Play Console", "TestFlight"],
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/30",
  },
];

const APP_TYPES = [
  {
    type: "E-Commerce",
    icon: "🛒",
    description: "Shopping apps with payments, inventory, and order management",
    features: ["Product catalogs", "Secure payments", "Order tracking", "Push notifications"],
  },
  {
    type: "Social & Messaging",
    icon: "💬",
    description: "Real-time chat, social feeds, and community platforms",
    features: ["Real-time messaging", "Media sharing", "User profiles", "Feed algorithms"],
  },
  {
    type: "On-Demand Services",
    icon: "🚗",
    description: "Service booking platforms like ride-sharing or food delivery",
    features: ["Live tracking", "Booking system", "Payment gateway", "Rating system"],
  },
  {
    type: "Healthcare & Fitness",
    icon: "🏥",
    description: "Health monitoring, telemedicine, and fitness tracking apps",
    features: ["Health data sync", "Appointment booking", "Video consultations", "Activity tracking"],
  },
  {
    type: "Education & E-Learning",
    icon: "📚",
    description: "Learning management systems and educational platforms",
    features: ["Video courses", "Progress tracking", "Quizzes & tests", "Certificates"],
  },
  {
    type: "Finance & Banking",
    icon: "💳",
    description: "Secure financial apps for banking, investing, and payments",
    features: ["Biometric auth", "Transaction history", "Bill payments", "Investment tracking"],
  },
];

const KEY_FEATURES = [
  { icon: "🔐", title: "Secure Authentication", desc: "Biometric & OAuth integration" },
  { icon: "📲", title: "Push Notifications", desc: "Real-time user engagement" },
  { icon: "💳", title: "Payment Integration", desc: "Stripe, PayPal, Apple Pay" },
  { icon: "🗺️", title: "Maps & Location", desc: "GPS, geofencing, navigation" },
  { icon: "📊", title: "Analytics", desc: "User behavior tracking" },
  { icon: "☁️", title: "Cloud Sync", desc: "Cross-device data sync" },
  { icon: "🔔", title: "Offline Mode", desc: "Works without internet" },
  { icon: "🌍", title: "Multi-language", desc: "Internationalization support" },
];

const TECH_STACK = [
  {
    category: "Frontend",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    category: "Backend",
    technologies: ["Node.js", "Firebase", "GraphQL", "REST APIs"],
  },
  {
    category: "Database",
    technologies: ["MongoDB", "PostgreSQL", "Firebase", "Realm"],
  },
  {
    category: "DevOps",
    technologies: ["Fastlane", "CodePush", "App Center", "CI/CD"],
  },
];

const BENEFITS = [
  { stat: "500K+", label: "Downloads", sublabel: "Across our apps" },
  { stat: "4.8★", label: "Average Rating", sublabel: "App Store & Play Store" },
  { stat: "99.9%", label: "Uptime", sublabel: "Reliable performance" },
  { stat: "60%", label: "Faster Development", sublabel: "With cross-platform" },
];

const DEVELOPMENT_PROCESS = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "Requirements gathering, market research, and technical feasibility analysis",
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "UI/UX design, interactive prototypes, and user flow mapping",
  },
  {
    step: "03",
    title: "Development & Testing",
    description: "Agile development sprints with continuous testing and feedback",
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "App store deployment, marketing support, and ongoing maintenance",
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
          Key Features
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
          Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.platforms.map((platform) => (
            <span
              key={platform}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

// Platform Card
const PlatformCard = React.memo(({ platform, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className={`p-8 rounded-2xl bg-gradient-to-br ${platform.color} border ${platform.borderColor} hover:shadow-xl transition-all duration-300 text-center group`}
  >
    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {platform.icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">{platform.name}</h3>
    <p className="text-slate-400 text-sm mb-6">{platform.description}</p>
    <div className="flex flex-wrap justify-center gap-2">
      {platform.technologies.map((tech) => (
        <span
          key={tech}
          className="px-3 py-1.5 text-xs rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50"
        >
          {tech}
        </span>
      ))}
    </div>
  </motion.div>
));

PlatformCard.displayName = "PlatformCard";

// App Type Card
const AppTypeCard = React.memo(({ appType, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-8 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 group"
  >
    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {appType.icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{appType.type}</h3>
    <p className="text-slate-400 text-sm mb-6">{appType.description}</p>
    <ul className="space-y-2">
      {appType.features.map((feature, idx) => (
        <li key={idx} className="flex items-start text-sm text-slate-500">
          <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          {feature}
        </li>
      ))}
    </ul>
  </motion.div>
));

AppTypeCard.displayName = "AppTypeCard";

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
const MobileService = () => {
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
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Mobile App Development
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Build Apps That{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Users Love
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              Native and cross-platform mobile apps for iOS and Android. 
              Built with React Native, Flutter, Swift, and Kotlin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Start Your App Project
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

      {/* PLATFORMS */}
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
              Multi-Platform Expertise
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Build for iOS, Android, or both with the right technology for your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {MOBILE_PLATFORMS.map((platform, index) => (
              <PlatformCard
                key={platform.name}
                platform={platform}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
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
              End-to-End Mobile Solutions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From concept to app store, we handle every aspect of mobile development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_SERVICES.map((service, index) => (
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

      {/* APP TYPES */}
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
              Apps We Build
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Specialized expertise across diverse app categories
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {APP_TYPES.map((appType, index) => (
              <AppTypeCard
                key={appType.type}
                appType={appType}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* KEY FEATURES */}
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
              Essential App Features
            </h2>
            <p className="text-lg text-slate-400">
              Everything your mobile app needs to succeed
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-extrabold mb-4">
              Modern Mobile Tech Stack
            </h2>
            <p className="text-lg text-slate-400">
              Industry-leading frameworks and tools
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
                className="p-6 rounded-xl bg-slate-900/30 border border-slate-700/50"
              >
                <h3 className="text-lg font-bold text-orange-400 mb-4">
                  {stack.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {stack.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
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

      {/* DEVELOPMENT PROCESS */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Proven methodology from idea to app store
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DEVELOPMENT_PROCESS.map((step, index) => (
              <motion.div
                key={step.step}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-extrabold text-orange-500/20 mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400">
                  {step.description}
                </p>
                {index < DEVELOPMENT_PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                )}
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
            Ready to Build Your Mobile App?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's transform your app idea into a reality with our expert mobile development team.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Get Free Project Estimate
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default MobileService;