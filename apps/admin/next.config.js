/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@gad/supabase', '@gad/ui', '@gad/assets', '@gad/types'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

module.exports = nextConfig
