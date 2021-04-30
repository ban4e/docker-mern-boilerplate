module.exports = api => {
    const env = api.env();
    const isDev = env === 'development';

    api.cache.using(() => isDev);

    const plugins = [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-react-jsx-source',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
    ]
    if (isDev) plugins.push('react-refresh/babel');

    return {
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins
    };
};
