/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.shopify.com', 'capitasnowboarding.com', 'res.cloudinary.com', 'cdn-icons-png.flaticon.com', 'ouch-cdn2.icons8.com'],
  },
  experimental: {
    serverActions: true
  }
}

module.exports = nextConfig
