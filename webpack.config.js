var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var dotenv = require('dotenv');
dotenv.load();
require('es6-promise').polyfill();

var metadata = {
    env: {}
};
["REDMINE_ISSUE_URL", "REDMINE_API_KEY"].forEach(function(key) {
    metadata.env[key] = process.env[key];
});

module.exports = {

    entry: {
        'vendor': './src/vendor.ts',
        'polyfills': './src/polyfills.ts',
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
            {test: /\.ts$/, loader: 'awesome-typescript-loader'},

            {test: /\.html$/, loader: 'raw-loader'},

            {test: /\.(slim|slm)$/, loader: 'html!slm'},

            {test: /\.sass$/, loader: 'style!css!sass'}
        ]
    },

    sassLoader: {
        indentedSyntax: true
    },

    plugins: [
        new ForkCheckerPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(true),
        //new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.slim',
            chunksSortMode: 'dependency'
        })
    ],

    devServer: {
        port: 80,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: 'dist'
    },

    node: {global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false}
};
