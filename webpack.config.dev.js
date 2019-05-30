const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
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
        chunks: [key]
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
  mode: 'development',
  resolve: {
    // 省略后缀
    extensions: ['.js', '.jsx', '.tsx']
  },
  devServer: {
    contentBase: devPath,
    hot: true,
  },
  entry: entryMap,
  output: {
    path: devPath,
    filename: "[name].min.js",
  },
  // 加载器的配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        // include: srcRoot
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: "sass-resources-loader",
          options: {
            resources: srcRoot + '/components/common.scss',
          }
        }],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['url-loader?limit=8192'],
        include: srcRoot
      },  // 当图片大小大于8192时直接引入，小于就转成Base64形式
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{loader: 'babel-loader'}, {loader: 'eslint-loader'}],
        include: srcRoot
      }
    ]
  },
  plugins: [
    // new HtmlWebpackPlugin()
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ].concat(htmlArray)
};