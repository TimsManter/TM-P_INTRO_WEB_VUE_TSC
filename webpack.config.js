const path = require('path');

module.exports = {
  entry: "./src/ts/app.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        use: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};