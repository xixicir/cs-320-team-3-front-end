module.exports = (phase, { defaultConfig }) => {
  return {
    experimental: {
      appDir: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  };
};
