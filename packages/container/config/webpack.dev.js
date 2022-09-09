const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
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
		]
	},
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		port: 8080,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'container',
			remotes: {
				shop: 'shop@http://localhost:8081/remoteEntry.js',
				home: 'home@http://localhost:8082/remoteEntry.js',
				authentication: 'auth@http://localhost:8083/remoteEntry.js'
			},
			shared: packageJson.dependencies,
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
		new SourceMapDevToolPlugin({
    	filename: "[file].map"
  	}),
	],
};
module.exports = merge(commonConfig, devConfig);
