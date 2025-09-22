// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: { unoptimized: true },
//   basePath: isProd ? '/repo-name' : '',
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/Breast-Cancer-Detection' : '',
  assetPrefix: isProd ? '/Breast-Cancer-Detection/' : '',
}

module.exports = nextConfig
