// Core
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// Utils
const getScopedName = require('./utils/scopedNameGenerator.js');

// Constants
const { POSTCSS_CONFIG } = require('../configs/constants');

// css-loader
const loadCSS = ({ isDev = false } = { isDev: false }) => ({
    loader: 'css-loader',
    options: {
        sourceMap: isDev
    }
});

// css modules for TS TODO: prod build
const loadCSSModulesTypes = () => ({
    loader: '@teamsupercell/typings-for-css-modules-loader'
});

// css-modules
const loadCSSModules = ({ isDev = false } = { isDev: false }) => ({
    loader: 'css-loader',
    options: {
        sourceMap: isDev,
        modules: {
            getLocalIdent: (ctx, localIdentName, localName) => {
                return isDev ? localName : getScopedName(localName, ctx.resourcePath);
            }
        }
    }
});

// postcss-loader
const loadPostCSS = ({ isDev = false } = { isDev: false }) => ({
    loader: 'postcss-loader',
    options: {
        sourceMap: isDev,
        postcssOptions: {
            config: POSTCSS_CONFIG
        }
    }
});

exports.loadDevStyles = () => ({
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: ['style-loader', loadCSSModulesTypes(), loadCSSModules({ isDev: true }), loadPostCSS({ isDev: true })]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: ['style-loader', loadCSS({ isDev: true }), loadPostCSS({ isDev: true })]
            }
        ]
    }
});

exports.loadProdStyles = () => ({
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                        /* options: {
                            publicPath: ''
                        } */
                    },
                    loadCSSModules(),
                    loadPostCSS()
                ]
            },
            {
                test: /^((?!\.module).)*css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                        /* options: {
                            publicPath: ''
                        } */
                    },
                    loadCSS(),
                    loadPostCSS()
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash:5].css',
            chunkFilename: 'assets/css/[name].[contenthash:5].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin()
        ]
    }
});
