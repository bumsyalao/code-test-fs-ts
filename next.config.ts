import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      remotePatterns: [
          {
            protocol: 'https',
            hostname: 'reqres.in',
            pathname: '**',
          },
        ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
