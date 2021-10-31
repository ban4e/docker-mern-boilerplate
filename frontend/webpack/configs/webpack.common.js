// Core
const path = require('path');
const { merge } = require('webpack-merge');

// Constants
const { BUILD_DIRECTORY, SOURCE_DIRECTORY } = require('./constants');

// Modules
const { scripts, html, assets, plugins } = require('../modules');

module.exports = () => {
    return merge(
        {
            // ТОЧКА ВХОДА
            entry: path.join(SOURCE_DIRECTORY, './index.tsx'),
            output: {
                path: BUILD_DIRECTORY, // ПУТЬ ДО ДИРЕКТОРИИ OUTPUT. УКАЗЫВАЕТСЯ АБСОЛЮТНЫЙ ПУТЬ
                publicPath: '/'
            },
            resolve: {
                alias: {
                    '~': SOURCE_DIRECTORY
                }
            }
        },
        scripts.loadScripts(),
        assets.loadImages(),
        assets.loadSVG(),
        assets.loadFonts(),
        html.loadHTML(),
        plugins.connectBuildProgressIndicator(),
        plugins.connectFriendlyErrors()
    );
};
