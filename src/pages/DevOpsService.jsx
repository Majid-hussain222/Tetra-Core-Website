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
const DEVOPS_SERVICES = [
  {
    id: "cicd",
    icon: "🔄",
    title: "CI/CD Pipelines",
    description: "Automated build, test, and deployment pipelines for faster, reliable software delivery.",
    features: [
      "Automated testing & deployment",
      "Multi-environment pipelines",
      "Rollback strategies",
      "Blue-green deployments",
    ],
    tools: ["Jenkins", "GitLab CI", "GitHub Actions", "CircleCI"],
    color: "from-blue-500/20 to-blue-600/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "iac",
    icon: "🏗️",
    title: "Infrastructure as Code",
    description: "Manage and provision infrastructure through version-controlled configuration files.",
    features: [
      "Declarative infrastructure",
      "Version control for infra",
      "Reproducible environments",
      "Automated provisioning",
    ],
    tools: ["Terraform", "CloudFormation", "Ansible", "Pulumi"],
    color: "from-purple-500/20 to-purple-600/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "containers",
    icon: "📦",
    title: "Containerization & Orchestration",
    description: "Package applications with Docker and orchestrate at scale with Kubernetes.",
    features: [
      "Docker containerization",
      "Kubernetes orchestration",
      "Auto-scaling & self-healing",
      "Service mesh integration",
    ],
    tools: ["Docker", "Kubernetes", "Helm", "Istio"],
    color: "from-cyan-500/20 to-cyan-600/10",
    borderColor: "border-cyan-500/30",
  },
  {
    id: "monitoring",
    icon: "📊",
    title: "Monitoring & Observability",
    description: "Real-time visibility into system health, performance, and user experience.",
    features: [
      "Real-time metrics & alerts",
      "Distributed tracing",
      "Log aggregation",
      "Custom dashboards",
    ],
    tools: ["Prometheus", "Grafana", "ELK Stack", "Datadog"],
    color: "from-green-500/20 to-green-600/10",
    borderColor: "border-green-500/30",
  },
  {
    id: "security",
    icon: "🔒",
    title: "DevSecOps",
    description: "Security integrated into every stage of the development lifecycle.",
    features: [
      "Security scanning (SAST/DAST)",
      "Vulnerability management",
      "Compliance automation",
      "Secrets management",
    ],
    tools: ["SonarQube", "Snyk", "HashiCorp Vault", "Aqua Security"],
    color: "from-red-500/20 to-red-600/10",
    borderColor: "border-red-500/30",
  },
  {
    id: "automation",
    icon: "⚡",
    title: "Cloud Automation",
    description: "Automate cloud resource management, scaling, and cost optimization.",
    features: [
      "Auto-scaling policies",
      "Cost optimization",
      "Disaster recovery automation",
      "Multi-cloud management",
    ],
    tools: ["AWS Lambda", "Azure Functions", "Cloud Functions", "Spot.io"],
    color: "from-orange-500/20 to-orange-600/10",
    borderColor: "border-orange-500/30",
  },
];

const DEVOPS_BENEFITS = [
  {
    metric: "10x",
    label: "Faster Deployments",
    description: "From weeks to hours with automated pipelines",
    icon: "🚀",
  },
  {
    metric: "90%",
    label: "Reduced Errors",
    description: "Automated testing catches bugs early",
    icon: "✅",
  },
  {
    metric: "50%",
    label: "Lower Costs",
    description: "Optimized resource utilization",
    icon: "💰",
  },
  {
    metric: "99.9%",
    label: "Uptime SLA",
    description: "Reliable, self-healing infrastructure",
    icon: "⚡",
  },
];

const TECH_STACK = [
  {
    category: "CI/CD",
    tools: ["Jenkins", "GitLab CI", "GitHub Actions", "CircleCI", "ArgoCD"],
  },
  {
    category: "Infrastructure",
    tools: ["Terraform", "Ansible", "CloudFormation", "Pulumi", "Chef"],
  },
  {
    category: "Containers",
    tools: ["Docker", "Kubernetes", "Helm", "Rancher", "Istio"],
  },
  {
    category: "Monitoring",
    tools: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "New Relic"],
  },
  {
    category: "Cloud Platforms",
    tools: ["AWS", "Azure", "GCP", "DigitalOcean", "Heroku"],
  },
  {
    category: "Security",
    tools: ["Vault", "SonarQube", "Snyk", "Aqua", "Falco"],
  },
];

