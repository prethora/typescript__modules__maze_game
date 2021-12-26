const path = require("path");
const yaml = require("yamljs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshTypescript = require("react-refresh-typescript");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment?"development":"production",
  optimization: {
    minimize: false,
  },
  // entry: "./play/index",
  entry: {
    main: {
      import: "./play/index",
      dependOn: "react"
    },
    react: ["react","react-dom"]
  },
  devtool: isDevelopment?'inline-source-map':'source-map',
  devServer: {
    static: './dist',
    hot: isDevelopment
  },  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Playground',
      inject: true,
      template: "./play/index.html.ejs",
      favicon: "./resources/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    isDevelopment && new ForkTsCheckerWebpackPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin({
      include: /\.tsx?$/i
    })
  ].filter(Boolean),
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname,"dist"),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss|sass)$/,        
        use: [
          MiniCssExtractPlugin.loader, 
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: "local",
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname,"src"),
                exportLocalsConvention: "camelCase",
              },
            }
          },
          {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                  outputStyle: 'expanded'
                }
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          getCustomTransformers: () => ({
              before: [isDevelopment && ReactRefreshTypescript()].filter(Boolean)
          }),
          transpileOnly: isDevelopment,
        }
      },
    ],
  },
  resolve: {
    extensions: ['.tsx','.ts','.js'],
  },
};
