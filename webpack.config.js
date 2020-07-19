/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
    entry: ['./lib/index.ts'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        '@material-ui/icons': '@material-ui/icons',
        "@material-ui/core": '@material-ui/core',
        "@material-ui/core/SvgIcon": '@material-ui/core/SvgIcon',
        react: 'react',
        reactDOM: 'react-dom'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', 'css']
    },
    devtool: 'source-map'
}
