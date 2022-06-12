/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    "@rainbow-me/rainbowkit",
    "@apollo/client",
    "ts-invariant",
    "zen-observable-ts",
  ],
  devServerPort: 8002,
};
