const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js")

module.exports = function (env) {
  if (env === "prod") {
    return merge(common, {
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
          warnings: false,
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
      ]
    })
  } else { return common; }
}