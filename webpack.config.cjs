const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src', 'index.tsx'),
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
            },
            {
                test: /\.(sass|less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    target: ['web', 'es5'],
};
