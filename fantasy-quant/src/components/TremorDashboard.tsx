'use client';

import { Card, Text, Metric, Flex, ProgressBar, Title, Grid, DonutChart, Legend, BarList } from '@tremor/react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Activity, Target, Zap } from '@/components/icons';

export default function TremorDashboard() {
  const chartData = [
    { name: 'XGBoost Prediction Confidence', value: 85 },
    { name: 'Historical Correlation', value: 72 },
    { name: 'Weather Impact Factor', value: 34 },
  ];
  
  const barData = [
    { name: 'Justin Jefferson', value: 24.5 },
    { name: 'CeeDee Lamb', value: 22.1 },
    { name: 'Tyreek Hill', value: 21.0 },
    { name: 'Amon-Ra St. Brown', value: 19.8 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 20 } }
  };

  return (
    <motion.div 
      className="p-6 max-w-7xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
          <Brain className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <Title className="text-white text-2xl font-bold tracking-tight">Enterprise Machine Learning</Title>
          <Text className="text-gray-400 text-sm">Real-time model inference and stream processing metrics</Text>
        </div>
      </motion.div>
      
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="transition-transform">
          <Card decoration="top" decorationColor="indigo" className="bg-[#111111] border border-gray-800 h-full rounded-xl shadow-none">
            <Flex alignItems="start">
              <div>
                <Text className="text-gray-400 text-sm font-medium">XGBoost Projected Points (C. McCaffrey)</Text>
                <Metric className="text-white mt-2 text-3xl font-bold tracking-tight">26.4 <span className="text-sm font-normal text-gray-500">pts</span></Metric>
              </div>
              <div className="p-2 bg-indigo-500/10 rounded-md">
                <Target className="w-5 h-5 text-indigo-400" />
              </div>
            </Flex>
            <Flex className="mt-6">
              <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">Confidence Interval</Text>
              <Text className="text-indigo-400 font-semibold">82%</Text>
            </Flex>
            <ProgressBar value={82} color="indigo" className="mt-2" />
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="transition-transform">
          <Card decoration="top" decorationColor="emerald" className="bg-[#111111] border border-gray-800 h-full rounded-xl shadow-none">
            <Flex alignItems="start">
              <div>
                <Text className="text-gray-400 text-sm font-medium">Optuna Tuning Iterations</Text>
                <Metric className="text-white mt-2 text-3xl font-bold tracking-tight">1,024</Metric>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-md">
                <Cpu className="w-5 h-5 text-emerald-400" />
              </div>
            </Flex>
            <Flex className="mt-6">
              <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">Model Convergence</Text>
              <Text className="text-emerald-400 font-semibold">99%</Text>
            </Flex>
            <ProgressBar value={99} color="emerald" className="mt-2" />
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants} whileHover={{ y: -2 }} className="transition-transform">
          <Card decoration="top" decorationColor="rose" className="bg-[#111111] border border-gray-800 h-full rounded-xl shadow-none">
            <Flex alignItems="start">
              <div>
                <Text className="text-gray-400 text-sm font-medium">Live Streaming Delay</Text>
                <Metric className="text-white mt-2 text-3xl font-bold tracking-tight">14 <span className="text-sm font-normal text-gray-500">ms</span></Metric>
              </div>
              <div className="p-2 bg-rose-500/10 rounded-md">
                <Zap className="w-5 h-5 text-rose-400" />
              </div>
            </Flex>
            <Flex className="mt-6">
              <Text className="text-gray-500 text-xs font-medium uppercase tracking-wider">Redpanda Throughput</Text>
              <Text className="text-rose-400 font-semibold">99.9%</Text>
            </Flex>
            <ProgressBar value={100} color="rose" className="mt-2" />
          </Card>
        </motion.div>
      </Grid>
      
      <Grid numItemsSm={1} numItemsLg={2} className="gap-6 mt-6">
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border border-gray-800 rounded-xl shadow-none">
            <Flex alignItems="center" className="border-b border-gray-800/60 pb-4 mb-6">
              <Activity className="w-5 h-5 text-gray-400 mr-2" />
              <Title className="text-white font-semibold">Model Weight Distribution</Title>
            </Flex>
            <DonutChart
              className="mt-6 h-64"
              data={chartData}
              category="value"
              index="name"
              colors={['indigo', 'violet', 'cyan']}
              variant="donut"
              showAnimation={true}
            />
            <Legend
              className="mt-6 justify-center text-gray-400"
              categories={['Prediction Confidence', 'Historical Correlation', 'Weather Impact']}
              colors={['indigo', 'violet', 'cyan']}
            />
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-[#111111] border border-gray-800 rounded-xl shadow-none">
            <Flex alignItems="center" className="border-b border-gray-800/60 pb-4 mb-6">
              <Database className="w-5 h-5 text-gray-400 mr-2" />
              <Title className="text-white font-semibold">Top WR Projections (XGBoost)</Title>
            </Flex>
            <div className="mt-4">
              <BarList 
                data={barData} 
                className="mt-2" 
                color="indigo"
                showAnimation={true} 
              />
            </div>
          </Card>
        </motion.div>
      </Grid>
    </motion.div>
  );
}
