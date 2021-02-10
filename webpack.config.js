const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    historyApiFallback: true, // для роута
  },
  // devServer: {
  //   host: "localhost",
  //   port: 8080,
  //   contentBase:path.join(__dirname, "/dist"),
  //   watchContentBase: true,
  //   hot: true
  // },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: "./src/index.js",
  output: {
    publicPath: "/", // для роута
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },

      {
        test: /\.(png|jpe?g|gif|gif|svg)$/i, // вставка изображения
        use: [
          {
            loader: 'file-loader',
            options:{
              name:'[name].[ext]',
              outputPath:'./',
              useRelativePath:true
            }
          },
          {
            loader:'image-webpack-loader', //оптимизация изображения
            options:{
              mozjpeg:{ // оптимизацию остальных разрешение смотреть в инете image-webpack-loader
                progressive:true,
                quality:70
              }
            }
          },
        ],
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
