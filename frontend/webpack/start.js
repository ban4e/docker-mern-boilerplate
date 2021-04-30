// Core
import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
// const hotMiddleware = require('webpack-hot-middleware');
import chalk from 'chalk';

// Constants
import { HOST, PORT } from './configs/constants';

// Config
import getConfig from './configs/webpack.dev';
const serverOptions = {
    hot: true,
    host: HOST,
    port: PORT,
    historyApiFallback: true,
    overlay: {
        errors: true,
        warnings: true
    }
    // ToDO: исследовать необходимость подключения
    // onAfterSetupMiddleware: app => {
    //     app.use(hotMiddleware(compiler, { log: false }));
    // }
};

// ToDO: исследовать как подключать
// DevServer.addDevServerEntrypoints(getConfig(), serverOptions);

const compiler = webpack(getConfig());
const server = new DevServer(compiler, serverOptions);
server.listen(PORT, HOST, () => {
    console.log(chalk.greenBright(`➡   Server listening on http://${HOST}:${PORT}`));
});
