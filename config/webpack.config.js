const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        'scrollPullRefresh': path.resolve(__dirname, "../src/reactPullRefresh.tsx"),
        'scrollPullRefresh.min': path.resolve(__dirname, "../src/reactPullRefresh.tsx"),
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
                use: [MiniCssExtractPlugin.loader,'css-loader','less-loader']
            }
        ]
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist',
        library: "scrollPullRefresh",
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/ // 只有匹配到.min.js结尾的文件才会压缩
            }),
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../src/')
        },
        extensions: [ '.jsx', '.tsx', '.js', '.ts', '.less', '.css' ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // 类似于 webpackOptions.output 中的选项
            // 所有选项都是可选的
            filename: 'static/[name].[contenthash].css',
            chunkFilename: 'static/[id].[contenthash].css',
        }),
    ],
    externals: {
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: 'React',
        },
        'react-dom': {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
          root: 'ReactDOM',
        },
    }
}