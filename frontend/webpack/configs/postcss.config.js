const postcssSimpleVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');
const postcssMixins = require('postcss-mixins');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = () => ({
    plugins: [
        {
            'postcss-preset-env': {
                stage: 0
            }
        },
        postcssImport,
        postcssMixins({
            mixinsDir: path.resolve(__dirname, '../../src/assets/css/mixins')
        }),
        'postcss-nested',
        postcssSimpleVars({
            variables: function () {
                return require('../../src/assets/css/variables.js');
            }
        }),
        tailwindcss({}),
        autoprefixer({})
    ]
});
