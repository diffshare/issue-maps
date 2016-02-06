var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var dotenv = require('dotenv');
dotenv.load();

var metadata = {
    env: {}
};
["REDMINE_ISSUE_URL", "REDMINE_API_KEY"].forEach(function(key) {
    metadata.env[key] = process.env[key];
});

module.exports = {

    entry: {
        'main': './src/main.ts'
    },

    devtool: 'source-map',
    debug: true,

    output: {
        path: './dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.map',
        chuckFilename: '[id].chunk.js'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.sass', '.html']
    },

    module: {
        preLoaders: [
            {test: /\.js$/, loader: "source-map-loader", exclude: [/rxjs/]}
        ],
        loaders: [
            {test: /\.ts$/, loader: 'ts-loader'},

            {test: /\.html$/, loader: 'raw-loader'},

            {test: /\.(slim|slm)$/, loader: 'html!slm'},

            {test: /\.sass$/, loader: 'style!css!sass'}
        ]
    },

    sassLoader: {
        indentedSyntax: true
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({template: 'src/index.slim', inject: true}),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(metadata.env)
        })
    ],

    devServer: {
        port: 80
    },

    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
