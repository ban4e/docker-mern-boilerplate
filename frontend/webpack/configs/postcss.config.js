const postcssSimpleVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

module.exports = () => ({
    plugins: [
        {
            'postcss-preset-env': {
                stage: 0
            }
        },
        postcssImport,
        'postcss-nested',
        postcssSimpleVars({})
    ]
});
