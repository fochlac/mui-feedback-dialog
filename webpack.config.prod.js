/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('./webpack.config')

module.exports = {
    ...baseConfig,
    mode: 'production',
    devtool: undefined
}

