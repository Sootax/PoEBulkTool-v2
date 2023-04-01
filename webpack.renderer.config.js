const rules = require('./webpack.rules');
const path = require('path');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components'),
      Utilities: path.resolve(__dirname, 'src/utilities'),
      Helpers: path.resolve(__dirname, 'src/helpers'),
    },
    extensions: ['.js', '.jsx']
  }
};
