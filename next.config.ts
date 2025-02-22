import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokeapi.co",
        port: '',
        pathname: "/api/v2/pokemon/",
        search: "",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: '',
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
        search: "",
      }
    ],
  },
};

export default nextConfig;
