const removeUnit = require('./removeUnit.js');

/* переводит px в rem */
module.exports = function rem(mixin, size, rootSize = '16') {
    return `${removeUnit(mixin, size) / removeUnit(mixin, rootSize)}rem`;
};
