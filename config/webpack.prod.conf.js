const path = require('path');

// 插件都是一个类，所以我们命名的时候尽量用大写开头
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        // 添加hash可以防止文件缓存，每次都会生成4位的hash串
        filename: '[name].js',
        path: path.resolve(__dirname, '../build')
    },

    plugins: [
        // 通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            // 在src目录下创建一个index.html页面当做模板来用
            template: __dirname + '/../src/index.html',
            filename: __dirname + '/../build/index.html',
            chunk: ['index'],
            hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        new ExtractTextWebpackPlugin('css/[name].css'),
        // 热更新，热更新不是刷新
        new webpack.HotModuleReplacementPlugin(),
        // 打包前先清空
        new CleanWebpackPlugin(path.resolve(__dirname, '../build'), {
            root: path.resolve(__dirname, '/../'),
            verbose: true
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    use: [
                        'css-loader',
                    ]
                })
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src') // 只转化src目录下的js
                ],
                exclude: [
                    path.resolve(__dirname, '../node_modules') // 排除掉node_modules，优化打包速度
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
        host: 'localhost', // 默认是localhost
        port: 3000, // 端口
        // open: true, // 自动打开浏览器
        // hot: true               // 开启热更新
    }
}