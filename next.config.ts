import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        telugu: ['"Noto Sans Telugu"', 'sans-serif'],
      },
    },
  },
}