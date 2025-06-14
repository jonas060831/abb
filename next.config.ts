import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CONNECTION_STRING: process.env.CONNECTION_STRING
  }
};

export default nextConfig;
