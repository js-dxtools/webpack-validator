/* eslint-env node */
const packageJson = {
  name: 'formly',
  version: '0.0.0',
  contributors: [],
}

const here = require('path-here');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

export default getConfig();

function getConfig() {
  const config = getCommonConfig();
  return _.merge(config, getDevConfig());
}


function getCommonConfig() {
  return {
    context: here(),
    entry: './configs.js',
    output: {
      libraryTarget: 'umd',
      library: 'ngFormly'
    },
    stats: {
      colors: true,
      reasons: true
    },
    resolve: {
      extensions: ['', '.js'],
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    },
    eslint: {
      emitError: true,
      failOnError: true,
      failOnWarning: false,
      quiet: true
    },
    externals: {
      angular: 'angular',
      'api-check': {
        root: 'apiCheck',
        amd: 'api-check',
        commonjs2: 'api-check',
        commonjs: 'api-check'
      }
    }
  };
}

function getDevConfig() {
  return {
    output: {
      filename: 'dist/formly.js'
    },
    module: {
      loaders: [
        getJavaScriptLoader(),
        getHtmlLoader()
      ]
    },
    plugins: getCommonPlugins()
  };
}

function getJavaScriptLoader() {
  return {test: /\.js$/, loaders: ['ng-annotate', 'babel', 'eslint?configFile=./other/src.eslintrc'], exclude: /node_modules/};
}

function getHtmlLoader() {
  return {test: /\.html$/, loaders: ['raw'], exclude: /node_modules/};
}

function getCommonPlugins() {
  return _.filter([
    new webpack.BannerPlugin('string stuff'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      VERSION: JSON.stringify(packageJson.version)
    }),
    process.env.CI ? undefined : new WebpackNotifierPlugin({
      title: 'angular-formly',
      contentImage: here('other/logo/angular-formly-logo-64px.png')
    })
  ]);
}
