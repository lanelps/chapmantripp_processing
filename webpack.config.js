const path = require('path')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	devServer: {
		contentBase: './dist',
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
}
