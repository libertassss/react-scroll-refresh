const path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
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
    resolve: {
        alias: {
            'src': path.resolve(__dirname, '../src/')
        },
        extensions: [ '.jsx', '.tsx', '.js', '.ts', '.less', '.css' ]
    }
}