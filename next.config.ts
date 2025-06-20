import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    EVENT_OWNER_2: process.env.EVENT_OWNER_2,
    BASE_URL: process.env.BASE_URL,
    SALT_ROUND: process.env.SALT_ROUND,
    JWT_SECRET: process.env.JWT_SECRET
  }
};

export default nextConfig;
