import type { NextConfig } from 'next'
import path from 'path'

const r = (...p: string[]) => path.resolve(__dirname, ...p)

const nextConfig: NextConfig = {
  /* config options here */
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/data': path.resolve(__dirname, 'src/data'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
    }
    return config
  },
  turbopack: {
    root: r('.'),
    resolveAlias: {
      '@': r('src'),
      '@/components': r('src/components'),
      '@/hooks': r('src/hooks'),
      '@/types': r('src/types'),
      '@/data': r('src/data'),
      '@/utils': r('src/utils'),
      '@/styles': r('src/styles'),
      '@/lib': r('src/lib'),
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
