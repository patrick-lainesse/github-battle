const path = require('path');

// Plugin to recreate index.html from the app directory to the dist directory and autonomously referencing script
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader'},
            {test: /\.(css)$/, use: ['style-loader', 'css-loader']},
        ]
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.html'
        })
    ],
    devServer: {
        historyApiFallback: true
    }
};