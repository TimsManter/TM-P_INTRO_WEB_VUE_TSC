const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/ts/App.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/app.min.js'
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
        include: path.resolve(__dirname, 'src/ts'),
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
        include: path.resolve(__dirname, 'src/vue'),
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              alias: {
                '../fonts': 'mdi/fonts'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: 'src/ejs/index.ejs'
    })
  ],
  devtool: 'inline-source-map'
};
