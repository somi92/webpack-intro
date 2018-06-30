const path = require("path");

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

        entry: {
            index: PATHS.app + "/index.js",
            other: PATHS.app + "/other.js",
        },

        output: {
            chunkFilename: "[name].[chunkhash].js",
            filename: "[name].[chunkhash].js"
        },

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

        devtool: mode === "production" ? "source-map" : "cheap-eval-source-map",

        devServer: {
            // Display only errors to reduce the amount of output.
            // stats: "errors-only",
            host: process.env.HOST, // Defaults to `localhost`
            port: process.env.PORT, // Defaults to 8080
            open: false, // Open the page in browser
        },
    };
};

function setupLoaders(mode) {
    const loaders = [
        {
            test: /\.js$/,
            include: PATHS.app,
            use: "babel-loader",
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
    }

    plugins.push(new HtmlWebpackPlugin({
        title: "Webpack intro",
    }));

    return plugins;
} 
