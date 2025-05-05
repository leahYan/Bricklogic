/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configure image domains if needed
  images: {
    domains: [],
    unoptimized: true, // Required for static export
  },
  // Ensure Next.js works with Capacitor
  output: 'export',
  // Disable server-side features for static export
  trailingSlash: true,
  // Ensure assets are properly referenced
  // assetPrefix: './',
  transpilePackages: ['react-native', 'react-native-reanimated'], // Add required packages for transpilation
}

module.exports = nextConfig
