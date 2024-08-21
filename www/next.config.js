const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      // Wildcard path matching
      {
        source: "/password-reset/:token",
        destination: "/auth/password-reset/:token",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
