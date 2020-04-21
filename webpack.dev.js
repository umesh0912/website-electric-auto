const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
var HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  mode: 'development',
  entry: './src/client.tsx',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    publicPath:  '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    overlay: true,
    hot: true,
    stats: {
      color: true,
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production',
            },
          },
          // Creates `style` nodes from JS strings
          // 'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        //   'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },{
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
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: JSON.stringify(true),
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      filename: 'index.html',
      async: ['app', 'vendor'],
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css' ,
        chunkFilename: '[id].css',
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new webpack.HotModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin()
  ],
  optimization:{
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  devtool: 'inline-source-map'
};
