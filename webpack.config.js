var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: './src/main.ts',

    output: {
        path: './dist',
        filename: '[name].bundle.js',
        sourceMapFilename: 'bundle.map'
    },

    resolve: {
        extensions: ['', '.ts', '.js']
    },

    module: {
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},

            {test: /\.html$/, loader: 'raw-loader'},

            {test: /\.(slim|slm)$/, loader: 'html!slm'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({template: 'src/index.slim', inject: true})
    ]
};