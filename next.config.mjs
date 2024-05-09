/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ipfs'], // Add other domains as needed
},
  env: {
    WALLET_CONNECT_PROJECT_ID: process.env.WALLET_CONNECT_PROJECT_ID,
    SUPABASE_PROJECT_URL : process.env.SUPABASE_PROJECT_URL,
    SUPABASE_API_KEY: process.env.SUPABASE_API_KEY
  },
};

export default nextConfig;
