// Core
const { merge } = require('webpack-merge');

// Common configuration
const getConfig = require('./webpack.common');

// Modules
const { assets, styles, plugins } = require('../modules');

// Constants
const { HOST, PORT, BUILD_DIRECTORY } = require('./constants');

module.exports = () => {
    return merge(
        getConfig(),
        {
            mode: 'development',
            devtool: 'cheap-module-source-map', // cheap-module-source-map
            target: 'web', // ОКРУЖЕНИЕ, ПОД КОТОРОЕ РАБОТАЕТ СБОРКА
            devServer: {
                noInfo: true,
                contentBase: BUILD_DIRECTORY,
                watchContentBase: true,
                host: HOST,
                port: PORT,
                historyApiFallback: true,
                open: true,
                hot: true,
                liveReload: false,
                https: false, // enable for docker with nginx proxy
                disableHostCheck: true, // enable for docker with nginx proxy
                public: 'http://localhost:80', // enable for docker with nginx proxy
                watchOptions: {
                    aggregateTimeout: 500, // delay before reloading
                    poll: 1000 // enable polling since fsevents are not supported in docker
                },
                stats: {
                    colors: true
                }
                // compress: true,
                // publicPath: '/',
                // https: false,
                // public: 'http://localhost:80',
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                // }
            },
            output: {
                filename: '[name].js',
                publicPath: '/' // УКАЗАНИЕ PUBLIC URL ДЛЯ DEV-РЕЖИМА (НЕОБХОДИМО ДЛЯ ПРАВИЛЬНОГО ПОСТРОЕНИЯ ПУТИ АССЕТОВ)
            },
            stats: {
                assets: false,
                moduleAssets: false,
                cachedModules: false,
                runtimeModules: false,
                entrypoints: false,
                colors: true
            }
        },
        styles.loadDevStyles(),
        assets.loadImages(),
        plugins.connectReactRefresh()
    );
};
