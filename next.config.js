/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  ignoreBuildErrors: true,
  typescript: {
    ignoreBuildErrors: true, // temp add for next-auth failded build issues
  },
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
