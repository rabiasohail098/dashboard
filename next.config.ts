/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      domains:["cdn.sanity.io","images.pexels.com","randomuser.me","img.clerk.com"]
  },
  typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
},
reactStrictMode: false,
};

export default nextConfig;
