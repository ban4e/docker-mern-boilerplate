exports.loadScripts = () => ({
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2015'
                }
                // use: [
                //     {
                //         loader: 'babel-loader'
                //     },
                //     {
                //         loader: 'ts-loader'
                //     }
                // ]
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: 'esbuild-loader',
                options: {
                    target: 'es2015'
                }
                // use: {
                //     loader: 'babel-loader'
                // }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
});
