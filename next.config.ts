import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // matching all API routes
<<<<<<< HEAD
        source: "/api/payment/notification/:path*",
=======
        source: "/api/payments/midtrans/notification",
>>>>>>> master
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kepy9ajsvqv9m32o.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
<<<<<<< HEAD
=======
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
>>>>>>> master
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
