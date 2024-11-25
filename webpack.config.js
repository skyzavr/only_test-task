const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    bundle: './src/main.tsx',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@use '@shared/styles/main.scss' as *;`,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@type': path.resolve(__dirname, 'src/type/'),
      '@widgets': path.resolve(__dirname, 'src/widgets/'),
      '@features': path.resolve(__dirname, 'src/features/'),
      '@entities': path.resolve(__dirname, 'src/entities/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
    },
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
    }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new ESLintPlugin({
      extensions: ['.ts', '.tsx'],
    }),

    new StylelintPlugin({
      files: ['**/*.{css,sss,less,scss,sass}'],
    }),
  ],
  mode: 'development',
};
