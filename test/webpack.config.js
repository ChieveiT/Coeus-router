var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function entry(e) {
  if (process.env.POLYFILL) {
    // This option is necessary in mocha-phantomjs 
    return [
      'expose?Promise!./src/polyfill/Promise.js',
      './src/polyfill/Object.assign.js',
      e
    ]
  } else {
    return e
  }
}

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: [ /node_modules/, /polyfill/ ] }
    ]
  },
  entry: {
    'routes': entry('mocha!./test/routes.spec.js'),
    'reducerRouter': entry('mocha!./test/reducers/router.spec.js'),
    'Router': entry('mocha!./test/Router.spec.js')
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].entry.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'routes.html',
      chunks: ['routes'],
      template: './test/template/app.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'reducerRouter.html',
      chunks: ['reducerRouter'],
      template: './test/template/app.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'Router.html',
      chunks: ['Router'],
      template: './test/template/app.html'
    })
  ]
};