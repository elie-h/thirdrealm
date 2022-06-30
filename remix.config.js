/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    "@rainbow-me/rainbowkit",
    "ts-invariant",
    "zen-observable-ts",
    "@heroicons/react",
  ],
  devServerPort: 8002,
};
