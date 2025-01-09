const webpack = require("webpack"),
    path = require("path"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: "source-map",
    presets: ["@babel/preset-env"],

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: true,
    }, 
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
           
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
           
        }),
    ]

}