const PIPELINE_STAGES = [
  {
    stage: "01",
    name: "Code",
    description: "Developers commit code to version control",
    activities: ["Git commits", "Branch management", "Code reviews"],
  },
  {
    stage: "02",
    name: "Build",
    description: "Automated compilation and artifact creation",
    activities: ["Compile code", "Dependency management", "Create artifacts"],
  },
  {
    stage: "03",
    name: "Test",
    description: "Automated testing at multiple levels",
    activities: ["Unit tests", "Integration tests", "Security scans"],
  },
  {
    stage: "04",
    name: "Deploy",
    description: "Automated deployment to environments",
    activities: ["Staging deployment", "Production deployment", "Rollback capability"],
  },
];

const AUTOMATION_WORKFLOWS = [
  {
    workflow: "Continuous Integration",
    icon: "🔧",
    description: "Automated build and test on every commit",
    benefits: ["Early bug detection", "Fast feedback", "Code quality gates"],
  },
  {
    workflow: "Continuous Deployment",
    icon: "🚀",
    description: "Automated releases to production",
    benefits: ["Faster time-to-market", "Reduced manual errors", "Consistent deployments"],
  },
  {
    workflow: "Infrastructure Provisioning",
    icon: "🏗️",
    description: "Automated environment creation",
    benefits: ["Reproducible infrastructure", "Version-controlled config", "Fast scaling"],
  },
  {
    workflow: "Incident Response",
    icon: "🚨",
    description: "Automated alerting and remediation",
    benefits: ["Faster resolution", "24/7 monitoring", "Predictive alerts"],
  },
];

const BEST_PRACTICES = [
  { icon: "🔐", title: "Security First", desc: "Shift-left security in pipelines" },
  { icon: "📝", title: "Infrastructure as Code", desc: "Version-controlled infrastructure" },
  { icon: "🔄", title: "Immutable Infrastructure", desc: "Replace, don't modify servers" },
  { icon: "📊", title: "Observability", desc: "Metrics, logs, and traces" },
  { icon: "🎯", title: "GitOps", desc: "Git as single source of truth" },
  { icon: "⚡", title: "Automation", desc: "Automate everything repeatable" },
];

const BENEFITS = [
  { stat: "10x", label: "Faster Deployments", sublabel: "Automated CI/CD" },
  { stat: "90%", label: "Fewer Failures", sublabel: "Automated testing" },
  { stat: "60%", label: "Cost Savings", sublabel: "Resource optimization" },
  { stat: "24/7", label: "Monitoring", sublabel: "Real-time alerts" },
];

