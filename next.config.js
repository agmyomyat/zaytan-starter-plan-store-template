const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: [
      "f4d3h9i5.rocketcdn.me",
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "minio.hz-fal.eiga.sbs",
      "piware.ap-south-1.linodeobjects.com",
      "eiga.ap-south-1.linodeobjects.com",
      "pub-3f83c023fc4c4aadb9b2c0c242b39c72.r2.dev",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
