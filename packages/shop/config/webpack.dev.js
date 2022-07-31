const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { SourceMapDevToolPlugin } = require("webpack");
const devConfig = {
		module: {
			rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
		],
	},
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8081/',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),

	},
	devServer: {
		port: 8081,
		historyApiFallback: true,
	},
	plugins: [
		new SourceMapDevToolPlugin({
    	filename: "[file].map"
  	}),
		new ModuleFederationPlugin({
			name: 'shop',
			filename: 'remoteEntry.js',
			exposes: {
				'./ShopApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
