module.exports = {
    entry: './src/main.ts',

    output: {
        path: './dist',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },

    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
};