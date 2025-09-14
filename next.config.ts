import { withContentlayer } from "next-contentlayer"

// Note: env validation import disabled to avoid gensync/jiti issues on some Node setups.

const nextConfig: import("next").NextConfig = {
  experimental: {
    optimizePackageImports: ["shiki", "react-markdown", "marked"],
  },
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

module.exports = withBundleAnalyzer(withContentlayer(nextConfig))
