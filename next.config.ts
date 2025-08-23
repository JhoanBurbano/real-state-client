import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/data': path.resolve(__dirname, 'src/data'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
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
