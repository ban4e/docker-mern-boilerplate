module.exports = function removeUnit(mixin, value = '') {
    return parseFloat(value.toString().replace(/\D/g, ''));
};
