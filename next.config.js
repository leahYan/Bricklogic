/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure image domains if needed
  images: {
    domains: [],
    unoptimized: true, // Required for static export
  },
  // Ensure Next.js works with Capacitor
  output: 'export',
  // Next.js 14+ uses App Router by default
  experimental: {
    serverComponentsExternalPackages: [],
  },
  // Disable server-side features for static export
  trailingSlash: true,
  // Ensure assets are properly referenced
  assetPrefix: './',
};

module.exports = nextConfig;