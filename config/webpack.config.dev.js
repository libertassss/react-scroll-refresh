const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 动态生成html插件

const PUBLIC_PATH = "/"; // 基础路径

module.exports = {
    mode: "development",
    entry: [
        path.join(__dirname, `../demo/page/app.tsx`)
    ],
    output: {
        path: path.resolve(__dirname, '../src'),
        filename: 'main.js',
        publicPath: PUBLIC_PATH
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(less|css)/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png|gif|mp3|mp4|pdf)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192,
                      esModule: false
                    }
                  }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({template: path.resolve(__dirname, '../demo/index.html')}),
        new webpack.HotModuleReplacementPlugin(),   
    ],
    resolve: {
        extensions: [ '.jsx', '.tsx', '.js', '.ts', '.less', '.css' ]
    }
}