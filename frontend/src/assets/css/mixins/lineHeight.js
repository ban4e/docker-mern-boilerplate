const removeUnit = require('./removeUnit.js');

module.exports = function lineHeight(mixin, lineHeight, size = false) {
    return size ? removeUnit(mixin, lineHeight) / removeUnit(mixin, size) : `${removeUnit(mixin, lineHeight) / 16}rem`;
};
