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
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /(node_modules)/,
        options: {
          configFile: 'tslint.json'
        }
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
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader!tslint-loader'
          }
        }
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
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/ejs/index.ejs'
    })
  ]
};