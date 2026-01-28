import { motion } from "framer-motion";

const capabilities = [
  {
    title: "Enterprise Software Platforms",
    description:
      "We architect and develop mission-critical systems used by organizations to manage operations, data, and large user bases with reliability and security.",
    stack: ["Scalable Architecture", "Cloud Infrastructure", "Security", "Performance"],
  },
  {
    title: "AI-Powered Digital Solutions",
    description:
      "We build intelligent platforms that use machine learning and automation to personalize experiences, optimize workflows, and deliver smarter business outcomes.",
    stack: ["Artificial Intelligence", "Data Engineering", "Automation", "Analytics"],
  },
  {
    title: "Commerce & Financial Systems",
    description:
      "We create secure and high-performance commerce and financial platforms that support global payments, subscriptions, and digital transactions.",
    stack: ["Payment Systems", "APIs", "Security", "Cloud"],
  },
  {
    title: "Digital Transformation for Brands",
    description:
      "We modernize corporate digital presence with high-performance websites, customer platforms, and conversion-driven experiences.",
    stack: ["Modern Frontend", "UX Engineering", "SEO", "Performance"],
  },
];

const industries = [
  { title: "Game Development", desc: "Immersive 2D, 3D and multiplayer games for mobile, desktop, and web platforms." },
  { title: "UI / UX Design", desc: "User-centered, conversion-optimized design systems for digital products." },
  { title: "Android & iOS Apps", desc: "High-performance native and cross-platform mobile applications." },
  { title: "Web Platforms", desc: "Enterprise SaaS, dashboards, eCommerce and corporate portals." },
  { title: "AI & Automation", desc: "Intelligent systems that automate workflows and personalize experiences." },
  { title: "Graphic & Brand Design", desc: "World-class branding, visual identity and digital design systems." },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-32 bg-gradient-to-br from-[#0a1833] to-[#102b5c] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-24">
          <h2 className="text-5xl font-extrabold mb-6">
            What We <span className="text-orange-500">Build</span>
          </h2>
          <p className="text-slate-300 max-w-3xl text-lg">
            We partner with international businesses to design, build, and scale
            digital products that drive growth, efficiency, and long-term success.
          </p>
        </div>

        {/* Trusted By */}
        <div className="mb-32 text-center">
          <p className="text-slate-400 mb-10">
            Trusted by fast-growing technology teams and digital businesses worldwide
          </p>

          <div className="flex flex-wrap justify-center gap-12 text-white/60 text-2xl font-semibold tracking-wide">
            <span>Zendesk</span>
            <span>Freshworks</span>
            <span>HubSpot</span>
            <span>Upwork</span>
            <span>Atlassian</span>
            <span>Envato</span>
          </div>
        </div>

        {/* Enterprise Capabilities */}
        <div className="grid md:grid-cols-2 gap-12 mb-32">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>

              <p className="text-slate-300 leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {item.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm rounded-full bg-white/10 border border-white/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Impact */}
        <div className="grid md:grid-cols-3 gap-12 text-center mb-32">
          <div>
            <h3 className="text-5xl font-extrabold text-orange-500">10+</h3>
            <p className="text-slate-300 mt-2">Countries Served</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-orange-500">100K+</h3>
            <p className="text-slate-300 mt-2">End Users Impacted</p>
          </div>
          <div>
            <h3 className="text-5xl font-extrabold text-orange-500">99.9%</h3>
            <p className="text-slate-300 mt-2">System Uptime</p>
          </div>
        </div>

        {/* Industries */}
        <div>
          <h3 className="text-4xl font-extrabold mb-12 text-center">
            Industries & Capabilities
          </h3>

          <div className="grid md:grid-cols-3 gap-10">
            {industries.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition"
              >
                <h4 className="text-xl font-semibold mb-4">
                  {item.title}
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
