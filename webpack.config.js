const path = require("path");
const fs = require("fs");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

const PATHS = {
	src: path.join(__dirname, "./src"),
	dist: path.join(__dirname, "./dist"),
	assets: "assets/",
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs
	.readdirSync(PAGES_DIR)
	.filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: { main: "./index.js"},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		...PAGES.map(
			(page) =>
				new HTMLWebpackPlugin({
					template: `${PAGES_DIR}/${page}`,
					filename: `./${page.replace(/\.pug/, ".html")}`,
				})
		),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
	],
	optimization: {
		runtimeChunk: "single",
	},
	devServer: {
		port: 4200,
		hot: isDev,
	},
	target: "web",
	module: {
		rules: [
			{
				test: /\.s[ca]ss$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/,
				use: [
					isDev ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
				],
			},
			{
				test: /\.pug$/,
				use: ["pug-loader"],
			},
		],
	},
};
