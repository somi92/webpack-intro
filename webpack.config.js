const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, "src"),
    build: path.join(__dirname, "dist"),
};

module.exports = mode => {

    return {

        mode,

        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },

        entry: {
            index: PATHS.app + "/index.ts",
        },

        output: mode === "production" ? {
            chunkFilename: "[name].[chunkhash].js",
            filename: "[name].[chunkhash].js"
        } : {},

        module: {
            rules: setupLoaders(mode),
        },

        optimization: mode === "production" ? {
            splitChunks: {
                chunks: "initial",
            },
            runtimeChunk: {
                name: "manifest"
            }
        } : {},

        plugins: setupPlugins(mode),

        devtool: mode === "production" ? "source-map" : "inline-source-map",

        devServer: {
            // Display only errors to reduce the amount of output.
            // stats: "errors-only",
            host: process.env.HOST, // Defaults to `localhost`
            port: process.env.PORT, // Defaults to 8080
            open: false, // Open the page in browser
            hot: true,
        },
    };
};

function setupLoaders(mode) {
    const loaders = [
        {
            test: /\.tsx?$/,
            include: PATHS.app,
            use: "ts-loader",
        },
        {
            test: /\.css$/,
            use: [mode === "production" ? MiniCssExtractPlugin.loader : "style-loader", "css-loader"],
        }
    ];
    return loaders;
}

function setupPlugins(mode) {

    var plugins = [];

    if (mode === "production") {
        plugins = [
            new CleanWebpackPlugin([PATHS.build]),
            new MiniCssExtractPlugin({
                // `allChunks` is needed to extract from extracted chunks as well.
                allChunks: true,
                filename: "[name].[contenthash].css",
            })
        ];
    } else {
        plugins = [
            new webpack.HotModuleReplacementPlugin()
        ];
    }

    plugins.push(new HtmlWebpackPlugin({
        title: "Webpack intro",
    }));

    return plugins;
} 
