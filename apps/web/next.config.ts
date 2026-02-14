import type { NextConfig } from "next"

const nextConfig: NextConfig = {
   /* config options here */
   reactCompiler: true,
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "m.media-amazon.com",
         },
         {
            protocol: "http",
            hostname: "localhost",
            port: "9000",
         },
         {
            protocol: "https",
            hostname: "pro-section.ui-layouts.com",
         },
         {
            protocol: "https",
            hostname: "**.githubusercontent.com",
         },
      ],
   },
}

export default nextConfig
