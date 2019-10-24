const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const srcRoot = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, '../meituanServer/public');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getHtmlArray(entryMap) {
  let htmlArray = [];
  Object.keys(entryMap).forEach(key => {
    let fullName = path.resolve(pageDir, key);
    let fileName = path.resolve(fullName, key + '.html');
    if(fs.existsSync(fileName)) {
      htmlArray.push(new HtmlWebpackPlugin({
        filename: key + '.html',
        template: fileName,
        chunks: ['common', key]
      }));
    }
  });
  return htmlArray;
}

function getEntry() {
  let entryMap = {};
  fs.readdirSync(pageDir).forEach(pathname => {
    let fullPathName = path.resolve(pageDir, pathname);
    let stat = fs.statSync(fullPathName);
    let fileName = path.resolve(fullPathName, mainFile);

    if(stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });
  return entryMap;
}

const entryMap = getEntry();
const htmlArray = getHtmlArray(entryMap);

module.exports = {
  mode: 'production',
  resolve: {
    // 省略后缀
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      '@': require('path').resolve(__dirname, './src')
    }
  },
  entry: entryMap,
  output: {
    path: distPath,
    filename: "js/[name].[hash].min.js",
    // publicPath: "/", // 以相对路径去找文件
  },
  // 加载器的配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {minimize: true}}],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {minimize: true}}, 'sass-loader', {
          loader: "sass-resources-loader",
          options: {
            resources: srcRoot + '/components/common.scss',
          }
        }],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        // 当图片大小大于8192时直接引入，小于就转成Base64形式
        use: ['url-loader?limit=8192&name=images/[name].[hash].[ext]'],
        include: srcRoot
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{loader: 'babel-loader'}, {loader: 'eslint-loader'}],
        include: srcRoot
      }
    ]
  },
  optimization: {
    splitChunks:{
      cacheGroups:{
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/json', to: path.resolve(distPath, 'json'), force: true},
      {from: 'src/static', to: path.resolve(distPath, 'static'), force: true}
    ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    })
  ].concat(htmlArray)
};