const CASE_STUDIES = [
  {
    company: "E-Commerce Platform",
    challenge: "Manual deployments taking 2-3 days with frequent failures",
    solution: "Implemented automated CI/CD pipeline with automated testing",
    results: ["Deploy time reduced to 15 minutes", "99.9% deployment success rate", "5x increase in release frequency"],
    color: "from-blue-500/10 to-blue-600/5",
  },
  {
    company: "FinTech Startup",
    challenge: "Infrastructure inconsistencies across environments",
    solution: "Adopted Infrastructure as Code with Terraform and Kubernetes",
    results: ["100% environment consistency", "70% faster provisioning", "Zero configuration drift"],
    color: "from-purple-500/10 to-purple-600/5",
  },
  {
    company: "SaaS Company",
    challenge: "High cloud costs and poor resource utilization",
    solution: "Implemented auto-scaling and cost optimization automation",
    results: ["50% reduction in cloud costs", "Auto-scaling during peak loads", "Improved performance"],
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
          Capabilities
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
          Tools & Technologies
        </h4>
        <div className="flex flex-wrap gap-2">
          {service.tools.map((tool) => (
            <span
              key={tool}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
));

ServiceCard.displayName = "ServiceCard";

// Benefit Card Component
const BenefitCard = React.memo(({ benefit, index, prefersReducedMotion }) => (
  <motion.div
    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
  >
    <div className="text-5xl mb-4">{benefit.icon}</div>
    <div className="text-5xl font-extrabold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent mb-2">
      {benefit.metric}
    </div>
    <div className="text-lg font-semibold text-white mb-2">
      {benefit.label}
    </div>
    <p className="text-sm text-slate-500">
      {benefit.description}
    </p>
  </motion.div>
));

BenefitCard.displayName = "BenefitCard";

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
      {caseStudy.company}
    </div>
    
    <div className="space-y-4 mb-6">
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Challenge</div>
        <p className="text-slate-300 text-sm">{caseStudy.challenge}</p>
      </div>
      <div>
        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Solution</div>
        <p className="text-slate-300 text-sm">{caseStudy.solution}</p>
      </div>
    </div>

    <div>
      <div className="text-xs text-slate-500 uppercase tracking-wider mb-3">Results</div>
      <ul className="space-y-2">
        {caseStudy.results.map((result, idx) => (
          <li key={idx} className="flex items-start text-sm text-slate-400">
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
const DevOpsService = () => {
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
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              DevOps & Cloud Automation
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Automate, Scale, and{" "}
              <span className="bg-gradient-to-r from-orange-400 via-cyan-400 to-orange-600 bg-clip-text text-transparent">
                Deploy with Confidence
              </span>
            </h1>

            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 leading-relaxed mb-10">
              Enterprise DevOps solutions with CI/CD pipelines, infrastructure automation, 
              monitoring, and security-first practices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={handleGetQuote}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300"
              >
                Get DevOps Assessment
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

      {/* DEVOPS BENEFITS */}
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
              Why DevOps Matters
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Transform your development workflow with modern DevOps practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DEVOPS_BENEFITS.map((benefit, index) => (
              <BenefitCard
                key={benefit.label}
                benefit={benefit}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DEVOPS SERVICES */}
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
              Comprehensive DevOps Solutions
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              End-to-end automation from code commit to production deployment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEVOPS_SERVICES.map((service, index) => (
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

      {/* CI/CD PIPELINE */}
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
              CI/CD Pipeline Stages
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Automated software delivery from commit to production
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PIPELINE_STAGES.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-extrabold text-orange-500/20 mb-4">
                  {stage.stage}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {stage.name}
                </h3>
                <p className="text-slate-400 mb-4 text-sm">
                  {stage.description}
                </p>
                <ul className="space-y-2">
                  {stage.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-500">
                      <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {activity}
                    </li>
                  ))}
                </ul>
                {index < PIPELINE_STAGES.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTOMATION WORKFLOWS */}
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
              Automation Workflows
            </h2>
            <p className="text-lg text-slate-400">
              Key automation practices that accelerate delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {AUTOMATION_WORKFLOWS.map((workflow, index) => (
              <motion.div
                key={workflow.workflow}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{workflow.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {workflow.workflow}
                </h3>
                <p className="text-slate-400 text-sm mb-4">
                  {workflow.description}
                </p>
                <ul className="space-y-1">
                  {workflow.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs text-slate-500 flex items-start">
                      <span className="text-orange-500 mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEST PRACTICES */}
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
              DevOps Best Practices
            </h2>
            <p className="text-lg text-slate-400">
              Industry standards we follow for every project
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BEST_PRACTICES.map((practice, index) => (
              <motion.div
                key={practice.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="text-3xl flex-shrink-0">{practice.icon}</div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{practice.title}</h3>
                  <p className="text-sm text-slate-500">{practice.desc}</p>
                </div>
              </motion.div>
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
              DevOps Technology Stack
            </h2>
            <p className="text-lg text-slate-400">
              Industry-leading tools and platforms
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 text-sm rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
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
              Proven Results
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Real transformations from our DevOps implementations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.company}
                caseStudy={caseStudy}
                index={index}
                prefersReducedMotion={!!prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-slate-900/50">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-cyan-500/10 to-transparent border border-orange-500/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Accelerate Your Delivery?
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Let's build a DevOps pipeline that scales with your business and 
            delivers reliable software faster.
          </p>
          <motion.button
            onClick={handleGetQuote}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-semibold shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300"
          >
            Schedule DevOps Consultation
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default DevOpsService;