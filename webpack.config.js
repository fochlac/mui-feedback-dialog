/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const tsLoaderOptions = {
    configFile: 'tsconfig.json'
}

module.exports = {
    entry: ['./lib/index.tsx'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: tsLoaderOptions
            },
            {
                test: /\.tsx$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: tsLoaderOptions
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'css']
    },
    plugins: [
        new CopyWebpackPlugin({
                patterns: [
                {
                    from: './static',
                    to: '',
                    globOptions: {
                        ignore: ['**/index.html'],
                    },
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: './static/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
    devtool: 'source-map'
}
