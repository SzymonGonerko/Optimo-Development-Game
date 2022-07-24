const webpack = require("webpack");
const path = require("path");

const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, "package.json"), "utf-8"));

module.exports = (env) => {
    return {
        mode: env.mode,

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "swc-loader",
                        options: {
                            jsc: {
                                parser: {
                                    syntax: "typescript",
                                },
                            },
                        },
                    },
                },
            ],
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "game.[contenthash].js",
        },

        optimization: {
            minimize: true,
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),

            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pkg.version + "r"),
            }),

            new webpack.ProgressPlugin(),
        ],
    };
};
