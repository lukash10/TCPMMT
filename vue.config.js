const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
})

module.exports = {
  pwa: {
    appleMobileWebAppCapable: 'yes',
  },
  devServer: {
    proxy: {
      // with options
      '/api': {
        target: 'http://localhost:3080',
        changeOrigin: true,
        secure: false
      }
    }
  }
}


