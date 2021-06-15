const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        'scrollPullRefresh.min': path.resolve(__dirname, "../src/reactPullRefresh.tsx")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
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
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build'),
        libraryTarget: 'umd',
        library: 'scrollPullRefresh',
        libraryExport: 'default',
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
    externals: {
        react: {
          commonjs: 'react',
          commonjs2: 'react',
          amd: 'react',
          root: 'React',
        },
        "react-dom": {
          commonjs: 'react-dom',
          commonjs2: 'react-dom',
          amd: 'react-dom',
          root: 'ReactDOM',
        }
    }
}