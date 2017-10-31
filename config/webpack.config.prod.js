const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// App files location
const PATHS = {
  app: path.resolve(__dirname, '../src/js'),
  styles: path.resolve(__dirname, '../src/styles'),
  elementsJson: path.resolve(__dirname, '../src/elements.json'),
  elements: path.resolve(__dirname, '../src/elements'),
  php: path.resolve(__dirname, '../src/php'),
  build: path.resolve(__dirname, '../build')
};

const plugins = [
  new CopyWebpackPlugin([
    {
      from: PATHS.elements,
      to: 'elements'
    },
    {
      from: PATHS.elementsJson,
      to: 'elements.json'
    },
    {
      from: PATHS.php,
      to: 'php'
    }
  ]),

  // Shared code
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "js/vendor.bundle.js",
    children: false
  }),
  // Avoid publishing files when compilation fails
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  // This plugin moves all the CSS into a separate stylesheet
  new ExtractTextPlugin('css/app.css', { allChunks: true })
];

const sassLoaders = [
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?outputStyle=compressed'
];

module.exports = {
  entry: {
    app: path.resolve(PATHS.app, 'main.js'),
    vendor: ['react']
  },
  output: {
    path: PATHS.build,
    filename: 'js/[name].js',
    publicPath: '/'
  },
  stats: {
    colors: true
  },
  resolve: {
    // We can now require('file') instead of require('file.jsx')
    extensions: ['', '.js', '.jsx', '.scss']
  },
  module: {
    noParse: /\.min\.js$/,
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel'],
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.css$/,
        include: PATHS.styles,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      // Inline base64 URLs for <=8k images, direct URLs for the rest
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]?[hash]'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]?[hash]'
      }
    ]
  },
  plugins: plugins,
  postcss: function () {
    return [autoprefixer({
      browsers: ['last 2 versions']
    })];
  },
  devtool: 'source-map'
};
