const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = {
    entry: {
      app: path.resolve(__dirname, './src/index.ts'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/i,
                use: [
                  process.env.NODE_ENV !== 'production'
                    ? 'style-loader'
                    : MiniCssExtractPlugin.loader,
                    'css-loader',
                  {
                    loader: 'resolve-url-loader',
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: () => [
                          require('autoprefixer')
                        ]
                      }
                    }
                  },
                ]
            },
            {
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: [/node_modules/], 
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
              test: /\.(woof(2)?|eot|otf|ttf)$/i,
              type: 'asset/resource',
            },
            { test: /\.ts?$/, loader: "babel-loader" },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        //assetModuleFilename: 'assets/[name][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new ESlintPlugin({ extensions: ['ts'] }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].css'
        }),
        new ForkTsCheckerWebpackPlugin(),
        // new CopyPlugin({
        //   patterns: [
        //     { from: './src/assets/', to: './assets' }
        //   ]
        // })
    ],
};

module.exports = ({ mode }) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};
