const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "localhost",
      "minio.hz-fal.eiga.sbs",
      "piware.ap-south-1.linodeobjects.com",
      "eiga.ap-south-1.linodeobjects.com",
    ],
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
