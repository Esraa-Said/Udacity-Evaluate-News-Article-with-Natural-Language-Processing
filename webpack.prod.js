const webpack = require("webpack"),
    path = require("path"),
    TerserPlugin = require("terser-webpack-plugin"),
    htmlWebpackPlugin = require("html-webpack-plugin"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: "./src/client/index.js",
    mode: "development",
    devtool: "hidden-source-map",
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        })
    ]

}