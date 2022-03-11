/*
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-03-10 17:35:15
 * @LastEditors: yangsen
 * @LastEditTime: 2022-03-11 09:10:24
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html',
});

module.exports = {
  // JavaScript 执行入口文件
  entry: './src/index.js',
  mode: 'development',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    port: 8080, //设置端口号
    open: true, //自动打开浏览器
  },
  plugins: [htmlWebpackPlugin],
};
