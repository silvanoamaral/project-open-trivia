const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  devServer: {
    inline: true,
    contentBase: './dist',
    historyApiFallback: true,
    hot: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            }
          },
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(svg|png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader?name=/dist/images/[name].[ext]',
          options: {
            name: '[name].[ext]',
            outputPath: 'images'
          }
        }],

      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      files: './src/styles/**/*.(s*)css'
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    }),
    new HtmlWebPackPlugin({
      favicon: './src/assets/images/favicon.ico',
      template: './public/index.html',
      filename: './index.html'
    })
  ]
}
