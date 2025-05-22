// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    UI: './src/ui.js',
    API: './src/api.js',
    APP: './src/app.js',
    USER_BACKEND: './src/user_backend.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    open: {
        target: ['signup.html'], 
    },
    port: 9000,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      }
    ]
  }
};