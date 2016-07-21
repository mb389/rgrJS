var babelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./data/schema.json').data;

module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ["babel-relay-plugin-loader"]
        }
      }
    ]
  }
};
