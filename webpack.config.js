const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FileChanger = require('webpack-file-changer');


const sourcePath = path.join(__dirname, './src');
const staticsPath = path.join(__dirname, './static');

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const extractSass = new ExtractTextPlugin({
    filename: 'css/styles.[hash].css',
    disable: nodeEnv === 'development'
  })

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: isProd ? 'js/vendor.bundle.[hash].js' : 'js/vendor.bundle.js'
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: nodeEnv,
    }),
    new webpack.NamedModulesPlugin(),
    extractSass
  ];

  if (isProd) {
    plugins.push(
      new CleanWebpackPlugin(['static'], {
        root: __dirname,
        verbose: true, 
        dry: false
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      }),
      new FileChanger({
        change: [
          {
            file: path.join(staticsPath, 'index.html'),
            parameters: {
              "bundle\\.js": "bundle.[hash].js",
              "<!-- CSS -->": "<link href=\"/css/styles.[hash].css\" rel=\"stylesheet\">"
            }
          }
        ]
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return {
    devtool: isProd ? 'source-map' : 'eval',
    context: sourcePath,
    entry: {
      bundle: './index.js',
      vendor: ['react', 'react-dom', 'react-router']
    },
    output: {
      path: staticsPath,
      filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: {
            loader: 'file-loader',
            query: {
              name: '[name].[ext]'
            },
          },
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          loader: extractSass.extract({
              use: [
                { loader: "css-loader" }, 
                { loader: "sass-loader" }
              ],
              fallback: "style-loader"
          })
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ]
    },
    plugins,
    devServer: {
      contentBase: sourcePath,
      historyApiFallback: true,
      port: 3000,
      compress: isProd,
      inline: !isProd,
      hot: !isProd,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
          green: '\u001b[32m',
        }
      }
    }
  }

}