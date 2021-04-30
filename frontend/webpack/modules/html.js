const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constants
const { TEMPLATE_FILE } = require('../configs/constants');

exports.loadHTML = () => ({
    /* КАЖДЫЙ ПЛАГИН ПРЕДСТАВЛЯЕТ ИЗ СЕБЯ КОНСТРУКТОР */
    plugins: [
        new HtmlWebpackPlugin({
            template: TEMPLATE_FILE
        })
    ]
});
