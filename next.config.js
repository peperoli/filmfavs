/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['image.tmdb.org'],
    unoptimized: true,
  },
}

module.exports = nextConfig
