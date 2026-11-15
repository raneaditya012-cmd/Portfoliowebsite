/** @type {import('next').NextConfig} */
const API = process.env.API_URL || "http://127.0.0.1:8000";
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    // Browser talks to same-origin /api/*, Next proxies to FastAPI.
    return [{ source: "/api/:path*", destination: `${API}/api/:path*` }];
  },
};
