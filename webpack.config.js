const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Es3ifyPlugin = require('es3ify-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { loose: true }]],
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'h',
                },
              ],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new Es3ifyPlugin(),
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
}
