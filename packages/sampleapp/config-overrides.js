var webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = { 
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"),
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/")
    };
    config.module.rules.push({
        test: /\.m?js$/,
        resolve: {
            fullySpecified: false,
        }
    });
    config.plugins.push(new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
    }));
    return config;
};
