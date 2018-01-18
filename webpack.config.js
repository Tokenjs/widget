const path = require('path');
const webpack = require('webpack');
const {
  createConfig,
  match,
  entryPoint,
  setOutput,
  setEnv,
  env,
  addPlugins,
  sourceMaps,
  babel,
  uglify,
  css,
  sass,
  postcss,
  extractText,
  url,
  devServer,
} = require('webpack-blocks');
const HtmlPlugin = require('html-webpack-plugin');
const config = require('./src/config');

const { NODE_ENV } = process.env;
const NODE_MODULES_PATH = path.resolve('node_modules');
const DATAURL_LIMIT = 10240;

module.exports = createConfig([
  setEnv({ NODE_ENV }),
  entryPoint('./src/TokenJS.js'),
  setOutput({
    library: 'TokenJS',
    libraryExport: 'default',
  }),
  env('development', [
    setOutput('./dist/[name].js'),
  ]),
  env('production', [
    setOutput('./dist/[name].js'),
  ]),
  babel(),
  match(['*.css'], [
    css(),
    env('production', [extractText('[name].[contenthash:20].css')]),
  ]),
  match(['*.scss'], { exclude: NODE_MODULES_PATH }, [
    sass(),
    css.modules({ localIdentName: '[name]-[local]__[hash:base64:5]' }),
    postcss(),
    env('production', [extractText('[name].[contenthash:20].css')]),
  ]),
  match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.webp'], [
    url({ limit: DATAURL_LIMIT }),
  ]),
  match(['*.svg'], [
    url({ limit: DATAURL_LIMIT, mimetype: 'image/svg+xml' }),
  ]),
  addPlugins([
    new HtmlPlugin({
      template: './example/index.html',
      config,
      NODE_ENV,
      inject: 'head',
    }),
  ]),
  env('development', [
    devServer({ overlay: true }),
    sourceMaps(),
  ]),
  env('production', [
    uglify(),
    addPlugins([
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.LoaderOptionsPlugin({ minimize: true }),
    ]),
  ]),
]);
