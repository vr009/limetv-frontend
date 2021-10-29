const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist/',
    filename: 'bundle.js',
  },
  target: 'node',
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/view/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        // this applies to pug imports inside JavaScript
        {
          use: ['pug-loader'],
        },
      ],
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
      ],
    }],
  },
};
