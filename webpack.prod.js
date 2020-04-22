const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    mode: 'production',
    entry: './src/client.tsx',
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: 'hidden-source-map',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude:'/node_modules/',
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      hmr: process.env.NODE_ENV === 'development',
                    },
                  },
                  'css-loader',
                  'sass-loader',
                ],
            },
            {
              test:/\.(gif|jpe?g|png|ico|svg)$/,
              use:[
                  {
                      loader: 'file-loader',
                      options: {
                          limit: 8192
                      }
                  }
              ]
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/,
              use: [
                {
                  loader: 'file-loader',
                  options:{
                    limit:1024,
                    name:'fonts/[name].[ext]'
                  }
                }
              ]
          },
          {
            test: /\.(js|jsx|ts|tsx)?$/,
            exclude: '/node_modules/',
            use: [
              { loader: 'cache-loader' },
              {
                  loader: 'thread-loader',
                  options: {
                      // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                      workers: require('os').cpus().length - 1,
                  },
              },
              {
                  loader: 'ts-loader',
                  options: {
                      happyPackMode: true // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
                  }
              }
          ]
          },
    ],
    },
    plugins:[
      new webpack.DefinePlugin({
        __isBrowser__: JSON.stringify(true),
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
        __GOOGLE_APP_ID: JSON.stringify(process.env.EVMALL_GOOGLE_CLIENT_ID),
      __FB_APP_ID: JSON.stringify(process.env.EVMALL_FB_APP_ID),
      }),
        // new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin(
          {   
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
          }
        ),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new StatsWriterPlugin({
          filename: "stats.json" // Default
        }),
        // new BundleAnalyzerPlugin(),
    ],
    optimization: {
      minimizer:[
        new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: {
              compress: false,
              ecma: 6,
              mangle: true
            },
            sourceMap: true
          })
    ],
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendor",
              chunks: "all"
            }
          }
        }
      }
};