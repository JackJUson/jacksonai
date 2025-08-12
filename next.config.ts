import { withContentlayer } from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@google/genai'],
};

export default withContentlayer(nextConfig);
