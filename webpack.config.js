/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        entry: './src/index',

        devServer: {
            historyApiFallback: true,
        },

        output: {
            path: path.join(__dirname, './dist/'),
            filename: '[name].app-bundle.js',
            chunkFilename: '[name].chunk-bundle.js',
        },

        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },

        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'webpack-conditional-loader'],
                },
                {
                    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name]-[hash].[ext]',
                                outputPath: 'fonts/',
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|webp)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name]-[hash].[ext]',
                                outputPath: 'images/',
                            },
                        },
                    ],
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                hash: true,
                template: path.join(__dirname, '/app/index.html'),
            }),
        ],
    },
];
