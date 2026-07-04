import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-12 md:p-20 rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 shadow-2xl"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 opacity-50" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-8 backdrop-blur-md">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to scale with <span className="text-blue-400">sentAIent</span>?
            </h2>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Whether you're looking for enterprise AI solutions, exploring partnership opportunities, or interested in our flagship platforms, we're ready to connect.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.href = "mailto:sales@sentaient.com"}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25"
              >
                Contact Enterprise Sales
              </button>
              <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
                <span>View Documentation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
