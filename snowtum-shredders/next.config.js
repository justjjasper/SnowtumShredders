/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'capitasnowboarding.com', 'res.cloudinary.com'],
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
