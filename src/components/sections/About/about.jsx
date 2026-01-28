import React from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../../common/animatedsection';
import { FaRocket, FaUsers, FaLightbulb, FaAward } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: FaRocket,
      title: 'Innovation at Scale',
      description: 'We engineer future-ready digital platforms using modern architectures and emerging technologies.',
    },
    {
      icon: FaUsers,
      title: 'Client-Centered Execution',
      description: 'We partner closely with organizations to deliver solutions that create measurable business impact.',
    },
    {
      icon: FaLightbulb,
      title: 'Design & Engineering Excellence',
      description: 'We combine strategy, design, and engineering to build digital products that perform.',
    },
    {
      icon: FaAward,
      title: 'Enterprise-Grade Quality',
      description: 'Our delivery standards ensure security, scalability, and long-term reliability.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About <span className="text-orange-500">Tetra Core</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Tetra Core is a global digital solutions company delivering enterprise
            software, cloud platforms, and intelligent systems for organizations
            worldwide.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-900 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team collaboration"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Engineering Digital Advantage
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              We help organizations design, build, and scale high-performance
              digital products — from enterprise platforms and mobile
              applications to AI-driven systems and cloud-native solutions.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our cross-functional teams of engineers, designers, and technology
              strategists work together to deliver software that drives
              efficiency, growth, and competitive advantage.
            </p>
          </AnimatedSection>
        </div>

        {/* Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <value.icon className="text-3xl text-white" />
                </motion.div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
