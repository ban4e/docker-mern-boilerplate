const path = require('path');
const { path: DIRECTORY_ROOT } = require('app-root-path'); // ПОЛУЧЕНИЕ КОРНЯ ПРОЕКТА

exports.ROOT_DIRECTORY = DIRECTORY_ROOT;
exports.BUILD_DIRECTORY = path.join(DIRECTORY_ROOT, './dist');
exports.SOURCE_DIRECTORY = path.join(DIRECTORY_ROOT, './src');
exports.TEMPLATE_FILE = path.join(DIRECTORY_ROOT, './src/index.html');
exports.POSTCSS_CONFIG = path.join(DIRECTORY_ROOT, './webpack/configs/postcss.config.js');
exports.HOST = '0.0.0.0';
exports.PORT = '3000';
