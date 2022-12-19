const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      allowedHosts: "all",
      host: "0.0.0.0",
      port: 3000,
    },
  },
});
