const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/ts/App.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/app.min.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tslint.json'
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        include: path.resolve(__dirname, 'src/vue'),
        loader: 'vue-loader',
        options: {
          esModule: true,
          loaders: {
            ts: "ts-loader!tslint-loader"
          }
        }
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { alias: { '../fonts': 'mdi/fonts' } }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.scss', '.css', '.ts', '.vue' ],
    modules: [ 'node_modules', path.resolve(__dirname, 'src') ]
  },
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    noInfo: false,
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/ejs/index.ejs'
    })
  ]
};