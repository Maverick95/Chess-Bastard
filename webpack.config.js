const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/i,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: 'index.html'
            }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/**.jpg',
                    to: path.resolve(__dirname, 'dist/assets/[name][ext]')
                },
                {
                    from: 'src/assets/**.png',
                    to: path.resolve(__dirname, 'dist/assets/[name][ext]')
                }
            ]
        })
    ],
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src')],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};