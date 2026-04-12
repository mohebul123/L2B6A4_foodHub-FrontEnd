/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Jodi onyo kono domain thake (jekhane tumi image rakho), oitao eibhabe add korte paro
    ],
  },
};

export default nextConfig;
