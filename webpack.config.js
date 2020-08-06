const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    entry: {
        'showcar-ui': './src/showcar-ui.js',
        'showcar-icons': './src/js/showcar-icons.js',
        'showcar-tracking': './src/js/showcar-tracking.js',
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', { modules: false }]],
                cacheDirectory: '.tmp/js'
            }
        }]
    },
    plugins: [],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({ extractComments: false })
        ]
    }
};
