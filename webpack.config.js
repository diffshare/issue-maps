var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/main.ts',

    devtool: 'source-map',

    output: {
        path: './dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chuckFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        preLoaders: [
            {test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/]}
        ],
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},

            {test: /\.html$/, loader: 'raw-loader'},

            {test: /\.(slim|slm)$/, loader: 'html!slm'}
        ]
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new HtmlWebpackPlugin({template: 'src/index.slim', inject: true})
    ]
};