const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

exports.connectBuildProgressIndicator = () => ({
    plugins: [new WebpackBar()]
});

exports.connectFriendlyErrors = () => ({
    plugins: [new FriendlyErrorsWebpackPlugin()]
});

exports.connectBundleAnalyzer = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            openAnalyzer: false,
            generateStatsFile: true
        })
    ]
});

exports.connectDotenv = () => ({
    plugins: [new Dotenv()]
});

exports.connectReactRefresh = () => ({
    plugins: [new ReactRefreshWebpackPlugin()]
});
