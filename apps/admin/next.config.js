/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@gad/supabase'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

module.exports = nextConfig
