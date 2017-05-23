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
                include: path.resolve(__dirname, 'src/ts/vue'),
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
        })
    ],
    devtool: 'inline-source-map'
};
