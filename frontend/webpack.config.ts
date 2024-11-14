import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'
import dotenv from 'dotenv'
import CopyPlugin from 'copy-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
dotenv.config()

type Mode = 'production' | 'development'

interface BuildEnv {
  mode?: Mode
}

export default (env: BuildEnv) => {
  const entry = path.resolve(__dirname, 'src', 'main.tsx')
  const html = path.resolve(__dirname, 'index.html')
  const publicPath = path.resolve(__dirname, 'public')
  const dist = path.resolve(__dirname, 'dist')

  const mode = env.mode ?? 'development'
  const isDev = mode === 'development'

  console.log(process.env)

  const config = {
    entry,
    mode,
    devtool: 'inline-source-map',
    output: {
      path: dist,
      filename: 'main.[contenthash].js',
      asyncChunks: true,
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: html }),
      new webpack.ProgressPlugin(),
      new CopyPlugin({
        patterns: [
          { from: publicPath, to: '' }, //to the dist root directory
        ],
      }),
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env),
        __IS_DEV__: JSON.stringify(false),
      }),
      new ESLintPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.svg$/i,
          issuer: /\.tsx?$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.json$/,
          type: 'json',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }

  return config
}
