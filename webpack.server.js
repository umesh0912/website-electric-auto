const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const reactLoadableTransformer = require('react-loadable-ts-transformer');
var CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack')

module.exports = {
    entry: './src/server/server.tsx',
    target: 'node',
    mode: 'production',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                exclude:'/node_modules/',
                use: [
                  'ignore-loader'
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
                loader: 'ts-loader',
                exclude: '/node_modules/',
            }, 
        ],
    },
    externals: [webpackNodeExternals()],
    plugins:[
        new webpack.DefinePlugin({
            __isBrowser__: JSON.stringify(false),
            __isForGHPAGE__: JSON.stringify(false),
            'process.env': {
                'NODE_ENV': JSON.stringify('production'),
            }
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new CompressionPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
    optimization:{
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
        ]
    }
};