/** @type {import('next').NextConfig} */

const withPlugins = require('next-compose-plugins');
const withPWA = require("next-pwa");

module.exports = withPlugins([
  // another plugin with a configuration
  [withPWA, {
    pwa: {
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    },
  }],

], {
  reactStrictMode: true,
  images: {
    domains: ['ujszo.com'],
    formats: ['image/webp'],
  },
});

