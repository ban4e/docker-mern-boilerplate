// Core
const webpack = require('webpack');
const chalk = require('chalk');

// Config
const getConfig = require('./configs/webpack.prod');

const compiler = webpack(getConfig());

// Запуск webpack`a
compiler.run((err, stats) => {
    if (err) {
        // Ошибка конфигурации
        console.error(err.stack || err);

        if (err.details) {
            console.error(err.details);
        }

        return null;
    }

    const info = stats.toString({
        hash: true,
        colors: true,
        modules: false,
        entrypoints: true,
        env: true,
        version: true
    });

    console.log(chalk.greenBright('✔ Build completed'));
    console.log(info);

    if (stats.hasErrors()) {
        // Ошибка во время компиляции (неверный импорт, ошибка синтаксиса ...)
        console.log(chalk.redBright('➡ Error!'));
        console.error(info);
    }

    if (stats.hasWarnings()) {
        // Предупреждение во время компиляции
        console.log(chalk.yellowBright('➡ Warning!'));
        console.warn(info);
    }
});
