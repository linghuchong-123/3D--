/*
 * @Description:
 * @Version: 2.0
 * @Author: yangsen
 * @Date: 2022-03-10 17:35:15
 * @LastEditors: yangsen
 * @LastEditTime: 2022-03-14 20:56:48
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
  mode: 'production',
  devtool: 'eval-cheap-module-source-map',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  devServer: {
    // port: 8080, //设置端口号
    open: true, //自动打开浏览器
  },
  plugins: [htmlWebpackPlugin],
  module: {
    rules: [
      {
        test: /\.(mtl|obj)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
        type: 'javascript/auto',
        dependency: { not: ['url'] },
      },
    ],
  },
  performance: {
    hints: 'warning', // 枚举 false关闭
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000, // 最大资源文件大小
    assetFilter: function (assetFilename) {
      //只给出js文件的性能提示
      return assetFilename.endsWith('.js');
    },
  },
};
