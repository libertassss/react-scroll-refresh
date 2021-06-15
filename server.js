const express = require('express');
const path = require('path');
const webpack = require('webpack'); // webpack核心
const webpackConfig = require('./config/webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware'); // webpack服务器
const  webpackHotMiddleware  = require('webpack-hot-middleware');

const app = express();
const DIST_DIR = webpackConfig.output.path;
const PORT = 8888; // 服务启动端口号
const env = process.env.NODE_ENV; // 模式（dev开发环境，production生产环境）

if (env === 'production'){
     // 如果是生产环境，则运行build文件夹中的代码
    //  app.use(express.static('build'));
    //  app.get('*', function(req, res) {
    //      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    //  });
}else{
    const compiler = webpack(webpackConfig); // 实例化webpack
    app.use(
        webpackDevMiddleware(compiler, {
            // 挂载webpack小型服务器
            publicPath: webpackConfig.output.publicPath, // 对应webpack配置中的publicPath
        })
    );
    app.use(webpackHotMiddleware(compiler));
    app.get('*', (req,res, next) => {
        const filename = path.join(DIST_DIR, 'index.html');
       
        // 由于index.html是由html-webpack-plugin生成到内存中的，所以使用下面的方式获取
        compiler.outputFileSystem.readFile(filename, (err, result) => {
            if (err) {
                return next(err);
            }
            res.set('content-type', 'text/html');
            res.send(result);
            res.end();
        });
    })
}



/** 启动服务 **/
app.listen(PORT, () => {
    console.log('本地服务启动地址: localhost:%s', PORT);
});