const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: "./src/ts/app.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'app.min.js'
  },
  resolve: {
    extensions:
    [
      '.js',
      '.scss',
      '.css',
      '.ts',
      '.vue'
    ],
    modules:
    [
      'node_modules',
      path.resolve(__dirname, 'src')
    ]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|js)$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              alias: {
                '../fonts': 'mdi/fonts'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  }/*,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: false
    })
  ],
  devtool: 'inline-source-map'*/
};