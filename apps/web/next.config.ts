import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@web-os/ui', '@web-os/os-core', '@web-os/built-in-apps'],
};

export default nextConfig;
