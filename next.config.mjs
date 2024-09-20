/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.imgur.com', 'example.com', 'anotherdomain.com'],
  },
};

export default nextConfig;
