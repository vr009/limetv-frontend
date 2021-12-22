const HTMLWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
// для просмотра карт
// const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'production',
  entry: {
    bundle: path.join(__dirname, '/src/index.js'),
  },
  output: {
    path: __dirname + '/dist/' && __dirname + '/dist/actor/',
    filename: '[name].js',
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [
        'pug-loader',
      ],
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      },
    }, {
      test: /\.(png|jpg|gif|svg|mp4|ico)$/,
      loader: 'file-loader',
      options: {
        path: __dirname + '/dist/',
        name: '[name].[ext]',
      },
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'style-loader',
          options: {injectType: 'singletonStyleTag'},
        },
        {
          loader: 'css-loader',
          options: {url: false},
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require('sass'),
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
      maximumFileSizeToCacheInBytes: 500000,
      swSrc: './src/utils/sw.js',
      swDest: 'sw.js',
      include: [/\.jpg$/, /\.ico$/, /\.png$/, /\.jpeg$/,
        /\.svg$/, /\.html$/, /\.js$/, /\.css$/],
    }),
    // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.scss$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
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
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    splitChunks: {
      chunks: 'async',
      minSize: 1000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cssoMinify,
        minimizerOptions: {restructure: false},
      }),
    ],
  },
};
