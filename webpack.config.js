var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',

    output: {
        path: './dist',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },

    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},

            {test: /\.html$/, loader: 'html-loader'},

            {test: /\.(slim|slm)$/, loader: 'slm'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: 'html!src/index.slim', inject: true})
    ]
};