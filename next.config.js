const basePath = "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
      },
      {
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  basePath,
};

module.exports = nextConfig;
