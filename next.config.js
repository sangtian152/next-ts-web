/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
    prependData: `@import "var.scss";`
  }
}

module.exports = nextConfig
