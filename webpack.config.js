const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    example: './examples/index.js',
  },
  output: {
    path: path.resolve(__dirname, './examples/__build__'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './examples/index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    alias: {
      'react-aria-offcanvas': path.resolve(__dirname, 'src/index'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
  },
};
