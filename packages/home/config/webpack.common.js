module.exports = {
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-react', { runtime: 'automatic' }],
							'@babel/preset-env',
							'@babel/preset-typescript',
						],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									regenerator: true,
								},
							],
						],
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
};
