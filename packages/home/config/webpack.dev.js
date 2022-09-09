const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const devConfig = {
	mode: 'development',
	output: {
		publicPath: 'http://localhost:8082/',
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),

	},
	devServer: {
		port: 8082,
		historyApiFallback: true,
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'home',
			filename: 'remoteEntry.js',
			exposes: {
				'./HomeApp': './src/bootstrap'
			},
			shared: packageJson.dependencies
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};

module.exports = merge(commonConfig, devConfig);
