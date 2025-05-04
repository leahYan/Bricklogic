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
    // Remove any experimental features that might be causing issues
    esmExternals: 'loose', // Add this to help with module resolution
  },
  // Disable server-side features for static export
  trailingSlash: true,
  // Ensure assets are properly referenced
  assetPrefix: './',
  transpilePackages: ['react-native', 'react-native-reanimated'] // Add required packages for transpilation
};

module.exports = nextConfig;