const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    src: './client/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Development',
      template: 'index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', ['@babel/react', {"runtime": "automatic"}]]
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
    },
    ],
  },
  devServer: {
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build')
    },
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  watch: true,
};
