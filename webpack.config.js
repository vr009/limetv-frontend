const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [
        'pug-loader',
      ],
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/',
    }, {
      test: /\.(png|jpg|gif|svg|mp4|ico)$/,
      loader: 'file-loader',
      options: {
        path: __dirname + '/dist/',
        name: '[name].[ext]',
      },
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {sourceMap: true},
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                require('postcss-preset-env')({
                  browsers: 'last 2 versions',
                }),
              ],
            },
          },
        },
      ],
    }],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './src/view/index.html',
    }),
    new WorkboxPlugin.InjectManifest({
      maximumFileSizeToCacheInBytes: 5000000000,
      swSrc: './src/utils/sw.js',
      swDest: 'sw.js',
      include: [/\.jpg$/, /\.ico$/, /\.png$/, /\.jpeg$/,
        /\.svg$/, /\.html$/, /\.js$/, /\.css$/],
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    onAfterSetupMiddleware: function(devServer) {
      devServer.app.get('*', function(req, res, next) {
        console.log(req, res);
        res.json({custom: 'response'});
        if ( ! (req.url.endsWith('.svg') ||
            req.url.endsWith('.js') ||
            req.url.endsWith('.ico') ||
            req.url.endsWith('.js.map')) ) {
          req.url = '/';
        }
        next('route');
      });
    },
  },
};
