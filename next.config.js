/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    mongodb_user: "zangrandozak",
    mongodb_password: "aspdK9K1tXSqN7R7",
    mondodb_collection: "users"
  },
};

module.exports = nextConfig;
