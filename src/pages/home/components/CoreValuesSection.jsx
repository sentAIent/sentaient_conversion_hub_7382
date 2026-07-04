import React from 'react';
import { Heart, Shield, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const coreValues = [
  {
    icon: Heart,
    title: "Human-Centric",
    description: "AI should enhance human capabilities, not replace them. Every solution we design amplifies human creativity and decision-making."
  },
  {
    icon: Shield,
    title: "Ethical Foundation",
    description: "Our mission reflects our commitment to creating technology that makes a positive impact on human lives broadly."
  },
  {
    icon: Target,
    title: "Measurable Impact",
    description: "Every AI initiative must deliver quantifiable business value with clear ROI metrics and performance indicators."
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description: "We work alongside your team as trusted advisors, ensuring knowledge transfer and sustainable long-term success."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const CoreValuesSection = () => {
  return (
    <section className="py-24 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 space-y-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              From Vision to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Transformation Reality</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Born from the belief that AI should be a bridge to human potential, not a barrier to achievement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-6">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Values</span>
            </h3>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              These principles guide every decision, every implementation, and every client relationship we build.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center group hover:transform hover:-translate-y-2 transition-all duration-300 bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors duration-300">
                <value.icon className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-3">
                {value.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
