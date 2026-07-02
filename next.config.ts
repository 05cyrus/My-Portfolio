import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve the smallest modern format the browser accepts (AVIF ~20-30% smaller
  // than WebP). Next's default is WebP-only, so AVIF must be opted into.
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized derivatives aggressively (31 days) so repeat views and
    // subsequent visitors skip re-optimization.
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },

  // Tree-shake large libraries so only the exports actually used are bundled
  // instead of the whole barrel.
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },

  // Trim response weight / headers.
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Long-lived immutable caching for static image assets in /public/images.
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
