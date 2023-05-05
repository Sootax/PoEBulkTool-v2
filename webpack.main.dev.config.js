const path = require('path')

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  mode: 'development',
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    alias: {
      Functions: path.resolve(__dirname, 'src/functions'),
      Json: path.resolve(__dirname, 'src/json')
    },
    extensions: ['.js', '.json']
  }
}
