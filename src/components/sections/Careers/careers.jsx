import { motion } from "framer-motion";

export default function Careers() {
  return (
    <section
      id="careers"
      className="py-32 bg-gradient-to-br from-[#0a1833] to-[#102b5c] text-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Join <span className="text-orange-500">Tetra Core</span>
          </h2>
          <p className="mt-4 text-lg text-slate-300">
            Build next-generation digital products with a global team.
          </p>
        </motion.div>

        {/* Culture Cards */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {["Growth", "Remote Work", "Great Culture", "Innovation"].map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-slate-300 text-sm">
                We provide an environment where you can grow and do your best work.
              </p>
            </div>
          ))}
        </div>

        {/* Jobs */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">
            Open Positions
          </h3>

          <div className="max-w-4xl mx-auto space-y-4">
            {["Frontend Developer", "Backend Developer", "UI/UX Designer", "DevOps Engineer"].map(
              (job) => (
                <div
                  key={job}
                  className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{job}</h4>
                    <p className="text-sm text-slate-300">Remote • Full Time</p>
                  </div>

                  <button className="bg-orange-500 px-6 py-2 rounded-lg hover:bg-orange-600 transition">
                    Apply
                  </button>
                </div>
              )
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
