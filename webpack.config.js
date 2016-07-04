module.exports = {
    entry: ['whatwg-fetch', './index.jsx'],

    // output: {
    //
    //     filename: 'bundle.js',
    //     publicPath: './'
    // },
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react'}
        ]
    }
};