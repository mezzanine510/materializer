const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // devtool: 'source-map',
    entry: './src/materializer.js',
    output: {
      filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8082
    }
};