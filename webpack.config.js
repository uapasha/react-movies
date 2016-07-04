var path = require('path')
module.exports = {
    entry: ['whatwg-fetch', path.join(__dirname, './reactRoot', 'index.jsx')],

    // output: {
    //
    //     filename: 'bundle.js',
    //     publicPath: './'
    // },
    output: {
        path: path.join(__dirname, './client/js'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'}
        ]
    }
};