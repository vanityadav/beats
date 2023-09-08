/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"],
  },
  experimental: {
    serverActions: true,
    serverActionsBodySizeLimit: "20mb",
  },
};

module.exports = nextConfig;
