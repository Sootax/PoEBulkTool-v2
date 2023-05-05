const path = require('path')
const rules = require('./webpack.rules')

rules.push({
  test: /\.css$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'postcss-loader' }
  ]
})
module.exports = {
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utilities: path.resolve(__dirname, 'src/utilities'),
      Json: path.resolve(__dirname, 'src/json'),
      Functions: path.resolve(__dirname, 'src/functions')
    },
    extensions: ['.js', '.jsx', '.json']
  }
}
