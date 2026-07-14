/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@gad/assets', '@gad/supabase', '@gad/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
