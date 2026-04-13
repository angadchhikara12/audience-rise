/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/audienceRise/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/audienceRise' : ''
}

export default nextConfig
