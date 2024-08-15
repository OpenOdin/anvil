const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    node: {
        global: true
    },
    mode: "development",
    entry: process?.env?.entry || "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser.js",
        }),
        new webpack.DefinePlugin({
            process: {
                env: {
                    "process.env.NODE_ENV" : JSON.stringify("production")
                }
            }
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    //{ loader: 'resolve-url-loader' },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                ],
            },
            {
                test: /\.riot$/,
                exclude: /node_modules/,
                use: [{
                    loader: "@riotjs/webpack-loader",
                    options: {
                        hot: false, // set it to true if you are using hmr
                        // add here all the other @riotjs/compiler options riot.js.org/compiler
                        // template: 'pug' for example
                        scopedCss: true
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
        noParse: /\/node_modules\/process\//,
    },
    resolve: {
        alias: {
            "fs": false,
            "http": false,
            "os": false,
            "net": false,
            "tls": false,
            "https": false,
            "sqlite3": false,
            "postgresql-client": false,
            "vm": false,
            "linkedom": false,
        },
        fallback: {
            crypto: require.resolve("crypto-browserify"),
            path:   require.resolve("path-browserify"),
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer/")
        }
    }
};
