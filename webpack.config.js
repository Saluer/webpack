const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

const PATHS = {
	src: path.join(__dirname, "./src"),
	dist: path.join(__dirname, "./dist"),
};

const PAGES_DIR = `${PATHS.src}/pug/`;

module.exports = {
	experiments: {
		asset: true,
	},
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: { main: "./index.js" },
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: `${PAGES_DIR}/index.pug`,
			filename: `./index.html`,
		}),
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

			{
				test: /\.(svg|png)$/,
				type: "asset",
			},
		],
	},
};
