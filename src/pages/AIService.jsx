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
const AI_SERVICES = [
  {
    id: "automation",
    icon: "🤖",
    title: "Intelligent Automation",
    description: "Transform manual processes with AI-powered automation that learns and improves over time.",
    features: [
      "Process automation",
      "Document processing (OCR)",
      "Workflow optimization",
      "RPA integration",
    ],
    useCases: ["Invoice processing", "Data entry automation", "Customer onboarding"],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "analytics",
    icon: "📊",
    title: "Predictive Analytics",
    description: "Leverage historical data to forecast trends, behavior, and outcomes with machine learning models.",
    features: [
      "Time series forecasting",
      "Demand prediction",
      "Churn analysis",
      "Risk assessment",
    ],
    useCases: ["Sales forecasting", "Inventory optimization", "Customer retention"],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "nlp",
    icon: "💬",
    title: "Natural Language Processing",
    description: "Extract insights from text, enable conversational AI, and understand customer sentiment.",
    features: [
      "Sentiment analysis",
      "Text classification",
      "Entity extraction",
      "Language translation",
    ],
    useCases: ["Review analysis", "Content moderation", "Document summarization"],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "chatbots",
    icon: "🗣️",
    title: "AI Chatbots & Assistants",
    description: "Deploy intelligent conversational agents that understand context and provide personalized responses.",
    features: [
      "24/7 customer support",
      "Multi-language support",
      "Context awareness",
      "Integration with CRM",
    ],
    useCases: ["Customer service", "Lead qualification", "FAQ automation"],
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "computer-vision",
    icon: "👁️",
    title: "Computer Vision",
    description: "Enable machines to interpret and analyze visual information from images and videos.",
    features: [
      "Object detection",
      "Image classification",
      "Facial recognition",
      "Quality inspection",
    ],
    useCases: ["Product inspection", "Security monitoring", "Medical imaging"],
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/30",
  },
  {
    id: "recommendation",
    icon: "🎯",
    title: "Recommendation Systems",
    description: "Personalize user experiences with AI-driven content and product recommendations.",
    features: [
      "Collaborative filtering",
      "Content-based filtering",
      "Hybrid models",
      "Real-time personalization",
    ],
    useCases: ["E-commerce recommendations", "Content discovery", "Personalized marketing"],
    color: "from-pink-500/20 to-pink-600/10",
    borderColor: "border-pink-500/30",
  },
];

const AI_TECH_STACK = [
  {
    category: "Frameworks",
    technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras"],
  },
  {
    category: "NLP",
    technologies: ["OpenAI GPT", "BERT", "spaCy", "Hugging Face"],
  },
  {
    category: "Cloud AI",
    technologies: ["AWS SageMaker", "Azure ML", "Google AI", "Vertex AI"],
  },
  {
    category: "MLOps",
    technologies: ["MLflow", "Kubeflow", "DVC", "Weights & Biases"],
  },
];

const INDUSTRIES = [
  {
    industry: "Healthcare",
    icon: "🏥",
    applications: ["Diagnostic assistance", "Patient monitoring", "Drug discovery", "Medical imaging"],
  },
  {
    industry: "Finance",
    icon: "💰",
    applications: ["Fraud detection", "Risk assessment", "Algorithmic trading", "Credit scoring"],
  },
  {
    industry: "Retail",
    icon: "🛍️",
    applications: ["Demand forecasting", "Personalized marketing", "Price optimization", "Inventory management"],
  },
  {
    industry: "Manufacturing",
    icon: "🏭",
    applications: ["Quality control", "Predictive maintenance", "Supply chain optimization", "Process automation"],
  },
];

const BENEFITS = [
  { stat: "70%", label: "Cost Reduction", sublabel: "In operational expenses" },
  { stat: "5x", label: "Faster Insights", sublabel: "Data-driven decisions" },
  { stat: "95%", label: "Accuracy", sublabel: "In prediction models" },
  { stat: "24/7", label: "Availability", sublabel: "AI-powered automation" },
];

const AI_CAPABILITIES = [
  { icon: "🧠", title: "Deep Learning", desc: "Neural networks for complex patterns" },
  { icon: "📈", title: "Real-time Processing", desc: "Instant predictions & responses" },
  { icon: "🔄", title: "Continuous Learning", desc: "Models that improve over time" },
  { icon: "🔒", title: "Secure & Compliant", desc: "Privacy-first AI solutions" },
  { icon: "🎨", title: "Custom Models", desc: "Tailored to your specific needs" },
  { icon: "⚡", title: "Scalable Infrastructure", desc: "Cloud-based ML pipelines" },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Assessment",
    description: "Analyze your data landscape and identify AI opportunities",
  },
  {
    step: "02",
    title: "Model Development",
    description: "Build and train custom ML models tailored to your needs",
  },
  {
    step: "03",
    title: "Integration & Deployment",
    description: "Seamlessly integrate AI into your existing systems",
  },
  {
    step: "04",
    title: "Monitoring & Optimization",
    description: "Continuous performance tracking and model refinement",
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
          Use Cases
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.useCases.map((useCase) => (
            <span
              key={useCase}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

// Industry Card
const IndustryCard = React.memo(({ industry, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="p-8 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300 group"
  >
    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {industry.icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4">{industry.industry}</h3>
    <ul className="space-y-2">
      {industry.applications.map((app, idx) => (
        <li key={idx} className="flex items-start text-sm text-slate-400">
          <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {app}
        </li>
      ))}
    </ul>
  </motion.div>
));

IndustryCard.displayName = "IndustryCard";

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
const AIService = () => {
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
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Artificial Intelligence & Machine Learning
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Transform Your Business with{" "}
              <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-orange-600 bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              Harness the power of AI for intelligent automation, predictive analytics, 
              conversational AI, and data-driven insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Start Your AI Journey
              </motion.button>

              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-slate-700 text-white font-semibold hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-300"
              >
                Explore AI Solutions
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

      {/* AI SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              AI Solutions for Every Need
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From automation to advanced analytics, we build AI that delivers measurable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {AI_SERVICES.map((service, index) => (
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

      {/* CAPABILITIES */}
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
              Enterprise-Grade AI Capabilities
            </h2>
            <p className="text-lg text-slate-400">
              Built on cutting-edge technology with security and scalability in mind
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_CAPABILITIES.map((capability, index) => (
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

      {/* INDUSTRY APPLICATIONS */}
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
              Industry Applications
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              AI solutions tailored to your industry's unique challenges
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {INDUSTRIES.map((industry, index) => (
              <IndustryCard
                key={industry.industry}
                industry={industry}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
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
              Advanced AI Technology Stack
            </h2>
            <p className="text-lg text-slate-400">
              Powered by industry-leading frameworks and platforms
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {AI_TECH_STACK.map((stack, index) => (
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

      {/* PROCESS */}
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
              Our AI Development Process
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A proven methodology from concept to production
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
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
                {index < PROCESS_STEPS.length - 1 && (
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
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-transparent border border-orange-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Unlock AI's Potential?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's explore how AI and machine learning can transform your business 
            operations and drive competitive advantage.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Schedule AI Consultation
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default AIService;