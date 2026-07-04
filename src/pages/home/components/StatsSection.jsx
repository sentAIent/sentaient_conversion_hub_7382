import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '$10M+', label: 'Value Generated' },
  { value: '500k+', label: 'Active Users' },
  { value: '6', label: 'Flagship Platforms' },
  { value: '99.9%', label: 'Uptime Reliability' },
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm"
            >
              <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-2">
                {stat.value}
              </span>
              <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
