/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    unoptimized: true,
  },
  env: {
    CONTRACT_NAME: process.env.CONTRACT_NAME,
  },
}

module.exports = nextConfig
