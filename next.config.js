const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};
