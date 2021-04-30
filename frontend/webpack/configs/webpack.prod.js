// Core
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// Common configuration
const getConfig = require('./webpack.common');

// Modules
const { assets, styles, plugins } = require('../modules');

module.exports = () => {
    return merge(
        getConfig(),
        {
            mode: 'production',
            target: 'browserslist', // ОКРУЖЕНИЕ, ПОД КОТОРОЕ РАБОТАЕТ СБОРКА
            devtool: false,
            output: {
                filename: 'assets/js/[name].[chunkhash:5].bundle.js', // Плейсхолдеры имени и хэша для конкретного чанка
                chunkFilename: 'assets/js/[name].[chunkhash:5].chunk.js'
            },
            plugins: [new CleanWebpackPlugin()]
        },
        styles.loadProdStyles(),
        assets.loadImages(),
        plugins.connectBundleAnalyzer()
    );
};
