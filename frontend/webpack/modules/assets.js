// PNG, JPG, JPEG
exports.loadImages = () => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name]_[hash:5][ext]'
                }
                // parser: { dataUrlCondition: { maxSize: limit } }
            }
        ]
    }
});

// SVG
exports.loadSVG = () => ({
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            ref: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    }
                                ]
                            }
                        }
                    }
                ]
                // type: 'asset/resource',
                // generator: {
                //     filename: 'assets/svg/[name]_[hash:5][ext]'
                // }
            }
        ]
    }
});

// Fonts
exports.loadFonts = () => ({
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext]'
                }
            }
        ]
    }
});
