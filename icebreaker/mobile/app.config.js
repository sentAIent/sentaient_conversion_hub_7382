export default ({ config }) => {
  return {
    ...config,
    experiments: {
      ...config.experiments,
      baseUrl: process.env.NODE_ENV === 'production' ? '/icebreaker' : ''
    }
  };
};
