// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    index: path.resolve(__dirname, 'viking/index.html'),
    assetsRoot: path.resolve(__dirname, 'viking'),
    assetsSubDirectory: 'js',
    assetsPublicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    productionSourceMap: true
  },
  dev: {
    port: 8083,
    proxyTable: {}
  }
}
