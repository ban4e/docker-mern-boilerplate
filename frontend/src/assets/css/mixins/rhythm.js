const rem = require('./rem.js');
const lineHeight = require('./lineHeight.js');

module.exports = function rhythm(mixin, sizeVal, lineHeightVal) {
    const result = {
        'font-size': rem(mixin, sizeVal)
    };

    if (lineHeightVal) {
        result['line-height'] = lineHeight(mixin, lineHeightVal, sizeVal);
    }

    return result;
};
