const path = require('path')

const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

dotenv.config()

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.?js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new ESLintWebpackPlugin({
      extensions: ['js'],
      emitError: true,
      failOnError: true,
      emitWarning: true,
      failOnWarning: false,
    }),
    new webpack.DefinePlugin({
      'process.env.API': JSON.stringify(process.env.API),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true,
    port: process.env.PORT,
    hot: true,
  },
  resolve: {
    alias: {
      components: path.join(__dirname, 'src/components'),
      constants: path.join(__dirname, 'src/constants'),
      socket: path.join(__dirname, 'src/socket'),
    },
  },
}

module.exports = () => {
  if (process.env.NODE_ENV.includes('production')) {
    config.mode = 'production'
    config.optimization = {
      minimize: true,
      mangleWasmImports: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      mergeDuplicateChunks: true,
      providedExports: true,
      mangleExports: 'size',
    }
    config.devtool = 'source-map'
  } else {
    config.mode = 'development'
    config.devtool = 'cheap-module-source-map'
  }
  return config
}
