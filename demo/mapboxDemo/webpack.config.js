/**
 * Created by mac020 on 11/10/2017.
 */
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    },

    devtool: '#source-map',
    node: {
        fs: 'empty'
    }
}